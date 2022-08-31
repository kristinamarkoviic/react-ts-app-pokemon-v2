import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';


import { Layout } from 'components/Layout';
import { HomePage } from 'views/Home';
import { ProfilePage } from 'views/Profile';
import { UserPage } from 'views/User';
import { SinglePokemonPage } from 'views/Pokemon';
import { NotFoundPage } from 'views/NotFound';

const App: FC = () => {
  
  return (
    <BrowserRouter>
        <Routes>
              <Route path='/' 
              element={  
                <Layout>
                  <HomePage />
                </Layout> } />
              <Route path='profile' 
              element={ 
                <Layout>
                  <ProfilePage />
                </Layout> } />
              <Route path='user' 
              element={
                <Layout>
                  <UserPage />
                </Layout> } />
              <Route path='pokemon/:id' 
              element={ 
                <Layout>
                  <SinglePokemonPage />
                </Layout> } />
              <Route path='*' element={ <NotFoundPage /> } />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
