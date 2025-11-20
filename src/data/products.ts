export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  sizes: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Royal Ivory Lehenga',
    price: 125000,
    category: 'Lehenga',
    image: '/images/lehenga-1.jpg',
    description: 'Hand-embroidered ivory lehenga with gold zardosi work.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: '2',
    name: 'Crimson Bridal Set',
    price: 180000,
    category: 'Lehenga',
    image: '/images/lehenga-2.jpg',
    description: 'Traditional red bridal lehenga with intricate thread work.',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: '3',
    name: 'Emerald Velvet Gown',
    price: 85000,
    category: 'Gown',
    image: '/images/gown-1.jpg',
    description: 'Deep emerald velvet gown perfect for reception nights.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '4',
    name: 'Golden Tissue Saree',
    price: 45000,
    category: 'Saree',
    image: '/images/saree-1.jpg',
    description: 'Lightweight golden tissue saree with sequin borders.',
    sizes: ['Free Size'],
  },
  {
    id: '5',
    name: 'Pastel Pink Anarkali',
    price: 35000,
    category: 'Anarkali',
    image: '/images/anarkali-1.jpg',
    description: 'Soft pastel pink anarkali with floral embroidery.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  // Add more products as needed to reach 50+
];

// Helper to generate more mock data if needed
for (let i = 6; i <= 50; i++) {
  products.push({
    id: i.toString(),
    name: `Luxury Ensemble #${i}`,
    price: 50000 + Math.floor(Math.random() * 100000),
    category: ['Lehenga', 'Saree', 'Gown', 'Anarkali'][Math.floor(Math.random() * 4)],
    image: `/images/placeholder-${(i % 5) + 1}.jpg`,
    description: 'Exquisite craftsmanship meeting modern elegance.',
    sizes: ['S', 'M', 'L'],
  });
}
