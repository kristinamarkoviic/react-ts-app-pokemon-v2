import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';


import { Layout } from 'components/Layout';
import { HomePage } from 'views/Home';
import { ProfilePage } from 'views/Profile';

const App: FC = () => {
  
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='profile' element={ <ProfilePage /> } />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
