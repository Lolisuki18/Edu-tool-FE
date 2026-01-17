import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const MainLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 w-full">
      <div className="w-full">
        <Outlet />
      </div>
    </main>
    <Footer />
  </div>
);

export default MainLayout;
