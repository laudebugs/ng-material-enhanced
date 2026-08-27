import { execSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { deflateRawSync } from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const scssDir = join(rootDir, 'src', 'scss');
const publicDir = join(rootDir, 'public');
const generatedDir = join(rootDir, 'src', 'app', 'generated');

function ensureDirectories() {
  if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });
  if (!existsSync(generatedDir)) mkdirSync(generatedDir, { recursive: true });
}

function createZipArchive(files) {
  const localHeaders = [];
  const centralHeaders = [];
  let offset = 0;

  const crcTable = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[i] = c;
  }
  function calcCrc32(buf) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < buf.length; i++) {
      crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  const now = new Date();
  const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | Math.floor(now.getSeconds() / 2);
  const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();

  for (const file of files) {
    const dataBuf = Buffer.isBuffer(file.content) ? file.content : Buffer.from(file.content, 'utf8');
    const compressedData = deflateRawSync(dataBuf);
    const useCompressed = compressedData.length < dataBuf.length;
    const finalData = useCompressed ? compressedData : dataBuf;
    const method = useCompressed ? 8 : 0;
    const crc = calcCrc32(dataBuf);
    const nameBuf = Buffer.from(file.filename, 'utf8');

    const localHeader = Buffer.alloc(30 + nameBuf.length);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0, 6);
    localHeader.writeUInt16LE(method, 8);
    localHeader.writeUInt16LE(dosTime, 10);
    localHeader.writeUInt16LE(dosDate, 12);
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(finalData.length, 18);
    localHeader.writeUInt32LE(dataBuf.length, 22);
    localHeader.writeUInt16LE(nameBuf.length, 26);
    localHeader.writeUInt16LE(0, 28);
    nameBuf.copy(localHeader, 30);

    localHeaders.push(localHeader, finalData);

    const cdHeader = Buffer.alloc(46 + nameBuf.length);
    cdHeader.writeUInt32LE(0x02014b50, 0);
    cdHeader.writeUInt16LE(20, 4);
    cdHeader.writeUInt16LE(20, 6);
    cdHeader.writeUInt16LE(0, 8);
    cdHeader.writeUInt16LE(method, 10);
    cdHeader.writeUInt16LE(dosTime, 12);
    cdHeader.writeUInt16LE(dosDate, 14);
    cdHeader.writeUInt32LE(crc, 16);
    cdHeader.writeUInt32LE(finalData.length, 20);
    cdHeader.writeUInt32LE(dataBuf.length, 24);
    cdHeader.writeUInt16LE(nameBuf.length, 28);
    cdHeader.writeUInt16LE(0, 30);
    cdHeader.writeUInt16LE(0, 32);
    cdHeader.writeUInt16LE(0, 34);
    cdHeader.writeUInt16LE(0, 36);
    cdHeader.writeUInt32LE(0, 38);
    cdHeader.writeUInt32LE(offset, 42);
    nameBuf.copy(cdHeader, 46);

    centralHeaders.push(cdHeader);
    offset += localHeader.length + finalData.length;
  }

  const cdStart = offset;
  let cdSize = 0;
  for (const h of centralHeaders) {
    cdSize += h.length;
  }

  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(files.length, 8);
  eocd.writeUInt16LE(files.length, 10);
  eocd.writeUInt32LE(cdSize, 12);
  eocd.writeUInt32LE(cdStart, 16);
  eocd.writeUInt16LE(0, 20);

  return Buffer.concat([...localHeaders, ...centralHeaders, eocd]);
}

