// Definición de colores para cada tipo de Pokémon con la paleta proporcionada
const colores = {
    normal: '#F5F5F5', // Gris muy claro
    fighting: '#F28C6F', // Coral suave
    flying: '#D5A6BD', // Rosa pálido
    poison: '#D6A1B1', // Rosa pálido
    ground: '#F7B7A3', // Naranja pastel
    rock: '#D5B8A1', // Beige claro
    bug: '#C2D6A1', // Verde claro
    ghost: '#D0A8D3', // Lavanda claro
    steel: '#D0D0D0', // Gris neutro
    fire: '#F5A97B', // Naranja claro
    water: '#A3C8E4', // Azul pastel
    grass: '#A8D5A2', // Verde suave
    electric: '#F9E58F', // Amarillo pastel
    psychic: '#F8BBD0', // Rosa suave
    ice: '#A2D8E0', // Azul pálido
    dragon: '#C8A2D8', // Púrpura claro
    dark: '#6E6E6E', // Gris oscuro
    fairy: '#F6C1C0', // Rosa claro
    unknown: '#FFEBE8', // Rosa pálido con opacidad
    shadow: '#3A4D6E' // Azul grisáceo
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
