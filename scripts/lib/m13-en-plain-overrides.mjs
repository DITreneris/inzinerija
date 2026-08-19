/**
 * Durable EN overrides for Module 13 learner-plain epic (M13-PLAIN-EN).
 * Applied after mechanical walk in build-en-m13-m15.mjs.
 * Protects hand-tuned outcomes / chrome / glossary / summary from stub regen.
 */

export const slide130EnPlain = {
  whyBenefit:
    'After this module you will create images, short videos and audio with AI – from a clear brief to quality and rights checks.',
  outcomes: [
    'You will understand a 6-step media chain – from the task brief to a check before publishing',
    'You will keep the same product or style across a series and plan sound before cuts',
    'You will know what to measure and what to check before publishing (rights, AI label)',
  ],
  heroText: 'Images, video, audio.',
  heroSubText: 'For marketing and communication specialists – visual and audio content with AI.',
  firstActionCTA:
    'Choose the Short or Full path and press Continue — you will pick a tool after the style slide.',
  howToUseModule: {
    heading: 'Choose a path',
    short: {
      label: 'Short path',
      description: 'Without extra slides (MASTER templates, glossary).',
    },
    full: {
      label: 'Full path',
      description: 'All slides, including extras.',
    },
  },
};

export const slide132EnPlain = {
  title: 'Product and character – the same look',
  shortTitle: 'Same look',
  subtitle: '3–5 reference photos + a “same product” rule',
  sections: [
    {
      heading: 'In short',
      body: 'A single prompt does not lock identity. In marketing you need 3–5 reference photos (different angles) and the rule “same product / same style / same colors” – otherwise the set drifts.',
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
      body: 'Collect or generate at least 3 reference photos for your product or character. In the Consistency lab, tick refs and diagnose drift.',
      blockVariant: 'brand',
    },
    {
      heading: 'Check',
      body: 'Do you have at least 3 angles as refs? If the set still drifts – use Consistency lab: Symptom | Fix and copy the rule. Avoid real people’s faces without consent.',
      blockVariant: 'accent',
    },
  ],
  footer: 'Next – slide 9: Consistency lab',
};

export const slide152EnPlain = {
  title: 'Edit after generation',
  shortTitle: 'Edit',
  subtitle: 'AI = raw material; cut, color, mix',
  sections: [
    {
      heading: 'In short',
      body: 'AI video is raw material, not the final deliverable. Professional practice: edit 3–5 s clips, color grade, text/overlay, mix audio, export for the platform (CapCut / Premiere).',
      blockVariant: 'accent',
    },
    {
      heading: 'Edit diagram',
      body: 'Four steps – Cut → Grade → Mix → Export. Tap a stage.',
      blockVariant: 'brand',
      image: 'm13_postprod_steps',
      imageAlt: 'Edit: cut, color, mix, export',
    },
    {
      heading: 'Minimum checklist',
      body: '(1) Gather 2–4 clips to the script / VO. (2) Cut weak frames; hook in the first 1–2 s. (3) Keep colors consistent. (4) VO or bed + SFX. (5) Loudness guide ~−14 LUFS (music) / ~−16 (VO mix) – trust your ears. (6) Export 9:16 or 16:9.',
      blockVariant: 'brand',
    },
    {
      heading: 'Do this now',
      body: 'Write a 4-line edit plan for your mini clip.',
      blockVariant: 'brand',
    },
    {
      heading: 'Copyable template',
      body: 'Edit plan for 15–30 s.',
      copyable: `Edit plan (15–30 s):
0–3 s: [hook clip]
3–8 s: [product / benefit]
8–15 s: [proof / detail]
End: [CTA frame + text]
Audio: [VO / bed] | rights: [licensed]`,
    },
    {
      heading: 'Check',
      body: 'Without AI “magic”, does the clip still read as a story? Does the bed drown the VO?',
      blockVariant: 'accent',
    },
  ],
};

export const slide156EnPlain = {
  title: 'Audio',
  subtitle: 'Voice, effects, music – sound first',
  contentSubtitle:
    'Next: sound first (voice or bed), then cuts; voice / effects / music and licenses for commercial work.',
  nextSteps: [
    'Sound first – voice or bed length, then cuts',
    'Voice, effects and music – three layers',
    'Licenses for commercial work',
    'Loudness guide and a listen-through check',
  ],
  recap: {
    heading: 'What you already know',
    lead: 'The video section comes before audio.',
    items: [
      'Video = short clips + format + cost per usable clip.',
      'Image-to-video chain with a keyframe.',
      'Edit – cut / color / audio after generation.',
    ],
  },
};

export const slide115EnPlain = {
  subtitle: 'Prompts, style, ratios and tools',
  nextSteps: [
    'Image prompt formula: subject + context + style',
    'Style, ratios and when to pick which tool',
    'Same product in a series – 3–5 reference photos (reference lock)',
    'Interactive image builder for practice',
  ],
  contentSubtitle:
    'Next: prompt formula, style and ratios, then 6 starter cards — which tool to pick. After that, the same product in a series and the builder.',
  recap: {
    heading: 'What you already know',
    lead: 'Before the image section – the media chain.',
    items: [
      'Media chain: brief → frames → reference photos → video → audio → check.',
      'You lock frames before expensive video generation.',
      'The chain checklist is a plan for your topic, not a generator prompt.',
    ],
  },
};

export const slide112EnPlain = {
  shortTitle: 'Media chain',
  subtitle: 'From the brief to a check – 6 steps without expensive guesswork',
  sections: [
    {
      heading: 'In short',
      body: 'You win with a clear work chain (from brief to check), not the “best model”. One prompt straight into video often means expensive retries – lock the plan, frames and reference photos first, then short clips, audio and a check.',
      blockVariant: 'accent',
    },
    {
      heading: 'Chain diagram',
      body: '6 steps – tap a stage. For the business cycle (brief → A/B) see the slide “Workflow: from brief to publication”.',
      blockVariant: 'brand',
      image: 'm13_media_pipeline',
      imageAlt: 'Generative media chain: brief, frames, refs, I2V, audio, check',
    },
    {
      heading: 'Why these 6 steps',
      body: 'The six diagram steps are the technical spine. The checklist below is practice for your topic (not a second step list).',
      blockVariant: 'brand',
    },
    {
      heading: 'Do this now',
      body: 'Fill the checklist for your topic – this is a plan, not a generator prompt.',
      blockVariant: 'brand',
    },
    {
      heading: 'Copyable template',
      body: 'Chain checklist – copy and fill it in.',
      copyable: `Chain checklist:
Brief: goal [awareness / engagement / conversion], audience [who], platform [where].
Brand: colors [X], tone [Y].
Frames: main + [0–2] extras (lock before video).
Refs: [product/character – 3–5 angles] / none.
Clips: [2–4] × 3–5 s (I2V – image-to-video), not one long clip.
Audio: [voice first / bed only] + rights [licensed / demo].
Edit: cut + color + mix.
Check: brand | message | format | rights | AI label (C2PA / disclosure).`,
    },
    {
      heading: 'Check',
      body: 'Before video, do you have at least one locked frame? Do you know whether sound will be voice-first or bed only?',
      blockVariant: 'accent',
    },
    {
      heading: 'Where to use this',
      body: 'Ad clips, short social video, product demos, internal explainers.',
      blockVariant: 'terms',
      collapsible: true,
      collapsedByDefault: true,
    },
  ],
};

export const slide12BasicsEnPlain = {
  sections: [
    {
      heading: 'In short',
      body: 'A good image prompt covers what is shown (subject, place, action), style (photoreal, illustration), ratio (e.g., 16:9, 1:1) and what to avoid.',
      blockVariant: 'accent',
    },
    {
      heading: 'Formula and three layers',
      body: 'Image = Object + Context + Aesthetics (style). Layers: object (what is shown), context (place, action), aesthetics (style, light).',
      blockVariant: 'brand',
      image: 'm13_prompt_stack',
      imageAlt: 'Image prompt: object, context, aesthetics',
    },
    {
      heading: 'Minimum requirements',
      body: 'At least 3–7 words; avoid vague words (“nice”, “interesting” with no context); use concrete nouns. A style keyword crowns the idea.',
      blockVariant: 'brand',
    },
    {
      heading: 'Do this now',
      body: 'Copy the prompt below. You will open a tool on the next slide (6 starter cards) — this slide is only the formula.',
      blockVariant: 'brand',
    },
    {
      heading: 'Copyable prompt',
      body: 'Image prompt template – copy and fill the layers.',
      copyable:
        'Object: [what is shown].\nContext: [place, action].\nAesthetics: [style, light].\nRatio: 16:9.\nNo text in the image.',
    },
    {
      heading: 'Check',
      body: 'Did the image match the description? If not – add place, lighting or style, or say “no text in the image”.',
      blockVariant: 'accent',
    },
    {
      heading: 'Why this works',
      body: 'Start with “create an image” (or “generate an image”) plus a concrete ask – the tool then knows the task.',
      blockVariant: 'terms',
      collapsible: true,
      collapsedByDefault: true,
    },
  ],
};

