import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { highlighter } from '../../highlighter';

export interface Task {
  name: string;
  completed: boolean;
}

@Component({
  selector: 'checkbox',
  imports: [
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
  ],
  templateUrl: './checkbox.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    'class': 'component-container',
  },
})
export class Checkbox {
  // Standard Checkbox
  checkboxSize = signal('medium');
  checkboxSizes: string[] = ['small', 'medium', 'large', 'xlarge'];

  checkboxLabel = signal('Accept terms and conditions');
  checked = signal(true);
  indeterminate = signal(false);
  disabled = signal(false);
  destructive = signal(false);
  required = signal(false);
  labelPosition = signal<'after' | 'before'>('after');
  labelPositions: ('after' | 'before')[] = ['after', 'before'];

  checkboxCode = computed(() => {
    const classes = [
      `sz-${this.checkboxSize()}`,
      this.destructive() ? 'destructive' : '',
    ].filter(c => c.length).join(' ');

    return highlighter.highlight(
      `<mat-checkbox class="${classes}" [checked]="${this.checked()}" [indeterminate]="${this.indeterminate()}" [disabled]="${this.disabled()}" [required]="${this.required()}" labelPosition="${this.labelPosition()}">
  ${this.checkboxLabel()}
</mat-checkbox>`,
      { lang: 'html' }
    ).html;
  });

  // Destructive Checkbox
  destructiveSize = signal('medium');
  destructiveChecked = signal(true);
  destructiveIndeterminate = signal(false);
  destructiveDisabled = signal(false);
  destructiveLabel = signal('Delete all personal data and logs');

  destructiveCode = computed(() =>
    highlighter.highlight(
      `<mat-checkbox class="destructive sz-${this.destructiveSize()}" [checked]="${this.destructiveChecked()}" [indeterminate]="${this.destructiveIndeterminate()}" [disabled]="${this.destructiveDisabled()}">
  ${this.destructiveLabel()}
</mat-checkbox>`,
      { lang: 'html' }
    ).html
  );

  // Group / Parent-Child Checkboxes
  groupSize = signal('medium');
  tasks = signal<Task[]>([
    { name: 'Push notifications', completed: true },
    { name: 'Email digest', completed: false },
    { name: 'SMS alerts', completed: true },
  ]);

  allComplete = computed(() => this.tasks().every(t => t.completed));
  someComplete = computed(() => this.tasks().some(t => t.completed) && !this.allComplete());

  setAll(completed: boolean) {
    this.tasks.update(tasks => tasks.map(t => ({ ...t, completed })));
  }

  updateTask(index: number, completed: boolean) {
    this.tasks.update(tasks => {
      const updated = [...tasks];
      updated[index] = { ...updated[index], completed };
      return updated;
    });
  }

  groupCode = computed(() =>
    highlighter.highlight(
      `<div class="checkbox-group">
  <mat-checkbox class="sz-${this.groupSize()}" [checked]="${this.allComplete()}" [indeterminate]="${this.someComplete()}" (change)="setAll($event.checked)">
    Select All Notifications
  </mat-checkbox>
  <div class="sub-tasks" style="display: flex; flex-direction: column; margin-left: 1.5rem; gap: 0.5rem;">
    @for (task of tasks(); track task.name) {
      <mat-checkbox class="sz-${this.groupSize()}" [(ngModel)]="task.completed">
        {{task.name}}
      </mat-checkbox>
    }
  </div>
</div>`,
      { lang: 'html' }
    ).html
  );
}
