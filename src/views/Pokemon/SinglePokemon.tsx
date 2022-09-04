import { FC, useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { PokemonContext } from 'context/PokemonContext';
import { PokemonService } from 'services/PokemonService';
import { ISinglePokemonResponse } from 'interfaces/Pokemon/ISinglePokemonResponse';
import { ISpeciesPokemonResponse } from 'interfaces/Pokemon/ISpeciesPokemonResponse';
import { Loader } from 'components/shared/Loader';

import { Typography, Card, CardMedia, CardContent, CardActions, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './SinglePokemon.module.scss';

interface ISinglePokemon {
    teamDisplay?: boolean;
}

const SinglePokemonPage: FC<ISinglePokemon> = (props) =>  {

    const { teamDisplay } = props;
    const [ pokemon, setPokemon ] = useState<ISinglePokemonResponse | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ showRemoveButton, setShowRemoveButton] = useState<boolean>(true);
    const [ pokemonSpecies, setPokemonSpecies] = useState<ISpeciesPokemonResponse | null>(null);

    const { id } = useParams();
    const history = useNavigate();
    const context = useContext(PokemonContext);
    const { team, handleAddPokemon, handleRemovePokemon } = context;

    useEffect(() => {

        Number.isNaN(Number(id)) ?  history('*') : getSinglePokemon();

    }, [])

    const getPokemonSpecies = async (id: number) => {
        if(!id) return;
        setIsLoading(true);
        const fetchedSpecies = await PokemonService.getSpecies(+id);
        setPokemonSpecies(fetchedSpecies);
        if(pokemon) {
            pokemon.evolution_chain = fetchedSpecies;
            setPokemon(pokemon);
            console.log(pokemon, 'pokemon sad')
        }
    }

    const getPokemon = async () => {
        if(!id) return;
        setIsLoading(true);
        const fetchedPokemon = await PokemonService.getById(+id);
        await getPokemonSpecies(fetchedPokemon.id);
        setPokemon(fetchedPokemon);
    }

    const getSinglePokemon = async () => {
        await getPokemon();
        setIsLoading(false);
    }

    const parseName = (name: string) => name.replace('-', " ");

    const renderAbilities = pokemon && pokemon.abilities && 
        pokemon.abilities.map((ability, index) => (
            <li className={styles.pokemonProperty} key={index}>{ parseName(ability.ability.name) }</li>
        ));
    const renderTypes = pokemon && pokemon.types && 
        pokemon.types.map((type, index) => (
            <li className={styles.pokemonProperty} key={index}>{ type.type.name }</li>
        ));

    const renderMoves = pokemon && pokemon.moves && 
        pokemon.moves.map((move, index) => (
        <li className={styles.pokemonProperty} key={index}>{ parseName(move.move.name) }</li>
    )).slice(0, 5);

    const renderAddButton = pokemon && !teamDisplay && <Button disabled={team.length >= 6} className={styles.pokemonAddButton} onClick={() =>handleAddPokemon(pokemon)}>Add to Team</Button>;
    const renderRemoveButton = pokemon && team.find(member => member.id === pokemon.id) && <Button className={styles.pokemonRemoveButton} onClick={() =>handleRemovePokemon(pokemon)}>Remove from Team</Button>
    
    // const renderSpecies = pokemonSpecies && (
    //     <section>
    //         { pokemonSpecies.evolution_chain.url }
    //     </section>
    // );
    
    const renderPokemon = pokemon &&
        <section className={styles.singlePokemonPage}>
            <Typography variant="h6"className={styles.pokemonTitle} align="center" gutterBottom>
                STATISTICS 
            </Typography>
            <Card className={styles.pokemonCard}>
                <CardContent className={styles.singlePokemonAbout}> 
                    <Typography gutterBottom variant="h6" className={styles.pokemonImageText} component="p">Front</Typography>
                    <CardMedia className={styles.pokemonImage}
                        component="img"
                        image={pokemon.sprites.front_default}
                        alt={pokemon.name}
                    />
                    <Typography gutterBottom variant="h6" className={styles.pokemonImageText} component="p">Back</Typography>
                    <CardMedia className={styles.pokemonImage}
                        component="img"
                        image={pokemon.sprites.back_default}
                        alt={pokemon.name}
                    />
                    <Typography gutterBottom variant="h6" className={styles.pokemonImageText} component="p">Shiny</Typography>
                    <CardMedia className={styles.pokemonImage}
                        component="img"
                        image={pokemon.sprites.front_shiny}
                        alt={pokemon.name}
                    />
                    <CardActions className={styles.pokemonButtons}>
                        { renderAddButton }
                        { renderRemoveButton }
                    </CardActions>
                </CardContent>
                <CardContent className={styles.singlePokemonSpecs}>
                    <Typography gutterBottom variant="h5" className={styles.pokemonName} component="p">
                        # {pokemon.id} {pokemon.name}
                    </Typography>
                    <Typography gutterBottom className={styles.pokemonWidth} component="p">Height / Weight: {pokemon.height} x {pokemon.weight}</Typography>
                    <Accordion className={styles.pokemonSpecs} defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                        <Typography>Abilities</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            { renderAbilities }
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.pokemonSpecs} defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                        <Typography>Moves</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            { renderMoves }
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.pokemonSpecs} defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                        <Typography>Types</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            { renderTypes }
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Typography>Species</Typography>
                    {/* { renderSpecies } */}
                    { pokemon.evolution_chain?.evolution_chain.url}
                </CardContent>
            </Card>
        </section>;

    const renderLoader = (
        <section className={styles.singlePokemonPage}>  
            <Loader></Loader>
        </section>);

    // const renderPage = () => {
    //     if(isLoading) return renderLoader;
    //     if(pokemon) return renderPokemon;
    // }

    return ( 
        <>
            { isLoading ? renderLoader : renderPokemon }
        </> 
    )
}

export default SinglePokemonPage;