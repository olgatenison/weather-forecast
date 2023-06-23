// const apiKey = "b5bd57ab41214874802111150232306";
// // Replace with your www.weatherapi.com

// const city = "London";

// const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
// // const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`

// fetch(url)
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

/*Отримуємо значення з форми*/
const form = document.querySelector("#form");

const input = document.querySelector("#inputCity");

let city;

/*Слухаємо відправку форми*/
form.onsubmit = function () {
  city = input.value;
  console.log(city);
};
