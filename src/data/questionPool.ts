/**
 * Modulio 2 klausimų pool (question bank).
 * Kiekvieną kartą paleidžiant testą, iš šio pool atsitiktinai parenkama 15 klausimų,
 * palaikant balansą tarp kategorijų ir klausimų tipų.
 *
 * Kiekvienas klausimas turi: category, type, bloomLevel, relatedSlideId.
 */
import type { TestQuestion } from '../types/modules';

export const QUESTION_POOL: TestQuestion[] = [
  // ═══════════════════════════════════════════
  // META (4 klausimai)
  // ═══════════════════════════════════════════
  {
    id: 'pool-meta-1',
    type: 'mcq',
    question: 'Nuo ko geriausia pradėti promptą?',
    options: [
      'Nuo rolės ir tikslo (Meta)',
      'Nuo rezultatų formato (Output)',
      'Nuo duomenų (Input)',
      'Nuo parametrų (Advanced)',
    ],
    correct: 0,
    explanation:
      'Meta blokas yra svarbiausias – jis nustato kontekstą visam likusiam promptui.',
    hint: 'Pagalvok, kas nustato kas esu ir kodėl rašau kontekstą.',
    bloomLevel: 1,
    relatedSlideId: 8,
    category: 'meta',
  },
  {
    id: 'pool-meta-2',
    type: 'true-false',
    question:
      'Meta blokas apibrėžia tik DI rolę – auditoriją ir patirtį nurodo kiti blokai.',
    isTrue: false,
    explanation:
      'Meta blokas apima viską: KAS esi (rolė), KOKIA patirtis ir KAM skirtas rezultatas (auditorija).',
    hint: 'Prisimink: Meta = rolė + patirtis + tikslinė auditorija.',
    bloomLevel: 2,
    relatedSlideId: 8,
    category: 'meta',
  },
  {
    id: 'pool-meta-3',
    type: 'mcq',
    question: 'Ką turi apimti Meta blokas?',
    options: [
      'Rolė, patirtis, tikslinė auditorija',
      'Tik skaičius ir duomenis',
      'Tik rezultato formatą',
      'Tik kokybės kriterijus',
    ],
    correct: 0,
    explanation:
      'Meta blokas apibrėžia KAS esate, KOKIA patirtis ir KAM skirtas rezultatas.',
    hint: 'Meta = kas aš esu, ką žinau, kam rašau.',
    bloomLevel: 1,
    relatedSlideId: 8,
    category: 'meta',
  },
  {
    id: 'pool-meta-4',
    type: 'true-false',
    question:
      'Jei prompto Meta bloke nurodyta rolė "vyresnysis analitikas", DI atsakymas bus labiau ekspertinis nei nurodant tiesiog "padėjėjas".',
    isTrue: true,
    explanation:
      'Teisingai! DI adaptuoja savo atsakymo lygį pagal nurodytą rolę. Ekspertinė rolė = detalesnis, gilesnis atsakymas.',
    hint: 'Pagalvok: ar skiriasi atsakymas kai klausi eksperto vs pradedančiojo?',
    bloomLevel: 3,
    relatedSlideId: 8,
    category: 'meta',
  },

  // ═══════════════════════════════════════════
  // INPUT (4 klausimai)
  // ═══════════════════════════════════════════
  {
    id: 'pool-input-1',
    type: 'mcq',
    question: 'Kas yra konkretus input?',
    options: [
      'Tikslūs skaičiai, datos, metrikos',
      'Bendra nuotaika',
      'Tik klausimai',
      'Tik norimas tonas',
    ],
    correct: 0,
    explanation:
      'Konkretus input = konkretūs duomenys: 250k EUR, +15%, 1200 užsakymų.',
    hint: 'Input – tai faktai, skaičiai ir duomenys, ne nuotaikos ar klausimai.',
    bloomLevel: 1,
    relatedSlideId: 9,
    category: 'input',
  },
  {
    id: 'pool-input-2',
    type: 'mcq',
    question: 'Kuri iš šių formuluočių yra geras Input bloko pavyzdys?',
    options: [
      'Pajamos: 250k EUR, augimas: +15%, užsakymai: 1200',
      'Norėčiau daugiau duomenų',
      'Duomenys yra svarbūs',
      'Parašyk apie pardavimus',
    ],
    correct: 0,
    explanation:
      'Geras Input = konkretūs skaičiai ir metrikos, ne abstrakčios frazės.',
    hint: 'Input blokas reikalauja konkrečių faktų – skaičiai, datos, metrikos.',
    bloomLevel: 2,
    relatedSlideId: 9,
    category: 'input',
  },
  {
    id: 'pool-input-3',
    type: 'true-false',
    question:
      'Input blokas gali būti tuščias, jei DI turi pakankamai bendrų žinių apie temą.',
    isTrue: false,
    explanation:
      'Neteisingai. Be konkretaus Input, DI generuos bendrinį tekstą be tavo konteksto. Visada pateik konkrečius duomenis.',
    hint: 'Pagalvok: ar DI žino tavo pardavimų skaičius be Input?',
    bloomLevel: 3,
    relatedSlideId: 9,
    category: 'input',
  },
  {
    id: 'pool-input-4',
    type: 'mcq',
    question: 'Kuris elementas NEPRIKLAUSO Input blokui?',
    options: [
      'Rezultato formatas (lentelė, sąrašas)',
      'Pardavimų skaičiai',
      'Klientų atsiliepimai',
      'Biudžeto duomenys',
    ],
    correct: 0,
    explanation:
      'Rezultato formatas (lentelė, sąrašas, kalba) priklauso Output blokui, ne Input.',
    hint: 'Input = duomenys. Kas iš šių yra formatas, ne duomenys?',
    bloomLevel: 2,
    relatedSlideId: 9,
    category: 'input',
  },

  // ═══════════════════════════════════════════
  // OUTPUT (4 klausimai)
  // ═══════════════════════════════════════════
  {
    id: 'pool-output-1',
    type: 'mcq',
    question:
      'Nori gauti 5 punktų sąrašą lietuviškai. Kurį bloką turi nurodyti?',
    options: ['Output', 'Meta', 'Input', 'Quality Control'],
    correct: 0,
    explanation:
      'Formatas (sąrašas, 5 punktai, kalba) – tai Output bloko atsakomybė.',
    hint: 'Kuris blokas nustato rezultato formatą ir struktūrą?',
    bloomLevel: 2,
    relatedSlideId: 10,
    category: 'output',
  },
  {
    id: 'pool-output-2',
    type: 'mcq',
    question: 'Kam skirtas Output blokas?',
    options: [
      'Nurodyti rezultato formatą ir struktūrą',
      'Nustatyti DI rolę',
      'Pateikti pradinius duomenis',
      'Patikrinti klaidas',
    ],
    correct: 0,
    explanation:
      'Output blokas nurodo TIKSLŲ formatą: lentelė, 5 stulpeliai, lietuvių kalba.',
    hint: 'Output = KO norite (formatas, struktūra, kalba).',
    bloomLevel: 1,
    relatedSlideId: 10,
    category: 'output',
  },
  {
    id: 'pool-output-3',
    type: 'true-false',
    question:
      'Output bloke pakanka nurodyti tik kalbą – DI pats nuspręs formatą.',
    isTrue: false,
    explanation:
      'Neteisingai. Be formato nurodymo (lentelė, sąrašas, ataskaita) DI pasirinks savo formatą, kuris gali netikti.',
    hint: 'Ar norite, kad DI sprendžia už jus, koks bus rezultato formatas?',
    bloomLevel: 3,
    relatedSlideId: 10,
    category: 'output',
  },
  {
    id: 'pool-output-4',
    type: 'mcq',
    question: 'Kuris iš šių yra geras Output bloko pavyzdys?',
    options: [
      'Formatas: lentelė, 5 stulpeliai, lietuviškai, iki 500 žodžių',
      'Parašyk ką nors gero',
      'Noriu gerą rezultatą',
      'Atsakyk trumpai',
    ],
    correct: 0,
    explanation:
      'Geras Output apibrėžia formatą (lentelė), struktūrą (5 stulpeliai), kalbą (lietuviškai) ir apimtį (500 žodžių).',
    hint: 'Geras Output = konkretus formatas + struktūra + kalba + apimtis.',
    bloomLevel: 2,
    relatedSlideId: 10,
    category: 'output',
  },

  // ═══════════════════════════════════════════
  // REASONING (4 klausimai)
  // ═══════════════════════════════════════════
  {
    id: 'pool-reasoning-1',
    type: 'mcq',
    question: 'Kam skirtas Reasoning blokas?',
    options: [
      'Nurodyti, kaip DI turi mąstyti prieš atsakant',
      'Tik pridėti stilių',
      'Tik pakeisti kalbą',
      'Tik sutrumpinti tekstą',
    ],
    correct: 0,
    explanation:
      'Reasoning blokas nurodo MĄSTYMO SEKĄ: 1) Analizuoti 2) Palyginti 3) Rekomenduoti.',
    hint: 'Reasoning = mąstymo seka. Pagalvok apie žingsnius prieš atsakymą.',
    bloomLevel: 1,
    relatedSlideId: 11,
    category: 'reasoning',
  },
  {
    id: 'pool-reasoning-2',
    type: 'true-false',
    question:
      'Reasoning blokas reikalingas tik sudėtingiems klausimams – paprastiems užtenka Meta + Input + Output.',
    isTrue: true,
    explanation:
      'Teisingai! Minimalus promptas = Meta + Input + Output (3 blokai). Reasoning pridedamas, kai reikia sudėtingesnio mąstymo.',
    hint: 'Pagalvok: ar paprastas klausimas „Išversk šį sakinį“ reikalauja mąstymo sekos?',
    bloomLevel: 4,
    relatedSlideId: 11,
    category: 'reasoning',
  },
  {
    id: 'pool-reasoning-3',
    type: 'mcq',
    question: 'Kuris iš šių yra geras Reasoning bloko pavyzdys?',
    options: [
      '1) Analizuok duomenis 2) Palygink laikotarpius 3) Ieškok tendencijų 4) Rekomenduok veiksmus',
      'Pagalvok gerai',
      'Parašyk išsamiai',
      'Naudok logiką',
    ],
    correct: 0,
    explanation:
      'Geras Reasoning = aiški mąstymo seka su numeruotais žingsniais.',
    hint: 'Reasoning = numeruota seka: analizuok, palygink, rekomenduok.',
    bloomLevel: 2,
    relatedSlideId: 11,
    category: 'reasoning',
  },
  {
    id: 'pool-reasoning-4',
    type: 'mcq',
    question: 'Kuri technika geriausiai išreiškia Reasoning bloko principą?',
    options: [
      'Chain-of-thought (mąstymo grandinė)',
      'Few-shots',
      'Zero-shot',
      'Copy-paste',
    ],
    correct: 0,
    explanation:
      'Chain-of-thought technika nurodo DI mąstyti žingsnis po žingsnio – tai Reasoning bloko esmė.',
    hint: 'Kuri technika skatina mąstyti žingsnis po žingsnio?',
    bloomLevel: 3,
    relatedSlideId: 11,
    category: 'reasoning',
  },

  // ═══════════════════════════════════════════
  // QUALITY (4 klausimai)
  // ═══════════════════════════════════════════
  {
    id: 'pool-quality-1',
    type: 'mcq',
    question: 'Kam skirtas Quality Control blokas?',
    options: [
      'Nustatyti kokybės kriterijus prieš pateikiant atsakymą',
      'Tik pridėti stilių',
      'Tik pakeisti kalbą',
      'Tik sutrumpinti tekstą',
    ],
    correct: 0,
    explanation:
      'Quality Control = tikrinimo kriterijai: Ar logiška? Ar pilna? Ar tikslūs faktai?',
    hint: 'Quality = tikrink save prieš atsakant.',
    bloomLevel: 1,
    relatedSlideId: 12,
    category: 'quality',
  },
  {
    id: 'pool-quality-2',
    type: 'true-false',
    question:
      'Quality Control blokas tikrina rezultatą tik po to, kai DI jau sugeneravo atsakymą.',
    isTrue: false,
    explanation:
      'Quality Control kriterijus nustatome PRIEŠ generavimą – tai instrukcija DI tikrink save.',
    hint: 'Pagalvok: ar Quality Control yra instrukcija DI, ar veiksmas po rezultato?',
    bloomLevel: 4,
    relatedSlideId: 12,
    category: 'quality',
  },
  {
    id: 'pool-quality-3',
    type: 'mcq',
    question: 'Kuris Quality Control kriterijus padeda išvengti haliucinacijų?',
    options: [
      'Jei nežinai – parašyk Nežinau, o ne išsigelk',
      'Rašyk ilgiau',
      'Naudok daugiau emocijų',
      'Pridėk daugiau pavyzdžių',
    ],
    correct: 0,
    explanation:
      '„Nežinau“ taisyklė – vienas iš efektyviausių būdų mažinti haliucinacijas.',
    hint: 'Kas atsitinka, kai DI bandoma atsakyti į klausimą, kurio atsakymo nežino?',
    bloomLevel: 3,
    relatedSlideId: 12,
    category: 'quality',
  },
  {
    id: 'pool-quality-4',
    type: 'true-false',
    question:
      'Quality Control blokas yra neprivalomas ir jo galima nepridėti jokiame prompte.',
    isTrue: true,
    explanation:
      'Teisingai – Quality yra „papildomas“ blokas. Minimalus promptas = Meta + Input + Output. Tačiau Quality labai rekomenduojamas sudėtingesniems promptams.',
    hint: 'Prisimink: kurie 3 blokai yra „privalomas minimumas“?',
    bloomLevel: 2,
    relatedSlideId: 12,
    category: 'quality',
  },

  // ═══════════════════════════════════════════
  // ADVANCED (4 klausimai)
  // ═══════════════════════════════════════════
  {
    id: 'pool-advanced-1',
    type: 'mcq',
    question: 'Nori kūrybiškesnio atsakymo. Ką labiausiai verta pakeisti?',
    options: [
      'Temperature (pakelti)',
      'Input kiekį',
      'Kalbos nustatymą',
      'Quality Control kiekį',
    ],
    correct: 0,
    explanation:
      'Temperature 0.8–1.0 = kūrybiškesnis. Temperature 0.1–0.3 = tikslesnis, faktinis.',
    hint: 'Kuris parametras kontroliuoja kūrybiškumą vs tikslumą?',
    bloomLevel: 2,
    relatedSlideId: 13,
    category: 'advanced',
  },
  {
    id: 'pool-advanced-2',
    type: 'true-false',
    question:
      'Temperature 0.1 reiškia labai kūrybišką ir netikėtą DI atsakymą.',
    isTrue: false,
    explanation:
      'Neteisingai. Temperature 0.1 = labai tikslus, faktinis, nuspėjamas. Temperature 0.9 = kūrybiškas, įvairus.',
    hint: 'Žema temperature = žemas „kūrybiškumo“ lygis.',
    bloomLevel: 2,
    relatedSlideId: 13,
    category: 'advanced',
  },
  {
    id: 'pool-advanced-3',
    type: 'mcq',
    question: 'Kam naudojamas max_tokens parametras?',
    options: [
      'Apriboti atsakymo ilgį',
      'Nustatyti kalbą',
      'Pakeisti rolę',
      'Pridėti duomenų',
    ],
    correct: 0,
    explanation:
      'max_tokens apriboja DI atsakymo ilgį žodžiais/tokenais. Naudinga, kai reikia trumpo atsakymo.',
    hint: 'Token = maždaug žodis. Max tokens = maksimalus žodžių skaičius.',
    bloomLevel: 1,
    relatedSlideId: 13,
    category: 'advanced',
  },
  {
    id: 'pool-advanced-4',
    type: 'mcq',
    question: 'Kurie du parametrai dažniausiai naudojami Advanced bloke?',
    options: [
      'Temperature ir max_tokens',
      'Kalba ir formatas',
      'Rolė ir auditorija',
      'Duomenys ir metrikos',
    ],
    correct: 0,
    explanation:
      'Temperature (kūrybiškumas) ir max_tokens (ilgis) – du pagrindiniai Advanced bloko parametrai.',
    hint: 'Advanced blokas = techniniai nustatymai. Kokie du pagrindiniai?',
    bloomLevel: 1,
    relatedSlideId: 13,
    category: 'advanced',
  },

  // ═══════════════════════════════════════════
  // BENDRA SISTEMA (4 klausimai)
  // ═══════════════════════════════════════════
  {
    id: 'pool-bendra-1',
    type: 'mcq',
    question: 'Kiek blokų turi pilnas struktūruotas promptas?',
    options: ['3', '4', '5', '6'],
    correct: 3,
    explanation: '6 blokai: Meta, Input, Output, Reasoning, Quality, Advanced.',
    hint: 'Prisimink: M-I-O-R-Q-A sistema.',
    bloomLevel: 1,
    relatedSlideId: 14,
    category: 'bendra',
  },
  {
    id: 'pool-bendra-2',
    type: 'mcq',
    question: 'Koks minimalus promptas aiškiam rezultatui?',
    options: [
      'Meta + Input + Output',
      'Tik Output',
      'Tik Meta',
      'Reasoning + Quality',
    ],
    correct: 0,
    explanation:
      'Minimalus = 3 blokai: KAS esi (Meta) + KĄ turi (Input) + KO nori (Output).',
    hint: 'Kurie 3 blokai yra „privalomas minimumas“?',
    bloomLevel: 2,
    relatedSlideId: 14,
    category: 'bendra',
  },
  {
    id: 'pool-bendra-3',
    type: 'matching',
    question: 'Sujunkite kiekvieną bloką su jo pagrindine funkcija:',
    matchPairs: [
      { left: 'Meta', right: 'Rolė, patirtis, auditorija' },
      { left: 'Input', right: 'Konkretūs duomenys ir faktai' },
      { left: 'Output', right: 'Rezultato formatas ir struktūra' },
      { left: 'Reasoning', right: 'Mąstymo seka ir logika' },
      { left: 'Quality', right: 'Kokybes tikrinimo kriterijai' },
      { left: 'Advanced', right: 'Techniniai parametrai (temperature)' },
    ],
    explanation:
      'Kiekvienas iš 6 blokų turi aiškų atsakomybę. Kai visi veikia kartu – rezultatas nuspėjamas.',
    hint: 'Kuris blokas atsako į: kas esu, ką turiu, ko noriu, kaip mąstyti, ar gerai, kokie nustatymai?',
    bloomLevel: 2,
    relatedSlideId: 14,
    category: 'bendra',
  },
  {
    id: 'pool-bendra-4',
    type: 'ordering',
    question:
      'Surikiuokite 6 blokus nuo svarbiausio iki mažiausiai svarbaus (pagal prioritetą):',
    correctOrder: [
      'Meta (rolė ir kontekstas)',
      'Input (duomenys)',
      'Output (formatas)',
      'Reasoning (mąstymo logika)',
      'Quality (kokybės kriterijai)',
      'Advanced (parametrai)',
    ],
    items: [
      'Quality (kokybės kriterijai)',
      'Advanced (parametrai)',
      'Meta (rolė ir kontekstas)',
      'Output (formatas)',
      'Input (duomenys)',
      'Reasoning (mąstymo logika)',
    ],
    explanation:
      'Meta, Input, Output – privalomi (top 3). Reasoning, Quality, Advanced – papildomi.',
    hint: 'Pirmi trys blokai yra privalomas minimumas aiškiam rezultatui gauti.',
    bloomLevel: 3,
    relatedSlideId: 14,
    category: 'bendra',
  },

  // ═══════════════════════════════════════════
  // WORKFLOW (3 klausimai)
  // ═══════════════════════════════════════════
  {
    id: 'pool-workflow-1',
    type: 'mcq',
    question: 'Kuo skiriasi basic pokalbis nuo workflow?',
    options: [
      'Workflow turi aiškų formatą ir rezultatą',
      'Basic visada turi duomenų rinkinį',
      'Workflow tinka tik kūrybai',
      'Basic visada naudoja šabloną',
    ],
    correct: 0,
    explanation:
      'Workflow apibrėžia formatą, reikalavimus ir laukiamą rezultatą.',
    hint: 'Workflow = struktūruotas procesas su aiškiu galutiniu rezultatu.',
    bloomLevel: 2,
    relatedSlideId: 3,
    category: 'workflow',
  },
  {
    id: 'pool-workflow-2',
    type: 'true-false',
    question:
      'Workflow yra tas pats kas paprastas pokalbis su DI – tiesiog ilgesnis.',
    isTrue: false,
    explanation:
      'Neteisingai. Workflow turi aiškią struktūrą, etapus ir laukiamą rezultatą. Pokalbis = laisva forma.',
    hint: 'Ar pokalbis turi aiškų planą ir laukiamą formatą?',
    bloomLevel: 2,
    relatedSlideId: 3,
    category: 'workflow',
  },
  {
    id: 'pool-workflow-3',
    type: 'mcq',
    question: 'Kuris iš šių yra workflow pavyzdys?',
    options: [
      'Brief > Struktūra > Turinys > Formatavimas > Peržiūra',
      'Parašyk man ką nors',
      'Pakartok praeitą atsakymą',
      'Padėk su namais',
    ],
    correct: 0,
    explanation:
      'Workflow = aiški seka su etapais (brief, struktūra, turinys, formatavimas, peržiūra).',
    hint: 'Workflow visada turi aiškų žingsnių planą.',
    bloomLevel: 2,
    relatedSlideId: 3,
    category: 'workflow',
  },

  // ═══════════════════════════════════════════
  // TECHNIKOS (3 klausimai)
  // ═══════════════════════════════════════════
  {
    id: 'pool-technikos-1',
    type: 'mcq',
    question: 'Kuri technika remiasi pavyzdžiais?',
    options: ['Few-shots', 'Zero-shot', 'Chain-of-thought', 'Promptų seka'],
    correct: 0,
    explanation:
      'Few-shots pateikia 1–2 pavyzdžius, po to prašo naujų. Zero-shot – be pavyzdžių.',
    hint: 'Few reiškia keli – tai technika, kuri naudoja kelis pavyzdžius.',
    bloomLevel: 1,
    relatedSlideId: 5,
    category: 'technikos',
  },
  {
    id: 'pool-technikos-2',
    type: 'mcq',
    question: 'Ką reiškia Zero-shot technika?',
    options: [
      'DI atlieka užduotį be jokių pavyzdžių',
      'DI naudoja 0 blokų',
      'DI neatsako',
      'DI naudoja tik Meta bloką',
    ],
    correct: 0,
    explanation:
      'Zero-shot = DI atlieka užduotį be pateiktų pavyzdžių, remdamasis tik instrukcija.',
    hint: 'Zero = nulis, shot = bandymas/pavyzdys. Zero-shot = be pavyzdžių.',
    bloomLevel: 1,
    relatedSlideId: 5,
    category: 'technikos',
  },
  {
    id: 'pool-technikos-3',
    type: 'true-false',
    question:
      'Promptų seka (prompt chaining) reiškia vieną labai ilgą promptą viename pranešime.',
    isTrue: false,
    explanation:
      'Neteisingai. Promptų seka = kelių atskirų promptų grandinė, kur kiekvieno rezultatas naudojamas kitame.',
    hint: 'Chaining = grandinė. Ar grandinė yra vienas ilgas elementas?',
    bloomLevel: 2,
    relatedSlideId: 5,
    category: 'technikos',
  },

  // ═══════════════════════════════════════════
  // SCENARIJAI (4 klausimai)
  // ═══════════════════════════════════════════
  {
    id: 'pool-scenario-1',
    type: 'scenario',
    scenarioContext:
      'Tu esi marketingo vadovas. Rašai promptą DI, kad sugeneruotų ketvirtinę pardavimų ataskaitą valdybai. Turi duomenis: 250k EUR pajamos, 1200 užsakymų, +15% augimas. Promptas prasideda: Esi vyresnysis verslo analitikas... ir baigiasi: Rezultatą pateik lentelėje su 5 stulpeliais.',
    question: 'Kurio bloko trūksta šiame prompte?',
    options: [
      'Reasoning – nenurodyta, kaip analizuoti duomenis',
      'Meta – nenurodyta rolė',
      'Input – nėra duomenų',
      'Output – nenurodytas formatas',
    ],
    correct: 0,
    explanation:
      'Promptas turi Meta (rolė), Input (duomenis) ir Output (lentelė), bet neturi Reasoning – kaip DI turėtų analizuoti.',
    hint: 'Palyginkite: kas jau yra (rolė, duomenys, formatas) ir ko trūksta iš 6 blokų.',
    bloomLevel: 4,
    relatedSlideId: 11,
    category: 'reasoning',
  },
  {
    id: 'pool-scenario-2',
    type: 'scenario',
    scenarioContext:
      'Kolega parašė promptą: Parašyk man straipsnį apie DI. Rezultatas – 3 puslapiai bendro teksto be struktūros, be šaltinių, anglų kalba (nors reikėjo lietuviškai).',
    question: 'Kas labiausiai pagerins šį promptą?',
    options: [
      'Pridėti Meta (rolė: žurnalistas), Output (1000 žodžių, lietuviškai, su šaltiniais) ir Quality (faktų tikslumas)',
      'Pridėti tik rašyk lietuviškai',
      'Pakartoti tą patį promptą dar kartą',
      'Pakeisti DI modelį į kitą',
    ],
    correct: 0,
    explanation:
      'Blogas rezultatas = nestruktūruotas promptas. Pridėjus Meta, Output ir Quality – rezultatas bus nuspėjamas.',
    hint: 'Pagalvok: kiek 6 blokų sistemos elementų trūksta šiame prompte?',
    bloomLevel: 3,
    relatedSlideId: 16,
    category: 'bendra',
  },
  {
    id: 'pool-scenario-3',
    type: 'scenario',
    scenarioContext:
      'Tau reikia HR ataskaitos apie darbuotojų pasitenkinimą. Turi apklausos duomenis: 156 darbuotojai, bendras pasitenkinimas 7.2/10, silpniausios sritys: komunikacija (5.8) ir karjeros galimybės (6.1). Nori ataskaitos lietuvių kalba su rekomendacijomis.',
    question:
      'Kuris blokas nustatytų, kad DI pirma analizuoja duomenis, tada išskirtų problemas sritis, galiausiai pateiktų rekomendacijas?',
    options: ['Reasoning', 'Meta', 'Output', 'Advanced'],
    correct: 0,
    explanation:
      'Reasoning blokas nurodo mąstymo seką: 1) Analizuok duomenis, 2) Išskirk problemines sritis, 3) Pateik rekomendacijas.',
    hint: 'Kuris blokas atsako į klausimą KAIP mąstyti prieš atsakant?',
    bloomLevel: 4,
    relatedSlideId: 11,
    category: 'reasoning',
  },
  {
    id: 'pool-scenario-4',
    type: 'scenario',
    scenarioContext:
      'Rašai promptą naujo SaaS produkto aprašymui. Tavo promptas: „Tu esi kopyraiteris. Parašyk produkto aprašymą mano svetainei. Produktas kainuoja 49 EUR/mėn ir automatizuoja 80% rutininių užduočių.“',
    question: 'Kuri iš šių rekomendacijų MAŽIAUSIAI pagerins šį promptą?',
    options: [
      'Pakeisti DI modelį iš GPT-4 į GPT-3.5',
      'Pridėti Output bloką: SEO optimizuotas, 500 žodžių, su CTA mygtukais',
      'Pridėti Quality bloką: tikslūs faktai, be perdėjimo',
      'Pridėti Reasoning bloką: pirma analizuok konkurentus, tada rask unikalumus',
    ],
    correct: 0,
    explanation:
      'DI modelio pakeitimas (GPT-4 vs GPT-3.5) mažiau padeda nei pridėti struktūrinius blokus (Output, Quality, Reasoning). Modelio keitimas liečia tik įrankį, o ne prompto struktūrą.',
    hint: 'Kuris pakeitimas yra apie įrankius, o ne apie prompto struktūrą?',
    bloomLevel: 4,
    relatedSlideId: 16,
    category: 'bendra',
  },
];

/** Categories available in the pool */
export const POOL_CATEGORIES = [
  'meta',
  'input',
  'output',
  'reasoning',
  'quality',
  'advanced',
  'bendra',
  'workflow',
  'technikos',
] as const;

export type PoolCategory = (typeof POOL_CATEGORIES)[number];
