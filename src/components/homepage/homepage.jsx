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
            <Footer>
                <p>&copy; 2021 by Yohan Choi. All rights reserved.</p>
            </Footer>
        </div>
    );
}

export default Homepage;
