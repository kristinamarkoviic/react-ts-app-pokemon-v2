import {FC} from 'react';
import styles from './Layout.module.scss';

import { Header } from 'components/shared/Header';
import { Footer } from 'components/shared/Footer';

import { PokemonContext } from 'context/PokemonContext';

const Layout: FC = (props) => {
    const {children} = props;

    return (
        <main>
                <div className={styles.layoutContainer}>
                    <Header/>
                    {children}
                    <Footer/>
                </div>
        </main>
    )
}

export default Layout;