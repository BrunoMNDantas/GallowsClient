import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-contains-words-form',
    templateUrl: './contains-words-form.component.html',
    styleUrls: ['./contains-words-form.component.css']
})
export class ContainsWordsFormComponent implements OnInit {

    @Input() words : string[];
    @Output() contains : EventEmitter<boolean> = new EventEmitter();



    constructor() { }

    ngOnInit() { }



    yesClick() {
        this.contains.emit(true);
        this.words = [];
    }

    noClick() {
        this.contains.emit(false);
        this.words = [];
    }

}
