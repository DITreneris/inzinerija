import fs from 'fs';

function upsertTools(file, locale) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const byName = new Map(data.tools.map((t) => [t.name, t]));

  const updates =
    locale === 'lt'
      ? [
          {
            name: 'DALL·E (OpenAI)',
            description:
              'Vaizdų generavimas per ChatGPT / GPT-Image – tekstas į vaizdą, stilius ir proporcijos; greitas brief→vaizdas.',
          },
          {
            name: 'ElevenLabs (garsai)',
            description:
              'VO (voiceover), balsų sintezė ir SFX – audio-first workflow naracijai ir perėjimams.',
          },
          {
            name: 'Ideogram',
            description:
              'Stiprus tekstas vaizduose – logo, plakatai, LinkedIn; geras marketingo startas.',
          },
          {
            name: 'Midjourney',
            description:
              'Aukštas meninis lygis, character/style reference – brand ir kampanijų stiliai.',
          },
          {
            name: 'Runway',
            description:
              'Video generavimas ir redagavimas – image-to-video, trumpi klipai, post-prod.',
          },
          {
            name: 'Sora (OpenAI)',
            description:
              'Sora 2 – aukšta kokybė, realistinė judesio fizika; 1–2 image refs.',
          },
          {
            name: 'Suno',
            description:
              'Tekstas → daina; greiti demo ir viral hook. Klientui / reklamai pirmiau rinkis licensed stack.',
          },
          {
            name: 'Soundraw',
            description:
              'Royalty-friendly foninė muzika – nuotaika + trukmė; tinka reklamai ir podcast intro.',
          },
          {
            name: 'Synthesia',
            description: 'DI avatarai – mokymai, paaiškinamieji video, lokalizacija.',
          },
          {
            name: 'Udio',
            description:
              'Gili muzikos kontrolė, remix; geriau demo / kūrybiniams bandymams nei client ads be licencijos patikros.',
          },
        ]
      : [
          {
            name: 'DALL·E (OpenAI)',
            description:
              'Image generation via ChatGPT / GPT-Image – text to image, style and ratios; fast brief→image.',
          },
          {
            name: 'ElevenLabs (voices)',
            description:
              'VO (voiceover), voice synthesis and SFX – audio-first narration and transitions.',
          },
          {
            name: 'Ideogram',
            description:
              'Strong text-in-image – logos, posters, LinkedIn; solid marketing starter.',
          },
          {
            name: 'Midjourney',
            description:
              'High artistic quality with character/style reference – brand and campaign looks.',
          },
          {
            name: 'Runway',
            description:
              'Video generation and editing – image-to-video, short clips, post-prod.',
          },
          {
            name: 'Sora (OpenAI)',
            description:
              'Sora 2 – high quality, realistic motion physics; 1–2 image refs.',
          },
          {
            name: 'Suno',
            description:
              'Text → song; fast demos and viral hooks. For client/ads prefer a licensed stack first.',
          },
          {
            name: 'Soundraw',
            description:
              'Royalty-friendly beds – mood + length; good for ads and podcast intros.',
          },
          {
            name: 'Synthesia',
            description: 'AI avatars – training, explainers, localization.',
          },
          {
            name: 'Udio',
            description:
              'Deep music control and remix; better for demos than client ads without a license check.',
          },
        ];

  for (const u of updates) {
    const t = byName.get(u.name);
    if (t) t.description = u.description;
  }

  const news =
    locale === 'lt'
      ? [
          {
            name: 'ElevenMusic',
            url: 'https://elevenlabs.io/music',
            description:
              'Licencijuotos treniravimo duomenų muzika – client / YouTube monetizacija; vieninga platforma su ElevenLabs VO.',
            moduleId: 13,
            category: 'Muzikos generavimas',
          },
          {
            name: 'FLUX',
            url: 'https://blackforestlabs.ai',
            description:
              'Fotorealizmas ir multi-reference consistency – produktų / personažų serijoms.',
            moduleId: 13,
            category: 'Vaizdų generavimas',
          },
          {
            name: 'GPT-Image (OpenAI)',
            url: 'https://chat.openai.com',
            description:
              'OpenAI vaizdų modelis ChatGPT – natūrali kalba, sudėtingi briefai, greitas marketingo juodraštis.',
            moduleId: 13,
            category: 'Vaizdų generavimas',
          },
          {
            name: 'Imagen (Google)',
            url: 'https://deepmind.google/technologies/imagen/',
            description:
              'Google vaizdų generavimas – objektų išlaikymas, SynthID atsekamumas; saugi reklama ir katalogai.',
            moduleId: 13,
            category: 'Vaizdų generavimas',
          },
          {
            name: 'Kling AI',
            url: 'https://klingai.com',
            description:
              'Kling 3 – balance kokybė/kaina image-to-video; trumpi 3–5 s reklamos klipai.',
            moduleId: 13,
            category: 'Video generavimas',
          },
          {
            name: 'Seedance',
            url: 'https://seedance.ai',
            description:
              'Seedance 2.0 – directed motion su daug image/video/audio refs vienoje generacijoje.',
            moduleId: 13,
            category: 'Video generavimas',
          },
          {
            name: 'Veo (Google)',
            url: 'https://deepmind.google/technologies/veo/',
            description:
              'Veo 3.1 – kinematografinė kokybė, native audio; prototipai ir trumpi reklaminiai.',
            moduleId: 13,
            category: 'Video generavimas',
          },
        ]
      : [
          {
            name: 'ElevenMusic',
            url: 'https://elevenlabs.io/music',
            description:
              'Music trained on licensed data – client / YouTube monetization; same platform as ElevenLabs VO.',
            moduleId: 13,
            category: 'Music generation',
          },
          {
            name: 'FLUX',
            url: 'https://blackforestlabs.ai',
            description:
              'Photorealism and multi-reference consistency – product/character series.',
            moduleId: 13,
            category: 'Image generation',
          },
          {
            name: 'GPT-Image (OpenAI)',
            url: 'https://chat.openai.com',
            description:
              'OpenAI image model in ChatGPT – natural language, complex briefs, fast marketing drafts.',
            moduleId: 13,
            category: 'Image generation',
          },
          {
            name: 'Imagen (Google)',
            url: 'https://deepmind.google/technologies/imagen/',
            description:
              'Google image generation – object consistency, SynthID provenance; safer ads and catalogs.',
            moduleId: 13,
            category: 'Image generation',
          },
          {
            name: 'Kling AI',
            url: 'https://klingai.com',
            description:
              'Kling 3 – quality/cost balance for image-to-video; short 3–5 s ad clips.',
            moduleId: 13,
            category: 'Video generation',
          },
          {
            name: 'Seedance',
            url: 'https://seedance.ai',
            description:
              'Seedance 2.0 – directed motion with many image/video/audio refs in one generation.',
            moduleId: 13,
            category: 'Video generation',
          },
          {
            name: 'Veo (Google)',
            url: 'https://deepmind.google/technologies/veo/',
            description:
              'Veo 3.1 – cinematic quality, native audio; prototypes and short ads.',
            moduleId: 13,
            category: 'Video generation',
          },
        ];

  for (const n of news) {
    if (!byName.has(n.name)) data.tools.push(n);
  }

  const firefly = byName.get('Adobe Firefly');
  if (firefly) {
    firefly.description =
      locale === 'lt'
        ? 'Adobe DI vaizdams – Generative Fill, tekstas į vaizdą; CC integracija, teisiškai saugesni šaltiniai, C2PA Content Credentials.'
        : 'Adobe generative images – Generative Fill, text-to-image; CC integration, safer training sources, C2PA Content Credentials.';
  }

  data.tools.sort((a, b) =>
    a.name.localeCompare(b.name, locale === 'lt' ? 'lt' : 'en'),
  );
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  console.log(file, 'tools', data.tools.length);
}

upsertTools('src/data/tools.json', 'lt');
upsertTools('src/data/tools-en.json', 'en');
