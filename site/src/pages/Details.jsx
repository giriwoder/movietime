import React, {useState,useEffect} from "react";
import httpRequest from "../utils/httpRequest";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from '../components/Popup';
import "../styles/search.css";
import Navbar from '../components/Navbar';
import { Eye, PlusCircle,CurrencyDollar} from "react-bootstrap-icons";


function Details(props){

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
    // start the initial timeout
    resetTimeout();

// listen for user activity events (e.g. mousemove, keypress, etc.)
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keypress", resetTimeout);
  const [movie, setMovie] = useState([]);
//   const [listID, setListID]=useState();
  const [addListName, setAddListName]=useState("");
   const [hovered, setHovered] = useState(false);
    const [lists, setLists]=useState([]);
  const [selectedList, setSelectedList] = useState();
  const [cast, setCast]= useState([]);
  const [crew, setCrew]= useState([]);
  const [message, setMessage] = useState(null);
   const [buttonPopup, setButtonPopup] = useState(false);
   const [buttonPopupMovie, setButtonPopupMovie] = useState(false);
   const [buttonPopupList, setButtonPopupList] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
     const [listEye, setListEye] = useState([]);
     const [eyeMsg, setEyeMsg] = useState("");
     const [buttonPopupEye, setButtonPopupEye] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!props.hasComeFromValid) {
            console.log(props.hasComeFromValid);
            console.log("fail");
            navigate('/login');
        }
        else{
            props.setHasComeFromValid(false);
        }
    }, [navigate]);

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
  useEffect(()=> {

              const url=`https://api.themoviedb.org/3/movie/${props.details}?api_key=00f824df761bd517e281a3753a0a70f1&append_to_response=credits`;
                axios
                    .get(url)
                    .then((res) => {
                    setMessage(null);
                    setMovie(res.data);
                    setCast(res.data.credits.cast);
                    setCrew(res.data.credits.crew);
                    })
            },[]);

useEffect(()=> {
try{
    fetch(`https://localhost:8080/daniel/${props.userId}/list`)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        setLists(data)});
}
catch (err) {
     console.log(err);
}
},[])

// const location = useLocation();
// const searchParams = new URLSearchParams(location.search);
// const userId = searchParams.get('userId');

const genreClickHandler= (genreId)=>{
    props.onLinkClick(genreId);
//         console.log(genreId);
    //let path = `/search?userId=${props.userId}`;
    let path = `/search?userId=${props.userId}`;
    props.setHasComeFromValid(true);
    navigate(path);
}
 const handleHover = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
const actorClickHandler= (actorId)=>{
    props.onActorClick(actorId);
//     console.log(actorId);
    //let path = `/search?userId=${props.userId}`;
    let path = `/search?userId=${props.userId}`;
    console.log(path);
    props.setHasComeFromValid(true);
    navigate(path);
}
const handleAddButton =()=>{
// console.log(m);
setButtonPopup(true);
// setMovie(movie);
}
const updatePopup=()=>{
setButtonPopup(false);
setButtonPopupMovie(true);
}
const updatePopupList=()=>{
setButtonPopup(false);
setButtonPopupList(true);
}
const buyTicket=(title)=>{
window.open(`https://www.fandango.com/search?q=${title}&mode=all`,'_blank');
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
    const response = await fetch(`https://localhost:8080/daniel/${props.userId}/list`, requestOptions)
    json = await response.json();
    }
    catch (err) {
         setErrorMsg("The list name already exists, try a different name.");
         setButtonPopupMovie(true);
    }
    if(json){
//     setListID(json.listId);
       setErrorMsg("");
       fetch(`https://localhost:8080/daniel/${props.userId}/list`)
       .then(response => response.json())
       .then(data => {
        console.log(data);
        setLists(data)
        });
        setButtonPopupMovie(false);
    }
     setAddListName("");

}

  const handleListOptionChange = (option) => {
   console.log(option);
   setSelectedList(option);

  }
  const handleAddMovie =  async(e)=>{
   e.preventDefault();
   console.log(selectedList);

   console.log(movie.title);

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

     const uid=parseInt(props.userId);
     const slist=parseInt(selectedList);

     fetch(`https://localhost:8080/daniel/${uid}/${slist}/movie`, requestOptions)
         .then(response => response.json())
         .then(data => console.log(data));
         setButtonPopupList(false);
    }catch (err) {
      console.log(err);
    }

   }

