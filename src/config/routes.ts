import { Route } from '../types/Route';
import { HomePage } from 'views/Home';
import { ProfilePage } from 'views/Profile';
import { UserPage } from 'views/User';

const routes: Array<Route> = [
    {
        key: 'router-home',
        title: 'Home',
        description: 'Home Page',
        element: HomePage,
        path: '/'
    },
    {
        key: 'router-profile',
        title: 'Team',
        description: 'Pokemon Profile',
        element: ProfilePage,
        path: '/profile'
    },
    {
        key: 'router-user-page',
        title: 'User',
        description: 'User Page',
        element: UserPage,
        path: '/user'
    },
]

export default routes;