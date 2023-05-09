import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/search.css";
import httpRequest from "../utils/httpRequest";
import Popup from '../components/Popup';
import "regenerator-runtime/runtime";
import { Eye, PlusCircle,CurrencyDollar } from "react-bootstrap-icons";
import Navbar from '../components/Navbar';




function Search(props) {
    const navigate = useNavigate();

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
            window.location.href = "/login";
        }, inactivityTimeout);
    }

// listen for user activity events (e.g. mousemove, keypress, etc.)
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keypress", resetTimeout);

// start the initial timeout
    resetTimeout();
 const [message, setMessage] = useState("");
 const [query, setQuery] = useState("");
 const [savedQuery, setSavedQuery]=useState("");
 const [movies, setMovies] = useState([]);
 const [selectedOption, setSelectedOption] = useState("keyword");
 const [selectedStartYear, setSelectedStartYear] = useState(1900);
 const [selectedEndYear, setSelectedEndYear] = useState(new Date().getFullYear(2023));
 const [hovered, setHovered] = useState(false);
 const [page, setPage] = useState(1);
 const [buttonPopup, setButtonPopup] = useState(false);
 const [buttonPopupMovie, setButtonPopupMovie] = useState(false);
 const [buttonPopupList, setButtonPopupList] = useState(false);
 const [addListName, setAddListName]=useState("");
//  const [listID, setListID]=useState();
 const [lists, setLists]=useState([]);
 const [movie,setMovie]=useState();
 const [selectedList, setSelectedList] = useState();
 const [errorMsg, setErrorMsg] = useState("");
 const [buttonPopupEye, setButtonPopupEye] = useState(false);
 const [listEye, setListEye] = useState([]);
 const [eyeMsg, setEyeMsg] = useState("");
 const location = useLocation();
 const searchParams = new URLSearchParams(location.search);
 const genre_ids= {action:28, adventure:12, animation: 16, comedy:35, crime:80, documentary: 99, drama:18,
         family: 10751, fantasy: 14, history:36, horror:27, music: 10402, mystery:9648, romance: 10749, science_fiction: 878, tv_movie:10770,
         thriller: 53, war: 10752, western: 37};
 const userId = searchParams.get('userId'); //access unique userId
    console.log(userId);
 props.setUid(userId);


    useEffect(() => {
        if (!props.hasComeFromValid) {
            navigate('/login');
        }
        else{
            props.setHasComeFromValid(false);
        }
    }, [navigate]);

 const handleOptionChange = (option) => {
   setSelectedOption(option);
   setPage(1); // reset page to 1
   setMovies([]); // clear movies array
 };
  const handleListOptionChange = (option) => {
   console.log(option);
   setSelectedList(option);

  };
 const handleStartYearChange = (event) => {
   setSelectedStartYear(parseInt(event.target.value));
 };
 const handleEndYearChange = (event) => {
   setSelectedEndYear(parseInt(event.target.value));
};
 const handleHover = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  const loadPageWGenre = async(url)=>{

      try {
             const response = await httpRequest(url);
             const data = await response.data;
             setMessage("");
            setSavedQuery(props.gQuery);
            props.setGquery(null);
             setSelectedOption("genre");
             setMovies(data.results.slice(0, 10));
             setPage(2);
          } catch (err) {
             setMessage("No results found.");
          }
  }
  const loadPageWactor = async(url)=>{
try {
        const response = await httpRequest(url);
        const data = await response.data;
        setMessage(null);
        const personId = data.results[0].id;
        url = `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=00f824df761bd517e281a3753a0a70f1`;
        const movieResponse = await httpRequest(url);

        const movieData = await movieResponse.data;
        setSavedQuery(props.aQuery);
        props.setAquery(null);
        setSelectedOption("actor");
        setMovies(movieData.cast.slice(0, 10));
        setPage(2);

      } catch (err) {
        setMessage("No results found.");
      }
  }

      if(props.gQuery)
      {
                  let genre_id;
                  if(props.gQuery.toLowerCase() === "science fiction")
                  {
                      genre_id= genre_ids["science_fiction"];
                  }
                  else if (props.gQuery.toLowerCase() === "tv movie")
                  {
                      genre_id= genre_ids["tv_movie"];
                  }
                  else if(!genre_ids[props.gQuery.toLowerCase()])
                  {
                       genre_id=0;
                  }
                  else
                  {
                      genre_id= genre_ids[props.gQuery.toLowerCase()];
                  }
          const url=`https://api.themoviedb.org/3/discover/movie?api_key=00f824df761bd517e281a3753a0a70f1&with_genres=${genre_id}`;
          loadPageWGenre(url);

      }
      if(props.aQuery)
      {

            const url = `https://api.themoviedb.org/3/search/person?api_key=00f824df761bd517e281a3753a0a70f1&query=${props.aQuery}`;

         loadPageWactor(url);
      }


