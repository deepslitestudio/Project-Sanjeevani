// Government Health Application style cartoon avatars (inspired by ABHA / CoWIN / Ayushman Bharat / eSanjeevani)

// Clean SVG cartoon illustrations encoded as data URLs
export const GOVT_CARTOON_CITIZEN = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8F5E9" />
      <stop offset="100%" stop-color="#C8E6C9" />
    </linearGradient>
    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1B5E20" />
      <stop offset="100%" stop-color="#2E7D32" />
    </linearGradient>
  </defs>
  <!-- Background Circle -->
  <circle cx="60" cy="60" r="58" fill="url(#bgGrad)" stroke="#81C784" stroke-width="3" />
  
  <!-- Govt Health Cross Pattern in Background -->
  <path d="M54 14 h12 v8 h-12 z M54 26 h12 v8 h-12 z" fill="#A5D6A7" opacity="0.4" />

  <!-- Body / Torso -->
  <path d="M22 108 C24 82, 38 72, 60 72 C82 72, 96 82, 98 108 Z" fill="#2E6B4F" />
  <!-- Nehru Collar / Govt Style Jacket Collar -->
  <path d="M52 72 L60 84 L68 72 Z" fill="#FFFFFF" />
  <circle cx="60" cy="94" r="2.5" fill="#E5DEC9" />
  <circle cx="60" cy="102" r="2.5" fill="#E5DEC9" />

  <!-- Neck -->
  <rect x="52" y="60" width="16" height="16" rx="4" fill="#F5CBA7" />

  <!-- Head -->
  <ellipse cx="60" cy="46" rx="22" ry="24" fill="#F5CBA7" />

  <!-- Neat Hair -->
  <path d="M38 42 C38 24, 82 24, 82 42 C80 34, 72 30, 60 30 C48 30, 40 34, 38 42 Z" fill="#263238" />
  <path d="M38 42 C40 34, 48 32, 54 36 C48 37, 42 41, 38 46 Z" fill="#263238" />

  <!-- Ears -->
  <circle cx="37" cy="47" r="4.5" fill="#F5CBA7" />
  <circle cx="83" cy="47" r="4.5" fill="#F5CBA7" />

  <!-- Eyes - Cartoon Friendly -->
  <ellipse cx="51" cy="45" rx="3" ry="3.5" fill="#263238" />
  <circle cx="50" cy="43.5" r="1" fill="#FFFFFF" />
  <ellipse cx="69" cy="45" rx="3" ry="3.5" fill="#263238" />
  <circle cx="68" cy="43.5" r="1" fill="#FFFFFF" />

  <!-- Eyebrows -->
  <path d="M46 39 Q51 36 56 39" stroke="#263238" stroke-width="2" stroke-linecap="round" fill="none" />
  <path d="M64 39 Q69 36 74 39" stroke="#263238" stroke-width="2" stroke-linecap="round" fill="none" />

  <!-- Nose -->
  <path d="M60 46 Q58 50 60 52" stroke="#D35400" stroke-width="1.8" stroke-linecap="round" fill="none" />

  <!-- Friendly Smile -->
  <path d="M52 54 Q60 60 68 54" stroke="#C0392B" stroke-width="2.5" stroke-linecap="round" fill="none" />
  <!-- Cheeks -->
  <circle cx="46" cy="51" r="3.5" fill="#F1948A" opacity="0.6" />
  <circle cx="74" cy="51" r="3.5" fill="#F1948A" opacity="0.6" />

  <!-- Official Govt Health Badge / ABHA Logo Inspired Shield -->
  <g transform="translate(80, 80)">
    <circle cx="16" cy="16" r="15" fill="url(#badgeGrad)" stroke="#FFFFFF" stroke-width="2" />
    <!-- White Medical Plus Cross -->
    <rect x="13" y="7" width="6" height="18" rx="2" fill="#FFFFFF" />
    <rect x="7" y="13" width="18" height="6" rx="2" fill="#FFFFFF" />
  </g>
</svg>
`)}`;