export const slide136EnPlain = {
  subtitle: 'Script, format and tools',
  nextSteps: [
    'Short script – 3–5 s clips, not one long try',
    'Image-to-video (I2V) clip builder for practice',
    'Video tools, format and cost per usable clip (CPI)',
    'Edit after generation',
  ],
  contentSubtitle:
    'Next: short script, image-to-video (I2V), format and cost per usable clip. Pick tools on the video tools slide.',
  recap: {
    heading: 'What you already know',
    lead: 'The image section is the base for video.',
    items: [
      'An image prompt = object + context + style.',
      'Style, ratios and the same product in a series.',
      'Reference photos – the same product and style in the series.',
    ],
  },
};

export const slide147EnPlain = {
  subtitle: 'Image-to-video (I2V): keyframe → 3–5 s → camera → same style',
};

function applyIndexedSectionPack(slide, pack) {
  if (!slide?.content?.sections || !pack?.length) return;
  slide.content.sections.forEach((sec, i) => {
    const p = pack[i];
    if (!p) return;
    if (p.heading) sec.heading = p.heading;
    if (p.body) sec.body = p.body;
    if (p.imageAlt) sec.imageAlt = p.imageAlt;
  });
}

export const slide133EnPlain = {
  sections: [
    {
      heading: 'In short',
      body: 'Composition and framing: where to place the subject, which shot size and camera angle to name in the prompt. The grid is a guide; details are below.',
    },
    {
      heading: 'Rule-of-thirds grid (guide)',
      body: 'Imagine a 3×3 grid – put the focus near the intersections, not in the center.',
      imageAlt: 'Rule of thirds: 3×3 grid with the subject on an intersection, not in the center',
    },
    {
      heading: 'Rule of thirds and planes',
      body: 'Imagine a 3×3 grid; the main subject sits on the intersection points (not the center). Foreground – the sharper subject; background – depth and mood. In the prompt say “in the foreground…” and “in the background…”.',
    },
    {
      heading: 'Camera angle and shot types',
      body: 'Eye level – neutral; high angle – weaker; low angle – more power; bird’s-eye – structural view. Shot types: extreme long (ELS), medium (MLS), close-up (CU), extreme close-up (ECU). The shot controls emotion.',
    },
    {
      heading: 'Do this now',
      body: 'Copy the template below and fill it – composition + framing.',
    },
    {
      heading: 'Copyable template (composition + frame)',
      body: 'Below – a template with composition and camera angle.',
    },
    {
      heading: 'Narrative image',
      body: 'An image can tell a story – “what happened here?” Examples: myth + modern setting; fantasy + reality; emotion through metaphor. Below – a copyable narrative template.',
    },
    {
      heading: 'Camera in the prompt',
      body: 'For a more cinematic result, add 1–2 camera details: 85mm lens (portrait frame), f/1.8 (soft background), soft studio light, cinematic rim light, wide establishing shot. Skip empty quality words like “8K masterpiece” – describe real light, the shot and the mood.',
    },
    {
      heading: 'Check',
      body: 'Does the prompt include at least composition (thirds / space for text) and one camera angle? If not – copy the template again.',
    },
  ],
};

export const slide134EnPlain = {
  sections: [
    {
      heading: 'In short',
      body: 'This slide helps you quickly see which prompt field to fix: style, ratios, composition or the brand rule.',
    },
    {
      heading: 'Do this now',
      body: 'Do the 5-situation exercise below (2–3 min). For each situation pick which prompt field to fix.',
    },
    {
      heading: 'Check',
      body: 'After 5 situations, can you quickly tell style, ratios, composition and brand consistency apart? If not – repeat 1–2 you missed.',
    },
  ],
};

export const slide135EnPlain = {
  sections: [
    {
      heading: 'In short',
      body: 'An image goes through five stations: idea, prompt, try, generate, fix. Mark where you are now – then fill only that step.',
    },
    {
      heading: 'Workflow diagram',
      body: 'Five stations on the desk. Tap a station – explanation below.',
    },
    {
      heading: 'Do this now',
      body: 'Mark on the diagram where you are and fill one step.',
    },
    {
      heading: 'Copyable step',
      body: 'One step – not the whole workflow at once.',
    },
    {
      heading: '#1000Books – one example',
      body: 'Book illustration: title + summary → 5 concepts → pick one → then a prompt into an image tool. This is one ready example, not a second workflow.',
    },
    {
      heading: 'Check',
      body: 'Did you mark where you are and fill only one step? If not – go back to the diagram.',
    },
  ],
};

export const slide15VideoEnPlain = {
  sections: [
    {
      heading: 'In short',
      body: 'Video: format (16:9 / 9:16), duration 3–5 s. Cost per usable clip (CPI) = generation + retries / usable clips – not only price per second.',
    },
    {
      heading: 'Do this now',
      body: 'Pick one tool and generate one 3–5 s clip from a frame. Write down how many tries it took.',
    },
    {
      heading: 'Copyable prompt',
      body: 'Short clip + a CPI note.',
    },
    {
      heading: 'Check',
      body: 'Is the file downloaded? Do commercial rights fit? What is the CPI (count the retries)?',
    },
    {
      heading: 'Audio: same generate or separately?',
      body: 'Dialogue or ambience in one generate – write the sound in the same prompt. Brand voice / license – silent clip + voice separately + mix (safer for a client). Never stack two soundtracks on the same clip if you do not know which you will drop.',
    },
    {
      heading: 'More video tools',
      body: 'Runway, Pika, Luma Dream Machine, Synthesia, InVideo, CapCut. Full list – in the Tools section.',
    },
  ],
};

export const slide16AudioEnPlain = {
  sections: [
    {
      heading: 'In short',
      body: 'Sound first: plan voice or bed length first, then cut video to that rhythm. For music describe mood, style, tempo and instruments. Client / ads – a licensed library; Suno/Udio – demo, not for a client.',
    },
    {
      heading: 'Do this now',
      body: 'If you have a voice – generate or record the voice first. If only a bed – copy the music prompt. Mark whether the license allows commercial use.',
    },
    { heading: 'Copyable prompt – bed', body: 'Background-music template.' },
    { heading: 'Copyable prompt – voice', body: 'Voice template (ElevenLabs or similar).' },
    {
      heading: 'Copyable voice card',
      body: 'Write for the ear – the same tempo across the series.',
    },
    {
      heading: 'Check',
      body: 'Did you try 3 anchor lines before the full text? Does the bed come after the voice and leave it room? Is pronunciation / tempo the same across the series?',
    },
    {
      heading: 'English MASTER template (universal)',
      body: 'Many music tools parse English fields better. Add license intent.',
    },
    {
      heading: 'Top audio tools',
      body: 'ElevenLabs – voice-over and sound effects. ElevenMusic – licensed music, client work. Soundraw / Beatoven – royalty-friendly beds. Suno / Udio – fast demos, not for clients. Full list – in the Tools section.',
    },
  ],
};

export const slide17RightsEnPlain = {
  sections: [
    {
      heading: 'In short',
      body: 'Separate effects from music. For commercial work – licensed tools. Loudness guide: about −14 LUFS (music) / −16 (voice mix) – decide by listening. Campaign rights / C2PA – on the Business and risks slide.',
    },
    {
      heading: 'Rights checklist (5 points)',
      body: '(1) Usage rules / license. (2) Does the plan allow commercial use? (3) YouTube / ads / podcast? (4) Credit the author? (5) Write: “License allows / does not allow – [tool, date].”',
    },
    {
      heading: 'Do this now',
      body: 'Before public use, open the usage rules; write “commercial OK?” yes/no.',
    },
    { heading: 'Copyable prompt', body: 'Effects template.' },
    {
      heading: 'Check',
      body: 'Download OK? License OK for ads / YouTube?',
    },
    {
      heading: 'Tools',
      body: 'ElevenLabs (voice / effects), ElevenMusic, Soundraw, Beatoven, Suno, Udio, Boomy. Full list – in the Tools section.',
    },
  ],
};

