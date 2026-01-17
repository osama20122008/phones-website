import React, { useState, useEffect } from 'react';
import { PhoneCard } from '@/components/PhoneCard';
import { getLatestPhones, getTopRatedPhones, getStatistics, getBestPhonesByFeature } from '@/services/phoneService';
import { Phone } from '@/types/phone';
import { TrendingUp, Award, Zap, Camera, Battery, Smartphone } from 'lucide-react';

export function Home() {
  const [latestPhones, setLatestPhones] = useState<Phone[]>([]);
  const [topRatedPhones, setTopRatedPhones] = useState<Phone[]>([]);
  const [bestCamera, setBestCamera] = useState<Phone[]>([]);
  const [bestPerformance, setBestPerformance] = useState<Phone[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    setLatestPhones(getLatestPhones(8));
    setTopRatedPhones(getTopRatedPhones(8));
    setBestCamera(getBestPhonesByFeature('camera').slice(0, 4));
    setBestPerformance(getBestPhonesByFeature('performance').slice(0, 4));
    setStats(getStatistics());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* البانر الرئيسي */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            اكتشف أفضل الهواتف الذكية
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            قارن المواصفات والأسعار والتقييمات من أفضل الهواتف في السوق
          </p>
          <a
            href="/phones"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
          >
            استكشف جميع الهواتف
          </a>
        </div>
      </section>

      {/* الإحصائيات */}
      {stats && (
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Smartphone className="mx-auto mb-3 text-blue-600" size={32} />
              <h3 className="text-3xl font-bold text-gray-900">{stats.totalPhones.toLocaleString()}</h3>
              <p className="text-gray-600">هاتف في قاعدة البيانات</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Award className="mx-auto mb-3 text-yellow-600" size={32} />
              <h3 className="text-3xl font-bold text-gray-900">{stats.totalBrands}</h3>
              <p className="text-gray-600">ماركة عالمية</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <TrendingUp className="mx-auto mb-3 text-green-600" size={32} />
              <h3 className="text-3xl font-bold text-gray-900">{stats.averageRating}</h3>
              <p className="text-gray-600">متوسط التقييم</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Zap className="mx-auto mb-3 text-red-600" size={32} />
              <h3 className="text-3xl font-bold text-gray-900">{stats.averagePrice.egp.toLocaleString()}</h3>
              <p className="text-gray-600">متوسط السعر (ج.م)</p>
            </div>
          </div>
        </section>
      )}

      {/* أحدث الهواتف */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">🆕 أحدث الهواتف</h2>
          <a href="/phones?sort=latest" className="text-blue-600 hover:text-blue-800 font-semibold">
            عرض الكل →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestPhones.map(phone => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </section>

      {/* أفضل الهواتف تقييماً */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">⭐ الأفضل تقييماً</h2>
          <a href="/phones?sort=rating" className="text-blue-600 hover:text-blue-800 font-semibold">
            عرض الكل →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRatedPhones.map(phone => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </section>

      {/* أفضل الكاميرات */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">📸 أفضل الكاميرات</h2>
          <a href="/phones?sort=camera" className="text-blue-600 hover:text-blue-800 font-semibold">
            عرض الكل →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestCamera.map(phone => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </section>

      {/* أفضل الأداء */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">⚡ أفضل الأداء</h2>
          <a href="/phones?sort=performance" className="text-blue-600 hover:text-blue-800 font-semibold">
            عرض الكل →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestPerformance.map(phone => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </section>

      {/* الفئات */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">تصفح حسب الفئة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/phones?category=budget" className="bg-gradient-to-br from-green-400 to-green-600 text-white p-8 rounded-lg hover:shadow-lg transition">
            <h3 className="text-2xl font-bold mb-2">💰 الميزانية</h3>
            <p>هواتف اقتصادية وموثوقة</p>
          </a>
          <a href="/phones?category=mid_range" className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-8 rounded-lg hover:shadow-lg transition">
            <h3 className="text-2xl font-bold mb-2">📱 المتوسطة</h3>
            <p>توازن مثالي بين السعر والأداء</p>
          </a>
          <a href="/phones?category=premium" className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-8 rounded-lg hover:shadow-lg transition">
            <h3 className="text-2xl font-bold mb-2">👑 المتقدمة</h3>
            <p>أداء عالي وميزات متقدمة</p>
          </a>
          <a href="/phones?category=flagship" className="bg-gradient-to-br from-red-400 to-red-600 text-white p-8 rounded-lg hover:shadow-lg transition">
            <h3 className="text-2xl font-bold mb-2">🚀 الفلاجشيب</h3>
            <p>أحدث التكنولوجيا والابتكار</p>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">عن الموقع</h3>
              <p className="text-gray-400">موقع احترافي لمقارنة مواصفات الهواتف الذكية مع أسعار حقيقية وتقييمات المستخدمين.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">الروابط السريعة</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white transition">الرئيسية</a></li>
                <li><a href="/phones" className="hover:text-white transition">جميع الهواتف</a></li>
                <li><a href="/comparison" className="hover:text-white transition">المقارنة</a></li>
                <li><a href="/favorites" className="hover:text-white transition">المفضلة</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">الفئات</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/phones?category=budget" className="hover:text-white transition">الميزانية</a></li>
                <li><a href="/phones?category=mid_range" className="hover:text-white transition">المتوسطة</a></li>
                <li><a href="/phones?category=premium" className="hover:text-white transition">المتقدمة</a></li>
                <li><a href="/phones?category=flagship" className="hover:text-white transition">الفلاجشيب</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">التواصل</h3>
              <ul className="space-y-2 text-gray-400">
                <li>البريد الإلكتروني: info@phones.com</li>
                <li>الهاتف: +966 50 000 0000</li>
                <li>العنوان: الرياض، السعودية</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 موقع مواصفات الهواتف. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
