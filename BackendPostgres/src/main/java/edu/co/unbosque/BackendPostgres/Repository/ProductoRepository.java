package edu.co.unbosque.BackendPostgres.Repository;

import edu.co.unbosque.BackendPostgres.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
