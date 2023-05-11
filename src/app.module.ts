import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SignatureComponent } from './signature.component';
import { AppComponent } from './app.component';
import { App } from './main';

@NgModule({
  declarations: [App, AppComponent, SignatureComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [SignatureComponent],
})
export class AppModule {}
