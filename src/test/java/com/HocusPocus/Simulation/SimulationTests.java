package com.HocusPocus.Simulation;

import com.HocusPocus.Simulation.simulationDb.SimulationResults;
import com.HocusPocus.Simulation.simulationDb.repo.SimulationRepo;
import io.restassured.RestAssured;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

import static io.restassured.RestAssured.given;
import static org.mockito.Mockito.when;
import static org.hamcrest.Matchers.*;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SimulationTests {
    @LocalServerPort
    private Integer port;

    @MockBean
    private SimulationRepo simulationRepository;

    @Before
    public void before() {
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = this.port;
    }

    @Test
    public void whenGetAllSimulationResultsIsCalled_ThenItReturnsAllSimulationResults() {
        SimulationResults mock1 = new SimulationResults();
        mock1.setId(1L);
        SimulationResults mock2 = new SimulationResults();
        mock2.setId(2L);

        when(this.simulationRepository.findAll()).thenReturn(List.of(mock1, mock2));

        given()
                .when().get("/results")
                .then().statusCode(200)
                .body("[0]", hasEntry("id", 1))
                .body("[1]", hasEntry("id", 2));
    }
}
