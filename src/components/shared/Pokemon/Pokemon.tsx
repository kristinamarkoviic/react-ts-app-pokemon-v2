import { FC, useState } from 'react';
import { ISinglePokemonResponse } from 'interfaces/Pokemon/ISinglePokemonResponse';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IPokemonProps {
    pokemon: ISinglePokemonResponse;
    teamDisplay?: boolean;
}

const Pokemon: FC<IPokemonProps> = (props) => {
    const {pokemon} = props;

    const [expanded, setExpanded] = useState<string | false>(false);
    
    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            component="img"
            height="140"
            image={pokemon.sprites.front_default}
            alt="green iguana"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
               # {pokemon.id}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
               {pokemon.name}
            </Typography>
            
        </CardContent>
        <CardActions>
            <Button size="small">Add to Team</Button>
            <Button size="small">Remove from Team</Button>
        </CardActions>
        </Card>
    )
}

export default Pokemon;