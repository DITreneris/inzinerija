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
  heroSubText: 'For marketing and communication specialists – visual and audio content with AI.',
  firstActionCTA:
    'In 1–2 minutes open one image tool (e.g. ChatGPT with DALL·E or Ideogram) and generate one image from your description.',
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
};

export const slide156EnPlain = {
  title: 'Audio',
  subtitle: 'Section: voice, effects, music – sound first',
  contentSubtitle:
    'Next: sound first (voice or bed), then cuts; voice / effects / music and licenses for commercial work.',
  nextSteps: [
    'Sound first – voice or bed length, then cuts',
    'Voice, effects and music – three layers',
    'Licenses for commercial work',
    'Loudness guide and a listen-through check',
  ],
};

export const slide115EnPlain = {
  nextSteps: [
    'Image prompt formula: subject + context + style',
    'Style, ratios and when to pick which tool',
    'Same product in a series – 3–5 reference photos (reference lock)',
    'Interactive image builder for practice',
  ],
  contentSubtitle:
    'Next: prompt formula, style and ratios, same product in a series, then the builder. Pick tools after the style slide.',
};

export const slide136EnPlain = {
  nextSteps: [
    'Short script – 3–5 s clips, not one long try',
    'Image-to-video (I2V) clip builder for practice',
    'Video tools, format and cost per usable clip (CPI)',
    'Edit after generation',
  ],
  contentSubtitle:
    'Next: short script, image-to-video (I2V), format and cost per usable clip. Pick tools on the video tools slide.',
};

export const slide147EnPlain = {
  subtitle: 'Image-to-video: keyframe → 3–5 s → camera → same style',
};

export const slide111EnPlain = {
  title: 'Workflow: from brief to publication',
  shortTitle: 'Workflow: brief–publish',
  subtitle: 'Brief → prompt → variants → iteration → testing',
};

export const slide1101EnPlain = {
  trumpai:
    'Before you publish you will know what to check: results (KPI), rights, an AI label (C2PA / disclosure) and at least one A/B hypothesis. Details below.',
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
  reflectionPrompt: `You are a learning reflection assistant. Goal – lock in Module 13.
INPUT: I just finished content engineering – media chain, same product in a series, image-to-video, sound first, rights and AI label.
OUTPUT: Ask 3 questions: (1) Which chain step will I apply today? (2) What was newest? (3) What do I want to try first? After my answers give one concrete tip.`,
};

