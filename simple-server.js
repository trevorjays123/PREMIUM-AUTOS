const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Car data
const cars = [
  {
    id: 1,
    name: 'Toyota Corolla',
    year: 2026,
    price: 50000000,
    priceNaira: '₦50,000,000',
    condition: 'Brand New',
    transmission: 'Automatic',
    mileage: 0,
    fuelType: 'Petrol',
    color: 'White',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
    isNew: true,
    isFeatured: true,
    images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500'],
    description: 'Latest Toyota Corolla for Nigerian roads',
    source: 'Carlots.ng'
  },
  {
    id: 2,
    name: 'Toyota Camry',
    year: 2026,
    price: 68000000,
    priceNaira: '₦68,000,000',
    condition: 'Brand New',
    transmission: 'Automatic',
    mileage: 0,
    fuelType: 'Petrol',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
    isNew: true,
    isFeatured: true,
    images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500'],
    description: 'Luxury sedan for executives',
    source: 'Autochek'
  },
  {
    id: 3,
    name: 'Toyota Hilux',
    year: 2026,
    price: 95000000,
    priceNaira: '₦95,000,000',
    condition: 'Brand New',
    transmission: 'Automatic',
    mileage: 0,
    fuelType: 'Diesel',
    color: 'Green',
    image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=500',
    isNew: true,
    isFeatured: true,
    images: ['https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=500'],
    description: 'Built for Nigerian terrain',
    source: 'Cars.ng'
  }
];

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes
app.get('/api/cars', (req, res) => {
  const { featured, new: isNew } = req.query;
  let filteredCars = [...cars];
  
  if (featured === 'true') {
    filteredCars = filteredCars.filter(car => car.isFeatured);
  }
  
  if (isNew === 'true') {
    filteredCars = filteredCars.filter(car => car.isNew);
  }
  
  res.json(filteredCars);
});

app.get('/api/cars/:id', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ error: 'Car not found' });
  }
});

app.post('/api/inquiry', (req, res) => {
  const { name, phone, carName, message } = req.body;
  const whatsappMessage = `Hello! I'm interested in the ${carName}.\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/2348000000000?text=${encodedMessage}`;
  res.json({ whatsappUrl });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running!`);
  console.log(`🌐 Open http://localhost:${PORT} in your browser`);
  console.log(`📁 Serving static files from 'public' folder`);
  console.log(`🔗 Test API: http://localhost:${PORT}/api/cars`);
});
