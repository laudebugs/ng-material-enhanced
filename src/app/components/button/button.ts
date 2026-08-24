import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonAppearance, MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { highlighter } from '../../highlighter';

@Component({
  selector: 'buttons',
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatOptionModule, FormsModule, MatCheckboxModule],
  templateUrl: './button.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    'class': 'component-container'
  }
})
export class Buttons {
  buttonAppearance = signal<MatButtonAppearance>('outlined')
  buttonAppearances: MatButtonAppearance[] = ['outlined', 'tonal', 'filled', 'elevated']

  buttonSize = signal('medium')
  buttonSizes: string[] = ['xsmall', 'small', 'medium', 'large', 'xlarge']

  buttonShape = signal('round')
  buttonShapes: string[] = ['round', 'squircle', 'square']
  destructive = signal(false)
  buttonIcon = signal('shopping_cart_checkout')

  buttonCode = computed(() => highlighter.highlight(`<button matButton matButton="${this.buttonAppearance()}" class="${["sz-" + this.buttonSize(),"sh-" + this.buttonShape(), this.destructive() ? 'destructive' : ''].filter(c => c.length).join(" ")}">
  ${this.buttonIcon() ? `<mat-icon class="material-symbols-outlined">${this.buttonIcon()}</mat-icon>` : ''}
  Check out
</button>`, {
    lang: 'html'
  }).html)

  // icon button
  iconButtonCode = computed(() => highlighter.highlight(`<button matIconButton class="${["sz-" + this.buttonSize(),"sh-" + this.buttonShape(), this.destructive() ? 'destructive' : ''].filter(c => c.length).join(" ")}">
  <mat-icon class="material-symbols-outlined">${this.buttonIcon()}</mat-icon>
</button>`, {
    lang: 'html'
  }).html)
  iconButtonSize = signal('medium')
  iconButtonShape = signal('round')
  iconDestructive = signal(false)
  iconButtonIcon = signal('download')

  // mat mini fab
  miniFabSize = signal('medium')
  miniFabShape = signal('round')
  miniFabDestructive = signal(false)
  miniFabIcon = signal('token')
  miniFabCode = computed(() => highlighter.highlight(`<button matMiniFab class="${["sz-" + this.miniFabSize(),"sh-" + this.miniFabShape(), this.miniFabDestructive() ? 'destructive' : ''].filter(c => c.length).join(" ")}">
  <mat-icon class="material-symbols-outlined">${this.miniFabIcon()}</mat-icon>
</button>`, {
    lang: 'html'
  }).html)

  // mat fab
  fabSize = signal('medium')
  fabShape = signal('round')
  fabDestructive = signal(false)
  fabIcon = signal('heart_plus')
  fabCode = computed(() => highlighter.highlight(`<button matFab class="${["sz-" + this.fabSize(),"sh-" + this.fabShape(), this.fabDestructive() ? 'destructive' : ''].filter(c => c.length).join(" ")}">
  <mat-icon class="material-symbols-outlined">${this.fabIcon()}</mat-icon>
</button>`, {
    lang: 'html'
  }).html)

  // mat fab extended
  fabExtendedSize = signal('medium')
  fabExtendedShape = signal('round')
  fabExtendedDestructive = signal(false)
  fabExtendedIcon = signal('library_add')
  fabExtendedCode = computed(() => highlighter.highlight(`<button matFab extended class="${["sz-" + this.fabExtendedSize(),"sh-" + this.fabExtendedShape(), this.fabExtendedDestructive() ? 'destructive' : ''].filter(c => c.length).join(" ")}">
  <mat-icon class="material-symbols-outlined">${this.fabExtendedIcon()}</mat-icon>
  Add item
</button>`, {
    lang: 'html'
  }).html)
}
