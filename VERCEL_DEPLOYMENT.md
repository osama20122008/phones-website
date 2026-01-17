# تعليمات نشر الموقع على Vercel

## 🚀 الخطوات السريعة

### 1. إنشاء حساب Vercel
- اذهب إلى [vercel.com](https://vercel.com)
- اضغط على "Sign Up"
- اختر "Continue with GitHub" أو أي خيار آخر

### 2. ربط المستودع
- اضغط على "New Project"
- اختر مستودعك على GitHub
- اضغط "Import"

### 3. إضافة متغيرات البيئة
في صفحة الإعدادات، أضف المتغيرات التالية:

```
VITE_API_URL=https://your-api-domain.com
DATABASE_URL=postgresql://user:password@host:5432/phones_db
```

### 4. النشر
اضغط على "Deploy" وانتظر انتهاء النشر

---

## 📊 إعداد قاعدة البيانات

### الخيار 1: Vercel Postgres (الموصى به)
1. في لوحة تحكم Vercel، اذهب إلى "Storage"
2. اضغط "Create Database"
3. اختر "Postgres"
4. اتبع الخطوات
5. سيتم إضافة `DATABASE_URL` تلقائياً

### الخيار 2: قاعدة بيانات خارجية
استخدم أي مزود قاعدة بيانات PostgreSQL:
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)
- [Render](https://render.com)
- [Heroku Postgres](https://www.heroku.com/postgres)

---

## 🔧 إعداد Backend API

### 1. إنشاء API Routes
في Vercel، يمكنك استخدام Serverless Functions:

```
api/
├── favorites.ts
├── ratings.ts
└── health.ts
```

### 2. مثال: api/favorites.ts
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from '@vercel/postgres';

const pool = new Pool();

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  
  try {
    const result = await pool.query(
      'SELECT * FROM favorites WHERE user_id = $1',
      [userId]
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  try {
    const result = await pool.query(
      'INSERT INTO favorites (user_id, phone_id, phone_name) VALUES ($1, $2, $3) RETURNING *',
      [body.userId, body.phoneId, body.phoneName]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

---

## 🌍 إعداد النطاق (Domain)

### 1. شراء نطاق
- من Vercel مباشرة
- أو من مزود آخر (GoDaddy, Namecheap, إلخ)

### 2. ربط النطاق
في Vercel:
1. اذهب إلى "Settings" > "Domains"
2. أضف نطاقك
3. اتبع التعليمات لتحديث DNS

---

## 📋 قائمة التحقق

- [ ] حساب Vercel مُنشأ
- [ ] المستودع مرتبط
- [ ] متغيرات البيئة مضافة
- [ ] قاعدة البيانات مُعدة
- [ ] API Routes مُنشأة
- [ ] النشر الأول نجح
- [ ] الموقع يعمل بشكل صحيح
- [ ] النطاق مرتبط (اختياري)

---

## 🐛 استكشاف الأخطاء

### مشكلة: خطأ في البناء
**الحل:** تحقق من ملف البناء والمتغيرات المفقودة

### مشكلة: قاعدة البيانات لا تتصل
**الحل:** تحقق من `DATABASE_URL` والإذن الصحيح

### مشكلة: API لا يستجيب
**الحل:** تحقق من Serverless Functions وسجلات الأخطاء

---

## 📞 الدعم

- [توثيق Vercel](https://vercel.com/docs)
- [توثيق Vercel Postgres](https://vercel.com/docs/storage/postgres)
- [منتدى Vercel](https://github.com/vercel/vercel/discussions)

---

**تم النشر بنجاح! 🎉**
