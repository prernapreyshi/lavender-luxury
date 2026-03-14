import serumImage from '@/assets/product-serum.jpg';
import candleImage from '@/assets/product-candle.jpg';
import soapImage from '@/assets/product-soap.jpg';
import oilImage from '@/assets/product-oil.jpg';
import creamImage from '@/assets/product-cream.jpg';
import saltsImage from '@/assets/product-salts.jpg';
import diffuserImage from '@/assets/product-diffuser.jpg';
import pillowSprayImage from '@/assets/product-pillow-spray.jpg';
import faceMaskImage from '@/assets/product-face-mask.jpg';

export const products = [
  {
    id: '1',
    name: 'Lavender Serum',
    price: 49.99,
    image: serumImage,
    category: 'skincare',
    description:
      'A luxurious lavender-infused serum that nourishes and rejuvenates your skin with natural botanical extracts. Perfect for daily use to achieve a radiant, healthy glow.',
  },
  {
    id: '2',
    name: 'Calming Candle',
    price: 29.99,
    image: candleImage,
    category: 'home',
    description:
      'Hand-poured soy candle with pure lavender essential oil. Creates a peaceful atmosphere and fills your space with the calming scent of French lavender fields.',
  },
  {
    id: '3',
    name: 'Lavender Soap',
    price: 19.99,
    image: soapImage,
    category: 'bath',
    description:
      'Artisan-crafted soap bars made with organic lavender oil and natural ingredients. Gently cleanses while moisturizing your skin with a delicate floral fragrance.',
  },
  {
    id: '4',
    name: 'Essential Oil',
    price: 34.99,
    image: oilImage,
    category: 'aromatherapy',
    description:
      'Pure lavender essential oil extracted from the finest lavender blooms. Perfect for diffusing, massage, or adding to your bath for ultimate relaxation.',
  },
  {
    id: '5',
    name: 'Body Cream',
    price: 39.99,
    image: creamImage,
    category: 'skincare',
    description:
      'Rich, nourishing body cream infused with lavender and shea butter. Deeply moisturizes and soothes skin while leaving a subtle, elegant fragrance.',
  },
  {
    id: '6',
    name: 'Bath Salts',
    price: 24.99,
    image: saltsImage,
    category: 'bath',
    description:
      'Mineral-rich bath salts blended with dried lavender flowers. Transform your bath into a spa-like experience that relaxes muscles and calms the mind.',
  },
  {
    id: '7',
    name: 'Aromatherapy Diffuser',
    price: 54.99,
    image: diffuserImage,
    category: 'aromatherapy',
    description:
      'Modern ultrasonic essential oil diffuser with LED lighting. Disperses the therapeutic benefits of lavender oil throughout your space for continuous relaxation.',
  },
  {
    id: '8',
    name: 'Pillow Spray',
    price: 22.99,
    image: pillowSprayImage,
    category: 'home',
    description:
      'Calming pillow and linen spray infused with pure lavender essential oil. Promotes restful sleep and creates a peaceful bedtime routine.',
  },
  {
    id: '9',
    name: 'Lavender Face Mask',
    price: 32.99,
    image: faceMaskImage,
    category: 'skincare',
    description:
      'Rejuvenating clay face mask enriched with lavender extract and natural botanicals. Purifies and soothes skin while providing a spa-like experience at home.',
  },
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'skincare', name: 'Skincare' },
  { id: 'bath', name: 'Bath & Body' },
  { id: 'home', name: 'Home' },
  { id: 'aromatherapy', name: 'Aromatherapy' },
];
