const requestData = async (city) => {
  const key = '6afd1a2efe01865fcae54da8837f0e44';
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`)
  return response.json();
}

const evaluateResponse = async (city) => {
  const response = await requestData(city);

  // change to try / catch
  if (response.cod === '404') {
    return 'Not found';
  }
  return response;
}

const weatherInfoView = city => `
  <div>
    <h1>${city.name}</h1>
    <p>${new Date(city.dt * 1000)}</p>
    <p>${city.main.temp.toFixed(1)}°C</p>
    <p>feels like ${city.main.feels_like.toFixed(1)}°C. ${city.weather[0].description}.</p>
    <p>humidity: ${city.main.humidity}%</p>
    <p>wind speed: ${city.wind.speed.toFixed(1)} m/S</p>
    <hr>
    <p>sunrise: ${new Date(city.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
    <p>sunset: ${new Date(city.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
  </div>
`


const renderWeatherDetails = async (city) => {
  const cityData = await evaluateResponse(city);
  console.log(cityData);
  const container = document.querySelector('.info-container');
  container.innerHTML = weatherInfoView(cityData);
}

const searchButton = document.querySelector('#search-btn');

searchButton.addEventListener('click', event => {
  let input = document.querySelector('#input-search-city');
  renderWeatherDetails(input.value)
  input.value = '';
})