const searchMovies = async (e) => {
  e.preventDefault();
  let url = "";
  switch (selectedOption) {

    case "actor":

    url = `https://api.themoviedb.org/3/search/person?api_key=00f824df761bd517e281a3753a0a70f1&query=${savedQuery}`;

    try {
        const response = await httpRequest(url);
        const data = await response.data;
        setMessage(null);
        const personId = data.results[0].id;
        url = `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=00f824df761bd517e281a3753a0a70f1`;
        const movieResponse = await httpRequest(url);
        const movieData = await movieResponse.data;
        setMessage(null);
        if (page === 1) {
                setMovies(movieData.cast.slice(0, 10));
            } else {
                setMovies(prevMovies => [...prevMovies, ...movieData.cast.slice((page-1)*10, page*10)]);
        }
       setPage(prevPage => prevPage + 1);


      } catch (err) {
        setMessage("No results found.");
      }
      break;
    case "title":

      url = `https://api.themoviedb.org/3/search/movie?api_key=00f824df761bd517e281a3753a0a70f1&language=en-US&query=${savedQuery}&page=${page}&include_adult=false`;
      try {
        const response = await httpRequest(url);
        const data = await response.data;
        setMessage(null);
        if (page === 1) {
          setMovies(data.results.slice(0, 10));
        } else {
          setMovies(prevMovies => [...prevMovies, ...data.results.slice(0, 10)]);
        }
        setPage(prevPage => prevPage + 1);

      } catch (err) {
        setMessage("No results found.");
      }
      break;
      case "genre":{
            let genre_id;
            if(savedQuery.toLowerCase() === "science fiction")
            {
                genre_id= genre_ids["science_fiction"];
            }
            else if (savedQuery.toLowerCase() === "tv movie")
            {
                genre_id= genre_ids["tv_movie"];
            }
            else if(!genre_ids[savedQuery.toLowerCase()])
            {
                genre_id=0;
            }
            else
            {
                genre_id= genre_ids[savedQuery.toLowerCase()];
            }
            url=`https://api.themoviedb.org/3/discover/movie?api_key=00f824df761bd517e281a3753a0a70f1&with_genres=${genre_id}&page=${page}`;
            try {
              const response = await httpRequest(url);
              const data = await response.data;
              setMessage(null);

              if (page === 1) {
                setMovies(data.results.slice(0, 10));
              } else {
                setMovies(prevMovies => [...prevMovies, ...data.results.slice(0, 10)]);
              }
              setPage(prevPage => prevPage + 1);

            } catch (err) {
              setMessage("No results found.");
            }
        break;
        }
    default:

      url = `https://api.themoviedb.org/3/search/keyword?api_key=00f824df761bd517e281a3753a0a70f1&query=${savedQuery}`;

          try {
            const response = await httpRequest(url);
            const data = await response.data;
            setMessage(null);
            const keywordId = data.results[0].id;
            url = `https://api.themoviedb.org/3/discover/movie?api_key=00f824df761bd517e281a3753a0a70f1&with_keywords=${keywordId}&page=${page}`;
            const keywordResponse = await httpRequest(url);
            const keywordData = await keywordResponse.data;
            setMessage(null);
            if (page === 1) {
              setMovies(keywordData.results.slice(0, 10));
            } else {
              setMovies(prevMovies => [...prevMovies, ...keywordData.results.slice(0, 10)]);
            }
            setPage(prevPage => prevPage + 1);

          } catch (err) {
            setMessage("No results found.");
          }
      break;
  }
  setQuery("");
};
const handleLoadMore = async (e) => {
  e.preventDefault();
  try {
    await searchMovies(e);
  } catch (err) {
    console.error(err);
  }
};

