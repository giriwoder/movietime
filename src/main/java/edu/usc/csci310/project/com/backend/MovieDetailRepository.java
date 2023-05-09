package edu.usc.csci310.project.com.backend;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface MovieDetailRepository extends CrudRepository<MovieDetailEntity, Integer>{
    MovieDetailEntity findByPlot(String plot);

    MovieDetailEntity findByMovieDbId (long movieDbID);

    boolean existsByMovieDbId(long movieDbID);

}
