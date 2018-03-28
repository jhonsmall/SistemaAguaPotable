import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SistemaAguaPotableUsuarioModule } from './usuario/usuario.module';
import { SistemaAguaPotableServicioModule } from './servicio/servicio.module';
import { SistemaAguaPotableClasificacionModule } from './clasificacion/clasificacion.module';
import { SistemaAguaPotableEscalasDelMedidorModule } from './escalas-del-medidor/escalas-del-medidor.module';
import { SistemaAguaPotableCostoModule } from './costo/costo.module';
import { SistemaAguaPotableSectorModule } from './sector/sector.module';
import { SistemaAguaPotableCostoMedidorModule } from './costo-medidor/costo-medidor.module';
import { SistemaAguaPotableMedidorModule } from './medidor/medidor.module';
import { SistemaAguaPotableLecturaMedidorModule } from './lectura-medidor/lectura-medidor.module';
import { SistemaAguaPotableReciboModule } from './recibo/recibo.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SistemaAguaPotableUsuarioModule,
        SistemaAguaPotableServicioModule,
        SistemaAguaPotableClasificacionModule,
        SistemaAguaPotableEscalasDelMedidorModule,
        SistemaAguaPotableCostoModule,
        SistemaAguaPotableSectorModule,
        SistemaAguaPotableCostoMedidorModule,
        SistemaAguaPotableMedidorModule,
        SistemaAguaPotableLecturaMedidorModule,
        SistemaAguaPotableReciboModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SistemaAguaPotableEntityModule {}
