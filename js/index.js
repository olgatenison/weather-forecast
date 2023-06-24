const apiKey = "b5bd57ab41214874802111150232306";
// // Replace with your www.weatherapi.com

// const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

/*Отримуємо значення з форми*/
const form = document.querySelector("#form");

const input = document.querySelector("#inputCity");

let city;

/*Слухаємо відправку форми*/
form.onsubmit = function (e) {
  //відміняємо відправлення форми
  e.preventDefault();

  // беремо значення з інпуту обрізаємо пробіли
  city = input.value.trim();

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
      console.log(data.location.name);
      console.log(data.location.country);
      console.log(data.current.temp_c);
      console.log(data.current.feelslike_c);
      console.log(data.current.condition.text);
      console.log(data.current.condition.icon);

      // відображаємо в картці
    });
};
