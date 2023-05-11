import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { SignatureComponent } from './signature.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
  <h1>Signature Component Demo</h1>
  <app-signature></app-signature>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
