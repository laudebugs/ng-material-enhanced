import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { highlighter } from '../../highlighter';

@Component({
  selector: 'form-field',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
  ],
  templateUrl: './form-field.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    'class': 'component-container',
  },
})
export class FormField {
  appearances: MatFormFieldAppearance[] = ['outline', 'fill'];
  formFieldSizes: string[] = ['small', 'medium', 'large', 'xlarge'];
  formFieldShapes: string[] = ['round', 'squircle', 'square'];

  // Text Input
  inputAppearance = signal<MatFormFieldAppearance>('outline');
  inputSize = signal('medium');
  inputShape = signal('squircle');
  inputLabel = signal('First Name');
  inputValue = signal('Alex');
  inputPrefixIcon = signal('person');
  inputClearable = signal(true);
  inputHint = signal('Enter your first name');
  inputDisabled = signal(false);

  inputCode = computed(() => {
    const classes = [`sz-${this.inputSize()}`, `sh-${this.inputShape()}`].join(' ');
    const prefix = this.inputPrefixIcon() ? `\n  <mat-icon matPrefix class="material-symbols-outlined">${this.inputPrefixIcon()}</mat-icon>` : '';
    const suffix = this.inputClearable() ? `\n  @if (inputValue()) {\n    <button matSuffix matIconButton aria-label="Clear" (click)="inputValue.set('')">\n      <mat-icon class="material-symbols-outlined">close</mat-icon>\n    </button>\n  }` : '';
    const hint = this.inputHint() ? `\n  <mat-hint>${this.inputHint()}</mat-hint>` : '';

    return highlighter.highlight(
      `<mat-form-field appearance="${this.inputAppearance()}" class="${classes}">
  <mat-label>${this.inputLabel()}</mat-label>${prefix}
  <input matInput [disabled]="${this.inputDisabled()}" [(ngModel)]="inputValue">${suffix}${hint}
</mat-form-field>`,
      { lang: 'html' }
    ).html;
  });

  // Password Input
  passwordAppearance = signal<MatFormFieldAppearance>('outline');
  passwordSize = signal('medium');
  passwordShape = signal('squircle');
  passwordValue = signal('SecretP@ssw0rd!');
  passwordHide = signal(true);
  passwordDisabled = signal(false);

  passwordCode = computed(() =>
    highlighter.highlight(
      `<mat-form-field appearance="${this.passwordAppearance()}" class="sz-${this.passwordSize()} sh-${this.passwordShape()}">
  <mat-label>Password</mat-label>
  <mat-icon matPrefix class="material-symbols-outlined">lock</mat-icon>
  <input matInput [type]="passwordHide() ? 'password' : 'text'" [disabled]="${this.passwordDisabled()}" [(ngModel)]="passwordValue">
  <button matSuffix matIconButton (click)="passwordHide.set(!passwordHide())" [attr.aria-label]="passwordHide() ? 'Show password' : 'Hide password'">
    <mat-icon class="material-symbols-outlined">{{passwordHide() ? 'visibility_off' : 'visibility'}}</mat-icon>
  </button>
</mat-form-field>`,
      { lang: 'html' }
    ).html
  );

  // Select
  selectAppearance = signal<MatFormFieldAppearance>('outline');
  selectSize = signal('medium');
  selectShape = signal('squircle');
  selectLabel = signal('Favorite Food');
  selectValue = signal('pizza');
  selectPrefixIcon = signal('restaurant');
  selectDisabled = signal(false);
  foods = [
    { value: 'steak', viewValue: 'Steak' },
    { value: 'pizza', viewValue: 'Pizza' },
    { value: 'tacos', viewValue: 'Tacos' },
    { value: 'burger', viewValue: 'Burger' },
  ];

  selectCode = computed(() =>
    highlighter.highlight(
      `<mat-form-field appearance="${this.selectAppearance()}" class="sz-${this.selectSize()} sh-${this.selectShape()}">
  <mat-label>${this.selectLabel()}</mat-label>
  ${this.selectPrefixIcon() ? `<mat-icon matPrefix class="material-symbols-outlined">${this.selectPrefixIcon()}</mat-icon>` : ''}
  <mat-select [(ngModel)]="selectValue" [disabled]="${this.selectDisabled()}">
    @for (food of foods; track food.value) {
      <mat-option [value]="food.value">{{food.viewValue}}</mat-option>
    }
  </mat-select>
</mat-form-field>`,
      { lang: 'html' }
    ).html
  );

  // Textarea
  textareaAppearance = signal<MatFormFieldAppearance>('outline');
  textareaSize = signal('medium');
  textareaShape = signal('squircle');
  textareaRows = signal(3);
  textareaLabel = signal('Feedback');
  textareaValue = signal('Angular Material enhanced components with full theme support.');
  textareaDisabled = signal(false);

  textareaCode = computed(() =>
    highlighter.highlight(
      `<mat-form-field appearance="${this.textareaAppearance()}" class="sz-${this.textareaSize()} sh-${this.textareaShape()}">
  <mat-label>${this.textareaLabel()}</mat-label>
  <textarea matInput rows="${this.textareaRows()}" [disabled]="${this.textareaDisabled()}" [(ngModel)]="textareaValue"></textarea>
</mat-form-field>`,
      { lang: 'html' }
    ).html
  );

  // Radio Buttons
  radioSize = signal('medium');
  radioValue = signal('Summer');
  radioDisabled = signal(false);
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  radioCode = computed(() =>
    highlighter.highlight(
      `<mat-radio-group [(ngModel)]="radioValue" [disabled]="${this.radioDisabled()}" aria-label="Favorite Season">
  @for (season of seasons; track season) {
    <mat-radio-button class="sz-${this.radioSize()}" [value]="season">{{season}}</mat-radio-button>
  }
</mat-radio-group>`,
      { lang: 'html' }
    ).html
  );
}
