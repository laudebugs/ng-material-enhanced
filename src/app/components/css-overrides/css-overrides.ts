import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
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
  imports: [
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
  ],
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

  viewTab = signal<'compiled' | 'scss' | 'module'>('compiled');
  selectedModule = signal<string>('mat-button.scss');
  copied = signal(false);

  selectedModuleData = computed(() => {
    return this.scssFiles.find(f => f.filename === this.selectedModule()) || this.scssFiles[0];
  });

  currentCodeRaw = computed(() => {
    const tab = this.viewTab();
    if (tab === 'compiled') {
      return COMPILED_CSS;
    }
    if (tab === 'scss') {
      return COMBINED_SCSS;
    }
    return this.selectedModuleData()?.content || '';
  });

  readonly currentLang = 'css';

  currentSizeKb = computed(() => {
    const tab = this.viewTab();
    if (tab === 'compiled') return this.cssSizeKb;
    if (tab === 'scss') return this.scssSizeKb;
    return this.selectedModuleData()?.sizeKb || '0.0';
  });

  currentLineCount = computed(() => {
    const tab = this.viewTab();
    if (tab === 'compiled') return this.cssLineCount;
    if (tab === 'scss') return this.scssLineCount;
    return this.selectedModuleData()?.lineCount || 0;
  });

  currentDownloadFilename = computed(() => {
    const tab = this.viewTab();
    if (tab === 'compiled') return 'material-overrides.css';
    if (tab === 'scss') return 'material-overrides.scss';
    return this.selectedModuleData()?.filename || 'module.scss';
  });

  downloadDataUri = computed(() => {
    const tab = this.viewTab();
    if (tab === 'compiled') return '/material-overrides.css';
    if (tab === 'scss') return '/material-overrides.scss';
    const content = encodeURIComponent(this.currentCodeRaw());
    return `data:text/plain;charset=utf-8,${content}`;
  });

  highlightedCode = computed(() => {
    const code = this.currentCodeRaw();
    return highlighter.highlight(code, { lang: this.currentLang }).html;
  });

  async copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.currentCodeRaw());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
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
