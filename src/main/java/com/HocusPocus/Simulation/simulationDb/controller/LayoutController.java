package com.HocusPocus.Simulation.simulationDb.controller;

import com.HocusPocus.Simulation.simulationDb.models.Layout;
import com.HocusPocus.Simulation.simulationDb.services.LayoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController //changed layout to layouts 
@RequestMapping(path="/layouts")
public class LayoutController {
    @Autowired
    LayoutService layoutService;

    @GetMapping
    public ResponseEntity<List<Layout>> getAllLayouts() {
        return ResponseEntity.ok()
                .body(this.layoutService.getAllLayouts());
    }

}
