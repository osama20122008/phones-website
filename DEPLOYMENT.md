# تعليمات نشر موقع مواصفات الهواتف

## المتطلبات
- Node.js 16+
- npm أو yarn
- خادم ويب (Nginx, Apache, أو أي خادم آخر)

## خطوات النشر المحلي

### 1. التثبيت والبناء
```bash
# استنساخ المستودع
git clone <repository-url>
cd phones_website

# تثبيت المكتبات
npm install

# بناء المشروع
npm run build
```

### 2. النشر على خادم ويب

#### Nginx
```nginx
server {
    listen 80;
    server_name phones.example.com;

    root /var/www/phones_website/dist;
    index index.html;

    # إعادة توجيه جميع الطلبات إلى index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # تخزين مؤقت للملفات الثابتة
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # GZIP compression
    gzip on;
    gzip_types text/plain text/css text/javascript application/javascript application/json;
    gzip_min_length 1000;
}
```

#### Apache
```apache
<VirtualHost *:80>
    ServerName phones.example.com
    DocumentRoot /var/www/phones_website/dist

    <Directory /var/www/phones_website/dist>
        Options -MultiViews
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteRule ^ index.html [QSA,L]
    </Directory>

    # تخزين مؤقت
    <FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
        Header set Cache-Control "max-age=31536000, public"
    </FilesMatch>

    # GZIP compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
    </IfModule>
</VirtualHost>
```

### 3. النشر على منصات الاستضافة

#### Vercel
```bash
# تثبيت Vercel CLI
npm install -g vercel

# النشر
vercel
```

#### Netlify
```bash
# تثبيت Netlify CLI
npm install -g netlify-cli

# النشر
netlify deploy --prod --dir=dist
```

#### GitHub Pages
```bash
# إضافة إلى package.json
"homepage": "https://yourusername.github.io/phones_website"

# بناء ونشر
npm run build
npm install --save-dev gh-pages
npx gh-pages -d dist
```

## متغيرات البيئة

انسخ ملف `.env.example` إلى `.env.local` وعدّل القيم:

```bash
cp .env.example .env.local
```

## التحسينات الموصى بها

### 1. HTTPS
استخدم Let's Encrypt للحصول على شهادة SSL مجانية:
```bash
sudo certbot certonly --standalone -d phones.example.com
```

### 2. CDN
استخدم CDN مثل Cloudflare لتسريع التحميل:
- اذهب إلى cloudflare.com
- أضف موقعك
- غيّر nameservers في مسجل النطاق

### 3. مراقبة الأداء
استخدم أدوات مثل:
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

### 4. SEO
- أضف sitemap.xml
- أضف robots.txt
- استخدم Open Graph meta tags
- أضف structured data (JSON-LD)

## استكشاف الأخطاء

### مشكلة: الصفحة البيضاء بعد النشر
**الحل:** تأكد من أن خادمك يعيد توجيه جميع الطلبات إلى `index.html`

### مشكلة: الملفات الثابتة لا تحمل
**الحل:** تحقق من مسار `dist` وتأكد من أن الملفات موجودة

### مشكلة: بطء التحميل
**الحل:** 
- استخدم GZIP compression
- استخدم CDN
- قلل حجم الصور
- استخدم lazy loading

## النسخ الاحتياطية

```bash
# إنشاء نسخة احتياطية
tar -czf phones_website_backup_$(date +%Y%m%d).tar.gz /var/www/phones_website/

# استعادة النسخة الاحتياطية
tar -xzf phones_website_backup_20240116.tar.gz -C /var/www/
```

## التحديثات

```bash
# سحب التحديثات الأخيرة
git pull origin main

# إعادة بناء المشروع
npm install
npm run build

# نسخ الملفات الجديدة
cp -r dist/* /var/www/phones_website/dist/
```

## الدعم والمساعدة

للمزيد من المعلومات، راجع:
- [توثيق Vite](https://vitejs.dev/)
- [توثيق React](https://react.dev/)
- [توثيق Tailwind CSS](https://tailwindcss.com/)