export const slide1101SectionsEnPlain = {
  sections: [
    {
      heading: 'In short',
      body: 'Before you publish you will know what to check: results, rights, an AI label and at least one A/B hypothesis.',
    },
    {
      heading: 'Do this now',
      body: 'Pick one: write an A/B hypothesis or score your image on 3 criteria (brand, message, platform).',
    },
    {
      heading: 'Rights and risks',
      body: '(1) Commercial license – does the plan allow ads. (2) Face and voice – only with consent. (3) Brands – do not copy others’ logos. (4) Personal data – do not upload client faces without a reason. (5) AI label – visible to a person.',
    },
    {
      heading: 'A/B hypothesis',
      body: 'Template for a test hypothesis – copy and fill.',
    },
    {
      heading: 'Evaluation template',
      body: 'If you choose evaluation – copy and score your artifact.',
    },
    {
      heading: 'Art. 50 and Soft Binding',
      body: 'EU AI Act Art. 50 – a human-visible AI label. C2PA / SynthID often get stripped on social networks – Soft Binding (watermark) helps, but it does not replace the human-visible note.',
    },
    {
      heading: 'What to measure',
      body: 'One business sentence: did the image stop the scroll, and did more people click where you expected?',
    },
    {
      heading: 'Check',
      body: 'Before publishing, did you check rights, an AI label and at least one A/B hypothesis or evaluation?',
    },
  ],
};

export const slide111RestEnPlain = {
  sections: [
    null,
    null,
    {
      heading: 'Do this now',
      body: 'Copy the template below and fill it – from the brief to an image prompt.',
    },
    {
      heading: 'Brief into a prompt',
      body: 'Below – a template for turning a brief into an image prompt.',
    },
    {
      heading: 'Check',
      body: 'Does the brief have a clear goal and audience? Does the prompt match the brand (colors, tone)? Did you generate 3–5 variants for a test?',
    },
    {
      heading: 'Platform, funnel and copy together',
      body: 'Also check which path stage you are on: awareness (top of funnel), consideration (middle) or action (bottom). An awareness visual can be more emotional; a conversion visual must be clearer. The visual must fit the headline, hook and CTA.',
    },
  ],
};

export const slide18TermsEn = [
  {
    term: 'Awareness',
    definition:
      'Campaign goal – the image draws attention with emotion and contrast; typical formats: cover, banner, social post.',
  },
  {
    term: 'Engagement',
    definition:
      'Campaign goal – the image makes people stop and interact with a clear context; typical formats: carousel, video intro, illustration.',
  },
  {
    term: 'Conversion',
    definition:
      'Campaign goal – the image drives an action: product, offer, call to action (CTA); typical formats: ad layout, landing-page hero, “buy now” block.',
  },
  {
    term: 'Image prompt',
    definition: 'A text description that an AI uses to create an image (subject, style, ratios).',
  },
  {
    term: 'KPI (key metrics)',
    definition:
      'Key performance metrics – what you measure (e.g., CTR, CVR, CPM) when you evaluate campaign results.',
  },
  {
    term: 'Aspect ratio',
    definition:
      'Width-to-height ratio of an image or clip (e.g., 16:9 wide, 1:1 square, 9:16 vertical).',
  },
  {
    term: 'Image script',
    definition: 'A short text that describes what happens in the image or clip (frames, action).',
  },
  {
    term: 'BPM',
    definition: 'Beats per minute – a music-tempo measure (slow ~60–80, fast ~120–140).',
  },
  {
    term: 'Mood',
    definition: 'The feeling an image or track gives (calm, energetic, tense).',
  },
  {
    term: 'Style',
    definition: 'A look or sound type (photorealistic, acrylic, pop, acoustic).',
  },
  {
    term: 'Usage rights / license',
    definition: 'Whether generated content can be used commercially (ads, product).',
  },
  {
    term: 'Background music',
    definition: 'Music under presentations or clips, often without vocals.',
  },
  {
    term: 'Rule of thirds',
    definition:
      'Composition principle: the main subject sits on the 3×3-grid intersections (not the center).',
  },
  {
    term: 'Camera angle',
    definition:
      'Where the camera “looks from”: eye level (neutral), high (weaker), low (more power).',
  },
  {
    term: 'Narrative image',
    definition: 'An image that tells a story or concept (e.g., myth + modernity).',
  },
  {
    term: 'CTR (click-through rate)',
    definition:
      'What share of people who saw the ad or image clicked it. A key metric when you compare creatives.',
  },
  {
    term: 'CVR (conversion rate)',
    definition:
      'What share of visitors did the desired action (purchase, sign-up). Different from CTR – you measure the next step.',
  },
  {
    term: 'CPM (cost per 1,000 impressions)',
    definition: 'What 1,000 ad or image impressions cost. Useful when you compare platforms.',
  },
  {
    term: 'CPI (cost per usable clip)',
    definition:
      'What one usable clip costs when you include generation and retries – not only price per second.',
  },
  {
    term: 'C2PA / AI label (Content Credentials)',
    definition:
      'A mark or proof that content was made or edited with AI – check provenance and, where needed, a human-visible AI label before publishing.',
  },
  {
    term: 'I2V (image-to-video)',
    definition:
      'Image-to-video: from one or more locked frames you generate a 3–5 s clip, not one long one-shot video.',
  },
  {
    term: 'Sound first (audio-first)',
    definition:
      'Plan voice (VO) or bed length first, then cut video to that pacing – not the other way around.',
  },
  {
    term: 'Reference lock',
    definition:
      '3–5 reference photos from different angles plus a “same product / same style” rule so the series does not drift.',
  },
];

export const slide111EnPlain = {
  title: 'Workflow: from brief to publication',
  shortTitle: 'Workflow: brief–publish',
  subtitle: 'Brief → prompt → variants → iteration → testing',
};

export const slide1101EnPlain = {
  trumpai:
    'Before you publish you will know what to check: results, rights, an AI label and at least one A/B hypothesis.',
};

export const slide18ExtraTermsEn = [
  {
    term: 'CPI (cost per usable clip)',
    definition:
      'What one usable clip costs when you include generation and retries – not only price per second.',
  },
  {
    term: 'C2PA / AI label (Content Credentials)',
    definition:
      'A mark or proof that content was made or edited with AI – check provenance and, where needed, a human-visible AI label before publishing.',
  },
  {
    term: 'I2V (image-to-video)',
    definition:
      'Image-to-video: from one or more locked frames you generate a 3–5 s clip, not one long one-shot video.',
  },
  {
    term: 'Audio-first (sound first)',
    definition:
      'Plan voice (VO) or bed length first, then cut video to that pacing – not the other way around.',
  },
  {
    term: 'Reference lock',
    definition:
      '3–5 reference photos from different angles plus a “same product / same style” rule so the series does not drift.',
  },
];

