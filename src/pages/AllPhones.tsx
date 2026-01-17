import React, { useState, useMemo } from 'react';
import { PhoneCard } from '@/components/PhoneCard';
import { getAllPhones, getAllBrands, searchPhones } from '@/services/phoneService';
import { usePhoneStore } from '@/store/phoneStore';
import { Phone, SearchFilters } from '@/types/phone';
import { ChevronDown } from 'lucide-react';

export function AllPhones() {
  const { searchFilters, setSearchFilters, currency } = usePhoneStore();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('latest');

  const allBrands = getAllBrands();
  const results = useMemo(() => {
    let phones = searchPhones(searchFilters);

    // الترتيب
    switch (sortBy) {
      case 'latest':
        phones.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
      case 'rating':
        phones.sort((a, b) => b.ratings.overall - a.ratings.overall);
        break;
      case 'price-low':
        phones.sort((a, b) => a.prices[currency] - b.prices[currency]);
        break;
      case 'price-high':
        phones.sort((a, b) => b.prices[currency] - a.prices[currency]);
        break;
      case 'camera':
        phones.sort((a, b) => b.ratings.camera - a.ratings.camera);
        break;
      case 'performance':
        phones.sort((a, b) => b.ratings.performance - a.ratings.performance);
        break;
      default:
        break;
    }

    return phones;
  }, [searchFilters, sortBy, currency]);

  const handleBrandToggle = (brand: string) => {
    const newBrands = searchFilters.brands.includes(brand)
      ? searchFilters.brands.filter(b => b !== brand)
      : [...searchFilters.brands, brand];
    setSearchFilters({ ...searchFilters, brands: newBrands });
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = searchFilters.categories.includes(category)
      ? searchFilters.categories.filter(c => c !== category)
      : [...searchFilters.categories, category];
    setSearchFilters({ ...searchFilters, categories: newCategories });
  };

  const handlePriceChange = (min: number, max: number) => {
    setSearchFilters({
      ...searchFilters,
      priceRange: { min, max }
    });
  };

  const handleRatingChange = (rating: number) => {
    setSearchFilters({
      ...searchFilters,
      minRating: rating
    });
  };

  const handleClearFilters = () => {
    setSearchFilters({
      searchQuery: '',
      brands: [],
      priceRange: { min: 0, max: 100000 },
      categories: [],
      minRating: 0,
      currency
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">جميع الهواتف</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* الفلاتر */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h2 className="text-lg font-bold text-gray-900">الفلاتر</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ChevronDown size={20} className={`transition ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {(showFilters || window.innerWidth >= 1024) && (
                <div className="space-y-6">
                  {/* السعر */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">السعر</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => handlePriceChange(0, 1000)}
                        className={`w-full text-right px-3 py-2 rounded-lg transition ${
                          searchFilters.priceRange.max === 1000
                            ? 'bg-blue-100 text-blue-600 font-semibold'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        أقل من 1000 ج.م
                      </button>
                      <button
                        onClick={() => handlePriceChange(1000, 3000)}
                        className={`w-full text-right px-3 py-2 rounded-lg transition ${
                          searchFilters.priceRange.min === 1000 && searchFilters.priceRange.max === 3000
                            ? 'bg-blue-100 text-blue-600 font-semibold'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        1000 - 3000 ج.م
                      </button>
                      <button
                        onClick={() => handlePriceChange(3000, 6000)}
                        className={`w-full text-right px-3 py-2 rounded-lg transition ${
                          searchFilters.priceRange.min === 3000 && searchFilters.priceRange.max === 6000
                            ? 'bg-blue-100 text-blue-600 font-semibold'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        3000 - 6000 ج.م
                      </button>
                      <button
                        onClick={() => handlePriceChange(6000, 100000)}
                        className={`w-full text-right px-3 py-2 rounded-lg transition ${
                          searchFilters.priceRange.min === 6000
                            ? 'bg-blue-100 text-blue-600 font-semibold'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        أكثر من 6000 ج.م
                      </button>
                    </div>
                  </div>

                  {/* الفئة */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">الفئة</h3>
                    <div className="space-y-2">
                      {['budget', 'mid_range', 'premium', 'flagship'].map(category => (
                        <label key={category} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={searchFilters.categories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="w-4 h-4 rounded"
                          />
                          <span className="text-gray-700">
                            {category === 'budget' && 'ميزانية'}
                            {category === 'mid_range' && 'متوسط'}
                            {category === 'premium' && 'متقدم'}
                            {category === 'flagship' && 'فلاجشيب'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* التقييم */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">التقييم الأدنى</h3>
                    <div className="space-y-2">
                      {[0, 6, 7, 8, 9].map(rating => (
                        <button
                          key={rating}
                          onClick={() => handleRatingChange(rating)}
                          className={`w-full text-right px-3 py-2 rounded-lg transition ${
                            searchFilters.minRating === rating
                              ? 'bg-blue-100 text-blue-600 font-semibold'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {rating === 0 ? 'الكل' : `${rating}+ نجوم`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* الماركات */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">الماركات</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {allBrands.slice(0, 15).map(brand => (
                        <label key={brand} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={searchFilters.brands.includes(brand)}
                            onChange={() => handleBrandToggle(brand)}
                            className="w-4 h-4 rounded"
                          />
                          <span className="text-gray-700">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* زر مسح الفلاتر */}
                  <button
                    onClick={handleClearFilters}
                    className="w-full bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition font-semibold"
                  >
                    مسح الفلاتر
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* النتائج */}
          <div className="lg:col-span-3">
            {/* شريط الترتيب */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-md">
              <div>
                <p className="text-gray-600">
                  عدد النتائج: <span className="font-bold text-gray-900">{results.length}</span>
                </p>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="latest">الأحدث</option>
                <option value="rating">الأفضل تقييماً</option>
                <option value="price-low">السعر: الأقل أولاً</option>
                <option value="price-high">السعر: الأعلى أولاً</option>
                <option value="camera">أفضل الكاميرات</option>
                <option value="performance">أفضل الأداء</option>
              </select>
            </div>

            {/* شبكة الهواتف */}
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map(phone => (
                  <PhoneCard key={phone.id} phone={phone} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-2xl text-gray-600 mb-4">لم نجد هواتف تطابق معاييرك</p>
                <button
                  onClick={handleClearFilters}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  مسح الفلاتر والمحاولة مرة أخرى
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
