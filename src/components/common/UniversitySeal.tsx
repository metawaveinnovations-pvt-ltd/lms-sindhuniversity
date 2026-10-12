import React, { useId } from 'react';
import statueHeroAsset from '../../assets/images/usindh_statue_hero_1791544134127.jpg';

interface UniversitySealProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  monochrome?: boolean;
  className?: string;
}

export const USINDH_SEAL_URL = '/usindh-official-logo.svg';
export const USINDH_STATUE_HERO_URL = statueHeroAsset;

export const UniversitySeal: React.FC<UniversitySealProps> = ({
  size = 'md',
  showText = false,
  monochrome = false,
  className = ''
}) => {
  const uid = useId().replace(/:/g, '');

  const dimensionMap = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-22 h-22',
    '2xl': 'w-28 h-28'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official University of Sindh Emblem — Original Design & Full Proportions (No Circular Clipping) */}
      <div
        className={`relative ${dimensionMap[size]} shrink-0 select-none flex items-center justify-center ${
          monochrome ? 'grayscale opacity-90' : ''
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 448"
          className="w-full h-full object-contain drop-shadow-2xs"
          role="img"
          aria-label="University of Sindh Official Emblem"
        >
          <defs>
            <clipPath id={`innerClip-${uid}`}>
              <circle cx="224" cy="240" r="111.5" />
            </clipPath>
            <path id={`topArabicArc-${uid}`} d="M 96,192 A 137,137 0 0,1 352,192" fill="none" />
            <path id={`leftUnivArc-${uid}`} d="M 118,327 A 137,137 0 0,1 102,178" fill="none" />
            <path id={`rightSindhArc-${uid}`} d="M 346,178 A 137,137 0 0,1 330,327" fill="none" />
            <path id={`bottomSindhiArc-${uid}`} d="M 114,328 A 141,141 0 0,0 334,328" fill="none" />
          </defs>

          {/* 1. LEFT & RIGHT TORCHES (BEHIND THE CIRCULAR RING) */}
          <g stroke="#141414" strokeLinejoin="round" strokeLinecap="round">
            {/* Left Torch Upper Blue Shaft */}
            <path d="M 104,84 L 104,132 L 125,115 L 125,84 Z" fill="#0072BC" strokeWidth="2.2" />
            <path
              d="M 107,85 L 107,96 M 110,85 L 110,94 M 113,85 L 113,93 M 116,85 L 116,94 M 119,85 L 119,96 M 122,85 L 122,98"
              stroke="#141414"
              strokeWidth="1.6"
            />
            {/* Left Torch Lower Blue Shaft & Tip */}
            <path d="M 119,352 L 125,414 L 129,360 Z" fill="#0072BC" strokeWidth="2.2" />
            <path d="M 122,388 L 127,388 M 123,395 L 126.5,395" stroke="#141414" strokeWidth="2" />
            <path d="M 123.5,400 L 125,414 L 126.2,400 Z" fill="#141414" />

            {/* Left Torch Terracotta Brown Bowl */}
            <rect x="99" y="77" width="31" height="7.5" rx="3.5" fill="#7D4E38" strokeWidth="2" />
            <rect x="92" y="68.5" width="45" height="8.5" rx="4" fill="#7D4E38" strokeWidth="2" />
            <path
              d="M 100,68.5 L 100,77 M 107,68.5 L 107,77 M 114.5,68.5 L 114.5,77 M 122,68.5 L 122,77 M 129,68.5 L 129,77"
              stroke="#141414"
              strokeWidth="1.6"
            />
            <rect x="96" y="61" width="37" height="7.5" rx="3" fill="#7D4E38" strokeWidth="2" />

            {/* Left Torch Multi-Tongued Brown Flame */}
            <path
              d="M 101,61 C 99,51 96,45 99,37 C 102,43 104,46 105,51 C 104,41 101,33 102,25 C 109,31 114,38 115,45 C 116,38 114,32 111,27 C 119,32 124,41 123,49 C 126,44 128,40 132,38 C 130,46 128,54 126,61 Z"
              fill="#7D4E38"
              strokeWidth="2"
            />
            <path
              d="M 107,61 C 107,52 109,45 107,38 M 114,61 C 115,52 117,46 116,39 M 120,61 C 121,54 123,49 125,45"
              fill="none"
              stroke="#141414"
              strokeWidth="1.5"
            />
          </g>

          <g stroke="#141414" strokeLinejoin="round" strokeLinecap="round">
            {/* Right Torch Upper Blue Shaft */}
            <path d="M 323,84 L 323,115 L 344,132 L 344,84 Z" fill="#0072BC" strokeWidth="2.2" />
            <path
              d="M 326,85 L 326,98 M 329,85 L 329,96 M 332,85 L 332,94 M 335,85 L 335,93 M 338,85 L 338,94 M 341,85 L 341,96"
              stroke="#141414"
              strokeWidth="1.6"
            />
            {/* Right Torch Lower Blue Shaft & Tip */}
            <path d="M 319,360 L 323,414 L 329,352 Z" fill="#0072BC" strokeWidth="2.2" />
            <path d="M 321,388 L 326,388 M 321.5,395 L 325,395" stroke="#141414" strokeWidth="2" />
            <path d="M 321.8,400 L 323,414 L 324.5,400 Z" fill="#141414" />

            {/* Right Torch Terracotta Brown Bowl */}
            <rect x="318" y="77" width="31" height="7.5" rx="3.5" fill="#7D4E38" strokeWidth="2" />
            <rect x="311" y="68.5" width="45" height="8.5" rx="4" fill="#7D4E38" strokeWidth="2" />
            <path
              d="M 319,68.5 L 319,77 M 326,68.5 L 326,77 M 333.5,68.5 L 333.5,77 M 341,68.5 L 341,77 M 348,68.5 L 348,77"
              stroke="#141414"
              strokeWidth="1.6"
            />
            <rect x="315" y="61" width="37" height="7.5" rx="3" fill="#7D4E38" strokeWidth="2" />

            {/* Right Torch Multi-Tongued Brown Flame */}
            <path
              d="M 322,61 C 320,54 318,46 316,38 C 320,40 322,44 325,49 C 324,41 329,32 337,27 C 334,32 332,38 333,45 C 334,38 339,31 346,25 C 347,33 344,41 343,51 C 344,46 346,43 349,37 C 352,45 349,51 347,61 Z"
              fill="#7D4E38"
              strokeWidth="2"
            />
            <path
              d="M 328,61 C 327,54 325,49 323,45 M 334,61 C 333,52 331,46 332,39 M 341,61 C 341,52 339,45 341,38"
              fill="none"
              stroke="#141414"
              strokeWidth="1.5"
            />
          </g>

          {/* 2. OUTER & INNER DOUBLE RINGS + OFFICIAL SILVER-GREY BAND */}
          <circle cx="224" cy="240" r="166" fill="#FFFFFF" stroke="#141414" strokeWidth="2.4" />
          <circle cx="224" cy="240" r="161.5" fill="#D8DADB" stroke="#141414" strokeWidth="2" />
          <circle cx="224" cy="240" r="116.5" fill="#FFFFFF" stroke="#141414" strokeWidth="2" />
          <circle cx="224" cy="240" r="112" fill="#FFFFFF" stroke="#141414" strokeWidth="2.2" />

          {/* 3. CENTRAL SCENE (SINDH MAP, SEA, MINARET, PALM TREES, CRESCENT) */}
          <g clipPath={`url(#innerClip-${uid})`}>
            <rect x="110" y="125" width="228" height="230" fill="#FFFFFF" />

            {/* Arabian Sea Blue Water with Horizontal Black Wave Lines */}
            <rect x="110" y="285" width="228" height="70" fill="#0068B5" stroke="#141414" strokeWidth="2" />
            <g stroke="#141414" strokeWidth="1.7">
              <line x1="110" y1="290.5" x2="338" y2="290.5" />
              <line x1="110" y1="296" x2="338" y2="296" />
              <line x1="110" y1="301.5" x2="338" y2="301.5" />
              <line x1="110" y1="307" x2="338" y2="307" />
              <line x1="110" y1="312.5" x2="338" y2="312.5" />
              <line x1="110" y1="318" x2="338" y2="318" />
              <line x1="110" y1="323.5" x2="338" y2="323.5" />
              <line x1="110" y1="329" x2="338" y2="329" />
              <line x1="110" y1="334.5" x2="338" y2="334.5" />
              <line x1="110" y1="340" x2="338" y2="340" />
              <line x1="110" y1="345.5" x2="338" y2="345.5" />
            </g>

            {/* Olive-Green Map of Sindh */}
            <path
              d="M 134,285 L 152,265 L 157,242 L 158,215 L 164,194 L 175,168 L 196,162 L 216,133 L 236,135 L 266,152 L 279,174 L 269,192 L 287,201 L 284,242 L 295,250 L 297,285 L 308,295 L 305,313 L 271,313 L 256,323 L 246,315 L 228,327 L 211,324 L 198,337 L 173,325 L 159,296 Z"
              fill="#84A433"
              stroke="#141414"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Internal Western River / Boundary Contour Line */}
            <path
              d="M 196,162 C 197,182 195,196 193,214 C 191,232 193,248 189,262 C 182,282 169,296 162,312"
              fill="none"
              stroke="#141414"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* White Crescent & 5-Pointed Star */}
            <g fill="#FFFFFF">
              <path d="M 231,180 A 11.5,11.5 0 1,0 250,192 A 9.2,9.2 0 1,1 231,180 Z" />
              <polygon points="241,173 242.4,177.2 246.8,177.2 243.2,179.8 244.6,184 241,181.4 237.4,184 238.8,179.8 235.2,177.2 239.6,177.2" />
            </g>

            {/* Two Deep-Green Palm / Date Trees */}
            <g>
              <path d="M 244,284 Q 261,279 276,283" fill="none" stroke="#007A33" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M 251,283 C 256,266 258,248 254,228" fill="none" stroke="#007A33" strokeWidth="3.8" strokeLinecap="round" />
              <path d="M 266,282 C 258,268 257,256 264,244" fill="none" stroke="#007A33" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 241,231 C 241,220 250,214 256,216 C 263,215 269,222 267,231 C 263,234 258,233 254,231 C 249,233 244,234 241,231 Z" fill="#007A33" />
              <path d="M 254,249 C 254,240 261,236 266,238 C 272,238 276,243 274,250 C 270,252 266,251 264,249 C 260,251 256,251 254,249 Z" fill="#007A33" />
            </g>

            {/* Central Terracotta-Brown Minaret */}
            <g fill="#9E6338" stroke="#141414" strokeWidth="1.8" strokeLinejoin="round">
              <path d="M 204,275 L 236,275 L 249,282 L 249,288 L 204,288 Z" />
              <path d="M 213,275 L 218,215 C 218,207 224,199 224,199 C 224,199 230,207 230,215 L 234,275 Z" />
              <line x1="217.5" y1="216" x2="230.5" y2="216" />
              <line x1="217" y1="222" x2="231" y2="222" />
              <line x1="215.5" y1="242" x2="232" y2="242" />
              <line x1="215" y1="247" x2="232.5" y2="247" />
              <path d="M 221,260 A 3,3 0 0,1 227,260 L 227,270 L 221,270 Z" fill="#7D4E38" />
              <circle cx="224" cy="233" r="2" fill="#141414" />
              <rect x="215" y="269" width="4" height="6" fill="#7D4E38" />
              <rect x="229" y="269" width="4" height="6" fill="#7D4E38" />
            </g>
          </g>

          {/* 4. OFFICIAL INSCRIPTIONS ON SILVER-GREY RING */}
          <text
            fill="#141414"
            fontFamily="'Cormorant Garamond', 'Traditional Arabic', serif"
            fontSize="26"
            fontWeight="700"
            textAnchor="middle"
            dominantBaseline="central"
          >
            <textPath href={`#topArabicArc-${uid}`} startOffset="50%">
              اُطْلُبُوا الْعِلْمَ مِنَ الْمَهْدِ اِلَى اللَّحْدِ
            </textPath>
          </text>

          <text
            fill="#141414"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="24.5"
            fontWeight="800"
            letterSpacing="2.5"
            textAnchor="middle"
            dominantBaseline="central"
          >
            <textPath href={`#leftUnivArc-${uid}`} startOffset="50%">
              UNIVERSITY
            </textPath>
          </text>

          <text
            fill="#141414"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="24.5"
            fontWeight="800"
            letterSpacing="3.5"
            textAnchor="middle"
            dominantBaseline="central"
          >
            <textPath href={`#rightSindhArc-${uid}`} startOffset="50%">
              OF SINDH
            </textPath>
          </text>

          <text
            fill="#141414"
            fontFamily="'Cormorant Garamond', 'Traditional Arabic', serif"
            fontSize="29"
            fontWeight="700"
            textAnchor="middle"
            dominantBaseline="central"
          >
            <textPath href={`#bottomSindhiArc-${uid}`} startOffset="50%">
              سنڌ يونيورسٽي
            </textPath>
          </text>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-tight text-[#004b87] text-sm sm:text-base leading-none">
              UNIVERSITY OF SINDH
            </span>
            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#eef4e3] text-[#4c6418] border border-[#84a433]/40 font-bold">
              ESTD 1947
            </span>
          </div>
          <span className="text-[11px] text-slate-600 font-medium tracking-wide mt-0.5">
            Allama II Qazi Campus, Jamshoro · Central LMS
          </span>
        </div>
      )}
    </div>
  );
};
