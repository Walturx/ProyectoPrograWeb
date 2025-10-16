import HeaderHome from '../components/HeaderHome';
import Footer from '../components/footer';
import NavBarHome from '../components/navBarHome';
import UserDashboard from '../components/UserDashboard/UserDashboard';

const UserDashboardPage = () => {
    return (
        <>
            <HeaderHome />
            <NavBarHome />
            <UserDashboard />
            <Footer />
        </>
    );
};

export default UserDashboardPage;
