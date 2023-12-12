package com.HocusPocus.Simulation;

import io.restassured.RestAssured;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class RuleSetsControllerTests {

    @Before
    public void beforeEach() {
        // Set the base URI and port for RestAssured
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = 9004; 
    }

    @After
    public void afterEach() {
        // Reset RestAssured configurations if needed
        RestAssured.reset();
    }

    @Test
    public void whenGetAllRuleSets_thenRespondWith200() {
        given()
            .when().get("/rulesets")
            .then().statusCode(200);
    }

    @Test
    public void whenGetAllRuleSetsIsCalled_thenItReturnsTheExpectedValues() {
        given()
            .when().get("/rulesets")
            .then()
            .body("[0]", hasEntry("id", 1))
            .body("[0]", hasEntry("name", "Mock Ruleset 1"))
            .body("[0]", hasEntry("creation_date", "Mon, 01 Nov 2023 20:33:59 GMT"))
            .body("[1]", hasEntry("id", 2))
            .body("[1]", hasEntry("name", "Mock Ruleset 2"))
            .body("[1]", hasEntry("creation_date", "Mon, 02 Nov 2023 20:33:59 GMT"));
    }

    @Test
    public void whenRemoveRuleSetById_thenRespondWith200() {
        int idToRemove = 1;
        given()
            .when().get("/rulesets/" + idToRemove)
            .then().statusCode(200);
    }

    @Test
    public void whenRemoveRuleSetByIdEndpoint_thenItFiltersCorrectly() {
        int idToRemove = 1;
        given()
            .when().get("/rulesets/" + idToRemove)
            .then().statusCode(200);

        given()
            .when().get("/rulesets")
            .then()
            .body("id", not(hasItem(idToRemove)))
            .body("name", not(hasItem("Mock Ruleset " + idToRemove)))
            .body("creation_date", not(hasItem("Mon, 0" + idToRemove + " Nov 2023 20:33:59 GMT")));
    }

    @Test
    public void whenGetRuleSetById_thenRespondWith200() {
        int idToRetrieve = 1;
        given()
            .when().get("/rulesets/" + idToRetrieve)
            .then().statusCode(200);
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
