import React from 'react';
import { usePhoneStore } from '@/store/phoneStore';
import { getPhoneById } from '@/services/phoneService';
import { Phone } from '@/types/phone';
import { X } from 'lucide-react';

export function Comparison() {
  const { comparisonPhones, removeFromComparison, clearComparison, currency } = usePhoneStore();
  const phones = comparisonPhones
    .map(cp => getPhoneById(cp.id))
    .filter((p): p is Phone => p !== undefined);

  if (phones.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">لا توجد هواتف للمقارنة</h1>
        <p className="text-gray-600 mb-6">أضف هواتف من الصفحة الرئيسية أو البحث لمقارنتها</p>
        <a href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          العودة للرئيسية
        </a>
      </div>
    );
  }

  const currencySymbols: Record<string, string> = {
    'egp': 'ج.م',
    'usd': '$',
    'sar': 'ر.س',
    'aed': 'د.إ'
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">مقارنة الهواتف</h1>
          {phones.length > 0 && (
            <button
              onClick={clearComparison}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              مسح الكل
            </button>
          )}
        </div>

        {/* جدول المقارنة */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="p-4 text-right font-bold text-gray-900 w-40">المواصفات</th>
                {phones.map(phone => (
                  <th key={phone.id} className="p-4 text-center min-w-48">
                    <div className="relative">
                      <button
                        onClick={() => removeFromComparison(phone.id)}
                        className="absolute -top-2 -left-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                      >
                        <X size={16} />
                      </button>
                      <img src={phone.image} alt={phone.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                      <h3 className="font-bold text-gray-900">{phone.name}</h3>
                      <p className="text-gray-600 text-sm">{phone.brand}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* السعر */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">💰 السعر</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {currencySymbols[currency]} {phone.prices[currency].toLocaleString()}
                    </p>
                  </td>
                ))}
              </tr>

              {/* الشاشة */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">📱 حجم الشاشة</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center">{phone.specs.display.size}"</td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">📱 نوع الشاشة</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center">{phone.specs.display.type}</td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">📱 معدل التحديث</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center">{phone.specs.display.refreshRate}Hz</td>
                ))}
              </tr>

              {/* المعالج */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">⚡ المعالج</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center text-sm">{phone.specs.processor.name}</td>
                ))}
              </tr>

              {/* الذاكرة */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">💾 الذاكرة (RAM)</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center">{phone.specs.ram}GB</td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">💾 التخزين</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center">{phone.specs.storage.join(' / ')}GB</td>
                ))}
              </tr>

              {/* الكاميرا */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">📸 الكاميرا الخلفية</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center">{phone.specs.camera.rear.megapixels}MP</td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">📸 الكاميرا الأمامية</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center">{phone.specs.camera.front.megapixels}MP</td>
                ))}
              </tr>

              {/* البطارية */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">🔋 سعة البطارية</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center">{phone.specs.battery.capacity}mAh</td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">🔋 الشحن السريع</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center">{phone.specs.battery.fastCharging}</td>
                ))}
              </tr>

              {/* الأبعاد والوزن */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">⚖️ الوزن</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center">{phone.specs.dimensions.weight}g</td>
                ))}
              </tr>

              {/* التقييمات */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">⭐ التقييم العام</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center">
                    <span className="text-2xl font-bold text-yellow-500">{phone.ratings.overall}</span>
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">📊 تقييم الشاشة</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center">{phone.ratings.display}</td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">📊 تقييم الأداء</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center">{phone.ratings.performance}</td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">📊 تقييم الكاميرا</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center">{phone.ratings.camera}</td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">📊 تقييم البطارية</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center">{phone.ratings.battery}</td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">📊 تقييم التصميم</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center">{phone.ratings.design}</td>
                ))}
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">📊 تقييم القيمة</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center">{phone.ratings.value}</td>
                ))}
              </tr>

              {/* نظام التشغيل */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">🖥️ نظام التشغيل</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center">{phone.specs.os}</td>
                ))}
              </tr>

              {/* الاتصال */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">📡 الاتصال</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center text-sm">
                    {phone.specs.connectivity.join(', ')}
                  </td>
                ))}
              </tr>

              {/* الأمان */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900 bg-gray-50">🔒 الأمان</td>
                {phones.map(phone => (
                  <td key={phone.id} className="p-4 text-center text-sm">
                    {phone.specs.security.join(', ')}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