export const GOVT_CARTOON_FEMALE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="bgFem" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF3E0" />
      <stop offset="100%" stop-color="#FFE0B2" />
    </linearGradient>
    <linearGradient id="badgeGradFem" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0288D1" />
      <stop offset="100%" stop-color="#0277BD" />
    </linearGradient>
  </defs>
  <!-- Background Circle -->
  <circle cx="60" cy="60" r="58" fill="url(#bgFem)" stroke="#FFB74D" stroke-width="3" />

  <!-- Torso / Saree / Kurti -->
  <path d="M22 108 C25 82, 38 72, 60 72 C82 72, 95 82, 98 108 Z" fill="#E65100" />
  <!-- Pallu / Shawl Fold -->
  <path d="M34 76 C42 88, 52 108, 55 108 L28 108 Z" fill="#BF360C" />
  <path d="M52 72 L60 84 L68 72 Z" fill="#FFF3E0" />

  <!-- Neck -->
  <rect x="52" y="60" width="16" height="16" rx="4" fill="#F5CBA7" />
  <!-- Simple Chain/Necklace -->
  <path d="M50 72 Q60 80 70 72" stroke="#FFD54F" stroke-width="2" fill="none" />

  <!-- Long Hair Behind -->
  <path d="M34 46 C32 68, 36 86, 42 94 C44 94, 46 90, 44 80 C40 68, 38 56, 38 46 Z" fill="#212121" />
  <path d="M86 46 C88 68, 84 86, 78 94 C76 94, 74 90, 76 80 C80 68, 82 56, 82 46 Z" fill="#212121" />

  <!-- Head -->
  <ellipse cx="60" cy="46" rx="21" ry="23" fill="#F5CBA7" />

  <!-- Front Hair with Neat Center Parting -->
  <path d="M38 42 C40 26, 80 26, 82 42 C76 34, 68 32, 60 36 C52 32, 44 34, 38 42 Z" fill="#212121" />

  <!-- Traditional Red Bindi (Govt health persona style) -->
  <circle cx="60" cy="38" r="2.2" fill="#C62828" />

  <!-- Ears & Earrings -->
  <circle cx="38" cy="47" r="4" fill="#F5CBA7" />
  <circle cx="38" cy="52" r="2.2" fill="#FFD54F" />
  <circle cx="82" cy="47" r="4" fill="#F5CBA7" />
  <circle cx="82" cy="52" r="2.2" fill="#FFD54F" />

  <!-- Big Kind Eyes -->
  <ellipse cx="51" cy="45" rx="3.2" ry="3.8" fill="#212121" />
  <circle cx="50" cy="43.5" r="1.2" fill="#FFFFFF" />
  <ellipse cx="69" cy="45" rx="3.2" ry="3.8" fill="#212121" />
  <circle cx="68" cy="43.5" r="1.2" fill="#FFFFFF" />

  <!-- Eyelashes & Brows -->
  <path d="M46 39 Q51 36 56 39" stroke="#212121" stroke-width="1.8" stroke-linecap="round" fill="none" />
  <path d="M64 39 Q69 36 74 39" stroke="#212121" stroke-width="1.8" stroke-linecap="round" fill="none" />

  <!-- Nose Pin & Smile -->
  <circle cx="57" cy="49" r="1.2" fill="#FFD54F" />
  <path d="M53 54 Q60 61 67 54" stroke="#B71C1C" stroke-width="2.5" stroke-linecap="round" fill="none" />
  <!-- Warm Rosy Cheeks -->
  <circle cx="45" cy="51" r="3.5" fill="#EF9A9A" opacity="0.6" />
  <circle cx="75" cy="51" r="3.5" fill="#EF9A9A" opacity="0.6" />

  <!-- Health Badge -->
  <g transform="translate(80, 80)">
    <circle cx="16" cy="16" r="15" fill="url(#badgeGradFem)" stroke="#FFFFFF" stroke-width="2" />
    <rect x="13" y="7" width="6" height="18" rx="2" fill="#FFFFFF" />
    <rect x="7" y="13" width="18" height="6" rx="2" fill="#FFFFFF" />
  </g>
</svg>
`)}`;

