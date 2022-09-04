import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Route as Route } from '../../../types/Route';
import routes from '../../../config/routes';

import { Tabs, Tab } from '@mui/material';
import styles from './Header.module.scss';
import logo from '../../../assets/images/logo.png';

const Header = () => {

    const [routeState, setRoutesState] = useState<Route[]>(routes);

    const location = useLocation();

    const findCurrentTab = routeState.find(route =>route.path === location.pathname);

    const currentTab = findCurrentTab ? location.pathname : '/';
    
    return (
        <>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <img src={logo} alt="logo" />
                </div>
                <Tabs 
                    value={currentTab}
                    sx={{ color: 'primary.main' }}
                >
                    {routeState.map((route: Route) => (
                        <Tab className={styles.tabLink} label={ route.title } value={route.path} key={route.key} to={route.path} component={Link} />
                    ))}
                </Tabs>
            </header>
        </>
    )
}

export default Header;