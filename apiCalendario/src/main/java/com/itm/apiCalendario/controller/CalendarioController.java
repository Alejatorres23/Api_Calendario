package com.itm.apiCalendario.controller;

import com.itm.apiCalendario.model.Calendario;
import com.itm.apiCalendario.service.CalendarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calendario")
public class CalendarioController {

    private final CalendarioService calendarioService;

    public CalendarioController(CalendarioService calendarioService) {
        this.calendarioService = calendarioService;
    }

    @GetMapping("/generar/{anio}")
    public boolean generar(@PathVariable int anio) {
        return calendarioService.generar(anio);
    }

    @GetMapping("/listar/{anio}")
    public List<Calendario> listar(@PathVariable int anio) {
        return calendarioService.listar(anio);
    }
}