export const GOVT_CARTOON_MALE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="bgMale" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E1F5FE" />
      <stop offset="100%" stop-color="#B3E5FC" />
    </linearGradient>
    <linearGradient id="badgeGradMale" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00695C" />
      <stop offset="100%" stop-color="#004D40" />
    </linearGradient>
  </defs>
  <!-- Background -->
  <circle cx="60" cy="60" r="58" fill="url(#bgMale)" stroke="#4FC3F7" stroke-width="3" />

  <!-- Torso - Blue Shirt / Kurta -->
  <path d="M22 108 C25 82, 38 72, 60 72 C82 72, 95 82, 98 108 Z" fill="#0277BD" />
  <path d="M52 72 L60 84 L68 72 Z" fill="#E1F5FE" />
  <circle cx="60" cy="92" r="2.5" fill="#FFFFFF" />
  <circle cx="60" cy="100" r="2.5" fill="#FFFFFF" />

  <!-- Neck -->
  <rect x="52" y="60" width="16" height="16" rx="4" fill="#F5CBA7" />

  <!-- Head -->
  <ellipse cx="60" cy="46" rx="22" ry="24" fill="#F5CBA7" />

  <!-- Side-Parted Neat Hair -->
  <path d="M38 42 C38 23, 82 23, 82 42 C82 32, 72 26, 60 26 C46 26, 40 32, 38 42 Z" fill="#212121" />
  <path d="M40 34 Q55 28 68 34" stroke="#212121" stroke-width="4" stroke-linecap="round" fill="none" />

  <!-- Ears -->
  <circle cx="37" cy="47" r="4.5" fill="#F5CBA7" />
  <circle cx="83" cy="47" r="4.5" fill="#F5CBA7" />

  <!-- Eyes -->
  <ellipse cx="51" cy="45" rx="3" ry="3.5" fill="#212121" />
  <circle cx="50" cy="43.5" r="1" fill="#FFFFFF" />
  <ellipse cx="69" cy="45" rx="3" ry="3.5" fill="#212121" />
  <circle cx="68" cy="43.5" r="1" fill="#FFFFFF" />

  <!-- Brows & Nose -->
  <path d="M46 39 Q51 36 56 39" stroke="#212121" stroke-width="2" stroke-linecap="round" fill="none" />
  <path d="M64 39 Q69 36 74 39" stroke="#212121" stroke-width="2" stroke-linecap="round" fill="none" />
  <path d="M60 45 Q58 50 60 52" stroke="#D35400" stroke-width="1.8" stroke-linecap="round" fill="none" />

  <!-- Neat Mustache - Authentic Govt Healthcare Character -->
  <path d="M52 53 Q56 50 60 52 Q64 50 68 53 Q60 56 52 53 Z" fill="#263238" />

  <!-- Smile below mustache -->
  <path d="M54 57 Q60 61 66 57" stroke="#C0392B" stroke-width="2" stroke-linecap="round" fill="none" />

  <!-- Health Badge -->
  <g transform="translate(80, 80)">
    <circle cx="16" cy="16" r="15" fill="url(#badgeGradMale)" stroke="#FFFFFF" stroke-width="2" />
    <rect x="13" y="7" width="6" height="18" rx="2" fill="#FFFFFF" />
    <rect x="7" y="13" width="18" height="6" rx="2" fill="#FFFFFF" />
  </g>
</svg>
`)}`;

