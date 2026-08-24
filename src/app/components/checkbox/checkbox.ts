import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.html',
  imports: [MatCheckboxModule],
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        gap: 1em;
      }
    `,
  ],
})
export class Checkbox {}
