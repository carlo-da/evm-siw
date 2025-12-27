package com.example.evm_siw.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.evm_siw.model.Event;
import com.example.evm_siw.repository.EventRepository;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getEventsForMonth(int year, int month) {
        LocalDateTime start = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime end = start.plusMonths(1).minusSeconds(1); // Fine del mese esatta
        return eventRepository.findByStartDateTimeBetween(start, end);
    }

    public Event saveEvent(Event event) {
        // Qui potremmo aggiungere logica extra in futuro (es. controllo sovrapposizioni)
        return eventRepository.save(event);
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    public List<Event> getUpcomingEvents() {
    LocalDateTime start = LocalDateTime.now().minus(1, ChronoUnit.MINUTES); // Eventi non ancora finiti
    LocalDateTime end = LocalDateTime.now().plus(7, ChronoUnit.DAYS); // Fino a 7 giorni da oggi

    // Riutilizziamo il metodo findByStartDateTimeBetween e ordiniamo per data
    return eventRepository.findByStartDateTimeBetweenOrderByStartDateTimeAsc(start, end);
    }
}
