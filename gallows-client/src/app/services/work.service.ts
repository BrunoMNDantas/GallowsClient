import { EventEmitter } from '@angular/core';

export class Work<In, Out> {
    constructor(
        public input : In,
        public resolve : (Out) => any,
        public reject : (any) => any){}
}

export class WorkService<In, Out> {

    work : Work<In, Out>[] = [];
    workEvent : EventEmitter<void> = new EventEmitter();



    public require(input : In) : Promise<Out> {
        let promise = new Promise<Out>((resolve, reject) => {
            let work = new Work(input, resolve, reject);
            this.work.push(work);
            this.workEvent.emit();
        });

        return promise;
    }

    public requireRequest() : Promise<Work<In, Out>> {
        let work = this.takeWork();

        if(work)
            return Promise.resolve(work);

        return new Promise((resolve, reject) => {
            let subscription = this.workEvent.subscribe(() => {
                let work = this.takeWork();

                if(work) {
                    resolve(work);
                    subscription.unsubscribe();
                }
            });
        });
    }

    takeWork() : Work<In, Out> {
        if(this.work.length === 0)
            return null;

        return this.work.splice(0, 1)[0];
    }

}
