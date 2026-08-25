import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { highlighter } from '../../highlighter';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.html',
  imports: [
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatSliderModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    'class': 'component-container',
  },
})
export class ProgressBar {
  progressSizes: string[] = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
  progressShapes: string[] = ['round', 'squircle', 'square'];

  // Determinate
  determinateSize = signal('medium');
  determinateShape = signal('round');
  determinateValue = signal(65);

  determinateCode = computed(() =>
    highlighter.highlight(
      `<mat-progress-bar mode="determinate" [value]="${this.determinateValue()}" class="sz-${this.determinateSize()} sh-${this.determinateShape()}"></mat-progress-bar>`,
      { lang: 'html' }
    ).html
  );

  // Indeterminate
  indeterminateSize = signal('medium');
  indeterminateShape = signal('round');

  indeterminateCode = computed(() =>
    highlighter.highlight(
      `<mat-progress-bar mode="indeterminate" class="sz-${this.indeterminateSize()} sh-${this.indeterminateShape()}"></mat-progress-bar>`,
      { lang: 'html' }
    ).html
  );

  // Buffer
  bufferSize = signal('medium');
  bufferShape = signal('round');
  bufferValue = signal(40);
  bufferBufferValue = signal(75);

  bufferCode = computed(() =>
    highlighter.highlight(
      `<mat-progress-bar mode="buffer" [value]="${this.bufferValue()}" [bufferValue]="${this.bufferBufferValue()}" class="sz-${this.bufferSize()} sh-${this.bufferShape()}"></mat-progress-bar>`,
      { lang: 'html' }
    ).html
  );

  // Query
  querySize = signal('medium');
  queryShape = signal('round');

  queryCode = computed(() =>
    highlighter.highlight(
      `<mat-progress-bar mode="query" class="sz-${this.querySize()} sh-${this.queryShape()}"></mat-progress-bar>`,
      { lang: 'html' }
    ).html
  );
}
