import { useState } from "react";

function PokemonCard({ pokemon }) {
  return (
    <div>
      <h2>{pokemon.name}</h2>
      <p><strong>ID:</strong> {pokemon.id}</p>

      <img
        src={pokemon.sprites.front_default || ""}
        alt={pokemon.name}
      />

      <h3>Estadísticas:</h3>
      <ul>
        {pokemon.stats.map((stat) => (
          <li key={stat.stat.name}>
            <strong>{stat.stat.name}:</strong> {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PokemonComponent() {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const buscarPokemon = async () => {
    if (!name.trim()) {
      setError("Ingrese el nombre de un Pokémon.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setPokemon(null);

      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.trim().toLowerCase()}`
      );

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("No se encontró el Pokémon.");
        }
        throw new Error("Error HTTP " + res.status);
      }

      const data = await res.json();
      setPokemon(data);

    } catch (err) {
      if (err.message === "Failed to fetch") {
        setError("No hay conexión con la API.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Buscador de Pokémon</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          buscarPokemon();
        }}
      >
        <input
          type="text"
          placeholder="Ej: pikachu"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  );
}

export default PokemonComponent;