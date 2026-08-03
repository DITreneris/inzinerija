/**
 * Surgical EN patch for M1315-DENS (13.3 + 13.4 only).
 * Does not regenerate the full modules-en-m13-m15 overlay.
 * Run after LT dens patch: node scripts/patch-m1315-dens-en-13-3-13-4.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outPath = resolve(root, 'src/data/modules-en-m13-m15.json');

// Restore overlay baseline from HEAD so a full rebuild does not regress other slides.
const headJson = execSync('git show HEAD:src/data/modules-en-m13-m15.json', {
  cwd: root,
  encoding: 'utf8',
  maxBuffer: 32 * 1024 * 1024,
});
const data = JSON.parse(headJson);
const mod = data.modules.find((m) => m.id === 13);

const slide13_3Copyable =
  'Image: [WHAT IS SHOWN].\nStyle: [photorealistic / acrylic painting / minimal vector / 3D render].\nRatio: [1:1 / 16:9 / 9:16]. Language: neutral scene, no text in the image unless needed.';

const slide13_3Tools = [
  {
    name: 'GPT-Image (OpenAI)',
    url: 'https://chatgpt.com',
    description: 'Natural language, fast brief-to-image – useful for marketing drafts.',
    useCases: ['Quick brief', 'Social draft', 'Idea variants'],
  },
  {
    name: 'Ideogram',
    url: 'https://ideogram.ai',
    description: 'Strong text-in-image – logos, posters, LinkedIn headlines.',
    useCases: ['Logo and typography', 'Posters', 'Text in image'],
  },
  {
    name: 'FLUX',
    url: 'https://blackforestlabs.ai',
    description: 'Photorealism and multi-reference consistency – product / character series.',
    useCases: ['Photorealism', 'Product series', 'Reference lock'],
  },
  {
    name: 'Midjourney',
    url: 'https://midjourney.com',
    description: 'High artistic level, character / style reference – brand and campaign styles.',
    useCases: ['Artistic style', 'Character ref', 'Brand mood'],
  },
  {
    name: 'Leonardo.ai',
    url: 'https://leonardo.ai',
    description: 'Photorealism and product / game design – when you need more control.',
    useCases: ['Product design', 'Photorealism', 'Concepts'],
  },
  {
    name: 'Adobe Firefly',
    url: 'https://www.adobe.com/products/firefly.html',
    description: 'CC integration, safer source claims, C2PA – for commercial paths.',
    useCases: ['Adobe CC', 'C2PA / provenance', 'Commercial safety'],
  },
];

const slide13_3Sections = [
  {
    heading: 'In short',
    body: 'Style sets the look (photo, acrylic, 3D, drawing). Ratio sets the frame: 1:1 square, 16:9 wide, 9:16 vertical (Stories).',
    blockVariant: 'accent',
  },
  {
    heading: 'Brand consistency',
    body: 'So the model does not generate a random look, specify in the prompt: colour system (e.g. deep blue + orange accent), typography (minimal or classic serif), tone (professional, friendly) and visual identity (corporate style, clean background).',
    blockVariant: 'brand',
    collapsible: true,
    collapsedByDefault: true,
  },
  {
    heading: 'Do this now',
    body: 'Pick one style and one ratio. Copy the template below and fill it in.',
    blockVariant: 'brand',
  },
  {
    heading: 'Copyable prompt',
    body: 'Template with style and ratio fields.',
    copyable: slide13_3Copyable,
  },
  {
    heading: 'Check',
    body: 'Does the platform support the ratio you chose? If the image looks cropped – change the ratio or add detail to the description.',
    blockVariant: 'accent',
  },
];

const slide13_4ClipCopyable =
  'Clip 3–5 s (no longer).\nScript: [what happens in this shot].\nCamera: [slow push-in / side move / locked / crane up].\nTone: [professional / dynamic / calm].\nStart: image-to-video from the hero keyframe. Same style, same colors.';

const slide13_4ChainCopyable =
  '1) Create a hero image: [SUBJECT], setting [CONTEXT], style [STYLE], ratio 16:9 or 9:16, no text in the image.\n2) Animate from this image: 3–5 seconds. Camera moves […], subject [what it does]. Same character/product, same style, same color palette.\n3) (If you need longer) Repeat 2) with a second keyframe – then edit them together.';

const slide13_4Sections = [
  {
    heading: 'In short',
    body: 'A short video needs a clear script, tone and camera. Prefer 2–4 short clips (3–5 s) over one long one-shot – lock stills before expensive video.',
    blockVariant: 'accent',
  },
  {
    heading: 'Framing and camera angle',
    body: 'Framing changes emotion: eye-level, high angle, low angle, POV – write it in the prompt. Video models are strongest at motion and time, not inventing a full look from scratch.',
    blockVariant: 'brand',
    collapsible: true,
    collapsedByDefault: true,
  },
  {
    heading: 'Image-to-video chain',
    body: 'Hero / keyframe → I2V (Runway, Kling, Veo, Seedance, Sora) → edit. Audio-first hint: if you will add VO, lock VO length first – then cut clips to the audio.',
    blockVariant: 'brand',
    collapsible: true,
    collapsedByDefault: true,
  },
  {
    heading: 'Do this now',
    body: 'Write 2–3 sentences of script for one 3–5 s shot. Copy the template.',
    blockVariant: 'brand',
  },
  {
    heading: 'Copyable prompt',
    body: 'Template for one short clip.',
    copyable: slide13_4ClipCopyable,
  },
  {
    heading: 'Copyable chain: image to video',
    body: 'Hero first, then animation; for longer pieces use several keyframes.',
    copyable: slide13_4ChainCopyable,
  },
  {
    heading: 'Check',
    body: 'Does the video start look like the hero? Did the product or character stay consistent? If not – simplify the scene or strengthen the reference (same product, style and colours).',
    blockVariant: 'accent',
  },
  {
    heading: 'Same look across shots',
    body: 'Same reference + “same product / same style”. Avoid real faces or voices without consent.',
    blockVariant: 'terms',
    collapsible: true,
    collapsedByDefault: true,
  },
];

const idx3 = mod.slides.findIndex((s) => s.id === 13.3);
const idx4 = mod.slides.findIndex((s) => s.id === 13.4);
const prev3 = mod.slides[idx3];
const prev4 = mod.slides[idx4];

mod.slides[idx3] = {
  ...prev3,
  title: 'Style and ratios for images',
  subtitle: 'Style controls look; ratio controls format',
  shortTitle: prev3.shortTitle && !/[ąčęėįšųūž]/i.test(prev3.shortTitle) ? prev3.shortTitle : 'Style and ratios',
  content: {
    ...prev3.content,
    sections: slide13_3Sections,
    toolsCollapsible: true,
    toolsIntro:
      'The principle is the same across generators – strengths differ. One tool is enough to start.',
    tools: slide13_3Tools,
  },
};

mod.slides[idx4] = {
  ...prev4,
  title: 'Script for a short video',
  subtitle: 'What happens, how long, what tone',
  shortTitle: 'Short video script',
  content: {
    ...prev4.content,
    sections: slide13_4Sections,
  },
};

writeFileSync(outPath, `${JSON.stringify(data, null, 2)}\n`);
console.log('Patched EN 13.3 + 13.4 surgically (restored other slides from HEAD)');
