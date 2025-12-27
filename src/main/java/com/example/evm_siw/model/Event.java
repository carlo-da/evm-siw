package com.example.evm_siw.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Il titolo è obbligatorio") // Validazione
    @Size(max = 100, message = "Il titolo non può superare i 100 caratteri")
    @Column(nullable = false, length = 100)
    private String title;

    @Size(max = 500, message = "La descrizione è troppo lunga")
    @Column(length = 500)
    private String description;

    @NotNull(message = "La data di inizio è obbligatoria")//Validazione
    @Column(name = "start_date_time", nullable = false)
    private LocalDateTime startDateTime;

    @NotNull(message = "La data di fine è obbligatoria")//Validazione
    @Column(name = "end_date_time", nullable = false)
    private LocalDateTime endDateTime;

    @NotBlank(message = "Il luogo è obbligatorio")//Validazione
    private String location;

    // Campo extra per l'immagine, salvata come l'URL di un'immagine esterna o il nome del file
    @Column(name = "image_url")
    private String imageUrl;

    // Costruttore vuoto
    public Event() {}

    // Costruttore con parametri
    public Event(String title, String description, LocalDateTime startDateTime, LocalDateTime endDateTime, String location, String imageUrl) {
        this.title = title;
        this.description = description;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.location = location;
        this.imageUrl = imageUrl;
    }

    // --- GETTERS E SETTERS ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getStartDateTime() { return startDateTime; }
    public void setStartDateTime(LocalDateTime startDateTime) { this.startDateTime = startDateTime; }

    public LocalDateTime getEndDateTime() { return endDateTime; }
    public void setEndDateTime(LocalDateTime endDateTime) { this.endDateTime = endDateTime; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}

