package com.HocusPocus.Simulation.simulationDb;

import com.HocusPocus.Simulation.simulationDb.models.Layout;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "simulation_results", schema = "public")
public class SimulationResults {
    @Id
    @Column(name = "simulation_results_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Transient
    private  String name;

    @Column(name = "rule_id")
    private Long ruleId;

    @Column(name = "layout_id")
    private Long layoutId;
    @Column(name = "max_iterations")
    private int maxIterations;
    @Column(name = "actual_iterations")
    private int actualIterations;

    @Column(name = "created_date")
    private Timestamp createdDate;
    private boolean pass;
}