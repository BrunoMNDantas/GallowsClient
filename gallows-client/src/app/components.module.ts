import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { SentenceComponent } from './components/sentence/sentence.component';
import { IncludedComponent } from './components/included/included.component';
import { ExcludedComponent } from './components/excluded/excluded.component';
import { WordComponent } from './components/sentence/word/word.component';
import { ConsoleComponent } from './components/views/console-view/console/console.component';
import { ConsoleViewComponent } from './components/views/console-view/console-view.component';
import { UiViewComponent } from './components/views/ui-view/ui-view.component';
import { SelectViewComponent } from './components/views/select-view/select-view.component';
import { ResultViewComponent } from './components/views/result-view/result-view.component';
import { WordsLengthFormComponent } from './components/views/ui-view/words-length-form/words-length-form.component';
import { ContainsLetterFormComponent } from './components/views/ui-view/contains-letter-form/contains-letter-form.component';
import { LetterPositionFormComponent } from './components/views/ui-view/letter-position-form/letter-position-form.component';
import { ContainsWordsFormComponent } from './components/views/ui-view/contains-words-form/contains-words-form.component';
import { SelectLetterComponent } from './components/views/ui-view/letter-position-form/select-letter/select-letter.component';

const appRoutes: Routes = [
  { path: 'select-mode', component: SelectViewComponent },
  { path: 'console', component: ConsoleViewComponent },
  { path: 'ui', component: UiViewComponent },
  { path: 'result/:success', component: ResultViewComponent, pathMatch: 'full' },
];


@NgModule({
    declarations: [
        BodyComponent,
        HeaderComponent,
        SentenceComponent,
        IncludedComponent,
        ExcludedComponent,
        WordComponent,
        ConsoleComponent,
        ConsoleViewComponent,
        UiViewComponent,
        SelectViewComponent,
        ResultViewComponent,
        WordsLengthFormComponent,
        ContainsLetterFormComponent,
        LetterPositionFormComponent,
        ContainsWordsFormComponent,
        SelectLetterComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        RouterModule.forRoot(appRoutes /*,{enableTracing: true//debugging purposes only}*/)
    ],
    exports: [
        BodyComponent,
        HeaderComponent,
        SentenceComponent,
        IncludedComponent,
        ExcludedComponent,
        WordComponent,
        ConsoleComponent,
        ConsoleViewComponent,
        UiViewComponent,
        SelectViewComponent,
        ResultViewComponent,
        WordsLengthFormComponent,
        ContainsLetterFormComponent,
        LetterPositionFormComponent,
        ContainsWordsFormComponent,
        SelectLetterComponent
    ]
})

export class ComponentsModule { }
