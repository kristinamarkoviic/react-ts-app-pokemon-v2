import { IPokemon } from "./IPokemon";

type TPage = string | null;

export interface IGetAllPokemonsResponse {
    count: number;
    next: TPage;
    previous: TPage;
    results: Array<IPokemon>;
}