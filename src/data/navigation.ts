export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    label: 'Shop All',
    href: '/shop',
  },
  {
    label: 'Apparel',
    href: '/shop/apparel',
    children: [
      { label: 'T-Shirts', href: '/shop/apparel?type=tshirts' },
      { label: 'Hoodies & Sweaters', href: '/shop/apparel?type=hoodies' },
      { label: 'Jackets', href: '/shop/apparel?type=jackets' },
      { label: 'Work Wear', href: '/shop/apparel?type=workwear' },
    ],
  },
  {
    label: 'Headwear',
    href: '/shop/headwear',
    children: [
      { label: 'Caps', href: '/shop/headwear?type=caps' },
      { label: 'Toques', href: '/shop/headwear?type=toques' },
      { label: 'Hard Hat Stickers', href: '/shop/headwear?type=stickers' },
    ],
  },
  {
    label: 'Drinkware',
    href: '/shop/drinkware',
    children: [
      { label: 'Mugs', href: '/shop/drinkware?type=mugs' },
      { label: 'Tumblers', href: '/shop/drinkware?type=tumblers' },
      { label: 'Water Bottles', href: '/shop/drinkware?type=bottles' },
    ],
  },
  {
    label: 'Hockey',
    href: '/shop/hockey',
    children: [
      { label: 'Jerseys', href: '/shop/hockey?type=jerseys' },
      { label: 'Sticks & Pucks', href: '/shop/hockey?type=equipment' },
      { label: 'Bags', href: '/shop/hockey?type=bags' },
    ],
  },
  {
    label: 'Kids',
    href: '/shop/kids',
  },
];

export const categories = [
  {
    name: 'Apparel',
    slug: 'apparel',
    description: 'T-shirts, hoodies, jackets, and work wear',
    image: '/images/categories/apparel.jpg',
  },
  {
    name: 'Headwear',
    slug: 'headwear',
    description: 'Caps, toques, and hard hat stickers',
    image: '/images/categories/headwear.jpg',
  },
  {
    name: 'Drinkware',
    slug: 'drinkware',
    description: 'Mugs, tumblers, and water bottles',
    image: '/images/categories/drinkware.jpg',
  },
  {
    name: 'Hockey & Sports',
    slug: 'hockey',
    description: 'Jerseys, equipment, and gear',
    image: '/images/categories/hockey.jpg',
  },
  {
    name: 'Kids & Family',
    slug: 'kids',
    description: 'Gear for the whole family',
    image: '/images/categories/kids.jpg',
  },
  {
    name: 'Bags & Carry',
    slug: 'bags',
    description: 'Backpacks, duffels, and tool bags',
    image: '/images/categories/bags.jpg',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Office supplies and small items',
    image: '/images/categories/accessories.jpg',
  },
  {
    name: 'Premium Gifts',
    slug: 'premium',
    description: 'Carhartt, YETI, and premium brands',
    image: '/images/categories/premium.jpg',
  },
];