export const slide19EnPlain = {
  subtitle: 'What you learned – chain, same look, video, audio, rights',
  introHeading: 'What you learned',
  introBody:
    'Well done! You now know the 2026 content path: the media chain, the same product look in a series, short image-to-video clips, sound first, and a check before publishing (rights, AI label).',
  abilityAfter:
    'You can lay out the chain from brief to check, keep the same look in a series, and verify rights and an AI label before publishing.',
  abilityBefore:
    'You generated images or video without a clear chain, without reference photos, and without rights / AI-label checks.',
  tagline: 'Chain + same look + sound first + rights = one content path.',
  stats: [
    { label: 'Blocks', value: '5' },
    { label: 'Templates and builders', value: '5+' },
    { label: 'Tools', value: '6+' },
  ],
  sections: [
    {
      heading: 'Media chain',
      icon: 'Image',
      color: 'brand',
      items: [
        '6 steps: brief → frames → refs → video → audio → check',
        'Plan and frames first, then expensive generation',
      ],
    },
    {
      heading: 'Same look in a series',
      icon: 'Image',
      color: 'brand',
      items: [
        '3–5 reference photos from different angles',
        '“Same product / style” rule + Consistency lab',
      ],
    },
    {
      heading: 'Short video (I2V)',
      icon: 'Video',
      color: 'violet',
      items: [
        '3–5 s clips from a locked frame, not one long try',
        'Format, tools and cost per usable clip (CPI)',
      ],
    },
    {
      heading: 'Sound first',
      icon: 'Music',
      color: 'amber',
      items: ['Voice or bed first – then cuts', 'Licenses for commercial work'],
    },
    {
      heading: 'Business and rights',
      icon: 'Image',
      color: 'brand',
      items: [
        'KPI, A/B, rights and AI label (C2PA) before publishing',
        'Workflow from brief to check',
      ],
    },
  ],
  firstAction24h:
    'Today: (1) write the 6-step chain for your topic or (2) collect 3 reference photos for a product – then generate one image with that rule.',
  reflectionPrompt: `META: You are a learning reflection assistant. Goal – lock in Module 13.
INPUT: I just finished content engineering – media chain, same product in a series, image-to-video, sound first, rights and AI label.
OUTPUT: Ask 3 questions: (1) Which chain step and which product will I do today? (2) Where am I most likely to lose the same look in a series, or the rights? (3) What will I do before an expensive video (references, lock, or rights)? After my answers, give one concrete tip (15 minutes or less, named tool or file).`,
};

/** Fragile fields wiped by mechanical walk – restore after every rebuild. */
function applyM1315RebuildGuards(mod) {
  if (mod.id === 13) {
    const s31 = mod.slides.find((s) => s.id === 13.31);
    if (s31) {
      s31.shortTitle = 'Quick check: style';
      if (s31.content) s31.content.footer = 'Next – slide 8: Same look';
    }
    const s51 = mod.slides.find((s) => s.id === 13.51);
    if (s51) s51.shortTitle = 'Quick check: video';
    const s37 = mod.slides.find((s) => s.id === 13.37);
    if (s37) {
      s37.shortTitle = 'Image builder';
      if (s37.content) {
        s37.content.tldr =
          'In short: Fill the fields – the system builds an image prompt. Copy it into an image generation tool.';
        s37.content.patikra =
          'Does the generated prompt cover at least 3 elements (subject, style, ratios) and a clear A/E/C goal? Does the meter show “Ready”? If not – go back and change the parameters.';
      }
    }
    const s47 = mod.slides.find((s) => s.id === 13.47);
    if (s47) {
      s47.title = 'I2V clip builder';
      s47.shortTitle = 'I2V builder';
      if (s47.content) {
        s47.content.tldr =
          'In short: Fill the frame, duration and motion – the system builds an image-to-video prompt. Copy it into a video tool.';
        s47.content.patikra =
          'Does the prompt include a keyframe, 3 s first, one camera and one action? Did you watch the last second – label readable, no new objects?';
      }
    }
  }
  if (mod.id === 15) {
    const s26 = mod.slides.find((s) => s.id === 150.26);
    if (s26) {
      s26.title = 'Checkpoint: project path';
      s26.shortTitle = 'Checkpoint';
      s26.subtitle = 'Have an image? Continue to video or go to the summary?';
      if (s26.content?.sections?.[3]) {
        s26.content.sections[3].heading = 'First action within 48 hours';
      }
    }
    const s158 = mod.slides.find((s) => s.id === 158);
    if (s158) {
      s158.shortTitle = 'Project summary';
      s158.subtitle = 'What next?';
    }
  }
}

/**
 * @param {{ id: number, slides: any[] }} mod
 */
