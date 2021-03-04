import { Header } from './header';
import { Navigation } from './navigation';
import { Footer } from './footer';

function Layout({ children }) {
  return (
    <div>
      <Header>
        <Navigation></Navigation>
      </Header>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
