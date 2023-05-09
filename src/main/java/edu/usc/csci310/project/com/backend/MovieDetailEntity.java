package edu.usc.csci310.project.com.backend;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

// post/userid/listid/movies {moviedetail request body}
// ensure that user exists
// findByListID -> list entity
// save MovieEntity
// list entity save with movie

@Entity
@Table(name = "movie_details")
public class MovieDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tutorialId;

    @Column
    private long movieDbId;

    @Column
    private String picture;

    @Column
    private String title;

    @Column(length=6000)
    private String plot;

    @Column
    private String genre;

    @Column(length=6000)
    private String studio;

    @Column(length=8000)
    private String actors;

    @Column(length=6000)
    private String directors;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "movies")
    @JsonIgnore
    private Set<MovieListEntity> lists = new HashSet<>();

    public MovieDetailEntity() {

    }
    public int GetTutorialId()
    {
        return tutorialId;
    }

    public void setTutorialId(int tutorial_id)
    {
        this.tutorialId = tutorial_id;
    }

    public String getPicture()
    {
        return this.picture;
    }

    public void setPicture(String picture)
    {
        this.picture = picture;
    }

    public String getTitle()
    {
        return this.title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public String getPlot()
    {
        return this.plot;
    }

    public void setPlot(String plot)
    {
        this.plot = plot;
    }

    public String getGenre()
    {
        return this.genre;
    }

    public void setGenre(String genre)
    {
        this.genre = genre;
    }

    public String getStudio()
    {
        return this.studio;
    }

    public void setStudio(String studio)
    {
        this.studio = studio;
    }

    public String getActors()
    {
        return this.actors;
    }

    public void setActors(String actors)
    {
        this.actors = actors;
    }
    public String getDirectors()
    {
        return this.directors;
    }

    public void setDirectors(String directors)
    {
        this.directors = directors;
    }

    public long getMovieDbId()
    {
        return this.movieDbId;
    }

    public void setMovieDbId(long id)
    {
        this.movieDbId = id;
    }

    public String getDirector()
    {
        return this.directors;
    }

    public void setDirector(String director)
    {
        this.directors = director;
    }

    public Set<MovieListEntity> GetMoviesLists() {
        return lists;
    }

    public void addMovies(MovieListEntity list) {
        lists.add((list));
    }

}