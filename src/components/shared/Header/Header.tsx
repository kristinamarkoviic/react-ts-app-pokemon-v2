import { useState } from 'react';

import { ListItemText, ListItemButton } from '@mui/material';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
const Header = () => {
    // Typo in setter
    // const [routesState, setRoutesStage] = useState<Route[]>(routes);
    
    // return (
    //     <>
    //         <header className={styles.header}>
    //             {routesState.map((route: Route) => (
    //                 <Link
    //                     key={route.key}
    //                     to={{
    //                     pathname: route.path,
    //                     }}
    //                 >
    //                     <ListItemButton className={styles.navTab}>
    //                         <ListItemText className={styles.navLink} primary={ route.title } />
    //                     </ListItemButton>
    //                 </Link> 
    //             ))}
    //         </header>
    //     </>
    // )

    return (
        <header className={styles.header}>
        </header>
    )
}

export default Header;