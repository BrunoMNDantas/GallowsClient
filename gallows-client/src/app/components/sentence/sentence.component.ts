import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'app-sentence',
    templateUrl: './sentence.component.html',
    styleUrls: ['./sentence.component.css']
})
export class SentenceComponent implements OnInit, OnChanges {

    @Input() sentence : string;
    lettersCount : number = 1;
    words : any[] = [];



    constructor() { }

    ngOnInit() {
        this.buildWords();
    }

    ngOnChanges() {
        this.buildWords();
    }

    buildWords() {
        let words = this.sentence.split(" ").map((word) => {
            return {
                    str: word,
                    length: word.length,
                    position: 0
            };
        });

        words.forEach((word, index) => word.position = index);

        this.words = words;

        this.lettersCount = this.words.map((word) => word.length).reduce((count, wordLength) => count + wordLength);
    }

}
