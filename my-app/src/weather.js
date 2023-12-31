const loader = document.getElementById("loader");
const weatherCard = document.getElementById("weatherCard");
const windElement = document.getElementById("windElement");
const media_images = document.querySelectorAll(".media-images");

async function getWeather() {
  loader.style.display = "block";
  const geoResponse = await fetch(`https://get.geojs.io/v1/ip/geo.json`);
  if (!geoResponse.ok) {
    const geoError = `Error while getting geolocation data!`;
    throw geoError;
  }
  const geoData = await geoResponse.json();
  console.log(geoData);

  const latitude = geoData.latitude;
  const longitude = geoData.longitude;
  const city = geoData.city;

  console.log("Current latitude is: ", latitude);
  console.log("Current longitude is: ", longitude);
  console.log("Current city is: ", city);

  document.getElementById("city").textContent = city;
  document.getElementById("latitude").textContent = latitude + `N`;
  document.getElementById("longitude").textContent = longitude + `E`;

  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  if (!weatherResponse.ok) {
    const weatherError = `Error while getting weather data!`;
    throw weatherError;
  }
  const weatherData = await weatherResponse.json();

  const weatherCode = weatherData.current_weather.weathercode;
  const description = getWeatherDescription(weatherCode);
  const temperature = weatherData.current_weather.temperature;
  const windSpeed = weatherData.current_weather.windspeed;

  document.getElementById("temperature").textContent = temperature + `°C`;
  document.getElementById("windSpeed").textContent = windSpeed + ` m/s`;
  document.getElementById("description").textContent = description;

  console.log("Temperature (°C):", temperature);
  console.log("Wind speed (m/s):", windSpeed);
  console.log("Weather description:", description);

  setWeatherIcon(weatherCode);

  weatherCard.style.display = "block";
  windElement.style.display = "block";
  loader.style.display = "none";

  displayWeatherMessage(weatherCode);
}

function getWeatherDescription(weatherCode) {
  let description = "Undefined";

  switch (weatherCode) {
    case 0:
      description = "Clear sky";
      break;
    case 1:
    case 2:
    case 3:
      description = "Mainly clear, partly cloudy, and overcast";
      break;
    case 45:
    case 48:
      description = "Fog and depositing rime fog";
      break;
    case 51:
    case 53:
    case 55:
      description = "Drizzle: Light, moderate, and dense intensity";
      break;
    case 56:
    case 57:
      description = "Freezing Drizzle: Light and dense intensity";
      break;
    case 61:
    case 63:
    case 65:
      description = "Rain: Slight, moderate and heavy intensity";
      break;
    case 66:
    case 67:
      description = "Freezing Rain: Light and heavy intensity";
      break;
    case 71:
    case 73:
    case 75:
      description = "Snow fall: Slight, moderate, and heavy intensity";
      break;
    case 77:
      description = "Snow grains";
      break;
    case 80:
    case 81:
    case 82:
      description = "Rain showers: Slight, moderate, and violent";
      break;
    case 85:
    case 86:
      description = "Snow showers slight and heavy";
      break;
    case 95:
    case 96:
    case 99:
      description = "Thunderstorm: Slight or moderate";
      break;
    default:
      description = "Undefined";
      break;
  }
  return description;
}

function setWeatherIcon(weatherCode) {
  let iconPath = "";
  switch (weatherCode) {
    case 0:
      iconPath = "/src/content/sun.png";
      break;
    case 1:
    case 2:
    case 3:
      iconPath = "/src/content/sun_with_cloud.png";
      break;
    case 45:
    case 48:
      iconPath = "/src/content/fog.png";
      break;
    case 51:
    case 53:
    case 55:
      iconPath = "src/content/rain.png";
      break;
    case 71:
    case 73:
    case 75:
      iconPath = "src/content/snow.png";
      break;
    case 95:
    case 96:
    case 99:
      iconPath = "src/content/thunderstorm.png";
      break;
    default:
      iconPath = "src/content/default.png";
  }
  document.getElementById("weatherIcon").src = iconPath;
}

getWeather().catch((error) => {
  loader.style.display = "none";
  console.log("Something went wrong: ", error);
});

function displayWeatherMessage(weatherCode) {
  const weatherIntro = document.getElementById("weather-intro");

  if ([51, 53, 55, 71, 73, 75, 95, 96, 99].includes(weatherCode)) {
    weatherIntro.textContent =
      "Oh no, the weather is not so cool now... Recommend you to chill at home!";
  } else {
    weatherIntro.textContent =
      "You're lucky today! The weather now is perfect for outdoor dinner!";
  }
}

media_images.forEach((media_images) => {
  media_images.addEventListener("mouseenter", function () {
    media_images.style.cursor = "pointer";
  });

  media_images.addEventListener("mouseleave", function () {
    media_images.style.cursor = "auto";
  });
});
