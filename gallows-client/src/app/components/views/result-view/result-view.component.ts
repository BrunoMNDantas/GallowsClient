import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-result-view',
    templateUrl: './result-view.component.html',
    styleUrls: ['./result-view.component.css']
})
export class ResultViewComponent implements OnInit, OnDestroy {

    image : string;
    message: string;
    private subscription: any;



    constructor(private route: ActivatedRoute) {}



    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            let success = params["success"] === 'true';

            if(success) {
                this.image = "assets/images/happy.jpg";
                this.message = "Done";
            } else {
                this.image = "assets/images/sad.png";
                this.message = "Your sentence has words that I don't know";
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
