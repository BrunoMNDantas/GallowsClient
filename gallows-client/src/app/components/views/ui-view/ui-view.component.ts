import { Component, OnInit, EventEmitter } from '@angular/core';
import { InputService } from '../../../services/input.service';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-ui-view',
  templateUrl: './ui-view.component.html',
  styleUrls: ['./ui-view.component.css']
})
export class UiViewComponent implements OnInit {

    wordsLengthFormVisibility : boolean = false;
    containsLetterFormVisibility : boolean = false;
    letterPositionsFormVisibility : boolean = false;
    containsWordsFormVisibility : boolean = false;

    wordsLengthEvent : EventEmitter<number[]> = new EventEmitter();
    containsLetterEvent : EventEmitter<boolean> = new EventEmitter();
    letterPositionsEvent : EventEmitter<any[]> = new EventEmitter();
    containsWordsEvent : EventEmitter<boolean> = new EventEmitter();

    sentence : string;
    checkingLetter : string;
    checkingLetterPositions : string;
    checkingWords : string[];



    constructor(private inputService : InputService, private stateService : StateService) { }

    ngOnInit() {
        this.registerInitListener();
        this.registerUpdateSentenceListener();
        this.registerWordsLengthListener();
        this.registerContainsLetterListener();
        this.registerLetterPositionsListener();
        this.registerContainsAllWordsListener();
    }

    registerInitListener() {
        this.stateService.initEvent.subscribe(() => {
            this.checkingLetter = "";
            this.checkingLetterPositions = "";
            this.checkingWords = [];
        });
    }

    registerUpdateSentenceListener() {
        this.stateService.updateSentenceEvent.subscribe((sentence) => {
            this.sentence = sentence;
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
        this.hideAllForms();
        this.wordsLengthFormVisibility = true;

        return new Promise((resolve, reject) => {
            let subscription = this.wordsLengthEvent.subscribe((lengths) => {
                resolve(lengths);
                subscription.unsubscribe();
                this.hideAllForms();
            });
        });
    }

    public containsLetter(letter : string) : Promise<boolean> {
        this.hideAllForms();
        this.checkingLetter = letter;
        this.containsLetterFormVisibility = true;

        return new Promise((resolve, reject) => {
            let subscription = this.containsLetterEvent.subscribe((contains) => {
                resolve(contains);
                subscription.unsubscribe();
                this.hideAllForms();
            });
        });
    }

    public getLetterPositions(letter : string) : Promise<any[]> {
        this.hideAllForms();
        this.checkingLetterPositions = letter;
        this.letterPositionsFormVisibility = true;

        return new Promise((resolve, reject) => {
            let subscription = this.letterPositionsEvent.subscribe((positions) => {
                resolve(positions);
                subscription.unsubscribe();
                this.hideAllForms();
            });
        });
    }

    public containsAllWords(finishedWords : string[]) : Promise<boolean> {
        this.hideAllForms();
        this.checkingWords = finishedWords;
        this.containsWordsFormVisibility = true;

        return new Promise((resolve, reject) => {
            let subscription = this.containsWordsEvent.subscribe((contains) => {
                resolve(contains);
                subscription.unsubscribe();
                this.hideAllForms();
            });
        });
    }

    hideAllForms() {
        this.wordsLengthFormVisibility = false;
        this.containsLetterFormVisibility = false;
        this.letterPositionsFormVisibility = false;
        this.containsWordsFormVisibility = false;
    }

}
