const apiKey = "b5bd57ab41214874802111150232306";

//Отримуємо значення з форми
const main = document.querySelector(".main");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");

//функції створення карток
function createWeatherCard(data) {
  //console.log(data);
  // данні для картки
  const city = data.location.name;
  const country = data.location.country;
  const temp = data.current.temp_c;
  const feelsTemp = data.current.feelslike_c;
  const clouds = data.current.condition.text;
  const humidity = data.current.humidity;

  // розмітка для картки
  const html = `
    <div class="main__card card">
    <p class="card__country card__massage ">${country}</p>
    <h2 class="card__city card__title">${city}</h2>
    <div class="card__weather">
      <div class="card__left">
        <div class="card__temp-c">${temp}<span class="up">°C</span></div>
        <p class="card__condition">${clouds}</p>
      </div>
      <div class="card__right">
        <div class="card__feels">
          <p class="card__text-f">feels like</p>
          <div class="card__temp-f">${feelsTemp}<top>°C</top></div>
        </div>
        <div class="card__humidity">
          <p class="card__text-h">humidity</p>
          <div class="card__temp-h">${humidity} %</div>
        </div>
      </div>
    </div>
  </div>`;

  // видаляємо наявні картки
  removeExistingCard();

  //відображаємо картку на сторінці
  main.insertAdjacentHTML("afterbegin", html);
}

function createErrorCard(errorMessage) {
  // видаляємо наявні картки
  removeExistingCard();

  // розмітка для картки
  const html = `
  <div class="main__card card error">
  <h2 class="card__title">Error</h2>
  <p class="card__massage">${errorMessage}</p>
  </div>`;

  //відображаємо картку на сторінці
  main.insertAdjacentHTML("afterbegin", html);
}

function removeExistingCard() {
  const prevCard = document.querySelector(".card");
  if (prevCard) prevCard.remove();
}

//перевіряємо чи містить місто лише літри і не є прустою строкою
function isValidCity(city) {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/; // вираз для перевірки символів
  return regex.test(city) && city !== ""; // перевірка що це не лише пуста строка
}

//Слухаємо відправку форми
form.onsubmit = function (e) {
  //відміняємо відправлення форми
  e.preventDefault();

  // беремо значення з інпуту обрізаємо пробіли
  let city = input.value.trim();
  //функції перевірки інпуту
  if (!isValidCity(city)) {
    createErrorCard("Please enter a valid city name.");
    return;
  }

  // робимо запрос на сервер для отримання погоди
  // адреса запросу
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  //виконуємо запрос
  fetch(url)
    .then((response) => {
      // перевіряємо на помилку
      if (!response.ok) {
        throw new Error("Something went wrong. City is not found");
      }
      return response.json();
    })
    .then((data) => {
      createWeatherCard(data);
    })
    .catch((error) => {
      console.log(error.message);
      createErrorCard(error.message);
    });
};
