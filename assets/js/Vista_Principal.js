// Definición de los colores asociados a los tipos de Pokémon
const colores = {
    // ... (los colores que ya tienes)
};

// Obtener los tipos de Pokémon
const contenedor = document.getElementById('poke-container');
let numeroPokemones = 1; // Empezar desde el ID 1 (Bulbasaur)
const limite = 25; // Número de Pokémon a cargar por vez

const obtenerPokemones = async (start, limit) => {
    const promises = [];
    for (let i = start; i < start + limit; i++) {
        promises.push(traerPokemonYCrearTarjeta(i));
    }

    const resultados = await Promise.all(promises);
    const resultadosValidos = resultados.filter(pokemon => pokemon !== null);
    resultadosValidos.sort((a, b) => a.id - b.id);

    resultadosValidos.forEach(pokemonEl => {
        contenedor.appendChild(pokemonEl.element);
    });
};

const traerPokemonYCrearTarjeta = async (id) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Error al obtener el Pokémon');
        const pokemon = await res.json();

        const pokemonEl = document.createElement('div');
        pokemonEl.classList.add('pokemon');

        const nombre = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        const idFormatted = pokemon.id.toString().padStart(3, '0');
        const types = pokemon.types.map(type => type.type.name);

        const tiposHTML = types.map(type => `
            <span class="tipo-pildora" style="background-color: ${colores[type]};">${type}</span>
        `).join(' ');

        const pokemonInnerHTML = `
        <a href="/pokemon.html" class="tarjeta link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
            <div class="img-container">
                <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${idFormatted}.png" alt="${pokemon.name}" style="width: 65%;">
            </div>
            <div class="info">
                <span class="number">#${idFormatted}</span>
                <h3 class="name">${nombre}</h3>
                <small class="type">${tiposHTML}</small>
            </div>
        </a>
        `;

        pokemonEl.innerHTML = pokemonInnerHTML;

        return { id: pokemon.id, element: pokemonEl };
        
    } catch (error) {
        console.error(`No se pudo obtener el Pokémon con ID ${id}: ${error}`);
        return null;
    }
};

let timeout;
const manejarScroll = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            numeroPokemones += limite;
            if (numeroPokemones < 1000) { // Asegúrate de que no exceda el límite
                obtenerPokemones(numeroPokemones, limite);
            } else {
                window.removeEventListener('scroll', manejarScroll);
            }
        }
    }, 200);
};

const init = () => {
    obtenerPokemones(numeroPokemones, limite);
    window.addEventListener('scroll', manejarScroll);
};

init();
