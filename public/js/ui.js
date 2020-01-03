const ph = document.querySelector('.ph_class');
const cafeList = document.querySelector('#cafe-list');
const humidity = document.querySelector('.humidity_class');
const temperature = document.querySelector('.temperature_class');

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

// create element & render cafe
function renderCafe(doc){
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().data_humidity;
  city.textContent = doc.data().data_ph;

  li.appendChild(name);
  li.appendChild(city);
 
  console.log("rendered");

  cafeList.appendChild(li);
}

// render recipe data
const renderRecipe = (data, id) => {
  ph.innerHTML = ``;
  const html = `
      <div class="recipe-details">
        <div class="recipe-title">Data logging | Nilai PH </div>
        <div class="recipe-ingredients">Nilai PH Terakhir: ${data.data_ph}</div>
        <div class="recipe-ingredients">${data.waktu.toDate()}</div>
      </div>
    `;
  ph.innerHTML += html;
};

// render recipe data
const renderHumidity = (data, id) => {
  humidity.innerHTML = ``;
  const html = `
      <div class="recipe-details">
        <div class="recipe-title">Data logging | Nilai Humidity & PPM</div>
        <div class="recipe-ingredients">Nilai Humidity: ${data.data_humidity}, Nilai PPM: ${data.data_ppm}</div>
        <div class="recipe-ingredients">${data.waktu.toDate()}</div>
      </div>
    `;
  humidity.innerHTML += html;
};

// render recipe data
const renderTemperature = (data, id) => {
  temperature.innerHTML = ``;
  const html = `
      <div class="recipe-details">
        <div class="recipe-title">Data logging | Nilai Temperature </div>
        <div class="recipe-ingredients">Nilai Temperatur Air: ${data.data_water_temp}, Nilai Temperatur Udara: ${data.data_air_temp}</div>
        <div class="recipe-ingredients">${data.waktu.toDate()}</div>
      </div>
    `;
  temperature.innerHTML += html;
};

// remove recipe
const removeRecipe = (id) => {
  const recipe = document.querySelector(`.recipe[data-id=${id}]`);
  recipe.remove();
};


