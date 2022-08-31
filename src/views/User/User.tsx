import { FC, useState, useEffect, useContext } from 'react';
import { PokemonContext } from 'context/PokemonContext';

import { Typography, Card, CardContent, CardMedia, Avatar } from '@mui/material';
import styles from './User.module.scss';
import userImage from '../../assets/images/pokemon-trainer.png';
import favouritePokemon from '../../assets/images/psyduck.png';

interface IUser {
    userName: string;
    age: number;
    numberOfFetchedPokemons: number;
    about: string;
    image: string;
}

const UserPage: FC = (props) => {
    const [userData, setUserData] = useState<IUser | null>(null);
    const context = useContext(PokemonContext);

    const { team } = context;

    useEffect(() => {
        const userMockData = {
            userName: 'Kristina Markovic',
            age: 24,
            numberOfFetchedPokemons: team.length,
            about: 'A Pokémon Trainer is a person who catches, trains, cares for, and battles with Pokémon. The majority of people within the known Pokémon world are Trainers.',
            image: userImage
        }
        setUserData(userMockData);
    }, [])
    
    return (
        <section className={styles.userPage}>
            <Typography variant="h6" className={styles.userProfileTitle} align="center" gutterBottom>
                User profile page
            </Typography>
            <Card className={styles.userCard}>
                <Avatar className={styles.userFavourite} src={favouritePokemon} alt='Favourite pokemon'/>
                <CardMedia className={styles.userImage}
                    component="img"
                    image={userData?.image}
                    alt={userData?.userName}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        { userData?.userName} ({userData?.age})
                    </Typography>
                    <Typography>
                        Team: { userData?.numberOfFetchedPokemons}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        { userData?.about}
                    </Typography>
                </CardContent>
            </Card>
        </section>
    )
}

export default UserPage;