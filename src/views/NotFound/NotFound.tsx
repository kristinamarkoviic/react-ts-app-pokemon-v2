import { FC } from 'react';
import {Link } from 'react-router-dom';

import { Tab } from '@mui/material';
import notFoundImage from '../../assets/images/error-404.png';
import pikachuNotFound from '../../assets/images/not_found_page.png';
import styles from './NotFound.module.scss';


const NotFoundPage: FC = (props) => {

    return (
        <section className={styles.notFoundPage}>
            <img className={styles.notFoundPageImage} src={notFoundImage} alt='Not found image' />
            <img className={styles.pikachuNotFoundImage} src={pikachuNotFound} alt='Not found image' />
            <Tab className={styles.backLink} label='Back To Home page' value='/' key='0' to='/' component={Link} />
        </section>
    )
}

export default NotFoundPage;