const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');
const pokemonName = urlParams.get('name');

const colores = {
    normal: '#F5F5F5', fighting: '#F28C6F', flying: '#D5A6BD', poison: '#D6A1B1',
    ground: '#F7B7A3', rock: '#D5B8A1', bug: '#C2D6A1', ghost: '#D0A8D3', steel: '#D0D0D0',
    fire: '#F5A97B', water: '#A3C8E4', grass: '#A8D5A2', electric: '#F9E58F', psychic: '#F8BBD0',
    ice: '#A2D8E0', dragon: '#C8A2D8', dark: '#6E6E6E', fairy: '#F6C1C0', unknown: '#FFEBE8', shadow: '#3A4D6E'
};

const obtenerDetallesPokemon = async (identifier) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${identifier}`;
        const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${identifier}`;
        const [res, resSpecies] = await Promise.all([fetch(url), fetch(speciesUrl)]);
        if (!res.ok || !resSpecies.ok) throw new Error('Error al obtener el Pokémon');
        const data = await res.json();
        const speciesData = await resSpecies.json();
        mostrarDetalles(data, speciesData);
    } catch (error) {
        console.error(`No se pudo obtener el Pokémon: ${error}`);
        alert("Pokémon no encontrado. Por favor, verifica el nombre o ID.");
    }
};

const mostrarDetalles = (pokemon, species) => {
    const nombre = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');
    const types = pokemon.types.map(type => type.type.name);
    const color = colores[types[0]] || '#FFF';
    const description = species.flavor_text_entries.find(entry => entry.language.name === 'es').flavor_text;

    const stats = {
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        sp_atk: pokemon.stats[3].base_stat,
        sp_def: pokemon.stats[4].base_stat,
        speed: pokemon.stats[5].base_stat,
    };

    const detallesHTML = `
        <div class="col-md-6 text-center" style="background-color: ${color}; border-radius: 10px; padding: 20px;">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png" alt="${pokemon.name}" class="img-fluid" style="max-width: 200px;">
            <h2>${nombre} (#${id})</h2>
            <p class="text-muted"><strong>Descripción:</strong> ${description}</p>
            <p><strong>Tipos:</strong> ${types.join(', ')}</p>
            <p><strong>Peso:</strong> ${pokemon.weight / 10} kg | <strong>Altura:</strong> ${pokemon.height / 10} m</p>
            <p><strong>Habilidades:</strong> ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
        </div>
        <div class="col-md-6">
            <h3 class="mt-4">Estadísticas</h3>
            ${Object.entries(stats).map(([stat, value]) => `
                <div class="mb-2">
                    <strong>${stat.toUpperCase()}:</strong>
                    <div class="progress">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${value / 2}%" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="200">${value}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    document.getElementById('pokemon-details').innerHTML = detallesHTML;
};

if (pokemonId) {
    obtenerDetallesPokemon(pokemonId);
} else if (pokemonName) {
    obtenerDetallesPokemon(pokemonName.toLowerCase());
} else {
    console.error('No se especificó un nombre o ID de Pokémon en la URL.');
}
