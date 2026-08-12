#!/usr/bin/env node
/**
 * Build src/data/modules-en-m13-m15.json – complete EN overlay for modules 13–15.
 * The overlay keeps the LT slide structure but replaces every user-facing string
 * so the EN merge does not fall back to Lithuanian copy.
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { applyM13EnPlainOverrides } from './lib/m13-en-plain-overrides.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const lt = JSON.parse(readFileSync(join(root, 'src', 'data', 'modules.json'), 'utf8'));
const outPath = join(root, 'src', 'data', 'modules-en-m13-m15.json');

const moduleMeta = {
  13: {
    title: 'Content engineering with AI',
    subtitle: 'Images, video, music',
    description:
      'Create marketing visuals, short videos and audio with AI prompts, checks and rights awareness.',
    duration: '25–30 min',
  },
  14: {
    title: 'Knowledge check: Content path',
    subtitle: 'Images, video, music and workflow',
    description: 'Check image, video and audio principles. ≥70% recommended before Module 15.',
    duration: '12–15 min',
  },
  15: {
    title: 'Final project: Content path',
    subtitle: 'Quick start or mini campaign path',
    description:
      'Create a hero image with a prompt; optionally continue into short video and background music.',
    duration: '20 min / 60–90 min',
  },
};

const slideMeta = {
  130: ['Content engineering path', 'Images, video, music'],
  13.1: ['What you will find in this path', 'Images, video, music – tools and prompts'],
  13.12: ['Generative media chain', 'Brief → stills → refs → I2V → audio → edit → QA'],
  13.15: ['Image generation', 'Section: prompts, style, ratios and tools'],
  13.2: ['Image prompt basics', 'What to describe: subject, style, ratio'],
  13.3: ['Style and ratios for images', 'Style controls look; ratio controls format'],
  13.31: ['Quick check: style and ratios', '3 questions before composition and the builder'],
  13.32: ['Product and character – the same look', '3–5 reference photos + a “same product” rule'],
  13.325: ['Lab: Consistency Drift', 'Tick refs, pick what drifted – copy fix + lock rule'],
  13.33: ['Composition and framing', 'Rule of thirds, camera angle, shot types'],
  13.34: ['Practice: recognize style and ratios', '5 situations: style, ratio, composition, brand'],
  13.35: ['Workflow and MASTER templates', '5-step pipeline, #1000Books, ready prompts'],
  13.37: ['Image prompt builder', 'Campaign context, visual and text in one prompt'],
  13.36: ['Video generation', 'Section: script, format and tools'],
  13.4: ['Script for a short video', 'What happens, how long, what tone'],
  13.5: ['Video tools, format and CPI', '2026 matrix + cost per usable clip'],
  13.51: ['Quick check: video prompt and format', '3 questions before the music section'],
  13.52: ['Edit after generation', 'AI = raw material; cut, color, mix'],
  13.56: ['Audio', 'Section: voice, effects, music – sound first'],
  13.6: ['Audio-first: VO and music description', 'Sound first, then video cuts'],
  13.7: ['Audio effects and usage rights', 'Sound effects and license'],
  13.101: ['Business and risks', 'Metrics, A/B, rights, QA and versions'],
  13.11: ['Workflow: from brief to publication', 'Brief -> prompt -> variants -> testing'],
  13.8: ['Glossary', 'Content engineering terms'],
  13.9: ['Module 13 summary', 'What you learned – chain, same look, video, audio, rights'],
  140: ['Module 14 test', 'Content engineering knowledge'],
  140.5: ['Warm-up before the test', '3 questions: brand, audio-first, path to M15'],
  141: ['Questions', 'Images, video, audio, pipeline'],
  142: ['Results', 'Ready for Module 15?'],
  143: ['Bonus: pipeline checklist in 5 min', 'Brief → stills → video/audio → disclosure'],
  150: ['Content engineering project', 'Quick start or full mini campaign'],
  150.5: ['Quick start: one hero image', 'Brief + hero image + prompt'],
  150.25: ['Project loop: quick and full paths', 'One asset first; full path if you want more'],
  151: ['Scenario: Hero image', 'Create a keyframe for your topic'],
  152: ['Scenario: Short video', 'Animate the hero image into a 5–10 s clip'],
  153: ['Scenario: Music fragment', 'Mood and style for 30–60 s audio'],
  158: ['Project summary', 'What next?'],
};

const headingMap = new Map([
  ['Trumpai', 'In short'],
  ['Daryk dabar', 'Do this now'],
  ['Patikra', 'Check'],
  ['Darbo eigos schema', 'Workflow diagram'],
  ['Montažo schema', 'Edit diagram'],
  ['Medijos grandinė', 'Media chain'],
  ['Tas pats vaizdas serijoje', 'Same look in a series'],
  ['Trumpas video (I2V)', 'Short video (I2V)'],
  ['Pirma garsas', 'Sound first'],
  ['Verslas ir teisės', 'Business and rights'],
  ['Kopijuojamas promptas', 'Copyable prompt'],
  ['Kopijuojamas promptų rinkinys', 'Copyable prompt pack'],
  ['Kopijuojamas šablonas (kompozicija + kadras)', 'Copyable template: composition and framing'],
  ['Kampanijos tikslai – schema', 'Campaign goals diagram'],
  ['Kampanijos tikslai (kuo vadovautis)', 'Campaign goals: how to decide'],
  ['Kur pritaikyti?', 'Where to use this'],
  ['Formulė ir trys sluoksniai', 'Formula and three layers'],
  ['Minimalūs reikalavimai', 'Minimum requirements'],
  ['Kodėl tai veikia', 'Why this works'],
  ['Brand consistency (svarbu verslui)', 'Brand consistency'],
  ['Prekės ženklo nuoseklumas', 'Brand consistency'],
  ['Ta pati išvaizda keliuose kadruose', 'Same look across shots'],
  ['Kadravimas ir kameros kampas', 'Framing and camera angle'],
  ['Reference lock – schema', 'Reference lock – diagram'],
  ['Brand / product sheet (minimumas)', 'Brand / product sheet (minimum)'],
  ['Drift lab', 'Drift lab'],
  ['Įrankiai', 'Tools'],
  ['Kuris įrankis kam', 'Which tool for which case'],
  ['Trečdalių tinklelis (gairė)', 'Rule-of-thirds grid'],
  ['Trečdalių taisyklė ir planai', 'Rule of thirds and planes'],
  ['Kameros kampas ir kadro tipai', 'Camera angle and shot types'],
  ['Naratyvinis vaizdas (optional)', 'Narrative image (optional)'],
  ['Kamera prompte (optional)', 'Camera language in the prompt (optional)'],
  ['Kaip naudotis šia skaidre', 'How to use this slide'],
  ['DI vaizdų workflow (5 žingsniai)', 'AI image workflow (5 steps)'],
  ['MASTER prompt šablonas', 'MASTER prompt template'],
  ['Image → video grandinė', 'Image-to-video chain'],
  ['Kopijuojama grandinė – vaizdas → video', 'Copyable chain: image to video'],
  ['Ta pati išvaizda keliuose kadruose (optional)', 'Same look across shots (optional)'],
  ['Kodėl verta ir ką nurodyti', 'Why it is useful and what to specify'],
  ['Visi video įrankiai (apžvalga)', 'All video tools (overview)'],
  ['Video prompt laukai', 'Video prompt fields'],
  ['Angliškas MASTER šablonas (universalus)', 'English MASTER template'],
  ['Papildomi pavyzdžiai įvairiems įrankiams (ilgas sąrašas)', 'More examples for different tools'],
  ['Rodikliai ir A/B testas (plačiau)', 'Metrics and A/B testing'],
  ['A/B hipotezė', 'A/B hypothesis'],
  ['Teisės, rizikos ir verslas', 'Rights, risks and business'],
  ['Prieš publikuojant (QA ir versijos)', 'Before publishing: QA and versions'],
  ['Vertinimo rubrika', 'Evaluation rubric'],
  ['Top 3 pitfalls (ko vengti)', 'Top 3 pitfalls'],
  ['Workflow diagrama', 'Workflow diagram'],
  ['Brief į promptą', 'Brief into prompt'],
  ['Platforma, funnel ir tekstas kartu', 'Platform, funnel and copy together'],
  ['Kitas žingsnis: Modulis 15', 'Next step: Module 15'],
  ['Visi 8 verslo scenarijai', 'All 8 business scenarios'],
  ['Video scenarijus', 'Video script'],
  ['Vaizdų promptai', 'Image prompts'],
  ['Žingsniai', 'Steps'],
  ['Užduotis', 'Task'],
  ['Refleksijos promptas', 'Reflection prompt'],
]);

const genericBySlide = {
  130: 'After this module you will create images, short videos and audio with AI – from a clear brief to quality and rights checks.',
  13.1: 'Connect the campaign goal to the right visual choice: awareness, engagement or conversion.',
  13.2: 'A good image prompt describes the subject, context, style, ratio and what to avoid.',
  13.3: 'Use style, ratio and brand rules so the image does not look random.',
  13.31: 'Check whether you can identify ratio, style and brand consistency before moving on.',
  13.32: 'A single prompt does not lock identity – you need 3–5 reference angles and a same-product lock rule.',
  13.325: 'Tick the references you have, diagnose drift (or a fresh brief), then copy one prompt rule.',
  13.33: 'Composition and camera language help you control what the viewer sees first.',
  13.34: 'Recognize which prompt field needs fixing: style, ratio, composition or brand consistency.',
  13.35: 'Use one MASTER template or one ready prompt if you need a fast result; use the rest for deeper practice.',
  13.37: 'Build one ready image prompt from campaign context, visual choices and optional text.',
  13.4: 'For short video, describe the scene, duration, tone, movement and format.',
  13.5: 'Choose a tool, set the ratio and duration, then check whether you can use the output publicly.',
  13.51: 'Check whether a video prompt includes a scene, duration, format and rights check.',
  13.6: 'For music, describe mood, genre, tempo, instruments, voice and use case.',
  13.7: 'Before using generated audio publicly, check the tool license and usage rules.',
  13.101: 'Before publishing, measure results, test variants and check rights, brand safety and versions.',
  13.11: 'Move from brief to prompt, variants, iteration, platform adaptation, testing and optimization.',
  13.8: 'Learn the key terms used in content engineering.',
  13.9: 'You learned the 2026 content path: media chain, same look in a series, short I2V, sound first, and rights checks.',
  140: 'Answer 12 questions before starting the final content project.',
  140.5: 'Check brand/format, audio-first thinking, and what you will do first in Module 15.',
  142: 'Use your result to decide whether to review Module 13 or continue to the project.',
  143: 'After the test, run a 5-minute pipeline checklist: brief, stills, video or audio-first, then rights and disclosure.',
  150: 'Start with one hero image; optionally continue to short video and background music.',
  150.5: 'Create one hero image, a short brief and the prompt you used.',
  150.25: 'Quick path: brief -> one asset -> tweak. Full path: image -> video -> music -> QA.',
  151: 'Create a hero image or keyframe that can anchor the full path.',
  152: 'Use the hero image as a reference frame and animate it into a short clip.',
  153: 'Create background music or a sound cue that fits the visual mood.',
  158: 'You now have a prompt and at least one usable content artifact.',
};

const copyableBySlide = {
  13.1: `Goal (A/E/C): [awareness / engagement / conversion].
Context: [product], platform [where], audience [who].
Reply: 1) one goal, 2) what to emphasize visually (emotion / context / CTA), 3) 1 format.`,
  13.2:
    'Create an image: [DESCRIPTION]. Style: professional, bright, minimal. Ratio: 16:9. Do not add text inside the image.',
  13.3:
    'Image: [WHAT IS SHOWN]. Style: [photo / vector / 3D]. Ratio: [1:1 / 16:9 / 9:16]. Use a neutral scene and avoid text unless needed.',
  13.33:
    'Image: [SUBJECT and ACTION]. Setting: [CONTEXT]. Composition: rule of thirds, subject on the right intersection. Camera: [close-up / medium / wide]. Style: [STYLE]. Ratio: 16:9.',
  // Primary fallback; multi-copyable slides overridden in m13-en-plain-overrides (M13P-TRIM).
  13.35: `Subject: [what is shown].
Goal: [Awareness / Engagement / Conversion].
Audience: [who].
Style: [photorealistic / minimal / …].
Composition + camera: [shot, angle].
Light and colors: [lighting + palette / mood].
Text in image (if needed): [text + placement].
Format: [1:1 / 16:9 / 9:16]. Avoid: [what to avoid].`,
  13.4: `Clip 3–5 s (no longer).
Script: [what happens in this shot].
Camera: [slow push-in / side / stable / crane up].
Tone: [professional / dynamic / calm].
Start: image-to-video from hero keyframe. Same style, same colors.`,
  13.5:
    'Video: [SHORT SCRIPT]. Format: [16:9 / 9:16]. Duration: 5-10 seconds. Style: [STYLE].',
  13.6: `Create a background music fragment, 30–60 seconds.
Mood: [calm / energetic]. Style: [acoustic / electronic / piano].
Tempo: [slow / medium]. No vocals. Use: [ads / presentation] – needs a commercial license.`,
  13.7:
    'Create a short sound effect: [DESCRIPTION]. Format: MP3 or WAV. No music, sound effect only.',
  13.101:
    'Evaluate this artifact by 3 criteria: brand fit, message clarity, platform fit. Context: [goal, audience, platform]. Artifact: [describe or paste prompt]. Return: criterion, score 1-5, what works, 1-2 specific fixes.',
  13.11:
    'Brief: Goal [awareness / engagement / conversion]. Audience: [describe]. Platform: [e.g. Instagram 1:1]. Image prompt: [subject] + [action/context] + [setting]. Brand: [colors and tone]. Variants: 3-5.',
  143: `You are a content pipeline assistant. Topic: [DESCRIBE].
1) BRIEF: goal (A/E/C), audience, platform, ratios.
2) STILLS / STORYBOARD: 2–3 frames (what, style, what to avoid).
3) VIDEO OR AUDIO-FIRST: if video – I2V from hero; if audio – VO/SFX/music + pacing.
4) RIGHTS: commercial license; faces/voices – consent.
5) DISCLOSURE: C2PA / Content Credentials or a human-visible AI label.
OUTPUT: checklist table (step | status | risk) + 1 next action.`,
  150.5:
    'Brief: goal [awareness / engagement / conversion], audience [who], platform [where]. Create a hero image: [subject and action], setting [context], style [style], ratio [1:1 / 16:9 / 9:16]. Brand: colors [X], tone [professional / friendly / premium].',
  151:
    'Hero image / keyframe: [WHAT IS SHOWN]. Setting: [CONTEXT]. Style: [STYLE]. Brand colors: [X]. Ratio: [1:1 / 16:9 / 9:16]. Leave space for a headline if needed.',
  152:
    'Animation from the hero image: 5-10 seconds. Script: [DESCRIBE]. Camera moves [slow push-in / side move / stable]. Tone: [professional / dynamic / calm]. Keep the same style, colors and subject.',
  153:
    'Create a 30-60 second music fragment. Mood: [calm / energetic]. Style: [acoustic / electronic / piano]. No vocals. Use as background music.',
  158:
    'Ask me 3 reflection questions: (1) Which artifact or prompt will I use in 24 hours? (2) What would I improve in the next version? (3) Did I write down usage rights? Then give one practical suggestion.',
};

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
    body: 'So AI does not generate a random look, specify in the prompt: color system (e.g. deep blue + orange accent), typography (minimal or classic serif), tone (professional, friendly) and visual identity (corporate style, clean background).',
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
    body: 'Does the video start look like the hero? Did the product or character stay consistent? If not – simplify the scene or strengthen the reference (same product, style and colors).',
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

const slide13_32Sections = [
  {
    heading: 'In short',
    body: 'A single prompt does not lock identity. In marketing you need 3–5 references (different angles) and the rule “same product / same style / same color palette” – otherwise the set drifts.',
    blockVariant: 'accent',
  },
  {
    heading: 'Reference lock – diagram',
    body: 'Four steps – tap a stage. You will copy the rule in the Consistency lab.',
    blockVariant: 'brand',
    image: 'm13_consistency_lock',
    imageAlt: 'Reference lock: refs, rule, generate, QA',
  },
  {
    heading: 'Brand / product sheet (minimum)',
    body: '(1) Hero / front view. (2) ¾ or side. (3) Flatlay or detail (label). (4) Optional – style / lighting ref.',
    blockVariant: 'brand',
    collapsible: true,
    collapsedByDefault: true,
  },
  {
    heading: 'Do this now',
    body: 'Collect or generate at least 3 references for your product or character. In the Consistency lab, tick refs and diagnose drift.',
    blockVariant: 'brand',
  },
  {
    heading: 'Check',
    body: 'Do you have at least 3 angles as refs? If the set still drifts – use Consistency lab: Symptom | Fix and copy the rule. Avoid real people’s faces without consent.',
    blockVariant: 'accent',
  },
];

const slide13_325Sections = [
  {
    heading: 'In short',
    body: 'After the reference lock diagram – practice: tick the refs you have, recognize drift (proportions, color, label, style) or a new brief. One choice → one copyable rule.',
    blockVariant: 'accent',
  },
  {
    heading: 'Drift lab',
    body: 'Tick refs (≥3), pick what drifted. Below – Symptom | Fix and the prompt rule – copy it into your next generation.',
    blockVariant: 'brand',
    image: 'm13_consistency_lab',
    imageAlt: 'Consistency drift lab: refs, Symptom and Fix, copyable rule',
  },
  {
    heading: 'Check',
    body: 'Did you tick refs, pick a mode and copy the rule? If refs are missing – go back to “Product and character – the same look” and collect 3–5 angles.',
    blockVariant: 'accent',
  },
];

const slide13_1Sections = [
  {
    heading: 'In short',
    body: 'Before you generate an image or clip, pick a campaign goal: Awareness, Engagement or Conversion. The diagram links the goal to the visual.',
    blockVariant: 'accent',
  },
  {
    heading: 'Campaign goals diagram',
    body: 'Pick a goal – each band shows what to emphasize: emotion at the top, clarity at the bottom.',
    blockVariant: 'brand',
    image: 'm13_aec_funnel',
    imageAlt: 'Campaign goals funnel: Awareness, Engagement, Conversion',
  },
  {
    heading: 'Do this now',
    body: 'Think of one real post or ad. Tap the matching band in the diagram, then copy the template below and fill it in (or run it in AI).',
    blockVariant: 'brand',
  },
  {
    heading: 'Campaign goals: how to decide',
    body: 'Awareness – attention and emotion; typical: cover, banner, social post. Engagement – context and stop-scroll; typical: carousel, video intro, illustration. Conversion – action, product, call to action (CTA); typical: ad layout, landing hero, “buy now” block. When emotion vs clarity: Awareness often = emotion; Conversion = clarity and trust.',
    blockVariant: 'terms',
    collapsible: true,
    collapsedByDefault: true,
  },
  {
    heading: 'Copyable template',
    body: 'Paste into an AI chat or fill it yourself – pick A/E/C for your visual.',
    copyable:
      'Help me choose a campaign goal (A/E/C) for this visual.\n\nContext: [product / topic], platform [where], audience [who].\nGoals: awareness | engagement | conversion.\n\nReply briefly:\n1) one goal,\n2) why (1 sentence),\n3) what to emphasize visually (emotion / context / CTA),\n4) 1–2 fitting formats.',
  },
  {
    heading: 'Check',
    body: 'Do you have one clear A/E/C goal and a one-sentence “why” (from the template / AI)? If not – go back to the bands or the template. If yes – continue to the Media chain.',
    blockVariant: 'accent',
  },
  {
    heading: 'Where to use this',
    body: 'Marketing visuals, social images and short videos, background music or sounds for projects – without needing a designer or composer every time.',
    blockVariant: 'terms',
  },
];

const bonus143Sections = [
  {
    heading: 'In short',
    body: 'After the test, spend 5 minutes on a mini pipeline: brief, stills/storyboard, then I2V or audio-first, and only then publish with a license and C2PA / disclosure.',
    blockVariant: 'accent',
  },
  {
    heading: 'Do this now',
    body: 'Pick one real topic (product or event). Copy the checklist prompt below, run it in AI, and note what you need before expensive video and what you will check before publishing.',
    blockVariant: 'brand',
  },
  {
    heading: 'Copyable prompt',
    body: 'Use this in one AI chat.',
    copyable: copyableBySlide[143],
  },
  {
    heading: 'Check',
    body: 'If license or disclosure is missing – do not publish; go back to audio rights and business/risk topics in Module 13. If the checklist is complete – you are ready for the Module 15 quick start.',
    blockVariant: 'accent',
  },
];

const recognitionBySlide = {
  13.34: {
    title: 'Recognize style and ratios',
    task: 'Read 5 situations and choose the best answer for each one.',
    examples: [
      'You need a square LinkedIn post with a product image.',
      'The same product should look like a premium catalog photo.',
      'The hero image needs space for a headline on the left.',
      'All campaign images must use the same colors and tone.',
      'A Stories format needs a vertical frame.',
    ],
    choices: ['Ratio: 1:1', 'Style', 'Composition', 'Brand consistency', 'Ratio: 9:16'],
    correctAnswers: [0, 1, 2, 3, 4],
    explanations: [
      'A square social post uses a 1:1 ratio.',
      'A premium catalog look is controlled mainly by style: light, texture, realism and tone.',
      'Leaving space for a headline is a composition decision.',
      'Repeating colors and tone protects brand consistency across images.',
      'Stories, Reels and similar mobile formats usually use a vertical 9:16 ratio.',
    ],
    goal: 'Before using the builder, recognize which prompt field needs fixing.',
  },
};

/** Module-level transfer strings – walk() has no slideId and mangles LT (M13-PLAIN-EN). */
const transferEnByModule = {
  14: {
    abilityBefore: 'Image/video/audio principles were unchecked.',
    abilityAfter: 'You can check style, rights, and consistency before a mini campaign.',
    firstAction24h: 'Within 24–48h generate one image from your brief and note usage rights.',
    nextStepCTA: 'Go to Module 15 – quick start or a full mini campaign.',
  },
};

