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

document.getElementById("Sorpresa").addEventListener("click", function () {
    // Generar un número aleatorio del 1 al 1008
    const Pokemon = Math.floor(Math.random() * 1008) + 1;

    // Guardar el número en localStorage
    localStorage.setItem("pokemon_sorpresa", Pokemon);

    // (Opcional) Mostrar el número generado en la consola
    console.log("Número sorpresa guardado:", Pokemon);
    // Redirigir a la página /pokemon.html
    window.location.href = "/pokemon.html";
});





document.getElementById("Buscar").addEventListener("click", function (event) {
    // Prevenir el comportamiento por defecto del botón de tipo submit
    event.preventDefault();

    // Obtener el valor del input
    const busqueda = document.getElementById("search").value;

    // Función para traer el Pokémon
    const traerPokemon = async (Pokemon) => {
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${Pokemon}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Error al obtener el Pokémon');

            const data = await res.json();
            // Guardar el valor en localStorage solo si la búsqueda es exitosa
            localStorage.setItem("pokemon_buscar", Pokemon);

            // (Opcional) Mostrar el valor guardado en la consola
            console.log("Pokémon Guardado:", Pokemon);

            // Redirigir a la página /pokemon.html
            window.location.href = "/pokemon.html";
        } catch (error) {
            // Manejar el error, por ejemplo, mostrar un mensaje al usuario
            console.error(error);
            alert("Pokémon no encontrado. Por favor, verifica el nombre.");
        }
    };

    // Llamar a la función para traer el Pokémon
    traerPokemon(busqueda);
});

