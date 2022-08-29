import { FC, useState, useContext } from 'react';
import { ISinglePokemonResponse } from 'interfaces/Pokemon/ISinglePokemonResponse';

import styles from './Pokemon.module.scss'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PokemonContext } from 'context/PokemonContext';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IPokemonProps {
    pokemon: ISinglePokemonResponse;
    teamDisplay?: boolean;
}

const Pokemon: FC<IPokemonProps> = (props) => {
    const {pokemon} = props;

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

    const renderAddButton = !props.teamDisplay && <Button disabled={team.length > 6} className={styles.pokemonAddButton} onClick={() =>handleAddPokemon(pokemon)}>Add to Team</Button>;

    const renderRemoveButton = team.find(member => member.id === pokemon.id) && <Button className={styles.pokemonRemoveButton} onClick={() =>handleRemovePokemon(pokemon)}>Remove from Team</Button>
    
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
                <Accordion>
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
                <Accordion>
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
                <Accordion>
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
            <CardActions>
                { renderAddButton }
                { renderRemoveButton }
            </CardActions>
        </Card>
    )
}

export default Pokemon;