const modules = lt.modules
  .filter((m) => [13, 14, 15].includes(m.id))
  .map((module) => {
    const translated = translateModule(module);
    applyM13EnPlainOverrides(translated);
    return translated;
  });

writeFileSync(outPath, `${JSON.stringify({ modules }, null, 2)}\n`);
console.log(`Wrote ${outPath}`);

function translateModule(module) {
  const translated = {
    ...walk(module, { moduleId: module.id, slideId: undefined, path: `M${module.id}` }),
    ...moduleMeta[module.id],
    slides: module.slides.map((slide) => translateSlide(slide, module.id)),
  };
  if (transferEnByModule[module.id]) {
    translated.transfer = { ...transferEnByModule[module.id] };
  }
  return translated;
}

function translateSlide(slide, moduleId) {
  const [title, subtitle] = slideMeta[slide.id] ?? [toEnglishTitle(slide.title), toEnglishTitle(slide.subtitle)];
  const translated = walk(slide, { moduleId, slideId: slide.id, path: `M${moduleId}/slides[${slide.id}]` });
  const contentOverrides = {};
  if (recognitionBySlide[slide.id]) {
    contentOverrides.recognitionExercise = recognitionBySlide[slide.id];
  }
  if (slide.id === 13.1) {
    contentOverrides.sections = slide13_1Sections;
    contentOverrides.footer = 'Next – slide 3: Media chain';
  }
  if (slide.id === 13.3) {
    contentOverrides.sections = slide13_3Sections;
    contentOverrides.toolsCollapsible = true;
    contentOverrides.toolsIntro =
      'The principle is the same across generators – strengths differ. One tool is enough to start.';
    contentOverrides.tools = slide13_3Tools;
  }
  if (slide.id === 13.4) {
    contentOverrides.sections = slide13_4Sections;
  }
  // shortTitle overrides applied below (toEnglishTitle leaves LT shortTitles intact).
  if (slide.id === 13.32) {
    contentOverrides.sections = slide13_32Sections;
    contentOverrides.footer = 'Next – slide 9: Consistency lab';
  }
  if (slide.id === 13.325) {
    contentOverrides.sections = slide13_325Sections;
    contentOverrides.footer = 'Next – slide 10: Composition and framing';
  }
  if (slide.id === 143) {
    contentOverrides.sections = bonus143Sections;
    contentOverrides.footer = 'Next – Module 15: Content project';
  }
  if (slide.id === 140.5) {
    contentOverrides.questions = [
      {
        id: 'm14-warm-1',
        question: 'How do you reduce a chaotic brand look across a social image series?',
        options: [
          'Specify brand colors, tone, visual identity and platform ratios',
          'Only write “make it pretty” and switch tools',
          'Specify only the file name',
          'Specify only music BPM',
        ],
        correct: 0,
        explanation:
          'Strong: brand consistency plus clear ratios (e.g. 1:1 feed / 9:16 Stories) reduces random style. If you missed it – revisit style and ratios.',
      },
      {
        id: 'm14-warm-2',
        question: 'What does audio-first thinking mean on the content path?',
        options: [
          'Plan audio (VO, SFX, music) with pacing and frames – not only “add music at the end”',
          'Use only a music generator with no scene plan',
          'Always pick the longest track',
          'Ignore licenses if the audio is short',
        ],
        correct: 0,
        explanation:
          'Strong: audio means VO + SFX + music and pacing. If you thought only “music” – go back to audio description and audio-first logic.',
      },
      {
        id: 'm14-warm-3',
        question: 'After the test, what should you do first in Module 15?',
        options: [
          'The required quick start: hero image + prompt + brief (MUST); video/audio only on the optional path',
          'Jump straight into editing a 3-minute film with no brief',
          'Skip the hero and go only to music',
          'Wait for AI to choose the campaign goal',
        ],
        correct: 0,
        explanation:
          'Forward bridge: Module 15 required minimum is the quick start (hero). Optional full path adds video, audio and edit. Do not burn time before you have a base artifact.',
      },
    ];
    contentOverrides.footer = 'Next – slide 3: Questions';
  }
  const shortTitleBySlide = {
    13.3: 'Style and ratios',
    13.4: 'Short video script',
    13.31: 'Quick check: style',
    13.32: 'Same look',
    13.37: 'Image builder',
    13.47: 'I2V builder',
    13.51: 'Quick check: video',
    13.52: 'Edit',
    150.26: 'Checkpoint',
    158: 'Project summary',
  };
  const shortTitle =
    shortTitleBySlide[slide.id] ??
    (slide.shortTitle ? toEnglishTitle(slide.shortTitle) || 'Warm-up' : undefined);

  return {
    ...translated,
    title,
    ...(subtitle ? { subtitle } : {}),
    ...(shortTitle ? { shortTitle } : {}),
    ...(Object.keys(contentOverrides).length
      ? {
          content: {
            ...translated.content,
            ...contentOverrides,
          },
        }
      : {}),
  };
}

