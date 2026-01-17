import phonesData from '@/data/phones.json';
import { Phone, SearchFilters } from '@/types/phone';

let cachedPhones: Phone[] | null = null;

export function getAllPhones(): Phone[] {
  if (!cachedPhones) {
    cachedPhones = phonesData as Phone[];
  }
  return cachedPhones;
}

export function getPhoneById(id: string): Phone | undefined {
  return getAllPhones().find(phone => phone.id === id);
}

export function searchPhones(filters: SearchFilters): Phone[] {
  let results = getAllPhones();

  // البحث بالاسم
  if (filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase();
    results = results.filter(phone =>
      phone.name.toLowerCase().includes(query) ||
      phone.brand.toLowerCase().includes(query) ||
      phone.model.toLowerCase().includes(query)
    );
  }

  // التصفية حسب الماركة
  if (filters.brands.length > 0) {
    results = results.filter(phone => filters.brands.includes(phone.brand));
  }

  // التصفية حسب السعر
  const priceKey = filters.currency === 'egp' ? 'egp' : filters.currency === 'usd' ? 'usd' : 'sar';
  results = results.filter(phone => {
    const price = phone.prices[priceKey as keyof typeof phone.prices];
    return price >= filters.priceRange.min && price <= filters.priceRange.max;
  });

  // التصفية حسب الفئة
  if (filters.categories.length > 0) {
    results = results.filter(phone => filters.categories.includes(phone.category));
  }

  // التصفية حسب التقييم
  if (filters.minRating > 0) {
    results = results.filter(phone => phone.ratings.overall >= filters.minRating);
  }

  return results;
}

export function getAllBrands(): string[] {
  const brands = new Set(getAllPhones().map(phone => phone.brand));
  return Array.from(brands).sort();
}

export function getPhonesByBrand(brand: string): Phone[] {
  return getAllPhones().filter(phone => phone.brand === brand);
}

export function getLatestPhones(limit: number = 10): Phone[] {
  return [...getAllPhones()]
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, limit);
}

export function getTopRatedPhones(limit: number = 10): Phone[] {
  return [...getAllPhones()]
    .sort((a, b) => b.ratings.overall - a.ratings.overall)
    .slice(0, limit);
}

export function getBestPhonesByCategory(category: string): Phone[] {
  return getAllPhones()
    .filter(phone => phone.category === category)
    .sort((a, b) => b.ratings.overall - a.ratings.overall)
    .slice(0, 5);
}

export function getBestPhonesByFeature(feature: keyof Omit<Phone['ratings'], 'userCount'>): Phone[] {
  return [...getAllPhones()]
    .sort((a, b) => b.ratings[feature] - a.ratings[feature])
    .slice(0, 10);
}

export function getPhonesByPriceRange(minPrice: number, maxPrice: number, currency: 'egp' | 'usd' | 'sar' | 'aed'): Phone[] {
  const priceKey = currency;
  return getAllPhones().filter(phone => {
    const price = phone.prices[priceKey];
    return price >= minPrice && price <= maxPrice;
  });
}

export function convertPrice(price: number, from: 'egp' | 'usd' | 'sar' | 'aed', to: 'egp' | 'usd' | 'sar' | 'aed'): number {
  if (from === to) return price;

  // تحويل إلى USD أولاً
  const rates: Record<'egp' | 'usd' | 'sar' | 'aed', number> = {
    'egp': 30,
    'usd': 1,
    'sar': 3.75,
    'aed': 3.67
  };

  const priceInUsd = price / rates[from];
  return Math.round(priceInUsd * rates[to] * 100) / 100;
}

export function getStatistics() {
  const phones = getAllPhones();
  const prices = phones.map(p => p.prices.usd);
  const ratings = phones.map(p => p.ratings.overall);

  return {
    totalPhones: phones.length,
    totalBrands: new Set(phones.map(p => p.brand)).size,
    averagePrice: {
      usd: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
      egp: Math.round(convertPrice(prices.reduce((a, b) => a + b, 0) / prices.length, 'usd', 'egp'))
    },
    averageRating: Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length * 10) / 10,
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    categories: {
      budget: phones.filter(p => p.category === 'budget').length,
      mid_range: phones.filter(p => p.category === 'mid_range').length,
      premium: phones.filter(p => p.category === 'premium').length,
      flagship: phones.filter(p => p.category === 'flagship').length
    }
  };
}

export function getRelatedPhones(phoneId: string, limit: number = 5): Phone[] {
  const phone = getPhoneById(phoneId);
  if (!phone) return [];

  return getAllPhones()
    .filter(p => 
      p.id !== phoneId && 
      (p.brand === phone.brand || p.category === phone.category)
    )
    .sort((a, b) => Math.abs(a.prices.usd - phone.prices.usd) - Math.abs(b.prices.usd - phone.prices.usd))
    .slice(0, limit);
}
