//package edu.usc.csci310.project;
//
//import io.cucumber.java.After;
//import io.cucumber.java.en.And;
//import io.cucumber.java.en.Given;
//import io.cucumber.java.en.Then;
//import io.cucumber.java.en.When;
//import org.openqa.selenium.Alert;
//import org.openqa.selenium.By;
//import org.openqa.selenium.WebDriver;
//import org.openqa.selenium.chrome.ChromeDriver;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//import io.cucumber.java.Before;
//import io.github.bonigarcia.wdm.WebDriverManager;
//import org.openqa.selenium.chrome.ChromeOptions;
//
//
//
//public class UserListStepDef {
//
//    private static final String ROOT_URL = "http://localhost:8080/";
//    private WebDriver driver;
//
////    @BeforeAll
////    public static void beforeAll() {
////        System.out.println("Setting Up Cucumber Driver");
////        WebDriverManager.chromedriver().setup();
////    }
//
//    @Before
//    public void before() {
//        System.out.println("Setting Up Cucumber Driver");
//        WebDriverManager.chromedriver().setup();
//        ChromeOptions options = new ChromeOptions();
//        options.addArguments("--headless");
//        options.addArguments("--whitelisted-ips");
//        options.addArguments("--no-sandbox");
//        options.addArguments("--disable-extensions");
//        options.addArguments("--remote-allow-origins=*");
//        driver = new ChromeDriver(options);
//    }
//
//
//    @Given("I on the user list page right now")
//    public void iOnTheUserListPage() {
//        driver.get(ROOT_URL+"user");
//    }
//    @When("I click on the add list button")
//    public void iClickOnTheAddListButton() {
//        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/button")).click();
//    }
//
//    @And("I press enter into my text field {string}")
//    public void iPressEnterIntoMyTextField(String arg0) {
//        driver.findElement(By.xpath("/html/body/div[3]/div/div/div[2]/form/label/input")).sendKeys(arg0);
//        driver.findElement(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")).click();
//    }
//
//    @Then("I should see a pop up that says {string}")
//    public void iShouldSeeAPopUpThatSays(String arg0) {
//        Alert alert = driver.switchTo().alert();
//        String alerttext = alert.getText();
//        assertEquals(alerttext, arg0);
//        System.out.println(alerttext);
//    }
//    @After
//    public void after() {
//        driver.quit();
//    }
//}