function walk(value, ctx) {
  if (Array.isArray(value)) return value.map((v, i) => walk(v, { ...ctx, path: `${ctx.path}[${i}]` }));
  if (value && typeof value === 'object') {
    const out = {};
    for (const [key, child] of Object.entries(value)) {
      out[key] = walk(child, { ...ctx, key, path: `${ctx.path}.${key}` });
    }
    return out;
  }
  if (typeof value === 'string') return translateString(value, ctx);
  return value;
}

function translateString(value, ctx) {
  const { key, slideId, path } = ctx;
  if (shouldKeep(value, key, path)) return value;
  if (key === 'heading') return headingMap.get(value) ?? toEnglishTitle(value);
  if (key === 'copyable' || key === 'template' || key === 'reflectionPrompt') {
    return copyableBySlide[slideId] ?? 'Use the module template, fill the brackets, then check the result and improve one detail.';
  }
  if (key === 'templateLabel') return 'Prompt to copy';
  if (key === 'scenarioTitle') return slideMeta[slideId]?.[0] ?? toEnglishTitle(value);
  if (
    key === 'scenarioDescription' ||
    key === 'narrativeLead' ||
    key === 'body' ||
    key === 'description' ||
    key === 'introBody'
  ) {
    return genericBySlide[slideId] ?? 'Use this step to create, check and improve your AI content artifact.';
  }
  if (key === 'whyBenefit') {
    return genericBySlide[slideId] ?? 'After this step you will have a clearer AI content workflow.';
  }
  if (key === 'firstActionCTA') {
    return slideId === 140
      ? 'Answer 12 questions – images, video, audio, pipeline, audio-first, licenses, C2PA, risks and workflow.'
      : 'Start with the quick path: create one hero image with the prompt you used.';
  }
  if (key === 'microWinPhrase') return 'Each correct answer shows that you can apply content prompts.';
  if (key === 'thresholdExplanation') return 'At 70% or more, continue to Module 15. Below 70%, review the recommended Module 13 slides.';
  if (key === 'passedMessage') return 'Great work! You can continue to Module 15: Content engineering project.';
  if (key === 'failedMessage') {
    return 'Review Module 13 again – pipeline, images, video, audio, licenses and C2PA.';
  }
  if (key === 'question') return translateQuestion(value, slideId);
  if (key === 'explanation') return 'The best answer uses a clear goal, context, format and quality check.';
  if (key === 'scenarioContext') return genericBySlide[slideId] ?? 'Read the situation and choose the best next step.';
  if (key === 'title') {
    if (path.includes('.content.title')) return slideMeta[slideId]?.[0] ?? toEnglishTitle(value);
    return toEnglishTitle(value);
  }
  if (key === 'subtitle') return toEnglishTitle(value);
  if (key === 'footer') return 'Next slide';
  if (key === 'duration') return value.replace('greitas', 'quick').replace('pilnas kelias', 'full path');
  if (key === 'label') return translateLabel(value);
  if (key === 'value') return toEnglishTitle(value);
  if (key === 'term') return toEnglishTitle(value);
  if (key === 'definition') return genericBySlide[slideId] ?? 'A key term used in AI content engineering.';
  if (key === 'taskFrame') return 'Task';
  if (key === 'recommendedStart' || key === 'primaryPathIntro' || key === 'taskOneLiner' || key === 'firstAction24h') {
    return genericBySlide[slideId] ?? genericBySlide[15];
  }
  if (key === 'nextStepCTA') return 'Open the modules list or repeat the project with another topic';
  if (key === 'tagline') return 'Image + video + music = one content engineering path.';
  if (key === 'reflectionTitle') return 'Reflection prompt';
  if (key === 'audience') return 'For marketing and communication specialists.';
  if (key === 'heroStat') return 'One path.';
  if (key === 'heroText') return 'Images, video, music.';
  if (key === 'heroSubText') return 'Visual and audio content with AI for marketing and communication work.';
  if (key === 'imageAlt') return 'AI content engineering diagram';
  if (key === 'option' || path.includes('.options[')) return toEnglishOption(value);
  // Outcomes: never emit one identical stub for every index (M13-PLAIN-EN).
  // Hand-tuned 130 outcomes land via applyM13EnPlainOverrides after walk.
  if (path.includes('.outcomes[')) {
    const idxMatch = path.match(/\.outcomes\[(\d+)\]/);
    const idx = idxMatch ? Number(idxMatch[1]) : 0;
    const fallbacks = [
      'Understand the media chain from brief to a pre-publish check.',
      'Keep the same product or style across a series and plan sound before cuts.',
      'Know what to measure and what to check before publishing (rights, AI label).',
    ];
    return fallbacks[idx] ?? fallbacks[0];
  }
  if (path.includes('.items[')) return 'Create, check and reuse the artifact with a clear prompt.';
  if (path.includes('.stats[')) return toEnglishTitle(value);
  return toEnglishTitle(value);
}

