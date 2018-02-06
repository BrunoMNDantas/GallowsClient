import { Injectable } from '@angular/core';

import { Routes } from './routes';
import { HttpUtils } from './http-utils';

@Injectable()
export class GallowsService {

    constructor(private httpUtils: HttpUtils) { }



    createGallows(lengths : number[]) : Promise<any> {
        let uri = Routes.CREATE;
        let body = lengths;

        return this.httpUtils.post(uri, body)
        .then((response) => {
            response = response.text();
            let gallowsId = response.substring('"'.length, response.length-'"'.length);
            return gallowsId;
        });
    }

    getLetter(gallowsId : any) : Promise<string> {
        let uri = Routes.GET_LETTER;
        let queryStr = "?gallowsId=" + gallowsId;

        return this.httpUtils.get(uri + queryStr)
        .then((response) => {
            response = response.text();
            let letter = response.substring('"'.length, response.length-'"'.length);
            return letter;
        });
    }

    includeLetter(gallowsId : any, letter : string, positions : any[]) : Promise<any> {
        let uri = Routes.INCLUDE_LETTER;
        let queryStr = "?gallowsId=" + gallowsId + "&letter=" + letter;

        positions = positions.map((position) => {
            return {
                key:position[0],
                value:position[1]
            };
        });
        let body = JSON.stringify(positions);

        return this.httpUtils.post(uri + queryStr, body);
    }

    excludeLetter(gallowsId : any, letter : string) : Promise<any> {
        let uri = Routes.EXCLUDE_LETTER;
        let queryStr = "?gallowsId=" + gallowsId + "&letter=" + letter;

        return this.httpUtils.post(uri + queryStr, "");
    }

    cleanGallows(gallowsId : any) : Promise<any> {
        let uri = Routes.CLEAN_GALLOWS;
        let queryStr = "?gallowsId=" + gallowsId;

        return this.httpUtils.post(uri + queryStr, "");
    }

    finishWords(gallowsId : any) : Promise<string[]> {
        let uri = Routes.FINISH_WORDS;
        let queryStr = "?gallowsId=" + gallowsId;

        return this.httpUtils.post(uri + queryStr, "")
        .then((response) => {
            response = response.text();
            let finishedWords = JSON.parse(response);
            return finishedWords;
        });
    }

    isFinished(gallowsId : any) : Promise<boolean> {
        let uri = Routes.IS_FINISHED;
        let queryStr = "?gallowsId=" + gallowsId;

        return this.httpUtils.get(uri + queryStr)
        .then((response) => {
            response = response.text();
            let finished = JSON.parse(response);
            return finished;
        });
    }

    getSentence(gallowsId : any) : Promise<string> {
        let uri = Routes.SENTENCE;
        let queryStr = "?gallowsId=" + gallowsId;

        return this.httpUtils.get(uri + queryStr)
        .then((response) => {
            let sentence = response.text();
            return sentence;
        });
    }

}