return(

    <div>
        <Navbar userId={props.userId} setHasComeFromValid={props.setHasComeFromValid}/>
        <div id="page-wrapper" className="container">
            <div className="row mx-auto mt-5 mb-5 " >
                <div className="image-container col-6 text-center" >
                    <img data-testid="imgTest" onMouseEnter={handleHover} onMouseLeave={handleMouseLeave} className={`thumbnail ${hovered ? 'hover-effect' : ''}`} src={movie.poster_path? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: "https://www.altavod.com/assets/images/poster-placeholder.png"} alt="Movie image" />
                    <PlusCircle type="button" className="add-button"  onClick={()=>handleAddButton()} data-testid="addButton" aria-expanded={buttonPopup}  size={60}>Add</PlusCircle>
                    <br></br><Eye type="button" onClick={()=>eyeHandler(movie.id)} className="eye-button" data-testid="eyeButton"  size={60} />
                  <br></br> <a target="_blank" rel="noopener noreferrer"
                  href={`https://www.fandango.com/search?q=${movie.title}&mode=all`}
                   onClick={()=>buyTicket(movie.title)} className="dollar-button-1">
                 <CurrencyDollar data-testid="dollar-button-1"  size={60}/> </a>
                    <Popup trigger={buttonPopupEye} setTrigger={setButtonPopupEye}>
                        <div>
                            <h3>Lists that contain this movie</h3>
                            {!eyeMsg?( <ul>
                                {listEye.map((list) => (
                                    <li key={list.listId}>{list.listName}</li> ))}
                            </ul>):(eyeMsg) }
                        </div>
                    </Popup>


                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                        <h3>Add Movie</h3>
                        <p>Choose an option:</p>
                        <button data-testid="createNewList" type="button" className="btn btn-primary" style={{ marginRight: '10px' }}  onClick={()=>updatePopup()}>Create New List</button>
                        <button data-testid="addToExisting" type="button" className="btn btn-primary" onClick={()=>updatePopupList()}>Add to Existing List</button>
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
                         <button data-testid="createListPopUpSubmit" type="submit" className="btn btn-primary" style={{ marginRight: '10px',marginTop: '10px' }}  >Submit</button>
                     </form>
                 </Popup>
                 <Popup trigger={buttonPopupList} setTrigger={setButtonPopupList}>
                     <h3>Choose list to add the movie</h3>
                     <form onSubmit={handleAddMovie}>
                       <div>
                         <select  data-testid="listOptions" name="dropdown" style={{ width: "200px" }} onChange={(e) => handleListOptionChange(e.target.value)} value={selectedList}>
                           <option value="selectList"> -- Select a list -- </option>
                              {(lists== undefined)? (""):(lists.map((item, idx)=>(
                           <option key={idx} value={item.listId}>{item.listName}</option> ))) }
                          </select>
                       </div>
                       <button data-testid="submitSelectedList" type="submit" className="btn btn-primary" style={{ marginRight: '10px',marginTop: '10px' }}  >Submit</button>
                     </form>
                 </Popup>
               <div style={{ display: 'flex', alignItems: 'center' }}>
               <PlusCircle type="button" className="mobile-add-button"  onClick={()=>setButtonPopup(true)} data-testid="mobileAddButton" aria-expanded={buttonPopup} size={60}>Add</PlusCircle>
               <Eye type="button" onClick={()=>eyeHandler(movie.id)} className="mobile-eye-button"  size={60} />
                <a data-testid="dollar-button" target="_blank" rel="noopener noreferrer" href={`https://www.fandango.com/search?q=${movie.title}&mode=all`}
                  onClick={buyTicket} className="dollar-button-2">
                 <CurrencyDollar   size={60}/> </a>
              </div>
             </div>
             <div className="col-6">
                 <p> <span className="fw-bold">Title</span>: {movie.original_title}</p>
                 <p> <span className="fw-bold">Release Date</span>: {movie.release_date}</p>
                 <p><span className="fw-bold">Plot:</span> {movie.overview}</p>
                 <p><span className="fw-bold">Genres:</span></p>
                 <p style={{ hidden: true }}>{message}</p>
                 {Array.isArray(movie.genres) && movie.genres.map((item, idx) => (
                      <div key={idx}>
                         <ul>
                             <li><button data-testid="genreLink" type="button" className="btn btn-link" onClick={()=> genreClickHandler(item.name)}>{item.name}</button></li>
                         </ul>
                      </div>
                 ))}
                 <p className="fw-bold">Production:</p>
                 {Array.isArray(movie.production_companies) && movie.production_companies.map((item, idx) => (
                      <div key={idx} >
                         <ul>
                              <li>{item.name}</li>
                         </ul>
                      </div>
                 ))}
                 <p className="fw-bold">Directors:</p>
                 {Array.isArray(crew) && (
                     <ul>
                      {crew.filter(item => item.known_for_department === 'Directing').map((item, idx, arr) => {
                         if (arr.findIndex(i => i.name === item.name) !== idx) {
                              return null; // Skip repeated names
                      }
                        return (
                             <li key={idx}>
                                {item.name}
                             </li>
                             );
                          })}
                      </ul>
                    )}
                 <p className="fw-bold">Cast:</p>
                 <div className="container" style={{ whiteSpace: 'nowrap', overflowX: 'auto', backgroundColor: '#dedede', height: '70px' }} >
                 {Array.isArray(cast) && cast.map((item, idx) => (
                      <div key={idx} style={{ display: 'inline-block', marginRight: '20px', paddingTop: '10px'}}>
                         <div className="col-6" style={{ color: 'black', textDecoration: 'none',fontSize:'18px' }}>
                        <button data-testid="actorLink" type="button" className="btn btn-link" onClick={()=> actorClickHandler(item.name)}>{item.name}</button>
                        </div>
                    </div>
                    ))}
             
                </div>
            </div>
        </div>
    </div>
</div>
)
}
export default Details;
