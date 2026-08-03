#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const enPath = join(root, 'src', 'data', 'modules-en-m13-m15.json');
const en = JSON.parse(readFileSync(enPath, 'utf8'));
const mod = en.modules.find((m) => m.id === 13);

const s33 = mod.slides.find((s) => String(s.id) === '13.33');
const secs = s33.content.sections;
secs[1].imageAlt = 'Rule of thirds: composition grid';
secs[5].copyable = [
  'Image: [SUBJECT and ACTION]. Setting: [CONTEXT].',
  'Composition: rule of thirds, main subject on the right intersection. Foreground: [description]. Background: [depth, atmosphere].',
  'Shot: [close-up CU / medium MLS / wide ELS]. Camera angle: [eye level / high angle / low angle].',
  'Style: [style]. Aspect ratio: 16:9.',
].join('\n');
secs[6].copyable = [
  'Narrative image: [THEME or EMOTION].',
  'Concept: [mythology / fantasy / historical era] linked with [modern setting / reality / futurism].',
  'Example: [e.g. ancient god in a coffee-cup scene, minimalist composition].',
  'Style: [style]. Aspect ratio: 16:9.',
].join('\n');
secs[7].copyable = [
  'Image: [SUBJECT] [SETTING].',
  'Camera: 85mm lens, f/1.8, soft studio light, shallow depth of field.',
  'Composition: main subject on the right third intersection, clean background, space for a headline on the left.',
  'Style: [style]. Aspect ratio: 16:9.',
].join('\n');

const s35 = mod.slides.find((s) => String(s.id) === '13.35');
const t = s35.content.sections;
t[3].copyable = [
  'Subject: [what is shown].',
  'Goal/use-case: [Awareness/Engagement/Conversion; e.g. social post, poster].',
  'Audience: [who].',
  'Style: [photorealistic / minimal / …].',
  'Composition/camera: [shot, angle].',
  'Lighting: [natural / studio / golden hour].',
  'Colors/mood: [palette, feeling].',
  'Text in image (if needed): exact text + font + placement.',
  'Format/ratio: [1:1 / 16:9 / 9:16].',
  'Negative prompt: [what to avoid].',
].join('\n');
t[4].copyable =
  'Create a logo for [business domain] company [name]. Style [minimal/modern], colors [x], transparent/white background, provide 3 variants.';
t[5].copyable =
  'Using this text [paste], create an illustration for LinkedIn/Facebook. Look [corporate], colors [x], format 1:1 or 4:5, no text / with CTA text [if needed].';
t[6].copyable =
  'Create a bold poster for event [name], date/place [x], style [x], include exact text: "…".';

writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n', 'utf8');
console.log('EN copyables/imageAlt fixed');
