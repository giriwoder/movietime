package edu.usc.csci310.project.com.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import static org.mockito.Mockito.*;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class BackendControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private MovieDetailRepository movieDetailRepository;

    @Mock
    private MovieListRepository movieListRepository;

    @InjectMocks
    private BackendController controller;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void AddExistingMovieTest() {
        MovieDetailEntity movie = new MovieDetailEntity();
        MovieListEntity list = new MovieListEntity();
        Optional<MovieListEntity> ddd = Optional.of(list);
        when(movieDetailRepository.findByMovieDbId(1)).thenReturn(movie);
        when(movieListRepository.findById(1)).thenReturn(ddd);
        ResponseEntity<MovieDetailEntity> response = controller.addExistingMovie(1, 1);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testAddList_whenListNameExists_returnExpectationFailed() {
        String listName = "testList";
        MovieListEntity listRequest = new MovieListEntity();
        listRequest.setListName(listName);
        when(userRepository.existsById(1)).thenReturn(false);
        when(movieListRepository.existsById(1)).thenReturn(true);
        ResponseEntity<MovieListEntity> response = controller.addList(1, listRequest);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void testAddListWhenListExists() {
        String listName = "testList";
        MovieListEntity listRequest = new MovieListEntity();
        listRequest.setListName(listName);

        UserEntity user = new UserEntity();
        user.setId(1);
        user.addMovieList(listRequest);
        when(userRepository.existsById(1)).thenReturn(true);
        when(userRepository.findById(1)).thenReturn(user);
        ResponseEntity<MovieListEntity> response = controller.addList(1, listRequest);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }
    @Test
    public void testAddList_whenUserExists_returnNewList() {
        String listName = "testList";
        MovieListEntity listRequest = new MovieListEntity();
        listRequest.setListName(listName);
        MovieListEntity list = new MovieListEntity();
        list.setListName("abc");
        UserEntity user = new UserEntity();
        user.setId(1);
        user.addMovieList(list);

        when(movieListRepository.existsByListName(listName)).thenReturn(false);
        when(userRepository.existsById(1)).thenReturn(true);
        when(userRepository.findById(1)).thenReturn(user);
        when(movieListRepository.save(any(MovieListEntity.class))).thenReturn(listRequest);
        when(userRepository.save(any(UserEntity.class))).thenReturn(user);
        ResponseEntity<MovieListEntity> response = controller.addList(1, listRequest);
        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(listName, response.getBody().getListName());
    }
//
    @Test
    public void test_AddMovie_NoUser() {
        when(userRepository.existsById(1)).thenReturn(false);
        MovieDetailEntity request = new MovieDetailEntity();
        ResponseEntity<MovieDetailEntity> response = controller.addMovie(1,2, request);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }
    @Test
    public void test_AddMovie_NoList() {
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(false);
        MovieDetailEntity request = new MovieDetailEntity();
        ResponseEntity<MovieDetailEntity> response = controller.addMovie(1,2, request);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void test_AddMovie_MovieDoesNotExistYet() {
        MovieDetailEntity request = new MovieDetailEntity();
        MovieListEntity list = new MovieListEntity();
        MovieListEntity mock = Mockito.mock(MovieListEntity.class);
        Optional<MovieListEntity> ddd = Optional.of(list);
        list.setListName("list1");
        request.setMovieDbId(1);
        request.setGenre("genre");
        request.setActors("actors");
        request.setStudio("studio");
        request.setPlot("plot");
        request.setPicture("picture");
        request.setTitle("title");
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(true);
        when(movieListRepository.findById(2)).thenReturn(ddd);
//        when(ddd.get()).thenReturn(list);
        when(movieDetailRepository.save(any(MovieDetailEntity.class))).thenReturn(request);
        when(movieListRepository.save(any(MovieListEntity.class))).thenReturn(list);
        ResponseEntity<MovieDetailEntity> response = controller.addMovie(1,2, request);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void test_AddMovie_MovieIDAlreadyPresent() {
        MovieDetailEntity request = new MovieDetailEntity();
        MovieListEntity list = new MovieListEntity();
        MovieListEntity mock = Mockito.mock(MovieListEntity.class);
        Optional<MovieListEntity> ddd = Optional.of(list);
        list.setListName("list1");
        list.addMovie(request);
        request.setMovieDbId(1);
        request.setGenre("genre");
        request.setActors("actors");
        request.setStudio("studio");
        request.setPlot("plot");
        request.setPicture("picture");
        request.setTitle("title");
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(true);
        when(movieDetailRepository.existsByMovieDbId(request.getMovieDbId())).thenReturn(true);
        when(movieListRepository.findById(2)).thenReturn(ddd);
//        when(ddd.get()).thenReturn(list);
//        when(movieDetailRepository.findByMovieDbId(request.getMovieDbId())).thenReturn(request);
//        when(movieListRepository.save(any(MovieListEntity.class))).thenReturn(list);
//        when(movieDetailRepository.save(any(MovieDetailEntity.class))).thenReturn(request);
        ResponseEntity<MovieDetailEntity> response = controller.addMovie(1,2, request);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void test_AddMovie_MovieDoesExist() {
        MovieDetailEntity request = new MovieDetailEntity();
        MovieListEntity list = new MovieListEntity();
        MovieListEntity mock = Mockito.mock(MovieListEntity.class);
        Optional<MovieListEntity> ddd = Optional.of(list);
        list.setListName("list1");
        request.setMovieDbId(1);
        request.setGenre("genre");
        request.setActors("actors");
        request.setStudio("studio");
        request.setPlot("plot");
        request.setPicture("picture");
        request.setTitle("title");
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(true);
        when(movieDetailRepository.existsByMovieDbId(request.getMovieDbId())).thenReturn(true);
        when(movieListRepository.findById(2)).thenReturn(ddd);
//        when(ddd.get()).thenReturn(list);
        when(movieDetailRepository.findByMovieDbId(request.getMovieDbId())).thenReturn(request);
        when(movieListRepository.save(any(MovieListEntity.class))).thenReturn(list);
        when(movieDetailRepository.save(any(MovieDetailEntity.class))).thenReturn(request);
        ResponseEntity<MovieDetailEntity> response = controller.addMovie(1,2, request);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void test_AddMovie_MovieDoesExist_Final() {
        MovieDetailEntity request = new MovieDetailEntity();
        MovieListEntity list = new MovieListEntity();
        MovieDetailEntity movie = new MovieDetailEntity();
        movie.setMovieDbId(2);
        list.addMovie(movie);
        MovieListEntity mock = Mockito.mock(MovieListEntity.class);
        Optional<MovieListEntity> ddd = Optional.of(list);
        list.setListName("list1");
        request.setMovieDbId(1);
        request.setGenre("genre");
        request.setActors("actors");
        request.setStudio("studio");
        request.setPlot("plot");
        request.setPicture("picture");
        request.setTitle("title");
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(true);
        when(movieDetailRepository.existsByMovieDbId(request.getMovieDbId())).thenReturn(true);
        when(movieListRepository.findById(2)).thenReturn(ddd);
//        when(ddd.get()).thenReturn(list);
        when(movieDetailRepository.findByMovieDbId(request.getMovieDbId())).thenReturn(request);
        when(movieListRepository.save(any(MovieListEntity.class))).thenReturn(list);
        when(movieDetailRepository.save(any(MovieDetailEntity.class))).thenReturn(request);
        ResponseEntity<MovieDetailEntity> response = controller.addMovie(1,2, request);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void CompareTest_NoUser() {
        UserEntity user = new UserEntity();
        MovieListEntity list = new MovieListEntity();
        list.setListName("List 1");
        when(userRepository.existsById(1)).thenReturn(false);
        ResponseEntity<MovieListEntity> response = controller.compareLists(1,1, 2, list);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void CompareTest_NoFirstList() {
        UserEntity user = new UserEntity();
        MovieListEntity list = new MovieListEntity();
        list.setListName("List 1");
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(false);
        ResponseEntity<MovieListEntity> response = controller.compareLists(1,1, 2, list);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void CompareTest_NoSecondList() {
        UserEntity user = new UserEntity();
        MovieListEntity list = new MovieListEntity();
        list.setListName("List 1");
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(true);
        when(movieListRepository.existsById(1)).thenReturn(false);
        ResponseEntity<MovieListEntity> response = controller.compareLists(1,1, 2, list);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void CompareTest_Actual() {
        UserEntity user = new UserEntity();
        MovieListEntity list = new MovieListEntity();
        list.setListName("List 1");
        list.setIsPublic(true);
        MovieListEntity list1 = new MovieListEntity();
        MovieListEntity list2 = new MovieListEntity();
        MovieDetailEntity movie1 = new MovieDetailEntity();
        movie1.setMovieDbId(1);
        MovieDetailEntity movie2 = new MovieDetailEntity();
        movie1.setMovieDbId(2);
        list1.addMovie(movie1);
        list2.addMovie(movie1);
        list2.addMovie(movie2);
        Optional<MovieListEntity> firstList = Optional.of(list1);
        Optional<MovieListEntity> secondList = Optional.of(list2);
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(true);
        when(movieListRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.findById(1)).thenReturn(firstList);
        when(movieListRepository.findById(2)).thenReturn(secondList);
        when(userRepository.findById(1)).thenReturn(user);
        when(movieListRepository.save(any(MovieListEntity.class))).thenReturn(list);
        when(userRepository.save(any(UserEntity.class))).thenReturn(user);
        ResponseEntity<MovieListEntity> response = controller.compareLists(1,1, 2, list);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void test_GetUsers() {
        Set<UserEntity> users = new HashSet<>();
        when(userRepository.findAll()).thenReturn(users);
        ResponseEntity<Set<UserEntity>> response = controller.getUsers();
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void getList_NoUser() {
        when(userRepository.existsById(1)).thenReturn(false);
        ResponseEntity<Set<MovieListEntity>> response = controller.getLists(1);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void getList_AllList() {
        UserEntity user = new UserEntity();
        MovieListEntity list1 = new MovieListEntity();
        MovieListEntity list2 = new MovieListEntity();
        user.addMovieList(list1);
        user.addMovieList(list2);
        when(userRepository.existsById(1)).thenReturn(true);
        when(userRepository.findById(1)).thenReturn(user);
        ResponseEntity<Set<MovieListEntity>> response = controller.getLists(1);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void SingleMovie_NoMovie() {
        when(movieDetailRepository.existsByMovieDbId(1)).thenReturn(false);
        ResponseEntity<Set<MovieListEntity>> response = controller.getSingleMovie(1);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void SingleMovie_MoviePresent() {
        when(movieDetailRepository.existsByMovieDbId(1)).thenReturn(true);
        MovieDetailEntity movie = new MovieDetailEntity();
        when(movieDetailRepository.findByMovieDbId(1)).thenReturn(movie);
        ResponseEntity<Set<MovieListEntity>> response = controller.getSingleMovie(1);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void getMovies_NoUser() {
        UserEntity user = new UserEntity();
        when(userRepository.existsById(1)).thenReturn(false);
        ResponseEntity<MovieDetailEntity> response = controller.getMovies(1,2,3);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void getMovies_NoList() {
        UserEntity user = new UserEntity();
        MovieListEntity list = new MovieListEntity();
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(false);
        ResponseEntity<MovieDetailEntity> response = controller.getMovies(1,2,3);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void getMovies_NoMovies() {
        UserEntity user = new UserEntity();
        MovieListEntity list = new MovieListEntity();
        MovieDetailEntity movie = new MovieDetailEntity();
//        MovieDetailEntity movie1 = new MovieDetailEntity();
//        movie1.setTutorialId(1);
//        MovieDetailEntity movie2 = new MovieDetailEntity();
//        movie1.setTutorialId(2);
//        list.addMovie(movie1);
//        list.addMovie(movie2);
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(true);
        when(movieDetailRepository.existsById(3)).thenReturn(false);
        ResponseEntity<MovieDetailEntity> response = controller.getMovies(1,2,3);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void getMovies_ExistsMovie() {
        UserEntity user = new UserEntity();
        MovieListEntity list = new MovieListEntity();
        MovieDetailEntity movie = new MovieDetailEntity();
        MovieDetailEntity movie1 = new MovieDetailEntity();
        movie1.setTutorialId(1);
        MovieDetailEntity movie2 = new MovieDetailEntity();
        movie1.setTutorialId(2);
        Optional<MovieListEntity> ddd = Optional.of(list);
        list.addMovie(movie1);
        list.addMovie(movie2);
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(true);
        when(movieDetailRepository.existsById(2)).thenReturn(true);
        when(movieListRepository.findById(2)).thenReturn(ddd);
        ResponseEntity<MovieDetailEntity> response = controller.getMovies(1,2,2);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void getMovies_NotExists() {
        UserEntity user = new UserEntity();
        MovieListEntity list = new MovieListEntity();
        MovieDetailEntity movie = new MovieDetailEntity();
        MovieDetailEntity movie1 = new MovieDetailEntity();
        movie1.setTutorialId(1);
        MovieDetailEntity movie2 = new MovieDetailEntity();
        movie1.setTutorialId(2);
        Optional<MovieListEntity> ddd = Optional.of(list);
        list.addMovie(movie1);
        list.addMovie(movie2);
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(true);
        when(movieDetailRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.findById(2)).thenReturn(ddd);
        Set<MovieDetailEntity> set = ddd.get().getMovie();
        ResponseEntity<MovieDetailEntity> response = controller.getMovies(1,2,1);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void GetMovies_NoUser() {
        when(userRepository.existsById(1)).thenReturn(false);
        ResponseEntity<Set<MovieDetailEntity>> response = controller.getMovies(1,2);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void GetMovies_NoList() {
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(false);
        ResponseEntity<Set<MovieDetailEntity>> response = controller.getMovies(1,2);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void GetMovies_ListPresent() {
        MovieListEntity list = new MovieListEntity();
        Optional<MovieListEntity> ddd = Optional.of(list);
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(true);
        when(movieListRepository.findById(2)).thenReturn(ddd);
        ResponseEntity<Set<MovieDetailEntity>> response = controller.getMovies(1,2);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void UpdateList_NoUser() {
        when(userRepository.existsById(1)).thenReturn(false);
        ResponseEntity<String> response = controller.changeListName(1,2, "daniel");
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void UpdateList_NoList() {
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(false);
        ResponseEntity<String> response = controller.changeListName(1,2, "daniel");
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void UpdateList_ListPresent() {
        MovieListEntity list = new MovieListEntity();
        Optional<MovieListEntity> ddd = Optional.of(list);
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(true);
        when(movieListRepository.findById(2)).thenReturn(ddd);
        when(movieListRepository.save(any(MovieListEntity.class))).thenReturn(list);
        ResponseEntity<String> response = controller.changeListName(1,2, "daniel");
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void DeleteList_NoUser() {
        when(userRepository.existsById(1)).thenReturn(false);
        ResponseEntity<HttpStatus> response = controller.removeList(1,2);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void DeleteList_NoMovie() {
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(false);
        ResponseEntity<HttpStatus> response = controller.removeList(1,2);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void DeleteList_ListExists() {
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(true);
        ResponseEntity<HttpStatus> response = controller.removeList(1,2);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void DeleteMovie_NoUser() {
        when(userRepository.existsById(1)).thenReturn(false);
        ResponseEntity<MovieListEntity> response = controller.removeMovie(1,2, 3);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void DeleteMovie_NoList() {
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(false);
        ResponseEntity<MovieListEntity> response = controller.removeMovie(1,2, 3);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void DeleteMovie_NoMovie() {
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(true);
        when(movieDetailRepository.existsByMovieDbId(3)).thenReturn(false);
        ResponseEntity<MovieListEntity> response = controller.removeMovie(1,2, 3);
        assertEquals(HttpStatus.EXPECTATION_FAILED, response.getStatusCode());
    }

    @Test
    public void DeleteMovie_Final() {
        MovieListEntity list = new MovieListEntity();
        MovieDetailEntity movie1 = new MovieDetailEntity();
        MovieDetailEntity movie2 = new MovieDetailEntity();
        movie1.setMovieDbId(1);
        movie2.setMovieDbId(3);
        list.addMovie(movie1);
        list.addMovie(movie2);
        when(userRepository.existsById(1)).thenReturn(true);
        when(movieListRepository.existsById(2)).thenReturn(true);
        when(movieDetailRepository.existsByMovieDbId(3)).thenReturn(true);
        Optional<MovieListEntity> ddd = Optional.of(list);
        when(movieListRepository.findById(2)).thenReturn(ddd);
        when(movieListRepository.save(any(MovieListEntity.class))).thenReturn(list);
        ResponseEntity<MovieListEntity> response = controller.removeMovie(1,2, 3);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

//
//    @Test
//    public void DeleteMovie_MovieExists() {
//        when(userRepository.existsById(1)).thenReturn(true);
//        when(movieListRepository.existsById(2)).thenReturn(true);
//        when(movieDetailRepository.existsById(3)).thenReturn(true);
//        ResponseEntity<HttpStatus> response = controller.removeMovie(1,2, 3);
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//    }




}
