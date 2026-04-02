export interface DayStep {
  type: "tease" | "hold" | "reveal" | "bonus" | "voice" | "photo" | "montage" | "split-view" | "final-text" | "qr-line" | "target" | "judge";
  text?: string;
  splitLeft?: string[];
  splitRight?: string[];
  audioUrl?: string;
  weatherMode?: "default" | "rain";
  memory?: string;
  verdict?: string;
}

export interface DayContent {
  day: number;
  emoji: string;
  title: string;
  steps: DayStep[];
  bgMusic?: string;
}

export const daysContent: DayContent[] = [

  {
    day: 20,
    emoji: "🌟",
    title: "The Beginning",
    steps: [
      { type: "tease", text: "okay… before this starts" },
      { type: "hold", text: "just don't overthink this whole thing for once…\n\nI'm just going to show you something you don't see enough" },
      { type: "reveal", text: "you… through my eyes" },
    ],
  },

  {
    day: 19,
    emoji: "📸",
    title: "When You're Not Trying",
    steps: [
      { type: "tease", text: "this one is actually very simple" },
      { type: "hold", text: "you look your best when you're not even trying…\n\nlike genuinely not thinking about how you look" },
      { type: "reveal", text: "just you… existing" },
      { type: "photo" },
      { type: "bonus", text: "and yeah… that version of you is my favourite" },
    ],
  },

  {
    day: 18,
    emoji: "😂",
    title: "Your Savage Side",
    steps: [
      { type: "tease", text: "okay I'm exposing you a little here" },
      { type: "hold", text: "you judge people like it's a full-time job…\n\nyour expressions alone can destroy someone" },
      { type: "reveal", text: "and the worst part is… I still enjoy it" },
      { type: "bonus", text: "like way more than I should" },
    ],
  },

  {
    day: 17,
    emoji: "🧠",
    title: "Your Overthinking",
    steps: [
      { type: "tease", text: "this one… I wish I could remove from you" },
      { type: "hold", text: "you overthink things that don't even exist\n\nand then stress about them like they're real" },
      { type: "reveal", text: "and it's so unnecessary" },
      { type: "bonus", text: "because if you saw yourself clearly… you wouldn't doubt this much" },
    ],
  },

  {
    day: 16,
    emoji: "💪",
    title: "Your Discipline",
    steps: [
      { type: "tease", text: "people only see your results" },
      { type: "hold", text: "they don't see the days you didn't feel like doing anything…\n\nand still showed up" },
      { type: "reveal", text: "that's what actually matters" },
      { type: "bonus", text: "that consistency… that's what makes you different" },
    ],
  },

  {
    day: 15,
    emoji: "🎯",
    title: "You As a Shooter",
    steps: [
      { type: "tease", text: "you're definitely going to argue with this" },
      { type: "hold", text: "you didn't almost make it…\n\nyou're someone who just refuses to stop trying" },
      { type: "target" },
      { type: "voice", audioUrl: "/audio/day15-shooter.mp3" },
      { type: "bonus", text: "and honestly… that's way more impressive than winning" },
    ],
    bgMusic: "/audio/bg-day15.mp3",
  },

  {
    day: 14,
    emoji: "🌧️",
    title: "The Scooter Ride",
    steps: [
      { type: "tease", text: "okay this one" },
      { type: "hold", text: "don't roll your eyes…\n\nyou're not sometimes pretty", weatherMode: "rain" },
      { type: "reveal", text: "you just don't notice when you are" },
      { type: "bonus", text: "which is… most of the time" },
    ],
  },

  {
    day: 13,
    emoji: "🌧️",
    title: "Your Soft Side",
    steps: [
      { type: "tease", text: "this version of you" },
      { type: "hold", text: "you don't show it to everyone…\n\nbut you feel things deeply" },
      { type: "reveal", text: "way more than you admit" },
      { type: "photo" },
      { type: "bonus", text: "and that softness… it suits you" },
    ],
  },

  {
    day: 12,
    emoji: "⚖️",
    title: "Judging People",
    steps: [
      { type: "tease", text: "okay I'm saying this openly" },
      { type: "hold", text: "you're actually irritating sometimes…\n\nlike properly annoying" },
      { type: "judge", memory: "that time we roasted someone for 20 minutes straight", verdict: "guilty… and proud of it" },
      { type: "reveal", text: "but still… I wouldn't replace you" },
      { type: "bonus", text: "so clearly you're doing something right" },
    ],
  },

  {
    day: 11,
    emoji: "🫀",
    title: "Your Heart",
    steps: [
      { type: "tease", text: "this one matters" },
      { type: "hold", text: "you care more than you show…\n\nyou notice things even when you act like you don't" },
      { type: "reveal", text: "that kind of heart is rare" },
      { type: "bonus", text: "don't change that" },
    ],
  },

  {
    day: 10,
    emoji: "👀",
    title: "The Version You Hide",
    steps: [
      { type: "tease", text: "okay now this one" },
      { type: "hold", text: "there's a version of you…\n\ncalm, confident, and lowkey dangerous" },
      { type: "reveal", text: "and yeah… I notice that version a lot" },
      { type: "photo" },
      { type: "voice", audioUrl: "/audio/day10-voice.mp3" },
      { type: "bonus", text: "probably more than you think" },
    ],
  },

  {
    day: 9,
    emoji: "🎧",
    title: "Just Listen",
    steps: [
      { type: "tease", text: "halfway…" },
      { type: "voice", audioUrl: "/audio/day9-voice.mp3" },
      { type: "bonus", text: "you still don't believe me do you" },
    ],
  },

  {
    day: 8,
    emoji: "🧠",
    title: "Your Mind",
    steps: [
      { type: "tease", text: "this one explains you perfectly" },
      { type: "hold", text: "you're not confused…\n\nyou just think deeper than most people" },
      { type: "reveal", text: "and yeah… it makes things messy sometimes" },
      { type: "bonus", text: "but it's also what makes you different" },
    ],
  },

  {
    day: 7,
    emoji: "😂",
    title: "Our Chaos",
    steps: [
      { type: "tease", text: "we should actually be banned" },
      { type: "hold", text: "we've judged way too many people\n\nfor absolutely no reason" },
      { type: "reveal", text: "and we're probably not stopping anytime soon" },
      { type: "bonus", text: "and honestly… I don't even regret it" },
    ],
  },

  {
    day: 6,
    emoji: "👀",
    title: "The Way You Carry Yourself",
    steps: [
      { type: "tease", text: "this is something I've noticed a lot" },
      { type: "hold", text: "you walk like you don't care about anything" },
      { type: "reveal", text: "and somehow that makes people notice you more" },
      { type: "bonus", text: "including me" },
    ],
  },

  {
    day: 5,
    emoji: "🫶",
    title: "What You Mean To Me",
    steps: [
      { type: "tease", text: "okay this one is serious" },
      { type: "hold", text: "you've been there for me…\n\nin ways you don't even realise" },
      { type: "reveal", text: "and I don't say this enough" },
      { type: "photo" },
      { type: "voice", audioUrl: "/audio/day5-voice.mp3" },
      { type: "bonus", text: "but yeah… that means a lot to me" },
    ],
  },

  {
    day: 4,
    emoji: "🧩",
    title: "You vs Your Thoughts",
    steps: [
      { type: "tease", text: "this one hits different" },
      { type: "hold", text: "what you think you are\n\nvs what you actually are" },
      { type: "reveal", text: "the difference is crazy" },
      { type: "bonus", text: "you're way better than you think" },
    ],
  },

  {
    day: 3,
    emoji: "👀",
    title: "The Attractive You",
    steps: [
      { type: "tease", text: "yeah I'm not even pretending to be subtle" },
      { type: "hold", text: "you're actually insanely attractive" },
      { type: "reveal", text: "like… it's not even fair sometimes" },
      { type: "photo" },
      { type: "bonus", text: "and no… I'm not taking that back" },
    ],
  },

  {
    day: 2,
    emoji: "⏳",
    title: "Almost 20",
    steps: [
      { type: "tease", text: "almost there…" },
      { type: "hold", text: "you're not just turning 20" },
      { type: "reveal", text: "you're becoming someone people will look up to" },
      { type: "bonus", text: "whether you realise it or not" },
    ],
  },

  {
    day: 1,
    emoji: "🔐",
    title: "Tomorrow",
    steps: [
      { type: "tease", text: "tomorrow…" },
      { type: "hold", text: "I'm not holding back" },
    ],
  },

  {
    day: 0,
    emoji: "🎉",
    title: "Happy Birthday",
    steps: [
      { type: "tease", text: "20 days…" },
      { type: "montage" },
      { type: "voice", audioUrl: "/audio/day0-voice.mp3" },
      { type: "final-text", text: "you don't see yourself clearly… but I do" },
      { type: "reveal", text: "and yeah… that's exactly why you mean so much to me" },
      { type: "qr-line", text: "this wasn't just a countdown…\n\nit was me showing you what you don't see" },
    ],
    bgMusic: "/audio/bg-finale.mp3",
  },

];
