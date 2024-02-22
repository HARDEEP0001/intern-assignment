const baseURL = 'https://swapi.dev/api/planets/?format=json';

const planetsList = document.getElementById('planets-list');
const pagination = document.getElementById('pagination');

let nextPage = '';
let prevPage = '';

async function fetchPlanets(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function displayPlanets(planets) {
    planetsList.innerHTML = '';
    planets.results.forEach(planet => {
        const planetCard = document.createElement('div');
        planetCard.classList.add('planet-card');
        planetCard.innerHTML = `
            <h2>${planet.name}</h2>
            <p>Climate: ${planet.climate}</p>
            <p>Population: ${planet.population}</p>
            <p>Terrain: ${planet.terrain}</p>
            <h3>Residents:</h3>
            <ul class="residents-list">
                ${planet.residents.map(resident => `<li class="resident-item">${resident}</li>`).join('')}
            </ul>
        `;
        planetsList.appendChild(planetCard);
    });

    pagination.innerHTML = '';
    if (planets.previous) {
        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Previous';
        prevBtn.addEventListener('click', () => loadPlanets(planets.previous));
        pagination.appendChild(prevBtn);
    }
    if (planets.next) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.addEventListener('click', () => loadPlanets(planets.next));
        pagination.appendChild(nextBtn);
    }
}

async function loadPlanets(url) {
    const planets = await fetchPlanets(url);
    displayPlanets(planets);
}

loadPlanets(baseURL);