function shouldKeep(value, key, path) {
  if (key === 'id') return true;
  if (['type', 'icon', 'color', 'blockVariant', 'image', 'imageKey', 'badgeVariant', 'accent', 'identityIcon', 'level'].includes(key)) {
    return true;
  }
  if (path.includes('.correct') || path.includes('.relatedSlideId') || path.includes('.recommendedSlideIds')) return true;
  if (value === 'Image' || value === 'Video' || value === 'Music') return true;
  return false;
}

function translateQuestion(value, slideId) {
  if (slideId === 140.5) {
    if (value.includes('chaotišką brandą')) {
      return 'How do you reduce a chaotic brand look across a social image series?';
    }
    if (value.includes('audio-first')) {
      return 'What does audio-first thinking mean on the content path?';
    }
    if (value.includes('Modulyje 15')) {
      return 'After the test, what should you do first in Module 15?';
    }
  }
  if (value.includes('kvadratinio socialinio įrašo')) return 'What should you specify for a square social post image?';
  if (value.includes('labiausiai valdo vaizdo išvaizdą')) return 'Which field controls the image look the most?';
  if (value.includes('chaotiško brando') || value.includes('chaotišką brandą')) {
    return 'How do you reduce a random, inconsistent brand look?';
  }
  if (value.includes('būtina trumpam vaizdo promptui')) return 'What does a short video prompt need?';
  if (value.includes('rinktis 9:16')) return 'When should you choose a 9:16 format?';
  if (value.includes('publikuojant sugeneruotą video')) return 'What should you check before publishing generated video publicly?';
  if (value.includes('geras vaizdo promptas')) return 'What should a good image prompt include?';
  if (value.includes('aspect ratio')) return 'What is aspect ratio in an image?';
  if (value.includes('trumpam vaizdo įrašui')) return 'What should you specify for a short video?';
  if (value.includes('muzikos generavimui')) return 'What should you describe for music generation?';
  if (value.includes('veidą ar balsą')) return 'What should you check before using an AI-made face or voice in a public campaign?';
  if (value.includes('marketing brief')) return 'In the full brief-to-publication workflow, what comes right after the brief?';
  if (value.includes('situacijai')) return 'Which prompt best fits this situation?';
  if (value.includes('saugiausias')) return 'What is the safest workflow here?';
  if (value.includes('C2PA')) return 'What is C2PA / disclosure practice before publishing AI content?';
  if (value.includes('audio-first') || value.includes('Audio-first')) {
    return 'Why plan audio-first pacing before expensive video?';
  }
  return 'Choose the best answer for this content engineering situation.';
}

