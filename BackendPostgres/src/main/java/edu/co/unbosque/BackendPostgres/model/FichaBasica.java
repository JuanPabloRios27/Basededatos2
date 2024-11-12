package edu.co.unbosque.BackendPostgres.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Date;

@Entity
@Table(name = "ficha_basica")
public class FichaBasica {
    @Id
    private long id;
    private String nombre;
    private int edad;
    private String posicion;
    private String club;
    private long valor;
    private Date fechaNacimiento;
    private String foto;
    private String pais;
    private String goles;
    private String asistencias;
    private String partidosJugados;
    private String minutosJugados;
    private String tarjetasAmarillas;
    private String tarjetasRojas;

    public FichaBasica(long id, String nombre, int edad, String posicion, String club, long valor, Date fechaNacimiento, String foto, String pais, String goles, String asistencias, String partidosJugados, String minutosJugados, String tarjetasAmarillas, String tarjetasRojas) {
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.posicion = posicion;
        this.club = club;
        this.valor = valor;
        this.fechaNacimiento = fechaNacimiento;
        this.foto = foto;
        this.pais = pais;
        this.goles = goles;
        this.asistencias = asistencias;
        this.partidosJugados = partidosJugados;
        this.minutosJugados = minutosJugados;
        this.tarjetasAmarillas = tarjetasAmarillas;
        this.tarjetasRojas = tarjetasRojas;
    }

    public FichaBasica() {

    }

    public long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public int getEdad() {
        return edad;
    }

    public String getPosicion() {
        return posicion;
    }

    public String getClub() {
        return club;
    }

    public long getValor() {
        return valor;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public String getFoto() {
        return foto;
    }

    public String getPais() {
        return pais;
    }

    public String getGoles() {
        return goles;
    }

    public String getAsistencias() {
        return asistencias;
    }

    public String getPartidosJugados() {
        return partidosJugados;
    }

    public String getMinutosJugados() {
        return minutosJugados;
    }

    public String getTarjetasAmarillas() {
        return tarjetasAmarillas;
    }

    public String getTarjetasRojas() {
        return tarjetasRojas;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public void setPosicion(String posicion) {
        this.posicion = posicion;
    }

    public void setClub(String club) {
        this.club = club;
    }

    public void setValor(long valor) {
        this.valor = valor;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public void setGoles(String goles) {
        this.goles = goles;
    }

    public void setAsistencias(String asistencias) {
        this.asistencias = asistencias;
    }

    public void setPartidosJugados(String partidosJugados) {
        this.partidosJugados = partidosJugados;
    }

    public void setMinutosJugados(String minutosJugados) {
        this.minutosJugados = minutosJugados;
    }

    public void setTarjetasAmarillas(String tarjetasAmarillas) {
        this.tarjetasAmarillas = tarjetasAmarillas;
    }

    public void setTarjetasRojas(String tarjetasRojas) {
        this.tarjetasRojas = tarjetasRojas;
    }
}
