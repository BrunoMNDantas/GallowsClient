import { EventEmitter } from '@angular/core';
import { Work, WorkService } from './work.service';

export class InputService {

    wordsLengthWorkService : WorkService<void, number[]> = new WorkService();
    containsLetterWorkService : WorkService<string, boolean> = new WorkService();
    letterPositionsWorkService : WorkService<string, any[]> = new WorkService();
    containsAllWordsWorkService : WorkService<string[], boolean> = new WorkService();



    public requireWordsLength() : Promise<number[]> {
        return this.wordsLengthWorkService.require(null);
    }

    public requireWordsLengthRequest() : Promise<Work<void, number[]>> {
        return this.wordsLengthWorkService.requireRequest();
    }

    public requireContainsLetter(letter : string) : Promise<boolean> {
        return this.containsLetterWorkService.require(letter);
    }

    public requireContainsLetterRequest() : Promise<Work<string, boolean>> {
        return this.containsLetterWorkService.requireRequest();
    }

    public requireLetterPositions(letter : string) : Promise<any[]> {
        return this.letterPositionsWorkService.require(letter);
    }

    public requireLetterPositionsRequest() : Promise<Work<string, any[]>> {
        return this.letterPositionsWorkService.requireRequest();
    }

    public requireContainsAllWords(words : string[]) : Promise<boolean> {
        return this.containsAllWordsWorkService.require(words);
    }

    public requireContainsAllWordsRequest() : Promise<Work<string[], boolean>> {
        return this.containsAllWordsWorkService.requireRequest();
    }

}
