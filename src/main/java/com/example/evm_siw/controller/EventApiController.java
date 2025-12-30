package com.example.evm_siw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.evm_siw.model.Event;
import com.example.evm_siw.service.EventService;

@RestController // Nota: RestController converte automaticamente in JSON
@RequestMapping("/api/events")
public class EventApiController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public List<Event> getEvents(@RequestParam(required = false) Integer year, 
                                 @RequestParam(required = false) Integer month) {
        if (year != null && month != null) {
            return eventService.getEventsForMonth(year, month);
        }
        return eventService.getAllEvents();
    }
}