export const GOVT_CARTOON_SENIOR = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="bgSen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F3E5F5" />
      <stop offset="100%" stop-color="#E1BEE7" />
    </linearGradient>
    <linearGradient id="badgeGradSen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6A1B9A" />
      <stop offset="100%" stop-color="#4A148C" />
    </linearGradient>
  </defs>
  <circle cx="60" cy="60" r="58" fill="url(#bgSen)" stroke="#BA68C8" stroke-width="3" />

  <!-- Torso - Khadi Kurta / Vest -->
  <path d="M22 108 C25 82, 38 72, 60 72 C82 72, 95 82, 98 108 Z" fill="#546E7A" />
  <path d="M52 72 L60 84 L68 72 Z" fill="#ECEFF1" />
  <circle cx="60" cy="92" r="2.5" fill="#CFD8DC" />

  <!-- Neck -->
  <rect x="52" y="60" width="16" height="16" rx="4" fill="#F5CBA7" />

  <!-- Head -->
  <ellipse cx="60" cy="46" rx="22" ry="24" fill="#F5CBA7" />

  <!-- Silver / White Hair -->
  <path d="M36 44 C34 26, 86 26, 84 44 C82 32, 74 27, 60 27 C46 27, 38 32, 36 44 Z" fill="#ECEFF1" stroke="#B0BEC5" stroke-width="1.5" />
  <!-- Sideburns -->
  <path d="M37 40 L37 49 L41 45 Z" fill="#ECEFF1" />
  <path d="M83 40 L83 49 L79 45 Z" fill="#ECEFF1" />

  <!-- Ears -->
  <circle cx="37" cy="48" r="4.5" fill="#F5CBA7" />
  <circle cx="83" cy="48" r="4.5" fill="#F5CBA7" />

  <!-- Round Glasses / Spectacles -->
  <circle cx="51" cy="45" r="7" fill="#FFFFFF" fill-opacity="0.3" stroke="#37474F" stroke-width="2" />
  <circle cx="69" cy="45" r="7" fill="#FFFFFF" fill-opacity="0.3" stroke="#37474F" stroke-width="2" />
  <line x1="58" y1="45" x2="62" y2="45" stroke="#37474F" stroke-width="2" />
  <line x1="44" y1="45" x2="38" y2="44" stroke="#37474F" stroke-width="1.5" />
  <line x1="76" y1="45" x2="82" y2="44" stroke="#37474F" stroke-width="1.5" />

  <!-- Kind Eyes through glasses -->
  <ellipse cx="51" cy="45" rx="2.5" ry="3" fill="#263238" />
  <ellipse cx="69" cy="45" rx="2.5" ry="3" fill="#263238" />

  <!-- Wisdom Eyebrows (White) -->
  <path d="M45 36 Q51 34 56 37" stroke="#CFD8DC" stroke-width="2.5" stroke-linecap="round" fill="none" />
  <path d="M64 37 Q69 34 75 36" stroke="#CFD8DC" stroke-width="2.5" stroke-linecap="round" fill="none" />

  <!-- Nose & Gentle Warm Smile -->
  <path d="M60 45 Q58 50 60 52" stroke="#D35400" stroke-width="1.8" stroke-linecap="round" fill="none" />
  <path d="M53 55 Q60 61 67 55" stroke="#B71C1C" stroke-width="2.2" stroke-linecap="round" fill="none" />

  <!-- Health Badge -->
  <g transform="translate(80, 80)">
    <circle cx="16" cy="16" r="15" fill="url(#badgeGradSen)" stroke="#FFFFFF" stroke-width="2" />
    <rect x="13" y="7" width="6" height="18" rx="2" fill="#FFFFFF" />
    <rect x="7" y="13" width="18" height="6" rx="2" fill="#FFFFFF" />
  </g>
</svg>
`)}`;

