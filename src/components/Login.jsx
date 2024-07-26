import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    const login = async (data) => {
        setError('');
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 border border-gray-300">
                <div className="mb-4 text-center">
                    <Logo width="120px" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
                    Sign in to your account
                </h2>
                <p className="text-gray-600 text-center mb-6">
                    Don’t have an account?{' '}
                    <Link
                        to="/signup"
                        className="text-blue-500 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && (
                    <p className="text-red-600 mb-4 text-center">{error}</p>
                )}
                <form onSubmit={handleSubmit(login)} className="space-y-6">
                    <div>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                            value
                                        ) || 'Invalid email address',
                                },
                            })}
                        />
                    </div>
                    <div>
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register('password', {
                                required: 'Password is required',
                            })}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
