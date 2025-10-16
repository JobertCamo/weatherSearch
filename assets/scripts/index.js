const accessKey = '7083b6b8eab933742ebd3055ed98ecc4';

document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${encodeURIComponent(city)}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        let image = '';

        if (data.success === false) {
            document.getElementById('result').innerHTML = `<p class="text-red-500">${data.error.info}</p>`;
            return;
        }
        const dateTime = data.location.localtime;
        const date = new Date(dateTime.replace(" ", "T"));
        const dateformatted = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric'});
        let rainPercentage = '';

        if (data.current.precip > 0) {
            rainPercentage = 100;
        } else if (data.current.cloudcover >= 80) {
            rainPercentage = 50;
        } else {
            rainPercentage = 0;
        }
        

        if (data.current.weather_code === 113) {
            image = 'assets/images/sunny.png';
        } else if ([116, 119, 122].includes(data.current.weather_code)) {
            image = 'assets/images/cloudy.png';
        } else if ([176, 263, 266, 293, 302, 305, 308].includes(data.current.weather_code)) {
            image = 'assets/images/rainy-day.png';
        } else if ([317, 320, 323, 326, 329, 332].includes(data.current.weather_code)) {
            image = 'assets/images/snowflake.png';
        } else if (data.current.weather_code === 200) {
            image = 'assets/images/thunderstorm.png';
        } else {
            image = 'assets/images/sunny.png';
        }

        document.getElementById('modal').innerHTML = `
            <div id="result" class="mt-4 text-gray-700">
                <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center">
                    <div class="bg-white rounded-lg shadow-lg w-96 p-6 relative">
                        <div class="flex justify-center items-center">
                            <img src="assets/images/cloudy.png" class="w-28 h-28" alt="">
                        </div>
                        <div class="mt-4">
                            <h2 class="text-xl">${dateformatted}</h2>
                            <h2 class="text-sm">${data.request.query}</h2>
                        </div>
                        <h2 class="text-6xl font-bold mb-4 mt-4">${data.current.temperature}°</h2>
                        <div class="flex justify-around items-center">
                            <div class="bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg space-y-1">
                                <img src="/assets/images/rainy-day.png" class="w-10 h-10" alt="">
                                <div class="text-xs">${rainPercentage}%</div>
                                <div class="text-xs">Rain</div>
                            </div>
                            <div class="bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg space-y-1">
                                <img src="/assets/images/wind.png" class="w-10 h-10" alt="">
                                <div class="text-xs">${data.current.wind_speed} km/h</div>
                                <div class="text-xs">Wind</div>
                            </div>
                            <div class="bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg space-y-1">
                                <img src="/assets/images/atmospheric-conditions.png" class="w-10 h-10" alt="">
                                <div class="text-xs">${data.current.humidity}%</div>
                                <div class="text-xs">Humidity</div>
                            </div>
                        </div>
                        <button id="closeModal" class="absolute top-2 right-3 text-gray-500 hover:text-gray-700">&times;</button>
                    </div>
                </div>
            </div>
        `;
    } catch (err) {
        
    }

    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('modal').innerHTML = ``;
    });
    
});