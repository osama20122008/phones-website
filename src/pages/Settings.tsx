import React from 'react';
import { usePhoneStore } from '@/store/phoneStore';

export function Settings() {
  const { currency, setCurrency, language, setLanguage, darkMode, setDarkMode } = usePhoneStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">⚙️ الإعدادات</h1>

        <div className="max-w-2xl">
          {/* العملة */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">💰 العملة</h2>
            <div className="grid grid-cols-2 gap-4">
              {['egp', 'usd', 'sar', 'aed'].map(curr => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr as any)}
                  className={`p-4 rounded-lg border-2 transition ${
                    currency === curr
                      ? 'bg-blue-100 border-blue-600 text-blue-600 font-bold'
                      : 'border-gray-300 text-gray-900 hover:border-blue-600'
                  }`}
                >
                  {curr === 'egp' && 'جنيه مصري (ج.م)'}
                  {curr === 'usd' && 'دولار أمريكي ($)'}
                  {curr === 'sar' && 'ريال سعودي (ر.س)'}
                  {curr === 'aed' && 'درهم إماراتي (د.إ)'}
                </button>
              ))}
            </div>
          </div>

          {/* اللغة */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🌐 اللغة</h2>
            <div className="grid grid-cols-2 gap-4">
              {['ar', 'en'].map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang as any)}
                  className={`p-4 rounded-lg border-2 transition ${
                    language === lang
                      ? 'bg-blue-100 border-blue-600 text-blue-600 font-bold'
                      : 'border-gray-300 text-gray-900 hover:border-blue-600'
                  }`}
                >
                  {lang === 'ar' && 'العربية'}
                  {lang === 'en' && 'English'}
                </button>
              ))}
            </div>
          </div>

          {/* الوضع الليلي */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🌙 الوضع الليلي</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(false)}
                className={`flex-1 p-4 rounded-lg border-2 transition ${
                  !darkMode
                    ? 'bg-yellow-100 border-yellow-600 text-yellow-600 font-bold'
                    : 'border-gray-300 text-gray-900 hover:border-yellow-600'
                }`}
              >
                ☀️ الوضع النهاري
              </button>
              <button
                onClick={() => setDarkMode(true)}
                className={`flex-1 p-4 rounded-lg border-2 transition ${
                  darkMode
                    ? 'bg-gray-800 border-gray-900 text-white font-bold'
                    : 'border-gray-300 text-gray-900 hover:border-gray-900'
                }`}
              >
                🌙 الوضع الليلي
              </button>
            </div>
          </div>

          {/* معلومات الموقع */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ℹ️ حول الموقع</h2>
            <div className="space-y-3 text-gray-700">
              <p><span className="font-bold">اسم الموقع:</span> موقع مواصفات الهواتف الذكية</p>
              <p><span className="font-bold">الإصدار:</span> 1.0.0</p>
              <p><span className="font-bold">عدد الهواتف:</span> 7000+</p>
              <p><span className="font-bold">عدد الماركات:</span> 30+</p>
              <p><span className="font-bold">اللغات المدعومة:</span> العربية، الإنجليزية</p>
              <p><span className="font-bold">العملات المدعومة:</span> جنيه مصري، دولار أمريكي، ريال سعودي، درهم إماراتي</p>
            </div>
          </div>

          {/* التواصل */}
          <div className="bg-blue-50 rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📞 التواصل معنا</h2>
            <div className="space-y-3 text-gray-700">
              <p><span className="font-bold">البريد الإلكتروني:</span> <a href="mailto:info@phones.com" className="text-blue-600 hover:underline">info@phones.com</a></p>
              <p><span className="font-bold">الهاتف:</span> <a href="tel:+966500000000" className="text-blue-600 hover:underline">+966 50 000 0000</a></p>
              <p><span className="font-bold">العنوان:</span> الرياض، المملكة العربية السعودية</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
