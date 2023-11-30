package com.HocusPocus.Simulation.simulationDb;

import com.HocusPocus.Simulation.simulationDb.models.Layout;
import jakarta.persistence.*;

@Entity
@Table(name = "results")
public class SimulationResults {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private  String name;

    private int maxIterations;
    private int actualIterations;
    private boolean pass;

    // Constructors, Getters, and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getMaxIterations() {
        return maxIterations;
    }

    public void setMaxIterations(int maxIterations) {
        this.maxIterations = maxIterations;
    }

    public int getActualIterations() {
        return actualIterations;
    }

    public void setActualIterations(int actualIterations) {
        this.actualIterations = actualIterations;
    }

    public boolean getPass() {
        return pass;
    }

    public void setPass(boolean pass) {
        this.pass = pass;
    }
}