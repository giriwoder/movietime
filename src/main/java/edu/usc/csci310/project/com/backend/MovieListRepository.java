package edu.usc.csci310.project.com.backend;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface MovieListRepository extends CrudRepository<MovieListEntity, Integer>{
    MovieListEntity findByListName(String listName);

    boolean existsByListName(String name);

    List<MovieListEntity> findAllByPublicList(String isPublic);

}
