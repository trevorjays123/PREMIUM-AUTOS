// Get car ID from URL
const urlParams = new URLSearchParams(window.location.search);
const carId = urlParams.get('id');

async function loadCarDetail() {
    try {
        const response = await fetch(`/api/cars/${carId}`);
        const car = await response.json();
        
        const container = document.getElementById('car-detail');
        container.innerHTML = `
            <div class="grid md:grid-cols-2 gap-8 p-8">
                <div>
                    <img src="${car.images[0]}" alt="${car.name}" class="w-full rounded-xl shadow-lg mb-4">
                    <div class="grid grid-cols-3 gap-2">
                        ${car.images.map(img => `<img src="${img}" class="rounded-lg cursor-pointer hover:opacity-75">`).join('')}
                    </div>
                </div>
                <div>
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">${car.name} ${car.year}</h1>
                    <div class="flex items-center gap-2 mb-4">
                        <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">${car.condition}</span>
                        <span class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Source: ${car.source}</span>
                    </div>
                    <p class="text-4xl font-bold text-blue-600 mb-6">${car.priceNaira}</p>
                    
                    <div class="border-t border-b py-4 mb-6">
                        <div class="grid grid-cols-2 gap-4">
                            <div><span class="text-gray-600">Transmission:</span><br><strong>${car.transmission}</strong></div>
                            <div><span class="text-gray-600">Fuel Type:</span><br><strong>${car.fuelType}</strong></div>
                            <div><span class="text-gray-600">Mileage:</span><br><strong>${car.mileage > 0 ? car.mileage.toLocaleString() + ' km' : '0 km'}</strong></div>
                            <div><span class="text-gray-600">Engine:</span><br><strong>${car.engine}</strong></div>
                            <div><span class="text-gray-600">Color:</span><br><strong>${car.color}</strong></div>
                            <div><span class="text-gray-600">Year:</span><br><strong>${car.year}</strong></div>
                        </div>
                    </div>
                    
                    <p class="text-gray-700 mb-6">${car.description}</p>
                    
                    <div class="space-y-3">
                        <button onclick="sendWhatsAppInquiry('${car.name}')" class="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.032 2.018c-5.525 0-10 4.475-10 10 0 1.733.444 3.367 1.222 4.793L2.02 22.002l5.315-1.143c1.35.687 2.872 1.058 4.455 1.058 5.525 0 10-4.475 10-10s-4.475-10-10-10z"/>
                            </svg>
                            Inquire on WhatsApp
                        </button>
                        <button class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                            Schedule Test Drive
                        </button>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading car details:', error);
    }
}

async function sendWhatsAppInquiry(carName) {
    const name = prompt('Enter your name:');
    const phone = prompt('Enter your phone number:');
    const message = prompt('Your message (optional):');
    
    if (name && phone) {
        const response = await fetch('/api/inquiry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, carName, message: message || '' })
        });
        const data = await response.json();
        window.open(data.whatsappUrl, '_blank');
    }
}

loadCarDetail();
