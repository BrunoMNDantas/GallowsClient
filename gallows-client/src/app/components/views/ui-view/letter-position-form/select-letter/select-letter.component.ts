import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-select-letter',
    templateUrl: './select-letter.component.html',
    styleUrls: ['./select-letter.component.css']
})
export class SelectLetterComponent implements OnInit {

    @Input() word : string;
    @Output() checked : EventEmitter<number> = new EventEmitter();



    constructor() { }

    ngOnInit() { }

}
