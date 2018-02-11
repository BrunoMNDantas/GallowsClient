import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-contains-letter-form',
    templateUrl: './contains-letter-form.component.html',
    styleUrls: ['./contains-letter-form.component.css']
})
export class ContainsLetterFormComponent implements OnInit {

    @Input() letter : string;
    @Output() contains : EventEmitter<boolean> = new EventEmitter();



    constructor() { }

    ngOnInit() { }



    yesClick() {
        this.contains.emit(true);
        this.letter = '';
    }

    noClick() {
        this.contains.emit(false);
        this.letter = '';
    }

}
