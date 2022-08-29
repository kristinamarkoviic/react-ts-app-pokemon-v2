import { ChangeEvent, FC, useContext, useState } from 'react';

import { ISinglePokemonResponse } from 'interfaces/Pokemon/ISinglePokemonResponse';

import { PokemonService } from 'services/PokemonService';
import { PokemonContext } from 'context/PokemonContext';

import styles from './SearchInput.module.scss';
import { Pokemon } from 'components/shared/Pokemon';

const SearchInput: FC = (props) => {

    const context = useContext(PokemonContext);

    const [params, setParams] = useState<string>("");
    const [pokemon, setPokemon] = useState<ISinglePokemonResponse | null>(null);
    

    const inputChangedHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setParams(e.target.value);
    }

    
    const handleSearch = async (id: number) => {
        if(!id) return;

        const fetchedPokemon = await PokemonService.getById(id);
        setPokemon(fetchedPokemon);
        setParams("");
    }

    const renderPokemon = pokemon && <Pokemon pokemon={pokemon} />

    return (
        <>
            <section className={styles.search}>
                <input className={styles.searchBar} value={params} onChange={inputChangedHandler} placeholder="Search Example: 33" />
                <button className={styles.searchButton} onClick={() => handleSearch(+params)}>Search</button>
            </section>

            <section className={styles.searchResult}>
                { renderPokemon }
            </section>
        </>
    )
}

export default SearchInput;