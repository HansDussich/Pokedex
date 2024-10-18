// Definición de los colores asociados a los tipos de Pokémon
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

// Obtener los tipos de Pokémon
const tipoPokemones = Object.keys(colores);
const contenedor = document.getElementById('poke-container');

let numeroPokemones = 0; // Controlar el número de Pokémon cargados



let paginaActual = 1;
const pokemonesPorPagina = 20;

const cargarPaginaAnterior = () => {
    if (paginaActual > 1) {
        paginaActual--;
        cargarPokemonesPorPagina();
        actualizarPaginacion();
    }
};

const cargarPaginaSiguiente = () => {
    paginaActual++;
    cargarPokemonesPorPagina();
    actualizarPaginacion();
};

const irAPagina = (pagina) => {
    if (pagina > 0) {
        paginaActual = pagina;
        cargarPokemonesPorPagina();
        actualizarPaginacion();
    }
};

const actualizarPaginacion = () => {
    document.querySelectorAll('.pagination .page-item').forEach((item, index) => {
        if (index > 0 && index < 4) {
            const pageNum = paginaActual + index - 2;
            if (pageNum > 0) {
                item.querySelector('.page-link').textContent = pageNum;
                item.classList.toggle('active', pageNum === paginaActual);
                item.querySelector('.page-link').onclick = () => irAPagina(pageNum);
                item.classList.remove('d-none');
            } else {
                item.classList.add('d-none');
            }
        }
    });
};

const cargarPokemonesPorPagina = () => {
    const start = (paginaActual - 1) * pokemonesPorPagina + 1;
    contenedor.innerHTML = '';
    obtenerPokemones(start, pokemonesPorPagina);
};

window.onload = () => {
    cargarPokemonesPorPagina();
    actualizarPaginacion();
};

// Función para obtener Pokémon desde la API
const obtenerPokemones = async (start, limit) => {
    const promises = [];
    for (let i = start; i < start + limit; i++) {
        promises.push(traerPokemon(i));
    }
    await Promise.all(promises);
};


// Función para traer un Pokémon específico
const traerPokemon = async (id) => {
    try {
        // Elimina los ceros a la izquierda del ID
        const cleanedId = parseInt(id, 10); // Convierte a número entero
        const url = `https://pokeapi.co/api/v2/pokemon/${cleanedId}`;
        console.log('Fetching URL:', url);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data = await res.json();
        crearTarjetaPokemon(data);
    } catch (error) {
        console.error(`No se pudo obtener el Pokémon con ID ${id}: ${error}`);
    }
};



// Función para crear una tarjeta para un Pokémon
const crearTarjetaPokemon = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const nombre = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id; // Usar el ID sin ceros a la izquierda
    const types = pokemon.types.map(type => type.type.name); // Obtener todos los tipos

    // Crear HTML para mostrar todos los tipos como píldoras
    const tiposHTML = types.map(type => `
        <span class="tipo-pildora" style="background-color: ${colores[type]};">${type}</span>
    `).join(' ');

    const pokemonInnerHTML = `
    <a href="/pokemon.html?id=${id}" class="tarjeta link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
        <div class="img-container">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${String(id).padStart(3, '0')}.png" alt="${pokemon.name}" style="width: 65%;">
        </div>
        <div class="info">
            <span class="number">#${String(id).padStart(3, '0')}</span>
            <h3 class="name">${nombre}</h3>
            <small class="type">${tiposHTML}</small>
        </div>
    </a>
    `;

    pokemonEl.innerHTML = pokemonInnerHTML;
    contenedor.appendChild(pokemonEl);
};

// Función para manejar el scroll y cargar más Pokémon
// const manejarScroll = () => {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) { // 100px antes de llegar al fondo
//         numeroPokemones += limite; // Aumentar el número de Pokémon a cargar
//         obtenerPokemones(numeroPokemones, limite); // Cargar más Pokémon
//     }
// };

// Inicializar la carga de Pokémon
const init = () => {
    obtenerPokemones(numeroPokemones, limite); // Carga inicial
    window.addEventListener('scroll', manejarScroll); // Escuchar el evento de scroll
};

// Iniciar la aplicación
init();



