package com.itm.apiCalendario.repository;

import com.itm.apiCalendario.model.Calendario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface CalendarioRepository extends JpaRepository<Calendario, Long> {
    List<Calendario> findByFechaBetweenOrderByFechaAsc(LocalDate inicio, LocalDate fin);
    void deleteByFechaBetween(LocalDate inicio, LocalDate fin);
}