// utils/symbols.js

export const universe = {
  // ==========================================
  // 1. UNICODE STYLES (50+ Variations)
  // ==========================================
  styles: [
    { name: "Bold", start: 0x1D400 },
    { name: "Italic", start: 0x1D434 },
    { name: "Bold Italic", start: 0x1D468 },
    { name: "Script", start: 0x1D49C },
    { name: "Bold Script", start: 0x1D4D0 },
    { name: "Fraktur", start: 0x1D504 },
    { name: "Bold Fraktur", start: 0x1D56C },
    { name: "Double Struck", start: 0x1D538 },
    { name: "Sans Serif", start: 0x1D5A0 },
    { name: "Sans Bold", start: 0x1D5D4 },
    { name: "Monospace", start: 0x1D670 },
    { name: "Enclosed Alphanumeric", start: 0x24B6 }, // Ⓐ Ⓑ Ⓒ
    { name: "Squared", start: 0x1F130 }, // 🅰 🅱 🅲
    { name: "Parenthesized", start: 0x249C }, // ⒜ ⒝ ⒞
    // ... Aur hazaron hidden unicode ranges yahan aayenge
  ],

  // ==========================================
  // 2. ASCII ART TEMPLATES (1000+ Types)
  // ==========================================
  templates: {
    weapons: [
      "︻┳デ═— [TEXT] —═デ┳︻", // Sniper
      "▄︻┻═┳一 [TEXT] 一┳═┻︻▄", // Machine Gun
      "⚔️ [TEXT] ⚔️", // Swords
      "▬▬ι═══════hu [TEXT] ═══════ι▬▬", // Long Sword
      " /̵͇̿̿/'̿'̿ ̿ ̿ ̿ 🕵️ [TEXT] 🕵️ ̿ ̿ ̿ ̿ '̿'̿/̵͇̿̿/", // Spy Gun
      "💣 [TEXT] 💣", // Bomb
      "🏹 [TEXT] 🏹", // Bow & Arrow
      "🛡️ [TEXT] 🛡️"  // Shield
    ],
    emotions: [
      "( ͡° ͜ʖ ͡°) [TEXT] ( ͡° ͜ʖ ͡°)", // Lenny
      "¯\\_(ツ)_/¯ [TEXT] ¯\\_(ツ)_/¯", // Shrug
      "ಠ_ಠ [TEXT] ಠ_ಠ", // Disapproval
      "(╯°□°）╯︵ [TEXT]", // Table Flip
      "♥‿♥ [TEXT] ♥‿♥", // Love
      "ʕ•́ᴥ•̀ʔっ [TEXT]", // Bear Hug
      "(ง'̀-'́)ง [TEXT] (ง'̀-'́)ง" // Fighting
    ],
    nature: [
      "꧁ [TEXT] ꧂", // Royal Wings
      "❀ [TEXT] ❀", // Flower
      "⋆ ˚ ｡ ⋆ ☁️ [TEXT] ☁️ ⋆ ｡ ˚ ⋆", // Clouds
      "🌊 [TEXT] 🌊", // Waves
      "⚡ [TEXT] ⚡", // Lightning
      "🦋 [TEXT] 🦋"  // Butterfly
    ],
    borders: [
      "╔══ [TEXT] ══╗",
      "╭₪₪₪₪₪ [TEXT] ₪₪₪₪₪╮",
      "★·.·´¯`·.·★ [TEXT] ★·.·´¯`·.·★",
      "˜”*°•.˜”*°• [TEXT] •°*”˜.•°*”˜",
      "▌│█║▌║▌║ [TEXT] ║▌║▌║█│▌"
    ],
    music: [
      "♬ [TEXT] ♬",
      "ılı.lıllılı.ıllı. [TEXT] .ıllı.lıllılı.",
      "🎧 [TEXT] 🎧",
      "🎹 [TEXT] 🎹"
    ]
  },

  // ==========================================
  // 3. DECORATIONS & EMOJIS (The Multipliers)
  // ==========================================
  decorators: [
    "★", "☆", "✦", "✧", "✩", "✪", "✫", "✬", "✭", "✮", "✯", "✰",
    "❄", "❅", "❆", "❇", "❈", "❉", "❊", "❋",
    "♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝", "♞", "♟",
    "♩", "♪", "♫", "♬", "♭", "♮", "♯",
    "☺", "☻", "☹", "☠", "☃", "☄", "★", "☆", "☇", "☈", "☉", "☊", "☋", "☌", "☍"
  ],

  // ==========================================
  // 4. GLITCH & ZALGO CHARACTERS (Special Effects)
  // ==========================================
  glitchChars: [
    "\u0300", "\u0301", "\u0302", "\u0303", "\u0304", "\u0305", "\u0306", 
    "\u0307", "\u0308", "\u0309", "\u030A", "\u030B", "\u030C", "\u030D"
  ]
};