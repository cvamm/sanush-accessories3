"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Heart,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import StellarCardGallerySingle from "@/components/ui/3d-image-gallery";
import { products, type Product } from "@/lib/products";

const instagramUrl = "https://www.instagram.com/sanush_accessories/";

function InstagramMark({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

type ProductCardProps = {
  product: Product;
  isSaved: boolean;
  quantity: number;
  onToggleFavorite: () => void;
  onAdd: () => void;
};

function ProductCard({ product, isSaved, quantity, onToggleFavorite, onAdd }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card-image-wrap">
        <Image
          src={product.image}
          alt={product.alt}
          width={720}
          height={800}
          sizes="(max-width: 640px) 47vw, (max-width: 1024px) 45vw, 25vw"
          className="product-card-image"
        />
        <span className="product-category-pill">{product.category}</span>
        <button
          type="button"
          className={`favorite-button${isSaved ? " is-saved" : ""}`}
          onClick={onToggleFavorite}
          aria-label={isSaved ? `Remove ${product.title} from favorites` : `Save ${product.title} to favorites`}
          aria-pressed={isSaved}
        >
          <Heart size={17} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="product-card-info">
        <div>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
        </div>
        <button type="button" className={`product-add-button${quantity ? " has-quantity" : ""}`} onClick={onAdd}>
          {quantity ? <Check size={16} /> : <Plus size={17} />}
          <span>{quantity ? `In your bag · ${quantity}` : "Add to bag"}</span>
        </button>
      </div>
    </article>
  );
}

export default function SanushStorefront() {
  const [bag, setBag] = useState<Record<string, number>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const bagCount = Object.values(bag).reduce((total, quantity) => total + quantity, 0);
  const bagProducts = products.filter((product) => bag[product.id]);

  useEffect(() => {
    if (!bagOpen && !mobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setBagOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [bagOpen, mobileMenuOpen]);

  const toggleFavorite = (id: string) => {
    setFavorites((current) => current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id]);
  };

  const addToBag = (product: Product) => {
    setBag((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + 1 }));
    setBagOpen(true);
  };

  const updateQuantity = (id: string, change: number) => {
    setBag((current) => {
      const nextQuantity = (current[id] ?? 0) + change;
      if (nextQuantity <= 0) {
        const next = { ...current };
        delete next[id];
        return next;
      }
      return { ...current, [id]: nextQuantity };
    });
    setCopied(false);
  };

  const copyBagNote = async () => {
    const itemLines = bagProducts.map((product) => `${bag[product.id]} × ${product.title}`).join("\n");
    const note = `Hi Sanush Accessories! I'd love to know more about these pieces:\n${itemLines}\nCould you please share the prices and availability?`;
    try {
      await navigator.clipboard.writeText(note);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const openInstagram = () => {
    window.open(instagramUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="storefront">
      <div className="announcement-bar">
        <Sparkles size={13} aria-hidden="true" />
        <span>Anti-tarnish · 18K gold plated · made for every day</span>
        <Sparkles size={13} aria-hidden="true" />
      </div>

      <header className="site-header">
        <div className="header-inner">
          <a className="brand-lockup" href="#home" aria-label="Sanush Accessories home">
            <span className="brand-name">sanush<span className="brand-period">.</span></span>
            <span className="brand-subtitle">ACCESSORIES</span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#shop">Shop</a>
            <a href="#gallery">The edit</a>
            <a href="#story">Our story</a>
          </nav>

          <div className="header-actions">
            <a className="header-instagram" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Visit Sanush Accessories on Instagram">
              <InstagramMark size={17} />
              <span>Instagram</span>
            </a>
            <button className="bag-trigger" type="button" onClick={() => setBagOpen(true)} aria-label={`Open bag with ${bagCount} items`}>
              <ShoppingBag size={19} strokeWidth={1.7} />
              <span>Bag</span>
              <span className="bag-count">{bagCount}</span>
            </button>
            <button
              className="mobile-menu-trigger"
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#shop" onClick={() => setMobileMenuOpen(false)}>Shop the collection <ArrowRight size={15} /></a>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)}>The everyday edit <ArrowRight size={15} /></a>
            <a href="#story" onClick={() => setMobileMenuOpen(false)}>Our story <ArrowRight size={15} /></a>
            <a href={instagramUrl} target="_blank" rel="noreferrer">Visit Instagram <ArrowUpRight size={15} /></a>
          </nav>
        )}
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-dot" /> Everyday jewelry, with a golden glow</p>
            <h1>Keep a little<br /><em>gold on you.</em></h1>
            <p className="hero-description">The pieces you reach for without thinking. Anti-tarnish, 18K gold-plated jewelry that makes the everyday feel like something special.</p>
            <div className="hero-actions">
              <a className="button-dark" href="#shop">Shop the collection <ArrowDown size={16} /></a>
              <a className="button-text-link" href={instagramUrl} target="_blank" rel="noreferrer">Find us on Instagram <ArrowUpRight size={16} /></a>
            </div>
            <div className="hero-footnote"><span>01</span><i /> The everyday edit by Sanush</div>
          </div>
          <div className="hero-visual">
            <Image
              src="https://images.pexels.com/photos/4155246/pexels-photo-4155246.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=1500"
              alt="Warm editorial portrait wearing delicate everyday gold necklaces and hoops"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
              className="hero-image"
            />
            <div className="hero-image-shade" />
            <div className="hero-image-label"><span>THE EVERYDAY EDIT</span><span>01 / 04</span></div>
            <div className="hero-stamp"><span>18K</span><small>GOLD<br />PLATED</small><i /></div>
            <div className="hero-caption"><span>01</span> A little shine, every day</div>
          </div>
          <a href="#shop" className="hero-scroll-cue" aria-label="Scroll to shop"><span>SCROLL TO DISCOVER</span><ArrowDown size={14} /></a>
        </section>

        <section className="promise-strip" aria-label="Jewelry details">
          <div><span className="promise-sparkle">✳</span> Anti-tarnish finish</div>
          <i />
          <div><span className="promise-sparkle">✳</span> 18K gold plated</div>
          <i />
          <div><span className="promise-sparkle">✳</span> Made for everyday</div>
        </section>

        <section className="shop-section section-shell" id="shop">
          <div className="section-heading shop-heading">
            <div>
              <p className="eyebrow">The Sanush selection</p>
              <h2>Little treasures,<br /><em>big feeling.</em></h2>
            </div>
            <div className="shop-heading-aside">
              <p>Everyday favorites, finished in warm 18K gold. Find your new go-to, then say hello on Instagram for price and availability.</p>
              <a href={instagramUrl} target="_blank" rel="noreferrer" className="underlined-link">See what’s new <ArrowUpRight size={15} /></a>
            </div>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isSaved={favorites.includes(product.id)}
                quantity={bag[product.id] ?? 0}
                onToggleFavorite={() => toggleFavorite(product.id)}
                onAdd={() => addToBag(product)}
              />
            ))}
          </div>
          <p className="price-note"><Sparkles size={14} /> Prices and availability are confirmed with us directly on Instagram.</p>
        </section>

        <div id="gallery" className="gallery-section-wrap">
          <StellarCardGallerySingle />
        </div>

        <section className="story-section section-shell" id="story">
          <div className="story-visual">
            <Image
              src="https://images.pexels.com/photos/9634675/pexels-photo-9634675.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=1500"
              alt="Delicate gold bracelet on a softly lit ivory ceramic dish"
              fill
              sizes="(max-width: 760px) 90vw, 45vw"
              className="story-image"
            />
            <div className="story-image-caption"><span>MADE FOR YOUR EVERYDAY</span><span>✳</span></div>
            <div className="story-note"><span>18K</span><small>GOLD<br />PLATED</small></div>
          </div>
          <div className="story-copy">
            <p className="eyebrow">A little note from Sanush</p>
            <h2>Made to be worn.<br /><em>Not saved for someday.</em></h2>
            <p className="story-body">We believe the best jewelry is the kind that becomes part of your day. Sanush Accessories brings together anti-tarnish, 18K gold-plated pieces for coffee runs, long afternoons, and everything in between.</p>
            <div className="story-values">
              <div><span>01</span><p><strong>Easy to love</strong><br />Simple silhouettes that feel like you.</p></div>
              <div><span>02</span><p><strong>Everyday gold</strong><br />A little extra glow, wherever you go.</p></div>
            </div>
            <a className="button-dark story-button" href="#shop">Find your favorite <ArrowRight size={16} /></a>
          </div>
        </section>

        <section className="instagram-callout">
          <div className="instagram-callout-orbit" aria-hidden="true"><span /><span /></div>
          <p className="eyebrow"><InstagramMark size={14} /> COME SAY HELLO</p>
          <h2>Your next favorite is<br /><em>one DM away.</em></h2>
          <p>Browse the latest Sanush pieces and ask us about your new everyday favorite.</p>
          <a href={instagramUrl} target="_blank" rel="noreferrer" className="button-light">Follow @sanush_accessories <ArrowUpRight size={16} /></a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand-lockup footer-brand" href="#home" aria-label="Sanush Accessories home">
          <span className="brand-name">sanush<span className="brand-period">.</span></span>
          <span className="brand-subtitle">ACCESSORIES</span>
        </a>
        <p>Everyday gold, with a little more feeling.</p>
        <div className="footer-links">
          <a href="#shop">Shop</a>
          <a href="#story">Our story</a>
          <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a>
        </div>
        <span className="copyright">© {new Date().getFullYear()} Sanush Accessories</span>
      </footer>

      {bagOpen && (
        <div className="bag-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setBagOpen(false); }}>
          <aside className="bag-drawer" role="dialog" aria-modal="true" aria-labelledby="bag-title">
            <div className="bag-drawer-header">
              <div><p className="eyebrow">Your little edit</p><h2 id="bag-title">Your bag <span>({bagCount})</span></h2></div>
              <button className="drawer-close" type="button" onClick={() => setBagOpen(false)} aria-label="Close bag"><X size={19} /></button>
            </div>
            {bagProducts.length ? (
              <>
                <div className="bag-items">
                  {bagProducts.map((product) => (
                    <div className="bag-item" key={product.id}>
                      <div className="bag-item-image"><Image src={product.image} alt={product.alt} fill sizes="76px" /></div>
                      <div className="bag-item-details">
                        <p className="bag-item-category">{product.category}</p>
                        <h3>{product.title}</h3>
                        <span>Price confirmed by DM</span>
                        <div className="quantity-control" aria-label={`Quantity of ${product.title}`}>
                          <button type="button" onClick={() => updateQuantity(product.id, -1)} aria-label={`Remove one ${product.title}`}><Minus size={13} /></button>
                          <span>{bag[product.id]}</span>
                          <button type="button" onClick={() => updateQuantity(product.id, 1)} aria-label={`Add one ${product.title}`}><Plus size={13} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bag-drawer-bottom">
                  <p className="bag-help">Your picks are saved here while you browse. We’ll confirm pricing and availability with you on Instagram.</p>
                  <button className="copy-note-button" type="button" onClick={copyBagNote}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Message copied — paste in your DM" : "Copy your order note"}
                  </button>
                  <button className="instagram-checkout" type="button" onClick={openInstagram}>Continue on Instagram <ArrowUpRight size={16} /></button>
                </div>
              </>
            ) : (
              <div className="empty-bag">
                <div className="empty-bag-icon"><ShoppingBag size={23} /></div>
                <h3>Your bag is taking a little breather.</h3>
                <p>Save a few golden favorites and we’ll help you with the details on Instagram.</p>
                <button className="button-dark" type="button" onClick={() => setBagOpen(false)}>Explore the collection <ArrowRight size={16} /></button>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
