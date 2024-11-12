package edu.co.unbosque.BackendPostgres.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "entidad")
public class Entidad {
	@Id
	private long idEntidad;
	private long NIT;
	
	
}
