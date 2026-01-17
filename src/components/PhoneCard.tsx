import React from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Phone } from '@/types/phone';
import { usePhoneStore } from '@/store/phoneStore';

interface PhoneCardProps {
  phone: Phone;
  onClick?: () => void;
}

export function PhoneCard({ phone, onClick }: PhoneCardProps) {
  const { addToFavorites, removeFromFavorites, isFavorite, currency, addToComparison } = usePhoneStore();
  const isFav = isFavorite(phone.id);
  const price = phone.prices[currency];

  const currencySymbols: Record<string, string> = {
    'egp': 'ج.م',
    'usd': '$',
    'sar': 'ر.س',
    'aed': 'د.إ'
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      {/* الصورة */}
      <div className="relative overflow-hidden bg-gray-100 h-64">
        <img
          src={phone.image}
          alt={phone.name}
          className="w-full h-full object-cover hover:scale-105 transition cursor-pointer"
          onClick={onClick}
        />
        
        {/* الفئة */}
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {phone.category === 'budget' && 'ميزانية'}
          {phone.category === 'mid_range' && 'متوسط'}
          {phone.category === 'premium' && 'متقدم'}
          {phone.category === 'flagship' && 'فلاجشيب'}
        </div>

        {/* زر المفضلة */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isFav) {
              removeFromFavorites(phone.id);
            } else {
              addToFavorites(phone.id);
            }
          }}
          className="absolute top-2 left-2 bg-white rounded-full p-2 hover:bg-gray-100 transition"
        >
          <Heart
            size={20}
            className={isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>
      </div>

      {/* المعلومات */}
      <div className="p-4">
        {/* الماركة والاسم */}
        <p className="text-gray-500 text-sm">{phone.brand}</p>
        <h3
          className="text-lg font-bold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition"
          onClick={onClick}
        >
          {phone.name}
        </h3>

        {/* التقييم */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-gray-900">{phone.ratings.overall}</span>
          </div>
          <span className="text-gray-500 text-sm">({phone.ratings.userCount} تقييم)</span>
        </div>

        {/* المواصفات الأساسية */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
          <div>
            <p className="text-gray-500">الشاشة</p>
            <p className="font-semibold">{phone.specs.display.size}"</p>
          </div>
          <div>
            <p className="text-gray-500">المعالج</p>
            <p className="font-semibold truncate">{phone.specs.processor.name}</p>
          </div>
          <div>
            <p className="text-gray-500">الذاكرة</p>
            <p className="font-semibold">{phone.specs.ram}GB</p>
          </div>
          <div>
            <p className="text-gray-500">الكاميرا</p>
            <p className="font-semibold">{phone.specs.camera.rear.megapixels}MP</p>
          </div>
        </div>

        {/* السعر */}
        <div className="border-t pt-3 mb-3">
          <p className="text-2xl font-bold text-blue-600">
            {currencySymbols[currency]} {price.toLocaleString()}
          </p>
        </div>

        {/* الأزرار */}
        <div className="flex gap-2">
          <button
            onClick={onClick}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            التفاصيل
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToComparison(phone);
            }}
            className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition font-semibold"
          >
            مقارنة
          </button>
        </div>
      </div>
    </div>
  );
}
