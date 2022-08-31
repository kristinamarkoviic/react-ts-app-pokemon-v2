import { FC, useContext } from 'react';
import {Link } from 'react-router-dom';

import { ISinglePokemonResponse } from 'interfaces/Pokemon/ISinglePokemonResponse';
import { PokemonContext } from 'context/PokemonContext';

import {  Accordion, AccordionDetails, AccordionSummary,  Button, Card, CardActions, CardContent, CardMedia, Tab, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './Pokemon.module.scss'

interface IPokemonProps {
    pokemon: ISinglePokemonResponse;
    teamDisplay?: boolean;
    showRemoveButton?: boolean;
}

const Pokemon: FC<IPokemonProps> = (props) => {
    const {pokemon, teamDisplay, showRemoveButton } = props;

    const context = useContext(PokemonContext);
    const {team, handleAddPokemon, handleRemovePokemon} = context;

    const parseName = (name: string) => name.replace('-', " ");

    const renderAbilities = pokemon.abilities && 
        pokemon.abilities.map((ability, index) => {
            return <li className={styles.pokemonProperty} key={index}>{ parseName(ability.ability.name) }</li>
        });
    const renderTypes = pokemon.types && 
        pokemon.types.map((type, index) => {
        return <li className={styles.pokemonProperty} key={index}>{ type.type.name }</li>
    });

    const renderMoves = pokemon.moves && 
        pokemon.moves.map((move, index) => {
        return <li className={styles.pokemonProperty} key={index}>{ parseName(move.move.name) }</li>
    }).slice(0, 5);

    const renderAddButton = !teamDisplay && <Button disabled={team.length >= 6} className={styles.pokemonAddButton} onClick={() =>handleAddPokemon(pokemon)}>Add to Team</Button>;

    const renderRemoveButton = (showRemoveButton || team.find(member => member.id === pokemon.id)) && <Button className={styles.pokemonRemoveButton} onClick={() =>handleRemovePokemon(pokemon)}>Remove from Team</Button>
    
    return (
        <Card className={styles.pokemonCard}>
            <CardMedia className={styles.pokemonImage}
                component="img"
                image={pokemon.sprites.front_default}
                alt={pokemon.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" className={styles.pokemonId} component="div">
                    #{pokemon.id}
                </Typography>
                <Typography gutterBottom variant="h5" className={styles.pokemonName} component="div">
                    {pokemon.name}
                </Typography>
            </CardContent>
            <CardContent>
                <Accordion className={styles.pokemonSpecs}>
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
                <Accordion className={styles.pokemonSpecs}>
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
                <Accordion className={styles.pokemonSpecs}>
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
                <Tab className={styles.pokemonLink} label='view profile' value={`/pokemon/${pokemon.id}`} key={pokemon.id} to={`/pokemon/${pokemon.id}`} component={Link} /> 
            </CardContent>
            <CardActions className={styles.pokemonButtons}>
                { renderAddButton }
                { renderRemoveButton }
            </CardActions>
        </Card>
    )
}

export default Pokemon;