function generate() {
  console.log('[generate-css] Compiling Angular Material SCSS overrides...');

  try {
    ensureDirectories();

    // 1. Compile SCSS to CSS
    const compiledCss = execSync('npx sass --load-path=node_modules src/scss/_mat-overrides.scss', {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'inherit'],
    });

    // 2. Read individual SCSS files
    const scssFilesList = [
      'sizes.scss',
      'palettes.scss',
      'mat-button.scss',
      'mat-button-toggle.scss',
      'mat-checkbox.scss',
      'mat-chip.scss',
      'mat-form-field.scss',
      'mat-progress-bar.scss',
      'mat-radio-button.scss',
      'mat-slide-toggle.scss',
      'mat-slider.scss',
      '_mat-overrides.scss',
    ];

    const scssModules = [];
    for (const file of scssFilesList) {
      const filePath = join(scssDir, file);
      if (existsSync(filePath)) {
        const content = readFileSync(filePath, 'utf8');
        const sizeKb = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(1);
        const lineCount = content.split('\n').length;
        scssModules.push({ filename: file, content, sizeKb, lineCount });
      }
    }

    // Build unified all-in-one SCSS with all @use rules at the top and no duplicated variables/imports
    const combinedFilesList = [
      'sizes.scss',
      'palettes.scss',
      'mat-button.scss',
      'mat-button-toggle.scss',
      'mat-checkbox.scss',
      'mat-chip.scss',
      'mat-form-field.scss',
      'mat-progress-bar.scss',
      'mat-radio-button.scss',
      'mat-slide-toggle.scss',
      'mat-slider.scss',
    ];

    let combinedScss = `// ============================================================================\n`;
    combinedScss += `// Angular Material Enhanced - Component Overrides (All-in-One Raw SCSS)\n`;
    combinedScss += `// https://github.com/laudebugs/ng-material-enhanced\n`;
    combinedScss += `// ============================================================================\n\n`;
    combinedScss += `@use '@angular/material' as mat;\n`;
    combinedScss += `@use 'sass:map';\n`;
    combinedScss += `@use 'sass:math';\n`;
    combinedScss += `@use './theme-colors' as theme-colors;\n\n`;

    for (const file of combinedFilesList) {
      const mod = scssModules.find(m => m.filename === file);
      if (mod) {
        // Strip @use / @forward statements and local module namespaces
        const cleanedContent = mod.content
          .split('\n')
          .filter(line => !line.startsWith('@use ') && !line.startsWith('@forward '))
          .join('\n')
          .replace(/sizes\.\$/g, '$')
          .replace(/palettes\.\$/g, '$')
          .replace(/button-overrides\./g, '')
          .trim();

        combinedScss += `// ----------------------------------------------------------------------------\n`;
        combinedScss += `// File: ${file}\n`;
        combinedScss += `// ----------------------------------------------------------------------------\n`;
        combinedScss += cleanedContent + '\n\n';
      }
    }

    // 3. Write public downloadable files
    const headerBanner = `/* ============================================================================\n * Angular Material Enhanced - Component Overrides (Compiled CSS)\n * Generated on: ${new Date().toISOString()}\n * https://github.com/laudebugs/ng-material-enhanced\n * ============================================================================ */\n\n`;
    const finalCss = headerBanner + compiledCss;

    writeFileSync(join(publicDir, 'material-overrides.css'), finalCss, 'utf8');
    writeFileSync(join(publicDir, 'material-overrides.scss'), combinedScss, 'utf8');

    // 4. Generate ZIP archive of all raw SCSS source files
    const allScssDiskFiles = readdirSync(scssDir).filter(f => f.endsWith('.scss'));
    const zipEntries = [];

    for (const filename of allScssDiskFiles) {
      const fullPath = join(scssDir, filename);
      if (existsSync(fullPath)) {
        zipEntries.push({
          filename,
          content: readFileSync(fullPath),
        });
      }
    }

    const zipBuffer = createZipArchive(zipEntries);
    const zipPath = join(publicDir, 'material-overrides-scss.zip');
    writeFileSync(zipPath, zipBuffer);

    // 5. Write TypeScript data file for the /css route
    const cssSizeKb = (Buffer.byteLength(finalCss, 'utf8') / 1024).toFixed(1);
    const scssSizeKb = (Buffer.byteLength(combinedScss, 'utf8') / 1024).toFixed(1);
    const zipSizeKb = (Buffer.byteLength(zipBuffer) / 1024).toFixed(1);
    const cssLineCount = finalCss.split('\n').length;
    const scssLineCount = combinedScss.split('\n').length;

    const tsContent = `// Auto-generated by scripts/generate-css.mjs - DO NOT EDIT DIRECTLY
export interface ScssFileModule {
  filename: string;
  content: string;
  sizeKb: string;
  lineCount: number;
}

export const GENERATED_AT = ${JSON.stringify(new Date().toISOString())};
export const CSS_SIZE_KB = ${JSON.stringify(cssSizeKb)};
export const SCSS_SIZE_KB = ${JSON.stringify(scssSizeKb)};
export const ZIP_SIZE_KB = ${JSON.stringify(zipSizeKb)};
export const CSS_LINE_COUNT = ${cssLineCount};
export const SCSS_LINE_COUNT = ${scssLineCount};

export const COMPILED_CSS = ${JSON.stringify(finalCss)};
export const COMBINED_SCSS = ${JSON.stringify(combinedScss)};

export const SCSS_FILES: ScssFileModule[] = ${JSON.stringify(scssModules, null, 2)};
`;

    writeFileSync(join(generatedDir, 'css-overrides.data.ts'), tsContent, 'utf8');

    // 6. Autogenerate public/llms.txt with copyright, architecture reference, and BOTH raw SCSS + compiled CSS
    const llmsContent = `# Angular Material Enhanced

> **Copyright (c) 2026 laudebugs (https://github.com/laudebugs/ng-material-enhanced) - MIT License**
> A demonstration application and CSS/SCSS extension system illustrating how to customize Angular Material 3 components using SCSS mixin overrides.

## Overview

Angular Material Enhanced provides a structured class-based design token and override system for Angular Material 3 (\`@angular/material\`). It demonstrates how to add multi-tier sizing, geometric corner radius control, destructive state styling, and scalable typography/icons to standard Material 3 components without breaking their built-in accessibility, ripple effects, or theming.

- **Demo Website**: https://ng-material-enhanced.laudebugs.me
- **Compiled CSS Asset**: https://ng-material-enhanced.laudebugs.me/material-overrides.css
- **Raw SCSS Asset**: https://ng-material-enhanced.laudebugs.me/material-overrides.scss
- **All SCSS Modules (ZIP)**: https://ng-material-enhanced.laudebugs.me/material-overrides-scss.zip
- **GitHub Repository**: https://github.com/laudebugs/ng-material-enhanced

---

## Custom Theme Color Palettes

Theme colors (such as \`_theme-colors.scss\`) are intentionally excluded from the generic component overrides so that projects can define their own primary, secondary, and tertiary palettes.

To generate a custom Material 3 theme palette for your project, run the official Angular Material schematic:

\`\`\`bash
ng generate @angular/material:theme-color
\`\`\`

Refer to the official [Material 3 Custom Theme Schematic Documentation](https://github.com/angular/components/blob/main/src/material/schematics/ng-generate/theme-color/README.md) for full options and color specifications.

---

## Sizing System

Components support unified sizing classes defined in \`src/scss/sizes.scss\`:

| Class | Height / Dimension | Applicable Components |
| :--- | :--- | :--- |
| \`sz-xsmall\` | 24px | Buttons, Button Toggle, Progress Bar, Slider, Slide Toggle |
| \`sz-small\` | 32px | All Components (Buttons, Toggle, Checkbox, Chips, Form Field, Progress Bar, Slider, Slide Toggle, Radios) |
| \`sz-medium\` | 40px | All Components (Default baseline) |
| \`sz-large\` | 48px | All Components |
| \`sz-xlarge\` | 64px | All Components |

---

## Shape & Geometry System

Components support corner radius overrides via utility classes:

| Class | Border Radius | Description |
| :--- | :--- | :--- |
| \`sh-round\` | \`9999px\` | Fully rounded pill / capsule shape |
| \`sh-squircle\` | Proportional (\`height / 4\` or \`8px\`) | Smooth rounded rectangle (Default for most components) |
| \`sh-square\` | \`0px\` | Sharp corners / rectangular geometry |

---

## Modifier Classes

- \`destructive\`: Applies high-contrast error palette styling (\`#ba1a1a\` / error container colors) to Buttons and Checkboxes while maintaining Material 3 hover and ripple interactions.
- \`no-hint\` / \`no-error\`: Hides the subscript wrapper in \`mat-form-field\` for compact form layouts.

---

## Component Reference & Code Examples

### 1. Buttons (\`mat-button\`, \`mat-icon-button\`, \`mat-fab\`, \`mat-mini-fab\`)
Supports appearances \`filled\`, \`tonal\`, \`outlined\`, \`elevated\`/\`protected\`, \`text\`.
\`\`\`html
<!-- Standard Button -->
<button matButton="filled" class="sz-medium sh-squircle">
  <mat-icon class="material-symbols-outlined">check</mat-icon>
  Submit
</button>

<!-- Destructive Button -->
<button matButton="filled" class="sz-medium sh-squircle destructive">
  <mat-icon class="material-symbols-outlined">delete</mat-icon>
  Delete Account
</button>

<!-- Icon Button -->
<button matIconButton class="sz-small sh-square" aria-label="Settings">
  <mat-icon class="material-symbols-outlined">settings</mat-icon>
</button>
\`\`\`

### 2. Button Toggle (\`mat-button-toggle-group\`)
Supports horizontal, vertical, single, multiple selection, and icon toggles.
\`\`\`html
<mat-button-toggle-group class="sz-medium sh-squircle" value="bold" aria-label="Font style">
  <mat-button-toggle value="bold">Bold</mat-button-toggle>
  <mat-button-toggle value="italic">Italic</mat-button-toggle>
  <mat-button-toggle value="underline">Underline</mat-button-toggle>
</mat-button-toggle-group>
\`\`\`

### 3. Checkbox (\`mat-checkbox\`)
Supports sizes \`sz-small\`, \`sz-medium\`, \`sz-large\`, \`sz-xlarge\`, and \`destructive\`.
\`\`\`html
<mat-checkbox class="sz-medium" [checked]="true">Remember me</mat-checkbox>
<mat-checkbox class="sz-medium destructive" [checked]="true">I understand the consequences</mat-checkbox>
\`\`\`

### 4. Chips (\`mat-chip\`, \`mat-chip-set\`, \`mat-chip-grid\`)
Supports action chips, avatars, removable buttons, and chip input grids.
\`\`\`html
<mat-chip-set>
  <mat-chip class="sz-medium sh-round">
    <img matChipAvatar src="avatar.jpg" alt="Avatar" />
    Jane Doe
  </mat-chip>
  <mat-chip class="sz-medium sh-squircle">
    Tag Name
    <button matChipRemove aria-label="Remove chip">
      <mat-icon class="material-symbols-outlined">cancel</mat-icon>
    </button>
  </mat-chip>
</mat-chip-set>
\`\`\`

### 5. Form Field & Radios (\`mat-form-field\`, \`mat-radio-button\`)
Supports appearances \`outline\` and \`fill\`, prefix/suffix buttons, and scaled typography.
\`\`\`html
<mat-form-field appearance="outline" class="sz-medium sh-squircle">
  <mat-label>Email Address</mat-label>
  <mat-icon matPrefix class="material-symbols-outlined">email</mat-icon>
  <input matInput placeholder="name@example.com">
</mat-form-field>

<mat-radio-group value="standard">
  <mat-radio-button class="sz-medium" value="standard">Standard Option</mat-radio-button>
</mat-radio-group>
\`\`\`

### 6. Progress Bar (\`mat-progress-bar\`)
Supports modes \`determinate\`, \`indeterminate\`, \`buffer\`, and \`query\`.
\`\`\`html
<mat-progress-bar mode="determinate" [value]="75" class="sz-medium sh-round"></mat-progress-bar>
<mat-progress-bar mode="buffer" [value]="40" [bufferValue]="80" class="sz-large sh-squircle"></mat-progress-bar>
\`\`\`

### 7. Slider (\`mat-slider\`)
Supports continuous, discrete (with tick marks), and range sliders.
\`\`\`html
<!-- Continuous Slider -->
<mat-slider class="sz-medium" [min]="0" [max]="100">
  <input matSliderThumb [value]="40" aria-label="Volume">
</mat-slider>

<!-- Range Slider -->
<mat-slider class="sz-medium" [min]="0" [max]="100">
  <input matSliderStartThumb [value]="20" aria-label="Min price">
  <input matSliderEndThumb [value]="80" aria-label="Max price">
</mat-slider>
\`\`\`

### 8. Slide Toggle (\`mat-slide-toggle\`)
Supports sizes \`sz-xsmall\` through \`sz-xlarge\` with calibrated track, thumb, and touch target sizes.
\`\`\`html
<mat-slide-toggle class="sz-medium" [checked]="true">Enable notifications</mat-slide-toggle>
\`\`\`

---

## SCSS Architecture

The overrides leverage Angular Material 3 Sass mixins (\`@use '@angular/material' as mat\`):
- \`mat.button-overrides(...)\`
- \`mat.icon-button-overrides(...)\`
- \`mat.fab-overrides(...)\`
- \`mat.button-toggle-overrides(...)\`
- \`mat.checkbox-overrides(...)\`
- \`mat.chips-overrides(...)\`
- \`mat.form-field-overrides(...)\`
- \`mat.progress-bar-overrides(...)\`
- \`mat.radio-overrides(...)\`
- \`mat.slide-toggle-overrides(...)\`
- \`mat.slider-overrides(...)\`

All overrides are bundled via \`src/scss/_mat-overrides.scss\` and compiled into pure CSS via \`scripts/generate-css.mjs\`.

---

## Routes

- \`/\`: Complete showcase gallery of all components, sizes, and variations.
- \`/buttons\`: Interactive Button configurator with live code snippets.
- \`/button-toggle\`: Interactive Button Toggle configurator.
- \`/checkbox\`: Interactive Checkbox configurator.
- \`/chips\`: Interactive Chips configurator.
- \`/form-field\`: Interactive Form Field & Radio configurator.
- \`/progress-loader\`: Interactive Progress Bar configurator.
- \`/slider\`: Interactive Slider configurator.
- \`/toggle\`: Interactive Slide Toggle configurator.
- \`/css\`: Full compiled CSS & SCSS overrides viewer and copy tool.

---

## Raw SCSS Overrides (All-in-One Source)

The following is the complete, raw SCSS source containing all component mixins and Sass logic:

\`\`\`scss
${combinedScss.trim()}
\`\`\`

---

## Full Compiled Pure CSS Overrides

The following is the complete, autogenerated pure CSS containing all component overrides, custom sizes (\`sz-*\`), shapes (\`sh-*\`), states (\`destructive\`), and density calibrations:

\`\`\`css
${compiledCss.trim()}
\`\`\`
`;

    writeFileSync(join(publicDir, 'llms.txt'), llmsContent, 'utf8');

    console.log(`[generate-css] Successfully generated:`);
    console.log(`  - public/material-overrides.css (${cssSizeKb} KB, ${cssLineCount} lines)`);
    console.log(`  - public/material-overrides.scss (${scssSizeKb} KB, ${scssLineCount} lines)`);
    console.log(`  - public/material-overrides-scss.zip (${zipSizeKb} KB, ${zipEntries.length} files)`);
    console.log(`  - public/llms.txt (with raw SCSS + compiled CSS)`);
    console.log(`  - src/app/generated/css-overrides.data.ts`);
  } catch (err) {
    console.error('[generate-css] Error during generation:', err);
    process.exitCode = 1;
  }
}

// Check watch mode
const isWatch = process.argv.includes('--watch');

generate();

if (isWatch) {
  console.log('[generate-css] Watching src/scss for changes...');
  let debounceTimeout = null;
  import('fs').then(fs => {
    fs.watch(scssDir, { recursive: true }, (eventType, filename) => {
      if (filename && filename.endsWith('.scss')) {
        if (debounceTimeout) clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          console.log(`[generate-css] File changed: ${filename}. Re-generating...`);
          generate();
        }, 300);
      }
    });
  });
}
