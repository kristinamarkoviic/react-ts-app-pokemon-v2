import { FC } from 'react';
import { SearchInput } from 'components/shared/Inputs/SearchInput';


const HomePage: FC = (props) => {

    return (
        <section>
            <h1>Home page</h1>
            <SearchInput></SearchInput>
        </section>
    )
}

export default HomePage;