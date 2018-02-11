import { Injectable } from '@angular/core';
import { GallowsService } from './gallows.service';
import { InputService } from './input.service';
import { StateService } from './state.service';

@Injectable()
export class EngineService {

    constructor(
        private stateService : StateService,
        private inputService : InputService,
        private gallowsService : GallowsService) { }



    run() : Promise<string> {
        this.stateService.logInfo("::STARTED::");

        return this.getWordsLength()
        .then((wordsLength) => {
            return this.createGallows(wordsLength)
            .then((gallowsId) => {
                return this.nextIteration(gallowsId)
                .then((sentence) => {
                    this.stateService.logInfo("::FINISHED::");
                    return sentence;
                });
            });
        });
    }

    getWordsLength() : Promise<number[]> {
        return this.inputService.requireWordsLength()
        .then((wordsLength) => {
            this.stateService.logInfo("Words length : " + wordsLength);
            return wordsLength;
        })
        .catch((error) => {
            this.stateService.logError("Error getting words length! Error : " + error);
            throw error;
        });
    }

    createGallows(wordsLength : number[]) : Promise<any>{
        return this.gallowsService.createGallows(wordsLength)
        .then((gallowsId) => {
            this.stateService.logInfo("GallowsID : " + gallowsId);
            return gallowsId;
        })
        .catch((error) => {
            this.stateService.logError("Error creating gallows on Server! Error : " + error);
            throw error;
        });
    }

    nextIteration(gallowsId : any) : Promise<string> {
        return this.getSentence(gallowsId)
        .then((sentence) => {
            return this.getLetter(gallowsId)
            .then((letter)=>{
                return this.testLetter(gallowsId, letter)
                .then((containsLetter) => {
                    return this.treatLetter(gallowsId, letter, containsLetter)
                    .then(() => {
                        return this.cleanDictionary(gallowsId)
                        .then((() => {
                            return this.checkForFoundWords(gallowsId)
                            .then((allFoundWordAreInSentence)=>{
                                if(allFoundWordAreInSentence)
                                    return this.checkForFinish(gallowsId)
                                    .then((finished) => {
                                        if(!finished)
                                            return this.nextIteration(gallowsId);
                                        else
                                            return this.getSentence(gallowsId);
                                    });
                                else
                                    return null;
                            });
                        }));
                    });
                });
            });
        });
    }

    getSentence(gallowsId : any) : Promise<string> {
        return this.gallowsService.getSentence(gallowsId)
        .then((sentence) => {
            this.stateService.logInfo("Sentence : " + sentence);
            this.stateService.updateSentente(sentence);
            return sentence;
        })
        .catch((error) => {
            this.stateService.logError("Error getting sentence from server! Error : " + error);
            throw error;
        });
    }

    getLetter(gallowsId : any) : Promise<string> {
        return this.gallowsService.getLetter(gallowsId)
        .then((letter) => {
            this.stateService.logInfo("Letter : " + letter);
            return letter;
        })
        .catch((error) => {
            this.stateService.logError("Error : " + error);
            throw error;
        });
    }

    testLetter(gallowsId : any, letter : string) : Promise<boolean> {
        return this.inputService.requireContainsLetter(letter)
        .then((containsLetter) => {
            if(containsLetter) {
                this.stateService.logInfo("Include : " + letter);
                this.stateService.includeLetter(letter);
            } else {
                this.stateService.logInfo("Exclude : " + letter);
                this.stateService.excludeLetter(letter);
            }

            return containsLetter;
        })
        .catch((error) => {
            this.stateService.logError("Error checking if contains letter! Error : " + error);
            throw error;
        });
    }

    treatLetter(gallowsId : any, letter : string, containsLetter : boolean) : Promise<void> {
        if(containsLetter)
            return this.includeLetter(gallowsId, letter);
        else
            return this.excludeLetter(gallowsId, letter);
    }

    includeLetter(gallowsId : any, letter : string) : Promise<void> {
        return this.getLetterPositions(letter)
        .then((positions) => {
            return this.gallowsService.includeLetter(gallowsId, letter, positions)
            .then((resp) => {
                this.stateService.logInfo("Included : " + letter);
                return resp;
            })
            .catch((error) => {
                this.stateService.logError("Error including letter on Server! Error : " + error);
                throw error;
            });
        });
    }

    getLetterPositions(letterToCheck : string) : Promise<any[]> {
        return this.inputService.requireLetterPositions(letterToCheck)
        .then((positions) => {
            this.stateService.logInfo("Letter positions : " + positions);
            return positions;
        })
        .catch((error) => {
            this.stateService.logError("Error getting letter positions! Error : " + error);
            throw error;
        });
    }

    excludeLetter(gallowsId : any, letter : string) : Promise<void> {
        return this.gallowsService.excludeLetter(gallowsId, letter)
        .then((resp) => {
            this.stateService.logInfo("Excluded : " + letter);
            return resp;
        })
        .catch((error) => {
            this.stateService.logError("Error excluding letter on Server! Error : " + error);
            throw error;
        });
    }

    cleanDictionary(gallowsId : any) : Promise<void> {
        return this.gallowsService.cleanGallows(gallowsId)
        .then((resp) => {
            this.stateService.logInfo("Dictionary cleaned");
            return resp;
        })
        .catch((error) => {
            this.stateService.logError("Error cleaning dictionary on Server! Error : " + error);
            throw error;
        });
    }

    checkForFoundWords(gallowsId : any) : Promise<boolean> {
        return this.gallowsService.finishWords(gallowsId)
        .then((finishedWords) => {
            this.stateService.logInfo("Finished words : " + finishedWords);

            if(finishedWords.length === 0) {
                this.stateService.logInfo("No words found.");
                return true;
            } else {
                return this.inputService.requireContainsAllWords(finishedWords)
                .then((allWordsInSentence) => {
                    this.stateService.logInfo("All words in sentence : " + allWordsInSentence);
                    return allWordsInSentence;
                })
                .catch((error) => {
                    this.stateService.logError("Error checking finished words! Error : " + error);
                    throw error;
                });
            }
        })
        .catch((error) => {
            this.stateService.logError("Error getting finished words from Server! Error : " + error);
            throw error;
        });
    }

    checkForFinish(gallowsId : any) : Promise<boolean> {
        return this.gallowsService.isFinished(gallowsId)
        .then((finished) => {
            this.stateService.logInfo("Finished : " + finished);
            return finished;
        })
        .catch((error) => {
            this.stateService.logError("Error checking if gallows is finished on Server! Error : " + error);
            throw error;
        });
    }

}