const updatePopup=()=>{
setButtonPopup(false);
setButtonPopupMovie(true);
}
const updatePopupList=()=>{
setButtonPopup(false);
setButtonPopupList(true);
}

const handleCreateNewList= async(e)=>{
 e.preventDefault();
console.log(addListName);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listName: `${addListName}` })
    };

    let json;
    try{
    const response = await fetch(`https://localhost:8080/daniel/${userId}/list`, requestOptions);
    json = await response.json();
    }
    catch (err) {
         setErrorMsg("The list name already exists, try a different name.");
         setButtonPopupMovie(true);
    }

    if(json){
//     setListID(json.listId);
       setErrorMsg("");
       fetch(`https://localhost:8080/daniel/${userId}/list`)
       .then(response => response.json())
       .then(data => {
        console.log(data);
        setLists(data)});
        setButtonPopupMovie(false);
    }

}

useEffect(()=> {
try{

    fetch(`https://localhost:8080/daniel/${userId}/list`)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        setLists(data)});
}
catch (err) {
     console.log(err);
}
},[])
const handleAddButton =(m)=>{
setButtonPopup(true);
setMovie(m);
}

const handleAddMovie =  async(e)=>{
 e.preventDefault();


 try{
    const url=`https://api.themoviedb.org/3/movie/${movie.id}?api_key=00f824df761bd517e281a3753a0a70f1&language=en-US&append_to_response=credits,production_companies`;
             const response = await httpRequest(url);
             console.log(response);
             const data = await response.data;
     const directorList = data.credits.crew
                 .filter((crewMember) => crewMember.job === "Director")
                 .map((director) => director.name);
           const castList = data.credits.cast.map((castMember) => castMember.name);
           const studioList = data.production_companies.map((company) => company.name);
            const genreIdConverted = data.genres.map((genre)=>genre.id);

     const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(
         {
               movieDbId: movie.id,
               picture: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
               title: movie.title,
               plot: movie.overview,
                genre: genreIdConverted.join(","),
               studio: studioList.join(","),
               actors: castList.join(","),
               directors: directorList.join(",")
         })
     };
     console.log(requestOptions);

     const uid=parseInt(userId);
     const slist=parseInt(selectedList);

     fetch(`https://localhost:8080/daniel/${uid}/${slist}/movie`, requestOptions)
         .then(response => response.json())
         .then(data => console.log(data));
         setButtonPopupList(false);
    }catch (err) {
      console.log(err);
    }
 }


const buyTicket=(title)=>{
window.open(`https://www.fandango.com/search?q=${title}&mode=all`,'_blank');
}


 const routeChange = (selected) => {
   props.onViewDetails(selected);
   //let path = `/details?userId=${userId}`
     let path = `/details`
   props.setHasComeFromValid(true);
   navigate(path);
 };

