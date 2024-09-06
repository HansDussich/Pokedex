// Definición de colores para cada tipo de Pokémon con la paleta proporcionada
const colores = {
    normal: '#F5F5F5', 
    fighting: '#F28C6F',
    flying: '#D5A6BD', 
    poison: '#D6A1B1', 
    ground: '#F7B7A3', 
    rock: '#D5B8A1', 
    bug: '#C2D6A1', 
    ghost: '#D0A8D3',
    steel: '#D0D0D0', 
    fire: '#F5A97B', 
    water: '#A3C8E4',
    grass: '#A8D5A2', 
    electric: '#F9E58F',
    psychic: '#F8BBD0', 
    ice: '#A2D8E0', 
    dragon: '#C8A2D8', 
    dark: '#6E6E6E', 
    fairy: '#F6C1C0', 
    unknown: '#FFEBE8',
    shadow: '#3A4D6E' 
};

// Obtiene una lista de todos los tipos de Pokémon
const tipoPokemones = Object.keys(colores);

// Número de Pokémon que se van a traer de la API
const numeroPokemones = 1000;

// Selecciona el contenedor en el HTML donde se agregarán los Pokémon
const contenedor = document.getElementById('poke-container');

// Función para obtener los Pokémon y crear sus tarjetas
const obtenerPokemones = async () => {
    for (let i = 1; i <= numeroPokemones; i++) {
        await traerPokemon(i); // Obtiene datos del Pokémon con el ID i
    }
};

// Función para obtener los datos de un Pokémon específico de la API
const traerPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url); // Realiza una solicitud a la API
    const data = await res.json(); // Convierte la respuesta a JSON
    crearTarjetaPokemon(data); // Crea y muestra una tarjeta para el Pokémon
};

// Función para crear una tarjeta para un Pokémon y agregarla al contenedor
const crearTarjetaPokemon = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon'); // Agrega una clase CSS para el estilo

    // Capitaliza el nombre del Pokémon y formatea el ID
    const nombre = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');

    // Obtiene los tipos del Pokémon y encuentra el color correspondiente
    const types = pokemon.types.map(type => type.type.name);
    const type = tipoPokemones.find(type => types.indexOf(type) > -1);
    const color = colores[type] || '#eee'; // Usa un color predeterminado si el tipo no está en la lista

    // HTML de la tarjeta del Pokémon
    const pokemonInnerHTML = `
    <a href="/pokemon.html" class="tarjeta link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
        <div class="img-container">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png" alt="${pokemon.name}" style="width: 65%;">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${nombre}</h3>
            <small class="type">Type: <span>${type}</span></small> 
        </div>
    </a>
    `;

    // Aplica el color de fondo y agrega el HTML a la tarjeta
    pokemonEl.style.backgroundColor = color;
    pokemonEl.innerHTML = pokemonInnerHTML;
    contenedor.appendChild(pokemonEl); // Añade la tarjeta al contenedor
};

// Inicia el proceso de obtener los Pokémon
obtenerPokemones();
