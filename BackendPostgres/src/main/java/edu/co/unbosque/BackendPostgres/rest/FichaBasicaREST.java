package edu.co.unbosque.BackendPostgres.rest;

import edu.co.unbosque.BackendPostgres.Services.FichaBasicaServices;
import edu.co.unbosque.BackendPostgres.model.FichaBasica;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/fichas")
public class FichaBasicaREST {
    @Autowired
    private FichaBasicaServices service;
    @GetMapping
    private ResponseEntity<List<FichaBasica>> getAllpaises(){
        return ResponseEntity.ok(service.findAll());
    }
}
