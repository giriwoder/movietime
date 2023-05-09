package edu.usc.csci310.project.com.backend;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "movie_list")
public class MovieListEntity {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int listId;

    @Column
    private String listName;

    @Column
    private boolean publicList;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity user;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
    })
    @JoinTable(name = "list_details",
            joinColumns = { @JoinColumn(name = "listID") },
            inverseJoinColumns = { @JoinColumn(name = "detailID") })
    private Set<MovieDetailEntity> movies = new HashSet<>();

    public void addMovie(MovieDetailEntity movie) {
        this.movies.add(movie);
    }

    public void deleteMovie(MovieDetailEntity movie) {
        this.movies.remove(movie);
    }

    public Set<MovieDetailEntity> getMovie() {
        return this.movies;
    }

    public void setMovie(Set<MovieDetailEntity> movies) {
        this.movies = movies;
    }

    public MovieListEntity() {

    }
    public int getListId()
    {
        return listId;
    }

    public int setListId(int list_id)
    {
        return this.listId = list_id;
    }

    public String getListName()
    {
        return listName;
    }

    public void setListName(String list_name)
    {
        this.listName = list_name;
    }

    public boolean getIsPublic()
    {
        return publicList;
    }

    public void setIsPublic(boolean isPublic)
    {
        this.publicList = isPublic;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }


}