export function applyM13EnPlainOverrides(mod) {
  applyM1315RebuildGuards(mod);
  applyM1315EnFiller(mod);
  if (mod.id !== 13) return;

  const s130 = mod.slides.find((s) => s.id === 130);
  if (s130?.content) {
    Object.assign(s130.content, {
      whyBenefit: slide130EnPlain.whyBenefit,
      outcomes: [...slide130EnPlain.outcomes],
      heroText: slide130EnPlain.heroText,
      heroSubText: slide130EnPlain.heroSubText,
      firstActionCTA: slide130EnPlain.firstActionCTA,
      howToUseModule: structuredClone(slide130EnPlain.howToUseModule),
    });
  }

  const s32 = mod.slides.find((s) => s.id === 13.32);
  if (s32) {
    s32.title = slide132EnPlain.title;
    s32.shortTitle = slide132EnPlain.shortTitle;
    s32.subtitle = slide132EnPlain.subtitle;
    if (s32.content) {
      s32.content.sections = slide132EnPlain.sections;
      s32.content.footer = slide132EnPlain.footer;
    }
  }

  const s52 = mod.slides.find((s) => s.id === 13.52);
  if (s52) {
    s52.title = slide152EnPlain.title;
    s52.shortTitle = slide152EnPlain.shortTitle;
    s52.subtitle = slide152EnPlain.subtitle;
    if (s52.content) s52.content.sections = structuredClone(slide152EnPlain.sections);
  }

  const s56 = mod.slides.find((s) => s.id === 13.56);
  if (s56) {
    s56.subtitle = slide156EnPlain.subtitle;
    if (s56.content) {
      s56.content.title = slide156EnPlain.title;
      s56.content.subtitle = slide156EnPlain.contentSubtitle;
      s56.content.nextSteps = [...slide156EnPlain.nextSteps];
      s56.content.recap = structuredClone(slide156EnPlain.recap);
      s56.content.celebrationText = 'Great! Sound sets the length.';
    }
  }

  const s15 = mod.slides.find((s) => s.id === 13.15);
  if (s15?.content) {
    s15.subtitle = slide115EnPlain.subtitle;
    s15.content.nextSteps = [...slide115EnPlain.nextSteps];
    s15.content.subtitle = slide115EnPlain.contentSubtitle;
    s15.content.recap = structuredClone(slide115EnPlain.recap);
    s15.content.celebrationText = 'Great! Image section – start.';
  }

  const s12 = mod.slides.find((s) => s.id === 13.12);
  if (s12) {
    s12.shortTitle = slide112EnPlain.shortTitle;
    s12.subtitle = slide112EnPlain.subtitle;
    if (s12.content) s12.content.sections = structuredClone(slide112EnPlain.sections);
  }

  const s12basics = mod.slides.find((s) => s.id === 13.2);
  if (s12basics?.content) {
    s12basics.content.sections = structuredClone(slide12BasicsEnPlain.sections);
  }

  const s36 = mod.slides.find((s) => s.id === 13.36);
  if (s36?.content) {
    s36.subtitle = slide136EnPlain.subtitle;
    s36.content.nextSteps = [...slide136EnPlain.nextSteps];
    s36.content.subtitle = slide136EnPlain.contentSubtitle;
    s36.content.recap = structuredClone(slide136EnPlain.recap);
    s36.content.celebrationText = 'Great! Video – the next layer.';
  }

  const s33 = mod.slides.find((s) => s.id === 13.33);
  if (s33) {
    delete s33.optional;
    delete s33.badgeVariant;
    applyIndexedSectionPack(s33, slide133EnPlain.sections);
  }

  const s34 = mod.slides.find((s) => s.id === 13.34);
  if (s34) applyIndexedSectionPack(s34, slide134EnPlain.sections);

  const s35wf = mod.slides.find((s) => s.id === 13.35);
  if (s35wf) applyIndexedSectionPack(s35wf, slide135EnPlain.sections);

  const s5video = mod.slides.find((s) => s.id === 13.5);
  if (s5video) applyIndexedSectionPack(s5video, slide15VideoEnPlain.sections);

  const s6audio = mod.slides.find((s) => s.id === 13.6);
  if (s6audio) applyIndexedSectionPack(s6audio, slide16AudioEnPlain.sections);

  const s7rights = mod.slides.find((s) => s.id === 13.7);
  if (s7rights) applyIndexedSectionPack(s7rights, slide17RightsEnPlain.sections);
  for (const skipId of [13.35, 13.351, 13.8]) {
    const skipSlide = mod.slides.find((s) => s.id === skipId);
    if (skipSlide) delete skipSlide.badgeVariant;
  }

  const s47 = mod.slides.find((s) => s.id === 13.47);
  if (s47) {
    s47.title = 'I2V clip builder';
    s47.subtitle = slide147EnPlain.subtitle;
  }

  const s11 = mod.slides.find((s) => s.id === 13.11);
  if (s11) {
    s11.title = slide111EnPlain.title;
    s11.shortTitle = slide111EnPlain.shortTitle;
    s11.subtitle = slide111EnPlain.subtitle;
    if (s11.content?.sections) {
      for (const sec of s11.content.sections) {
        if (sec.image === 'turinio_workflow') {
          sec.heading = 'Workflow diagram';
          sec.body = '7 steps from brief to optimization. Tap a step – explanation below.';
        }
        if (sec.heading === 'In short' || sec.heading === 'Trumpai') {
          sec.heading = 'In short';
          sec.body =
            'Full business cycle: (1) Marketing brief. (2) Prompt + brand + reference photos. (3) 3–5 variants / short image-to-video. (4) Iteration. (5) Platform. (6) Test. (7) Optimization.';
        }
      }
      // Ensure In short comes before workflow diagram
      const di = s11.content.sections.findIndex((s) => s.image === 'turinio_workflow');
      const ti = s11.content.sections.findIndex((s) => s.heading === 'In short');
      if (di >= 0 && ti >= 0 && di < ti) {
        const [diagram] = s11.content.sections.splice(di, 1);
        const newTi = s11.content.sections.findIndex((s) => s.heading === 'In short');
        s11.content.sections.splice(newTi + 1, 0, diagram);
      }
      applyIndexedSectionPack(s11, slide111RestEnPlain.sections);
    }
  }

  const s101 = mod.slides.find((s) => s.id === 13.101);
  if (s101?.content?.sections) {
    for (const sec of s101.content.sections) {
      if (typeof sec.heading === 'string') {
        sec.heading = sec.heading.replace(/\s*\((required|privaloma)\)\s*$/i, '');
      }
    }
    applyIndexedSectionPack(s101, slide1101SectionsEnPlain.sections);
  }

  const s8 = mod.slides.find((s) => s.id === 13.8);
  if (s8?.content) {
    s8.content.terms = slide18TermsEn.map((t) => ({ ...t }));
  }

  const s9 = mod.slides.find((s) => s.id === 13.9);
  if (s9?.content) {
    s9.subtitle = slide19EnPlain.subtitle;
    Object.assign(s9.content, {
      introHeading: slide19EnPlain.introHeading,
      introBody: slide19EnPlain.introBody,
      abilityAfter: slide19EnPlain.abilityAfter,
      abilityBefore: slide19EnPlain.abilityBefore,
      tagline: slide19EnPlain.tagline,
      stats: slide19EnPlain.stats,
      sections: slide19EnPlain.sections,
      firstAction24h: slide19EnPlain.firstAction24h,
      reflectionPrompt: slide19EnPlain.reflectionPrompt,
    });
  }

  const s325 = mod.slides.find((s) => s.id === 13.325);
  if (s325?.content?.sections) {
    const intro = s325.content.sections.find((s) => s.heading === 'In short' || s.heading === 'Trumpai');
    if (intro) {
      intro.heading = 'In short';
      intro.body =
        'After the sample-photo lock diagram – practice: tick the samples you have for the Oak Mug series, recognize drift (proportions, color, label, style) or a new brief. One choice → one copyable rule.';
    }
    const check = s325.content.sections.find((s) => s.heading === 'Check' || s.heading === 'Patikra');
    if (check) {
      check.heading = 'Check';
      check.body =
        'Did you tick sample photos, pick a mode and copy the rule? If samples are missing – go back to “Product and character – the same look” and collect 3–5 angles.';
    }
  }

  const s33tools = mod.slides.find((s) => s.id === 13.3);
  if (s33tools?.content) {
    s33tools.content.toolsCollapsible = false;
    s33tools.content.toolsPlacement = 'beforePatikra';
    s33tools.content.toolsIntro =
      'Where to start (6) – the principle is the same across generators; strengths differ. One tool is enough to start.';
    const check33 = s33tools.content.sections?.find(
      (s) => s.heading === 'Check' || s.heading === 'Patikra'
    );
    if (check33) {
      check33.body =
        'Is the style header still verbatim (15+ words)? Same model for the whole series? Did you pick one starter tool?';
    }
    const flux = s33tools.content.tools?.find((t) => t.name === 'FLUX');
    if (flux) {
      flux.useCases = ['Photorealism', 'Product series', 'Sample-photo lock'];
    }
  }

  // Soft gloss B3 EN for Trumpai on key slides (body often genericBySlide – override In short)
  const trumpaiEn = {
    13.12:
      'You win with a clear work chain (from brief to check), not the “best model”. One prompt straight into video often means expensive retries – lock the plan, frames and reference photos first, then short clips, audio and a check.',
    13.3:
      'Style: photorealistic, acrylic, 3D, drawing. Aspect ratio (frame width×height): 1:1 square, 16:9 wide, 9:16 vertical (stories).',
    13.4:
      'A short video needs a clear script, tone and camera. Prefer 2–4 short clips (3–5 s) over one long try – lock frames before expensive video.',
    13.5:
      'Video: format (16:9 / 9:16), length 3–5 s. Cost per usable clip (CPI) = generation + retries / usable clips – not only price per second.',
    13.6:
      'Sound first: plan voice or bed length first, then cut video to that pacing. For music describe mood, style, tempo, instruments. Client / ads – licensed stack; Suno/Udio – demo, not client work.',
    13.35:
      'An image goes through five stations: idea, prompt, try, generate, fix. Mark where you are now – then fill only that step.',
    13.351:
      'If one solution is enough – copy the MASTER template or one Ready prompt. Ready prompts work only with a style lock (15+ words / same product / one model). Eight scenarios are for deeper practice (expand).',
  };
  for (const [idStr, body] of Object.entries(trumpaiEn)) {
    const s = mod.slides.find((x) => x.id === Number(idStr));
    const sec = s?.content?.sections?.find((x) => x.heading === 'In short' || x.heading === 'Trumpai');
    if (sec) {
      sec.heading = 'In short';
      sec.body = body;
    }
  }

  const s35 = mod.slides.find((s) => s.id === 13.35);
  if (s35) {
    s35.subtitle = 'Five stations – mark where you are';
    const patikra35 = s35.content?.sections?.find(
      (sec) => sec.heading === 'Check' || sec.heading === 'Patikra'
    );
    if (patikra35) {
      patikra35.heading = 'Check';
      patikra35.body =
        'Did you mark where you are and fill only one step? If not – go back to the diagram.';
    }
    const schema35 = s35.content?.sections?.find(
      (sec) => sec.image === 'm13_still_workflow'
    );
    if (schema35) {
      schema35.heading = 'Workflow diagram';
      schema35.body = 'Five stations on the desk. Tap a station – explanation below.';
      schema35.imageAlt = 'Still-image workflow: five desk stations';
    }
  }

  const s351 = mod.slides.find((s) => s.id === 13.351);
  if (s351) {
    s351.subtitle = 'One MASTER + one Ready prompt';
    const patikra351 = s351.content?.sections?.find(
      (sec) => sec.heading === 'Check' || sec.heading === 'Patikra'
    );
    if (patikra351) {
      patikra351.heading = 'Check';
      patikra351.body =
        'Did you use at least 3 fields from the MASTER template (subject, style, composition)? Did you run a Ready prompt with the same lock, not an empty style?';
    }
    for (const sec of s351.content?.sections ?? []) {
      if (/^Ready prompt/i.test(sec.heading || '') || /^Ready promptas/i.test(sec.heading || '')) {
        sec.heading = 'Ready prompt: Logo';
        sec.body =
          'Copy and fill the brackets. Before you run it, paste the style lock and the model name.';
      }
      if (
        /scenarijai|scenarios/i.test(sec.heading || '') ||
        /Aštuoni verslo|Eight business/i.test(sec.heading || '')
      ) {
        sec.heading = 'Eight business scenarios';
        sec.body =
          'Product mock: photoreal [product] in [studio/kitchen], materials [x], softbox, 3 angles. Social post: from this text [paste], LinkedIn/Facebook, look [corporate], colors [x], 1:1 or 4:5. Poster: event [name], date/place [x], style [x]. Campaign: 5 visual directions for [product], theme [x], audience [x]. Newsletter hero: leave 30% for a headline. Brochure cover: room for a logo. Blog cover: topic [x], no text, space for a headline.';
      }
    }
  }

  const s4 = mod.slides.find((s) => s.id === 13.4);
  if (s4?.content?.sections) {
    const d4 = s4.content.sections.find(
      (sec) => sec.heading === 'Do this now' || sec.heading === 'Daryk dabar'
    );
    if (d4) {
      d4.heading = 'Do this now';
      d4.body =
        'Write 2–3 sentences for one 3–5 s shot. Practice the cycle (one variable, last frame) in the I2V builder.';
    }
    const p4 = s4.content.sections.find(
      (sec) => sec.heading === 'Check' || sec.heading === 'Patikra'
    );
    if (p4) {
      p4.heading = 'Check';
      p4.body =
        'Did you write one scene, a duration and a camera? Continue the cycle (change one thing, watch the last frame) in the I2V builder.';
    }
  }

  if (s101?.content?.sections) {
    const d101 = s101.content.sections.find(
      (sec) => sec.heading === 'Do this now' || sec.heading === 'Daryk dabar'
    );
    if (d101) {
      d101.heading = 'Do this now';
      d101.body =
        'Pick one: write an A/B hypothesis or score your image on 3 criteria (brand, message, platform).';
    }
    const rights = s101.content.sections.find(
      (sec) =>
        sec.heading === 'Rights and risks' || sec.heading === 'Teisės ir rizikos'
    );
    if (rights) {
      rights.heading = 'Rights and risks';
      rights.body =
        '(1) Commercial license – does the plan allow ads.\n(2) Face and voice – only with consent.\n(3) Brands – do not copy someone else’s logo.\n(4) Personal data – do not upload client faces without a reason.\n(5) AI label – a human-visible note or the tool’s mark.';
    }
  }

  const s5 = mod.slides.find((s) => s.id === 13.5);
  if (s5?.content?.sections) {
    s5.subtitle = 'Format and cost per usable clip';
    const patikra = s5.content.sections.find(
      (sec) => sec.heading === 'Check' || sec.heading === 'Patikra'
    );
    if (patikra) {
      patikra.heading = 'Check';
      patikra.body =
        'Did you download the file? Do commercial rights fit? What is the CPI (count retries)?';
    }
    const daryk5 = s5.content.sections.find(
      (sec) => sec.heading === 'Do this now' || sec.heading === 'Daryk dabar'
    );
    if (daryk5?.toolChoiceBar?.choices) {
      daryk5.toolChoiceBar.question = 'Pick a video tool';
      const enHints = [
        {
          label: 'Kling',
          description: 'I2V, price / quality',
          whenHint:
            'Fits: image-to-video when you need balance. Does not fit: if you need built-in sound in the same generate.',
        },
        {
          label: 'Veo',
          description: 'Quality + sound',
          whenHint:
            'Fits: dialog or ambient in one generate. Does not fit: if you will add a brand voice separately.',
        },
        {
          label: 'Seedance',
          description: 'Controlled motion',
          whenHint:
            'Fits: many reference photos and motion control. Does not fit: if one frame is enough.',
        },
        {
          label: 'Sora',
          description: 'OpenAI ecosystem',
          whenHint:
            'Fits: 1–2 reference photos in the same setting. Does not fit: if you already have another I2V chain.',
        },
      ];
      daryk5.toolChoiceBar.choices = daryk5.toolChoiceBar.choices.map((c, i) => ({
        ...c,
        ...enHints[i],
      }));
    }
    const forkHeading = 'Sound: same generate or separate?';
    const existingFork = s5.content.sections.find(
      (sec) =>
        sec.heading === forkHeading ||
        sec.heading === 'Garsas: tame pačiame generate ar atskirai?'
    );
    if (existingFork) {
      existingFork.heading = forkHeading;
      existingFork.body =
        'Dialog or ambient in one generate – write sound in the same prompt. Brand voice / license – silent clip + voice separately + mix (safer for a client). Never stack two soundtracks on the same clip if you do not know which you will drop.';
    }
  }

  const s6 = mod.slides.find((s) => s.id === 13.6);
  if (s6?.content?.sections) {
    for (const sec of s6.content.sections) {
      if (sec.heading === 'Do this now' || sec.heading === 'Daryk dabar') {
        sec.heading = 'Do this now';
        sec.body =
          'If you have voice-over – generate or record the voice first. If bed only – copy the music prompt. Mark whether the license allows commercial use.';
      }
      if (sec.heading === 'Kopijuojamas promptas – fonas' || sec.heading === 'Copyable prompt – bed') {
        sec.heading = 'Copyable prompt – bed';
      }
      if (sec.heading === 'Kopijuojamas promptas – balsas' || sec.heading === 'Copyable prompt – voice-over') {
        sec.heading = 'Copyable prompt – voice-over';
        sec.body = 'Voice-over template (ElevenLabs or similar).';
      }
      if (sec.heading === 'Kopijuojama balso kortelė' || sec.heading === 'Copyable voice card') {
        sec.heading = 'Copyable voice card';
        sec.body = 'Write for the ear – keep the same tempo across the series.';
        sec.copyable = `Role: [who they speak to]. Tone: [warm / calm]. Keep the same tempo.
Glossary: [brand] = [how to say it].
First try 3 lines: hook / benefit / ask. Then the full script.
Bed: no vocal, quiet, leave room for the voice. License: commercial.`;
      }
      if (sec.heading === 'Check' || sec.heading === 'Patikra') {
        sec.heading = 'Check';
        sec.body =
          'Did you try 3 anchor lines before the full script? Does the bed come after the voice and leave room? Same tempo / pronunciation across the series?';
      }
    }
  }

  const s7 = mod.slides.find((s) => s.id === 13.7);
  if (s7) {
    s7.subtitle = 'Sound effects, commercial use, LUFS';
    if (s7.content?.sections) {
      const t = s7.content.sections.find((x) => x.heading === 'In short' || x.heading === 'Trumpai');
      if (t) {
        t.heading = 'In short';
        t.body =
          'Separate effects from music. For client work use licensed tools. Loudness guide: about −14 LUFS (music) / −16 (voice mix) – decide by listening. Campaign rights / C2PA – see “Business and risks”.';
      }
      const d = s7.content.sections.find((x) => x.heading === 'Do this now' || x.heading === 'Daryk dabar');
      if (d) {
        d.body = 'Before public use, open the terms; write down “commercial OK?” yes/no.';
      }
    }
  }

  applyM13pTrimCopyables(mod);
}

