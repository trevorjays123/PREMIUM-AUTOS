import express from 'express';
import path from 'path';

const app = express();
const PORT = 3001;

// Car data with Nigerian market prices and authentic image sources
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
    engine: '1.8L 4-Cylinder',
    color: 'Pearl White',
    description: 'Latest 2026 model perfect for Nigerian roads',
    images: [
      '/images/toyota-corolla-2026.jpg'
    ],
    source: 'Carlots.ng',
    isNew: true,
    isFeatured: true
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
    engine: '2.5L 4-Cylinder',
    color: 'Midnight Black',
    description: 'Luxury sedan with premium features. Ideal for executives and families.',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800'
    ],
    source: 'Autochek Africa',
    isNew: true,
    isFeatured: true
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
    engine: '2.8L Turbo Diesel',
    color: 'Army Green',
    description: 'Built for Nigerian terrain. The ultimate workhorse with luxury interior.',
    images: [
      'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800'
    ],
    source: 'Cars.ng',
    isNew: true,
    isFeatured: true
  },
  {
    id: 4,
    name: 'Lexus RX 350',
    year: 2026,
    price: 195000000,
    priceNaira: '₦195,000,000',
    condition: 'Brand New',
    transmission: 'Automatic',
    mileage: 0,
    fuelType: 'Petrol',
    engine: '3.5L V6',
    color: 'Silver',
    description: 'Premium luxury SUV with advanced safety features and stunning design.',
    images: [
      'https://images.unsplash.com/photo-1533473359331-fd322f7a7f78?w=800'
    ],
    source: 'Carlots.ng',
    isNew: true,
    isFeatured: false
  },
  {
    id: 5,
    name: 'Toyota Land Cruiser LC300',
    year: 2026,
    price: 250000000,
    priceNaira: '₦250,000,000',
    condition: 'Brand New',
    transmission: 'Automatic',
    mileage: 0,
    fuelType: 'Diesel',
    engine: '3.3L V6 Twin Turbo',
    color: 'Black',
    description: 'The king of Nigerian roads. Ultimate luxury off-road capability.',
    images: [
      'https://images.unsplash.com/photo-1533473359331-fd322f7a7f78?w=800'
    ],
    source: 'Autochek Africa',
    isNew: true,
    isFeatured: true
  },
  {
    id: 6,
    name: 'Changan CS55',
    year: 2026,
    price: 23500000,
    priceNaira: '₦23,500,000',
    condition: 'Brand New',
    transmission: 'Automatic',
    mileage: 0,
    fuelType: 'Petrol',
    engine: '1.5L Turbo',
    color: 'Red',
    description: 'Locally assembled in Nigeria. Great value for money SUV.',
    images: [
      'https://images.unsplash.com/photo-1533473359331-fd322f7a7f78?w=800'
    ],
    source: 'Innoson Motors',
    isNew: true,
    isFeatured: false
  },
  {
    id: 7,
    name: 'Innoson IVM G6',
    year: 2026,
    price: 18000000,
    priceNaira: '₦18,000,000',
    condition: 'Brand New',
    transmission: 'Manual',
    mileage: 0,
    fuelType: 'Petrol',
    engine: '2.0L',
    color: 'White',
    description: 'Proudly Nigerian manufactured. Support local industry.',
    images: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800'
    ],
    source: 'Innoson Motors',
    isNew: true,
    isFeatured: false
  },
  {
    id: 8,
    name: 'Toyota Corolla (Foreign Used)',
    year: 2012,
    price: 8500000,
    priceNaira: '₦8,500,000',
    condition: 'Foreign Used',
    transmission: 'Automatic',
    mileage: 85000,
    fuelType: 'Petrol',
    engine: '1.8L',
    color: 'Silver',
    description: 'Tokunbo Corolla in excellent condition. Clean CARFAX report available.',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800'
    ],
    source: 'Jiji.ng',
    isNew: false,
    isFeatured: false
  }
];

// Middleware
app.use(express.json());
app.use(express.static('public'));

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
  
  // Format WhatsApp message
  const whatsappMessage = `Hello! I'm interested in the ${carName}.\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/2348123456789?text=${encodedMessage}`;
  
  res.json({ whatsappUrl });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
