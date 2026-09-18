package com.itm.apiCalendario.repository;

import com.itm.apiCalendario.model.Tipo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TipoRepository extends JpaRepository<Tipo, Long> {
    Optional<Tipo> findByTipo(String tipo);
}