/** Walk stubs that survive slideMeta – M13 businessExamples + M14/M15 chrome. */
function applyM1315EnFiller(mod) {
  if (mod.id === 13 && Array.isArray(mod.businessExamples)) {
    mod.businessExamples = [
      { title: 'Image generation', description: 'Prompts, style, ratios, tools' },
      { title: 'Video and audio', description: 'Short clips and AI-generated sound' },
    ];
  }
  if (mod.id === 14 && Array.isArray(mod.businessExamples)) {
    mod.businessExamples = [
      { title: 'Image and video prompts', description: 'Formats, tools, quality' },
      { title: 'Content-path knowledge', description: '12 questions before the Module 15 project' },
    ];
  }
  if (mod.id === 15 && Array.isArray(mod.businessExamples)) {
    mod.businessExamples = [
      { title: 'Quick start', description: 'One main image with a task note and prompt' },
      { title: 'Mini campaign path', description: 'Image → video → audio' },
    ];
  }

  if (mod.id === 15) {
    const s150 = mod.slides.find((s) => s.id === 150);
    if (s150?.content) {
      s150.content.howToUseModule = {
        heading: 'Choose a path',
        short: {
          label: 'Quick start',
          description: '~20 min – one main image.',
        },
        full: {
          label: 'Full path',
          description: '~60–90 min – image, video, audio and edit.',
        },
      };
      s150.content.whyBenefit =
        'After the project you will have a main image with the prompt you used and a short task note. If you want – also video, audio and an edit.';
      s150.content.firstActionCTA =
        'Start with one main image: copy the prompt into an image tool and save the result.';
      s150.content.recommendedStart =
        'The quick path ends with one image. The full path continues – video, audio, edit.';
      s150.content.primaryPathIntro =
        'One main image is enough to go to the summary. Video, audio and edit are for joining the pieces.';
      s150.content.taskOneLiner =
        'Make one main image with a prompt. If you want a mini campaign – continue to video, audio and edit.';
      s150.subtitle = 'One main image or a mini campaign';
    }

    const s026 = mod.slides.find((s) => s.id === 150.26);
    if (s026?.content) {
      s026.content.title = 'Do you have a main image?';
      s026.content.pathLabel = 'Content project path';
      s026.subtitle = 'Have an image? Continue to video or go to the summary?';
      s026.content.body =
        'If you already have a main image and a prompt – you can go to the summary. If you want to join image, video and audio – continue the next steps.';
      s026.content.sections = [
        {
          heading: 'You already have an image',
          body: 'One **main image** with the prompt you used and a 2-line task note. That is enough – then **go to the summary**.',
        },
        {
          heading: 'You continue',
          body: 'The same image → **short video** → **audio** (voice or bed) → **edit**. That joins the pieces.',
        },
        {
          heading: 'Check',
          body: 'Are you going to the summary, or continuing with video? What do you already have?',
        },
        {
          heading: 'First action within 48 hours',
          body: 'Publish or send one image (or one 3–5 s clip) with the prompt you used. Note what changed between tries.',
          blockVariant: 'brand',
        },
      ];
    }

    const s025 = mod.slides.find((s) => s.id === 150.25);
    if (s025?.content?.sections) {
      s025.subtitle = 'One image or a mini campaign';
      s025.content.sections = [
        {
          heading: 'In short',
          body: 'Quick path: task note → one main image → prompt → tweak → summary. Full path: the same image → short video → audio → edit.',
          blockVariant: 'accent',
          image: 'm15_practice_loop',
          imageAlt: 'Content project loop: quick path and mini-campaign path',
        },
        {
          heading: 'Do this now',
          body: 'Name your path: quick (image only) or full (video → audio → edit). Write the first result in one sentence.',
          blockVariant: 'brand',
        },
        {
          heading: 'Lock card',
          body: 'One card for the series: model · style header (15+ words, verbatim) · 3–5 reference photos · voice (tone + glossary) · rights · AI label. Do not switch models mid-way.',
          blockVariant: 'brand',
        },
        {
          heading: 'Check',
          body: 'Do you have a main image, a prompt and a short task note? Next step – summary or video?',
          blockVariant: 'accent',
        },
      ];
    }

    const scenarioEn = {
      150.5: {
        scenarioDescription:
          'In ~20 min: a hero image + the prompt you used + a 2-line brief. That is enough to go to the summary.',
        narrativeLead:
          'Write a short task note: goal, who, where you will use it. Lock a 15+ word style header and one model for the series. Then paste the prompt into an image tool.',
        stepTitle: 'Write a 2-line task note',
        stepDescription: 'Goal, who, and where you will use it.',
        templateLabel: 'Prompt – paste into an image tool',
      },
      151: {
        scenarioDescription:
          'If the quick-start image already works as the keyframe — go to video. Build here only if you need a different frame. Artifact: image + prompt.',
        narrativeLead:
          'If the quick-start image already works as the keyframe — go to video. Build here only if you need a different frame.',
        stepTitle: 'Choose or create a keyframe',
        stepDescription:
          'Same image works – go to video. Need another – paste the prompt into an image tool.',
        templateLabel: 'Prompt – paste into an image tool',
      },
      152: {
        scenarioDescription:
          'Turn the keyframe into a 3 s I2V clip: one camera, one action. Paste the prompt into a video tool (Runway, Kling, Veo or similar).',
        narrativeLead:
          'Use the I2V cycle: invariants + last-frame check, not only “did the style hold”.',
        stepTitle: 'Generate a 3 s clip and watch the last frame',
        stepDescription: 'Save the clip or link and the prompt. Done when the last second is clean.',
        templateLabel: 'Prompt – paste into a video tool',
      },
      153: {
        scenarioDescription:
          'Write for the ear: glossary + 3 anchor lines, then the full voice. Bed after the voice. One line: can you use it publicly?',
        narrativeLead:
          'Drift is tempo and pronunciation, not a “bad voice”. Try 3 lines first. Bed leaves room for the voice.',
        stepTitle: 'Try 3 anchor lines, then the full voice',
        stepDescription: 'Save the file or link, the prompt, and the glossary. Bed comes after the voice.',
        templateLabel: 'Prompt – paste into a voice tool',
      },
      154: {
        scenarioDescription:
          'Join image, video and audio into a 15–30 s whole. Use an edit tool (CapCut or similar). This is a plan, not a long prompt.',
        narrativeLead:
          'AI gives the raw clips. Hook in the first 1–2 seconds. Before export, mark rights and an AI label.',
        stepTitle: 'Assemble and export',
        stepDescription: 'File or link + rights + an AI label.',
        templateLabel: 'Edit plan – use in an edit tool',
      },
    };
    for (const [idStr, pack] of Object.entries(scenarioEn)) {
      const s = mod.slides.find((x) => x.id === Number(idStr));
      if (!s?.content) continue;
      s.content.scenarioDescription = pack.scenarioDescription;
      if (s.content.scenario) s.content.scenario.narrativeLead = pack.narrativeLead;
      const step = s.content.instructions?.steps?.[0];
      if (step) {
        step.title = pack.stepTitle;
        step.description = pack.stepDescription;
      }
      if (pack.templateLabel) {
        s.content.templateLabel = pack.templateLabel;
      }
      if (s.content.instructions) {
        s.content.instructions.title = 'Steps';
      }
      if (s.practicalTask) {
        s.practicalTask.placeholder = 'Paste the prompt you used…';
        if (pack.templateLabel) s.practicalTask.templateLabel = pack.templateLabel;
      }
    }

    const s1505 = mod.slides.find((s) => s.id === 150.5);
    if (s1505?.content?.instructions?.steps?.length >= 3) {
      s1505.content.instructions.steps[1] = {
        step: 2,
        title: 'Lock style and model',
        description:
          'Write the 15+ word header verbatim. One model for the series – do not switch mid-way.',
      };
      s1505.content.instructions.steps[2] = {
        step: 3,
        title: 'Generate the main image and save the prompt',
        description: 'Artifact: main image + prompt + task note + style lock.',
      };
      s1505.content.template = `Brief: goal [Awareness / Engagement / Conversion], audience [who], platform [where].
Create a hero image: [SUBJECT and action], setting [CONTEXT], style [STYLE], ratio [1:1 / 16:9 / 9:16].
Brand: colors [X], tone [professional / friendly / premium]. No text in the image unless needed.
Style lock (do not rewrite): [15+ words]. Model for this series: [one].`;
    }
    const s151 = mod.slides.find((s) => s.id === 151);
    if (s151?.content) {
      s151.title = 'Scenario: Image';
      s151.subtitle = 'A keyframe for the series';
      s151.shortTitle = 'Scenario: Image';
      s151.content.taskFrame = {
        task: 'Prepare a keyframe for the series: same product, same style.',
        doneWhen: 'You have an image and a prompt; the frame works as the video start.',
      };
      s151.content.template =
        'Keyframe: [WHAT IS SHOWN]. Setting: [CONTEXT]. Style: [STYLE]. Brand colors: [X]. Ratio: [1:1 / 16:9 / 9:16]. Leave space for a headline if needed.';
    }
    const s152 = mod.slides.find((s) => s.id === 152);
    if (s152?.content) {
      s152.content.taskFrame = {
        task: 'Generate a 3 s I2V clip from the keyframe: one camera, one action.',
        doneWhen:
          'You watched the last second: label readable, no new objects, you changed only one thing. If the tool accepts an end frame – you attached it; first = keyframe, last = what must remain at the end.',
      };
      s152.content.template = `Start: attach the keyframe. Keep identity and framing.
What does not change: [product / label / colors / light from the left].
The subject does: [one verb].
Camera: [one move]. No orbit, no tilt, no stacked moves.
Duration: 3 s first. Last frame: label readable, no new objects.
If the tool supports it: also attach an end frame (what must remain at the end).`;
      if (s152.content.instructions?.steps?.[0]) {
        s152.content.instructions.steps[0].title =
          'Generate a 3 s clip and watch the last frame';
        s152.content.instructions.steps[0].description =
          'Artifact: video file or link + prompt. Done when the last second is clean. If the tool accepts an end frame – attach it.';
      }
    }
    const s153 = mod.slides.find((s) => s.id === 153);
    if (s153?.content) {
      s153.title = 'Scenario: Voice or bed';
      s153.subtitle = 'Write for the ear + 3 anchor lines';
      s153.shortTitle = 'Voice or bed';
      s153.content.taskFrame = {
        task: 'Try 3 anchor lines at the same tempo, then the full voice.',
        doneWhen:
          'Tempo and pronunciation stayed the same; the bed leaves room for the voice; rights are marked.',
      };
      s153.content.template = `Role: [who they speak to]. Tone: [warm / calm]. Keep the same tempo.
Glossary: [brand] = [how to say it].
First try 3 lines: hook / benefit / ask. Then the full script.
Bed: no vocal, quiet, leave room for the voice. Rights: commercial.`;
    }
    const s154 = mod.slides.find((s) => s.id === 154);
    if (s154?.content) {
      s154.title = 'Scenario: Edit';
      s154.subtitle = '15–30 s from 2–4 clips';
      s154.shortTitle = 'Scenario: Edit';
      s154.content.taskFrame = {
        task: 'Assemble a 15–30 s clip: hook in the first 1–2 s, then export.',
        doneWhen: 'You have an export, rights marked, an AI label, and a CPI note (how many tries).',
      };
    }

    const s158 = mod.slides.find((s) => s.id === 158);
    if (s158?.content?.sections) {
      s158.content.introHeading = 'What you learned';
      s158.content.introBody =
        'Congratulations! You finished the quick start or mini campaign. You have prompts and results: a main image, and if you continued – video, audio and an edit.';
      if (Array.isArray(s158.content.stats) && s158.content.stats[0]) {
        s158.content.stats[0].label = 'Quick start';
        if (s158.content.stats[2]) s158.content.stats[2].value = 'saved';
      }
      s158.content.firstAction24h =
        'Within 24–48 hours, use the quick-start image or one mini-campaign piece in a real project (social post, slide, or background).';
      s158.content.abilityBefore =
        'You had no mini campaign or main image with saved prompts.';
      s158.content.abilityAfter =
        'You have a quick-start or mini-campaign artifact and can repeat it for another topic.';
      s158.content.ownWorkLabel = 'Your campaign / channel context';
      s158.content.tagline = 'Image + video + audio = one content engineering path.';
      s158.content.nextStepCTA =
        'Open the module list and pick another path or repeat the practice';
      s158.content.ownWorkPlaceholder = 'e.g., LinkedIn announcement, product hero…';
      s158.content.ownWorkTemplate =
        'META: You are a content director.\nINPUT: My channel and goal: {{context}}\nOUTPUT: Give 1 main-image prompt (style, ratios, text in the frame) and 3 Check points.';
      s158.content.sections = [
        {
          heading: 'Image',
          icon: 'Image',
          color: 'brand',
          items: [
            'Brief: goal, audience, platform',
            'Hero image / keyframe with brand colors',
            'Artifact: image + prompt used + a V1/V2 note if you iterated',
          ],
        },
        {
          heading: 'Short video',
          icon: 'Video',
          color: 'violet',
          items: [
            'Image-to-video from the hero keyframe',
            '3–5 s clips, same style',
            'Artifact: clip / link + prompt + CPI',
          ],
        },
        {
          heading: 'Audio, edit and checklist',
          icon: 'Music',
          color: 'amber',
          items: [
            'Sound first: voice or bed + rights',
            '15–30 s edit if you joined the pieces',
            'List: task note, prompt, rights, AI label',
          ],
        },
        {
          heading: 'Next step',
          icon: 'ArrowRight',
          color: 'emerald',
          items: [
            'Go back to the module list – repeat the practice with another topic or open another advanced path (data analysis 7–9, agents 10–12).',
            'Save your best prompts – you will reuse them as templates.',
          ],
        },
      ];
    }
  }
}

