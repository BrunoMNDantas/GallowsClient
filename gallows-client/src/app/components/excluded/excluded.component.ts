import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-excluded',
    templateUrl: './excluded.component.html',
    styleUrls: ['./excluded.component.css']
})
export class ExcludedComponent implements OnInit {

    @Input() excluded : any[];



    constructor() { }

    ngOnInit() { }

}
