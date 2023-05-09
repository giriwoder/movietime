package edu.usc.csci310.project.com.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


//user_id/list
//user_id/list_id/movie

//user_id/list_id
//user_id_

//creating RestController
@RestController
@RequestMapping("/user")
public class UserController
{
    //autowired the StudentService class
    @Autowired
    UserService userService;

    @GetMapping("/check")
    public ResponseEntity<Integer> checkUserExist(@RequestParam("email") String email,
                                                   @RequestParam("password") String password)
    {
        UserEntity existingUser = userService.attemptLogin(email, password);

        if (existingUser == null) { //did not find someone with that email
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);  //looking at response.status === 417
        }
        return new ResponseEntity<>(existingUser.getId(), HttpStatus.CREATED);
    }

    @PostMapping("/save")
    public ResponseEntity<Integer> saveUser(@RequestBody UserEntity user) {
        UserEntity existingUser = userService.getByEmail(user.getEmail());

        if (existingUser != null) {
            return new ResponseEntity<>(existingUser.getId(), HttpStatus.CONFLICT);
        }
        userService.saveOrUpdate(user);
        return new ResponseEntity<>(user.getId(), HttpStatus.CREATED);
    }
}