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
      { type: "hold", text: "just don't overthink this… I'm just going to show you something you don't see enough" },
      { type: "reveal", text: "you… through my eyes" },
    ],
  },
  {
    day: 19, emoji: "👀", title: "When You're Not Trying",
    hasPhoto: true,
    steps: [
      { type: "tease", text: "this one is simple" },
      { type: "hold", text: "don't try to disagree immediately… you look your best when you're not even trying" },
      { type: "reveal", text: "like when you're just being you… not thinking about anything" },
      { type: "bonus", text: "and yeah… I notice that more than you think" },
    ],
  },
  {
    day: 18, emoji: "😂", title: "Your Savage Side",
    steps: [
      { type: "tease", text: "okay this one is dangerous" },
      { type: "hold", text: "I'm exposing you a little… you judge people like it's a sport" },
      { type: "reveal", text: "and your expressions alone can finish someone" },
      { type: "bonus", text: "and somehow… I still enjoy it" },
    ],
  },
  {
    day: 17, emoji: "🧠", title: "Your Overthinking",
    steps: [
      { type: "tease", text: "this one… I wish you'd fix" },
      { type: "hold", text: "you overthink things that don't even exist" },
      { type: "reveal", text: "and then you sit there stressing about it like it's real" },
      { type: "bonus", text: "you're stronger than your thoughts… just saying" },
    ],
  },
  {
    day: 16, emoji: "💪", title: "Your Discipline",
    steps: [
      { type: "tease", text: "okay serious one" },
      { type: "hold", text: "people only see your results… but I've seen the days you didn't feel like it and still showed up" },
      { type: "reveal", text: "that's not normal… that's discipline" },
    ],
  },
  {
    day: 15, emoji: "🎯", title: "You As a Shooter",
    hasPhoto: true, hasVoice: true,
    steps: [
      { type: "tease", text: "you're definitely going to argue with this" },
      { type: "hold", text: "you didn't 'almost make it'… you're someone who just refuses to stop" },
      { type: "voice" },
      { type: "bonus", text: "and honestly… that's way more impressive" },
    ],
  },
  {
    day: 14, emoji: "👀", title: "The Way You Look",
    steps: [
      { type: "tease", text: "this one is about your looks" },
      { type: "hold", text: "you're not 'sometimes pretty'… you just don't notice when you are" },
      { type: "reveal", text: "and honestly… that happens way more than you think" },
    ],
  },
  {
    day: 13, emoji: "🌧️", title: "Your Soft Side",
    hasPhoto: true,
    steps: [
      { type: "tease", text: "this side of you…" },
      { type: "hold", text: "you feel things deeply… way more than you let people see" },
      { type: "reveal", text: "that softness… that's actually one of the best things about you" },
    ],
  },
  {
    day: 12, emoji: "😂", title: "The Annoying You",
    steps: [
      { type: "tease", text: "okay I'm saying this openly" },
      { type: "hold", text: "you're actually irritating sometimes… like properly annoying" },
      { type: "reveal", text: "but still… I wouldn't replace you" },
    ],
  },
  {
    day: 11, emoji: "🫀", title: "Your Heart",
    steps: [
      { type: "tease", text: "this one matters" },
      { type: "hold", text: "you care more than you show… you notice things even when you act like you don't" },
      { type: "reveal", text: "that kind of heart… it's rare" },
    ],
  },
  {
    day: 10, emoji: "👀", title: "The Version You Hide",
    hasPhoto: true,
    steps: [
      { type: "tease", text: "okay now this one…" },
      { type: "hold", text: "there's a version of you… calm, confident, and lowkey dangerous" },
      { type: "reveal", text: "and yeah… I notice that version a lot" },
    ],
  },
  {
    day: 9, emoji: "🎧", title: "Voice Day",
    hasVoice: true,
    steps: [
      { type: "tease", text: "halfway…" },
      { type: "voice" },
      { type: "bonus", text: "you still don't believe me do you" },
    ],
  },
  {
    day: 8, emoji: "🧠", title: "Your Mind",
    steps: [
      { type: "tease", text: "this one explains you" },
      { type: "hold", text: "you're not confused… you just think deeper than most people" },
      { type: "reveal", text: "and yeah… it makes things messy sometimes" },
    ],
  },
  {
    day: 7, emoji: "😂", title: "Our Chaos",
    steps: [
      { type: "tease", text: "we should actually be banned" },
      { type: "hold", text: "we've judged too many people for absolutely no reason" },
      { type: "reveal", text: "and we're probably not stopping anytime soon" },
    ],
  },
  {
    day: 6, emoji: "👀", title: "The Way You Carry Yourself",
    steps: [
      { type: "tease", text: "this one is subtle" },
      { type: "hold", text: "you walk like you don't care… and somehow that makes people notice you more" },
      { type: "reveal", text: "including me" },
    ],
  },
  {
    day: 5, emoji: "🫶", title: "What You Mean To Me",
    hasPhoto: true,
    steps: [
      { type: "tease", text: "okay… serious again" },
      { type: "hold", text: "you've been there for me… in ways you don't even realise" },
      { type: "reveal", text: "and yeah… that means a lot to me" },
    ],
  },
  {
    day: 4, emoji: "🧩", title: "You vs Your Thoughts",
    steps: [
      { type: "tease", text: "this one hits different" },
      { type: "split-view", splitLeft: ["Not good enough", "Too emotional"], splitRight: ["More than enough", "Deeply feeling"] },
      { type: "bonus", text: "the difference is crazy" },
    ],
  },
  {
    day: 3, emoji: "👀", title: "The Attractive You",
    hasPhoto: true,
    steps: [
      { type: "tease", text: "yeah I'm not being subtle here" },
      { type: "hold", text: "you're actually insanely attractive" },
      { type: "reveal", text: "like… it's not even fair sometimes" },
    ],
  },
  {
    day: 2, emoji: "⏳", title: "Almost 20",
    steps: [
      { type: "tease", text: "almost there…" },
      { type: "hold", text: "you're not just turning 20… you're becoming someone people will look up to" },
      { type: "reveal", text: "whether you realise it or not" },
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
      { type: "final-text", text: "you don't see yourself clearly… but I do" },
      { type: "reveal", text: "and yeah… that's exactly why you mean so much to me" },
      { type: "qr-line", text: "this wasn't just a countdown… it was me showing you what you don't see" },
    ],
  },
];
