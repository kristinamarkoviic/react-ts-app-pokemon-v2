import axios from "axios";
import { API_BASE_URL } from '../utils/contstants';
import { ISinglePokemonResponse } from "interfaces/Pokemon/ISinglePokemonResponse";
import { IGetAllPokemonsResponse } from "interfaces/Pokemon/IGetAllPokemonsResponse";
import { ISpeciesPokemonResponse } from "interfaces/Pokemon/ISpeciesPokemonResponse";

const pokemonApi = axios.create({
    baseURL: API_BASE_URL
})

const getAllPokemons = () => pokemonApi.get<IGetAllPokemonsResponse>('/pokemon').then(response => response.data);
const getSinglePokemon = (id: number) => pokemonApi.get<ISinglePokemonResponse>(`/pokemon/${id}`).then(response => response.data);

// const getSinglePokemon = (id: number) => pokemonApi.get<ISinglePokemonResponse>(`/pokemon/${id}`).then(response => response.data).then((response) => {
//     return getSpecies(response.id);
// });
// const getSinglePokemon = (id: number) => pokemonApi.get<ISinglePokemonResponse>(`/pokemon/${id}`).then(response => response.data).then(
//     () => pokemonApi.get<ISpeciesPokemonResponse>(`/pokemon-species/${id}`).then(response => response.data.evolution_chain)
// )
const searchPokemons = (params : string) => pokemonApi.get<ISinglePokemonResponse>(`/pokemon/${params}`).then(response => response.data); 
const getSpecies = (params: number) => pokemonApi.get<ISpeciesPokemonResponse>(`/pokemon-species/${params}`).then(response => response.data);

const PokemonService = {
    get: getAllPokemons,
    getById: getSinglePokemon,
    searchPokemons: searchPokemons,
    getSpecies: getSpecies
}

export { PokemonService };