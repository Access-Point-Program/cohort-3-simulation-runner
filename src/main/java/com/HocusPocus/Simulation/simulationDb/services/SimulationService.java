package com.HocusPocus.Simulation.simulationDb.services;


import com.HocusPocus.Simulation.simulationDb.SimulationResults;
import com.HocusPocus.Simulation.simulationDb.repo.SimulationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SimulationService {
    @Autowired
    private SimulationRepo simulationRepo;

    // Create a new simulation result
    public SimulationResults createSimulationResults(SimulationResults simulationResults) {
        return simulationRepo.save(simulationResults);
    }

    // Get all simulation results
    public List<SimulationResults> getAllSimulationResults() {
        return simulationRepo.findAll();
    }

    // Get result by ID
    public Optional<SimulationResults> getSimulationById(Long id) {
        return simulationRepo.findById(id);
    }

    // Update results
    public SimulationResults updateSimulation(Long id, SimulationResults simulationResultsDetails) {
        Optional<SimulationResults> simulationResults = simulationRepo.findById(id);
        if (simulationResults.isPresent()) {
            SimulationResults existingSimulationResults = simulationResults.get();
            existingSimulationResults.setName(simulationResultsDetails.getName());
            existingSimulationResults.setActualIterations(simulationResultsDetails.getActualIterations());
            return simulationRepo.save(existingSimulationResults);
        }
        return null;
    }

    // Delete all results
    public void deleteAllSimulationResults() {
        simulationRepo.deleteAll();
    }

    // Delete by id
    public void deleteSimulationResults(Long id) {
        simulationRepo.deleteById(id);
    }

}

