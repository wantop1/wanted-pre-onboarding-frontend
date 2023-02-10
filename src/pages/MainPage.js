import {MAIN_LOGO} from '../constants/paths';

const MainPage = () => {
    return(
        <section className="main-page-section">
            <h1>GHOST TO DO LIST</h1>
            <div><img src={MAIN_LOGO} alt="logo"/></div>
        </section>
    )
}

export default MainPage;