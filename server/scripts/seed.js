import mongoose from 'mongoose';
import { config } from '../config/index.js';
import { Category } from '../models/Category.js';
import { Product } from '../models/Product.js';

const categoriesData = [
  { slug: 'home', nameAr: 'الرئيسية', icon: '🏠', order: 0 },
  { slug: 'graphics-cards', nameAr: 'كرت شاشة', icon: '🎮', order: 1 },
  { slug: 'monitors', nameAr: 'شاشات كمبيوتر', icon: '🖥️', order: 2 },
  { slug: 'cpu-cooling', nameAr: 'تبريد معالج', icon: '❄️', order: 3 },
  { slug: 'accessories', nameAr: 'إكسسوارات كمبيوتر', icon: '⌨️', order: 4 },
  { slug: 'processors', nameAr: 'معالجات', icon: '⚡', order: 5 },
  { slug: 'motherboards', nameAr: 'اللوحة الأم', icon: '🔲', order: 6 },
  { slug: 'ram', nameAr: 'رامات', icon: '📀', order: 7 },
  { slug: 'mouse', nameAr: 'ماوس', icon: '🖱️', order: 8 },
  { slug: 'headphones', nameAr: 'هيدفون', icon: '🎧', order: 9 },
  { slug: 'mobile', nameAr: 'أجهزة موبايل', icon: '📱', order: 10 },
];

function img(seed) {
  return `https://picsum.photos/seed/${seed}/400/400`;
}

async function seed() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(config.mongoUri);
  console.log('متصل بـ MongoDB للتهيئة...');

  await Product.deleteMany({});
  await Category.deleteMany({});

  const inserted = await Category.insertMany(categoriesData);
  const bySlug = Object.fromEntries(inserted.map((c) => [c.slug, c]));

  const mouseCat = bySlug.mouse._id;
  const hpCat = bySlug.headphones._id;
  const gpuCat = bySlug['graphics-cards']._id;
  const mobileCat = bySlug.mobile._id;

  const productsData = [
    {
      name: 'Realme Note 60x',
      category: mobileCat,
      categoryLabel: 'أجهزة موبايل',
      discountPercent: 100,
      originalPrice: 315,
      currentPrice: 0,
      image: img('realme60'),
      specs: '128GB/4GB RAM',
      featured: true,
      limitedTimeOffer: true,
    },
    {
      name: 'KR-GM501',
      category: gpuCat,
      categoryLabel: 'كرت شاشة',
      discountPercent: 57,
      originalPrice: 500,
      currentPrice: 215,
      image: img('kr501'),
      specs: '',
      featured: true,
      limitedTimeOffer: true,
    },
    {
      name: 'Zornwee Z3',
      category: mouseCat,
      categoryLabel: 'ماوس',
      discountPercent: 50,
      originalPrice: 70,
      currentPrice: 35,
      image: img('zornwee'),
      specs: '',
      featured: false,
      limitedTimeOffer: true,
    },
    {
      name: 'Fantech AURORA HG29',
      category: hpCat,
      categoryLabel: 'هيدفون',
      discountPercent: 46,
      originalPrice: 150,
      currentPrice: 80,
      image: img('fantech'),
      specs: '',
      featured: true,
      limitedTimeOffer: true,
    },
    {
      name: 'Realme C67',
      category: mobileCat,
      categoryLabel: 'أجهزة موبايل',
      discountPercent: 23,
      originalPrice: 650,
      currentPrice: 500,
      image: img('realme67'),
      specs: '256GB/8GB RAM',
      featured: true,
      limitedTimeOffer: false,
    },
    {
      name: 'Razer DeathAdder V3',
      category: mouseCat,
      categoryLabel: 'ماوس',
      discountPercent: 25,
      originalPrice: 400,
      currentPrice: 300,
      image: img('razer'),
      specs: 'سلكي',
      featured: true,
      limitedTimeOffer: true,
    },
    {
      name: 'Logitech G502',
      category: mouseCat,
      categoryLabel: 'ماوس',
      discountPercent: 30,
      originalPrice: 350,
      currentPrice: 245,
      image: img('g502'),
      specs: '',
      limitedTimeOffer: true,
    },
    {
      name: 'SteelSeries Arctis 7',
      category: hpCat,
      categoryLabel: 'هيدفون',
      discountPercent: 35,
      originalPrice: 900,
      currentPrice: 585,
      image: img('arctis'),
      specs: 'لاسلكي',
      featured: true,
      limitedTimeOffer: false,
    },
    {
      name: 'ASUS RTX 4070',
      category: gpuCat,
      categoryLabel: 'كرت شاشة',
      discountPercent: 15,
      originalPrice: 3200,
      currentPrice: 2720,
      image: img('rtx4070'),
      specs: '12GB',
      featured: true,
      limitedTimeOffer: true,
    },
  ];

  await Product.insertMany(productsData);

  const featCount = await Product.countDocuments({ featured: true });
  const dealCount = await Product.countDocuments({ limitedTimeOffer: true });
  console.log(`تم إنشاء ${inserted.length} تصنيف و ${productsData.length} منتج.`);
  console.log(`مميز: ${featCount} | عروض محدودة: ${dealCount}`);

  await mongoose.disconnect();
  console.log('انتهت التهيئة.');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
