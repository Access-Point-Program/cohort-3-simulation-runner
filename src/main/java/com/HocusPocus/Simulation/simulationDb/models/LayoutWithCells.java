package com.HocusPocus.Simulation.simulationDb.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LayoutWithCells {
    
     @JsonProperty("id")
    
     
    public Long id;
    public String name; 

    @JsonProperty("creation_date")
    public String creationDate;

    public int[][] cells;


    public String  direction;
}
