        // Obtener el ID o nombre del Pokémon desde la URL
        const urlParams = new URLSearchParams(window.location.search);
        const pokemonId = urlParams.get('id');
        const pokemonName = urlParams.get('name');

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

        // Obtener los detalles del Pokémon
        const obtenerDetallesPokemon = async (identifier) => {
            try {
                const url = `https://pokeapi.co/api/v2/pokemon/${identifier}`;
                const res = await fetch(url);
                if (!res.ok) throw new Error('Error al obtener el Pokémon');
                const data = await res.json();
                mostrarDetalles(data);
            } catch (error) {
                console.error(`No se pudo obtener el Pokémon: ${error}`);
                alert("Pokémon no encontrado. Por favor, verifica el nombre o ID.");
            }
        };

        // Mostrar los detalles del Pokémon en el HTML
        const mostrarDetalles = (pokemon) => {
            const nombre = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            const id = pokemon.id.toString().padStart(3, '0');
            const types = pokemon.types.map(type => type.type.name);
            const color = colores[types[0]] || '#FFF';

            const stats = {
                hp: pokemon.stats[0].base_stat,
                attack: pokemon.stats[1].base_stat,
                defense: pokemon.stats[2].base_stat,
                sp_atk: pokemon.stats[3].base_stat,
                sp_def: pokemon.stats[4].base_stat,
                speed: pokemon.stats[5].base_stat,
            };

            const detallesHTML = `
                <div class="text-center" style="background-color: ${color}; padding: 20px; border-radius: 10px;">
                    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png" alt="${pokemon.name}" class="img-fluid" style="max-width: 150px;">
                    <h2>${nombre} (#${id})</h2>
                    <p><strong>Tipos:</strong> ${types.join(', ')}</p>
                    <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
                    <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
                </div>
                <h3 class="mt-4">Estadísticas</h3>
                <div class="mb-3">
                    <strong>HP:</strong>
                    <div class="stats-bar">
                        <div class="stats-value" style="width: ${stats.hp / 2}%; background-color: #4caf50;"></div>
                    </div>
                    <span>${stats.hp}</span>
                </div>
                <div class="mb-3">
                    <strong>Attack:</strong>
                    <div class="stats-bar">
                        <div class="stats-value" style="width: ${stats.attack / 2}%; background-color: #4caf50;"></div>
                    </div>
                    <span>${stats.attack}</span>
                </div>
                <div class="mb-3">
                    <strong>Defense:</strong>
                    <div class="stats-bar">
                        <div class="stats-value" style="width: ${stats.defense / 2}%; background-color: #4caf50;"></div>
                    </div>
                    <span>${stats.defense}</span>
                </div>
                <div class="mb-3">
                    <strong>Sp. ATK:</strong>
                    <div class="stats-bar">
                        <div class="stats-value" style="width: ${stats.sp_atk / 2}%; background-color: #4caf50;"></div>
                    </div>
                    <span>${stats.sp_atk}</span>
                </div>
                <div class="mb-3">
                    <strong>Sp. DEF:</strong>
                    <div class="stats-bar">
                        <div class="stats-value" style="width: ${stats.sp_def / 2}%; background-color: #4caf50;"></div>
                    </div>
                    <span>${stats.sp_def}</span>
                </div>
                <div class="mb-3">
                    <strong>Speed:</strong>
                    <div class="stats-bar">
                        <div class="stats-value" style="width: ${stats.speed / 2}%; background-color: #4caf50;"></div>
                    </div>
                    <span>${stats.speed}</span>
                </div>
            `;

            document.getElementById('pokemon-details').innerHTML = detallesHTML;
        };

        // Llamar a la función para obtener los detalles del Pokémon
        if (pokemonId) {
            obtenerDetallesPokemon(pokemonId);
        } else if (pokemonName) {
            obtenerDetallesPokemon(pokemonName.toLowerCase());
        } else {
            console.error('No se especificó un nombre o ID de Pokémon en la URL.');
        }