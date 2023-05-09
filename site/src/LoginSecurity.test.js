import React from "react";
import {render, fireEvent} from '@testing-library/react';
import LogIn from './pages/LogIn';
import {act} from "react-dom/test-utils";

describe('user authentication security', () => {
    beforeEach(() => {
        jest.resetModules(); // This will reset all modules before each test case.
    });

    it('should attempt 3 sign ins and get locked out', async () => {
        jest.useFakeTimers();
        const email = 'test2@example.com';
        const password = 'Password2!';

        const { getByText, getByLabelText, getByTestId } = render(<LogIn />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'test2@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'Password2!' } });

        // Mocking the fetch function
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                status: 404,
            })
        );

        const url = `/user/check?email=${email}&password=${password}`;

        await act(async () => {
            fireEvent.click(submitButton);
        });

        // Assertions
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const errorMessage = getByText(/This email and password cannot be found./);
        expect(errorMessage).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(submitButton);
        });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        const stopMessage = getByText(/Too many failed login attempts. Please try again in 60 seconds./);
        expect(stopMessage).toBeInTheDocument();

        await act(async () => {
            jest.advanceTimersByTime(60000);
        });

        expect(stopMessage).not.toBeInTheDocument();
    });
});

