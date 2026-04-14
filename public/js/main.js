// Load featured cars on homepage
async function loadFeaturedCars() {
    try {
        const response = await fetch('/api/cars?featured=true');
        const cars = await response.json();
        
        const container = document.getElementById('featured-cars');
        if (!container) return;
        
        container.innerHTML = cars.map(car => `
            <div class="car-card bg-white rounded-xl shadow-lg overflow-hidden transition duration-300">
                <img src="${car.images[0]}" alt="${car.name}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-xl font-bold text-gray-900">${car.name}</h3>
                        <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">${car.condition}</span>
                    </div>
                    <p class="text-2xl font-bold text-blue-600 mb-2">${car.priceNaira}</p>
                    <div class="flex justify-between text-gray-600 mb-4">
                        <span>📅 ${car.year}</span>
                        <span>⚙️ ${car.transmission}</span>
                        <span>⛽ ${car.fuelType}</span>
                    </div>
                    <a href="/car-detail.html?id=${car.id}" class="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                        View Details
                    </a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading cars:', error);
    }
}

// Load all inventory
async function loadInventory() {
    try {
        const response = await fetch('/api/cars');
        const cars = await response.json();
        
        const container = document.getElementById('inventory-grid');
        if (!container) return;
        
        container.innerHTML = cars.map(car => `
            <div class="car-card bg-white rounded-xl shadow-lg overflow-hidden transition duration-300">
                <img src="${car.images[0]}" alt="${car.name}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-xl font-bold text-gray-900">${car.name}</h3>
                        <span class="bg-${car.condition === 'Brand New' ? 'green' : 'orange'}-100 text-${car.condition === 'Brand New' ? 'green' : 'orange'}-800 text-xs px-2 py-1 rounded">${car.condition}</span>
                    </div>
                    <p class="text-2xl font-bold text-blue-600 mb-2">${car.priceNaira}</p>
                    <div class="flex justify-between text-gray-600 mb-4">
                        <span>📅 ${car.year}</span>
                        <span>⚙️ ${car.transmission}</span>
                        <span>📊 ${car.mileage > 0 ? car.mileage.toLocaleString() + ' km' : '0 km'}</span>
                    </div>
                    <a href="/car-detail.html?id=${car.id}" class="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                        View Details
                    </a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading inventory:', error);
    }
}

// Initialize based on page
if (document.getElementById('featured-cars')) {
    loadFeaturedCars();
}

if (document.getElementById('inventory-grid')) {
    loadInventory();
}
