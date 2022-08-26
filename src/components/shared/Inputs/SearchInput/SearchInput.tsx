import { ChangeEvent, FC, useContext, useState } from 'react';

import { ISinglePokemonResponse } from 'interfaces/Pokemon/ISinglePokemonResponse';

import { PokemonService } from 'services/PokemonService';
import { PokemonContext } from 'context/PokemonContext';

import styles from './SearchInput.module.scss';
import { Pokemon } from 'components/shared/Pokemon';

const SearchInput: FC = (props) => {

    const context = useContext(PokemonContext);
    const { team } = context;

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
            <label className={styles.labelSearch}>Search pokemons
                <input className={styles.search} value={params} onChange={inputChangedHandler} placeholder="Search pokemons" />
            </label>
            <button className={styles.buttonSearch} onClick={() => handleSearch(+params)}>Search</button>
            { renderPokemon }
        </>
    )
}

export default SearchInput;