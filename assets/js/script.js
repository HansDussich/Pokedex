const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    flying: '#78c6cc',
    poison: '#4cd847',
    ground: '#FF8C00',
    fighting: '#FF4500',
    rock: '#CD853F',
    bug: '#D8BFD8',
    steel:'#C0C0C0',
    ghost: '#F5F5F5',
    water: '#00FFFF',
    psychic: '#F0E68C',
    dragon: '#FF0000',
    ice: '#87CEEB',
    dark: '#'
    
};



const main_types = Object.keys(colors);

const pokemon_count = 700; // Numero de pokemones, qur va a traer

const poke_container = document.getElementById('poke-container');

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i);
    }
};

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');
    const types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => types.indexOf(type) > -1);
    const color = colors[type] || '#eee'; // 
    
    const pokemonInnerHTML = `
    <a href="/pokemon.html" class="tarjeta link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
        <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small> 
    </div>
    </a>

    `;

    pokemonEl.style.backgroundColor = color;
    pokemonEl.innerHTML = pokemonInnerHTML;
    poke_container.appendChild(pokemonEl);
};

fetchPokemons();