package edu.usc.csci310.project.com.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieDetailService {
    @Autowired
    MovieDetailRepository movie_detail_repository;

}
