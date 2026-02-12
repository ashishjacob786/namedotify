import { universe } from './symbols';

/**
 * 1. UNICODE CONVERTER
 * Normal text ko Mathematical/Stylish fonts mein convert karta hai.
 */
const toUnicode = (text, startOffset) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);

    // Special Handling for Squared/Enclosed styles (Different offset logic)
    if (startOffset === 0x1F130 || startOffset === 0x24B6) {
      if (code >= 65 && code <= 90) return String.fromCodePoint(startOffset + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(startOffset + (code - 97)); // Usually mapped to same for caps
    }

    // Standard Mathematical Alphanumeric Symbols
    if (code >= 65 && code <= 90) return String.fromCodePoint(startOffset + (code - 65)); // A-Z
    if (code >= 97 && code <= 122) return String.fromCodePoint(startOffset + 26 + (code - 97)); // a-z
    
    // Numbers 0-9 (Basic mapping if style supports it, else return as is)
    if (code >= 48 && code <= 57 && startOffset > 0x1D7CE) {
      return String.fromCodePoint(startOffset + (code - 48)); 
    }
    
    return char;
  }).join('');
};

/**
 * 2. ZALGO / GLITCH GENERATOR
 * Text ke upar aur niche random marks add karta hai.
 */
const toGlitch = (text) => {
  if (!universe.glitchChars) return text;
  return text.split('').map(char => {
    let glitch = char;
    // Add 2 random marks above/below
    for (let i = 0; i < 2; i++) {
      glitch += universe.glitchChars[Math.floor(Math.random() * universe.glitchChars.length)];
    }
    return glitch;
  }).join('');
};

/**
 * 3. THE MEGA ENGINE (5 CRORE COMBINATIONS)
 * Based on 'offset', generate unique design.
 */
export const generateBatch = (input, offset = 0, limit = 50) => {
  if (!input) return [];
  const results = [];
  
  // Flatten all templates for easy access
  const allTemplates = [
    ...(universe.templates?.weapons || []),
    ...(universe.templates?.emotions || []),
    ...(universe.templates?.nature || []),
    ...(universe.templates?.borders || []),
    ...(universe.templates?.music || [])
  ];

  for (let i = offset; i < offset + limit; i++) {
    // A. Select Base Style (Rotate through 50+ styles)
    const styleIndex = i % (universe.styles?.length || 1);
    const style = universe.styles?.[styleIndex] || { name: 'Normal', start: 0 };
    
    // B. Apply Unicode Conversion
    let styledText = toUnicode(input, style.start);

    // C. Determine Design Strategy (Rotate logic every 10 items)
    let finalDesign = "";
    const strategy = i % 12; // 12 different algorithms

    // D. The Mixing Logic
    const decorator = universe.decorators?.[i % (universe.decorators?.length || 1)] || "★";
    const template = allTemplates[i % allTemplates.length]; // Rotate through 1000+ templates

    switch (strategy) {
      case 0: // Pure Unicode Style
        finalDesign = styledText;
        break;
      
      case 1: // Template Injection (Gun, Heart, etc.)
        finalDesign = template.replace("[TEXT]", styledText);
        break;

      case 2: // Double Decorator
        finalDesign = `${decorator} ${styledText} ${decorator}`;
        break;

      case 3: // Triple Decorator with Spacing
        finalDesign = `${decorator} ${decorator} ${styledText} ${decorator} ${decorator}`;
        break;

      case 4: // Glitch Mode (Zalgo)
        finalDesign = toGlitch(input); // Glitch usually looks better on normal text
        break;

      case 5: // Border Style (Using Template + Unicode)
        finalDesign = template.replace("[TEXT]", `${decorator} ${styledText} ${decorator}`);
        break;

      case 6: // Compact (No Spaces)
        finalDesign = `${decorator}${styledText}${decorator}`;
        break;

      case 7: // Reverse Mirror (e.g., ★ Text ★) -> if logic exists
         finalDesign = `${decorator} ${styledText} ${decorator}`; 
         // Note: For true mirroring, we need a reverse map, simpler to use symmetric decorators.
        break;

      case 8: // Massive Line (Full Width)
        finalDesign = `━━━━━━━━ ${styledText} ━━━━━━━━`;
        break;
      
      case 9: // Sparkles Logic
        finalDesign = `*:･ﾟ✧ ${styledText} ✧･ﾟ:*`;
        break;

      case 10: // Bracket Style
        finalDesign = `『 ${styledText} 』`;
        break;

      case 11: // Complex Mix (Glitch + Template)
        finalDesign = template.replace("[TEXT]", toGlitch(styledText));
        break;

      default:
        finalDesign = styledText;
    }

    results.push({
      id: i, // Unique ID for React Key
      text: finalDesign,
      styleName: style.name,
      category: strategy === 1 ? "Art" : "Style"
    });
  }

  return results;
};