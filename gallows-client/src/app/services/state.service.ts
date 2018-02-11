import { EventEmitter } from '@angular/core';

export class StateService {

    initEvent : EventEmitter<void> = new EventEmitter();
    updateSentenceEvent : EventEmitter<string> = new EventEmitter();
    includeLetterEvent : EventEmitter<string> = new EventEmitter();
    excludeLetterEvent : EventEmitter<string> = new EventEmitter();
    logInfoEvent : EventEmitter<string> = new EventEmitter();
    logErrorEvent : EventEmitter<string> = new EventEmitter();



    public init() {
        this.initEvent.emit();
    }

    public includeLetter(letter : string) {
        this.includeLetterEvent.emit(letter);
    }

    public excludeLetter(letter : string) {
        this.excludeLetterEvent.emit(letter);
    }

    public updateSentente(sentence : string) {
        this.updateSentenceEvent.emit(sentence);
    }

    public logInfo(info : string) {
        this.logInfoEvent.emit(info);
    }

    public logError(error : string) {
        this.logErrorEvent.emit(error);
    }

}
