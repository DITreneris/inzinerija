/**
 * Patch EN overlay modules-en-m13-m15.json to mirror LT 2026 M13–15 curriculum refresh.
 * Run: node scripts/patch-m13-m15-en-2026.mjs
 *
 * STALE / APPLIED (2026-07): do not re-run. Live EN overlay already has diagram image keys
 * (`m13_media_pipeline`, `m13_consistency_lock`, `m13_postprod_steps`); re-insert would drop them.
 * Historical note: docs/development/M79_PATCH_REGISTRY.md §5a.
 */
import fs from 'fs';

const path = 'src/data/modules-en-m13-m15.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const m13 = data.modules.find((m) => m.id === 13);
const m14 = data.modules.find((m) => m.id === 14);
const m15 = data.modules.find((m) => m.id === 15);
if (!m13 || !m14 || !m15) throw new Error('M13/M14/M15 not found in EN overlay');

const slide = (id) => m13.slides.find((s) => s.id === id);
const insertAfter = (afterId, newSlide) => {
  if (m13.slides.some((s) => s.id === newSlide.id)) return false;
  const i = m13.slides.findIndex((s) => s.id === afterId);
  if (i < 0) throw new Error(`insertAfter: ${afterId} not found`);
  m13.slides.splice(i + 1, 0, newSlide);
  return true;
};

// --- Module 13 meta ---
m13.subtitle = 'Images, video, audio – pipeline and prompts';
m13.description =
  'Content engineering: pipeline, images, video, audio with AI – consistency and provenance.';

const s130 = slide(130);
s130.subtitle = 'Images, video, audio';
s130.content.whyBenefit =
  'After this module you will know how to create images, short videos and audio with AI – from pipeline and prompts to consistency, tools and quality checks.';
s130.content.heroText = 'Images, video, audio.';
s130.content.heroSubText =
  'For marketing and communication specialists – visual and audio content with AI.';
s130.content.outcomes = [
  'Pipeline: brief → stills → refs → I2V → audio → edit → QA',
  'Practice: consistency, audio-first, copyable templates',
  'Business: KPIs, risks, C2PA/disclosure, path from brief to publication',
];
s130.content.footer = 'Next slide';

slide(13.1).content.footer = 'Next slide';

// --- 13.12 Pipeline ---
insertAfter(13.1, {
  id: 13.12,
  title: 'Generative media pipeline',
  shortTitle: 'Media pipeline',
  subtitle: 'Brief → stills → refs → I2V → audio → edit → QA',
  type: 'content-block',
  content: {
    sections: [
      {
        heading: 'In short',
        body: 'In 2026 practice, the chain wins – not the “best model”. One prompt into a video generator means expensive retries. Pipeline: brief + brand → stills/storyboard → reference lock → short 3–5 s I2V clips → audio (audio-first) → edit → QA and provenance.',
        blockVariant: 'accent',
      },
      {
        heading: '4 steps (+ QA)',
        body: '(1) Brief + brand lock. (2) Stills / storyboard – lock frames before paying for video. (3) Reference lock + 3–5 s I2V. (4) Audio + edit. (5) QA: brand, message, rights, disclosure.',
        blockVariant: 'brand',
      },
      {
        heading: 'Do this now',
        body: 'Fill in the checklist for your topic – this is a plan, not a generator prompt.',
        blockVariant: 'brand',
      },
      {
        heading: 'Copyable template',
        body: 'Pipeline checklist – copy and fill in.',
        copyable:
          'Pipeline checklist:\nBrief: goal [Awareness/Engagement/Conversion], audience [who], platform [where].\nBrand: colours [X], tone [Y].\nStills: hero + [0–2] extra frames (lock before video).\nRefs: [product/character – 3–5 angles] / none.\nClips: [2–4] × 3–5 s (I2V), not one long one-shot.\nAudio: [VO first / bed only] + rights [licensed / demo].\nEdit: cut + grade + mix.\nQA: brand | message | format | rights | disclosure (C2PA/label).',
      },
      {
        heading: 'Check',
        body: 'Do you have at least one locked still before video? Do you know whether audio will be VO-first or bed only?',
        blockVariant: 'accent',
      },
      {
        heading: 'Where to use this',
        body: 'Ad clips, social Reels, product demos, internal explainers.',
        blockVariant: 'terms',
        collapsible: true,
        collapsedByDefault: true,
      },
    ],
    footer: 'Next slide',
  },
});

