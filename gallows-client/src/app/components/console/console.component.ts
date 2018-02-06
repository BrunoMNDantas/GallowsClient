import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-console',
    templateUrl: './console.component.html',
    styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

    @Output() newLine: EventEmitter<string> = new EventEmitter();
    @ViewChild('textElem') textElement: ElementRef;
    text : string = "";
    input : string = "";



    constructor() { }

    ngOnInit() { }



    onEnter() {
        let currentInput = (this.input == null) ? "" : this.input;

        this.writeLine(">" + currentInput);

        this.input = null;

        this.newLine.emit(currentInput);
    }

    writeLine(line : string) {
        this.text += "\n" + line;
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            let height = this.textElement.nativeElement.scrollHeight;
            this.textElement.nativeElement.scrollTop = height;
        } catch(err) { }
    }

}
