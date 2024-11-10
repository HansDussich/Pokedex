<<<<<<< HEAD
// Definición de los colores asociados a los tipos de Pokémon - Paleta mejorada
const colores = {
    normal: '#A8A878',    // Marrón claro más oscuro
    fighting: '#C03028',  // Rojo oscuro
    flying: '#A890F0',    // Púrpura medio
    poison: '#A040A0',    // Púrpura oscuro
    ground: '#E0C068',    // Marrón tierra
    rock: '#B8A038',      // Marrón oscuro
    bug: '#A8B820',       // Verde oliva
    ghost: '#705898',     // Púrpura grisáceo
    steel: '#B8B8D0',     // Gris metálico
    fire: '#F08030',      // Naranja intenso
    water: '#6890F0',     // Azul medio
    grass: '#78C850',     // Verde medio
    electric: '#F8D030',  // Amarillo intenso
    psychic: '#F85888',   // Rosa intenso
    ice: '#98D8D8',       // Celeste medio
    dragon: '#7038F8',    // Púrpura intenso
    dark: '#705848',      // Marrón muy oscuro
    fairy: '#EE99AC',     // Rosa medio
    unknown: '#68A090',   // Verde azulado
    shadow: '#403246'     // Púrpura muy oscuro
};

const contenedor = document.getElementById('poke-container');
let paginaActual = 1;
const pokemonesPorPagina = 20;
let pokemonesCache = new Map();

// Función para determinar si un color es oscuro
const esColorOscuro = (color) => {
    // Convertir el color hex a RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calcular la luminosidad
    const luminosidad = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminosidad < 0.5;
};

// Función para obtener Pokémon desde la API de manera ordenada
const obtenerPokemones = async (start, limit) => {
    try {
        const promises = [];
        for (let i = start; i < start + limit; i++) {
            promises.push(traerPokemon(i));
        }
        const pokemones = await Promise.all(promises);
        pokemones
            .filter(pokemon => pokemon !== null)
            .sort((a, b) => a.id - b.id)
            .forEach(pokemon => crearTarjetaPokemon(pokemon));
    } catch (error) {
        console.error('Error al obtener pokémon:', error);
    }
};

