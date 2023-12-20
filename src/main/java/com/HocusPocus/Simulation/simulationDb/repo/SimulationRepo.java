package com.HocusPocus.Simulation.simulationDb.repo;

import com.HocusPocus.Simulation.simulationDb.SimulationResults;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SimulationRepo extends JpaRepository<SimulationResults, Long> {
}
