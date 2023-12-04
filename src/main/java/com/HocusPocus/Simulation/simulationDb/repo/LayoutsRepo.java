package com.HocusPocus.Simulation.simulationDb.repo;

import com.HocusPocus.Simulation.simulationDb.models.Layout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LayoutsRepo extends JpaRepository<Layout, Long> {
}
