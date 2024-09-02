// Definición de colores para cada tipo de Pokémon con la paleta proporcionada
const colors = {
    normal: '#bfb16e',
    fighting: '#cf5c35',
    flying: '#bea0c2',
    poison: '#b96889',
    ground: '#e6c163',
    rock: '#c9ab40',
    bug: '#bebb30',
    ghost: '#987984',
    steel: '#cabbac',
    fire: '#f2953b',
    water: '#92a0c2',
    grass: '#9dc652',
    electric: '#f7cd3b',
    psychic: '#f77979',
    ice: '#b4d2b1',
    dragon: '#a172bf',
    dark: '#98794c',
    fairy: '#f0a692',
    unknown: 'rgba(255, 202, 142, 0.7)',
    shadow: 'rgba(42, 78, 141, 0.7)'
};



// Obtiene una lista de todos los tipos de Pokémon
const main_types = Object.keys(colors);

// Número de Pokémon que se van a traer de la API
const pokemon_count = 1000;

// Selecciona el contenedor en el HTML donde se agregarán los Pokémon
const poke_container = document.getElementById('poke-container');

// Función para obtener los Pokémon y crear sus tarjetas
const fetchPokemons = async () => {
    for (let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i); // Obtiene datos del Pokémon con el ID i
    }
};

// Función para obtener los datos de un Pokémon específico de la API
const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url); // Realiza una solicitud a la API
    const data = await res.json(); // Convierte la respuesta a JSON
    createPokemonCard(data); // Crea y muestra una tarjeta para el Pokémon
};

// Función para crear una tarjeta para un Pokémon y agregarla al contenedor
const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon'); // Agrega una clase CSS para el estilo

    // Capitaliza el nombre del Pokémon y formatea el ID
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');

    // Obtiene los tipos del Pokémon y encuentra el color correspondiente
    const types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => types.indexOf(type) > -1);
    const color = colors[type] || '#eee'; // Usa un color predeterminado si el tipo no está en la lista

    // HTML de la tarjeta del Pokémon
    const pokemonInnerHTML = `
    <a href="/pokemon.html" class="tarjeta link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
        <div class="img-container">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png" alt="${pokemon.name}" style="width: 65%;">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small> 
        </div>
    </a>
    `;

    // Aplica el color de fondo y agrega el HTML a la tarjeta
    pokemonEl.style.backgroundColor = color;
    pokemonEl.innerHTML = pokemonInnerHTML;
    poke_container.appendChild(pokemonEl); // Añade la tarjeta al contenedor
};

// Inicia el proceso de obtener los Pokémon
fetchPokemons();
