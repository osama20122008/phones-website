import React, { useState } from 'react';
import { Search, Menu, X, Heart, BarChart3, Settings } from 'lucide-react';
import { usePhoneStore } from '@/store/phoneStore';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { searchFilters, setSearchFilters, comparisonPhones, favorites } = usePhoneStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilters({
      ...searchFilters,
      searchQuery: e.target.value
    });
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        {/* الصف الأول - الشعار والبحث */}
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* الشعار */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">📱</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">مواصفات الهواتف</h1>
          </div>

          {/* شريط البحث */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute right-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ابحث عن هاتف..."
                value={searchFilters.searchQuery}
                onChange={handleSearch}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* الأيقونات */}
          <div className="flex items-center gap-4">
            {/* المقارنة */}
            <a href="/comparison" className="relative text-gray-600 hover:text-blue-600 transition">
              <BarChart3 size={24} />
              {comparisonPhones.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {comparisonPhones.length}
                </span>
              )}
            </a>

            {/* المفضلة */}
            <a href="/favorites" className="relative text-gray-600 hover:text-red-600 transition">
              <Heart size={24} />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </a>

            {/* الإعدادات */}
            <a href="/settings" className="text-gray-600 hover:text-gray-900 transition">
              <Settings size={24} />
            </a>

            {/* القائمة */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* القائمة المحمولة */}
        {isMenuOpen && (
          <nav className="md:hidden border-t pt-4 space-y-2">
            <a href="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              الرئيسية
            </a>
            <a href="/phones" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              جميع الهواتف
            </a>
            <a href="/comparison" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              المقارنة
            </a>
            <a href="/favorites" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              المفضلة
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
