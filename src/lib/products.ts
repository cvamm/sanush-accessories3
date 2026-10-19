export type Product = {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  description: string;
};

const PEXELS = "https://images.pexels.com/photos";
const CARD = "?auto=compress&cs=tinysrgb&fit=crop&w=720&h=800";

export const products: Product[] = [
  {
    id: "everyday-hoops",
    title: "Everyday Huggies",
    category: "Earrings",
    image: `${PEXELS}/28389455/pexels-photo-28389455.jpeg${CARD}`,
    alt: "Sculptural gold huggie hoops on a sunlit travertine display",
    description: "A little golden detail for every day.",
  },
  {
    id: "dewdrop-necklace",
    title: "Dewdrop Pendant",
    category: "Necklaces",
    image: `${PEXELS}/29193427/pexels-photo-29193427.jpeg${CARD}`,
    alt: "Fine gold chain necklace with an organic oval charm",
    description: "An easy layer, finished with a tiny golden charm.",
  },
  {
    id: "sol-chain-bracelet",
    title: "Sol Chain Bracelet",
    category: "Bracelets",
    image: `${PEXELS}/30746010/pexels-photo-30746010.jpeg${CARD}`,
    alt: "Delicate gold chain bracelet arranged in a loop on ivory ceramic",
    description: "A subtle shimmer that goes with everything.",
  },
  {
    id: "stacking-rings",
    title: "Golden Hour Stacking Rings",
    category: "Rings",
    image: `${PEXELS}/30746011/pexels-photo-30746011.jpeg${CARD}`,
    alt: "Two minimal gold stacking rings on pale travertine",
    description: "Wear one on its own or stack them your way.",
  },
];
