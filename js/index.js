const apiKey = "b5bd57ab41214874802111150232306";
// // Replace with your www.weatherapi.com
// const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

//Отримуємо значення з форми
const main = document.querySelector(".main");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");

//Слухаємо відправку форми
form.onsubmit = function (e) {
  //відміняємо відправлення форми
  e.preventDefault();

  // беремо значення з інпуту обрізаємо пробіли
  let city = input.value.trim();

  // робимо запрос на сервер для отримання погоди
  // адреса запросу

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  //виконуємо запрос

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // данні для картки
      const city = data.location.name;
      const country = data.location.country;
      const temp = data.current.temp_c;
      const feelsTemp = data.current.feelslike_c;
      const clouds = data.current.condition.text;
      const humidity = data.current.humidity;

      // видаляємо наявні картки
      const prevCard = document.querySelector(".card");
      if (prevCard) prevCard.remove();

      // відображаємо в картці
      // розмітка для картки
      const html = `
        <div class="main__card card">
        <p class="card__country">${country}</p>
        <h2 class="card__city">${city}</h2>
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

      //відображаємо картку на сторінці
      main.insertAdjacentHTML("afterbegin", html);
    });
};