const traerPokemon = async (id) => {
    try {
        if (pokemonesCache.has(id)) {
            return pokemonesCache.get(id);
        }

        const cleanedId = parseInt(id, 10);
        const url = `https://pokeapi.co/api/v2/pokemon/${cleanedId}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data = await res.json();
        
        pokemonesCache.set(id, data);
        return data;
    } catch (error) {
        console.error(`No se pudo obtener el Pokémon con ID ${id}:`, error);
        return null;
    }
};

const crearTarjetaPokemon = (pokemon) => {
    if (!pokemon) return;

    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const nombre = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id;
    const types = pokemon.types.map(type => type.type.name);

    // Crear HTML para mostrar los tipos con iconos y mejor contraste
    const tiposHTML = types.map(type => {
        const backgroundColor = colores[type];
        const textColor = esColorOscuro(backgroundColor) ? '#FFFFFF' : '#000000';
        
        return `
            <span class="tipo-pildora" 
                  style="background-color: ${backgroundColor}; color: ${textColor};">
                <img src="assets/icons/${type}.svg" 
                     alt="${type} icon" 
                     class="tipo-icon" 
                     style="filter: ${textColor === '#000000' ? 'brightness(0)' : 'brightness(100)'};"> 
                ${type}
            </span>
        `;
    }).join(' ');

    const pokemonInnerHTML = `
        <a href="/pokemon.html?id=${id}" class="tarjeta link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
            <div class="img-container">
                <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${String(id).padStart(3, '0')}.png" 
                     alt="${pokemon.name}" 
                     style="width: 65%;"
                     loading="lazy">
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

// Funciones de paginación
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

// Inicialización
window.onload = () => {
    cargarPokemonesPorPagina();
    actualizarPaginacion();
};



=======
// Definición de los colores asociados a los tipos de Pokémon - Paleta mejorada
const colores = {
    normal: '#A8A878',    // Marrón claro más oscuro
    fighting: '#C03028',  // Rojo oscuro
    flying: '#A890F0',    // Púrpura medio
    poison: '#A040A0',    // Púrpura oscuro
    ground: '#E0C068',    // Marrón tierra
    rock: '#B8A038',      // Marrón oscuro
    bug: '#A8B820',       // Verde oliva
    ghost: '#705898',     // Púrpura grisáceo
    steel: '#B8B8D0',     // Gris metálico
    fire: '#F08030',      // Naranja intenso
    water: '#6890F0',     // Azul medio
    grass: '#78C850',     // Verde medio
    electric: '#F8D030',  // Amarillo intenso
    psychic: '#F85888',   // Rosa intenso
    ice: '#98D8D8',       // Celeste medio
    dragon: '#7038F8',    // Púrpura intenso
    dark: '#705848',      // Marrón muy oscuro
    fairy: '#EE99AC',     // Rosa medio
    unknown: '#68A090',   // Verde azulado
    shadow: '#403246'     // Púrpura muy oscuro
};

const contenedor = document.getElementById('poke-container');
let paginaActual = 1;
const pokemonesPorPagina = 20;
let pokemonesCache = new Map();

// Función para determinar si un color es oscuro
const esColorOscuro = (color) => {
    // Convertir el color hex a RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calcular la luminosidad
    const luminosidad = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminosidad < 0.5;
};

// Función para obtener Pokémon desde la API de manera ordenada
const obtenerPokemones = async (start, limit) => {
    try {
        const promises = [];
        for (let i = start; i < start + limit; i++) {
            promises.push(traerPokemon(i));
        }
        const pokemones = await Promise.all(promises);
        pokemones
            .filter(pokemon => pokemon !== null)
            .sort((a, b) => a.id - b.id)
            .forEach(pokemon => crearTarjetaPokemon(pokemon));
    } catch (error) {
        console.error('Error al obtener pokémon:', error);
    }
};

const traerPokemon = async (id) => {
    try {
        if (pokemonesCache.has(id)) {
            return pokemonesCache.get(id);
        }

        const cleanedId = parseInt(id, 10);
        const url = `https://pokeapi.co/api/v2/pokemon/${cleanedId}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data = await res.json();
        
        pokemonesCache.set(id, data);
        return data;
    } catch (error) {
        console.error(`No se pudo obtener el Pokémon con ID ${id}:`, error);
        return null;
    }
};

const crearTarjetaPokemon = (pokemon) => {
    if (!pokemon) return;

    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const nombre = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id;
    const types = pokemon.types.map(type => type.type.name);

    // Crear HTML para mostrar los tipos con iconos y mejor contraste
    const tiposHTML = types.map(type => {
        const backgroundColor = colores[type];
        const textColor = esColorOscuro(backgroundColor) ? '#FFFFFF' : '#000000';
        
        return `
            <span class="tipo-pildora" 
                  style="background-color: ${backgroundColor}; color: ${textColor};">
                <img src="assets/icons/${type}.svg" 
                     alt="${type} icon" 
                     class="tipo-icon" 
                     style="filter: ${textColor === '#000000' ? 'brightness(0)' : 'brightness(100)'};"> 
                ${type}
            </span>
        `;
    }).join(' ');

    const pokemonInnerHTML = `
        <a href="/pokemon.html?id=${id}" class="tarjeta link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
            <div class="img-container">
                <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${String(id).padStart(3, '0')}.png" 
                     alt="${pokemon.name}" 
                     style="width: 65%;"
                     loading="lazy">
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

// Funciones de paginación
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

// Inicialización
window.onload = () => {
    cargarPokemonesPorPagina();
    actualizarPaginacion();
};



>>>>>>> 7d8c1e9 (solucion del bug de buscar)
