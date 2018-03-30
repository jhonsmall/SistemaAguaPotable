import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Recibo } from './recibo.model';
import { ReciboPopupService } from './recibo-popup.service';
import { ReciboService } from './recibo.service';
import { LecturaMedidor, LecturaMedidorService } from '../lectura-medidor';
import { Usuario, UsuarioService } from '../usuario';

@Component({
    selector: 'jhi-recibo-dialog',
    templateUrl: './recibo-dialog.component.html'
})
export class ReciboDialogComponent implements OnInit {

    recibo: Recibo;
    isSaving: boolean;

    lecturamedidors: LecturaMedidor[];

    usuarios: Usuario[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private reciboService: ReciboService,
        private lecturaMedidorService: LecturaMedidorService,
        private usuarioService: UsuarioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.lecturaMedidorService.query()
            .subscribe((res: HttpResponse<LecturaMedidor[]>) => { this.lecturamedidors = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.usuarioService.query()
            .subscribe((res: HttpResponse<Usuario[]>) => { this.usuarios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.recibo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reciboService.update(this.recibo));
        } else {
            this.subscribeToSaveResponse(
                this.reciboService.create(this.recibo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Recibo>>) {
        result.subscribe((res: HttpResponse<Recibo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Recibo) {
        this.eventManager.broadcast({ name: 'reciboListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLecturaMedidorById(index: number, item: LecturaMedidor) {
        return item.id;
    }

    trackUsuarioById(index: number, item: Usuario) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-recibo-popup',
    template: ''
})
export class ReciboPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reciboPopupService: ReciboPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.reciboPopupService
                    .open(ReciboDialogComponent as Component, params['id']);
            } else {
                this.reciboPopupService
                    .open(ReciboDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
