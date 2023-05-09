import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
    it('renders the login form by default', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('navigates to the sign up page when the "Sign Up" button is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        const signUpButton = screen.getByTestId('toSignUp');
        expect(signUpButton).toBeInTheDocument();

        act(() => {
            signUpButton.click();
        });

        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
        //expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
    });

    it('navigates to back to login page', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        const signUpButton = screen.getByTestId('toSignUp');
        expect(signUpButton).toBeInTheDocument();

        act(() => {
            signUpButton.click();
        });

        const loginButton = screen.getByTestId('toLogin');
        expect(loginButton).toBeInTheDocument();

        act(() => {
            loginButton.click();
        });

        expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('logs the user in', async () => {
        const { getByLabelText, getByTestId } = render(
            <MemoryRouter initialEntries={['/']}>
                <App/>
            </MemoryRouter>
        );

        const signUpButton = screen.getByTestId('toSignUp');

        act(() => {
            signUpButton.click();
        });

        const emailInput = getByLabelText(/email/i);
        const passwordInput = getByLabelText('Password');
        const passwordCheckInput = getByLabelText('Confirm Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, {target: {value: 'test@test.com'}});
        fireEvent.change(passwordInput, {target: {value: 'Password123!'}});
        fireEvent.change(passwordCheckInput, {target: {value: 'Password123!'}});

        // Mocking the fetch function
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                status: 201,
                json: () => Promise.resolve({userId: 123}),
            })
        );

        await act(async () => {
            fireEvent.click(submitButton);
        });
    });

});
