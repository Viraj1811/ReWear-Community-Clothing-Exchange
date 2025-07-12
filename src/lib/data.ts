export interface Item {
  id: string;
  title: string;
  description: string;
  image: string;
  aiHint: string;
  points: number;
  category: 'Tops' | 'Bottoms' | 'Dresses' | 'Outerwear' | 'Accessories';
  type: string;
  size: string;
  condition: 'New with tags' | 'Excellent' | 'Good' | 'Fair';
  tags: string[];
  uploader: {
    name: string;
    avatar: string;
  };
  status: 'Available' | 'Swapped';
}

export const allItems: Item[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'A classic 80s denim jacket. Light wash, perfectly worn in. No major flaws.',
    image: 'https://placehold.co/600x600.png',
    aiHint: 'denim jacket',
    points: 45,
    category: 'Outerwear',
    type: 'Jacket',
    size: 'M',
    condition: 'Excellent',
    tags: ['vintage', 'denim', '80s'],
    uploader: { name: 'Sarah J.', avatar: 'https://placehold.co/100x100.png' },
    status: 'Available',
  },
  {
    id: '2',
    title: 'Floral Maxi Dress',
    description: 'Beautiful and flowy maxi dress, perfect for summer days. Worn only once.',
    image: 'https://placehold.co/600x600.png',
    aiHint: 'floral dress',
    points: 60,
    category: 'Dresses',
    type: 'Maxi Dress',
    size: 'S',
    condition: 'Excellent',
    tags: ['summer', 'floral', 'maxi'],
    uploader: { name: 'Jane D.', avatar: 'https://placehold.co/100x100.png' },
    status: 'Available',
  },
  {
    id: '3',
    title: 'Striped Cotton Tee',
    description: 'A comfortable and versatile striped t-shirt. 100% cotton.',
    image: 'https://placehold.co/600x600.png',
    aiHint: 'striped shirt',
    points: 20,
    category: 'Tops',
    type: 'T-Shirt',
    size: 'L',
    condition: 'Good',
    tags: ['basics', 'cotton', 'stripes'],
    uploader: { name: 'Mike R.', avatar: 'https://placehold.co/100x100.png' },
    status: 'Available',
  },
  {
    id: '4',
    title: 'High-Waisted Trousers',
    description: 'Chic black high-waisted trousers. Great for work or a night out.',
    image: 'https://placehold.co/600x600.png',
    aiHint: 'black trousers',
    points: 50,
    category: 'Bottoms',
    type: 'Trousers',
    size: 'M',
    condition: 'New with tags',
    tags: ['workwear', 'chic', 'minimalist'],
    uploader: { name: 'Emily C.', avatar: 'https://placehold.co/100x100.png' },
    status: 'Available',
  },
    {
    id: '5',
    title: 'Cozy Wool Scarf',
    description: 'A very warm and soft wool scarf, perfect for winter. Plaid pattern.',
    image: 'https://placehold.co/600x600.png',
    aiHint: 'plaid scarf',
    points: 25,
    category: 'Accessories',
    type: 'Scarf',
    size: 'One Size',
    condition: 'Good',
    tags: ['winter', 'cozy', 'plaid'],
    uploader: { name: 'Alex P.', avatar: 'https://placehold.co/100x100.png' },
    status: 'Available',
  },
    {
    id: '6',
    title: 'Leather Ankle Boots',
    description: 'Stylish black leather ankle boots with a small heel. Barely worn.',
    image: 'https://placehold.co/600x600.png',
    aiHint: 'leather boots',
    points: 70,
    category: 'Accessories',
    type: 'Shoes',
    size: '8',
    condition: 'Excellent',
    tags: ['leather', 'boots', 'fall'],
    uploader: { name: 'Chloe B.', avatar: 'https://placehold.co/100x100.png' },
    status: 'Available',
  },
];

export const featuredItems = allItems.slice(0, 3);

export const userItems = allItems.slice(3, 6);

export const swapHistory = [
    { id: 'swap1', itemSent: allItems[0], itemReceived: allItems[1], status: 'Completed', date: '2023-10-15' },
    { id: 'swap2', itemSent: allItems[2], itemReceived: null, status: 'Ongoing', date: '2023-11-01' },
];
