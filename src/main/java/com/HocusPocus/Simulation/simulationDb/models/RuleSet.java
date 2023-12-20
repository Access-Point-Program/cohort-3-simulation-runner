package com.HocusPocus.Simulation.simulationDb.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RuleSet {
    public Long id;
    public String name;
    
    @JsonProperty("creation_date")
    public String creationDate;
}