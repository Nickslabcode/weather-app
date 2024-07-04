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
// Missing implementation
`


const renderWeatherDetails = async (city) => {
  const cityData = await evaluateResponse(city);
  const container = document.querySelector('.info-container');
  container.innerHTML = weatherInfoView(cityData);
}

const searchButton = document.querySelector('#search-btn');

searchButton.addEventListener('click', event => {
  let input = document.querySelector('#input-search-city');
  renderWeatherDetails(input.value)
  input.value = '';
})