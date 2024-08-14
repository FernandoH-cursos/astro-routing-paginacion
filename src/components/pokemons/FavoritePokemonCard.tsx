import type { FavoritePokemon } from "@interfaces/favorite-pokemon.response";
import { createSignal, Show, type Component } from "solid-js";

interface Props {
  pokemon: FavoritePokemon;
}
export const FavoritePokemonCard: Component<Props> = ({ pokemon }) => {
  const [isVisible, setIsVisible] = createSignal(true);

  const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const deleteFavorite = () => {
    //* Obteniendo los pokemones favoritos del localStorage
    const favorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    ) as FavoritePokemon[];

    //* Eliminando el pokemon clickeado de los favoritos
    const newFavorites = favorites.filter(
      (favorite) => favorite.id !== pokemon.id
    );

    //* Actualizando los favoritos en el localStorage
    localStorage.setItem("favorites", JSON.stringify(newFavorites));

    //* Actualizando el estado de los pokemones favoritos para que se renderice la eliminación y desaparezca el pokemon
    setIsVisible(false);
  };

  //* <Show> es un componente que renderiza su contenido solo si la condición es verdadera
  return (
    <Show when={isVisible()}>
      <div class="flex flex-col justify-center items-center">
        <a href={`/pokemons/${pokemon.name}`}>
          <img
            src={imageSrc}
            alt={pokemon.name}
            width="96"
            height="96"
            style={{ "view-transition-name": `${pokemon.name}-image` }}
          />

          <p class="capitalize">
            #{pokemon.id} {pokemon.name}
          </p>
        </a>
        <button onClick={deleteFavorite} class="text-red-400">
          Borrar
        </button>
      </div>
    </Show>
  );
};
