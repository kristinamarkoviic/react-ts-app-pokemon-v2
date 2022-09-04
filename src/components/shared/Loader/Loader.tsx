import loaderImage from '../../../assets/images/loader.svg';
import styles from './Loader.module.scss';


const Loader = () => {

    return (
        <section className={styles.loader}>
            <img src={loaderImage} alt="Loader" className={styles.loaderImage} />
        </section>
    )

}

export default Loader;