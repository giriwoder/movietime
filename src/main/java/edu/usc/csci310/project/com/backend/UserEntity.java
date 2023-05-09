package edu.usc.csci310.project.com.backend;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

//mark class as an Entity
//defining class name as Table name
@Entity
@Table(name = "app_users")
public class UserEntity
{
    //mark id as primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;
    //defining name as column name
    @Column(unique = true)
    private String email;
    //defining age as column name
    @Column
    private String password;

    @OneToMany(mappedBy = "user")
    private Set<MovieListEntity> movieLists = new HashSet<>();
    //defining email as column name
    public int getId()
    {
        return id;
    }
    public void setId(int id)
    {
        this.id = id;
    }
    public String getPassword()
    {
        return password;
    }
    public void setPassword(String password)
    {
        this.password = password;
    }
    public String getEmail()
    {
        return email;
    }
    public void setEmail(String email)
    {
        this.email = email;
    }

    public Set<MovieListEntity> getLists() {
        return this.movieLists;
    }

    public void addMovieList(MovieListEntity movie_list) {
        this.movieLists.add(movie_list);
    }
}