/** M13P-TRIM EN twins – ordered by copyable index (walk uses one copyableBySlide per slide). */
function applyM13pTrimCopyables(mod) {
  const trimEn = {
    13.1: [
      {
        heading: 'Copyable template',
        copyable: `Goal (A/E/C): [awareness / engagement / conversion].
Context: [product], platform [where], audience [who].
Reply: 1) one goal, 2) what to emphasize visually (emotion / context / CTA), 3) 1 format.`,
      },
    ],
    13.4: [
      {
        heading: 'Prompt to copy',
        copyable: `Clip 3–5 s (no longer).
Script: [what happens in this shot].
Camera: [slow push-in / side / stable].
Tone: [professional / dynamic / calm].
Start: image-to-video from the hero frame. Same style, same colors.`,
      },
    ],
    13.35: [
      {
        heading: 'Copyable step',
        copyable: `Station I am on: [Idea / Prompt / Try / Generate / Fix].
What I fill in this step: [1 sentence].`,
      },
    ],
    13.351: [
      {
        heading: 'MASTER prompt template',
        copyable: `Subject: [what is shown].
Goal: [Awareness / Engagement / Conversion].
Audience: [who].
Style: [photorealistic / minimal / …].
Composition + camera: [shot, angle].
Light and colors: [lighting + palette / mood].
Text in image (if needed): [text + placement].
Format: [1:1 / 16:9 / 9:16]. Avoid: [what to avoid].`,
      },
      {
        heading: 'Ready prompt: Logo',
        copyable:
          'Create a logo for [business area] company [name]. Style [minimal/modern], colors [x], transparent/white background, deliver 3 variants.\nStyle lock: [15+ words, verbatim]. Model: [one].',
      },
    ],
    13.101: [
      {
        heading: 'A/B hypothesis',
        copyable: `Test: [A vs B – e.g. “Image A: a person using the product / Image B: product only on a white background”].
Hypothesis: [e.g. “Variant A will get a higher CTR because it shows use”].
Metric: CTR (or CVR, scroll stop). Duration: [e.g. 7 days]. Audience: [who sees it].`,
      },
      {
        heading: 'Evaluation template',
        copyable:
          'Evaluate this artifact by 3 criteria: brand fit, message clarity, platform fit. Context: [goal, audience, platform]. Artifact: [describe or paste prompt]. Return: criterion, score 1-5, what works, 1-2 specific fixes.',
      },
    ],
    13.6: [
      {
        heading: 'Prompt to copy – bed',
        copyable: `Create a background music fragment, 30–60 seconds.
Mood: [calm / energetic]. Style: [acoustic / electronic / piano].
Tempo: [slow / medium]. No vocals. Use: [ads / presentation] – needs a commercial license.`,
      },
      {
        heading: 'Prompt to copy – VO',
        copyable: `Voiceover, [EN], tone [professional / friendly], tempo [calm].
Script: [paste 2–4 scenario sentences].
No bed in the file – voice only. Mix with bed later.`,
      },
      {
        heading: 'Copyable voice card',
        copyable: `Role: [who they speak to]. Tone: [warm / calm]. Keep the same tempo.
Glossary: [brand] = [how to say it].
First try 3 lines: hook / benefit / ask. Then the full script.
Bed: no vocal, quiet, leave room for the voice. License: commercial.`,
      },
      {
        heading: 'English MASTER template (universal)',
        copyable: `Create a [genre] track.
Mood: [emotion]. Tempo: [bpm or speed]. Instruments: [list].
Vocal: none. Use: background / ads. License intent: commercial.`,
        collapsible: true,
        collapsedByDefault: true,
      },
    ],
  };

  for (const [idStr, list] of Object.entries(trimEn)) {
    const s = mod.slides.find((x) => x.id === Number(idStr));
    if (!s?.content?.sections) continue;
    const withCopy = s.content.sections.filter((sec) => sec.copyable != null);
    list.forEach((item, i) => {
      const sec = withCopy[i];
      if (!sec) return;
      sec.heading = item.heading;
      sec.copyable = item.copyable;
      if (item.collapsible) {
        sec.collapsible = true;
        sec.collapsedByDefault = item.collapsedByDefault !== false;
      }
    });
  }
}
