package com.HocusPocus.Simulation.simulationDb;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "simulation_results")
public class SimulationResults {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "simulation_results_id")
    private Long id;

    @NotNull
    @Column(name = "ruleset_id")
    private Long rulesetId;

    @NotNull
    @Column(name = "layout_id")
    private Long layoutId;

    @NotNull
    @Min(1)
    @Column(name = "max_iterations")
    private int maxIterations;

    @NotNull
    @Min(1)
    @Column(name = "actual_iterations")
    private int actualIterations;


    @CreationTimestamp
    @Column(name = "created_date")
    private Timestamp creationDate;

    @NotNull
    private boolean pass;

}