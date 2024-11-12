package edu.co.unbosque.BackendPostgres.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="producto_especificaciones")
public class ProductoEspecificaciones {
    @Id
    private Long id;
    private long id_producto;
    private String especificacion;
    private String caducidad;
    private String codigoNacional;
    private String entidad;
    private String condiciones;
    private String precauciones;
    private String contraindicaciones;

    public ProductoEspecificaciones() {
    }

    public ProductoEspecificaciones(Long id, long id_producto, String especificacion, String caducidad, String codigoNacional, String entidad, String condiciones, String precauciones, String contraindicaciones) {
        this.id = id;
        this.id_producto = id_producto;
        this.especificacion = especificacion;
        this.caducidad = caducidad;
        this.codigoNacional = codigoNacional;
        this.entidad = entidad;
        this.condiciones = condiciones;
        this.precauciones = precauciones;
        this.contraindicaciones = contraindicaciones;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getId_producto() {
        return id_producto;
    }

    public void setId_producto(long id_producto) {
        this.id_producto = id_producto;
    }

    public String getEspecificacion() {
        return especificacion;
    }

    public void setEspecificacion(String especificacion) {
        this.especificacion = especificacion;
    }

    public String getCaducidad() {
        return caducidad;
    }

    public void setCaducidad(String caducidad) {
        this.caducidad = caducidad;
    }

    public String getCodigoNacional() {
        return codigoNacional;
    }

    public void setCodigoNacional(String codigoNacional) {
        this.codigoNacional = codigoNacional;
    }

    public String getEntidad() {
        return entidad;
    }

    public void setEntidad(String entidad) {
        this.entidad = entidad;
    }

    public String getCondiciones() {
        return condiciones;
    }

    public void setCondiciones(String condiciones) {
        this.condiciones = condiciones;
    }

    public String getPrecauciones() {
        return precauciones;
    }

    public void setPrecauciones(String precauciones) {
        this.precauciones = precauciones;
    }

    public String getContraindicaciones() {
        return contraindicaciones;
    }

    public void setContraindicaciones(String contraindicaciones) {
        this.contraindicaciones = contraindicaciones;
    }
}
