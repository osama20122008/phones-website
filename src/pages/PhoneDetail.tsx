import React, { useState, useEffect } from 'react';
import { Phone } from '@/types/phone';
import { getPhoneById, getRelatedPhones, convertPrice } from '@/services/phoneService';
import { usePhoneStore } from '@/store/phoneStore';
import { Heart, Star, ShoppingCart, TrendingUp, Zap, Camera, Battery, Smartphone } from 'lucide-react';
import { PhoneCard } from '@/components/PhoneCard';

interface PhoneDetailProps {
  phoneId: string;
}

export function PhoneDetail({ phoneId }: PhoneDetailProps) {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [relatedPhones, setRelatedPhones] = useState<Phone[]>([]);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const { addToFavorites, removeFromFavorites, isFavorite, currency, addToComparison } = usePhoneStore();
  const isFav = phone ? isFavorite(phone.id) : false;

  useEffect(() => {
    const phoneData = getPhoneById(phoneId);
    if (phoneData) {
      setPhone(phoneData);
      setRelatedPhones(getRelatedPhones(phoneId, 4));
    }
  }, [phoneId]);

  if (!phone) {
    return <div className="container mx-auto px-4 py-12 text-center">جاري التحميل...</div>;
  }

  const price = phone.prices[currency];
  const currencySymbols: Record<string, string> = {
    'egp': 'ج.م',
    'usd': '$',
    'sar': 'ر.س',
    'aed': 'د.إ'
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* الصف الأول - الصورة والمعلومات الأساسية */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* الصورة */}
          <div className="flex flex-col gap-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden h-96 flex items-center justify-center">
              <img src={phone.image} alt={phone.name} className="w-full h-full object-cover" />
            </div>
            {/* الألوان */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">الألوان المتاحة:</h3>
              <div className="flex gap-2">
                {phone.specs.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-12 h-12 rounded-lg border-2 transition ${
                      selectedColor === idx ? 'border-blue-600' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* المعلومات */}
          <div>
            {/* الماركة والاسم */}
            <p className="text-gray-500 text-sm mb-2">{phone.brand}</p>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{phone.name}</h1>

            {/* التقييم */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.round(phone.ratings.overall / 2) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-2xl font-bold text-gray-900">{phone.ratings.overall}</span>
              </div>
              <span className="text-gray-600">({phone.ratings.userCount} تقييم)</span>
            </div>

            {/* السعر */}
            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-2">السعر</p>
              <p className="text-4xl font-bold text-blue-600 mb-2">
                {currencySymbols[currency]} {price.toLocaleString()}
              </p>
              <p className="text-gray-600 text-sm">
                تاريخ الإصدار: {new Date(phone.releaseDate).toLocaleDateString('ar-EG')}
              </p>
            </div>

            {/* التخزين */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">التخزين:</h3>
              <div className="flex gap-2">
                {phone.specs.storage.map((storage, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedStorage(idx)}
                    className={`px-4 py-2 rounded-lg border-2 transition ${
                      selectedStorage === idx
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 text-gray-900 hover:border-blue-600'
                    }`}
                  >
                    {storage}GB
                  </button>
                ))}
              </div>
            </div>

            {/* الأزرار */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => {
                  if (isFav) {
                    removeFromFavorites(phone.id);
                  } else {
                    addToFavorites(phone.id);
                  }
                }}
                className={`flex-1 py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
                  isFav
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                <Heart size={20} className={isFav ? 'fill-red-600' : ''} />
                {isFav ? 'مضاف للمفضلة' : 'أضف للمفضلة'}
              </button>
              <button
                onClick={() => addToComparison(phone)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <TrendingUp size={20} />
                أضف للمقارنة
              </button>
            </div>

            {/* المتاجر */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">متاجر البيع:</h3>
              <div className="space-y-2">
                {phone.shops.map((shop, idx) => (
                  <a
                    key={idx}
                    href={shop.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{shop.name}</p>
                      <p className={shop.inStock ? 'text-green-600 text-sm' : 'text-red-600 text-sm'}>
                        {shop.inStock ? '✓ متوفر' : '✗ غير متوفر'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">{shop.currency} {shop.price}</p>
                      <ShoppingCart size={16} className="text-blue-600" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* المواصفات التفصيلية */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">المواصفات التفصيلية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* الشاشة */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="text-blue-600" size={24} />
                <h3 className="text-xl font-bold text-gray-900">الشاشة</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li><span className="font-semibold">الحجم:</span> {phone.specs.display.size}"</li>
                <li><span className="font-semibold">الدقة:</span> {phone.specs.display.resolution}</li>
                <li><span className="font-semibold">النوع:</span> {phone.specs.display.type}</li>
                <li><span className="font-semibold">معدل التحديث:</span> {phone.specs.display.refreshRate}Hz</li>
                <li><span className="font-semibold">السطوع:</span> {phone.specs.display.brightness} nits</li>
              </ul>
            </div>

            {/* المعالج */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-yellow-600" size={24} />
                <h3 className="text-xl font-bold text-gray-900">المعالج</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li><span className="font-semibold">المعالج:</span> {phone.specs.processor.name}</li>
                <li><span className="font-semibold">الأنوية:</span> {phone.specs.processor.cores}</li>
                <li><span className="font-semibold">السرعة:</span> {phone.specs.processor.speed}</li>
                <li><span className="font-semibold">GPU:</span> {phone.specs.processor.gpu}</li>
              </ul>
            </div>

            {/* الكاميرا */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Camera className="text-red-600" size={24} />
                <h3 className="text-xl font-bold text-gray-900">الكاميرا</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li><span className="font-semibold">الخلفية:</span> {phone.specs.camera.rear.megapixels}MP</li>
                <li><span className="font-semibold">الفتحة:</span> {phone.specs.camera.rear.aperture}</li>
                <li><span className="font-semibold">الأمامية:</span> {phone.specs.camera.front.megapixels}MP</li>
                <li><span className="font-semibold">المميزات:</span> {phone.specs.camera.rear.features.join(', ')}</li>
              </ul>
            </div>

            {/* البطارية */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Battery className="text-green-600" size={24} />
                <h3 className="text-xl font-bold text-gray-900">البطارية</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li><span className="font-semibold">السعة:</span> {phone.specs.battery.capacity}mAh</li>
                <li><span className="font-semibold">الشحن السريع:</span> {phone.specs.battery.fastCharging}</li>
                <li><span className="font-semibold">الشحن اللاسلكي:</span> {phone.specs.battery.wireless ? 'نعم' : 'لا'}</li>
              </ul>
            </div>

            {/* الذاكرة */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">الذاكرة</h3>
              <ul className="space-y-2 text-gray-600">
                <li><span className="font-semibold">RAM:</span> {phone.specs.ram}GB</li>
                <li><span className="font-semibold">التخزين:</span> {phone.specs.storage.join(' / ')}GB</li>
                <li><span className="font-semibold">نظام التشغيل:</span> {phone.specs.os}</li>
              </ul>
            </div>

            {/* الأبعاد */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">الأبعاد والوزن</h3>
              <ul className="space-y-2 text-gray-600">
                <li><span className="font-semibold">الارتفاع:</span> {phone.specs.dimensions.height}mm</li>
                <li><span className="font-semibold">العرض:</span> {phone.specs.dimensions.width}mm</li>
                <li><span className="font-semibold">السمك:</span> {phone.specs.dimensions.depth}mm</li>
                <li><span className="font-semibold">الوزن:</span> {phone.specs.dimensions.weight}g</li>
              </ul>
            </div>
          </div>
        </div>

        {/* التقييمات */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">التقييمات</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <p className="text-gray-600 text-sm mb-2">الشاشة</p>
              <p className="text-3xl font-bold text-blue-600">{phone.ratings.display}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg">
              <p className="text-gray-600 text-sm mb-2">الأداء</p>
              <p className="text-3xl font-bold text-yellow-600">{phone.ratings.performance}</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
              <p className="text-gray-600 text-sm mb-2">الكاميرا</p>
              <p className="text-3xl font-bold text-red-600">{phone.ratings.camera}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <p className="text-gray-600 text-sm mb-2">البطارية</p>
              <p className="text-3xl font-bold text-green-600">{phone.ratings.battery}</p>
            </div>
          </div>
        </div>

        {/* الهواتف ذات الصلة */}
        {relatedPhones.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">هواتف ذات صلة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPhones.map(relatedPhone => (
                <PhoneCard key={relatedPhone.id} phone={relatedPhone} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
