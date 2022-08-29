import styles from './Footer.module.scss';
import { Typography } from '@mui/material';

const Footer = () => {
    return (
        <>
            <footer className={ styles.footer}>
                <Typography variant="h6" className={styles.footerText} align="center" gutterBottom>
                    Pokemon App
                </Typography>
                <Typography variant="subtitle1" className={styles.footerText} align="center" component="p">
                    Pokemon app made by Kristina Markovic  &copy; 2022  
                </Typography>
            </footer>
        </>
    )
}

export default Footer;