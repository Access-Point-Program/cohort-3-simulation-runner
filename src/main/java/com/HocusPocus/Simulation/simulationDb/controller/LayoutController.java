package com.HocusPocus.Simulation.simulationDb.controller;

import com.HocusPocus.Simulation.simulationDb.models.Layout;
import com.HocusPocus.Simulation.simulationDb.services.LayoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="/layout")
public class LayoutController {
    @Autowired
    LayoutService layoutService;

    @GetMapping
    public ResponseEntity<List<Layout>> getAllLayouts() {
        return ResponseEntity.ok().body(this.layoutService.getAllLayouts());
    }
}
