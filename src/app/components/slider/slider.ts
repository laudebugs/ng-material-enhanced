import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { highlighter } from '../../highlighter';

@Component({
  selector: 'slider',
  templateUrl: './slider.html',
  imports: [
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    'class': 'component-container',
  },
})
export class Slider {
  sliderSizes: string[] = ['xsmall', 'small', 'medium', 'large', 'xlarge'];

  // Continuous Slider
  sliderSize = signal('medium');
  sliderMin = signal(0);
  sliderMax = signal(100);
  sliderStep = signal(1);
  sliderValue = signal(40);
  sliderDisabled = signal(false);

  sliderCode = computed(() =>
    highlighter.highlight(
      `<mat-slider [min]="${this.sliderMin()}" [max]="${this.sliderMax()}" [step]="${this.sliderStep()}"${this.sliderDisabled() ? ' disabled' : ''} class="sz-${this.sliderSize()}">
  <input matSliderThumb [(ngModel)]="sliderValue" aria-label="Continuous slider">
</mat-slider>`,
      { lang: 'html' }
    ).html
  );

  // Discrete Slider
  discreteSize = signal('medium');
  discreteMin = signal(0);
  discreteMax = signal(100);
  discreteStep = signal(10);
  discreteValue = signal(50);
  discreteShowTicks = signal(true);
  discreteDisabled = signal(false);

  discreteCode = computed(() =>
    highlighter.highlight(
      `<mat-slider discrete${this.discreteShowTicks() ? ' showTickMarks' : ''} [min]="${this.discreteMin()}" [max]="${this.discreteMax()}" [step]="${this.discreteStep()}"${this.discreteDisabled() ? ' disabled' : ''} class="sz-${this.discreteSize()}">
  <input matSliderThumb [(ngModel)]="discreteValue" aria-label="Discrete slider">
</mat-slider>`,
      { lang: 'html' }
    ).html
  );

  // Range Slider
  rangeSize = signal('medium');
  rangeMin = signal(0);
  rangeMax = signal(100);
  rangeStep = signal(5);
  rangeStartValue = signal(25);
  rangeEndValue = signal(75);
  rangeDiscrete = signal(true);
  rangeShowTicks = signal(true);
  rangeDisabled = signal(false);

  rangeCode = computed(() =>
    highlighter.highlight(
      `<mat-slider${this.rangeDiscrete() ? ' discrete' : ''}${this.rangeShowTicks() ? ' showTickMarks' : ''} [min]="${this.rangeMin()}" [max]="${this.rangeMax()}" [step]="${this.rangeStep()}"${this.rangeDisabled() ? ' disabled' : ''} class="sz-${this.rangeSize()}">
  <input matSliderStartThumb [(ngModel)]="rangeStartValue" aria-label="Range start thumb">
  <input matSliderEndThumb [(ngModel)]="rangeEndValue" aria-label="Range end thumb">
</mat-slider>`,
      { lang: 'html' }
    ).html
  );
}
