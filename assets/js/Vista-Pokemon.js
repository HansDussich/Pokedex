// Almacenar los nombres de los Pokémon
let pokemonList = [];

// Función para cargar los datos de la API
async function fetchPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    const data = await response.json();
    pokemonList = data.results.map(pokemon => pokemon.name); // Guardar solo los nombres
}

// Filtrar las sugerencias
function filterSuggestions(query) {
    const filtered = pokemonList.filter(pokemon => 
        pokemon.startsWith(query.toLowerCase()) // Busca coincidencias
    );

    displaySuggestions(filtered);
}

// Mostrar sugerencias
function displaySuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = ''; // Limpiar sugerencias previas

    if (suggestions.length > 0) {
        suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            suggestionsContainer.appendChild(li);
        });
    }
}

// Evento de entrada en la barra de búsqueda
document.getElementById('search').addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        filterSuggestions(query);
    } else {
        displaySuggestions([]); // Limpiar sugerencias si no hay entrada
    }
});

// Cargar datos al iniciar
fetchPokemon();
