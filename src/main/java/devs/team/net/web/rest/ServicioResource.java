package devs.team.net.web.rest;

import com.codahale.metrics.annotation.Timed;
import devs.team.net.service.ServicioService;
import devs.team.net.web.rest.errors.BadRequestAlertException;
import devs.team.net.web.rest.util.HeaderUtil;
import devs.team.net.web.rest.util.PaginationUtil;
import devs.team.net.service.dto.ServicioDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Servicio.
 */
@RestController
@RequestMapping("/api")
public class ServicioResource {

    private final Logger log = LoggerFactory.getLogger(ServicioResource.class);

    private static final String ENTITY_NAME = "servicio";

    private final ServicioService servicioService;

    public ServicioResource(ServicioService servicioService) {
        this.servicioService = servicioService;
    }

    /**
     * POST  /servicios : Create a new servicio.
     *
     * @param servicioDTO the servicioDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new servicioDTO, or with status 400 (Bad Request) if the servicio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/servicios")
    @Timed
    public ResponseEntity<ServicioDTO> createServicio(@Valid @RequestBody ServicioDTO servicioDTO) throws URISyntaxException {
        log.debug("REST request to save Servicio : {}", servicioDTO);
        if (servicioDTO.getId() != null) {
            throw new BadRequestAlertException("A new servicio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServicioDTO result = servicioService.save(servicioDTO);
        return ResponseEntity.created(new URI("/api/servicios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /servicios : Updates an existing servicio.
     *
     * @param servicioDTO the servicioDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated servicioDTO,
     * or with status 400 (Bad Request) if the servicioDTO is not valid,
     * or with status 500 (Internal Server Error) if the servicioDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/servicios")
    @Timed
    public ResponseEntity<ServicioDTO> updateServicio(@Valid @RequestBody ServicioDTO servicioDTO) throws URISyntaxException {
        log.debug("REST request to update Servicio : {}", servicioDTO);
        if (servicioDTO.getId() == null) {
            return createServicio(servicioDTO);
        }
        ServicioDTO result = servicioService.save(servicioDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, servicioDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /servicios : get all the servicios.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of servicios in body
     */
    @GetMapping("/servicios")
    @Timed
    public ResponseEntity<List<ServicioDTO>> getAllServicios(Pageable pageable) {
        log.debug("REST request to get a page of Servicios");
        Page<ServicioDTO> page = servicioService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/servicios");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /servicios/:id : get the "id" servicio.
     *
     * @param id the id of the servicioDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the servicioDTO, or with status 404 (Not Found)
     */
    @GetMapping("/servicios/{id}")
    @Timed
    public ResponseEntity<ServicioDTO> getServicio(@PathVariable Long id) {
        log.debug("REST request to get Servicio : {}", id);
        ServicioDTO servicioDTO = servicioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(servicioDTO));
    }

    /**
     * DELETE  /servicios/:id : delete the "id" servicio.
     *
     * @param id the id of the servicioDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/servicios/{id}")
    @Timed
    public ResponseEntity<Void> deleteServicio(@PathVariable Long id) {
        log.debug("REST request to delete Servicio : {}", id);
        servicioService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/servicios?query=:query : search for the servicio corresponding
     * to the query.
     *
     * @param query the query of the servicio search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/servicios")
    @Timed
    public ResponseEntity<List<ServicioDTO>> searchServicios(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Servicios for query {}", query);
        Page<ServicioDTO> page = servicioService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/servicios");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
