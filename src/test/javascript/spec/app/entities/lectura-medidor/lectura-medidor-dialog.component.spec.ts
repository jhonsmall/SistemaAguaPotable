/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SistemaAguaPotableTestModule } from '../../../test.module';
import { LecturaMedidorDialogComponent } from '../../../../../../main/webapp/app/entities/lectura-medidor/lectura-medidor-dialog.component';
import { LecturaMedidorService } from '../../../../../../main/webapp/app/entities/lectura-medidor/lectura-medidor.service';
import { LecturaMedidor } from '../../../../../../main/webapp/app/entities/lectura-medidor/lectura-medidor.model';
import { MedidorService } from '../../../../../../main/webapp/app/entities/medidor';

describe('Component Tests', () => {

    describe('LecturaMedidor Management Dialog Component', () => {
        let comp: LecturaMedidorDialogComponent;
        let fixture: ComponentFixture<LecturaMedidorDialogComponent>;
        let service: LecturaMedidorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SistemaAguaPotableTestModule],
                declarations: [LecturaMedidorDialogComponent],
                providers: [
                    MedidorService,
                    LecturaMedidorService
                ]
            })
            .overrideTemplate(LecturaMedidorDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LecturaMedidorDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LecturaMedidorService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LecturaMedidor(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.lecturaMedidor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'lecturaMedidorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LecturaMedidor();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.lecturaMedidor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'lecturaMedidorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
