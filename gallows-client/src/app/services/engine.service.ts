import { Injectable } from '@angular/core';
import { GallowsService } from './gallows.service';
import { Context } from './context';

@Injectable()
export class EngineService {

    constructor(private gallowsService : GallowsService) { }



    run(context : Context) : Promise<string> {
        context.logger("::STARTED::");

        return this.getWordsLength(context)
        .then((wordsLength) => {
            return this.createGallows(wordsLength, context)
            .then((gallowsId) => {
                return this.nextIteration(gallowsId, context)
                .then((sentence) => {
                    context.logger("::FINISHED::");
                    return sentence;
                });
            });
        });
    }

    getWordsLength(context : Context) : Promise<number[]> {
        return context.lengthsSupplier()
        .then((wordsLength) => {
            context.logger("Words length : " + wordsLength);
            return wordsLength;
        })
        .catch((error) => {
            context.logger("Error getting words length! Error : " + error);
            throw error;
        });
    }

    createGallows(wordsLength : number[], context : Context) : Promise<any>{
        return this.gallowsService.createGallows(wordsLength)
        .then((gallowsId) => {
            context.logger("GallowsID : " + gallowsId);
            return gallowsId;
        })
        .catch((error) => {
            context.logger("Error creating gallows on Server! Error : " + error);
            throw error;
        });
    }

    nextIteration(gallowsId : any, context : Context) : Promise<string> {
        return this.getSentence(gallowsId, context)
        .then((sentence) => {
            return this.getLetter(gallowsId, context)
            .then((letter)=>{
                return this.testLetter(gallowsId, letter, context)
                .then((containsLetter) => {
                    return this.treatLetter(gallowsId, letter, containsLetter, context)
                    .then(() => {
                        return this.cleanDictionary(gallowsId, context)
                        .then((() => {
                            return this.checkForFoundWords(gallowsId, context)
                            .then((allFoundWordAreInSentence)=>{
                                if(allFoundWordAreInSentence)
                                    return this.checkForFinish(gallowsId, context)
                                    .then((finished) => {
                                        if(!finished)
                                            return this.nextIteration(gallowsId, context);
                                        else
                                            return this.getSentence(gallowsId, context);
                                    });
                            });
                        }));
                    });
                });
            });
        });
    }

    getSentence(gallowsId : any, context : Context) : Promise<string> {
        return this.gallowsService.getSentence(gallowsId)
        .then((sentence) => {
            context.sentenceLogger(sentence);
            return sentence;
        })
        .catch((error) => {
            context.logger("Error getting sentence from server! Error : " + error);
            throw error;
        });
    }

    getLetter(gallowsId : any, context : Context) : Promise<string> {
        return this.gallowsService.getLetter(gallowsId)
        .then((letter) => {
            context.logger("Letter : " + letter);
            return letter;
        })
        .catch((error) => {
            context.logger("Error : " + error);
            throw error;
        });
    }

    testLetter(gallowsId : any, letter : string, context : Context) : Promise<boolean> {
        return context.letterPredicate(letter)
        .then((containsLetter) => {
            if(containsLetter)
                context.logger("Include : " + letter);
            else
                context.logger("Exclude : " + letter);

            return containsLetter;
        })
        .catch((error) => {
            context.logger("Error checking if contains letter! Error : " + error);
            throw error;
        });
    }

    treatLetter(gallowsId : any, letter : string, containsLetter : boolean, context : Context) : Promise<void> {
        if(containsLetter)
            return this.includeLetter(gallowsId, letter, context);
        else
            return this.excludeLetter(gallowsId, letter, context);
    }

    includeLetter(gallowsId : any, letter : string, context : Context) : Promise<void> {
        return this.getLetterPositions(letter, context)
        .then((positions) => {
            return this.gallowsService.includeLetter(gallowsId, letter, positions)
            .then((resp) => {
                context.logger("Included : " + letter);
                return resp;
            })
            .catch((error) => {
                context.logger("Error including letter on Server! Error : " + error);
                throw error;
            });
        });
    }

    getLetterPositions(letterToCheck : string, context : Context) : Promise<any[]> {
        return context.letterPositionsFunction(letterToCheck)
        .then((positions) => {
            context.logger("Letter positions : " + positions);
            return positions;
        })
        .catch((error) => {
            context.logger("Error getting letter positions! Error : " + error);
            throw error;
        });
    }

    excludeLetter(gallowsId : any, letter : string, context : Context) : Promise<void> {
        return this.gallowsService.excludeLetter(gallowsId, letter)
        .then((resp) => {
            context.logger("Excluded : " + letter);
            return resp;
        })
        .catch((error) => {
            context.logger("Error excluding letter on Server! Error : " + error);
            throw error;
        });
    }

    cleanDictionary(gallowsId : any, context : Context) : Promise<void> {
        return this.gallowsService.cleanGallows(gallowsId)
        .then((resp) => {
            context.logger("Dictionary cleaned");
            return resp;
        })
        .catch((error) => {
            context.logger("Error cleaning dictionary on Server! Error : " + error);
            throw error;
        });
    }

    checkForFoundWords(gallowsId : any, context : Context) : Promise<boolean> {
        return this.gallowsService.finishWords(gallowsId)
        .then((finishedWords) => {
            context.logger("Finished words : " + finishedWords);

            return context.completedWordsPredicate(finishedWords)
            .then((allWordsInSentence) => {
                context.logger("All words in sentence : " + allWordsInSentence);
                return allWordsInSentence;
            })
            .catch((error) => {
                context.logger("Error checking finished words! Error : " + error);
                throw error;
            });
        })
        .catch((error) => {
            context.logger("Error getting finished words from Server! Error : " + error);
            throw error;
        });
    }

    checkForFinish(gallowsId : any, context : Context) : Promise<boolean> {
        return this.gallowsService.isFinished(gallowsId)
        .then((finished) => {
            context.logger("Finished : " + finished);
            return finished;
        })
        .catch((error) => {
            context.logger("Error checking if gallows is finished on Server! Error : " + error);
            throw error;
        });
    }

}