const s1315 = slide(13.15);
if (s1315?.content) {
  s1315.content.subtitle =
    'Next: image prompts (subject + context + style), ratios, brand, consistency. Tools: FLUX, GPT-Image, Midjourney, Ideogram.';
}

// Tool cheat sheet on 13.3
const s133 = slide(13.3);
const toolsSec = s133.content.sections.find((s) => s.heading === 'Which tool for which case');
if (toolsSec) {
  toolsSec.body =
    'GPT-Image / ChatGPT – natural language, fast brief→image. FLUX – photorealism and multi-reference consistency. Midjourney – high artistic level, character ref. Leonardo.ai – photorealism, product design. Ideogram – text in images (logo, posters). Adobe Firefly – CC, legally safer sources, C2PA. Google Imagen – object retention, SynthID – safe advertising. Stable Diffusion – open, flexible (advanced).';
}

// --- 13.32 Consistency ---
insertAfter(13.31, {
  id: 13.32,
  title: 'Character / product consistency',
  shortTitle: 'Consistency',
  subtitle: '3–5 references + same-product lock',
  type: 'content-block',
  content: {
    sections: [
      {
        heading: 'In short',
        body: 'A prompt alone does not lock identity. In marketing you need reference lock: 3–5 reference images (different angles) and the rule “same product / same character / same style / same color palette”. Without that, the campaign set “drifts”.',
        blockVariant: 'accent',
      },
      {
        heading: 'Brand / product sheet (minimum)',
        body: '(1) Hero / front view. (2) ¾ or side. (3) Flatlay or detail (label). (4) Optional – style / lighting ref.',
        blockVariant: 'brand',
      },
      {
        heading: 'Do this now',
        body: 'Collect or generate 3 references for your product or character. Copy the rule into your next generation.',
        blockVariant: 'brand',
      },
      {
        heading: 'Copyable template',
        body: 'Reference lock rule.',
        copyable:
          'Reference lock: use the same 3–5 reference images.\nRule: same product, same proportions, same label/logo placement, same color palette, same style.\nNew scene: [SETTING / ACTION]. Camera: [angle]. Format: [1:1 / 16:9 / 9:16].\nNo text in the image (unless label on product).',
      },
      {
        heading: 'Check',
        body: 'Did the product distort, change colour or lose its label? If yes – simplify the scene, strengthen refs or inpaint only the problem area. Avoid real people’s faces without consent.',
        blockVariant: 'accent',
      },
    ],
    footer: 'Next slide',
  },
});