const eyeHandler = async(movieID)=>{
     setButtonPopupEye(true);
//      setMovie(movie);
     console.log("EYE HANDLER");
     let json="";
     try{
          console.log(movieID)
           const response = await  fetch(`https://localhost:8080/daniel/${movieID}/movie`);
           json = await response.json();
     }
     catch (err) {
     setEyeMsg("This movie is not in any of your lists!");
     }
         if(json){
         console.log(json);
         setEyeMsg("");
         setListEye(json);
     }
   }
 return (
   <div>
       <Navbar userId={userId} setHasComeFromValid={props.setHasComeFromValid}/>
     <div id="page-wrapper" className="container">
        <div className="row mt-5">
                    <div className="col-4">
                    <label className="fw-bold" htmlFor="year-picker">Show results starting at year:</label>
                          <input
                            id="year-picker"
                            data-testid="startYear"
                            type="number"
                            min="1900"
                            max={new Date().getFullYear()}
                            value={selectedStartYear}
                            onChange={handleStartYearChange}
                          />
                      </div>
                      <div className="col-3">
                           <label className="fw-bold" htmlFor="year-picker">Up to year:</label>
                               <input
                               data-testid="endYear"
                                 id="year-picker"
                                  type="number"
                                   min="1900"
                                  max={new Date().getFullYear()}
                                  value={selectedEndYear}
                                   onChange={handleEndYearChange}
                                   />
                               </div>
                  </div>
       <div id="search">
         <form onSubmit={searchMovies}>
           <div>
             <select
               name="dropdown"
               style={{ width: "200px" }}
               onChange={(e) => handleOptionChange(e.target.value)}
               value={selectedOption}
               data-testid="options">
               <option value="actor" >Actor</option>
               <option value="keyword"  >Keyword</option>
               <option value="title" >Title</option>
               <option value="genre" >Genre</option>
             </select>
           </div>
           <input
             data-testid="searchField"
             id="searchField"
             type="text"
             name="query"
             placeholder="Search movies..."
             value={query}
             onChange={(e) => {
             setQuery(e.target.value);
             setSavedQuery(e.target.value);
             }}
           />
           <button data-testid= "clickme" type="submit" style={{ borderRadius: "5px" }} onClick={()=>{setMovies([]);setPage(1);}}>
             Search{" "}
           </button>
           <small className="mt-2 form-text text-danger" data-testid="error">
               <em id="emphText">{message}</em>
           </small>
         </form>
       </div>
       <div id="movie-container" className="row mx-auto" data-testid="movie-container">
         { movies.map((item, idx)=>(
                   (!item.release_date || (new Date(item.release_date).getFullYear() >= selectedStartYear && new Date(item.release_date).getFullYear() <= selectedEndYear)) ?
                     (<div key={idx} className="col-6 col-lg-3 text-center" data-testid="movie-element">
                            <div className="image-container">
                                 <img  className={`thumbnail ${hovered ? 'hover-effect' : ''}`} src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "https://www.altavod.com/assets/images/poster-placeholder.png"} alt="Movie image" onMouseEnter={handleHover} onMouseLeave={handleMouseLeave} data-testid="imgTest"/>
                                    <PlusCircle type="button" className="add-button"  onClick={()=>handleAddButton(item)} data-testid="addButton" aria-expanded={buttonPopup}  size={60} style={{ fill: 'black', stroke: 'none' }}>Add</PlusCircle>
                                    <br></br><Eye data-testid="eyeButton" type="button" onClick={()=>eyeHandler(item.id)} className="eye-button"  size={60} />
                                    <br></br> <a data-testid="dollar-button" target="_blank" rel="noopener noreferrer"
                                               href={`https://www.fandango.com/search?q=${item.title}&mode=all`}
                                                     onClick={()=>buyTicket(item.title)} className="dollar-button-1">
                                               <CurrencyDollar size={60}/> </a>

                                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                                           <h3>Add Movie</h3>
                                           <p>Choose an option:</p>
                                           <button type="button" data-testid="createNewList" className="btn btn-primary" style={{ marginRight: '10px' }}  onClick={()=>updatePopup()}>Create New List</button>
                                           <button type="button" data-testid="addToExisting" className="btn btn-primary" onClick={()=>updatePopupList()}>Add to Existing List</button>
                                    </Popup>
                                    <Popup trigger={buttonPopupEye} setTrigger={setButtonPopupEye}>
                                      <div>
                                        <h3>Lists that contain this movie</h3>
                                  {!eyeMsg?( <ul>
                                          {listEye.map((list) => (
                                           <li key={list.listId}>{list.listName}</li> ))}
                                        </ul>):(<p>{eyeMsg}</p>) }

                                      </div>
                                    </Popup>
                                    <Popup trigger={buttonPopupMovie} setTrigger={setButtonPopupMovie}>
                                            <h3>Create New List</h3>
                                            <form onSubmit={handleCreateNewList}>
                                              <div className="row">
                                                <label htmlFor="lname">List name:</label><br></br>
                                                <input data-testid="createListPopUpInput" type="text" id="lname" name="lname" value={addListName} placeholder="Enter a list name...." onChange={(e) => setAddListName(e.target.value)}/><br></br>
                                                    { errorMsg!=="" ? (<small className="mt-2 form-text text-danger" data-testid="error">
                                                        <em id="emphText">{errorMsg}</em>
                                                      </small>):""}
                                              </div>
                                              <button data-testid="createListPopUpSubmit" type="submit" className="btn btn-primary" style={{ marginRight: '10px' ,marginTop: '10px' }}  >Submit</button>
                                            </form>
                                    </Popup>
                                    <Popup trigger={buttonPopupList} setTrigger={setButtonPopupList}>
                                    <h3>Choose list to add the movie</h3>
                                     <form onSubmit={handleAddMovie}>
                                     <div>
                                                 <select
                                                    data-testid="listOptions"
                                                   name="dropdown"
                                                   style={{ width: "200px" }}
                                                   onChange={(e) => handleListOptionChange(e.target.value)}
                                                   value={selectedList}
                                                 >
                                                  <option value="selectList"> -- Select a list -- </option>
                                                  {(lists== undefined)? (""):(lists.map((item, idx)=>(
                                                  <option key={idx}
                                                  value={item.listId}>{item.listName}</option>

                                                       ))) }
                                                 </select>
                                     </div>
                                     <button data-testid="submitSelectedList"  type="submit" className="btn btn-primary" style={{ marginRight: '10px',marginTop: '10px' }}  >Submit</button>
                                     </form>
                                    </Popup>

                            </div>

                           <ul className="list-unstyled">
                             <li>
                               <h4 className="fw-bold" id="title">{item.title}</h4>
                               <p id="release-date">{item.release_date ? item.release_date : "N/A"}</p>
                               <button id="viewDetails" data-testid="viewDetails" type="button" className="btn btn-primary" onClick={() => routeChange(item.id)}>View Details</button>
                             </li>
                             <li className="d-flex justify-content-start align-items-center mobile-buttons">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                               <PlusCircle type="button" className="mobile-add-button me-2" onClick={() => setButtonPopup(true)} data-testid="mobileAddButton" aria-expanded={buttonPopup} size={30}>Add</PlusCircle>
                               <Eye data-testid="movie-eye-button-1" type="button" onClick={() => eyeHandler(item.id)} className="mobile-eye-button" size={30} />
                                <a data-testid="dollar-button-1"  target="_blank" rel="noopener noreferrer" href={`https://www.fandango.com/search?q=${item.title}&mode=all`}
                                  onClick={buyTicket} className="dollar-button-2">
                            <CurrencyDollar size={30}/> </a>
                              </div>
                             </li>
                           </ul>
                     </div>
                     ):''
                   ))}
                    {movies.length > 0 && (
                    <button className="load-more" onClick={handleLoadMore} data-testid="loadMoreButton">
                        Load More
                    </button>
                  )}
       </div>
     </div>
   </div>
 );
}
export default Search;
