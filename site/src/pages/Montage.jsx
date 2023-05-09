import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import Navbar from '../components/Navbar';

function Montage(props) {
    const navigate = useNavigate();

    const inactivityTimeout = 60 * 1000; // in milliseconds

    let timeoutId;

    function resetTimeout() {
        // clear the previous timeout (if any)
        clearTimeout(timeoutId);

        // start a new timeout
        timeoutId = setTimeout(() => {
            // redirect the user to the login page
            window.location.href = "/login";
        }, inactivityTimeout);
    }

// listen for user activity events (e.g. mousemove, keypress, etc.)
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keypress", resetTimeout);

// start the initial timeout
    resetTimeout();

    useEffect(() => {
        if (!props.hasComeFromValid) {
            navigate('/login');
        }
        else{
            props.setHasComeFromValid(false);
        }
    }, [navigate]);

    const [images, setImages] = useState([]);


    const randomDegree = () => {
        return -1 * Math.floor(Math.random() * 90) + 45;
    }


    async function LoadImages() {
        const url = "https://localhost:8080/daniel/" + props.userId + "/" + props.listId + "/movies";
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const ResponseArray = await response.json();
        let images = [];
        if(ResponseArray.length > 0){
            for (let i = 0; i < ResponseArray.length; i++) {
                images.push(ResponseArray[i].picture);
            }
            while (images.length < 10) {
                images.push(ResponseArray[0].picture);
            }
            setImages(images);
        }
    }


    useEffect(() => {
        async function fetchLists() {
            await LoadImages();
        }
        fetchLists();
    }, [])


    return(
        <div>
            <Navbar userId={props.userId} setHasComeFromValid={props.setHasComeFromValid}/>
            <h1>List Montage Page</h1>
            <div className="row mx-auto g-3 ">
                {images.map((image, index) => {
                    return(
                        <div className="col-6 col-lg-4" key = {index}>
                            <img key = {index} className="image" src={image} style = {{transform: `rotate(${randomDegree()}deg)`, width: '80%', height: '80%', margin : '10%'}} alt="Movie image"/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


export default Montage;

