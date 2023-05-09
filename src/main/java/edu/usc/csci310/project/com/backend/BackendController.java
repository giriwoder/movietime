package edu.usc.csci310.project.com.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/daniel") // sorry I will change this later lmao
public class BackendController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    MovieDetailRepository movieDetailRepository;

    @Autowired
    MovieListRepository movieListRepository;

    @PostMapping("{list_id}/{movie_id}/existingMovie")
    public ResponseEntity<MovieDetailEntity> addExistingMovie(@PathVariable("list_id") int listId, @PathVariable("movie_id") int movieId) {
        MovieDetailEntity movie = movieDetailRepository.findByMovieDbId(movieId);
        MovieListEntity list = movieListRepository.findById(listId).get();
        list.addMovie(movie);
        movieListRepository.save(list);
        return new ResponseEntity<MovieDetailEntity>(movie, HttpStatus.OK);
    }

    @PostMapping("/{userID}/list")
    public ResponseEntity<MovieListEntity> addList(@PathVariable("userID") int id, @RequestBody MovieListEntity listRequest) {
        if (!userRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
//        else if (movieListRepository.existsByListName(listRequest.getListName())) {
//            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
//        }
        else {
            UserEntity user = userRepository.findById(id);
            Set<MovieListEntity> lists = user.getLists();
            for (MovieListEntity list: lists) {
                if (list.getListName().equals(listRequest.getListName())) {
                    return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
                }
            }
            MovieListEntity newList = new MovieListEntity();
            newList.setListName(listRequest.getListName());
            newList.setUser(user);
            newList.setIsPublic(listRequest.getIsPublic());
            movieListRepository.save(newList);
            user.addMovieList(newList);
            userRepository.save(user);
            return new ResponseEntity<MovieListEntity>(newList, HttpStatus.OK);
        }
    }

    @PostMapping("/{userID}/{listID}/movie")
    public ResponseEntity<MovieDetailEntity> addMovie(@PathVariable("userID") int userID, @PathVariable("listID") int listID, @RequestBody MovieDetailEntity movieRequest) {
        if (!userRepository.existsById(userID)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        if (!movieListRepository.existsById(listID)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        if (!movieDetailRepository.existsByMovieDbId(movieRequest.getMovieDbId())) {
            MovieListEntity list = movieListRepository.findById(listID).get();
            MovieDetailEntity movie = new MovieDetailEntity();
            movie.setMovieDbId(movieRequest.getMovieDbId());
            movie.setActors(movieRequest.getActors());
            movie.setGenre(movieRequest.getGenre());
            movie.setPicture(movieRequest.getPicture());
            movie.setPlot(movieRequest.getPlot());
            movie.setStudio(movieRequest.getStudio());
            movie.setTitle(movieRequest.getTitle());
            movie.setDirectors(movieRequest.getDirectors());
            movie.addMovies(list);
            movieDetailRepository.save(movie);
            list.addMovie(movie);
            movieListRepository.save(list);
            return new ResponseEntity<MovieDetailEntity>(movie, HttpStatus.OK);
        }
        else {
            MovieListEntity list = movieListRepository.findById(listID).get();
            Set<MovieDetailEntity> currentMovies = list.getMovie();
            for(MovieDetailEntity i: currentMovies) {
                if (movieRequest.getMovieDbId() == i.getMovieDbId()) {
                    return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
                }
            }
            MovieDetailEntity movie = movieDetailRepository.findByMovieDbId(movieRequest.getMovieDbId());
            movie.addMovies(list);
            movieDetailRepository.save(movie);
            list.addMovie(movie);
            movieListRepository.save(list);
            return new ResponseEntity<MovieDetailEntity>(movieRequest, HttpStatus.OK);
        }
    }

    @PostMapping("/compare/{userId}/{firstList}/{secondList}")
    public ResponseEntity<MovieListEntity> compareLists(@PathVariable("userId") int userId,@PathVariable("firstList") int firstId, @PathVariable("secondList") int secondId, @RequestBody MovieListEntity listRequest) {
        if (!userRepository.existsById(userId)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        if (!movieListRepository.existsById(secondId)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        if (!movieListRepository.existsById(firstId)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        Set<MovieDetailEntity> set1 = movieListRepository.findById(firstId).get().getMovie();
        Set<MovieDetailEntity> set2 = movieListRepository.findById(secondId).get().getMovie();
        Set<MovieDetailEntity> finalSet = new HashSet<>();
        for (MovieDetailEntity movie: set1) {
            for (MovieDetailEntity movie1: set2) {
                if (movie.getMovieDbId() == movie1.getMovieDbId()) {
                    finalSet.add(movie);
                }
            }
        }
        MovieListEntity newList = new MovieListEntity();
        UserEntity user = userRepository.findById(userId);
        newList.setMovie(finalSet);
        newList.setListName(listRequest.getListName());
        newList.setIsPublic(listRequest.getIsPublic());
        newList.setUser(user);
        movieListRepository.save(newList);
        user.addMovieList(newList);
        userRepository.save(user);
        return new ResponseEntity<MovieListEntity>(newList, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<Set<UserEntity>> getUsers() {
        Set<UserEntity> users = userRepository.findAll();
        return new ResponseEntity<Set<UserEntity>>(users, HttpStatus.OK);
    }

    @GetMapping("/{user_ID}/list")
    public ResponseEntity<Set<MovieListEntity>> getLists(@PathVariable ("user_ID") int user_ID){
        if (!userRepository.existsById(user_ID)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        UserEntity user = userRepository.findById(user_ID);
        return new ResponseEntity<Set<MovieListEntity>>(user.getLists(), HttpStatus.OK);
    }

    @GetMapping("/{movie_id}/movie")
    public ResponseEntity<Set<MovieListEntity>> getSingleMovie(@PathVariable("movie_id") int movieId) {
        if (!movieDetailRepository.existsByMovieDbId(movieId)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        MovieDetailEntity movie = movieDetailRepository.findByMovieDbId(movieId);
        return new ResponseEntity<Set<MovieListEntity>>(movie.GetMoviesLists(), HttpStatus.OK);
    }

    @GetMapping("/{user_ID}/{list_ID}/{movie_id}/movies")
    public ResponseEntity<MovieDetailEntity> getMovies(@PathVariable("user_ID") int userID, @PathVariable("list_ID") int listID, @PathVariable("movie_id") int movieID) {
        if (!userRepository.existsById(userID)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        if (!movieListRepository.existsById(listID)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        if (!movieDetailRepository.existsById(movieID)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        MovieListEntity list = movieListRepository.findById(listID).get();
        Set<MovieDetailEntity> movies = list.getMovie();
        for (MovieDetailEntity movie: movies) {
            if (movie.GetTutorialId() == movieID) {
                return new ResponseEntity<MovieDetailEntity>(movie, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
    }

    @GetMapping("/{user_ID}/{list_ID}/movies")
    public ResponseEntity<Set<MovieDetailEntity>> getMovies(@PathVariable("user_ID") int userID, @PathVariable("list_ID") int listID) {
        if (!userRepository.existsById(userID)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        if (!movieListRepository.existsById(listID)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        MovieListEntity list = movieListRepository.findById(listID).get();
        return new ResponseEntity<Set<MovieDetailEntity>>(list.getMovie(), HttpStatus.OK);
    }


    @PutMapping("/{user_id}/{list_id}/name")
    public ResponseEntity<String> changeListName(@PathVariable("user_id") int userID, @PathVariable("list_id") int listID, @RequestBody String name) {
        if (!userRepository.existsById(userID)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        if (!movieListRepository.existsById(listID)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        MovieListEntity list = movieListRepository.findById(listID).get();
        list.setListName(name);
        movieListRepository.save(list);
        return new ResponseEntity<String>(list.getListName(), HttpStatus.OK);
    }

    @DeleteMapping("/{user_id}/{list_id}/list")
    public ResponseEntity<HttpStatus> removeList(@PathVariable("user_id") int userID, @PathVariable("list_id") int listID) {
        if (!userRepository.existsById(userID)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        if (!movieListRepository.existsById(listID)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        movieListRepository.deleteById(listID);
        return new ResponseEntity<HttpStatus>(HttpStatus.OK);
    }

    @DeleteMapping("/{user_id}/{list_id}/{movie_id}/movie")
    public ResponseEntity<MovieListEntity> removeMovie(@PathVariable("user_id") int userID, @PathVariable("list_id") int listID, @PathVariable("movie_id") int movieID) {
        if (!userRepository.existsById(userID)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        if (!movieListRepository.existsById(listID)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        if (!movieDetailRepository.existsByMovieDbId(movieID)) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        MovieListEntity list = movieListRepository.findById(listID).get();
        Set<MovieDetailEntity> movies = list.getMovie();
        Set<MovieDetailEntity> newMovies = new HashSet<>();
        for (MovieDetailEntity movie: movies) {
            if (movie.getMovieDbId() != movieID) {
                newMovies.add(movie);
            }
        }
        list.setMovie(newMovies);
        movieListRepository.save(list);
        return new ResponseEntity<MovieListEntity>(list,HttpStatus.OK);
    }


}
