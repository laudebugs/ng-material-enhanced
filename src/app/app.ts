import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, RouterOutlet } from '@angular/router';
import { createThemeCss } from '@tanstack/highlight/theme';
import { githubDarkTheme } from '@tanstack/highlight/themes/github-dark';
import { githubLightTheme } from '@tanstack/highlight/themes/github-light';
@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatIconModule, RouterOutlet, RouterModule],
  template: ` <router-outlet></router-outlet> `,
  styles: [
    `
      :host {
        display: block;
        padding: 2em;
      }
    `,
  ],
})
export class App implements OnInit {
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
