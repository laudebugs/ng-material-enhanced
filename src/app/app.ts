import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
import { createThemeCss } from '@tanstack/highlight/theme';
import { githubDarkTheme } from '@tanstack/highlight/themes/github-dark';
import { githubLightTheme } from '@tanstack/highlight/themes/github-light';

interface NavItem {
  path: string;
  label: string;
  icon: string;
  exact: boolean;
}

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatIconModule, MatSidenavModule, RouterOutlet, RouterModule],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav mode="side" opened class="sidenav">
        <div class="sidenav-header">
          <mat-icon class="material-symbols-outlined logo-icon">widgets</mat-icon>
          <span class="logo-title">Material Enhanced</span>
        </div>
        <nav class="nav-list" aria-label="Component navigation">
          @for (item of navItems; track item.path) {
            <a
              matButton
              [matButton]="rla.isActive ? 'tonal' : 'text'"
              [routerLink]="item.path"
              routerLinkActive
              #rla="routerLinkActive"
              [routerLinkActiveOptions]="{ exact: item.exact }"
              class="sh-square sz-medium nav-btn"
              [class.active]="rla.isActive"
              [attr.aria-current]="rla.isActive ? 'page' : null">
              <mat-icon class="material-symbols-outlined">{{ item.icon }}</mat-icon>
              <span>{{ item.label }}</span>
            </a>
          }
        </nav>
      </mat-sidenav>
      <mat-sidenav-content class="sidenav-content">
        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
        height: 100dvh;
      }

      .sidenav-container {
        height: 100%;
        width: 100%;
      }

      .sidenav {
        width: 250px;
        box-sizing: border-box;
        padding: 1.25rem 0.75rem;
        background-color: var(--mat-sys-surface-container-low, var(--mat-sys-surface));
        border-right: 1px solid var(--mat-sys-outline-variant);
      }

      .sidenav-header {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        padding: 0.25rem 0.5rem 1.25rem;
        margin-bottom: 0.75rem;
        border-bottom: 1px solid var(--mat-sys-outline-variant);

        .logo-icon {
          color: var(--mat-sys-primary);
          font-size: 1.75rem;
          width: 1.75rem;
          height: 1.75rem;
        }

        .logo-title {
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--mat-sys-on-surface);
        }
      }

      .nav-list {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }

      .nav-btn {
        width: 100%;
        justify-content: flex-start;
        text-align: left;
        font-weight: 500;
        letter-spacing: 0.01em;

        mat-icon {
          margin-right: 0.625rem;
        }

        &.active {
          font-weight: 600;
        }
      }

      .sidenav-content {
        overflow-y: auto;
        background-color: var(--mat-sys-surface);
      }

      .main-content {
        padding: 2rem;
        max-width: 1280px;
        box-sizing: border-box;
      }
    `,
  ],
})
export class App implements OnInit {
  navItems: NavItem[] = [
    { path: '/', label: 'Overview', icon: 'dashboard', exact: true },
    { path: '/buttons', label: 'Buttons', icon: 'smart_button', exact: false },
    { path: '/button-toggle', label: 'Button Toggle', icon: 'view_week', exact: false },
    { path: '/checkbox', label: 'Checkbox', icon: 'check_box', exact: false },
    { path: '/chips', label: 'Chips', icon: 'category', exact: false },
    { path: '/form-field', label: 'Form Field', icon: 'input', exact: false },
    { path: '/progress-loader', label: 'Progress Bar', icon: 'download', exact: false },
    { path: '/slider', label: 'Slider', icon: 'linear_scale', exact: false },
    { path: '/toggle', label: 'Slide Toggle', icon: 'toggle_on', exact: false },
  ];

  ngOnInit(): void {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = createThemeCss({
      light: githubLightTheme,
      dark: githubDarkTheme,
      darkSelector: '.dark',
    });
    document.head.appendChild(styleEl);
  }
}