function translateLabel(value) {
  if (value.includes('Scenarijai')) return 'Scenarios';
  if (value.includes('Artefaktas')) return 'Artifact';
  if (value.includes('Promptas')) return 'Prompt';
  if (value.includes('Blokai') || value.includes('blokai')) return 'Blocks';
  if (value.includes('Šablonai') || value.includes('Sablonai')) return 'Templates';
  if (value.includes('Įrankiai') || value.includes('Irankiai')) return 'Tools';
  return toEnglishTitle(value);
}

function toEnglishOption(value) {
  if (value === 'Proporcijas 1:1') return 'The 1:1 ratio';
  if (value === 'Tik įrankio pavadinimą') return 'Only the tool name';
  if (value === 'Tik žodį „gražu“') return 'Only the word “beautiful”';
  if (value === 'Tik muzikos nuotaiką') return 'Only the music mood';
  if (value.startsWith('Stilius, pvz.')) return 'Style, such as photorealistic, 3D or minimalist vector graphics';
  if (value === 'Failo atsisiuntimo pavadinimas') return 'The downloaded file name';
  if (value === 'Klausimų skaičius teste') return 'The number of test questions';
  if (value === 'Modulio trukmė') return 'The module duration';
  if (value.startsWith('Nurodyti spalvas')) return 'Specify colors, tone, typography direction and a clean visual identity';
  if (value === 'Palikti promptą kuo bendresnį') return 'Keep the prompt as generic as possible';
  if (value === 'Nurodyti tik trukmę sekundėmis') return 'Specify only the duration in seconds';
  if (value === 'Naudoti tik muzikos įrankį') return 'Use only a music tool';
  if (value === 'Scenarijus, trukmė, formatas ir tonas') return 'Script, duration, format and tone';
  if (value === 'Tik muzikos žanras') return 'Only the music genre';
  if (value === 'Tik kvadratinės proporcijos') return 'Only a square ratio';
  if (value === 'Kai kuriamas vertikalus Stories, Reels ar TikTok tipo klipas') {
    return 'When creating a vertical Stories, Reels or TikTok-style clip';
  }
  if (value === 'Kai kuriamas platus prezentacijos kadras') return 'When creating a wide presentation frame';
  if (value === 'Kai kuriamas kvadratinis LinkedIn įrašas') return 'When creating a square LinkedIn post';
  if (value === 'Kai kuriamas tik garso fragmentas') return 'When creating only an audio fragment';
  if (value.startsWith('Naudojimo teises')) {
    return 'Usage rights, face/voice consent and whether the result fits the brand';
  }
  if (value === 'Tik ar failas turi gražų pavadinimą') return 'Only whether the file has a nice name';
  if (value === 'Tik ar video yra ilgesnis nei 1 minutė') return 'Only whether the video is longer than 1 minute';
  if (value === 'Tik ar promptas buvo parašytas anglų kalba') return 'Only whether the prompt was written in English';
  if (value.includes('Tik')) return 'Only one narrow detail';
  if (value.includes('Subjektas')) return 'Subject, style, ratio and what to avoid';
  if (value.includes('pločio')) return 'The width-to-height ratio, such as 16:9 or 1:1';
  if (value.includes('Scenarijų')) return 'A script: what happens, duration and tone';
  if (value.includes('Nuotaiką')) return 'Mood, style, tempo and, if needed, instruments or voice';
  if (value.includes('Sutikimą')) return 'Consent, rights and deepfake risk';
  if (value.includes('Formuluoti')) return 'Write a brand-aligned prompt and plan several variants';
  if (value.includes('vertikalų 9:16')) return 'A vertical 9:16 product hero image with brand colors and space for a headline';
  if (value.includes('hero vaizdą') && value.includes('I2V')) {
    return 'Generate a hero image first, then use it in an image-to-video tool';
  }
  if (value.includes('brand spalvas')) {
    return 'Specify brand colors, tone, visual identity and platform ratios';
  }
  if (value.includes('padaryk gražu')) return 'Only write “make it pretty” and switch tools';
  if (value.includes('VO, SFX') || value.includes('VO/SFX')) {
    return 'Plan audio (VO, SFX, music) with pacing and frames – not only “add music at the end”';
  }
  if (value.includes('tik muzikos generatorių')) return 'Use only a music generator with no scene plan';
  if (value.includes('Privalomą greitą startą') || value.includes('hero vaizdas + promptas')) {
    return 'The required quick start: hero image + prompt + brief (MUST); video/audio only on the optional path';
  }
  if (value.includes('3 min filmą')) return 'Jump straight into editing a 3-minute film with no brief';
  if (value.includes('Provenance') || value.includes('Content Credentials')) {
    return 'Provenance marking: Content Credentials / watermark and, where needed, a human-visible AI label';
  }
  return 'A clear, specific option based on goal, format and checks';
}

function toEnglishTitle(value = '') {
  return String(value)
    .replaceAll('DI', 'AI')
    .replaceAll('Vaizdas', 'Image')
    .replaceAll('vaizdas', 'image')
    .replaceAll('Video', 'Video')
    .replaceAll('Muzika', 'Music')
    .replaceAll('muzika', 'music')
    .replaceAll('Promptas', 'Prompt')
    .replaceAll('promptas', 'prompt')
    .replaceAll('Scenarijus', 'Scenario')
    .replaceAll('Rezultatai', 'Results')
    .replaceAll('Santrauka', 'Summary')
    .replaceAll('Žodynėlis', 'Glossary')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/g, '')
    .replace(/\b(Toliau|skaidre|Modulio|kelias|Trumpai|Daryk|dabar)\b/gi, '')
    .trim() || 'AI content step';
}
