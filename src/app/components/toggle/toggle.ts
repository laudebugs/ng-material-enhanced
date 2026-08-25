import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { highlighter } from '../../highlighter';

@Component({
  selector: 'toggle',
  templateUrl: './toggle.html',
  imports: [
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    'class': 'component-container',
  },
})
export class Toggle {
  toggleSizes: string[] = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
  labelPositions: ('after' | 'before')[] = ['after', 'before'];

  // Basic Slide Toggle
  toggleSize = signal('medium');
  toggleChecked = signal(true);
  toggleDisabled = signal(false);
  toggleRequired = signal(false);
  toggleHideIcon = signal(false);
  toggleLabelPosition = signal<'after' | 'before'>('after');
  toggleLabel = signal('Enable push notifications');

  toggleCode = computed(() =>
    highlighter.highlight(
      `<mat-slide-toggle [checked]="${this.toggleChecked()}" [disabled]="${this.toggleDisabled()}" [required]="${this.toggleRequired()}" [hideIcon]="${this.toggleHideIcon()}" labelPosition="${this.toggleLabelPosition()}" class="sz-${this.toggleSize()}">
  ${this.toggleLabel()}
</mat-slide-toggle>`,
      { lang: 'html' }
    ).html
  );

  // Settings Toggles
  settingsSize = signal('medium');
  wifi = signal(true);
  bluetooth = signal(false);
  airplaneMode = signal(false);
  darkMode = signal(true);

  settingsCode = computed(() =>
    highlighter.highlight(
      `<div class="toggle-group">
  <mat-slide-toggle class="sz-${this.settingsSize()}" [(ngModel)]="wifi">Wi-Fi</mat-slide-toggle>
  <mat-slide-toggle class="sz-${this.settingsSize()}" [(ngModel)]="bluetooth">Bluetooth</mat-slide-toggle>
  <mat-slide-toggle class="sz-${this.settingsSize()}" [(ngModel)]="airplaneMode">Airplane Mode</mat-slide-toggle>
  <mat-slide-toggle class="sz-${this.settingsSize()}" [(ngModel)]="darkMode">Dark Mode</mat-slide-toggle>
</div>`,
      { lang: 'html' }
    ).html
  );
}
