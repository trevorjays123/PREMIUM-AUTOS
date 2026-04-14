const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Car data - Complete Nigerian dealership inventory
const cars = [
  {
    id: 1,
    name: 'Toyota Corolla',
    year: 2026,
    price: 50000000,
    priceNaira: '₦50,000,000',
    condition: 'Brand New',
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500'
  },
  {
    id: 2,
    name: 'Toyota Camry',
    year: 2026,
    price: 68000000,
    priceNaira: '₦68,000,000',
    condition: 'Brand New',
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500'
  },
  {
    id: 3,
    name: 'Toyota Hilux',
    year: 2026,
    price: 95000000,
    priceNaira: '₦95,000,000',
    condition: 'Brand New',
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=500'
  },
  {
    id: 4,
    name: 'Lexus RX 350',
    year: 2026,
    price: 195000000,
    priceNaira: '₦195,000,000',
    condition: 'Brand New',
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1533473359331-fd322f7a7f78?w=500'
  },
  {
    id: 5,
    name: 'Toyota Land Cruiser LC300',
    year: 2026,
    price: 250000000,
    priceNaira: '₦250,000,000',
    condition: 'Brand New',
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1533473359331-fd322f7a7f78?w=500'
  }
];

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Serve root as index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes
app.get('/api/cars', (req, res) => {
  res.json(cars);
});

app.get('/api/cars/:id', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (car) res.json(car);
  else res.status(404).json({ error: 'Car not found' });
});

app.post('/api/inquiry', (req, res) => {
  const { name, phone, carName, message = '' } = req.body;
  const whatsappMessage = `Hello! I'm interested in the ${carName}.\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/2348123456789?text=${encodedMessage}`;
  res.json({ whatsappUrl });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Premium Auto Motors Server LIVE!`);
  console.log(`🌐 Homepage: http://localhost:${PORT}`);
  console.log(`📱 API Cars: http://localhost:${PORT}/api/cars`);
  console.log(`📁 Static files: /public served`);
});
