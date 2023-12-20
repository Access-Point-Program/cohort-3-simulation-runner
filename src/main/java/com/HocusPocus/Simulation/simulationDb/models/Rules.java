package com.HocusPocus.Simulation.simulationDb.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Rules {
    public Long id;
    public Float priority;
    
    @JsonProperty("event_type")
    public String eventtype;
}
/*"id": 32,
        "priority": 3.0,
        "event_type": "RIGHT",
        "conditions": */ 