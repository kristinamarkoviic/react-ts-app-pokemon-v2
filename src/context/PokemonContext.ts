import { createContext } from "react";
import { ISinglePokemonResponse } from "interfaces/Pokemon/ISinglePokemonResponse";

export interface IPokemonContext {
    team: Array<ISinglePokemonResponse>;
    handleAddPokemon: (pokemon: ISinglePokemonResponse) => void;
    handleRemovePokemon: (pokemon: ISinglePokemonResponse) => void;
}

const initalValues = {
    team: [],
    handleAddPokemon: (pokemon: ISinglePokemonResponse) => {},
    handleRemovePokemon: (pokemon: ISinglePokemonResponse) => {},
}

const PokemonContext = createContext<IPokemonContext>(initalValues);

export { PokemonContext };