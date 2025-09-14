const searchCityInput = document.querySelector('#search-city');
const searchBtn = document.querySelector('#search-btn');
const dateTimeEl = document.querySelector('#date-time');
const cityEl = document.querySelector('#city');
const temperatureEl = document.querySelector('#temperature');
const descriptionEl = document.querySelector('#description');
const tempImg = document.querySelector('#temp-img');
const humiditySpan = document.querySelector('#humidity');
const windSpan = document.querySelector('#wind');
const feelsLikeSpan = document.querySelector('#feels');


searchBtn.addEventListener('click', fetchWeatherInfo);
searchCityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    fetchWeatherInfo();
  }
})

async function fetchWeatherInfo() {
  const API_KEY = 'c5aaba02890c19af6920cdb6ec88c30f';
  const cityName = searchCityInput.value.trim();

  if (!cityName) {
    alert('Enter the city name');
    return
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
  // Fetching info from API
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    console.log(data);
    renderInfo(data)
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

function renderInfo(data) {

  cityEl.textContent = data.name;
  dateTimeEl.textContent = formatDate();
  temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
  descriptionEl.textContent = data.weather[0].description;

  const iconCode = data.weather[0].icon; // e.g. "04d"
  tempImg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  tempImg.alt = data.weather[0].main;

  humiditySpan.textContent = `${data.main.humidity}%`;
  windSpan.textContent = `${data.wind.speed} m/s`;
  feelsLikeSpan.textContent = `${Math.round(data.main.feels_like)}°C`;
}


function formatDate() {
  const now = new Date();
  return now.toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
