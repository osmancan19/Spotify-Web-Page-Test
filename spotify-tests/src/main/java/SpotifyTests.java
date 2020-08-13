import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.*;
import org.testng.Assert;

public class SpotifyTests {

    WebDriver driver;
    Path signInPath;

    @BeforeClass
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "C:/Users/Osmancan/Documents/GitHub/cs458/Project1/spotify-tests/src/main/java/chromedriver.exe");
        driver = new ChromeDriver();

        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.manage().window().maximize();
    }

    @BeforeMethod
    public void before() {
        signInPath = Paths.get("../signin.html");
        driver.get(signInPath.toUri().toString());
    }

    @Test
    public void shouldNotMoveToNextPageIfEmailIsBlank() {
        // Arrange
        WebElement email = driver.findElement(By.id("email"));
        WebElement password = driver.findElement(By.id("password"));
        String fakePassword = "qwertyuiopasdfghjk";

        // Act
        password.sendKeys(fakePassword);
        email.sendKeys(Keys.ENTER);

        // Assert
        String expectedURL = "https://www.spotify.com/us/";
        String actualURL = driver.getCurrentUrl();
        Assert.assertNotEquals(actualURL, expectedURL);
    }

    @Test
    public void shouldNotMoveToNextPageIfPasswordIsBlank() {
        // Arrange
        WebElement email = driver.findElement(By.id("email"));
        WebElement password = driver.findElement(By.id("password"));
        String fakeEmail = "test@test.com";

        // Act
        email.sendKeys(fakeEmail);
        password.sendKeys(Keys.ENTER);

        // Assert
        String expectedURL = "https://www.spotify.com/us/";
        String actualURL = driver.getCurrentUrl();
        Assert.assertNotEquals(actualURL, expectedURL);
    }

    @Test
    public void shouldShowErrorMessageIfSubmittedWhenEmailIsBlank() {
        // Arrange
        WebElement email = driver.findElement(By.id("email"));
        WebElement password = driver.findElement(By.id("password"));
        String fakePassword = "qwertyuiopasdfghjk";

        // Act
        password.sendKeys(fakePassword);
        email.sendKeys(Keys.ENTER);

        // Assert
        String expectedErrorMessage = "Please enter your username or email address.";
        String actualErrorMessage = driver.findElement(By.id("email-error")).getText();
        Assert.assertEquals(expectedErrorMessage, actualErrorMessage);
    }

    @Test
    public void shouldShowErrorMessageIfSubmittedWhenPasswordIsBlank() {
        WebElement email = driver.findElement(By.id("email"));
        WebElement password = driver.findElement(By.id("password"));
        String fakeEmail = "test@test.com";

        // Act
        email.sendKeys(fakeEmail);
        password.sendKeys(Keys.ENTER);

        // Assert
        String expectedErrorMessage = "Please enter your password.";
        String actualErrorMessage = driver.findElement(By.id("password-error")).getText();
        Assert.assertEquals(expectedErrorMessage, actualErrorMessage);
    }

    @Test
    public void shouldGoToHomepageIfRememberMeIsCheckedBefore() throws InterruptedException {
        // Arrange
        WebElement email = driver.findElement(By.id("email"));
        WebElement password = driver.findElement(By.id("password"));
        WebElement rememberMe = driver.findElement(By.id("remember-me"));
        WebElement loginButton = driver.findElement(By.tagName("button"));
        String fakeEmail = "test@test.com";
        String fakePassword = "qwertyuiopasdfghjk";

        // Act
        email.sendKeys(fakeEmail);
        password.sendKeys(fakePassword);
        rememberMe.click();
        loginButton.click();

        driver.get(signInPath.toUri().toString());
        WebDriverWait wait = new WebDriverWait(driver, 20);
        wait.until(ExpectedConditions.urlToBe("https://www.spotify.com/us/"));

        // Assert
        String expectedURL = "https://www.spotify.com/us/";
        String actualURL = driver.getCurrentUrl();
        Assert.assertEquals(actualURL, expectedURL);
    }

    @Test
    public void shouldNavigateToSpotifyIfCredentialsAreValid() {
        // Arrange
        WebElement email = driver.findElement(By.id("email"));
        WebElement password = driver.findElement(By.id("password"));
        WebElement rememberMe = driver.findElement(By.id("remember-me"));
        WebElement loginButton = driver.findElement(By.tagName("button"));
        String fakeEmail = "test@test.com";
        String fakePassword = "qwertyuiopasdfghjk";

        // Act
        email.sendKeys(fakeEmail);
        password.sendKeys(fakePassword);
        rememberMe.click();
        loginButton.click();

        // Assert
        String expectedURL = "https://www.spotify.com/us/";
        String actualURL = driver.getCurrentUrl();
        Assert.assertEquals(actualURL, expectedURL);
    }

    @Test
    public void shouldShowResetPasswordConfirmationMessage() {
        // Arrange
        WebElement forgotPassword = driver.findElement(By.id("forgot-password"));
        String fakeEmail = "test@test.com";

        // Act
        forgotPassword.click();
        driver.findElement(By.id("email")).sendKeys(fakeEmail);
        driver.findElement(By.tagName("button")).click();
        WebDriverWait wait = new WebDriverWait(driver, 20);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("confirmation-info")));

        //Assert
        String expectedMessage = "A message has been sent to you by email with instructions on how to reset your password.";
        String actualMessage = driver.findElement(By.id("confirmation-info")).getText();
        Assert.assertEquals(actualMessage, expectedMessage);
    }

    @AfterClass
    public void tearDown() {
        driver.quit();
    }
    @AfterMethod
    public void clean(){
        driver.close();
        driver = new ChromeDriver();
    }

}
