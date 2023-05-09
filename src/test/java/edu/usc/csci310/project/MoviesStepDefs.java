package edu.usc.csci310.project;

import io.cucumber.java.After;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.Assert.assertTrue;

import io.cucumber.java.Before;
import org.openqa.selenium.chrome.ChromeOptions;

public class MoviesStepDefs {
    private static final String ROOT_URL = "https://localhost:8080/";
    private WebDriver driver;

    @Before
    public void before() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--whitelisted-ips");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-extensions");
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
        System.setProperty("webdriver.chrome.whitelistedIps", "");
    }

    @Given("I am dummy on the movie page")
    public void iAmDummyOnTheMoviePage() {
        System.out.println("HELLO");
        driver.get(ROOT_URL+"movies");
    }


    @Then("I should be on a random page that does not matter")
    public void iShouldBeOnARandomPageThatDoesNotMatter() {
        assertTrue(true);
    }

    @After
    public void after() {
        driver.quit();
    }
}
