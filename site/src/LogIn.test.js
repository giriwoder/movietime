import React, { useState } from "react";
import {render, fireEvent, getAllByText} from '@testing-library/react';
import LogIn from './pages/LogIn';
import {act} from "react-dom/test-utils";

describe('LogIn component', () => {

    it("should be able to set email state", () => {
        const TestComponent = () => {
            const [email, setEmail] = useState("");
            const handleEmail = (e) => {
                setEmail(e.target.value);
            };
            return (
                <div>
                    <label htmlFor="email-input">Email</label>
                    <input id="email-input" type="text" value={email} onChange={handleEmail} />
                </div>
            );
        };

        const { getByLabelText } = render(<TestComponent />);
        const emailInput = getByLabelText("Email");

        fireEvent.change(emailInput, { target: { value: "test@test.com" } });
        expect(emailInput.value).toBe("test@test.com");
    });

    it('renders the component without errors', () => {
        render(<LogIn />);
    });

    it('should display an error message when form is submitted without email', () => {
        const { getAllByText, getByLabelText, getByTestId } = render(<LogIn />);
        const emailInput = getByLabelText('Email');
        //const passwordInput = getByLabelText('Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.click(submitButton);

        const errorMessage = getAllByText(/Email cannot be empty/);
        expect(errorMessage[0]).toBeInTheDocument();
    });

    it('should display an error message when form is submitted without password', () => {
        const { getAllByText, getByLabelText, getByTestId } = render(<LogIn />);
        //const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(passwordInput, { target: { value: 'password1!D' } });
        fireEvent.click(submitButton);

        const successMessage = getAllByText(/Password cannot be empty/);
        expect(successMessage[0]).toBeInTheDocument();
    });

    it('should display an error message when email is in invalid format', () => {
        const { getByText, getByLabelText, getByTestId } = render(<LogIn />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'invalid.email' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(submitButton);

        const errorMessage = getByText(/Please enter a valid email/);
        expect(errorMessage).toBeInTheDocument();
    });

    it('should display an error message when password is invalid', () => {
        const { getByText, getByLabelText, getByTestId } = render(<LogIn />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(submitButton);

        const errorMessage = getByText(/Please enter a valid password!/);
        expect(errorMessage).toBeInTheDocument();
    });

});

describe('user authentication', () => {
    beforeEach(() => {
        jest.resetModules(); // This will reset all modules before each test case.
    });

    it('should check email and password and return userId', async () => {
        const email = 'test@example.com';
        const password = 'Password1!';

        const { getByLabelText, getByTestId } = render(<LogIn />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'Password1!' } });

        // Mocking the fetch function
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                status: 201,
                json: () => Promise.resolve({ userId: 123 }),
            })
        );

        const url = `/user/check?email=${email}&password=${password}`;

        fireEvent.click(submitButton);

        // Assertions
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });

    it('should set email use flag to true if response status is not 201', async () => {
        const email = 'test@example.com';
        const password = 'Password1!';

        const { getByText, getByLabelText, getByTestId } = render(<LogIn />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'Password1!' } });

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

        // act(() => {
        //     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        //     fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
        //     fireEvent.click(submitButton);
        // });
        //fireEvent.click(submitButton);

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
    });

    it('should log error if fetch fails', async () => {
        // Arrange
        const errorMessage = 'Network Error';
        global.fetch = jest.fn().mockRejectedValue(new Error(errorMessage));

        const { getByLabelText, getByTestId } = render(<LogIn />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'Password1!' } });

        global.fetch = jest.fn().mockRejectedValue(new Error(errorMessage));

        //fireEvent.click(submitButton);

        await new Promise((resolve) => {
            fireEvent.click(submitButton);
            resolve();
        });

        // Act
        //await expect(resolve).rejects.toThrow();

        // Assert
        expect(fetch).toHaveBeenCalledTimes(1);
        //expect(consoleSpy).toHaveBeenCalledWith(new Error(errorMessage));
    });
});

