package com.example.evm_siw.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.evm_siw.model.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    
    List<Event> findByStartDateTimeBetween(LocalDateTime start, LocalDateTime end);

    // Nuovo metodo: Trova tra 2 date e ORDINA per data d'inizio crescente
    List<Event> findByStartDateTimeBetweenOrderByStartDateTimeAsc(LocalDateTime start, LocalDateTime end);

    List<Event> findAllByOrderByStartDateTimeAsc();

}
