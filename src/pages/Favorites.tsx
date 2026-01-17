import React from 'react';
import { usePhoneStore } from '@/store/phoneStore';
import { getPhoneById } from '@/services/phoneService';
import { Phone } from '@/types/phone';
import { PhoneCard } from '@/components/PhoneCard';

export function Favorites() {
  const { favorites } = usePhoneStore();
  const favoritePhones = favorites
    .map(id => getPhoneById(id))
    .filter((p): p is Phone => p !== undefined);

  if (favoritePhones.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">❤️ المفضلة</h1>
        <p className="text-gray-600 mb-6">لم تضف أي هواتف للمفضلة بعد</p>
        <a href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          ابدأ البحث
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">❤️ المفضلة</h1>
        <p className="text-gray-600 mb-8">{favoritePhones.length} هاتف مفضل</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoritePhones.map(phone => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </div>
    </div>
  );
}
