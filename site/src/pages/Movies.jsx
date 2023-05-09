import React, {useState, useEffect} from 'react'
import "../styles/movies.css"
import {FaArrowRight, FaMinus, FaPlus, FaStickyNote} from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Navbar from '../components/Navbar';
import {useNavigate} from "react-router-dom";
function Movies(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.hasComeFromValid) {
            navigate('/login');
        }
        else{
            props.setHasComeFromValid(false);
        }
    }, [navigate]);
    // set the inactivity timeout to 60 seconds
    const inactivityTimeout = 60 * 1000; // in milliseconds

    let timeoutId;

    function resetTimeout() {
        // clear the previous timeout (if any)
        clearTimeout(timeoutId);
        //console.log("wow");

        // start a new timeout
        timeoutId = setTimeout(() => {
            // redirect the user to the login page
            navigate("/login");
            //window.location.href = "/login";
        }, inactivityTimeout);
    }

    resetTimeout();

// listen for user activity events (e.g. mousemove, keypress, etc.)
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keypress", resetTimeout);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [input, setInput] = React.useState('');
    const [showCreate, setCreate] = useState(false);
    const handleCreateClose = () => setCreate(false);
    const handleCreateOpen = () => setCreate(true);
    const [copyInput, setCopyInput] = useState('');
    const [showCopy, setCopy] = useState(false);
    const handleCopyOpen = () => setCopy(true);
    const handleCopyClose = () => setCopy(false);

    const [showRemove, setRemove] = useState(false);
    const handleRemoveOpen = () => setRemove(true);
    const handleRemoveClose = () => setRemove(false);
    const [movies, setMovies] = useState([]);
    const [lists, setLists] = useState([]);
    const[movieId, setMovieId] = useState(-1);
    const[listId, setListId] = useState(props.listId);
    //const[otherMovieId, setOtherMovieId] = useState(0);

    const [showCreateOrMove, setCreateOrMove] = useState(false);
    const [showMove, setMove] = useState(false);
    const [isPublic, setPublic] = useState(false);

    const userId = props.userId;
    const currentListId = props.listId;

    console.log("user id: ", userId);
    console.log("list id: ", listId);

    const loadDataOneTime = async() => {
        //console.log("load data");
        const url = "https://localhost:8080/daniel/" + userId +"/" + currentListId + "/movies";
        let noError = true;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((error) => {
            console.log(error);
            noError = false;
        });
        console.log(response);
        if(noError){
            if (response.status === 200) {
                const responseArray = response.json();
                //console.log(responseArray);
                await responseArray
                    .then((value) => {
                            setMovies(value);
                            console.log("value: ", value);//This is a fulfilled promise  👈
                            console.log("movies: ", movies);

                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    }
    const loadLists = async() => {
        console.log("load list");
        const url = "https://localhost:8080/daniel/" + userId +"/list";
        let noError = true;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((error) => {
            console.log(error);
            noError = false;
        });
        console.log("resppnse 2:", response);
        if(noError){
            if (response.status === 200) {
                const responseArray = response.json();
                console.log(responseArray);
                await responseArray
                    .then((value) => {
                            setLists(value);
                            console.log("value 2: ", value);//This is a fulfilled promise  👈
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
        return;
    }
    useEffect(() => {
        console.log("use effect");
        loadDataOneTime();
        loadLists();
    }, [])


    async function addMovie(movieId, listId) {
        console.log("add movie");
        const url = "https://localhost:8080/daniel/" + listId + '/' + movieId + '/existingMovie';
        console.log(url);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: ""
        }).catch((error) => {
            console.log(error);
        });
        console.log(response);
        return;
    }

    const createListAndAddMovie = async() => {
        console.log("create list and add movie");
        const url = 'https://localhost:8080/daniel/' + userId + '/list';
        const data = {listName: input, isPublic: isPublic};
        let noError = true;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).catch((error) => {
            console.log(error);
            noError = false;
        });
        if(noError){
            if (response.status === 200) {
                const responseArray = response.json();
                console.log(responseArray);
                await responseArray
                    .then(async (value) => {
                        console.log(movieId);
                        console.log(value);//This is a fulfilled promise  👈
                        await addMovie(movieId, value.listId);
                        console.log("added movie");
                        setListId(value.listId);
                    })
                    .then(() => {
                        loadLists();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    }

    const copyMovieToList = async() => {
        console.log("copy movie to list");
        console.log(copyInput);
        console.log(movieId);
        const url = 'https://localhost:8080/daniel/' + copyInput + '/' + movieId + '/existingMovie';
        let noError = true;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: ""
        }).catch((error) => {
            console.log(error);
            noError = false;
        });
        if(noError){
            if (response.status == 200) {
                console.log("done");
            }
            setListId(0);
        }
    }
    const moveMovie = async() => {
        console.log("move movie");
        console.log(listId);
        console.log(movieId);
        const url = 'https://localhost:8080/daniel/' + userId + '/' + currentListId + '/' + movieId + '/movie';
        let noError = true;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: ""
        }).catch((error) => {
            console.log(error);
            noError = false;
        });
        if(noError){
            if (response.status == 200) {
                await addMovie(movieId, listId);
                await loadDataOneTime();
            }
        }
    }
    const deleteMovie = async() => {
        console.log("delete movie");
        console.log(listId);
        console.log(movieId);
        const url = 'https://localhost:8080/daniel/' + userId + '/' + currentListId + '/' + movieId + '/movie';
        let noError = true;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: ""
        }).catch((error) => {
            console.log(error);
            noError = false;
        });
        if(noError){
            if (response.status == 200) {
                await loadDataOneTime();
            }
        }
    }
    return(
        <div>
            <Navbar userId={props.userId} setHasComeFromValid={props.setHasComeFromValid}/>
            <h1 className = "Movie-Title">Movies</h1>
            <button className = "please-hide" data-testid="launchButton" onClick = {handleShow}>
                Do Not Click On This Button
            </button>
            <Modal id = "create" show={showCreate}  onHide={handleCreateClose} animation={true}>
                <Modal.Header data-testid="showCreateClose" closeButton>
                    <Modal.Title>Create A New List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div onChange = {event => setPublic(event.target.value)}>
                        <input type="radio" value="false" name="gender"/> Private
                        <input type="radio" value="true" name="gender" data-testid="lineSomething"/> Public
                    </div>
                    <form>
                        <label>
                            Name:
                            <input type="text" data-testid="createInputSec" name="name" onChange={event => setInput(event.target.value)}/>
                        </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCreateClose}>
                        Close
                    </Button>
                    <Button data-testid = "save-changes-test1" variant="primary" onClick={() => { createListAndAddMovie(); handleCreateClose();}}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal  id = "create-copy" show={show}  onHide={handleClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Create or Copy</Modal.Title>
                </Modal.Header>
                {/*<Modal.Body>*/}
                {/*</Modal.Body>*/}
                <Modal.Footer>
                    <Button variant="secondary" data-testid="Createco" onClick={() => {handleClose(); handleCreateOpen();}}>
                        Create
                    </Button>
                    <Button data-testid="copyYaY" variant="primary" onClick={() => {handleClose();handleCopyOpen()}}>
                        Copy
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal id = "copy-popup" data-testid="copyMovie" show={showCopy}  onHide={handleCopyClose} animation={true}>
                <Modal.Header data-testid="copyMovieCloseButton" closeButton>
                    <Modal.Title>Copy a Movie Into a List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <select name="selectList" data-testid="testSelectList" id="selectList" onChange = {(event) => {setCopyInput(event.target.value); setListId(event.target.value);} }>
                            <option value="">Choose an option</option>
                            {lists.map((list) => {
                                if (list.listId == currentListId) {
                                    return;
                                }
                                else {
                                    return (
                                        <option key={list.listId} value={list.listId}>{list.listName}</option>
                                    );
                                }
                            })}
                        </select>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button data-testid="byeClose" variant="secondary" onClick={() => {setCopy(false)}}>
                        Close
                    </Button>
                    <Button data-testid = "save-changes-copy" variant="primary" onClick={() => { copyMovieToList(); setCopy(false);}}>
                        Copy
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal data-testid="create-move-check" id = "create-move" show={showCreateOrMove}  onHide={() => {setCreateOrMove(false)}} animation={true}>
                <Modal.Header data-testid="closeOne" closeButton>
                    <Modal.Title>Create or Move</Modal.Title>
                </Modal.Header>
                {/*<Modal.Body>*/}
                {/*</Modal.Body>*/}
                <Modal.Footer>
                    <Button variant="secondary" data-testid="move-to-create" onClick={() => {setCreateOrMove(false); handleCreateOpen();}}>
                        Create
                    </Button>
                    <Button data-testid = "save-changes-move-wow" variant="primary" onClick={() => {setCreateOrMove(false);setMove(true)}}>
                        Move
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal data-testid="confirmShowMove" id = "move-popup" show={showMove}  onHide={() => {setMove(false)}} animation={true}>
                <Modal.Header data-testid="closeTwo" closeButton>
                    <Modal.Title>Move a Movie Into a List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <select data-testid="testSelectList2" name="selectList" id="selectList" onChange = {(event) => {setCopyInput(event.target.value); setListId(event.target.value);} }>
                            <option value="">Choose an option</option>
                            {lists.map((list) => {
                                if (list.listId == currentListId) {
                                    return;
                                }
                                else {
                                    return (
                                        <option key={list.listId} value={list.listId}>{list.listName}</option>
                                    );
                                }
                            })}
                        </select>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button data-testid="closeMove" variant="secondary" onClick={() => {setMove(false)}}>
                        Close
                    </Button>
                    <Button data-testid = "save-changes-copy-move" variant="primary" onClick={() => { moveMovie(); setMove(false);}}>
                        Copy
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal id = "remove-popup" show={showRemove}  onHide={handleRemoveClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button data-testid="yesPleaseDelete" variant="secondary" onClick={() => {deleteMovie();handleRemoveClose();}}>
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={handleRemoveClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="row mx-auto g-3">
                {movies.map((movie, index) => (
                    <div key = {index} id = {movie.movieDbId} className="col-12 col-lg-4 text-center user-movie-list">
                        <div className = "movie-overlay-movies">
                            <img className="img-style" src = {movie.picture}/>
                            <div className = "move">
                                <FaArrowRight data-testid="moveClickArrow" onClick = {() => {setMovieId(movie.movieDbId); setCreateOrMove(true);}}/>
                                <p>Move</p>
                            </div>
                            <div className = "minus">
                                <FaMinus data-testid="moveMinusArrow" onClick = {() => {setMovieId(movie.movieDbId);handleRemoveOpen();}}/>
                                <p>Minus</p>
                            </div>
                            <div className = "add">
                                <FaPlus data-testid="moveAddArrow" onClick = {() => {setMovieId(movie.movieDbId); handleCreateOpen();}}/>
                                <p>Add</p>
                            </div>
                            <div className = "copy">
                                <FaStickyNote data-testid="moveCopyArrow" onClick = {() => {setMovieId(movie.movieDbId);handleShow();}}/>
                                <p>Copy</p>
                            </div>
                        </div>
                        <button className = "view-button" onClick = {() => {props.setHasComeFromValid(true); props.onViewDetails(movie.movieDbId); navigate(`/details`);}}>View Movie Detail</button>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default Movies;