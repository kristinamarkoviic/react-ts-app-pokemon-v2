import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { PokemonService } from 'services/PokemonService';
import { ISinglePokemonResponse } from 'interfaces/Pokemon/ISinglePokemonResponse';

import { Typography, Card, CardMedia, CardContent, CardActions, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './SinglePokemon.module.scss';

const SinglePokemonPage: FC = (props) =>  {

    const [pokemon, setPokemon] = useState<ISinglePokemonResponse | null>(null);
    const { id } = useParams();

    const history = useNavigate();

    useEffect(() => {

        isNaN(Number(id)) ?  history('*') : getPokemon();

    }, [])

    const getPokemon = async () => {
        if(!id) return;

        const fetchedPokemon = await PokemonService.getById(+id);
        setPokemon(fetchedPokemon);
    }

    const parseName = (name: string) => name.replace('-', " ");
    //

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

    const renderAddButton = <Button className={styles.pokemonAddButton}>Add to Team</Button>;

    const renderRemoveButton =  <Button className={styles.pokemonRemoveButton}>Remove from Team</Button>


    return pokemon ? (
        <section className={styles.singlePokemonPage}>
            <Typography variant="h6" className={styles.pokemonTitle} align="center" gutterBottom>
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
                </CardContent>
            </Card>
        </section>
    ) : (
        <section className={styles.singlePokemonPage}>
            <Typography variant="h6">There is no pokemon with this ID { id }.</Typography>
        </section>
    )
}

export default SinglePokemonPage;