package edu.co.unbosque.BackendPostgres.Repository;

import edu.co.unbosque.BackendPostgres.model.ProductoEspecificaciones;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoEspecificacionesRepository extends JpaRepository<ProductoEspecificaciones, Long> {
}
