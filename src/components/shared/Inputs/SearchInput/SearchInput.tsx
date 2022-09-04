import { ChangeEvent, FC, useState } from 'react';

import { ISinglePokemonResponse } from 'interfaces/Pokemon/ISinglePokemonResponse';
import { PokemonService } from 'services/PokemonService';

import { Pokemon } from 'components/shared/Pokemon';
import { Loader } from 'components/shared/Loader';

import styles from './SearchInput.module.scss';


const SearchInput: FC = (props) => {

    const [params, setParams] = useState<string>("");
    const [pokemon, setPokemon] = useState<ISinglePokemonResponse | null>(null);
    const [isLoading, setIsLoading ] = useState<boolean>(false);

    const inputChangedHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setParams(e.target.value);
    }

    
    const handleSearch = async (params: string) => {
        if(!params) return;
        setIsLoading(true);
        const fetchedPokemon = await PokemonService.searchPokemons(params);
        setPokemon(fetchedPokemon);
        setIsLoading(false);
        setParams("");
    }

    const renderLoader = isLoading && <section className={styles.singlePokemonPage}><Loader></Loader></section>;

    const renderPokemon = pokemon && <Pokemon pokemon={pokemon} />

    return (
        <>
            <section className={styles.search}>
                <input className={styles.searchBar} value={params} onChange={inputChangedHandler} placeholder="Search Example: 33" />
                <button className={styles.searchButton} onClick={() => handleSearch(params)}>Search</button>
            </section>

            <section className={styles.searchResult}>
                { isLoading ? renderLoader : renderPokemon}
            </section>
        </>
    )
}

export default SearchInput;