const requestData = async city => {
  const key = '6afd1a2efe01865fcae54da8837f0e44';
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
  );
  if (!response.ok) {
    throw new Error('City not found...');
  }
  return response.json();
};

const evaluateResponse = async city => {
  const response = await requestData(city);
  console.log(response);
  return response;
};

const weatherInfoView = async city => `
  <div>
    <h1>${city.name}</h1>
    <p>${new Date(city.dt * 1000)}</p>
    <p>${city.main.temp.toFixed(1)}°C</p>
    <p>feels like ${city.main.feels_like.toFixed(1)}°C.</p>
    <p>${city.weather[0].description}.</p>
    <hr>
    <p>humidity: ${city.main.humidity}%</p>
    <img src="${`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}" />
    <p>wind speed: ${city.wind.speed.toFixed(1)} m/S</p>
    <hr>
    <p>sunrise: ${new Date(city.sys.sunrise * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}</p>
    <p>sunset: ${new Date(city.sys.sunset * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}</p>
  </div>
`;

const errorView = error => `
  <div>
    <p>${error}</p>
  </div>
`;

const renderWeatherDetails = async city => {
  const cityData = await evaluateResponse(city);
  const container = document.querySelector('.info-container');
  container.innerHTML = await weatherInfoView(cityData);
};

const renderNotFound = error => {
  const container = document.querySelector('.info-container');
  container.innerHTML = errorView(error);
};

const searchCity = async searchInput => {
  try {
    await renderWeatherDetails(searchInput);
  } catch (error) {
    renderNotFound(error.message);
  }
};

const searchButton = document.querySelector('#search-btn');

searchButton.addEventListener('click', event => {
  let input = document.querySelector('#input-search-city');
  searchCity(input.value);
  input.value = '';
});
