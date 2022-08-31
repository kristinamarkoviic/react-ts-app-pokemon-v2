import { FC } from 'react';

import { SearchInput } from 'components/shared/Inputs/SearchInput';

import { Typography } from '@mui/material';
import styles from './Home.module.scss';

const HomePage: FC = (props) => {

    return (
        <section className={styles.homePage}>
            <Typography variant="h6" className={styles.homeTitle} align="center" gutterBottom>
                Search pokemons
            </Typography>
            <SearchInput></SearchInput>
        </section>
    )
}

export default HomePage;