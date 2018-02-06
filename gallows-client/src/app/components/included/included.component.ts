import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-included',
    templateUrl: './included.component.html',
    styleUrls: ['./included.component.css']
})
export class IncludedComponent implements OnInit {

    @Input() included : any[];



    constructor() { }

    ngOnInit() { }

}
