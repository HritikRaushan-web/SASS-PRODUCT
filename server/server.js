require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB, getDatabaseStatus } = require('./db');

const productRoutes = require('./routes/products');
const checkoutRoutes = require('./routes/checkout');
const inquiryRoutes = require('./routes/inquiries');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/admin', adminRoutes);

// Health check and database status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Prestige Intelligence',
    version: '2.0.0',
    time: new Date().toISOString(),
    database: getDatabaseStatus()
  });
});

// Serve frontend static assets in production if available
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// For SPA client routing, return index.html for non-API routes
app.use((req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      // In development mode when dist is not built yet
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head><title>Prestige Intelligence API Server</title></head>
        <body style="font-family:sans-serif;background:#090d16;color:#e2e8f0;padding:40px;line-height:1.6">
          <h1 style="color:#60a5fa">Prestige Intelligence Backend is Running</h1>
          <p>API endpoints active:</p>
          <ul>
            <li><a style="color:#38bdf8" href="/api/health">/api/health</a> - System & Database Health</li>
            <li><a style="color:#38bdf8" href="/api/products">/api/products</a> - Software Catalog (MongoDB)</li>
            <li><a style="color:#38bdf8" href="/api/admin/stats">/api/admin/stats</a> - Admin & Telemetry</li>
          </ul>
        </body>
        </html>
      `);
    }
  });
});

// Start database connection & HTTP server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` PRESTIGE INTELLIGENCE SERVER ACTIVE`);
    console.log(` URL: http://localhost:${PORT}`);
    console.log(` API Health: http://localhost:${PORT}/api/health`);
    console.log(` Catalog: http://localhost:${PORT}/api/products`);
    console.log(` Database: ${JSON.stringify(getDatabaseStatus().engine)}`);
    console.log(`====================================================`);
  });
}

startServer();
