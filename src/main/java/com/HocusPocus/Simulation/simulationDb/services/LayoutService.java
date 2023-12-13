package com.HocusPocus.Simulation.simulationDb.services;

import com.HocusPocus.Simulation.simulationDb.SimulationResults;
import com.HocusPocus.Simulation.simulationDb.controller.LayoutController;
import com.HocusPocus.Simulation.simulationDb.models.Layout;
import com.HocusPocus.Simulation.simulationDb.models.LayoutId;
import com.HocusPocus.Simulation.simulationDb.models.RuleSetWithRules;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Optional;
@Service
public class LayoutService {
    @Autowired
    private WebClient webClient;

    public List<Layout> getAllLayouts() {
        return this.webClient.get()
                .uri("http://localhost:9003/api/layouts/all")
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Layout>>() {})
                .block();
    }

    public Optional<Layout> getLayoutsById(Long id) {
        return Optional.ofNullable(this.webClient.get()
                .uri("http://localhost:9003/api/layouts/{id}", id)
                .retrieve()
                .bodyToMono(Layout.class)  // Change to Layout class here
                .block());
    }
   // public Optional<Layout> getLayoutsById(Long id) {
    //    return getLayoutsById(
   // }
}
