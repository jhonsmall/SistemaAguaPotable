package devs.team.net.repository;

import devs.team.net.domain.Recibo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Recibo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReciboRepository extends JpaRepository<Recibo, Long> {
    @Query("select distinct recibo from Recibo recibo left join fetch recibo.lecturaMedidors")
    List<Recibo> findAllWithEagerRelationships();

    @Query("select recibo from Recibo recibo left join fetch recibo.lecturaMedidors where recibo.id =:id")
    Recibo findOneWithEagerRelationships(@Param("id") Long id);

}
