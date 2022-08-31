import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { PokemonContext } from 'context/PokemonContext';
import { Pokemon } from 'components/shared/Pokemon';

import { Typography, Chip, Box } from '@mui/material';



import styles from './Profile.module.scss';


const ProfilePage: FC = (props) => {

    const history = useNavigate();

    const context = useContext(PokemonContext);

    const { team } = context;

    const handleClick = () => {
        history('/');
    };

    const renderContext = team.length > 0 && team.map((member,index) => <Pokemon teamDisplay={true} key={index} pokemon={member} />);
    //ovde izmeni <Link> ide 
    const renderLink = team.length === 0 && <Chip label="Back to home page" variant="outlined" onClick={handleClick} />

    return (
        <section className={styles.profilePage}>
            <Typography variant="h6" className={styles.profileTitle} align="center" gutterBottom>
                Pokemon Team
            </Typography>
            <Box className={styles.pokemonContainer}>
                {renderContext}
            </Box>
            
            {renderLink}
        </section>
    )
}

export default ProfilePage;