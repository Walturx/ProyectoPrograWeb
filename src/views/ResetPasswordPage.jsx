import HeaderHome from '../components/HeaderHome';
import Footer from '../components/footer';
import NavBarHome from '../components/navBarHome';
import ResetPassword from '../components/ResetPassword/ResetPassword';

const ResetPasswordPage = () => {
    return (
        <>
            <HeaderHome />
            <NavBarHome />
            <ResetPassword /> 
            <Footer />
        </>
    );
}

export default ResetPasswordPage;