// --- Video 13.4 ---
const s134 = slide(13.4);
s134.subtitle = '3–5 s clips, storyboard, image → video';
s134.content.sections = [
  {
    heading: 'In short',
    body: 'Short video: clear script, tone, camera. Better 2–4 short clips (3–5 s) than one 20–30 s one-shot. Lock storyboard stills before expensive video generation (see 13.12).',
    blockVariant: 'accent',
  },
  {
    heading: 'Framing and camera angle',
    body: 'Framing changes emotion: eye level, high angle, low angle, POV. Specify in the prompt. Video models handle motion and time best – not visual content from scratch.',
    blockVariant: 'brand',
  },
  {
    heading: 'Image → video chain',
    body: 'Hero / keyframe → I2V (Runway, Kling, Veo, Seedance, Sora) → edit. Audio-first hint: if there will be VO, lock VO duration first – then cut clips to match audio.',
    blockVariant: 'brand',
  },
  {
    heading: 'Do this now',
    body: 'Write 2–3 sentences for one 3–5 s shot. Copy the template below.',
    blockVariant: 'brand',
  },
  {
    heading: 'Copyable prompt',
    body: 'Single short clip template.',
    copyable:
      'Clip 3–5 s (no longer).\nScript: [what happens in this frame].\nCamera: [slow push-in / side move / stable / crane up].\nTone: [professional / dynamic / calm].\nStart: image-to-video from hero keyframe. Same style, same colors.',
  },
  {
    heading: 'Copyable chain: image to video',
    body: 'Hero first, then animation; for longer – multiple keyframes.',
    copyable:
      '1) Create hero image: [SUBJECT], setting [CONTEXT], style [STYLE], ratio 16:9 or 9:16, no text in image.\n2) Animation from this image: 3–5 seconds. Camera moves […], subject [action]. Same character/product, same style, same color palette.\n3) (If longer needed) Repeat 2) with a second keyframe – edit together later.',
  },
  {
    heading: 'Check',
    body: 'Does the video start look like the hero? Did product/character drift? If not – simplify the scene or strengthen reference (13.32).',
    blockVariant: 'accent',
  },
  {
    heading: 'Same look across shots',
    body: 'Same reference + “same product / same style”. Avoid real faces/voices without consent (13.101).',
    blockVariant: 'terms',
    collapsible: true,
    collapsedByDefault: true,
  },
];

// --- 13.5 CPI ---
const s135 = slide(13.5);
s135.title = 'Video tools, format and CPI';
s135.subtitle = '2026 matrix + cost per usable clip';
s135.content.sections = [
  {
    heading: 'Why it is useful and what to specify',
    body: 'AI lets you test variants fast. Specify format (16:9 / 9:16) and 3–5 s duration. Track CPI (cost per usable clip) = total generation + retry cost / usable clips – not just €/second. Before publishing – rights.',
    blockVariant: 'accent',
  },
  {
    heading: '2026 video tool matrix',
    body: 'Seedance 2.0 – directed motion + many refs. Kling 3.0 – quality/cost balance, I2V. Veo 3.1 – highest quality + native audio. Sora 2 – OpenAI ecosystem, 1–2 image refs. Synthesia – avatars / training. InVideo / CapCut – social templates and editing.',
    blockVariant: 'brand',
  },
  {
    heading: 'Do this now',
    body: 'Pick one tool and generate one 3–5 s I2V clip. Note how many retries it took (CPI note).',
    blockVariant: 'brand',
  },
  {
    heading: 'Copyable prompt',
    body: 'Short clip + CPI note.',
    copyable:
      'Video clip from keyframe: [1–2 sentences of action].\nFormat: [16:9 / 9:16]. Duration: 3–5 sec. Style: [specify].\nCPI note: how many retries until usable? [N]',
  },
  {
    heading: 'Check',
    body: 'File downloaded? Commercial rights OK? What was CPI (retries included)?',
    blockVariant: 'accent',
  },
  {
    heading: 'All video tools (overview)',
    body: 'Seedance, Kling 3, Veo 3.1, Sora 2, Runway, Pika, Luma Dream Machine, Synthesia, InVideo. Full list – Tools section (module 13).',
    blockVariant: 'terms',
    collapsible: true,
    collapsedByDefault: true,
  },
  {
    heading: 'Video prompt fields',
    body: 'duration_s (3–5), scene, visual_style, camera_movement, lighting, composition, aspect_ratio, reference_ids, negative, audio, brand_guidelines, safety_flags, cpi_note.',
    blockVariant: 'terms',
    collapsible: true,
    collapsedByDefault: true,
  },
];

const s1351 = slide(13.51);
s1351.subtitle = '3 questions before post-prod and audio';
s1351.content.questions[0].options[0] = 'Script, duration (3–5 s), format and tone';

