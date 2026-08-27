import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'all-components',
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatOptionModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './all-components.html',
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 100%;
      }

      .overview-hero {
        padding: 2rem;
        border-radius: 12px;
        background: var(--mat-sys-surface-container-low);
        border: 1px solid var(--mat-sys-outline-variant);

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          background: var(--mat-sys-secondary-container);
          color: var(--mat-sys-on-secondary-container);
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 0.75rem;

          mat-icon {
            font-size: 1rem;
            width: 1rem;
            height: 1rem;
          }
        }

        h2 {
          margin: 0 0 0.5rem 0;
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--mat-sys-on-surface);
        }

        .hero-description {
          margin: 0 0 1.5rem 0;
          font-size: 1rem;
          line-height: 1.6;
          color: var(--mat-sys-on-surface-variant);
          max-width: 860px;

          code {
            padding: 0.15rem 0.35rem;
            border-radius: 4px;
            background: var(--mat-sys-surface-container-highest);
            font-family: 'Google Sans Code', monospace;
            font-size: 0.9em;
            color: var(--mat-sys-primary);
          }
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
      }

      .quick-nav-bar {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
        padding: 0.75rem 1rem;
        background: var(--mat-sys-surface-container);
        border-radius: 8px;
        border: 1px solid var(--mat-sys-outline-variant);

        .quick-nav-label {
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--mat-sys-on-surface-variant);
          margin-right: 0.25rem;
        }
      }

      .showcase-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .showcase-section {
        border: 1px solid var(--mat-sys-outline-variant);
        border-radius: 12px;
        background: var(--mat-sys-surface);
        overflow: hidden;

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: var(--mat-sys-surface-container-lowest);
          border-bottom: 1px solid var(--mat-sys-outline-variant);

          .section-title-wrap {
            display: flex;
            align-items: center;
            gap: 0.75rem;

            .section-icon {
              color: var(--mat-sys-primary);
            }

            h3 {
              margin: 0;
              font-size: 1.25rem;
              font-weight: 600;

              code {
                font-size: 0.85em;
                font-family: 'Google Sans Code', monospace;
                color: var(--mat-sys-on-surface-variant);
                font-weight: normal;
              }
            }
          }
        }

        .variant-group {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--mat-sys-outline-variant);

          &:last-child {
            border-bottom: none;
          }

          .variant-label {
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--mat-sys-on-surface-variant);
            margin-bottom: 1rem;

            code {
              text-transform: none;
              font-family: 'Google Sans Code', monospace;
              color: var(--mat-sys-primary);
            }
          }

          .variant-items-row {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
          }

          .variant-items-column {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.875rem;
          }
        }
      }

      .form-fields-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 1rem;
        align-items: start;
      }

      .progress-bars-stack,
      .sliders-stack {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        max-width: 600px;

        .progress-row,
        .slider-row {
          display: grid;
          grid-template-columns: 160px 1fr;
          align-items: center;
          gap: 1rem;

          .size-label {
            font-size: 0.85rem;
            font-weight: 500;
            color: var(--mat-sys-on-surface-variant);
          }
        }
      }

      @media (max-width: 849.98px) {
        .overview-hero {
          padding: 1.25rem 1rem;

          h2 {
            font-size: 1.5rem;
          }
        }

        .showcase-section {
          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .variant-group {
            padding: 1rem;
          }
        }

        .progress-bars-stack .progress-row,
        .sliders-stack .slider-row {
          grid-template-columns: 1fr;
          gap: 0.25rem;
        }
      }
    `,
  ],
})
export class AllComponents {}
