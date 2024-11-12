package edu.co.unbosque.BackendPostgres.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.co.unbosque.BackendPostgres.Services.ProductoServices;
import edu.co.unbosque.BackendPostgres.model.Producto;

@RestController
@RequestMapping("/producto")
public class ProductoREST {
	@Autowired
	private ProductoServices services;
	@GetMapping
	private ResponseEntity<List<Producto>> getAll(){
		return ResponseEntity.ok(services.findAll());
	}
}