// --- 13.52 Post-prod ---
insertAfter(13.51, {
  id: 13.52,
  title: 'Post-production',
  shortTitle: 'Post-prod',
  subtitle: 'AI = raw material; cut, grade, mix',
  type: 'content-block',
  content: {
    sections: [
      {
        heading: 'In short',
        body: 'AI video = raw material, not the final deliverable. Professional practice: edit 3–5 s clips, color grade, text/overlay, audio mix, export for platform (CapCut / Premiere).',
        blockVariant: 'accent',
      },
      {
        heading: 'Minimum checklist',
        body: '(1) Assemble 2–4 clips per script / VO. (2) Cut weak frames; hook in first 1–2 s. (3) Consistent colours. (4) VO or bed + SFX. (5) Loudness guide ~−14 LUFS (music) / ~−16 (VO mix) – trust your ears. (6) Export 9:16 or 16:9.',
        blockVariant: 'brand',
      },
      {
        heading: 'Do this now',
        body: 'Write a 4-line edit plan for your mini clip.',
        blockVariant: 'brand',
      },
      {
        heading: 'Copyable template',
        body: 'Edit plan 15–30 s.',
        copyable:
          'Edit plan (15–30 s):\n0–3 s: [hook clip]\n3–8 s: [product / benefit]\n8–15 s: [proof / detail]\nEnd: [CTA frame + text]\nAudio: [VO / bed] | rights: [licensed]',
      },
      {
        heading: 'Check',
        body: 'Without AI “magic”, does the clip read as a story? Does audio drown VO?',
        blockVariant: 'accent',
      },
    ],
    footer: 'Next slide',
  },
});

// --- Audio section ---
const s1356 = slide(13.56);
s1356.title = 'Audio';
s1356.subtitle = 'Section: VO, SFX, music – audio-first';
s1356.content.title = 'Audio';
s1356.content.subtitle =
  'Audio-first: VO or bed duration first, then video. VO / SFX / music triad. Licences: ElevenMusic, Soundraw, Beatoven vs Suno demo.';

const s136 = slide(13.6);
s136.title = 'Audio-first: VO and music description';
s136.shortTitle = 'Audio-first and music';
s136.subtitle = 'Audio first, then video cuts';
s136.content.sections = [
  {
    heading: 'In short',
    body: 'Audio-first: VO (or bed duration) first, then video cuts to match pacing. For music describe mood, style, tempo, instruments. Client / ads – licensed stack (ElevenMusic, Soundraw, Beatoven); Suno/Udio – demo, not client work.',
    blockVariant: 'accent',
  },
  {
    heading: 'Do this now',
    body: 'If you have VO – generate or record VO first. If bed only – copy the music prompt. Mark license intent.',
    blockVariant: 'brand',
  },
  {
    heading: 'Copyable prompt – bed',
    body: 'Background music template.',
    copyable:
      'Create a background music fragment, 30–60 seconds.\nMood: [calm / energetic]. Style: [acoustic / electronic / piano].\nTempo: [slow / medium]. No vocals. Use: [ad / presentation] – commercial licence required.',
  },
  {
    heading: 'Copyable prompt – VO',
    body: 'Voiceover template (ElevenLabs etc.).',
    copyable:
      'Voiceover, [EN/LT], tone [professional / friendly], pace [calm].\nScript: [paste 2–4 sentences].\nNo background music in file – voice only. I will mix with bed later.',
  },
  {
    heading: 'Check',
    body: 'Does bed drown VO? Does the licence allow ads?',
    blockVariant: 'accent',
  },
  {
    heading: 'English MASTER template (universal)',
    body: 'Many music tools understand English field names better. Add license intent.',
    blockVariant: 'brand',
    copyable:
      'Create a [genre] track,\nmood: [emotion],\ntempo: [bpm or speed],\ninstruments: [list],\nvocal: none,\nstructure: intro – bed – soft outro,\ntarget platform: [YouTube/TikTok/ads],\ngoal: background / branding,\nlicense intent: commercial,\nproduction quality: professional.',
  },
  {
    heading: 'TOP audio tools',
    body: 'ElevenLabs – VO and SFX. ElevenMusic – licensed music, client work. Soundraw / Beatoven – royalty-friendly beds. Suno / Udio – fast demos, not client. Full list – Tools section.',
    blockVariant: 'terms',
    collapsible: true,
    collapsedByDefault: true,
  },
];

