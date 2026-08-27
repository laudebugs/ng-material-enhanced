import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonAppearance, MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { highlighter } from '../../highlighter';

@Component({
  selector: 'menu-page',
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
  ],
  templateUrl: './menu.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    class: 'component-container',
  },
})
export class Menu {
  // Standard Menu Configurator
  menuSize = signal<string>('medium');
  menuSizes: string[] = ['xsmall', 'small', 'medium', 'large', 'xlarge'];

  menuShape = signal<string>('squircle');
  menuShapes: string[] = ['round', 'squircle', 'square'];

  buttonAppearance = signal<MatButtonAppearance>('filled');
  buttonAppearances: MatButtonAppearance[] = ['filled', 'tonal', 'outlined', 'elevated', 'text'];

  showIcons = signal(true);
  includeDestructive = signal(true);
  includeDivider = signal(true);
  disabledAction = signal(false);

  menuCode = computed(() => {
    const sizeCls = `sz-${this.menuSize()}`;
    const shapeCls = `sh-${this.menuShape()}`;
    const menuClasses = `${sizeCls} ${shapeCls}`.trim();

    return highlighter.highlight(
      `<!-- Menu Trigger Button -->
<button
  matButton="${this.buttonAppearance()}"
  class="${menuClasses}"
  [matMenuTriggerFor]="actionMenu"
  aria-label="Open action menu">
  ${this.showIcons() ? `<mat-icon class="material-symbols-outlined">menu_open</mat-icon>\n  ` : ''}Actions
  <mat-icon class="material-symbols-outlined">arrow_drop_down</mat-icon>
</button>

<!-- Mat Menu -->
<mat-menu #actionMenu="matMenu" class="${menuClasses}">
  <button mat-menu-item>
    ${this.showIcons() ? `<mat-icon class="material-symbols-outlined">edit</mat-icon>\n    ` : ''}<span>Edit document</span>
  </button>
  <button mat-menu-item>
    ${this.showIcons() ? `<mat-icon class="material-symbols-outlined">content_copy</mat-icon>\n    ` : ''}<span>Duplicate</span>
  </button>
  <button mat-menu-item${this.disabledAction() ? ' [disabled]="true"' : ''}>
    ${this.showIcons() ? `<mat-icon class="material-symbols-outlined">share</mat-icon>\n    ` : ''}<span>Share link</span>
  </button>
  ${this.includeDivider() ? `<mat-divider></mat-divider>\n  ` : ''}${
        this.includeDestructive()
          ? `<button mat-menu-item class="destructive">
    ${this.showIcons() ? `<mat-icon class="material-symbols-outlined">delete</mat-icon>\n    ` : ''}<span>Delete permanently</span>
  </button>`
          : ''
      }
</mat-menu>`,
      { lang: 'html' }
    ).html;
  });

  // Nested / Submenu Configurator
  nestedSize = signal<string>('medium');
  nestedShape = signal<string>('squircle');

  nestedCode = computed(() => {
    const sizeCls = `sz-${this.nestedSize()}`;
    const shapeCls = `sh-${this.nestedShape()}`;
    const menuClasses = `${sizeCls} ${shapeCls}`.trim();

    return highlighter.highlight(
      `<!-- Nested Cascading Menu -->
<button
  matButton="tonal"
  class="${menuClasses}"
  [matMenuTriggerFor]="rootMenu">
  <mat-icon class="material-symbols-outlined">folder_open</mat-icon>
  File Manager
</button>

<mat-menu #rootMenu="matMenu" class="${menuClasses}">
  <button mat-menu-item [matMenuTriggerFor]="shareSubmenu">
    <mat-icon class="material-symbols-outlined">share</mat-icon>
    <span>Share Options</span>
  </button>
  <button mat-menu-item [matMenuTriggerFor]="exportSubmenu">
    <mat-icon class="material-symbols-outlined">download</mat-icon>
    <span>Export Format</span>
  </button>
  <mat-divider></mat-divider>
  <button mat-menu-item class="destructive">
    <mat-icon class="material-symbols-outlined">delete_forever</mat-icon>
    <span>Trash</span>
  </button>
</mat-menu>

<!-- Submenu: Share -->
<mat-menu #shareSubmenu="matMenu" class="${menuClasses}">
  <button mat-menu-item>
    <mat-icon class="material-symbols-outlined">mail</mat-icon>
    <span>Send Email</span>
  </button>
  <button mat-menu-item>
    <mat-icon class="material-symbols-outlined">link</mat-icon>
    <span>Copy Link</span>
  </button>
</mat-menu>

<!-- Submenu: Export -->
<mat-menu #exportSubmenu="matMenu" class="${menuClasses}">
  <button mat-menu-item>
    <mat-icon class="material-symbols-outlined">picture_as_pdf</mat-icon>
    <span>PDF Document</span>
  </button>
  <button mat-menu-item>
    <mat-icon class="material-symbols-outlined">csv</mat-icon>
    <span>CSV Spreadsheet</span>
  </button>
</mat-menu>`,
      { lang: 'html' }
    ).html;
  });

  // Icon Trigger Menu
  iconMenuSize = signal<string>('medium');
  iconMenuShape = signal<string>('squircle');

  iconMenuCode = computed(() => {
    const sizeCls = `sz-${this.iconMenuSize()}`;
    const shapeCls = `sh-${this.iconMenuShape()}`;
    const menuClasses = `${sizeCls} ${shapeCls}`.trim();

    return highlighter.highlight(
      `<!-- Icon Button Trigger Menu -->
<button
  matIconButton
  class="${menuClasses}"
  [matMenuTriggerFor]="moreMenu"
  aria-label="More options">
  <mat-icon class="material-symbols-outlined">more_vert</mat-icon>
</button>

<mat-menu #moreMenu="matMenu" class="${menuClasses}">
  <button mat-menu-item>
    <mat-icon class="material-symbols-outlined">settings</mat-icon>
    <span>Preferences</span>
  </button>
  <button mat-menu-item>
    <mat-icon class="material-symbols-outlined">help</mat-icon>
    <span>Help & Support</span>
  </button>
  <mat-divider></mat-divider>
  <button mat-menu-item class="destructive">
    <mat-icon class="material-symbols-outlined">logout</mat-icon>
    <span>Sign Out</span>
  </button>
</mat-menu>`,
      { lang: 'html' }
    ).html;
  });
}
