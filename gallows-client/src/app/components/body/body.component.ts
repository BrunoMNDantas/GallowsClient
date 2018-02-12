import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EngineService } from '../../services/engine.service';
import { StateService } from '../../services/state.service';

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

    sentence : string = "";
    included : string[] = [ ];
    excluded : string[] = [ ];



    constructor(private stateService : StateService, private engineService : EngineService, private router : Router) { }

    ngOnInit() {
        this.subscribeStateEvents();
        this.router.navigateByUrl('/select-mode');
    }

    subscribeStateEvents() {
        this.stateService.initEvent.subscribe(() => {
            this.sentence = "";
            this.included = [];
            this.excluded = [];
            this.runEngine();
        });

        this.stateService.includeLetterEvent.subscribe((letter) => {
            this.included.push(letter);
        });

        this.stateService.excludeLetterEvent.subscribe((letter) => {
            this.excluded.push(letter);
        });

        this.stateService.updateSentenceEvent.subscribe((sentence) => {
            this.sentence = sentence;
        });

        this.stateService.logInfoEvent.subscribe((info) => {
            console.log(info);
        });

        this.stateService.logErrorEvent.subscribe((error) => {
            console.error(error);
        });
    }

    runEngine() {
        this.engineService.run()
        .then((sentence) => {
            let success = sentence !== null && this.sentence.indexOf(String.fromCharCode(0))===-1;
            this.router.navigate(['/result/:success', {success: success}]);
        });
    }

}
