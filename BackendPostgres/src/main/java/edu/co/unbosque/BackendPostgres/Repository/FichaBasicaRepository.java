
package edu.co.unbosque.BackendPostgres.Repository;

import edu.co.unbosque.BackendPostgres.model.FichaBasica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FichaBasicaRepository extends JpaRepository<FichaBasica, Long> {
}