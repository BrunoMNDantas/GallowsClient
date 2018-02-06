import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConsoleComponent } from '../console/console.component';
import { EngineService } from '../../services/engine.service';
import { Context } from '../../services/context';

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

    @ViewChild(ConsoleComponent) console;
    sentence : string = "";
    included : string[] = [ ];
    excluded : string[] = [ ];

    constructor(private engineService : EngineService) { }

    ngOnInit() {
        let originalSentence : string = "i love you";

        let lengthSupplier = () => {
            return Promise.resolve(
                originalSentence.split(' ').map((word)=>word.length)
            );
        };
        let letterPredicate = (letter) => {
            return Promise.resolve(
                originalSentence.indexOf(letter) != -1
            );
        };
        let letterPositionsSupplier = (letterToCheck) => {
            let positions = [];

            let words = originalSentence.split(' ')

            words.forEach((word, wordIdx) => {
                word.split('').forEach((letter, letterIdx) => {
                    if(letter === letterToCheck)
                    positions.push([wordIdx, letterIdx]);
                });
            });

            return Promise.resolve(positions);
        };
        let completeWordsPredicate = (finishedWords) => {
            let allWordsInSentence = true;

            finishedWords.forEach((word) => {
                if(originalSentence.indexOf(word) == -1)
                allWordsInSentence = false;
            });

            return Promise.resolve(allWordsInSentence);
        };
        let sentenceLogger = (sentence) => this.sentence = sentence;
        let logger = this.log.bind(this);
        let context = new Context(lengthSupplier, letterPredicate, letterPositionsSupplier, completeWordsPredicate, sentenceLogger, logger);
        this.engineService.run(context);
    }

    log(text : string) {
        if(text.indexOf('Excluded : ') != -1)
        this.excluded.push(text.replace('Excluded : ', ''))

        if(text.indexOf('Included : ') != -1)
        this.included.push(text.replace('Included : ', ''))

        this.console.writeLine(text);
    }

}
