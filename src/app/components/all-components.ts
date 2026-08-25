import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'all-components',
  imports: [MatButtonModule, MatIconModule, RouterModule],
  template: `
    <div class="overview-header">
      <h2>Components Overview</h2>
      <p class="subtitle">Select a component to view interactive configurations and code snippets.</p>
    </div>
    <div class="components-grid">
      <a matButton="outlined" class="sh-square sz-large component-card-btn" [routerLink]="['/buttons']">
        <mat-icon class="material-symbols-outlined">smart_button</mat-icon>
        <span class="btn-label">Buttons</span>
      </a>
      <a matButton="outlined" class="sh-square sz-large component-card-btn" [routerLink]="['/button-toggle']">
        <mat-icon class="material-symbols-outlined">view_week</mat-icon>
        <span class="btn-label">Button Toggle</span>
      </a>
      <a matButton="outlined" class="sh-square sz-large component-card-btn" [routerLink]="['/checkbox']">
        <mat-icon class="material-symbols-outlined">check_box</mat-icon>
        <span class="btn-label">Checkbox</span>
      </a>
      <a matButton="outlined" class="sh-square sz-large component-card-btn" [routerLink]="['/chips']">
        <mat-icon class="material-symbols-outlined">category</mat-icon>
        <span class="btn-label">Chips</span>
      </a>
      <a matButton="outlined" class="sh-square sz-large component-card-btn" [routerLink]="['/form-field']">
        <mat-icon class="material-symbols-outlined">input</mat-icon>
        <span class="btn-label">Form Field</span>
      </a>
      <a matButton="outlined" class="sh-square sz-large component-card-btn" [routerLink]="['/progress-loader']">
        <mat-icon class="material-symbols-outlined">download</mat-icon>
        <span class="btn-label">Progress Bar</span>
      </a>
      <a matButton="outlined" class="sh-square sz-large component-card-btn" [routerLink]="['/slider']">
        <mat-icon class="material-symbols-outlined">linear_scale</mat-icon>
        <span class="btn-label">Slider</span>
      </a>
      <a matButton="outlined" class="sh-square sz-large component-card-btn" [routerLink]="['/toggle']">
        <mat-icon class="material-symbols-outlined">toggle_on</mat-icon>
        <span class="btn-label">Slide Toggle</span>
      </a>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        width: 100%;
      }

      .overview-header {
        h2 {
          margin: 0 0 0.25rem 0;
          font-size: 1.75rem;
          font-weight: 600;
        }

        .subtitle {
          margin: 0;
          color: var(--mat-sys-on-surface-variant);
          font-size: 0.95rem;
        }
      }

      .components-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
      }

      .component-card-btn {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        justify-content: flex-start;
        padding: 0 1.25rem;
        font-size: 1rem;
        font-weight: 500;
      }
    `,
  ],
})
export class AllComponents {}
