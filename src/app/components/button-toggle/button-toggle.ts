import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { highlighter } from '../../highlighter';

@Component({
  selector: 'button-toggle',
  imports: [
    MatButtonToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './button-toggle.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    'class': 'component-container',
  },
})
export class ButtonToggle {
  // Standard Toggle
  buttonToggleSize = signal('medium');
  buttonToggleSizes: string[] = ['xsmall', 'small', 'medium', 'large', 'xlarge'];

  buttonToggleShape = signal('squircle');
  buttonToggleShapes: string[] = ['round', 'squircle', 'square'];

  buttonToggleDisabled = signal(false);
  buttonToggleVertical = signal(false);
  buttonToggleValue = signal('bold');

  buttonToggleCode = computed(() =>
    highlighter.highlight(
      `<mat-button-toggle-group [value]="'${this.buttonToggleValue()}'"${this.buttonToggleVertical() ? ' vertical' : ''}${this.buttonToggleDisabled() ? ' disabled' : ''} class="sz-${this.buttonToggleSize()} sh-${this.buttonToggleShape()}" aria-label="Font Style">
  <mat-button-toggle value="bold">Bold</mat-button-toggle>
  <mat-button-toggle value="italic">Italic</mat-button-toggle>
  <mat-button-toggle value="underline">Underline</mat-button-toggle>
</mat-button-toggle-group>`,
      { lang: 'html' }
    ).html
  );

  // Icon Toggle
  iconToggleSize = signal('medium');
  iconToggleShape = signal('squircle');
  iconToggleDisabled = signal(false);
  iconToggleVertical = signal(false);
  iconToggleValue = signal('center');

  iconToggleCode = computed(() =>
    highlighter.highlight(
      `<mat-button-toggle-group [value]="'${this.iconToggleValue()}'"${this.iconToggleVertical() ? ' vertical' : ''}${this.iconToggleDisabled() ? ' disabled' : ''} class="sz-${this.iconToggleSize()} sh-${this.iconToggleShape()}" aria-label="Text Alignment">
  <mat-button-toggle value="left" aria-label="Align left">
    <mat-icon class="material-symbols-outlined">format_align_left</mat-icon>
  </mat-button-toggle>
  <mat-button-toggle value="center" aria-label="Align center">
    <mat-icon class="material-symbols-outlined">format_align_center</mat-icon>
  </mat-button-toggle>
  <mat-button-toggle value="right" aria-label="Align right">
    <mat-icon class="material-symbols-outlined">format_align_right</mat-icon>
  </mat-button-toggle>
  <mat-button-toggle value="justify" aria-label="Align justify">
    <mat-icon class="material-symbols-outlined">format_align_justify</mat-icon>
  </mat-button-toggle>
</mat-button-toggle-group>`,
      { lang: 'html' }
    ).html
  );

  // Multiple Selection Toggle
  multipleToggleSize = signal('medium');
  multipleToggleShape = signal('squircle');
  multipleToggleDisabled = signal(false);
  multipleToggleVertical = signal(false);
  multipleToggleValue = signal<string[]>(['bold', 'italic']);

  multipleToggleCode = computed(() =>
    highlighter.highlight(
      `<mat-button-toggle-group multiple${this.multipleToggleVertical() ? ' vertical' : ''}${this.multipleToggleDisabled() ? ' disabled' : ''} class="sz-${this.multipleToggleSize()} sh-${this.multipleToggleShape()}" aria-label="Font Formatting">
  <mat-button-toggle value="bold">Bold</mat-button-toggle>
  <mat-button-toggle value="italic">Italic</mat-button-toggle>
  <mat-button-toggle value="underline">Underline</mat-button-toggle>
  <mat-button-toggle value="strikethrough">Strikethrough</mat-button-toggle>
</mat-button-toggle-group>`,
      { lang: 'html' }
    ).html
  );
}
