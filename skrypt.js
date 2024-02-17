// Licznik odwiedzin
let visits = 0;
// Pobranie elementu licznika
let counter = document.getElementById("counter");
// Aktualizacja licznika przy załadowaniu strony
window.onload = function() {
  // Sprawdzenie, czy istnieje zapisana wartość licznika w pamięci lokalnej
  if (localStorage.getItem("visits")) {
    // Pobranie wartości licznika z pamięci lokalnej
    visits = localStorage.getItem("visits");
  }
  // Zwiększenie licznika o 1
  visits++;
  // Zapisanie wartości licznika w pamięci lokalnej
  localStorage.setItem("visits", visits);
  // Wyświetlenie wartości licznika na stronie
  counter.innerHTML = "Liczba odwiedzin: " + visits;
}
// Element ruszający się
let snowman = document.getElementById("snowman");
// Funkcja, która zmienia położenie elementu w zależności od położenia kursora myszy
function moveSnowman(event) {
  // Pobranie współrzędnych kursora myszy
  let x = event.clientX;
  let y = event.clientY;
  // Obliczenie nowych współrzędnych elementu
  let newX = x - 100;
  let newY = y - 150;
  // Ustawienie nowych współrzędnych elementu
  snowman.style.left = newX + "px";
  snowman.style.top = newY + "px";
}
// Dodanie nasłuchiwacza zdarzenia na ruch myszy
window.addEventListener("mousemove", moveSnowman);

// Efekt spadającego śniegu
// Utworzenie elementu div, który będzie zawierał płatki śniegu
let snowContainer = document.createElement("div");
// Nadanie mu klasy snow-container
snowContainer.className = "snow-container";
// Ustawienie stałej wysokości i szerokości równej wymiarom okna przeglądarki
snowContainer.style.height = window.innerHeight + "px";
snowContainer.style.width = window.innerWidth + "px";
// Ustawienie właściwości overflow na hidden
snowContainer.style.overflow = "hidden";
// Ustawienie pozycji na fixed
snowContainer.style.position = "fixed";
// Ustawienie lewego i górnego marginesu na 0
snowContainer.style.left = "0";
snowContainer.style.top = "0";
// Dodanie elementu snowContainer do body
document.body.appendChild(snowContainer);
// Utworzenie tablicy do przechowywania płatków śniegu
let snowflakes = [];
// Ustawienie liczby płatków śniegu
let numberOfSnowflakes = 100;
// Utworzenie funkcji, która tworzy nowy płatek śniegu
function createSnowflake() {
  // Utworzenie elementu div
  let snowflake = document.createElement("div");
  // Nadanie mu klasy snowflake
  snowflake.className = "snowflake";
  // Ustawienie stałego koloru białego
  let color = "white"; // zmieniona linia
  // Ustawienie losowego rozmiaru
  let size = Math.random() * 10 + 10 + "px";
  // Ustawienie losowej pozycji początkowej
  let x = Math.random() * window.innerWidth + "px";
  let y = -Math.random() * window.innerHeight + "px";
  // Ustawienie losowej prędkości spadania
  let speed = Math.random() * 5 + 1 + "px";
  // Ustawienie losowego kąta obrotu
  let angle = Math.random() * 360 + "deg";
  // Ustawienie losowej prędkości obrotu
  let spin = Math.random() * 10 - 5 + "deg";
  // Zastosowanie stylów do elementu
  snowflake.style.backgroundColor = color;
  snowflake.style.width = size;
  snowflake.style.height = size;
  snowflake.style.borderRadius = "50%";
  snowflake.style.position = "absolute";
  snowflake.style.left = x;
  snowflake.style.top = y;
  snowflake.style.transform = "rotate(" + angle + ")";
  // Dodanie elementu do tablicy
  snowflakes.push({
    element: snowflake,
    x: x,
    y: y,
    speed: speed,
    angle: angle,
    spin: spin
  });
  // Dodanie elementu do snowContainer
  snowContainer.appendChild(snowflake);
}
// Utworzenie funkcji, która aktualizuje położenie i obrót płatków śniegu
function updateSnowflakes() {
  // Iteracja po tablicy płatków śniegu
  for (let i = 0; i < snowflakes.length; i++) {
    // Pobranie obiektu płatka śniegu
    let snowflake = snowflakes[i];
    // Zwiększenie wartości y o prędkość spadania
    snowflake.y = parseFloat(snowflake.y) + parseFloat(snowflake.speed);
    // Zwiększenie kąta obrotu o prędkość obrotu
    snowflake.angle = parseFloat(snowflake.angle) + parseFloat(snowflake.spin);
    // Zastosowanie nowych wartości do elementu
    snowflake.element.style.top = snowflake.y + "px";
    snowflake.element.style.transform = "rotate(" + snowflake.angle + "deg)";
    // Sprawdzenie, czy płatek śniegu dotarł do dołu ekranu
    if (snowflake.y > window.innerHeight) {
      // Usunięcie elementu z snowContainer
      snowContainer.removeChild(snowflake.element);
      // Usunięcie obiektu z tablicy
      snowflakes.splice(i, 1);
      // Utworzenie nowego płatka śniegu
      createSnowflake();
    }
  }
}
// Utworzenie początkowej liczby płatków śniegu
for (let i = 0; i < numberOfSnowflakes; i++) {
  createSnowflake();
}
// Ustawienie interwału, który będzie wywoływał funkcję updateSnowflakes co 10 milisekund
setInterval(updateSnowflakes, 10);