const s137 = slide(13.7);
s137.title = 'Sound effects, licences and loudness';
s137.shortTitle = 'Licences and loudness';
s137.subtitle = 'SFX, commercial OK?, LUFS';
s137.content.sections = [
  {
    heading: 'In short',
    body: 'Separate SFX from music. For commercial work – licensed tools. Loudness guide: ~−14 LUFS (music) / ~−16 (VO mix) – final call by ear. Campaign legal / C2PA – slide 13.101.',
    blockVariant: 'accent',
  },
  {
    heading: 'Rights checklist (5 points)',
    body: '(1) Terms / License. (2) Does the plan allow commercial? (3) YouTube / ads / podcast? (4) Attribution? (5) Write: “Licence allows / does not allow – [tool, date].”',
    blockVariant: 'brand',
  },
  {
    heading: 'Do this now',
    body: 'Before public use open ToS; note “commercial OK?” yes/no.',
    blockVariant: 'brand',
  },
  {
    heading: 'Copyable prompt',
    body: 'SFX template.',
    copyable:
      'Create a short sound: [e.g. “soft transition whoosh, 1 second”].\nFormat: WAV or MP3. No music – SFX only.',
  },
  {
    heading: 'Check',
    body: 'Download OK? Licence OK for ads / YouTube?',
    blockVariant: 'accent',
  },
  {
    heading: 'Tools',
    body: 'ElevenLabs (VO/SFX), ElevenMusic, Soundraw, Beatoven, Suno, Udio, Boomy. Full list – Tools section (module 13).',
    blockVariant: 'terms',
  },
];

// --- 13.101 Legal + C2PA ---
const s101 = slide(13.101);
const rights = s101.content.sections.find((s) => s.heading === 'Rights and risks (required)');
if (rights) {
  rights.body =
    'Before publishing check: (1) copyright and commercial licence; (2) deepfake – face/voice only with consent; (3) trademarks; (4) GDPR; (5) provenance – C2PA Content Credentials, SynthID/watermark, human-visible AI label (EU AI Act Art. 50). Social often strips metadata – Soft Binding / watermark helps.';
}
const legalDeep = s101.content.sections.find((s) => s.heading === 'Rights, risks and business (more)');
if (legalDeep) {
  legalDeep.body =
    'Deeper dive: copyright, deepfake, trademarks, GDPR. Provenance: C2PA manifest (who/which model), persistent watermark (e.g. SynthID), human-visible label. Checklist: does the tool mark output? disclosure line in brief? “This visual / video was created with AI; tool: [X].”\n\nUse cases: A/B, product visuals, social. Avoid unsourced percentages.';
}
const qa = s101.content.sections.find((s) => s.heading === 'Before publishing: QA and versions');
if (qa) {
  qa.body =
    'Check: (1) Text in image. (2) Brand. (3) Format. (4) Message. (5) Brand safety. (6) Rights. (7) Disclosure / C2PA / watermark. (8) Reference lock.\n\nFiles: V1, V2, V3 + what changed in the prompt.';
}
const pitfalls = s101.content.sections.find((s) => s.heading === 'Top 3 pitfalls');
if (pitfalls) {
  pitfalls.body =
    '(1) Over-abstract prompts → be specific + MASTER. (2) Text in visuals without control → Ideogram/GPT-Image + typography. (3) Long video one-shot → 3–5 s clips + edit; track CPI.';
}

// --- 13.11 ---
const s1311 = slide(13.11);
const trumpai = s1311.content.sections.find((s) => s.heading === 'In short');
if (trumpai) {
  trumpai.body =
    'Full business cycle: (1) Marketing brief. (2) Prompt + brand + reference lock. (3) 3–5 variants / short I2V. (4) Iteration (CPI video). (5) Platform adaptation. (6) A/B. (7) Optimisation + disclosure. For the technical media pipeline see MUST slide “Generative media pipeline” (13.12); optional MASTER – 13.35. Parallel team work only after shared brief, brand and (if needed) VO duration.';
}

