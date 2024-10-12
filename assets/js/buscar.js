// Almacenar los nombres de los Pokémon y sus URLs
let pokemonList = [];

// Función para cargar los datos de la API
async function fetchPokemon() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        const data = await response.json();
        pokemonList = data.results.map(pokemon => ({
            name: pokemon.name,
            url: pokemon.url
        }));
    } catch (error) {
        console.error('Error al obtener la lista de Pokémon:', error);
    }
}

// Filtrar las sugerencias
function filterSuggestions(query) {
    const filtered = pokemonList.filter(pokemon =>
        pokemon.name.startsWith(query.toLowerCase())
    );

    displaySuggestions(filtered);
}

// Mostrar sugerencias
function displaySuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';

    if (suggestions.length > 0) {
        suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion.name;

            // Evento de clic para seleccionar la sugerencia y redirigir
            li.addEventListener('click', () => {
                document.getElementById('search').value = suggestion.name;
                displaySuggestions([]); // Limpiar sugerencias
                redirectToPokemonPage(suggestion.name);
            });

            suggestionsContainer.appendChild(li);
        });
    }
}

// Redirigir a la página del Pokémon seleccionado
function redirectToPokemonPage(pokemonName) {
    const pokemon = pokemonList.find(p => p.name === pokemonName.toLowerCase());
    if (pokemon) {
        // Redirigir a la página del Pokémon
        window.location.href = `/pokemon.html?name=${pokemonName.toLowerCase()}`;
    } else {
        alert('Pokémon no encontrado. Por favor, verifica el nombre.');
    }
}

// Evento de entrada en la barra de búsqueda
document.getElementById('search').addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        filterSuggestions(query);
    } else {
        displaySuggestions([]);
    }
});

// Evento de clic en el botón de búsqueda
document.getElementById('Buscar').addEventListener('click', (event) => {
    event.preventDefault();
    const query = document.getElementById('search').value.trim().toLowerCase();
    redirectToPokemonPage(query);
});

// Evento de clic para el botón "¡Sorpréndeme!"
document.getElementById('Sorpresa').addEventListener('click', function () {
    const randomId = Math.floor(Math.random() * 1008) + 1;
    window.location.href = `/pokemon.html?id=${randomId}`;
});

// Cargar datos al iniciar
fetchPokemon();
