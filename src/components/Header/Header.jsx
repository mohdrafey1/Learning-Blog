import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../appwrite/auth';
import { Container, Logo, LogoutBtn } from '../index';
import { logout as logoutAction } from '../../store/authSlice';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const user = useSelector((state) => state.auth.userData);
    const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (authStatus && !user) {
            const fetchUserDetails = async () => {
                const user = await authService.getCurrentUser();
                if (user) {
                    dispatch({
                        type: 'auth/login',
                        payload: { userData: user },
                    });
                }
            };
            fetchUserDetails();
        }
    }, [authStatus, user, dispatch]);

    React.useEffect(() => {
        if (!authStatus) {
            setProfileMenuOpen(false);
        }
    }, [authStatus]);

    const navItems = [
        { name: 'Home', slug: '/', active: true, icon: 'fa-house' },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus,
            icon: 'fa-right-to-bracket',
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus,
            icon: 'fa-book',
        },
        {
            name: 'My Post',
            slug: '/my-post',
            active: authStatus,
            icon: 'fa-address-book',
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authStatus,
            icon: 'fa-plus',
        },
    ];

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    const handleProfileMenuItemClick = (slug) => {
        setProfileMenuOpen(false);
        navigate(slug);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLogout = async () => {
        await authService.logout();
        dispatch(logoutAction());
        navigate('/');
    };

    return (
        <header className="py-3 shadow sticky bg-gray-300 z-50">
            <Container>
                <nav className="flex items-center justify-between">
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>
                    <button
                        className="block md:hidden px-4 py-2 text-2xl font-medium"
                        onClick={toggleMobileMenu}
                    >
                        &#9776;
                    </button>
                    <ul className="hidden md:flex ml-auto text-lg font-medium">
                        {navItems.map((item) =>
                            item.active ? (
                                <li
                                    key={item.name}
                                    className="flex items-center"
                                >
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="px-4 py-2 mx-2 duration-200 hover:bg-blue-100 rounded-full flex items-center"
                                    >
                                        <i
                                            className={`fa-solid ${item.icon} mr-2`}
                                        ></i>
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li className="relative">
                                <button
                                    onClick={toggleProfileMenu}
                                    className="px-4 py-2 mx-2 duration-200 hover:bg-blue-100 rounded-full flex items-center bg-slate-400"
                                >
                                    <i className="fa-solid fa-user mr-2"></i>
                                    {user?.name}
                                </button>
                                {profileMenuOpen && (
                                    <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                                        <li
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                            onClick={() =>
                                                handleProfileMenuItemClick(
                                                    '/profile'
                                                )
                                            }
                                        >
                                            <i className="fa-solid fa-user mr-2"></i>
                                            Profile
                                        </li>
                                        <li
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                            onClick={handleLogout}
                                        >
                                            <i className="fa-solid fa-right-from-bracket mr-2"></i>
                                            Logout
                                        </li>
                                    </ul>
                                )}
                            </li>
                        )}
                    </ul>
                    {mobileMenuOpen && (
                        <ul className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 shadow-lg md:hidden flex flex-col items-center">
                            {navItems.map((item) =>
                                item.active ? (
                                    <li
                                        key={item.name}
                                        className="w-full text-center"
                                    >
                                        <button
                                            onClick={() => {
                                                navigate(item.slug);
                                                setMobileMenuOpen(false);
                                            }}
                                            className="w-full px-4 py-2 my-2 border border-gray-200 rounded-lg hover:bg-blue-100 flex items-center justify-center"
                                        >
                                            <i
                                                className={`fa-solid ${item.icon} mr-2`}
                                            ></i>
                                            {item.name}
                                        </button>
                                    </li>
                                ) : null
                            )}
                            {authStatus && (
                                <li className="w-full text-center">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 my-2 border border-gray-200 rounded-lg hover:bg-blue-100 flex items-center justify-center"
                                    >
                                        <i className="fa-solid fa-right-from-bracket mr-2"></i>
                                        Logout
                                    </button>
                                </li>
                            )}
                        </ul>
                    )}
                </nav>
            </Container>
        </header>
    );
}

export default Header;