// --- Glossary 13.8 ---
const s138 = slide(13.8);
if (s138?.content?.terms) {
  const extra = [
    {
      term: 'CPI (cost per usable clip)',
      definition:
        'Total generation + retry cost divided by usable clips – not just €/second. Tracks real video cost in 2026 workflows.',
    },
    {
      term: 'C2PA (Content Credentials)',
      definition:
        'Signed provenance metadata showing how AI content was created. Helps disclosure and trust before publication.',
    },
    {
      term: 'Audio-first',
      definition:
        'Finish VO or bed duration first, then cut or generate video to match audio pacing.',
    },
    {
      term: 'Reference lock',
      definition:
        '3–5 reference images plus rules: same product, same character, same style, same color palette.',
    },
  ];
  for (const t of extra) {
    if (!s138.content.terms.some((x) => x.term === t.term)) {
      s138.content.terms.push(t);
    }
  }
}

// --- M14 ---
m14.subtitle = 'Test: images, video, audio';
m14.description =
  'Check pipeline, consistency, audio-first and provenance before Module 15.';
const s140 = m14.slides.find((s) => s.id === 140);
s140.content.firstActionCTA =
  'Answer 12 questions – images, video, audio, pipeline, audio-first, licences, C2PA, risks and workflow.';
s140.content.duration = '~12–18 min';
s140.content.whyBenefit =
  'After this test you will know whether you are ready for the final Content engineering project (Module 15).';

const s141 = m14.slides.find((s) => s.id === 141);
s141.subtitle = 'Images, video, audio, pipeline';
const qs = s141.testQuestions;
if (!qs.some((q) => q.id === 'm14-q9')) {
  qs.push(
    {
      id: 'm14-q9',
      type: 'mcq',
      question: 'Why have storyboard / stills before expensive video generation?',
      options: [
        'So the file is larger',
        'To lock composition and reduce retries / CPI',
        'So you can skip the brief',
        'So you can skip rights checks',
      ],
      correct: 1,
      explanation:
        'Stills / storyboard lock the visual cheaply; the video model then handles motion. That cuts randomness and cost per usable clip (CPI).',
      relatedSlideId: 13.12,
    },
    {
      id: 'm14-q10',
      type: 'mcq',
      question: 'What does audio-first workflow mean?',
      options: [
        'Video first, then any audio',
        'Finish VO (or bed duration) first, then cut / generate video to match audio pacing',
        'SFX only, no music',
        'Silent export only',
      ],
      correct: 1,
      explanation:
        'Audio-first: VO or bed sets edit rhythm. If audio “floats”, video feels disconnected.',
      relatedSlideId: 13.6,
    },
    {
      id: 'm14-q11',
      type: 'scenario',
      scenarioContext: 'A client needs background music for a monetised YouTube ad.',
      question: 'Which choice should you prioritise?',
      options: [
        'Suno free demo without checking licence',
        'Licensed stack (ElevenMusic, Soundraw or Beatoven) and ToS check',
        'Any random file from the internet',
        'Silence, because music is never allowed',
      ],
      correct: 1,
      explanation:
        'Client / ad / monetisation – licensed tools. Suno/Udio suit demos, not “probably nobody will notice”.',
      relatedSlideId: 13.7,
    },
    {
      id: 'm14-q12',
      type: 'mcq',
      question: 'What is C2PA / disclosure practice before publishing AI content?',
      options: [
        'Only a nice file name',
        'Provenance marking: Content Credentials / watermark and, where required, human-visible AI label',
        'Only colour correction',
        'Only a longer prompt',
      ],
      correct: 1,
      explanation:
        'EU AI Act Art. 50 and platform policies require recognisable synthetic content: C2PA, watermark (e.g. SynthID), human-visible label.',
      relatedSlideId: 13.101,
    },
  );
}

const s142 = m14.slides.find((s) => s.id === 142);
s142.content.failedMessage =
  'We recommend reviewing Module 13 slides again – pipeline, images, video, audio.';
s142.content.useCaseBlock.body =
  'Prepare at least a hero image (150.5); if you want – a mini campaign: video, audio and edit (151–154). Tools – Tools section.';
