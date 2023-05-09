package edu.usc.csci310.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Controller
@SpringBootApplication
@ComponentScan(basePackages = {"edu.usc.csci310.project.com.backend"})
@EnableJpaRepositories("edu.usc.csci310.project.com.backend")
@EntityScan("edu.usc.csci310.project.com.backend")
public class SpringBootAPI {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootAPI.class, args);
    }

    @RequestMapping(value = "{_:^(?!index\\.html|api).*$}")
    public String redirect() {
        // Forward to home page so that route is preserved.(i.e forward:/index.html)
        return "forward:/";
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