/** Fragile fields wiped by mechanical walk – restore after every rebuild. */
function applyM1315RebuildGuards(mod) {
  if (mod.id === 13) {
    const s31 = mod.slides.find((s) => s.id === 13.31);
    if (s31) s31.shortTitle = 'Quick check: style';
    const s51 = mod.slides.find((s) => s.id === 13.51);
    if (s51) s51.shortTitle = 'Quick check: video';
    const s37 = mod.slides.find((s) => s.id === 13.37);
    if (s37) {
      s37.shortTitle = 'Image builder';
      if (s37.content) {
        s37.content.tldr =
          'In short: Fill the fields below – the system builds an image prompt. Handy after the optional “Workflow and MASTER templates” slide, where you fill fields by hand. Copy the result into any image generator.';
        s37.content.patikra =
          'Does the generated prompt cover at least 3 elements (subject, style, ratios) and a clear A/E/C goal? Does the meter show “Ready”? If not – go back and change the parameters.';
      }
    }
    const s47 = mod.slides.find((s) => s.id === 13.47);
    if (s47) {
      s47.shortTitle = 'I2V builder';
      if (s47.content) {
        s47.content.tldr =
          'In short: Describe the keyframe / scene, pick duration (3–5 s) and camera move. The system builds an image-to-video prompt – copy it into Kling, Runway, Veo or Sora.';
        s47.content.patikra =
          'Does the prompt include a keyframe, duration 3–5 s, and same style/product? Can the opening match your hero still?';
      }
    }
  }
  if (mod.id === 15) {
    const s26 = mod.slides.find((s) => s.id === 150.26);
    if (s26) {
      s26.title = 'Checkpoint: project path';
      s26.shortTitle = 'Checkpoint';
      s26.subtitle = 'Content path – confirm your path before scenarios';
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
  if (mod.id !== 13) return;

  const s130 = mod.slides.find((s) => s.id === 130);
  if (s130?.content) {
    Object.assign(s130.content, {
      whyBenefit: slide130EnPlain.whyBenefit,
      outcomes: [...slide130EnPlain.outcomes],
      heroSubText: slide130EnPlain.heroSubText,
      firstActionCTA: slide130EnPlain.firstActionCTA,
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
    if (s52.content?.sections) {
      for (const sec of s52.content.sections) {
        if (sec.heading === 'Post-production schema' || sec.heading === 'Montazo schema' || sec.heading === 'Montažo schema') {
          sec.heading = 'Edit diagram';
          if (sec.imageAlt) sec.imageAlt = 'Edit: cut, grade, mix, export';
        }
      }
    }
  }

  const s56 = mod.slides.find((s) => s.id === 13.56);
  if (s56) {
    s56.subtitle = slide156EnPlain.subtitle;
    if (s56.content) {
      s56.content.title = slide156EnPlain.title;
      s56.content.subtitle = slide156EnPlain.contentSubtitle;
      s56.content.nextSteps = [...slide156EnPlain.nextSteps];
    }
  }

  const s15 = mod.slides.find((s) => s.id === 13.15);
  if (s15?.content) {
    s15.content.nextSteps = [...slide115EnPlain.nextSteps];
    s15.content.subtitle = slide115EnPlain.contentSubtitle;
  }

  const s36 = mod.slides.find((s) => s.id === 13.36);
  if (s36?.content) {
    s36.content.nextSteps = [...slide136EnPlain.nextSteps];
    s36.content.subtitle = slide136EnPlain.contentSubtitle;
  }

  const s47 = mod.slides.find((s) => s.id === 13.47);
  if (s47) s47.subtitle = slide147EnPlain.subtitle;

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
            'Full business cycle: (1) Marketing brief. (2) Prompt + brand + reference photos. (3) 3–5 variants / short image-to-video. (4) Iteration. (5) Platform. (6) Test. (7) Optimisation.';
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
    }
  }

  const s101 = mod.slides.find((s) => s.id === 13.101);
  if (s101?.content?.sections) {
    const t = s101.content.sections.find((s) => s.heading === 'In short' || s.heading === 'Trumpai');
    if (t) {
      t.heading = 'In short';
      t.body = slide1101EnPlain.trumpai;
    }
  }

  const s8 = mod.slides.find((s) => s.id === 13.8);
  if (s8?.content?.terms) {
    // Only the five M13-PLAIN glossary adds (do not match CPM via "kaina").
    const isPlainExtraTerm = (t) => {
      const s = `${t.term}`;
      return (
        /^CPI\b/i.test(s) ||
        /^C2PA\b/i.test(s) ||
        /^I2V\b/i.test(s) ||
        /^Audio-first\b/i.test(s) ||
        /^Reference lock\b/i.test(s) ||
        /pirma garsas|pavyzd.*uzrakt|DI zyma|video is kadro|kaina uz tinkama/i.test(s)
      );
    };
    s8.content.terms = s8.content.terms.filter((t) => !isPlainExtraTerm(t));
    s8.content.terms.push(...slide18ExtraTermsEn.map((t) => ({ ...t })));
  }

  const s9 = mod.slides.find((s) => s.id === 13.9);
  if (s9?.content) {
    s9.subtitle = slide19EnPlain.subtitle;
    Object.assign(s9.content, {
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
    const check = s325.content.sections.find((s) => s.heading === 'Check' || s.heading === 'Patikra');
    if (check) {
      check.heading = 'Check';
      check.body =
        'Did you tick refs, pick a mode and copy the rule? If refs are missing – go back to “Product and character – the same look” and collect 3–5 angles.';
    }
  }

  // Soft gloss B3 EN for Trumpai on key slides (body often genericBySlide – override In short)
  const trumpaiEn = {
    13.12:
      'You win with a clear work chain (from brief to check), not the “best model”. One prompt straight into video often means expensive retries – lock the plan, frames and reference photos first, then short clips, audio and a check.',
    13.3:
      'Style: photorealistic, acrylic, 3D, drawing. Aspect ratio (frame width×height): 1:1 square, 16:9 wide, 9:16 vertical (stories).',
    13.4:
      'A short video needs a clear script, tone and camera. Prefer 2–4 short clips (3–5 s) over one long try – lock stills before expensive video.',
    13.5:
      'Video: format (16:9 / 9:16), length 3–5 s. Track cost per usable clip (CPI) = generation + retries / usable clips – not only €/s. Use the matrix for a quick pick.',
    13.6:
      'Sound first (audio-first): plan voice or bed length first, then cut video to that pacing. For music describe mood, style, tempo, instruments. Client / ads – licensed stack; Suno/Udio – demo, not client work.',
    13.35:
      'Optional library: if one solution is enough – pick a MASTER template or one ready prompt. Workflow and 8 scenarios are for deeper practice (expand).',
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
  if (s35) s35.subtitle = '5-step workflow, #1000Books, ready prompts';

  applyM13pTrimCopyables(mod);
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
Camera: [slow push-in / side / stable / crane up].
Tone: [professional / dynamic / calm].
Start: image-to-video from hero keyframe. Same style, same colors.`,
      },
      {
        heading: 'Copyable chain – image → video',
        copyable: `1) Hero frame: [SUBJECT], [CONTEXT], style [STYLE], 16:9 or 9:16.
2) I2V 3–5 s from that frame: camera […], same product / same style.
(If you need longer – second keyframe, then edit.)`,
      },
    ],
    13.35: [
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
          'Create a logo for [business area] company [name]. Style [minimal/modern], colors [x], transparent/white background, deliver 3 variants.',
      },
      {
        heading: 'Ready prompt: Social post',
        copyable:
          'From this text [paste], create a LinkedIn/Facebook illustration. Look [corporate], colors [x], format 1:1 or 4:5, no text / with CTA text [if needed].',
      },
      {
        heading: 'Ready prompt: Poster',
        copyable:
          "Create a bold poster for event [name], date/place [x], style [x], include exact text: '…'.",
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