s142.content.reflectionPrompt =
  'META: You are a training reflection assistant. Goal – consolidate knowledge after the Content path test.\nINPUT: I just finished Module 14 – images, video, audio, pipeline, audio-first, C2PA.\nOUTPUT: Ask 3 questions: (1) Which artefact will I create in Module 15? (2) What was newest? (3) What do I want to try first? After my answers, give one concrete tip.';
if (m14.businessExamples?.[1]) {
  m14.businessExamples[1].description = '12 questions before the Module 15 project';
}

// --- M15 ---
m15.description =
  'Create a hero image with a prompt; optionally continue into video, audio and edit.';
const s150 = m15.slides.find((s) => s.id === 150);
s150.subtitle = 'Required: hero image; optional: video, audio, edit';
s150.content.whyBenefit =
  'After the project you will have a hero image with the prompt you used and a brief; optionally a mini campaign pack (video + audio + edit) and templates for later work.';
s150.content.firstActionCTA =
  'Start with the quick path: create one hero image with the prompt you used. For the full path – continue into video, audio and edit.';
s150.content.recommendedStart =
  'Quick start – one hero image (150.5), then you can go to the summary. Full path (optional) – 151 → 152 → 153 → 154.';
s150.content.primaryPathIntro =
  'Required minimum: quick start – hero image (150.5). Full path (optional): keyframe (151) → video (152) → audio (153) → edit (154). On the quick path after 150.5 you can go to the summary.';
s150.content.taskOneLiner =
  'Complete 150.5 to finish the module; 151–154 – optional full mini campaign path.';

const s15025 = m15.slides.find((s) => s.id === 150.25);
s15025.content.sections[0].body =
  'Quick path: brief → one hero image → prompt → tweak → summary. Full path (optional): hero → 3–5 s I2V → VO/bed → 15–30 s edit → QA + disclosure.';
s15025.content.sections[1].body =
  'Name your path: quick (150.5 only) or full (151–154). Write your first artefact in one sentence.';

const s15026 = m15.slides.find((s) => s.id === 150.26);
s15026.content.body =
  'Before continuing, confirm your path. If 150.5 is done and you choose the quick path – go to the summary. If you want a mini campaign – continue to 151–154.';
s15026.content.sections[1].body =
  'Hero → **video** (3–5 s) → **audio** (VO/bed) → **edit** (154) → QA. Mini campaign pack (slides 151–154).';
s15026.content.sections[2].body =
  'Which path do you choose – quick (summary) or full (151)? What is your first artefact?';

const s152 = m15.slides.find((s) => s.id === 152);
s152.subtitle = 'Optional: 3–5 s I2V from keyframe';
s152.content.scenarioDescription =
  'Optional: use 151 (or 150.5) as keyframe and generate a 3–5 s clip (or 2 clips). Artefact: video / link + prompt + CPI note.';
s152.content.template =
  'Animation from hero image: 3–5 sec. Script: [DESCRIBE]. Camera moves [slow push-in / side move / stable]. Tone: [professional / dynamic / calm]. Format: [16:9 / 9:16]. Same style, same colors. CPI note: retries [N].';

const s153 = m15.slides.find((s) => s.id === 153);
s153.title = 'Scenario: Audio (VO or bed)';
s153.subtitle = 'Optional: VO or 30–60 s bed + rights';
s153.content.scenarioTitle = 'Audio';
s153.content.scenarioDescription =
  'Optional: generate VO or 30–60 s background music. Artefact: file / link + prompt + “commercial OK?”.';
s153.content.template =
  'Option A (bed): 30–60 sec, mood […], no vocals, license intent: commercial.\nOption B (VO): [2–4 sentences], tone […], voice only.';

