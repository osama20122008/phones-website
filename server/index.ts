import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// إعداد قاعدة البيانات
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(cors());
app.use(express.json());

// API Routes

// الحصول على جميع الهواتف المفضلة للمستخدم
app.get('/api/favorites/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      'SELECT * FROM favorites WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// إضافة هاتف للمفضلة
app.post('/api/favorites', async (req, res) => {
  try {
    const { userId, phoneId, phoneName, phoneImage, phonePrice } = req.body;
    const result = await pool.query(
      'INSERT INTO favorites (user_id, phone_id, phone_name, phone_image, phone_price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, phoneId, phoneName, phoneImage, phonePrice]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

// حذف هاتف من المفضلة
app.delete('/api/favorites/:userId/:phoneId', async (req, res) => {
  try {
    const { userId, phoneId } = req.params;
    await pool.query(
      'DELETE FROM favorites WHERE user_id = $1 AND phone_id = $2',
      [userId, phoneId]
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete favorite' });
  }
});

// الحصول على جميع التقييمات للهاتف
app.get('/api/ratings/:phoneId', async (req, res) => {
  try {
    const { phoneId } = req.params;
    const result = await pool.query(
      'SELECT * FROM ratings WHERE phone_id = $1 ORDER BY created_at DESC',
      [phoneId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
});

// إضافة تقييم للهاتف
app.post('/api/ratings', async (req, res) => {
  try {
    const { userId, phoneId, rating, comment } = req.body;
    const result = await pool.query(
      'INSERT INTO ratings (user_id, phone_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, phoneId, rating, comment]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add rating' });
  }
});

// الحصول على متوسط التقييمات
app.get('/api/ratings-average/:phoneId', async (req, res) => {
  try {
    const { phoneId } = req.params;
    const result = await pool.query(
      'SELECT AVG(rating) as average, COUNT(*) as count FROM ratings WHERE phone_id = $1',
      [phoneId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch ratings average' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// بدء الخادم
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
