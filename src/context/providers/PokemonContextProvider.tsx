import { FC, useState } from 'react';
import { PokemonContext, IPokemonContext } from '../PokemonContext';
import { ISinglePokemonResponse } from 'interfaces/Pokemon/ISinglePokemonResponse';

const PokemonContextProvider: FC = (props) => {
    const { children } = props;

    const [team, setTeam] = useState<Array<ISinglePokemonResponse>>([]);

    const handleAddPokemon = (pokemon: ISinglePokemonResponse) => {
        const checkDuplicates = team.findIndex(member => member.id === pokemon.id);
        if(checkDuplicates === -1) {
            const newTeam = [...team, pokemon];
            setTeam(newTeam);
        }
    };


    const handleRemovePokemon = (pokemon: ISinglePokemonResponse) => {
        const newTeam = team.filter(member => member.id !== pokemon.id);
        setTeam(newTeam);
    };

    const contextData: IPokemonContext = {
        team,
        handleAddPokemon,
        handleRemovePokemon,
    };

    return (
        <PokemonContext.Provider value={contextData}>
            {children}
        </PokemonContext.Provider>
    )
};

export { PokemonContextProvider }