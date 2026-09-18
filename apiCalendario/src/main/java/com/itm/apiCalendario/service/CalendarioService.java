package com.itm.apiCalendario.service;

import com.itm.apiCalendario.dto.FestivoDTO;
import com.itm.apiCalendario.model.Calendario;
import com.itm.apiCalendario.model.Tipo;
import com.itm.apiCalendario.repository.CalendarioRepository;
import com.itm.apiCalendario.repository.TipoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class CalendarioService {

    private static final String[] DIAS_SEMANA = {
        "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"
    };

    private final CalendarioRepository calendarioRepository;
    private final TipoRepository tipoRepository;
    private final FestivoClienteService festivoClienteService;

    public CalendarioService(CalendarioRepository calendarioRepository,
                              TipoRepository tipoRepository,
                              FestivoClienteService festivoClienteService) {
        this.calendarioRepository = calendarioRepository;
        this.tipoRepository = tipoRepository;
        this.festivoClienteService = festivoClienteService;
    }

    @Transactional
    public boolean generar(int anio) {
        List<FestivoDTO> festivos = festivoClienteService.obtenerFestivos(anio);

        Set<LocalDate> fechasFestivas = new HashSet<>();
        for (FestivoDTO f : festivos) {
            fechasFestivas.add(LocalDate.parse(f.getFecha()));
        }

        LocalDate inicio = LocalDate.of(anio, 1, 1);
        LocalDate fin = LocalDate.of(anio, 12, 31);

        // Borra lo que ya existiera de ese anio, para poder regenerarlo
        calendarioRepository.deleteByFechaBetween(inicio, fin);

        Tipo tipoLaboral = obtenerOCrearTipo("Dia laboral");
        Tipo tipoFinDeSemana = obtenerOCrearTipo("Fin de Semana");
        Tipo tipoFestivo = obtenerOCrearTipo("Dia festivo");

        List<Calendario> dias = new ArrayList<>();
        LocalDate fecha = inicio;

        while (!fecha.isAfter(fin)) {
            Tipo tipo;

            if (fechasFestivas.contains(fecha)) {
                tipo = tipoFestivo;
            } else if (fecha.getDayOfWeek() == DayOfWeek.SATURDAY
                    || fecha.getDayOfWeek() == DayOfWeek.SUNDAY) {
                tipo = tipoFinDeSemana;
            } else {
                tipo = tipoLaboral;
            }

            Calendario c = new Calendario();
            c.setFecha(fecha);
            c.setTipo(tipo);
            c.setDescripcion(DIAS_SEMANA[fecha.getDayOfWeek().getValue() - 1]);
            dias.add(c);

            fecha = fecha.plusDays(1);
        }

        calendarioRepository.saveAll(dias);
        return true;
    }

    @Transactional(readOnly = true)
    public List<Calendario> listar(int anio) {
        LocalDate inicio = LocalDate.of(anio, 1, 1);
        LocalDate fin = LocalDate.of(anio, 12, 31);
        return calendarioRepository.findByFechaBetweenOrderByFechaAsc(inicio, fin);
    }

    private Tipo obtenerOCrearTipo(String nombre) {
        return tipoRepository.findByTipo(nombre)
                .orElseGet(() -> tipoRepository.save(new Tipo(nombre)));
    }
}