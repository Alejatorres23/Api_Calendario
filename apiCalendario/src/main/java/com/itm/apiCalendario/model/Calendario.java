package com.itm.apiCalendario.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "calendario")
public class Calendario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate fecha;

    @ManyToOne
    @JoinColumn(name = "id_tipo", nullable = false)
    private Tipo tipo;

    @Column(nullable = false)
    private String descripcion;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }

    public Tipo getTipo() { return tipo; }
    public void setTipo(Tipo tipo) { this.tipo = tipo; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
}
