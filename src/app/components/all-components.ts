import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'all-components',
  imports: [MatButtonModule, MatIconModule, RouterModule],
  template: `
    <button matButton="outlined" [routerLink]="['/buttons']">
      <mat-icon class="material-symbols-outlined"> left_click </mat-icon>
      Buttons
    </button>
    <!-- button toggle -->
    <button matButton="outlined" [routerLink]="['/button-toggle']">
      <mat-icon class="material-symbols-outlined"> toggle_on </mat-icon>
      Button Toggle
    </button>
    <!-- Form Field -->
    <button matButton="outlined" [routerLink]="['/form-field']">
      <mat-icon class="material-symbols-outlined"> input </mat-icon>
      Form Field
    </button>
    <!-- chips -->
    <button matButton="outlined" [routerLink]="['/chips']">
      <mat-icon class="material-symbols-outlined"> category </mat-icon>
      Chips
    </button>
    <!-- Slider -->
    <button matButton="outlined" [routerLink]="['/slider']">
      <mat-icon class="material-symbols-outlined"> drag_handle </mat-icon>
      Slider
    </button>
    <!-- Toggle -->
    <button matButton="outlined" [routerLink]="['/toggle']">
      <mat-icon class="material-symbols-outlined"> toggle_on </mat-icon>
      Toggle
    </button>
    <!-- progress loader -->
    <button matButton="outlined" [routerLink]="['/progress-loader']">
      <mat-icon class="material-symbols-outlined"> download </mat-icon>
      Progress Loader
    </button>
    <!-- checkbox -->
    <button matButton="outlined" [routerLink]="['/checkbox']">
      <mat-icon class="material-symbols-outlined"> check_box </mat-icon>
      Checkbox
    </button>
  `,
  styles: [
    `
      :host {
        width: 100%;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
    `,
  ],
})
export class AllComponents {}
