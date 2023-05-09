package edu.usc.csci310.project.com.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieListService {
    @Autowired
    MovieListRepository movie_list_repository;
}
