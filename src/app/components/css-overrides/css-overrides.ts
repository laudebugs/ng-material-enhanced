import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import {
  COMPILED_CSS,
  COMBINED_SCSS,
  CSS_LINE_COUNT,
  CSS_SIZE_KB,
  GENERATED_AT,
  SCSS_FILES,
  SCSS_LINE_COUNT,
  SCSS_SIZE_KB,
} from '../../generated/css-overrides.data';
import { highlighter } from '../../highlighter';

@Component({
  selector: 'css-overrides',
  imports: [MatButtonModule, MatIconModule, MatButtonToggleModule, FormsModule],
  templateUrl: './css-overrides.html',
  host: {
    'class': 'component-container',
  },
})
export class CssOverrides {
  readonly cssSizeKb = CSS_SIZE_KB;
  readonly scssSizeKb = SCSS_SIZE_KB;
  readonly cssLineCount = CSS_LINE_COUNT;
  readonly scssLineCount = SCSS_LINE_COUNT;
  readonly generatedAt = GENERATED_AT;
  readonly scssFiles = SCSS_FILES;

  viewMode = signal<'css' | 'scss'>('css');
  copied = signal(false);

  currentCodeRaw = computed(() => {
    return this.viewMode() === 'css' ? COMPILED_CSS : COMBINED_SCSS;
  });

  highlightedCode = computed(() => {
    const lang = this.viewMode() === 'css' ? 'css' : 'scss';
    const code = this.currentCodeRaw();
    return highlighter.highlight(code, { lang }).html;
  });

  async copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.currentCodeRaw());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = this.currentCodeRaw();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }
  }
}
