package edu.usc.csci310.project.com.backend;

import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

public class MovieDetailTest {
    MovieDetailEntity movieDetail = new MovieDetailEntity();

    @Test
    void test_setters() {
        movieDetail.setTutorialId(1);
        movieDetail.setPlot("plot");
        movieDetail.setStudio("studio");
        movieDetail.setTitle("Title");
        movieDetail.setMovieDbId(1);
        movieDetail.setPicture("picture");
        movieDetail.setActors("Actors");
        movieDetail.setGenre("Genre");
        movieDetail.setDirector("james");
    }
    @Test
    void test_getters() {
        MovieListEntity list = new MovieListEntity();
        movieDetail.addMovies(list);
        movieDetail.GetMoviesLists();
        movieDetail.getMovieDbId();
        movieDetail.getActors();
        movieDetail.getGenre();
        movieDetail.getPicture();
        movieDetail.getStudio();
        movieDetail.getTitle();
        movieDetail.getPlot();
        movieDetail.getDirector();
        movieDetail.GetTutorialId();
    }
}
