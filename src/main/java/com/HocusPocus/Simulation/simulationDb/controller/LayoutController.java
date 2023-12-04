package com.HocusPocus.Simulation.simulationDb.controller;

import com.HocusPocus.Simulation.simulationDb.models.Layout;
import com.HocusPocus.Simulation.simulationDb.services.LayoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/layout")
public class LayoutController {
    @Autowired
    public LayoutService layoutService;

    @GetMapping
    public List<Layout> getAllLayouts() {
        return layoutService.getAllLayouts();
    }

    @GetMapping("layout/{id}")
    public Optional<Layout> getLayoutsById(@PathVariable Long id) {
        return layoutService.getLayoutsById(id);
    }
}
