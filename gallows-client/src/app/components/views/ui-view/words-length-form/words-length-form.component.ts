import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-words-length-form',
    templateUrl: './words-length-form.component.html',
    styleUrls: ['./words-length-form.component.css']
})
export class WordsLengthFormComponent implements OnInit {

    @Output() lengths : EventEmitter<number[]> = new EventEmitter();
    wordPosition : number = 1;
    wordsLength : number[] = [];



    constructor() { }

    ngOnInit() {}



    addWordClick(length) {
        length = Number(length);

        if(!length || length <= 0)
            return;

        this.wordsLength.push(length);
        this.wordPosition = this.wordPosition + 1;
    }

    noMoreWordsClick() {
        this.lengths.emit(this.wordsLength);
        this.wordPosition = 1;
        this.wordsLength = [];
    }

}
