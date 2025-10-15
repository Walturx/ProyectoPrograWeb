import Footer from '../components/footer';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import HeaderHome from '../components/HeaderHome';
import NavBarHome from '../components/navBarHome';

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