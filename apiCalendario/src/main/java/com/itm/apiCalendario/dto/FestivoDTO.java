package com.itm.apiCalendario.dto;

// Representa la respuesta de la API de Festivos: { "festivo": "...", "fecha": "yyyy-MM-dd" }
public class FestivoDTO {

    private String festivo;
    private String fecha;

    public String getFestivo() { return festivo; }
    public void setFestivo(String festivo) { this.festivo = festivo; }

    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }
}