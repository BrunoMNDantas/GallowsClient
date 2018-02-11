import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../services/state.service';

@Component({
    selector: 'app-select-view',
    templateUrl: './select-view.component.html',
    styleUrls: ['./select-view.component.css']
})
export class SelectViewComponent implements OnInit {

    constructor(private stateService : StateService) { }

    ngOnInit() { }



    onClick() {
        this.stateService.init();
    }

}