// Insert 154 before 158
if (!m15.slides.some((s) => s.id === 154)) {
  const i158 = m15.slides.findIndex((s) => s.id === 158);
  m15.slides.splice(i158, 0, {
    id: 154,
    title: 'Scenario: Edit / montage',
    subtitle: 'Optional: 15–30 s from 2–4 clips',
    type: 'practice-scenario',
    optional: true,
    badgeVariant: 'optional',
    content: {
      scenarioTitle: 'Edit / montage',
      scenarioDescription:
        'Optional: assemble a 15–30 s final clip from 2–4 I2V shots + VO or bed. Artefact: export / link + checklist (rights, disclosure, CPI).',
      taskFrame: 'Task',
      scenario: {
        narrativeLead:
          'Use CapCut or similar. AI = raw. Hook in first 1–2 s. Mark disclosure and rights.',
      },
      template:
        'Edit plan (15–30 s):\n0–3 s: [hook]\n3–8 s: [product / benefit]\n8–15 s: [detail]\nEnd: [CTA]\nAudio: [VO / bed] | rights: [licensed]\nDisclosure: AI-created with [tool]. CPI note: [N retries].',
      templateLabel: 'Edit checklist',
      instructions: {
        title: 'Steps',
        steps: [
          {
            step: 1,
            title: 'Edit and export',
            description: 'Artefact: file / link + rights + disclosure + CPI note.',
          },
        ],
      },
    },
    recommended: false,
  });
}

const s158 = m15.slides.find((s) => s.id === 158);
if (s158?.content) {
  s158.content.introBody =
    'Congratulations! You finished the quick start or full mini campaign path. You have an artefact, a prompt and a clearer path: hero → video → audio → edit.';
  s158.content.stats = [
    { label: 'Quick start', value: '1' },
    { label: 'Artefact', value: '1+' },
    { label: 'Prompt', value: 'saved' },
  ];
  const img = s158.content.sections?.find((s) => s.heading === 'Image');
  if (img?.items) {
    img.items = [
      'Brief: goal, audience, platform',
      'Hero image / keyframe with brand colours',
      'Artefact: image + prompt used + V1/V2 note if you iterated',
    ];
  }
  const vid = s158.content.sections?.find((s) => s.heading?.includes('video') || s.heading?.includes('Video'));
  if (vid) {
    vid.heading = 'Short video';
    vid.items = [
      'Image → video from hero keyframe',
      '3–5 s clips, same style',
      'Artefact: file / link + prompt + CPI',
    ];
  }
  const aud = s158.content.sections?.find(
    (s) => s.heading?.includes('Music') || s.heading?.includes('music') || s.heading?.includes('gars'),
  );
  if (aud) {
    aud.heading = 'Audio, edit and checklist';
    aud.items = [
      'Audio-first: VO or bed + rights',
      'Optional edit 15–30 s (154)',
      'Checklist: brief, prompt, refs?, disclosure?, CPI?',
    ];
  }
  const next = s158.content.sections?.find((s) => s.icon === 'ArrowRight' || s.heading?.includes('Next'));
  if (next?.items) {
    next.heading = 'Next step';
    next.items = [
      'Return to the modules list – repeat practice with another topic or open another advanced path (data analysis 7–9, agents 10–12).',
      'Save your best prompts – use them as templates.',
    ];
  }
  s158.content.tagline = 'Image + video + audio = one content engineering path.';
  s158.content.firstAction24h =
    'Within 24–48 hours use your quick start hero image or one mini campaign element in a real project (social post, slide or background).';
}

if (m15.businessExamples?.[1]) {
  m15.businessExamples[1].title = 'Mini campaign path';
  m15.businessExamples[1].description = 'Hero image → video → audio → edit';
}

fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');

const m13Ids = m13.slides.map((s) => s.id);
const m15Ids = m15.slides.map((s) => s.id);
const qCount = s141.testQuestions.length;

console.log('Patched modules-en-m13-m15.json');
console.log('M13 slide count:', m13Ids.length);
console.log('M13 has 13.12:', m13Ids.includes(13.12));
console.log('M13 has 13.32:', m13Ids.includes(13.32));
console.log('M13 has 13.52:', m13Ids.includes(13.52));
console.log('M14 question count:', qCount);
console.log('M15 has 154:', m15Ids.includes(154));
console.log('M15 slide ids:', m15Ids.join(', '));
