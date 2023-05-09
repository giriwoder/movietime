package edu.usc.csci310.project.com.backend;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserServiceTest {

    UserService us = new UserService();
    @Test
    void saveOrUpdate() {
        UserRepository rp = mock(UserRepository.class);
        UserEntity user = new UserEntity();
        user.setEmail("test@email.com");
        user.setPassword("Password1!");
        PasswordEncoder pe = mock(PasswordEncoder.class);
        ReflectionTestUtils.setField(us, "passwordEncoder", pe);
        ReflectionTestUtils.setField(us, "userRepository", rp);
        when(rp.save(user)).thenReturn(user);
        when(pe.encode("Password1!")).thenReturn("encodedPassword1!");
        UserEntity te = us.saveOrUpdate(user);
        assertEquals(te, user);
    }

    @Test
    void getByEmail() {
        UserRepository rp = mock(UserRepository.class);
        UserEntity user = new UserEntity();
        PasswordEncoder pe = mock(PasswordEncoder.class);
        ReflectionTestUtils.setField(us, "passwordEncoder", pe);
        user.setEmail("test@email.com");
        ReflectionTestUtils.setField(us, "userRepository", rp);
        when(rp.findByEmail(user.getEmail())).thenReturn(user);
        UserEntity te = us.getByEmail("test@email.com");
        assertEquals(te, user);
    }

    @Test
    void attemptLogin() {
        UserRepository rp = mock(UserRepository.class);
        UserEntity user = new UserEntity();
        user.setEmail("test@email.com");
        user.setPassword("Password1!");
        PasswordEncoder pe = mock(PasswordEncoder.class);
        ReflectionTestUtils.setField(us, "passwordEncoder", pe);
        ReflectionTestUtils.setField(us, "userRepository", rp);
        when(rp.findByEmail("test@gmail.com")).thenReturn(user);
        when(pe.matches("Password1!", "Password1!")).thenReturn(true);
        UserEntity te = us.attemptLogin("test@gmail.com", "Password1!");
        assertEquals(te.getEmail(), user.getEmail());
    }

    @Test
    void attemptLoginFail() {
        UserRepository rp = mock(UserRepository.class);
        UserEntity user = new UserEntity();
        user.setEmail("test@email.com");
        user.setPassword("Password1!");
        PasswordEncoder pe = mock(PasswordEncoder.class);
        ReflectionTestUtils.setField(us, "passwordEncoder", pe);
        ReflectionTestUtils.setField(us, "userRepository", rp);
        when(rp.findByEmail("test@gmail.com")).thenReturn(user);
        when(pe.matches("Password1!", "Password1!")).thenReturn(false);
        UserEntity te = us.attemptLogin("test@gmail.com", "Password1!");
        assertEquals(te, null);
    }

    @Test
    void attemptLoginFailTwo() {
        UserRepository rp = mock(UserRepository.class);
        UserEntity user = new UserEntity();
        user.setEmail("test@email.com");
        user.setPassword("Password1!");
        PasswordEncoder pe = mock(PasswordEncoder.class);
        ReflectionTestUtils.setField(us, "passwordEncoder", pe);
        ReflectionTestUtils.setField(us, "userRepository", rp);
        when(rp.findByEmail("test@gmail.com")).thenReturn(null);
        UserEntity te = us.attemptLogin("test@gmail.com", "Password1!");
        assertEquals(te, null);
    }
}