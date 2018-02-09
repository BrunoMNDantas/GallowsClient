import { EventEmitter } from '@angular/core';

export class InputService {

    requestId : number;

    requiredWordsLengthEvent : EventEmitter<any> = new EventEmitter();
    suppliedWordsLengthEvent : EventEmitter<any> = new EventEmitter();

    requiredContainsLetterEvent : EventEmitter<any> = new EventEmitter();
    suppliedContainsLetterEvent : EventEmitter<any> = new EventEmitter();

    requiredLetterPositionsEvent : EventEmitter<any> = new EventEmitter();
    suppliedLetterPositionsEvent : EventEmitter<any> = new EventEmitter();

    requiredContainsAllWordsEvent : EventEmitter<any> = new EventEmitter();
    suppliedContainsAllWordsEvent : EventEmitter<any> = new EventEmitter();



    getNewRequestId() : number {
        this.requestId = this.requestId + 1;
        return this.requestId;
    }


    public getWordsLength() : Promise<number[]> {
        let requestId = this.getNewRequestId();

        return new Promise((resolve, reject) => {
            let subscrition = this.suppliedWordsLengthEvent.subscribe((response) => {
                if(response.requestId === requestId) {
                    resolve(response.lengths);
                    subscrition.unsubscribe();
                }
            });

            this.requiredWordsLengthEvent.emit({requestId: requestId});
        });
    }

    public supplyWordsLength(requestId : number, lengths : number[]) {
        this.suppliedWordsLengthEvent.emit({
            requestId: requestId,
            lengths: lengths
        });
    }


    public containsLetter(letter : string) : Promise<boolean> {
        let requestId = this.getNewRequestId();

        return new Promise((resolve, reject) => {
            let subscription = this.suppliedContainsLetterEvent.subscribe((response) => {
                if(response.requestId === requestId) {
                    resolve(response.contains);
                    subscription.unsubscribe();
                }
            });

            this.requiredContainsLetterEvent.emit({
                requestId: requestId,
                letter: letter
            });
        });
    }

    public supplyContainsLetter(requestId : number, contains : boolean) {
        this.suppliedContainsLetterEvent.emit({
            requestId : requestId,
            contains: contains
        });
    }


    public getLetterPositions(letter : string) : Promise<any> {
        let requestId = this.getNewRequestId();

        return new Promise((resolve, reject) => {
            let subscription = this.suppliedLetterPositionsEvent.subscribe((response) => {
                if(response.requestId === requestId) {
                    resolve(response.positions);
                    subscription.unsubscribe();
                }
            });

            this.requiredLetterPositionsEvent.emit({
                requestId: requestId,
                letter: letter
            });
        });
    }

    public supplyLetterPositions(requestId : number, positions : any) {
        this.suppliedLetterPositionsEvent.emit({
            requestId: requestId,
            positions: positions
        });
    }


    public containsAllWords(words : string[]) : Promise<boolean> {
        let requestId = this.getNewRequestId();

        return new Promise((resolve, reject) => {
            let subscription = this.suppliedContainsAllWordsEvent.subscribe((response) => {
                if(response.requestId === requestId) {
                    resolve(response.contains);
                    subscription.unsubcribe();
                }
            });

            this.requiredContainsAllWordsEvent.emit({
                requestId: requestId,
                words: words
            });
        });
    }

    public suplyContainsAllWords(requestId : number, contains : boolean) {
        this.suppliedContainsAllWordsEvent.emit({
            requestId: requestId,
            contains: contains
        });
    }

}
