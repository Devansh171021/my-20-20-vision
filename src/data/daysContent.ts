export interface DayStep {
  type: "tease" | "hold" | "reveal" | "bonus" | "voice" | "photo" | "montage" | "split-view" | "final-text" | "qr-line";
  text?: string;
  splitLeft?: string[];
  splitRight?: string[];
}

export interface DayContent {
  day: number;
  emoji: string;
  title: string;
  steps: DayStep[];
  hasPhoto?: boolean;
  hasVoice?: boolean;
  hasMontage?: boolean;
}

export const daysContent: DayContent[] = [
  {
    day: 20, emoji: "🌟", title: "The Beginning",
    steps: [
      { type: "tease", text: "okay… before this starts" },
      { type: "hold", text: "just don't overthink this whole thing for once…\n\nI'm just going to show you\nsomething you don't see enough" },
      { type: "reveal", text: "you… through my eyes" },
    ],
  },
  {
    day: 19, emoji: "👀", title: "When You're Not Trying",
    hasPhoto: true,
    steps: [
      { type: "tease", text: "this one is actually very simple" },
      { type: "hold", text: "you look your best\nwhen you're not even trying…\n\nlike genuinely not thinking\nabout how you look" },
      { type: "photo" },
      { type: "reveal", text: "just you… existing" },
      { type: "bonus", text: "and yeah… that version of you\nis my favourite" },
    ],
  },
  {
    day: 18, emoji: "😂", title: "Your Savage Side",
    steps: [
      { type: "tease", text: "okay I'm exposing you\na little here" },
      { type: "hold", text: "you judge people like it's a full-time job…\n\nyour expressions alone\ncan destroy someone" },
      { type: "reveal", text: "and the worst part is…\nI still enjoy it" },
      { type: "bonus", text: "like way more than I should" },
    ],
  },
  {
    day: 17, emoji: "🧠", title: "Your Overthinking",
    steps: [
      { type: "tease", text: "this one…\nI wish I could remove from you" },
      { type: "hold", text: "you overthink things that don't even exist\nand then stress about them\nlike they're real" },
      { type: "reveal", text: "and it's so unnecessary" },
      { type: "bonus", text: "because if you saw yourself clearly…\nyou wouldn't doubt this much" },
    ],
  },
  {
    day: 16, emoji: "💪", title: "Your Discipline",
    steps: [
      { type: "tease", text: "people only see your results" },
      { type: "hold", text: "they don't see the days\nyou didn't feel like doing anything…\n\nand still showed up" },
      { type: "reveal", text: "that's what actually matters" },
      { type: "bonus", text: "that consistency…\nthat's what makes you different" },
    ],
  },
  {
    day: 15, emoji: "🎯", title: "You As a Shooter",
    hasPhoto: true, hasVoice: true,
    steps: [
      { type: "tease", text: "you're definitely going to\nargue with this" },
      { type: "hold", text: "you didn't almost make it…\n\nyou're someone who just\nrefuses to stop trying" },
      { type: "photo" },
      { type: "voice" },
      { type: "bonus", text: "and honestly…\nthat's way more impressive than winning" },
    ],
  },
  {
    day: 14, emoji: "👀", title: "The Way You Look",
    steps: [
      { type: "tease", text: "okay this one" },
      { type: "hold", text: "don't roll your eyes…\n\nyou're not sometimes pretty" },
      { type: "reveal", text: "you just don't notice\nwhen you are" },
      { type: "bonus", text: "which is… most of the time" },
    ],
  },
  {
    day: 13, emoji: "🌧️", title: "Your Soft Side",
    hasPhoto: true,
    steps: [
      { type: "tease", text: "this version of you" },
      { type: "hold", text: "you don't show it to everyone…\n\nbut you feel things deeply" },
      { type: "photo" },
      { type: "reveal", text: "way more than you admit" },
      { type: "bonus", text: "and that softness…\nit suits you" },
    ],
  },
  {
    day: 12, emoji: "😂", title: "The Annoying You",
    steps: [
      { type: "tease", text: "okay I'm saying this openly" },
      { type: "hold", text: "you're actually irritating sometimes…\n\nlike properly annoying" },
      { type: "reveal", text: "but still…\nI wouldn't replace you" },
      { type: "bonus", text: "so clearly you're doing\nsomething right" },
    ],
  },
  {
    day: 11, emoji: "🫀", title: "Your Heart",
    steps: [
      { type: "tease", text: "this one matters" },
      { type: "hold", text: "you care more than you show…\n\nyou notice things\neven when you act like you don't" },
      { type: "reveal", text: "that kind of heart is rare" },
      { type: "bonus", text: "don't change that" },
    ],
  },
  {
    day: 10, emoji: "👀", title: "The Version You Hide",
    hasPhoto: true,
    steps: [
      { type: "tease", text: "okay now this one" },
      { type: "hold", text: "there's a version of you…\n\ncalm, confident,\nand lowkey dangerous" },
      { type: "photo" },
      { type: "reveal", text: "and yeah…\nI notice that version a lot" },
      { type: "bonus", text: "probably more than you think" },
    ],
  },
  {
    day: 9, emoji: "🎧", title: "Voice Day",
    hasVoice: true,
    steps: [
      { type: "tease", text: "halfway…" },
      { type: "voice" },
      { type: "bonus", text: "you still don't believe me\ndo you" },
    ],
  },
  {
    day: 8, emoji: "🧠", title: "Your Mind",
    steps: [
      { type: "tease", text: "this one explains you perfectly" },
      { type: "hold", text: "you're not confused…\n\nyou just think deeper\nthan most people" },
      { type: "reveal", text: "and yeah…\nit makes things messy sometimes" },
      { type: "bonus", text: "but it's also what\nmakes you different" },
    ],
  },
  {
    day: 7, emoji: "😂", title: "Our Chaos",
    steps: [
      { type: "tease", text: "we should actually be banned" },
      { type: "hold", text: "we've judged way too many people\nfor absolutely no reason" },
      { type: "reveal", text: "and we're probably not stopping\nanytime soon" },
      { type: "bonus", text: "and honestly…\nI don't even regret it" },
    ],
  },
  {
    day: 6, emoji: "👀", title: "The Way You Carry Yourself",
    steps: [
      { type: "tease", text: "this is something\nI've noticed a lot" },
      { type: "hold", text: "you walk like you don't care\nabout anything" },
      { type: "reveal", text: "and somehow that makes\npeople notice you more" },
      { type: "bonus", text: "including me" },
    ],
  },
  {
    day: 5, emoji: "🫶", title: "What You Mean To Me",
    hasPhoto: true,
    steps: [
      { type: "tease", text: "okay this one is serious" },
      { type: "hold", text: "you've been there for me…\n\nin ways you don't even realise" },
      { type: "photo" },
      { type: "reveal", text: "and I don't say this enough" },
      { type: "bonus", text: "but yeah…\nthat means a lot to me" },
    ],
  },
  {
    day: 4, emoji: "🧩", title: "You vs Your Thoughts",
    steps: [
      { type: "tease", text: "this one hits different" },
      { type: "hold", text: "what you think you are\nvs what you actually are" },
      { type: "split-view", splitLeft: ["Not good enough", "Too emotional", "Behind everyone", "Overthinking everything", "Not strong enough"], splitRight: ["More than enough", "Deeply feeling", "On your own path", "Thoughtful & aware", "Quietly powerful"] },
      { type: "reveal", text: "the difference is crazy" },
      { type: "bonus", text: "you're way better\nthan you think" },
    ],
  },
  {
    day: 3, emoji: "👀", title: "The Attractive You",
    hasPhoto: true,
    steps: [
      { type: "tease", text: "yeah I'm not even pretending\nto be subtle" },
      { type: "hold", text: "you're actually\ninsanely attractive" },
      { type: "photo" },
      { type: "reveal", text: "like… it's not even fair\nsometimes" },
      { type: "bonus", text: "and no…\nI'm not taking that back" },
    ],
  },
  {
    day: 2, emoji: "⏳", title: "Almost 20",
    steps: [
      { type: "tease", text: "almost there…" },
      { type: "hold", text: "you're not just turning 20" },
      { type: "reveal", text: "you're becoming someone\npeople will look up to" },
      { type: "bonus", text: "whether you realise it\nor not" },
    ],
  },
  {
    day: 1, emoji: "🔐", title: "Tomorrow",
    steps: [
      { type: "tease", text: "tomorrow…" },
      { type: "hold", text: "I'm not holding back" },
    ],
  },
  {
    day: 0, emoji: "🎉", title: "Happy Birthday",
    hasVoice: true, hasMontage: true,
    steps: [
      { type: "tease", text: "20 days…" },
      { type: "montage" },
      { type: "voice" },
      { type: "final-text", text: "you don't see yourself clearly…\nbut I do" },
      { type: "reveal", text: "and yeah…\nthat's exactly why\nyou mean so much to me" },
      { type: "qr-line", text: "this wasn't just a countdown…\nit was me showing you\nwhat you don't see" },
    ],
  },
];
