import { Component, OnInit, ViewChild } from '@angular/core';

import { ConsoleComponent } from './console/console.component';
import { InputService } from '../../../services/input.service';
import { StateService } from '../../../services/state.service';

@Component({
    selector: 'app-console-view',
    templateUrl: './console-view.component.html',
    styleUrls: ['./console-view.component.css']
})
export class ConsoleViewComponent implements OnInit {

    @ViewChild(ConsoleComponent) console;



    constructor(private inputService : InputService, private stateService : StateService) { }

    ngOnInit() {
        this.registerInitListener();
        this.registerWordsLengthListener();
        this.registerContainsLetterListener();
        this.registerLetterPositionsListener();
        this.registerContainsAllWordsListener();
    }

    registerInitListener() {
        this.stateService.initEvent.subscribe(() => {
            this.console.clear();
        });
    }

    registerWordsLengthListener() {
        this.inputService.requireWordsLengthRequest()
        .then((work) => {
            this.getWordsLength()
            .then((length) => {
                work.resolve(length);
                this.registerWordsLengthListener();
            });
        });
    }

    registerContainsLetterListener() {
        this.inputService.requireContainsLetterRequest()
        .then((work) => {
            this.containsLetter(work.input)
            .then((contains) => {
                work.resolve(contains);
                this.registerContainsLetterListener();
            });
        });
    }

    registerLetterPositionsListener() {
        this.inputService.requireLetterPositionsRequest()
        .then((work) => {
            this.getLetterPositions(work.input)
            .then((positions) => {
                work.resolve(positions);
                this.registerLetterPositionsListener();
            });
        });
    }

    registerContainsAllWordsListener() {
        this.inputService.requireContainsAllWordsRequest()
        .then((work) => {
            this.containsAllWords(work.input)
            .then((contains) => {
                work.resolve(contains);
                this.registerContainsAllWordsListener();
            });
        });
    }



    public getWordsLength() : Promise<number[]> {
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

    public containsLetter(letter : string) : Promise<boolean> {
        this.console.writeLine("Does your sentence contains letter '" + letter + "'? [yes/no]");

        let inputProcessor = (input) => {
            input = input.trim().toLowerCase();

            if(input === "yes" || input === "y")
                return true;

            if(input === "no" || input === "n")
                return false;

            this.console.writeLine("Invalid answer!");
            return this.containsLetter(letter);
        };

        return this.readLine().then(inputProcessor);
    }

    public getLetterPositions(letterToCheck : string) : Promise<any[]> {
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

    public containsAllWords(finishedWords : string[]) : Promise<boolean> {
        let idx = 0;

        let inputProcessor = (input) => {
            input = input.trim().toLowerCase();

            if(input === 'yes' || input === 'y') {
                idx = idx + 1;

                if(idx === finishedWords.length)
                    return true;

                this.console.writeLine("Does your sentence contains word '" + finishedWords[idx] + "'? [yes/no]");
                return this.readLine().then(inputProcessor);
            }

            if(input === 'no' || input === 'n')
                return false;

            this.console.writeLine("Invalid answer");
            return this.readLine().then(inputProcessor);
        };

        this.console.writeLine("Does your sentence contains word '" + finishedWords[idx] + "'? [yes/no]");
        return this.readLine().then(inputProcessor);
    }

    public readLine() : Promise<string> {
        return new Promise((resolve, reject) => {
            this.console.newLine.subscribe((line) => {
                resolve(line);
            });
        });
    }

}
