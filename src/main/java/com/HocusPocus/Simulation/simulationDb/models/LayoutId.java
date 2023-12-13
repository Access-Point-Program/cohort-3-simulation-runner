package com.HocusPocus.Simulation.simulationDb.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
public class LayoutId {
    

    @JsonProperty("layout_id")
    
    public Long id;
    public String name; 

    @JsonProperty("creation_date")
    public String creationDate;
}
