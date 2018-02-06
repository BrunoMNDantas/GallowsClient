import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { SentenceComponent } from './components/sentence/sentence.component';
import { ConsoleComponent } from './components/console/console.component';
import { IncludedComponent } from './components/included/included.component';
import { ExcludedComponent } from './components/excluded/excluded.component';
import { WordComponent } from './components/word/word.component';

import {  EngineService } from './services/engine.service';
import {  GallowsService } from './services/gallows.service';
import {  HttpUtils } from './services/http-utils';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    SentenceComponent,
    ConsoleComponent,
    IncludedComponent,
    ExcludedComponent,
    WordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpModule
  ],
  providers: [
      EngineService,
      GallowsService,
      HttpUtils
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
