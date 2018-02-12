import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'app-letter-position-form',
    templateUrl: './letter-position-form.component.html',
    styleUrls: ['./letter-position-form.component.css']
})
export class LetterPositionFormComponent implements OnInit, OnChanges {

    @Input() sentence : string;
    @Input() letter : string;
    @Output() positions : EventEmitter<any[]> = new EventEmitter();
    lettersCount : number = 0;
    checked : any[] = [];



    constructor() { }

    ngOnInit() {
        this.countLetters();
    }

    ngOnChanges() {
        this.countLetters();
    }

    countLetters() {
        if(!this.sentence || this.sentence.length === 0) {
            this.lettersCount = 0;
            return;
        }

        this.lettersCount = this.sentence.split(' ').reduce((acc, word) => acc+word.length, 0);
    }

    checkedClick(wordIdx, letterIdx) {
        let remove = false;

        this.checked = this.checked.filter((position) => {
            if(position[0]===wordIdx && position[1]===letterIdx) {
                remove = true;
                return false;
            }
            return true;
        });

        if(!remove)
            this.checked.push([wordIdx, letterIdx]);
    }

    doneClick() {
        this.positions.emit(this.checked);
        this.letter = "";
        this.lettersCount = 0;
        this.checked = [];
    }

}
