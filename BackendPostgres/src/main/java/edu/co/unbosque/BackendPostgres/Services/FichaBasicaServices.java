package edu.co.unbosque.BackendPostgres.Services;

import edu.co.unbosque.BackendPostgres.model.FichaBasica;
import edu.co.unbosque.BackendPostgres.Repository.FichaBasicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
public class FichaBasicaServices implements FichaBasicaRepository{
    /*
        * Se inyecta el repositorio de la clase FichaBasicaRepository
        * para poder hacer uso de los métodos de la interfaz JpaRepository.
        * Se utiliza la anotación @Autowired para que Spring se encargue de
        * instanciar el objeto.
        * En otras palabras, el programa quiere que confirmemos su "responsabilidad" de
        * instanciar el objeto.
     */
    @Qualifier("")
    @Autowired
    private FichaBasicaRepository fichabasicarepository;

    @Override
    public void flush() {

    }
    @Override
    public <S extends FichaBasica> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends FichaBasica> List<S> saveAllAndFlush(Iterable<S> entities) {
        return List.of();
    }

    @Override
    public void deleteAllInBatch(Iterable<FichaBasica> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Long> longs) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public FichaBasica getOne(Long aLong) {
        return null;
    }

    @Override
    public FichaBasica getById(Long aLong) {
        return null;
    }

    @Override
    public FichaBasica getReferenceById(Long aLong) {
        return null;
    }

    @Override
    public <S extends FichaBasica> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends FichaBasica> List<S> findAll(Example<S> example) {
        return List.of();
    }

    @Override
    public <S extends FichaBasica> List<S> findAll(Example<S> example, Sort sort) {
        return List.of();
    }

    @Override
    public <S extends FichaBasica> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends FichaBasica> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends FichaBasica> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends FichaBasica, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends FichaBasica> S save(S entity) {
        return fichabasicarepository.save(entity);
    }

    @Override
    public <S extends FichaBasica> List<S> saveAll(Iterable<S> entities) {
        return List.of();
    }

    @Override
    public Optional<FichaBasica> findById(Long aLong) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Long aLong) {
        return false;
    }

    @Override
    public List<FichaBasica> findAll() {
        return fichabasicarepository.findAll();
    }

    @Override
    public List<FichaBasica> findAllById(Iterable<Long> longs) {
        return List.of();
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(Long aLong) {
        fichabasicarepository.deleteById(aLong);
    }

    @Override
    public void delete(FichaBasica entity) {
        fichabasicarepository.delete(entity);
    }

    @Override
    public void deleteAllById(Iterable<? extends Long> longs) {

    }

    @Override
    public void deleteAll(Iterable<? extends FichaBasica> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<FichaBasica> findAll(Sort sort) {
        return List.of();
    }

    @Override
    public Page<FichaBasica> findAll(Pageable pageable) {
        return null;
    }
}
