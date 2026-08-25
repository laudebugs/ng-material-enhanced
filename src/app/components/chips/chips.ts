import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { highlighter } from '../../highlighter';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'chips',
  imports: [
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './chips.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    'class': 'component-container',
  },
})
export class Chips {
  readonly announcer = inject(LiveAnnouncer);
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  // Basic Chip
  chipSize = signal('medium');
  chipSizes: string[] = ['small', 'medium', 'large', 'xlarge'];

  chipShape = signal('round');
  chipShapes: string[] = ['round', 'squircle', 'square'];

  chipDisabled = signal(false);
  chipLabel = signal('Angular 22');
  chipIcon = signal('code');

  chipCode = computed(() =>
    highlighter.highlight(
      `<mat-chip-set>
  <mat-chip class="sz-${this.chipSize()} sh-${this.chipShape()}"${this.chipDisabled() ? ' disabled' : ''}>
    ${this.chipLabel()}
  </mat-chip>
</mat-chip-set>`,
      { lang: 'html' }
    ).html
  );

  // Avatar Chip
  avatarChipSize = signal('medium');
  avatarChipShape = signal('round');
  avatarChipDisabled = signal(false);
  avatarChipLabel = signal('Jane Doe');
  avatarUrl = signal('https://material.angular.dev/assets/img/examples/shiba1.jpg');

  avatarChipCode = computed(() =>
    highlighter.highlight(
      `<mat-chip-set>
  <mat-chip class="sz-${this.avatarChipSize()} sh-${this.avatarChipShape()}"${this.avatarChipDisabled() ? ' disabled' : ''}>
    <img matChipAvatar src="${this.avatarUrl()}" alt="Avatar" />
    ${this.avatarChipLabel()}
  </mat-chip>
</mat-chip-set>`,
      { lang: 'html' }
    ).html
  );

  // Removable Chip
  removableChipSize = signal('medium');
  removableChipShape = signal('round');
  removableChipLabel = signal('Removable Chip');

  removableChipCode = computed(() =>
    highlighter.highlight(
      `<mat-chip-set>
  <mat-chip class="sz-${this.removableChipSize()} sh-${this.removableChipShape()}">
    ${this.removableChipLabel()}
    <button matChipRemove aria-label="Remove chip">
      <mat-icon class="material-symbols-outlined">cancel</mat-icon>
    </button>
  </mat-chip>
</mat-chip-set>`,
      { lang: 'html' }
    ).html
  );

  // Chip Grid with Input
  gridChipSize = signal('medium');
  gridChipShape = signal('round');
  fruits = signal<Fruit[]>([{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }]);

  addFruit(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.fruits.update(fruits => [...fruits, { name: value }]);
    }
    event.chipInput!.clear();
  }

  removeFruit(fruit: Fruit): void {
    this.fruits.update(fruits => {
      const index = fruits.indexOf(fruit);
      if (index < 0) return fruits;
      fruits.splice(index, 1);
      this.announcer.announce(`Removed ${fruit.name}`);
      return [...fruits];
    });
  }

  editFruit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.removeFruit(fruit);
      return;
    }
    this.fruits.update(fruits => {
      const index = fruits.indexOf(fruit);
      if (index >= 0) {
        fruits[index].name = value;
        return [...fruits];
      }
      return fruits;
    });
  }

  gridCode = computed(() =>
    highlighter.highlight(
      `<mat-form-field class="example-chip-list sz-medium" appearance="outline">
  <mat-label>Favorite Fruits</mat-label>
  <mat-chip-grid #chipGrid aria-label="Enter fruits">
    @for (fruit of fruits(); track fruit.name) {
      <mat-chip-row
        class="sz-${this.gridChipSize()} sh-${this.gridChipShape()}"
        [editable]="true"
        (edited)="editFruit(fruit, $event)"
        (removed)="removeFruit(fruit)">
        <button matChipEdit [attr.aria-label]="'edit ' + fruit.name">
          <mat-icon class="material-symbols-outlined">edit</mat-icon>
        </button>
        {{fruit.name}}
        <button matChipRemove [attr.aria-label]="'remove ' + fruit.name">
          <mat-icon class="material-symbols-outlined">cancel</mat-icon>
        </button>
      </mat-chip-row>
    }
  </mat-chip-grid>
  <input placeholder="New fruit..." [matChipInputFor]="chipGrid" (matChipInputTokenEnd)="addFruit($event)" />
</mat-form-field>`,
      { lang: 'html' }
    ).html
  );
}
