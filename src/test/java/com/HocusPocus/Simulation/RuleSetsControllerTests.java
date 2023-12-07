package com.HocusPocus.Simulation;

import com.HocusPocus.Simulation.simulationDb.models.RuleSet;
import com.HocusPocus.Simulation.simulationDb.services.RuleSetsService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.apache.http.HttpHeaders;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class RuleSetsControllerTests {

    private static MockWebServer mockWebServer;

    @LocalServerPort
    private Integer port;

    @Autowired
    private WebClient webClient;


    @Before
    public void beforeEach() throws IOException {
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = this.port;
        mockWebServer = new MockWebServer();
        // 8080 is used because that is the port for the rules API
        mockWebServer.start(8080);
    }

    @After
    public void afterEach() throws IOException {
        mockWebServer.shutdown();
    }

    @Test
    public void whenGetAllRuleSets_thenRespondWith200() {
        given()
                .when().get("/ruleset")
                .then().statusCode(200);
    }

    @Test
    public void whenGetAllRuleSetsIsCalled_thenItReturnsTheExpectedValues() throws JsonProcessingException {
        RuleSet mock1 = new RuleSet();
        mock1.id = 1L;
        mock1.name = "Bilbo";
        mock1.creationDate = "10/25/2023";

        RuleSet mock2 = new RuleSet();
        mock2.id = 2L;
        mock2.name = "Carol";
        mock2.creationDate = "10/25/3023";

        mockWebServer.enqueue(new MockResponse()
                .addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .setBody(new ObjectMapper().writeValueAsString(List.of(mock1, mock2)))
        );

        given()
                .when().get("/ruleset")
                .then()
                .body("[0]", hasEntry("id", 1))
                .body("[0]", hasEntry("name", "Bilbo"))
                .body("[0]", hasEntry("creationDate", "10/25/2023"))
                .body("[1]", hasEntry("id", 2))
                .body("[1]", hasEntry("name", "Carol"))
                .body("[1]", hasEntry("creationDate", "10/25/3023"));
    }

    @Test
    public void getRuleSetById() {
        Long getRuleSetById = 1L;
        given()
                .pathParam("id", getRuleSetById)
                .when().get("/ruleset/{id}")
                .then().statusCode(204);
    }
}