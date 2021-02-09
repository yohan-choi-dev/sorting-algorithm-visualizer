import './homepage.styles.scss';

import { Header, Footer, Main } from './components';
import { Visualizer } from '../visualizer';

function Homepage() {
    return (
        <div>
            <Header></Header>
            <Main>
                <Visualizer></Visualizer>
            </Main>
            <Footer>&copy; 2021 by Yohan Choi. All rights reserved.</Footer>
        </div>
    );
}

export default Homepage;
