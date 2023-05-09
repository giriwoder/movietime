import React, {useState, useEffect} from 'react';
import "../styles/user.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Navbar from '../components/Navbar';
import {useNavigate} from "react-router-dom";
function UserList(props) {
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
    const [lists, setLists] = useState([]);

    const [input2, setInput2] = React.useState('');
    const [show2, setShow2] = useState(false);
    const [listIdHook, setListId] = useState('');
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [isPublic, setPublic] = useState(false);
    const [showRemove, setRemove] = useState(false);
    const handleRemoveClose = () => setRemove(false);
    const handleRemoveOpen = () => setRemove(true);

    const [showCompareUser, setCompareUser] = useState(false);
    const [showCompareList, setCompareList] = useState(false);
    const [otherUsers, setOtherUsers] = useState([]);
    const [otherUserId, setOtherUserId] = useState(0);
    //const [otherUserLists, setOtherUserLists] = useState([]);
    const [otherUserListId, setOtherUserListId] = useState(0);
    const [showRecsList, setRecsList] = useState(false);
    const [numberMovies, setNumberMovies] = useState(0);
    const [listArray, setListArray] = useState([]);
    // const genre_ids= {action:28, adventure:12, animation: 16, comedy:35, crime:80, documentary: 99, drama:18,
    //     family: 10751, fantasy: 14, history:36, horror:27, music: 10402, mystery:9648, romance: 10749, science_fiction: 878, tv_movie:10770,
    //     thriller: 53, war: 10752, western: 37};


    async function loadDataOneTime() {
        const url = 'https://localhost:8080/daniel/' + props.userId + '/list';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        const responseArray = response.json();
        console.log(responseArray);
        await responseArray
            .then((value) => {
                console.log(value);//This is a fulfilled promise  👈
                setLists(value);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function loadUsers() {
        const url = 'https://localhost:8080/daniel/user';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseArray = response.json();
        if (response.status == 200) {
            await responseArray
                .then((value) => {
                    console.log(value);//This is a fulfilled promise  👈
                    setOtherUsers(value);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    useEffect(() => {
        async function fetchLists() {
            await loadDataOneTime();
        }
        async function fetchUsers() {
            await loadUsers();
        }
        fetchLists();
        fetchUsers();
    }, [])

    async function CompareList() {
        const url = 'https://localhost:8080/daniel/compare/' + props.userId + '/' + listIdHook + '/' + otherUserListId;
        const data = {listName: input2, isPublic: isPublic};
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)});
        if (response.status == 200) {
            let responseArray = response.json();
            await responseArray
                .then((value) => {
                    console.log(value);//This is a fulfilled promise  👈
                });
            // .catch((err) => {
            //     console.log(err);
            // });
            setOtherUserId(0);
            setOtherUserListId(0);
        }
    }
    const addList = async()  => {
        const url = 'https://localhost:8080/daniel/' + props.userId + '/list';
        const data = {listName: input, isPublic: isPublic};
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log(response);
        if (response.status == 200) {
            const url = 'https://localhost:8080/daniel/' + props.userId + '/list';
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            //     .catch((error) => {
            //     console.log(error);
            // });
            const responseArray = response.json();
            await responseArray
                .then((value) => {
                    console.log(value);//This is a fulfilled promise  👈
                    setLists(value);
                });
            // .catch((err) => {
            //     console.log(err);
            // });
        }
        setShow(false);
        await loadDataOneTime();
        console.log(lists);
    }


    async function deleteList(listId) {
        let url = 'https://localhost:8080/daniel/' + props.userId + '/' + listId + '/list';
        console.log(url);
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //     .catch((error) => {
        //     console.log(error);
        // });
        if (response.status == 200) {
            const url = 'https://localhost:8080/daniel/' + props.userId + '/list';
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            //     .catch((error) => {
            //     console.log(error);
            // });
            const responseArray = response.json();
            console.log(responseArray);
            await responseArray
                .then((value) => {
                    console.log(value);//This is a fulfilled promise  👈
                    setLists(value);
                });
            // .catch((err) => {
            //     console.log(err);
            // });
        }
    }


    const renameList = async() => {
        // document.getElementById('movie-list-row').innerHTML = '';
        const url = 'https://localhost:8080/daniel/' + props.userId + '/' + listIdHook + '/name';
        const data = input2;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        //     .catch((error) => {
        //     console.log(error);
        // });
        if (response.status == 200) {
            await loadDataOneTime();
        }
        setListId('');
    }
    // const newFunction = (listId) => async() => {
    //     await renameList();
    // }
    async function otherRecommendList() {
        var allMovies = [];
        for (let i = 0; i < listArray.length; i++) {
            const url = "https://localhost:8080/daniel/"  + props.userId + "/" + listArray[i] + "/movies";
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseArray = await response.json();
            console.log(responseArray);
            for (let j = 0; j < responseArray.length; j++) {
                let movieId = responseArray[j].movieDbId;
                const url_2 = "https://api.themoviedb.org/3/movie/" + movieId + "/recommendations?api_key=00f824df761bd517e281a3753a0a70f1&language=en-US&page=1";
                const response_2 = await fetch(url_2, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const movieDBArray = await response_2.json();
                const results = movieDBArray.results;
                console.log(results);
                for (let movieIndex = 0; movieIndex < results.length; movieIndex++) {
                    console.log("MOVIE INDEX: " + movieIndex);
                    console.log(results[movieIndex]);
                    let genres = results[movieIndex].genre_ids.join(",");
                    console.log(genres);
                    let movieDbId = results[movieIndex].id;
                    let picture = "https://image.tmdb.org/t/p/w500" + results[movieIndex].poster_path;
                    let title = results[movieIndex].title;
                    console.log(title);
                    let plot = results[movieIndex].overview;
                    console.log(plot);
                    let other_request = "https://api.themoviedb.org/3/movie/" + movieDbId + "?api_key=00f824df761bd517e281a3753a0a70f1&language=en-US&append_to_response=credits,production_companies";
                    const response_3 = await fetch(other_request, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const production_array = await response_3.json();
                    const directorList = production_array.credits.crew
                        .filter((crewMember) => crewMember.job === "Director")
                        .map((director) => director.name);
                    console.log(directorList);
                    const castList = production_array.credits.cast.map((castMember) => castMember.name);
                    console.log(castList);
                    const studioList = production_array.production_companies.map((company) => company.name);
                    console.log(studioList);
                    allMovies.push(
                        {
                            movieDbId: movieDbId,
                            picture: picture,
                            title: title,
                            plot: plot,
                            genre: genres,
                            studio: studioList.join(','),
                            actors: castList.join(','),
                            director: directorList.join(',')
                        }
                    );
                    console.log(allMovies);
                }
            }
        }
        console.log(allMovies);
        const shuffled = allMovies.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, numberMovies);
        let url = "https://localhost:8080/daniel/" + props.userId + "/list";
        const data = {listName: input, isPublic: isPublic};
        const final_response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const responsePromise = await final_response.json();
        for (let temp = 0; temp < selected.length; temp++) {
            const url_2 = "https://localhost:8080/daniel/" + props.userId + "/" + responsePromise.listId + "/movie";
            console.log(url_2);
            await fetch(url_2, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selected[temp])
            });
        }
        setListArray([]);
        setNumberMovies(0);
        await loadDataOneTime();
    }
    // async function RecommendList() {
    //     const genre_map = {"28" :0, "12" : 0, "16" : 0, "35" :0, "80" :0, "99" : 0, "18" :0,
    //         "10751": 0, "14": 0, "36":0, "27" :0, "10402": 0, "9648":0, "10749" : 0, "878": 0, "10770": 0,
    //         "53": 0, "10752": 0, "37": 0};
    //
    //     for (let i = 0; i < listArray.length; i++) {
    //         const url = "http://localhost:8080/daniel/1/" + listArray[i] + "/movies";
    //         const response = await fetch(url, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         const responseArray = await response.json();
    //         console.log(responseArray);
    //         for (let j = 0; j < responseArray.length; j++) {
    //             let genre = responseArray[i].genre;
    //             let genre_array = genre.split(",");
    //             console.log(genre_array);
    //             for (let z = 0; z < genre_array.length; z++) {
    //                 genre_map[genre_array[z]] += 1;
    //             }
    //         }
    //     }
    //     let min = 0;
    //     let final_genre = "28";
    //     for (const [key, value] of Object.entries(genre_map)) {
    //         if (genre_map[key] > min) {
    //             min = genre_map[key];
    //             final_genre = key;
    //         }
    //     }
    //     console.log("Final genre id:" + final_genre);
    //     let pageNumber = Math.floor(Math.random() * 200);
    //     console.log("Page Number: " + pageNumber);
    //     const response_2 = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=00f824df761bd517e281a3753a0a70f1&with_genres=$" + final_genre + "&page=$" + pageNumber, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     const movieDBArray = await response_2.json();
    //     const results = movieDBArray.results;
    //     const allMovies = [];
    //     for (let movieIndex = 0; movieIndex < numberMovies; movieIndex++) {
    //         let genres = results[movieIndex].genre_ids.join(",");
    //         let movieDbId = results[movieIndex].id;
    //         let picture = "https://image.tmdb.org/t/p/w500" + results[movieIndex].poster_path;
    //         let title = results[movieIndex].title;
    //         let plot = results[movieIndex].overview;
    //         let other_request = "https://api.themoviedb.org/3/movie/" + movieDbId +"?api_key=00f824df761bd517e281a3753a0a70f1&language=en-US&append_to_response=credits,production_companies";
    //         const response_3 = await fetch(other_request, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         const production_array = await response_3.json();
    //         console.log(production_array);
    //         const directorList = production_array.credits.crew
    //             .filter((crewMember) => crewMember.job === "Director")
    //             .map((director) => director.name);
    //         const castList = production_array.credits.cast.map((castMember) => castMember.name);
    //         const studioList = production_array.production_companies.map((company) => company.name);
    //         allMovies.push(
    //             {
    //                 movieDbId: movieDbId,
    //                 picture: picture,
    //                 title: title,
    //                 plot: plot,
    //                 genre: genres,
    //                 studio: studioList.join(','),
    //                 actors: castList.join(','),
    //                 director: directorList.join(',')
    //             }
    //         );
    //     }
    //     console.log(allMovies);
    //     let url = 'http://localhost:8080/daniel/1/list';
    //     const data = {listName: input, isPublic: isPublic};
    //     const final_response = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     });
    //     const responsePromise = await final_response.json();
    //     for (let temp = 0; temp < allMovies.length; temp++) {
    //         const url_2 = 'http://localhost:8080/daniel/1/' + responsePromise.listId + "/movie";
    //         console.log(url_2);
    //         const actualFinal = await fetch(url_2, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(allMovies[temp])
    //         });
    //     }
    //     setListArray([]);
    //     setNumberMovies(0);
    //     await loadDataOneTime();
    // }


    return(
        <div>
            <Navbar userId={props.userId} setHasComeFromValid={props.setHasComeFromValid}/>
            <h1 className = "Title">Your Movie List</h1>
            <Button className = "movie-button" variant="primary" data-testid = "add-button" onClick={handleShow}>
                Create New List
            </Button>
            <Button className = "recs-button" variant="primary" data-testid = "rec-button" onClick={async () => {
                await setRecsList(true);
            }}>
                Create Recommendations
            </Button>
            <Modal show={show} data-testid = "create-button" onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new list</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div onChange = {event => setPublic(event.target.value)}>
                        <input data-testid = "private-create" type="radio" value="false" name="gender"/> Private
                        <input data-testid = "public-create" type="radio" value="true" name="gender"/> Public
                    </div>
                    <form>
                        <label>
                            Name:
                            <input type="text" name="name" data-testid = "input-list" onChange={event => setInput(event.target.value)}/>
                        </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" data-testid = "close-button" onClick={handleClose}>
                        Close
                    </Button>
                    <Button data-testid = "save-changes" variant="primary" onClick={() => {addList();}}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} data-testid = "change-button" onHide={handleClose2} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Rename list</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label>
                            Name:
                            <input type="text" name="name" data-testid = "changeInput-list" onChange={event => setInput2(event.target.value)}/>
                        </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" data-testid = "close-button-rename" onClick={() => {handleClose2();}}>
                        Close
                    </Button>
                    <Button data-testid = "save-changes-rename" variant="primary" onClick={async () => {
                        await renameList();
                        handleClose2();
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal id = "remove-popup" show={showRemove}  onHide={handleRemoveClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" data-testid = "remove-yes" onClick={async () => {
                        console.log(listIdHook);
                        await deleteList(listIdHook);
                        handleRemoveClose();
                    }}>
                        Yes
                    </Button>
                    <Button variant="secondary" data-testid = "remove-no" onClick={handleRemoveClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal id = "compare-popup" show={showCompareUser}  onHide={() => {setCompareUser(false);}} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Which User Do You Want to Compare With?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <select name="selectList" id="selectList" data-testid = "compare-first-select" onChange = {(event) => {
                            // setOtherUserId(event.target.value);
                            console.log("EVENT: " + event.target.value);
                            setOtherUserId(event.target.value);}
                        }>
                            <option value="0">Pick a User To Compare</option>
                            {otherUsers.map((user) => {
                                console.log(user.lists);
                                if (user.id == props.userId) {
                                    return;
                                }
                                return (
                                    <option data-testid = "select-user-compare" key={user.id} value={user.id}>{user.email}</option>
                                );
                            })}
                        </select>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" data-testid ="close-compare-first" onClick={() => {setCompareUser(false);}}>
                        Close
                    </Button>
                    <Button data-testid = "save-changes-compare" variant="primary" onClick={async () => {
                        await setCompareUser(false);
                        await setCompareList(true);
                    }}>
                        Compare
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal id = "compare-new-list" show={showCompareList}  onHide={() => {setCompareList(false);}} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Compare and Create a New List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <select name="selectList" id="selectList" data-testid = "compare-second-select" onChange = {(event) => {setOtherUserListId(event.target.value);} }>
                            <option value="0">Lists to Pick From</option>
                            {otherUsers.map((user) => {
                                console.log(user);
                                console.log("Current user id: " + user.id);
                                console.log('Other user id: ' + otherUserId);
                                console.log(typeof(user.id) + " " + typeof(otherUserId));
                                if (user.id == otherUserId) {
                                    let lists = user.lists;
                                    console.log(lists);
                                    let listArray = [];
                                    for (let z = 0; z < lists.length; z++) {
                                        if (lists[z].isPublic === true) {
                                            listArray.push(
                                                <option data-testid = "user-list-compare" key={lists[z].listId} value={lists[z].listId}>{lists[z].listName}</option>
                                            );
                                        }
                                    }
                                    // lists.map((list, i) => {
                                    //     return(
                                    //         <option key={list.listId} value={list.listId}>{list.listName}</option>
                                    //     );
                                    // }
                                    return listArray;
                                }
                            })}
                        </select>
                        <div onChange = {event => setPublic(event.target.value)}>
                            <input data-testid = "private-compare" type="radio" value="false" name="gender"/> Private
                            <input data-testid = "public-compare" type="radio" value="true" name="gender"/> Public
                        </div>
                        <label>
                            List Name:
                            <input data-testid = "input-compare" type="text" name="List Name" onChange={event => setInput2(event.target.value)}/>
                        </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" data-testid = "close-compare-second" onClick={() => {setCompareList(false);}}>
                        Close
                    </Button>
                    <Button data-testid = "save-changes-final-compare" variant="primary" onClick={async () => {
                        if (otherUserId != 0) {
                            await CompareList();
                        }
                        await loadDataOneTime();
                        setCompareList(false);
                    }}>
                        Create New List
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal id = "rec-popup" show={showRecsList}  onHide={() => {setRecsList(false);}} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Recommend Yourself A New List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <select multiple = {true} name="Select Lists" data-testid = "rec-list-select" onChange = {(event) => {
                            const values = Array.from(event.target.selectedOptions, option => option.value); console.log(values); setListArray(values);
                        }}>
                            {lists.map((list) => {
                                return (
                                    <option  key={list.listId} value={list.listId}>{list.listName}</option>
                                );
                            })}
                        </select>
                        <label className = "hover-label">
                            <input className = "random-name" data-testid = "input-rec-number" type="number" name="List Name" min = "1" max = "10" onInput={event => {
                                console.log(event.target.value);
                                setNumberMovies(event.target.value);
                                // let numMovie = event.target.value;
                                // if (numMovie > 10 || numMovie < 0) {
                                //     console.log("That is not valid bitch");
                                // }
                                // else {
                                //     setNumberMovies(numMovie);
                                // }
                            }}/>
                            <span className="tool-tip-text">Select up to 10 movies</span>
                        </label>
                    </form>
                    <div onChange = {event => setPublic(event.target.value)}>
                        <input data-testid = "private-create" type="radio" value="false" name="gender"/> Private
                        <input data-testid = "public-create" type="radio" value="true" name="gender"/> Public
                    </div>
                    <form>
                        <label>
                            Name:
                            <input data-testid = "rec-input" type="text" name="name" onChange={event => setInput(event.target.value)}/>
                        </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setRecsList(false);}}>
                        Close
                    </Button>
                    <Button data-testid = "save-changes-rec" variant="primary" onClick={async () => {
                        console.log(listArray.length);
                        // if (listArray.length == 0) {
                        //     await RecommendList();
                        // }
                        // else {
                        //     await otherRecommendList();
                        // }
                        await otherRecommendList();
                        setRecsList(false);
                    }}>
                        Compare
                    </Button>
                </Modal.Footer>
            </Modal>


            <div className="row mx-auto g-3 movie-user-list" id = "movie-list-row">
                {lists.map((item) => {
                    let source;
                    let temp;
                    if (item.movie.length === 0) {
                        source = "data:image/png;base64,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";
                        //source = "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg";
                    }
                    else {
                        source = item.movie[0].picture;
                    }
                    if (item.isPublic === false) {
                        temp = "Private"
                    }
                    else {
                        temp = "Public";
                    }
                    return(
                        <div className="col-12 col-lg-4 text-center user-movie-list" key = {item.listId}>
                            <div className = "movie-overlay">
                                <img className="image" src={source} alt="Movie image"/>
                                <button className = "list-rename" onClick = {() => {setListId(item.listId); handleShow2();}} data-testid= "rename-hover">Rename</button>
                                <button className = "list-delete" onClick = {() => {setListId(item.listId); handleRemoveOpen();}} data-testId = "delete-hover">Delete</button>
                                <button className = "list-compare" onClick = {() => {setListId(item.listId); setCompareUser(true);}} data-testid = "compare-hover">Compare</button>
                                <p className = "list-public">{temp}</p>
                            </div>
                            <button className = "list-details" onClick = {() => {props.setHasComeFromValid(true); props.setListId(item.listId); navigate(`/movies`);}}>List {item.listName}</button>
                            <button className = "list-montage" onClick = {() => {props.setHasComeFromValid(true); props.setListId(item.listId); navigate(`/montage`);}}>Montage</button>
                        </div>
                    );
                })}
                {/*<div className="col-6 col-lg-4 text-center user-movie-list">*/}
                {/*    <img className="image" src={'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'} alt="Movie image" />*/}
                {/*    <button className = "list-button">View</button>*/}
                {/*</div>*/}
                {/*<div className="col-6 col-lg-4 text-center user-movie-list">*/}
                {/*    <img className="image" src={'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'} alt="Movie image" />*/}
                {/*    <button className = "list-button">View</button>*/}
                {/*</div>*/}
                {/*<div className="col-6 col-lg-4 text-center user-movie-list">*/}
                {/*    <img className="image" src={'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'} alt="Movie image" />*/}
                {/*    <button className = "list-button">View</button>*/}
                {/*</div>*/}
                {/*<div className="col-6 col-lg-4 text-center user-movie-list">*/}
                {/*    <img className="image" src={'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'} alt="Movie image" />*/}
                {/*    <button className = "list-button">View</button>*/}
                {/*</div>*/}
                {/*<div className="col-6 col-lg-4 text-center user-movie-list">*/}
                {/*    <img className="image" src={'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'} alt="Movie image" />*/}
                {/*    <button className = "list-button">View</button>*/}
                {/*</div>*/}
                {/*<div className="col-6 col-lg-4 text-center user-movie-list">*/}
                {/*    <img className="image" src={'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'} alt="Movie image" />*/}
                {/*    <button className = "list-button">View</button>*/}
                {/*</div>*/}
            </div>

        </div>
    );
}

export default UserList