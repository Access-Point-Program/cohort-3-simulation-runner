package com.HocusPocus.Simulation.simulationDb.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
public class Layout {
    
    @JsonProperty("layout_id")
    
    public Long id;
    public String name; 

    @JsonProperty("creation_date")
    public String creationDate;


}
