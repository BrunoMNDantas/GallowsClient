import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateService } from './services/state.service';
import { InputService } from './services/input.service';
import { EngineService } from './services/engine.service';
import { GallowsService } from './services/gallows.service';
import { HttpUtils } from './services/http-utils';

@NgModule({
    declarations: [ ],
    imports: [ ],
    exports: [ ],
    providers: [ StateService, InputService, EngineService, GallowsService, HttpUtils ]
})

export class ServicesModule { }