export const GOVT_CARTOON_CHILD = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="bgKid" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDE7" />
      <stop offset="100%" stop-color="#FFF9C4" />
    </linearGradient>
    <linearGradient id="badgeGradKid" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F57F17" />
      <stop offset="100%" stop-color="#E65100" />
    </linearGradient>
  </defs>
  <circle cx="60" cy="60" r="58" fill="url(#bgKid)" stroke="#FFF176" stroke-width="3" />

  <!-- Torso - Bright Yellow/Green T-shirt -->
  <path d="M26 108 C28 85, 40 76, 60 76 C80 76, 92 85, 94 108 Z" fill="#43A047" />
  <!-- Round Crewneck -->
  <path d="M52 76 Q60 84 68 76 Z" fill="#FFFDE7" />

  <!-- Neck -->
  <rect x="53" y="64" width="14" height="14" rx="4" fill="#F5CBA7" />

  <!-- Cute Round Head -->
  <ellipse cx="60" cy="48" rx="23" ry="23" fill="#F5CBA7" />

  <!-- Playful Cartoon Hair -->
  <path d="M37 45 C38 28, 82 28, 83 45 C78 35, 70 32, 60 32 C50 32, 42 35, 37 45 Z" fill="#212121" />
  <!-- Hair Tuft -->
  <path d="M58 28 Q60 20 65 24 Q62 27 60 30" fill="#212121" />

  <!-- Big Chubby Cheeks -->
  <circle cx="43" cy="54" r="4.5" fill="#FF8A80" opacity="0.7" />
  <circle cx="77" cy="54" r="4.5" fill="#FF8A80" opacity="0.7" />

  <!-- Big Sparkly Eyes -->
  <ellipse cx="50" cy="46" rx="3.8" ry="4.2" fill="#212121" />
  <circle cx="48.5" cy="44.5" r="1.4" fill="#FFFFFF" />
  <circle cx="51.5" cy="47.5" r="0.8" fill="#FFFFFF" />

  <ellipse cx="70" cy="46" rx="3.8" ry="4.2" fill="#212121" />
  <circle cx="68.5" cy="44.5" r="1.4" fill="#FFFFFF" />
  <circle cx="71.5" cy="47.5" r="0.8" fill="#FFFFFF" />

  <!-- Small Happy Eyebrows -->
  <path d="M45 40 Q50 37 54 40" stroke="#212121" stroke-width="1.8" stroke-linecap="round" fill="none" />
  <path d="M66 40 Q70 37 75 40" stroke="#212121" stroke-width="1.8" stroke-linecap="round" fill="none" />

  <!-- Cute Button Nose -->
  <circle cx="60" cy="50" r="1.5" fill="#E67E22" />

  <!-- Cheerful Wide Smile -->
  <path d="M51 54 Q60 63 69 54 Z" fill="#C0392B" />
  <path d="M54 55 Q60 58 66 55" fill="#FFFFFF" />

  <!-- Health Shield Badge -->
  <g transform="translate(80, 80)">
    <circle cx="16" cy="16" r="15" fill="url(#badgeGradKid)" stroke="#FFFFFF" stroke-width="2" />
    <rect x="13" y="7" width="6" height="18" rx="2" fill="#FFFFFF" />
    <rect x="7" y="13" width="18" height="6" rx="2" fill="#FFFFFF" />
  </g>
</svg>
`)}`;

export interface GovtCartoonPreset {
  id: string;
  name: string;
  category: string;
  avatar: string;
}

export const GOVT_CARTOON_PRESETS: GovtCartoonPreset[] = [
  { id: 'citizen', name: 'Citizen / Self', category: 'General', avatar: GOVT_CARTOON_CITIZEN },
  { id: 'female', name: 'Female / Mother', category: 'Adult Female', avatar: GOVT_CARTOON_FEMALE },
  { id: 'male', name: 'Male / Father', category: 'Adult Male', avatar: GOVT_CARTOON_MALE },
  { id: 'senior', name: 'Senior / Grandparent', category: 'Elderly (60+)', avatar: GOVT_CARTOON_SENIOR },
  { id: 'child', name: 'Child / Infant', category: 'Kid (0-16)', avatar: GOVT_CARTOON_CHILD },
];

/**
 * Returns a Government Health cartoon avatar based on gender, age, relation, or fallback
 */
export function getDefaultGovtAvatar(params?: {
  gender?: string;
  age?: number;
  relation?: string;
}): string {
  if (!params) return GOVT_CARTOON_CITIZEN;
  const { gender, age, relation } = params;

  if (age !== undefined) {
    if (age <= 16) return GOVT_CARTOON_CHILD;
    if (age >= 60) return GOVT_CARTOON_SENIOR;
  }

  const rel = (relation || '').toLowerCase();
  if (rel.includes('daughter') || rel.includes('son') || rel.includes('child') || rel.includes('baby')) {
    return GOVT_CARTOON_CHILD;
  }
  if (rel.includes('grand') || rel.includes('nana') || rel.includes('dada') || rel.includes('dadi') || rel.includes('nani')) {
    return GOVT_CARTOON_SENIOR;
  }
  if (rel.includes('mother') || rel.includes('wife') || rel.includes('sister') || rel.includes('maa') || rel.includes('amma')) {
    return GOVT_CARTOON_FEMALE;
  }
  if (rel.includes('father') || rel.includes('husband') || rel.includes('brother') || rel.includes('papa') || rel.includes('nanna')) {
    return GOVT_CARTOON_MALE;
  }

  const gen = (gender || '').toLowerCase();
  if (gen === 'female') return GOVT_CARTOON_FEMALE;
  if (gen === 'male') return GOVT_CARTOON_MALE;

  return GOVT_CARTOON_CITIZEN;
}
