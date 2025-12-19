
import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Women Ethnic', image: 'https://picsum.photos/seed/ethnic/200/200' },
  { id: '2', name: 'Women Western', image: 'https://picsum.photos/seed/western/200/200' },
  { id: '3', name: 'Men', image: 'https://picsum.photos/seed/men/200/200' },
  { id: '4', name: 'Kids', image: 'https://picsum.photos/seed/kids/200/200' },
  { id: '5', name: 'Home & Kitchen', image: 'https://picsum.photos/seed/home/200/200' },
  { id: '6', name: 'Beauty & Health', image: 'https://picsum.photos/seed/beauty/200/200' },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Fancy Designer Saree',
    category: 'Women Ethnic',
    price: 499,
    originalPrice: 999,
    image: 'https://picsum.photos/seed/saree1/400/600',
    rating: 4.2,
    reviews: 1240,
    freeDelivery: true,
    tag: 'Bestseller'
  },
  {
    id: 'p2',
    name: 'Men Blue Slim Fit Jeans',
    category: 'Men',
    price: 649,
    originalPrice: 1299,
    image: 'https://picsum.photos/seed/jeans1/400/600',
    rating: 3.9,
    reviews: 850,
    freeDelivery: true
  },
  {
    id: 'p3',
    name: 'Kids Cotton T-shirt Set',
    category: 'Kids',
    price: 299,
    originalPrice: 599,
    image: 'https://picsum.photos/seed/kids1/400/600',
    rating: 4.5,
    reviews: 2100,
    freeDelivery: true,
    tag: 'Trending'
  },
  {
    id: 'p4',
    name: 'Analog Wrist Watch for Men',
    category: 'Jewellery & Watches',
    price: 199,
    originalPrice: 499,
    image: 'https://picsum.photos/seed/watch1/400/600',
    rating: 4.0,
    reviews: 560,
    freeDelivery: false
  },
  {
    id: 'p5',
    name: 'Non-stick Cookware Set',
    category: 'Home & Kitchen',
    price: 899,
    originalPrice: 1599,
    image: 'https://picsum.photos/seed/kitchen1/400/600',
    rating: 4.3,
    reviews: 340,
    freeDelivery: true
  },
  {
    id: 'p6',
    name: 'Liquid Lipstick Combo',
    category: 'Beauty & Health',
    price: 149,
    originalPrice: 399,
    image: 'https://picsum.photos/seed/beauty1/400/600',
    rating: 4.1,
    reviews: 1500,
    freeDelivery: true,
    tag: 'Lowest Price'
  },
  {
    id: 'p7',
    name: 'Embroidered Kurta Set',
    category: 'Women Ethnic',
    price: 550,
    originalPrice: 1100,
    image: 'https://picsum.photos/seed/kurta/400/600',
    rating: 4.4,
    reviews: 920,
    freeDelivery: true
  },
  {
    id: 'p8',
    name: 'Wireless Bluetooth Earbuds',
    category: 'Electronics',
    price: 499,
    originalPrice: 1999,
    image: 'https://picsum.photos/seed/audio/400/600',
    rating: 3.8,
    reviews: 4200,
    freeDelivery: true,
    tag: 'Hot Deal'
  }
];
