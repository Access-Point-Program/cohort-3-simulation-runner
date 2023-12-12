package com.HocusPocus.Simulation.simulationDb.services;

import com.HocusPocus.Simulation.simulationDb.models.RuleSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class RuleSetsService {
    @Autowired
    private WebClient webClient;

    public List<RuleSet> getAllRuleSets() {
        return this.webClient.get()
                .uri("http://localhost:9004/ruleset/")
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<RuleSet>>() {})
                .block();
    }
                            //or (Long ruleSetId)
    public RuleSet getRuleSetById(Long Id) {
        return this.webClient.get()                    // or ruleSetId check which one it is 
                .uri("http://localhost:9004/ruleset/{id}", Id)
                .retrieve()
                .bodyToMono(RuleSet.class)
                .block();
    }
}


