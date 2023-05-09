package edu.usc.csci310.project.com.backend;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, Integer>
{
    UserEntity findByEmail(String email);

    UserEntity findById(int id);

    Set<MovieListEntity> findMoviesById(int id);

    Set<UserEntity> findAll();

}