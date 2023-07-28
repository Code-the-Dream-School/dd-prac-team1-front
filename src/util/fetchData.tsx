import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

export const register = (
    name: string,
    setName: Dispatch<SetStateAction<string>>,
    email: string,
    setEmail: Dispatch<SetStateAction<string>>,
    password: string,
    setPassword: Dispatch<SetStateAction<string>>,
    confirmPassword: string,
    setConfirmPassword: {
        (value: SetStateAction<string>): void;
        (arg0: string): void;
    }
) => {
    axios
        .post(
            'http://localhost:3000/api/v1/auth/register',
            {
                username: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
            },
            {
            headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
    .then((data) => {
        console.log(data);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    })
    .catch((error) => {
        console.log(error);
    });
};

export const login = (
        email: string, 
        setEmail: Dispatch<SetStateAction<string>>, 
        password: string, 
        setPassword: Dispatch<SetStateAction<string>>
        ) => {
    axios
        .post('http://localhost:3000/api/v1/auth/login',
        {
            email: email,
            password: password,
        },
        {
            headers: {
                    'Content-Type': 'application/json',
                },
            })
        .then((data) => {
            console.log(data);
            setEmail('');
            setPassword('');
        })
        .catch((error) => {
            console.log(error);
        });
};


