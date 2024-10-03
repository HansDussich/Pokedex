// Almacenar los nombres de los Pokémon
let pokemonList = [];

// Función para cargar los datos de la API
async function fetchPokemon() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        const data = await response.json();
        pokemonList = data.results.map(pokemon => pokemon.name); // Guardar solo los nombres
    } catch (error) {
        console.error("Error al cargar Pokémon:", error);
    }
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

            // Agregar evento de clic para completar la búsqueda
            li.addEventListener('click', () => {
                document.getElementById('search').value = suggestion; // Completar con el sugerido
                displaySuggestions([]); // Limpiar las sugerencias
            });

            suggestionsContainer.appendChild(li);
        });
    }
}

// Evento de entrada en la barra de búsqueda
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        filterSuggestions(query);
    } else {
        displaySuggestions([]); // Limpiar sugerencias si no hay entrada
    }
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevenir el comportamiento por defecto
        document.getElementById("Buscar").click(); // Simular clic en el botón de búsqueda
    }
});

// Cargar datos al iniciar
fetchPokemon();

// Evento para botón de sorpresa
document.getElementById("Sorpresa").addEventListener("click", function () {
    const Pokemon = Math.floor(Math.random() * 1008) + 1; // Generar un número aleatorio del 1 al 1008
    localStorage.setItem("pokemon_sorpresa", Pokemon); // Guardar el número en localStorage
    console.log("Número sorpresa guardado:", Pokemon); // Mostrar en consola
    window.location.href = "/pokemon.html"; // Redirigir a la página /pokemon.html
});

// Evento para botón de búsqueda
document.getElementById("Buscar").addEventListener("click", function (event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del botón
    const busqueda = document.getElementById("search").value; // Obtener el valor del input

    // Función para traer el Pokémon
    const traerPokemon = async (Pokemon) => {
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${Pokemon}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Error al obtener el Pokémon');

            const data = await res.json();
            localStorage.setItem("pokemon_buscar", Pokemon); // Guardar el valor en localStorage
            console.log("Pokémon Guardado:", Pokemon); // Mostrar en consola
            window.location.href = "/pokemon.html"; // Redirigir a la página /pokemon.html
        } catch (error) {
            console.error(error); // Manejar el error
            alert("Pokémon no encontrado. Por favor, verifica el nombre.");
        }
    };

    // Llamar a la función para traer el Pokémon
    traerPokemon(busqueda);
});
