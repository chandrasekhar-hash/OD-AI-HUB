// High-resolution SVG Visual Assets for OD AI HUB Website
// Resolves duplicate/replaced image caching issues by providing dedicated vector artwork for every pillar, category, and testimonial.

(function () {
  // Helper to create clean data URIs from SVGs
  const svgUri = (svg) => 'data:image/svg+xml;utf8,' + encodeURIComponent(svg.trim());

  // 1. Business Pillar Cover Cards (5 businesses) - Warm Terracotta Theme
  const pillarCovers = [
    // Academy - Education & Code (Terracotta Palette)
    svgUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 160" width="400" height="160">
        <defs>
          <linearGradient id="bg0" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#20201D"/>
            <stop offset="60%" stop-color="#8F4A2D"/>
            <stop offset="100%" stop-color="#A65A3A"/>
          </linearGradient>
          <pattern id="grid0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="400" height="160" fill="url(#bg0)"/>
        <rect width="400" height="160" fill="url(#grid0)"/>
        <circle cx="340" cy="80" r="50" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
        <circle cx="340" cy="80" r="30" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-dasharray="4 4"/>
        <g transform="translate(40, 35)" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <!-- Graduation Cap & Code -->
          <polygon points="40 10 75 25 40 40 5 25" fill="rgba(255,255,255,0.15)"/>
          <path d="M15 31v20c0 8 11 15 25 15s25-7 25-15V31"/>
          <path d="M75 25v30"/>
        </g>
        <g transform="translate(140, 45)" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" opacity="0.9">
          <text x="0" y="24" font-size="18" font-weight="800" letter-spacing="-0.5">OD AI ACADEMY</text>
          <text x="0" y="44" font-size="11" font-weight="600" fill="#E5D4B8" letter-spacing="1">LEARN • CERTIFY • LEAD</text>
        </g>
      </svg>
    `),

    // Technologies - Cloud & Chips (Muted Olive Palette)
    svgUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 160" width="400" height="160">
        <defs>
          <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1d2218"/>
            <stop offset="60%" stop-color="#4e5642"/>
            <stop offset="100%" stop-color="#68705A"/>
          </linearGradient>
          <pattern id="grid1" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="400" height="160" fill="url(#bg1)"/>
        <rect width="400" height="160" fill="url(#grid1)"/>
        <g transform="translate(40, 35)" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <!-- Microprocessor / Cloud -->
          <rect x="15" y="15" width="50" height="50" rx="8" fill="rgba(255,255,255,0.15)"/>
          <path d="M25 15V5 M40 15V5 M55 15V5 M25 65v10 M40 65v10 M55 65v10 M15 25H5 M15 40H5 M15 55H5 M65 25h10 M65 40h10 M65 55h10"/>
          <circle cx="40" cy="40" r="8" fill="#E5D4B8"/>
        </g>
        <g transform="translate(140, 45)" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" opacity="0.9">
          <text x="0" y="24" font-size="18" font-weight="800" letter-spacing="-0.5">OD AI TECHNOLOGIES</text>
          <text x="0" y="44" font-size="11" font-weight="600" fill="#E5D4B8" letter-spacing="1">CLOUD • AI • ENTERPRISE</text>
        </g>
      </svg>
    `),

    // Innovation Lab - Robotics & Hardware (Aged Bronze Palette)
    svgUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 160" width="400" height="160">
        <defs>
          <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2a1b12"/>
            <stop offset="60%" stop-color="#6e4f35"/>
            <stop offset="100%" stop-color="#8C684B"/>
          </linearGradient>
          <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="400" height="160" fill="url(#bg2)"/>
        <rect width="400" height="160" fill="url(#grid2)"/>
        <g transform="translate(40, 35)" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <!-- Atom / Robotics Orbit -->
          <circle cx="40" cy="40" r="12" fill="#E5D4B8"/>
          <ellipse cx="40" cy="40" rx="34" ry="14" transform="rotate(30 40 40)"/>
          <ellipse cx="40" cy="40" rx="34" ry="14" transform="rotate(-30 40 40)"/>
        </g>
        <g transform="translate(140, 45)" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" opacity="0.9">
          <text x="0" y="24" font-size="18" font-weight="800" letter-spacing="-0.5">OD AI INNOVATION LAB</text>
          <text x="0" y="44" font-size="11" font-weight="600" fill="#E5D4B8" letter-spacing="1">ROBOTICS • IOT • R&amp;D</text>
        </g>
      </svg>
    `),

    // Startups - Rocket & Incubation (Terracotta Rust Palette)
    svgUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 160" width="400" height="160">
        <defs>
          <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2e1810"/>
            <stop offset="60%" stop-color="#703823"/>
            <stop offset="100%" stop-color="#8F4A2D"/>
          </linearGradient>
          <pattern id="grid3" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="400" height="160" fill="url(#bg3)"/>
        <rect width="400" height="160" fill="url(#grid3)"/>
        <g transform="translate(45, 35)" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <!-- Rocket -->
          <path d="M35 10 C35 10 20 25 20 48 L28 54 L35 44 L42 54 L50 48 C50 25 35 10 35 10 Z" fill="rgba(255,255,255,0.2)"/>
          <circle cx="35" cy="28" r="4" fill="#E5D4B8"/>
          <path d="M15 50 L10 65 L25 58 M55 50 L60 65 L45 58 M35 55 L35 70" stroke="#E5D4B8"/>
        </g>
        <g transform="translate(140, 45)" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" opacity="0.9">
          <text x="0" y="24" font-size="18" font-weight="800" letter-spacing="-0.5">OD AI STARTUPS</text>
          <text x="0" y="44" font-size="11" font-weight="600" fill="#E5D4B8" letter-spacing="1">IDEATION • MVP • VENTURES</text>
        </g>
      </svg>
    `),

    // For Business - Enterprise & Growth (Deep Terracotta Palette)
    svgUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 160" width="400" height="160">
        <defs>
          <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2a1710"/>
            <stop offset="60%" stop-color="#783d26"/>
            <stop offset="100%" stop-color="#A65A3A"/>
          </linearGradient>
          <pattern id="grid4" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="400" height="160" fill="url(#bg4)"/>
        <rect width="400" height="160" fill="url(#grid4)"/>
        <g transform="translate(45, 35)" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <!-- Enterprise Towers & Analytics -->
          <rect x="10" y="20" width="22" height="50" rx="3" fill="rgba(255,255,255,0.15)"/>
          <rect x="38" y="5" width="26" height="65" rx="3" fill="rgba(255,255,255,0.25)"/>
          <line x1="18" y1="30" x2="24" y2="30"/>
          <line x1="18" y1="42" x2="24" y2="42"/>
          <line x1="48" y1="20" x2="56" y2="20"/>
          <line x1="48" y1="35" x2="56" y2="35"/>
          <line x1="48" y1="50" x2="56" y2="50"/>
        </g>
        <g transform="translate(140, 45)" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" opacity="0.9">
          <text x="0" y="24" font-size="18" font-weight="800" letter-spacing="-0.5">FOR BUSINESS</text>
          <text x="0" y="44" font-size="11" font-weight="600" fill="#E5D4B8" letter-spacing="1">AUTOMATION • ROI • IMPACT</text>
        </g>
      </svg>
    `)
  ];

  // 2. Academy 6 Categories Cover Cards
  const categoryCovers = [
    // School Programs
    pillarCovers[0],
    // Diploma Programs
    pillarCovers[1],
    // College Tech Programs
    pillarCovers[2],
    // College Non-Tech Programs
    pillarCovers[3],
    // Career Accelerators
    pillarCovers[4],
    // Corporate & Custom Training (Muted Olive)
    svgUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 160" width="400" height="160">
        <defs>
          <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1d2218"/>
            <stop offset="60%" stop-color="#4e5642"/>
            <stop offset="100%" stop-color="#68705A"/>
          </linearGradient>
          <pattern id="grid5" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="400" height="160" fill="url(#bg5)"/>
        <rect width="400" height="160" fill="url(#grid5)"/>
        <g transform="translate(45, 35)" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="35" cy="35" r="28" fill="rgba(255,255,255,0.15)"/>
          <path d="M22 35l9 9 17-17"/>
        </g>
        <g transform="translate(140, 45)" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" opacity="0.9">
          <text x="0" y="24" font-size="18" font-weight="800" letter-spacing="-0.5">CORPORATE TRAINING</text>
          <text x="0" y="44" font-size="11" font-weight="600" fill="#E5D4B8" letter-spacing="1">UPSKILLING • WORKSHOPS</text>
        </g>
      </svg>
    `)
  ];

  // 3. Testimonial Avatars (Warm Earthy Vector Personas)
  const avatars = [
    // Rohan Patra (Terracotta)
    svgUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
        <defs>
          <linearGradient id="av0" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8F4A2D"/>
            <stop offset="100%" stop-color="#A65A3A"/>
          </linearGradient>
        </defs>
        <circle cx="40" cy="40" r="38" fill="url(#av0)" stroke="#ffffff" stroke-width="2"/>
        <text x="40" y="47" font-family="'Plus Jakarta Sans', sans-serif" font-size="24" font-weight="800" fill="#ffffff" text-anchor="middle">RP</text>
        <circle cx="64" cy="64" r="8" fill="#E5D4B8" stroke="#20201D" stroke-width="2"/>
      </svg>
    `),
    // Ananya Das (Muted Olive)
    svgUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
        <defs>
          <linearGradient id="av1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4e5642"/>
            <stop offset="100%" stop-color="#68705A"/>
          </linearGradient>
        </defs>
        <circle cx="40" cy="40" r="38" fill="url(#av1)" stroke="#ffffff" stroke-width="2"/>
        <text x="40" y="47" font-family="'Plus Jakarta Sans', sans-serif" font-size="24" font-weight="800" fill="#ffffff" text-anchor="middle">AD</text>
        <circle cx="64" cy="64" r="8" fill="#E5D4B8" stroke="#20201D" stroke-width="2"/>
      </svg>
    `),
    // Siddharth Mishra (Aged Bronze)
    svgUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
        <defs>
          <linearGradient id="av2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6e4f35"/>
            <stop offset="100%" stop-color="#8C684B"/>
          </linearGradient>
        </defs>
        <circle cx="40" cy="40" r="38" fill="url(#av2)" stroke="#ffffff" stroke-width="2"/>
        <text x="40" y="47" font-family="'Plus Jakarta Sans', sans-serif" font-size="24" font-weight="800" fill="#ffffff" text-anchor="middle">SM</text>
        <circle cx="64" cy="64" r="8" fill="#E5D4B8" stroke="#20201D" stroke-width="2"/>
      </svg>
    `)
  ];

  // 4. Odisha Digital Map with Berhampur Tech Pulse Marker (Warm Sandstone & Terracotta)
  const odishaMap = svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 280" width="320" height="280">
      <defs>
        <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F7F3EA"/>
          <stop offset="100%" stop-color="#E5D4B8"/>
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <!-- Stylized State Shape of Odisha -->
      <path d="M90 40 Q150 20 220 50 Q280 80 290 140 Q280 200 230 230 Q170 260 120 240 Q70 210 60 150 Q50 90 90 40 Z" fill="url(#mapBg)" stroke="#A65A3A" stroke-width="2.5" stroke-dasharray="4 2"/>
      
      <!-- Internal Digital Connect Network Lines -->
      <path d="M120 210 L180 130 L230 90 M180 130 L220 160" stroke="#A65A3A" stroke-width="1.5" stroke-opacity="0.4" fill="none"/>
      
      <!-- Bhubaneswar Node -->
      <circle cx="180" cy="130" r="4.5" fill="#A65A3A"/>
      <text x="188" y="133" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#20201D">Bhubaneswar</text>
      
      <!-- Cuttack Node -->
      <circle cx="195" cy="115" r="3.5" fill="#8C684B"/>
      <text x="203" y="117" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="#8C684B">Cuttack</text>

      <!-- Rourkela Node -->
      <circle cx="150" cy="55" r="3.5" fill="#8C684B"/>
      <text x="158" y="58" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="#8C684B">Rourkela</text>

      <!-- Sambalpur Node -->
      <circle cx="110" cy="100" r="3.5" fill="#8C684B"/>
      <text x="75" y="112" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="#8C684B">Sambalpur</text>

      <!-- Berhampur (OD AI HUB HQ - Pulse Highlight) -->
      <circle cx="120" cy="210" r="16" fill="rgba(166, 90, 58, 0.25)" filter="url(#glow)"/>
      <circle cx="120" cy="210" r="9" fill="#A65A3A"/>
      <circle cx="120" cy="210" r="4.5" fill="#ffffff"/>
      <rect x="50" y="222" width="140" height="26" rx="6" fill="#20201D" stroke="#A65A3A" stroke-width="1.2"/>
      <text x="120" y="238" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="800" fill="#F7F3EA" text-anchor="middle">★ BERHAMPUR (HQ)</text>
    </svg>
  `);

  window.IMG = {
    hero: pillarCovers[0],
    logo: "/static/logo.jpg",
    map: odishaMap,
    c: pillarCovers,
    cat: categoryCovers,
    a: avatars
  };
})();
