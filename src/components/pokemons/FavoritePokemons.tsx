import { createSignal, For } from "solid-js";

import { FavoritePokemonCard } from "./FavoritePokemonCard";

import type { FavoritePokemon } from "@interfaces/favorite-pokemon.response";

const getLocalStoragePokemons = (): FavoritePokemon[] => {
  const favoritesPokemons = localStorage.getItem("favorites");
  return favoritesPokemons ? JSON.parse(favoritesPokemons) : [];
}


export const FavoritePokemons = () => {
  //* Guardando pokemons favoritos en el estado
  const [pokemons, setFavoritePokemons] = createSignal(getLocalStoragePokemons());

  return (
    <div class="grid grid-cols-2 sm:grid-cols-4">
      <For each={pokemons()} fallback={<p class="col-span-4 text-xl mt-2">No hay pokemones favoritos</p>}>
        {(pokemon) => (
          <FavoritePokemonCard pokemon={pokemon} />
        )}
      </For>
    </div>
  );
}
