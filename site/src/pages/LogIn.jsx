import React, { useState } from "react";
import "../styles/SignUp.css"

function LogIn(props) {
    //timeout functionality
    const MAX_ATTEMPTS = 3;
    const LOCKOUT_TIME = 60; // in seconds
    const LOCKOUT_RESET_TIME = 30; // in seconds
    const LAST_ATTEMPT_KEY = 'last_attempt';
    const ATTEMPTS_KEY = 'login_attempts';
    //const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const { switchToSignUp, switchToSearch } = props;
    // states for email & password field
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // states for submit & input errors
    const [errorEmailEmpty, setErrorEmailEmpty] = useState(false);
    const [errorPassEmpty, setErrorPassEmpty] = useState(false);

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [emailUse, setEmailUse] = useState(false);

    // handle email input change
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    // handle password input change
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    function setDisabled(){
        document.getElementById("password").disabled = true;
        document.getElementById("email").disabled = true;
        document.getElementById("submit-button").disabled = true;
        setTimeout(function(){document.getElementById("password").disabled = false;},60000);
        setTimeout(function(){document.getElementById("email").disabled = false;},60000);
        setTimeout(function(){document.getElementById("submit-button").disabled = false;},60000);
        localStorage.removeItem(ATTEMPTS_KEY);
    }

    function error60(){
        setError(`Too many failed login attempts. Please try again in 60 seconds.`)
        setTimeout(() => {
            setError('');
        }, 60000); // wait for 60 seconds (60000 milliseconds)
    }

    // handle user submission
    const handleSubmit = async(e) => {
        try{
            e.preventDefault();
            setErrorEmailEmpty(false);
            setErrorPassEmpty(false);

            setErrorPassword(false);
            setErrorEmail(false);

            let testEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let testPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{4,}$/;
            let passed = true;

            const lastAttempt = parseInt(localStorage.getItem(LAST_ATTEMPT_KEY)) || 0;
            let attempts = parseInt(localStorage.getItem(ATTEMPTS_KEY)) || 0;
            const now = Date.now() / 1000;
            const stringNow = now.toString();

            // If last attempt was more than LOCKOUT_TIME ago, reset attempts counter
            if (now - lastAttempt > LOCKOUT_TIME) {
                console.log("first if");
                localStorage.removeItem(ATTEMPTS_KEY);
            }

            if (now - lastAttempt > LOCKOUT_RESET_TIME) {
                console.log(now);
                console.log(lastAttempt);
                console.log("string: ", stringNow);
                console.log(now - lastAttempt);
                console.log(LOCKOUT_RESET_TIME);
                localStorage.removeItem(ATTEMPTS_KEY);
                attempts = 0;
            }

            // email field is empty
            if (email === ''){
                passed = false;
                setErrorEmailEmpty(true);
            }
            // password field is empty
            if (password === ''){
                passed = false;
                setErrorPassEmpty(true)
            }

            if (passed){
                if(!testEmail.test(email)) {
                    setErrorEmail(true);
                }
                else if (!testPassword.test(password)){
                    setErrorPassword(true);
                }
                else{
                    const url = `/user/check?email=${email}&password=${password}`;
                    //console.log(url);
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                    if (response.status !== 201) {
                        setEmailUse(true);
                        //setDisabled(true);

                        const newAttempts = attempts + 1;
                        localStorage.setItem(ATTEMPTS_KEY, newAttempts);
                        localStorage.setItem(LAST_ATTEMPT_KEY, stringNow);

                        // Lock out account if attempts exceed MAX_ATTEMPTS
                        if (newAttempts >= MAX_ATTEMPTS) {
                            //localStorage.setItem(LAST_ATTEMPT_KEY, stringNow);
                            console.log("here");
                            error60();
                            setDisabled(true);
                            return;
                        }
                    }
                    else{
                        setEmailUse(false);
                        localStorage.removeItem(ATTEMPTS_KEY);
                        localStorage.removeItem(LAST_ATTEMPT_KEY);
                        const userId = await response.json();
                        switchToSearch(userId);
                    }
                }
            }
        } catch (error) {
            //console.error(error);
            // handle the error here
        }
    };

    const emailNotFoundMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: emailUse ? '' : 'none',
                }}>
                This email and password cannot be found.
            </div>
        );
    };

    // not found message when log in fail
        const notFoundMessage = () => {
            return (
                <div
                    className="error"
                    style={{
                        display: errorPassword ? '' : 'none',
                    }}>
                    Please enter a valid password!
                </div>
            );
        };


    // email error message if email filed is empty
    const errorMessageEmailEmpty = () => {
        return (
            <div
                className="error"
                style={{
                    display: errorEmailEmpty ? '' : 'none',
                }}>
                Email cannot be empty
            </div>
        );
    };

    // invalid error message when email is invalid format
    const errorMessageInvalidEmail= () => {
        return (
            <div
                className="error"
                style={{
                    display: errorEmail ? '' : 'none',
                }}>
                Please enter a valid email
            </div>
        );
    };

    // password error message if password filed is empty
    const errorMessagePassEmpty = () => {
        return (
            <div
                className="error"
                style={{
                    display: errorPassEmpty ? '' : 'none',
                }}>
                Password cannot be empty
            </div>
        );
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{backgroundColor: "lightblue"}}>
                <a className="navbar-brand shift-left" href="#">
                    Movie Time
                </a>
                <div>
                    Team #5
                </div>
            </nav>
            <div className="app-signup">

                <div className="login-form-signup">
                    <div className="title-signup">User Log In Page</div>
                    <div className="messages-signup">
                        {emailNotFoundMessage()}
                    </div>
                    <div className="form">
                        <form className="formStyle-signup">
                            {/* Labels and inputs for form data */}
                            <div className="input-container-signup">
                                <label className="label-signup" htmlFor="email">Email</label>
                                <input onChange={handleEmail} className="input-signup"
                                       value={email} type="email" id="email"/>
                                {errorMessageEmailEmpty()}
                                {errorMessageInvalidEmail()}
                            </div>

                            <div className="input-container-signup">
                                <label className="label-signup" htmlFor="password">Password</label>
                                <input onChange={handlePassword} className="input-signup"
                                       value={password} type="password" id="password"/>
                                {errorMessagePassEmpty()}
                                {notFoundMessage()}
                            </div>
                            {error && <div className="error">{error}</div>}
                            <button onClick={handleSubmit} className="btn-signup" type="submit" data-testid="submit-button" id="submit-button">
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className="App">
                        <div className="centerAlign redirect" data-testid="toSignUp" onClick={switchToSignUp}>Not Registered Yet? <br /> Sign Up Here</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;