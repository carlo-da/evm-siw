package com.example.evm_siw.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.evm_siw.service.EventService;

@Controller 
public class PageController {

    @Autowired
    private EventService eventService; 

    @GetMapping("/upcoming")
    public String upcomingEvents(Model model) {
        model.addAttribute("upcomingEvents", eventService.getUpcomingEvents());
        return "upcoming-events"; 
    }

    @GetMapping("/")
    public String calendar() {
        return "calendar"; 
    }

    @GetMapping("/login") 
    public String login() {
        return "login"; 
    }
}