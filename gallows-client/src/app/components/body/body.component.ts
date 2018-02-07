import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

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
        let lengthSupplier = this.getWordsLength.bind(this);
        let letterPredicate = this.containsLetter.bind(this);
        let letterPositionsSupplier = this.getLetterPositions.bind(this);
        let completeWordsPredicate = this.constainsWords.bind(this);
        let sentenceLogger = (sentence) => this.sentence = sentence;
        let logger = console.log;

        let context = new Context(lengthSupplier, letterPredicate, letterPositionsSupplier, completeWordsPredicate, sentenceLogger, logger);

        this.engineService.run(context)
        .then((sentence) => {''
            if(!sentence || this.sentence.indexOf(String.fromCharCode(0))!==-1)
                this.console.writeLine("Your sentence contains words that i don't know :(");
        });
    }



    getWordsLength() : Promise<number[]> {
        this.console.writeLine("Insert words length in format 'length,length'(ex: 'hello world' would be 5,5).");

        let inputProcessor = (input) => {
            let numbers = input.trim().split(',');

            if(numbers.some(isNaN) || input.trim().length==0){
                this.console.writeLine("Invalid lengths.");
                return this.getWordsLength();
            }

            return numbers.map((number) => Number(number.trim()))
        }

        return this.readLine().then(inputProcessor);
    }

    containsLetter(letter : string) : Promise<boolean> {
        this.console.writeLine("Does your sentence contains letter '" + letter + "'? [yes/no]");

        let inputProcessor = (input) => {
            input = input.trim().toLowerCase();

            if(input === "yes" || input === "y") {
                this.included.push(letter);
                return true;
            }

            if(input === "no" || input === "n") {
                this.excluded.push(letter);
                return false;
            }

            this.console.writeLine("Invalid answer!");
            return this.containsLetter(letter);
        };

        return this.readLine().then(inputProcessor);
    }

    getLetterPositions(letterToCheck : string) : Promise<any[]> {
        this.console.writeLine("Insert positions of letter '" + letterToCheck + "' with format wordPosition,letterPosition (ex: letter 'e' on 'hello world' would be 0,1). " +
        "Insert empty line to finish.");

        let positions = [];
        let inputProcessor = (input) => {
            if(input.length === 0)
                return positions;

            input = input.trim().split(',');

            if(input.length != 2 || input.some(isNaN) || input.some((n) => n.length===0))
                this.console.writeLine("Invalid position.");
            else
                positions.push([Number(input[0]), Number(input[1])]);

            return this.readLine().then(inputProcessor);
        };

        return this.readLine().then(inputProcessor);
    }

    constainsWords(finishedWords : string[]) : Promise<boolean> {
        let idx = 0;

        let inputProcessor = (input) => {
            return false;
        };

        this.console.writeLine("Does your sentence contains word '" + finishedWords[idx] + "'? [yes/no]");
        return this.readLine().then(inputProcessor);
    }

    readLine() : Promise<string> {
        return new Promise((resolve, reject) => {
            this.console.newLine.subscribe((line) => {
                resolve(line);
            });
        });
    }

}
