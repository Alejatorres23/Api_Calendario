package com.itm.apiCalendario.service;

import com.itm.apiCalendario.dto.FestivoDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class FestivoClienteService {

    @Value("${festivos.api.url}")
    private String festivosApiUrl;

    private final RestTemplate restTemplate;

    public FestivoClienteService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<FestivoDTO> obtenerFestivos(int anio) {
        String url = festivosApiUrl + "/obtener/" + anio;
        FestivoDTO[] festivos = restTemplate.getForObject(url, FestivoDTO[].class);
        return festivos != null ? Arrays.asList(festivos) : new ArrayList<>();
    }
}
