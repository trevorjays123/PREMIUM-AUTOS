// simple-server.js - Production Ready for Render
const express = require('express');
const path = require('path');

const app = express();
// Use the PORT provided by Render, or default to 3001 for local testing
const PORT = process.env.PORT || 3001;

// Car data with Nigerian market prices
const cars = [
  {
    id: 1,
    name: 'Toyota Corolla',
    year: 2026,
    priceNaira: '₦50,000,000',
    condition: 'Brand New',
    transmission: 'Automatic',
    mileage: 0,
    fuelType: 'Petrol',
    color: 'Pearl White',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
    isNew: true,
    isFeatured: true,
    description: 'The all-new 2026 Toyota Corolla combines fuel efficiency with modern styling. Perfect for Nigerian roads.'
  },
  {
    id: 2,
    name: 'Toyota Camry',
    year: 2026,
    priceNaira: '₦68,000,000',
    condition: 'Brand New',
    transmission: 'Automatic',
    mileage: 0,
    fuelType: 'Petrol',
    color: 'Midnight Black',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500',
    isNew: true,
    isFeatured: true,
    description: 'Luxury sedan with premium features. Ideal for executives and families.'
  },
  {
    id: 3,
    name: 'Toyota Hilux',
    year: 2026,
    priceNaira: '₦95,000,000',
    condition: 'Brand New',
    transmission: 'Automatic',
    mileage: 0,
    fuelType: 'Diesel',
    color: 'Army Green',
    image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=500',
    isNew: true,
    isFeatured: true,
    description: 'Built for Nigerian terrain. The ultimate workhorse with luxury interior.'
  },
  {
    id: 4,
    name: 'Lexus RX 350',
    year: 2026,
    priceNaira: '₦195,000,000',
    condition: 'Brand New',
    transmission: 'Automatic',
    mileage: 0,
    fuelType: 'Petrol',
    color: 'Silver',
    image: 'https://images.unsplash.com/photo-1533473359331-fd322f7a7f78?w=500',
    isNew: true,
    isFeatured: false,
    description: 'Premium luxury SUV with advanced safety features.'
  },
  {
    id: 5,
    name: 'Toyota Land Cruiser LC300',
    year: 2026,
    priceNaira: '₦250,000,000',
    condition: 'Brand New',
    transmission: 'Automatic',
    mileage: 0,
    fuelType: 'Diesel',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1533473359331-fd322f7a7f78?w=500',
    isNew: true,
    isFeatured: true,
    description: 'The king of Nigerian roads. Ultimate luxury off-road capability.'
  },
  {
    id: 6,
    name: 'Changan CS55',
    year: 2026,
    priceNaira: '₦23,500,000',
    condition: 'Brand New',
    transmission: 'Automatic',
    mileage: 0,
    fuelType: 'Petrol',
    color: 'Red',
    image: 'https://images.unsplash.com/photo-1533473359331-fd322f7a7f78?w=500',
    isNew: true,
    isFeatured: false,
    description: 'Locally assembled in Nigeria. Great value for money SUV.'
  },
  {
    id: 7,
    name: 'Innoson IVM G6',
    year: 2026,
    priceNaira: '₦18,000,000',
    condition: 'Brand New',
    transmission: 'Manual',
    mileage: 0,
    fuelType: 'Petrol',
    color: 'White',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500',
    isNew: true,
    isFeatured: false,
    description: 'Proudly Nigerian manufactured. Support local industry.'
  },
  {
    id: 8,
    name: 'Toyota Corolla (Tokunbo)',
    year: 2012,
    priceNaira: '₦8,500,000',
    condition: 'Foreign Used',
    transmission: 'Automatic',
    mileage: 85000,
    fuelType: 'Petrol',
    color: 'Silver',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
    isNew: false,
    isFeatured: false,
    description: 'Tokunbo Corolla in excellent condition. Clean CARFAX report available.'
  }
];

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Serve index.html for root route
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
    
    // Format WhatsApp message - Update this phone number to your client's actual WhatsApp
    const whatsappNumber = '2348123456789'; // Your client's actual WhatsApp number
    const whatsappMessage = `Hello! I'm interested in the ${carName}.\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    res.json({ whatsappUrl });
});

// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log('='.repeat(50));
    console.log(`✅ Premium Auto Motors Server Running`);
    console.log(`📍 Port: ${PORT}`);
    console.log(`🌐 Open: http://localhost:${PORT}`);
    console.log('='.repeat(50));
});
