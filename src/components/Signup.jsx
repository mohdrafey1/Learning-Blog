import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError('');
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) dispatch(login(currentUser));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-gray-300">
                <div className="mb-4 flex justify-center">
                    <Logo width="120px" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
                    Sign Up to Create an Account
                </h2>
                <p className="text-gray-600 text-center mb-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Sign In
                    </Link>
                </p>
                {error && (
                    <p className="text-red-600 mb-4 text-center">{error}</p>
                )}
                <form onSubmit={handleSubmit(create)} className="space-y-6">
                    <div>
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            {...register('name', {
                                required: 'Full Name is required',
                            })}
                        />
                    </div>
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
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
