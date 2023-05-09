package edu.usc.csci310.project.com.backend;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

public class MovieListTest {
    MovieListEntity list = new MovieListEntity();

    @Test
    void test_setter() {
        list.setListId(1);
        list.setListName("daniel");
        list.setIsPublic(true);
    }

    @Test
    void test_getter() {
        list.getListId();
        list.getMovie();
        list.getListName();
        list.getIsPublic();
        UserEntity user = new UserEntity();
        list.setUser(user);
        MovieDetailEntity movie = new MovieDetailEntity();
        list.addMovie(movie);
        list.deleteMovie(movie);
    }
}
