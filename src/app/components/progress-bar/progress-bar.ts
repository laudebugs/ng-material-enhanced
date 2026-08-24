import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.html',
  imports: [MatProgressBarModule],
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
export class ProgressBar {}
