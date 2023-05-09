import React, { useState } from "react";
import "../styles/SignUp.css";

function SignUp(props) {

    const { switchToLogin, switchToSearch } = props;
    // States for registration
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [errorEmailEmp, setError] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const [errorPassVal, setErrorPassVal] = useState(false);
    const [errorPassValEmp, setErrorPassCheck] = useState(false);
    const [errorPassEmp, setErrorPassEmpt] = useState(false);
    const [emailUse, setEmailUse] = useState(false);

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change for password checker
    const handlePasswordCheck = (e) => {
        setPasswordCheck(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        setError(false);
        setErrorPassVal(false);
        setErrorPass(false);
        setErrorPassCheck(false);
        setErrorPassVal(false);
        setErrorPassEmpt(false);
        setErrorEmail(false);
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let testPass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{4,}$/;
        let passed = true;
        if (passwordCheck === '') {
            passed = false;
            setErrorPassCheck(true);
        }
        if (email === ''){
            passed = false;
            setError(true);
        }
        if (password === ''){
            passed = false;
            setErrorPassEmpt(true)
        }
        if(passed){
            if(!re.test(email)) {
                setErrorEmail(true);
            }
            else if(password !== passwordCheck){
                setErrorPass(true);
            } else if (!testPass.test(password)){
                setErrorPassVal(true);
            }
            else{
                const url = '/user/save';
                const data = {email: email, password: password};
                let err = false;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).catch((error) => {
                    console.log(error);
                    err = true;
                });
                if (!err && (response.status !== 201)) {
                    setSubmitted(false);
                    setEmailUse(true);
                }
                else if(!err){
                    const userId = await response.json();
                    setSubmitted(true);
                    setEmailUse(false);
                    switchToSearch(userId);
                }
            }
        }
    };

    const emailUseMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: emailUse ? '' : 'none',
                }}>
                This email is already in use.
            </div>
        );
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                User {name} successfully registered!!
            </div>
        );
    };

// Showing error message if error is true
    const errorMessageEmptyEmail = () => {
        return (
            <div
                className="error"
                style={{
                    display: errorEmailEmp ? '' : 'none',
                }}>
                Field cannot be empty
            </div>
        );
    };

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

    const errorMessagePass= () => {
        return (
            <div
                className="error"
                style={{
                    display: errorPass ? '' : 'none',
                }}>
                Please ensure passwords match
            </div>
        );
    };

    const errorMessagePassEmp= () => {
        return (
            <div
                className="error"
                style={{
                    display: errorPassEmp ? '' : 'none',
                }}>
                Field cannot be empty
            </div>
        );
    };

    const errorMessagePassVal= () => {
        return (
            <div
                className="error"
                style={{
                    display: errorPassVal ? '' : 'none',
                }}>
                Please ensure you enter a valid password
            </div>
        );
    };

    const errorMessagePassValEmp= () => {
        return (
            <div
                className="error"
                style={{
                    display: errorPassValEmp ? '' : 'none',
                }}>
                Field cannot be empty
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
                <div className="login-form-signup" data-testid="sign-up-form">
                    <div className="title-signup">User Registration Page</div>
                    <div className="messages-signup">
                        {successMessage()}
                        {emailUseMessage()}
                    </div>
                    <div className="form">
                        <form className="formStyle-signup">
                            {/* Labels and inputs for form data */}
                            <div className="input-container-signup">
                                <label className="label-signup" htmlFor="email">Email</label>
                                <input onChange={handleEmail} className="input-signup"
                                       value={email} type="email" id="email"/>
                                {errorMessageEmptyEmail()}
                                {errorMessageInvalidEmail()}
                            </div>

                            <div className="input-container-signup">
                                <label className="label-signup" htmlFor="password">Password</label>
                                <input onChange={handlePassword} className="input-signup"
                                       value={password} type="password" id="password" data-testid="password"/>
                                {errorMessagePassVal()}
                                {errorMessagePassEmp()}
                            </div>

                            <div className="input-container-signup">
                                <label className="label-signup" htmlFor="passwordCheck">Confirm Password</label>
                                <input onChange={handlePasswordCheck} className="input-signup"
                                       value={passwordCheck} type="password" id="passwordCheck" data-testid="passwordCheck"/>
                                {errorMessagePass()}
                                {errorMessagePassValEmp()}
                            </div>

                            <button onClick={handleSubmit} className="btn-signup" type="submit" data-testid="submit-button">
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className="centerAlign redirect" data-testid="toLogin" onClick={switchToLogin}>Have an account? Login Here</div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
