import axios from "axios";
import { API_BASE_URL } from '../utils/contstants';
import { ISinglePokemonResponse } from "interfaces/Pokemon/ISinglePokemonResponse";
import { IGetAllPokemonsResponse } from "interfaces/Pokemon/IGetAllPokemonsResponse";

const pokemonApi = axios.create({
    baseURL: API_BASE_URL
})

const getAllPokemons = () => pokemonApi.get<IGetAllPokemonsResponse>('/pokemon').then(response => response.data);
const getSinglePokemon = (id: number) => pokemonApi.get<ISinglePokemonResponse>(`/pokemon/${id}`).then(response => response.data);

const PokemonService = {
    get: getAllPokemons,
    getById: getSinglePokemon
}

export { PokemonService };