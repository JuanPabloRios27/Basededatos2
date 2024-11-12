package edu.co.unbosque.BackendPostgres.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.co.unbosque.BackendPostgres.Services.ProductoEspecificacionesServices;
import edu.co.unbosque.BackendPostgres.model.ProductoEspecificaciones;

@RestController
@RequestMapping("/producto-especificaciones")
public class ProductoEspecificacionesREST {
	@Autowired
	private ProductoEspecificacionesServices services;
	@GetMapping
	private ResponseEntity<List<ProductoEspecificaciones>> getAll(){
		return ResponseEntity.ok(services.findAll());
	}
}
