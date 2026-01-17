export interface Phone {
  id: string;
  name: string;
  brand: string;
  model: string;
  image: string;
  releaseDate: string;
  category: 'budget' | 'mid_range' | 'premium' | 'flagship';
  
  // المواصفات
  specs: {
    display: {
      size: number; // بالبوصة
      resolution: string; // مثل 1440x3200
      type: string; // AMOLED, IPS LCD, etc
      refreshRate: number; // Hz
      brightness: number; // nits
    };
    processor: {
      name: string;
      cores: number;
      speed: string;
      gpu: string;
    };
    ram: number; // GB
    storage: number[]; // GB options
    camera: {
      rear: {
        megapixels: number;
        aperture: string;
        features: string[];
      };
      front: {
        megapixels: number;
        aperture: string;
      };
    };
    battery: {
      capacity: number; // mAh
      fastCharging: string;
      wireless: boolean;
    };
    os: string; // iOS, Android
    dimensions: {
      height: number;
      width: number;
      depth: number;
      weight: number;
    };
    connectivity: string[];
    security: string[];
    colors: string[];
  };

  // الأسعار
  prices: {
    egp: number;
    usd: number;
    sar: number;
    aed: number;
  };

  // المتاجر والروابط
  shops: Array<{
    name: string;
    price: number;
    currency: string;
    url: string;
    inStock: boolean;
  }>;

  // التقييمات
  ratings: {
    overall: number; // 0-10
    display: number;
    performance: number;
    camera: number;
    battery: number;
    design: number;
    value: number;
    userCount: number;
  };

  // المراجعات
  reviews: Array<{
    id: string;
    author: string;
    rating: number;
    title: string;
    content: string;
    date: string;
    helpful: number;
  }>;

  // المقالات
  articles: Array<{
    id: string;
    title: string;
    content: string;
    author: string;
    date: string;
    image: string;
  }>;

  // المميزات الإضافية
  features: string[];
  pros: string[];
  cons: string[];
}

export interface SearchFilters {
  searchQuery: string;
  brands: string[];
  priceRange: {
    min: number;
    max: number;
  };
  categories: string[];
  minRating: number;
  currency: 'egp' | 'usd' | 'sar' | 'aed';
}

export interface ComparisonPhone {
  id: string;
  name: string;
  image: string;
  price: number;
  ratings: {
    overall: number;
    display: number;
    performance: number;
    camera: number;
    battery: number;
  };
}
