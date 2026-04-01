export interface DayStep {
  type: "tease" | "tap" | "hold" | "reveal" | "bonus" | "voice" | "photo" | "montage" | "split-view" | "final-text" | "qr-line";
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
      { type: "tap", text: "just don't overthink this whole thing" },
      { type: "hold", text: "I'm just going to show you something you don't see enough" },
      { type: "reveal", text: "you… through my eyes" },
    ],
  },
  {
    day: 19, emoji: "👀", title: "When You're Not Trying",
    hasPhoto: true,
    steps: [
      { type: "tease", text: "this one is simple" },
      { type: "tap", text: "don't try to disagree immediately" },
      { type: "hold", text: "you look your best when you're not even trying" },
      { type: "reveal", text: "like when you're just being you… not thinking about anything" },
      { type: "bonus", text: "and yeah… I notice that more than you think" },
    ],
  },
  {
    day: 18, emoji: "😂", title: "Your Savage Side",
    steps: [
      { type: "tease", text: "okay this one is dangerous" },
      { type: "tap", text: "I'm exposing you a little" },
      { type: "hold", text: "you judge people like it's a sport" },
      { type: "reveal", text: "and your expressions alone can finish someone" },
      { type: "bonus", text: "and somehow… I still enjoy it" },
    ],
  },
  {
    day: 17, emoji: "🧠", title: "Your Overthinking",
    steps: [
      { type: "tease", text: "this one… I wish you'd fix" },
      { type: "tap", text: "or at least reduce" },
      { type: "hold", text: "you overthink things that don't even exist" },
      { type: "reveal", text: "and then you sit there stressing about it like it's real" },
      { type: "bonus", text: "you're stronger than your thoughts… just saying" },
    ],
  },
  {
    day: 16, emoji: "💪", title: "Your Discipline",
    steps: [
      { type: "tease", text: "okay serious one" },
      { type: "tap", text: "no jokes here" },
      { type: "hold", text: "people only see your results" },
      { type: "reveal", text: "I've seen the days you didn't feel like it… and still showed up" },
      { type: "bonus", text: "that's not normal… that's discipline" },
    ],
  },
  {
    day: 15, emoji: "🎯", title: "You As a Shooter",
    hasPhoto: true, hasVoice: true,
    steps: [
      { type: "tease", text: "you're definitely going to argue with this" },
      { type: "tap", text: "I already know" },
      { type: "hold", text: "you didn't 'almost make it'…" },
      { type: "reveal", text: "you're someone who just refuses to stop" },
      { type: "voice" },
      { type: "bonus", text: "and honestly… that's way more impressive" },
    ],
  },
  {
    day: 14, emoji: "👀", title: "The Way You Look",
    steps: [
      { type: "tease", text: "this one is about your looks" },
      { type: "tap", text: "don't roll your eyes" },
      { type: "hold", text: "you're not 'sometimes pretty'…" },
      { type: "reveal", text: "you just don't notice when you are" },
      { type: "bonus", text: "which is… most of the time" },
    ],
  },
  {
    day: 13, emoji: "🌧️", title: "Your Soft Side",
    hasPhoto: true,
    steps: [
      { type: "tease", text: "this side of you…" },
      { type: "tap", text: "you don't show it much" },
      { type: "hold", text: "you feel things deeply" },
      { type: "reveal", text: "way more than you let people see" },
      { type: "bonus", text: "that's not weakness… that's you being real" },
    ],
  },
  {
    day: 12, emoji: "😂", title: "The Annoying You",
    steps: [
      { type: "tease", text: "okay I'm saying this openly" },
      { type: "tap", text: "don't get offended" },
      { type: "hold", text: "you're actually irritating sometimes" },
      { type: "reveal", text: "like properly annoying" },
      { type: "bonus", text: "still… wouldn't replace you" },
    ],
  },
  {
    day: 11, emoji: "🫀", title: "Your Heart",
    steps: [
      { type: "tease", text: "this one matters" },
      { type: "tap", text: "so read properly" },
      { type: "hold", text: "you care more than you admit" },
      { type: "reveal", text: "you notice things… even when you act like you don't" },
      { type: "bonus", text: "that kind of heart is rare" },
    ],
  },
  {
    day: 10, emoji: "👀", title: "The Version You Hide",
    hasPhoto: true,
    steps: [
      { type: "tease", text: "okay now this one…" },
      { type: "tap", text: "no arguing allowed" },
      { type: "hold", text: "there's a version of you…" },
      { type: "reveal", text: "that's calm… confident… and lowkey dangerous" },
      { type: "bonus", text: "yeah… I see that version a lot" },
    ],
  },
  {
    day: 9, emoji: "🎧", title: "Voice Day",
    hasVoice: true,
    steps: [
      { type: "tease", text: "halfway…" },
      { type: "tap", text: "you still don't believe me do you" },
      { type: "voice" },
      { type: "bonus", text: "exactly" },
    ],
  },
  {
    day: 8, emoji: "🧠", title: "Your Mind",
    steps: [
      { type: "tease", text: "this one explains you" },
      { type: "tap", text: "pretty accurately" },
      { type: "hold", text: "you're not confused…" },
      { type: "reveal", text: "you just think deeper than most people" },
      { type: "bonus", text: "that's why it gets messy sometimes" },
    ],
  },
  {
    day: 7, emoji: "😂", title: "Our Chaos",
    steps: [
      { type: "tease", text: "we should actually be banned" },
      { type: "tap", text: "like genuinely" },
      { type: "hold", text: "we've judged too many people" },
      { type: "reveal", text: "for absolutely no reason" },
      { type: "bonus", text: "and we'll probably still do it" },
    ],
  },
  {
    day: 6, emoji: "👀", title: "The Way You Carry Yourself",
    steps: [
      { type: "tease", text: "this one is subtle" },
      { type: "tap", text: "but I've noticed it a lot" },
      { type: "hold", text: "you walk like you don't care" },
      { type: "reveal", text: "and somehow that makes people notice you more" },
      { type: "bonus", text: "including me" },
    ],
  },
  {
    day: 5, emoji: "🫶", title: "What You Mean To Me",
    hasPhoto: true,
    steps: [
      { type: "tease", text: "okay… serious again" },
      { type: "tap", text: "no jokes this time" },
      { type: "hold", text: "you've been there for me…" },
      { type: "reveal", text: "in ways you don't even realise" },
      { type: "bonus", text: "and yeah… that matters a lot" },
    ],
  },
  {
    day: 4, emoji: "🧩", title: "You vs Your Thoughts",
    steps: [
      { type: "tease", text: "this one hits different" },
      { type: "tap", text: "just look at both sides" },
      { type: "split-view", splitLeft: ["Not good enough", "Too emotional", "Behind everyone", "Overthinking everything", "Not strong enough"], splitRight: ["More than enough", "Deeply feeling", "On your own path", "Thoughtful & aware", "Quietly powerful"] },
      { type: "bonus", text: "the difference is crazy" },
    ],
  },
  {
    day: 3, emoji: "👀", title: "The Attractive You",
    hasPhoto: true,
    steps: [
      { type: "tease", text: "yeah I'm not being subtle here" },
      { type: "tap", text: "at all" },
      { type: "hold", text: "you're actually insanely attractive" },
      { type: "reveal", text: "like… it's not even fair sometimes" },
      { type: "bonus", text: "and no… I'm not taking that back" },
    ],
  },
  {
    day: 2, emoji: "⏳", title: "Almost 20",
    steps: [
      { type: "tease", text: "almost there…" },
      { type: "tap", text: "one more push" },
      { type: "hold", text: "you're not just turning 20" },
      { type: "reveal", text: "you're becoming someone people will look up to" },
      { type: "bonus", text: "whether you realise it or not" },
    ],
  },
  {
    day: 1, emoji: "🔐", title: "Tomorrow",
    steps: [
      { type: "tease", text: "tomorrow…" },
      { type: "tap", text: "I'm not holding back" },
    ],
  },
  {
    day: 0, emoji: "🎉", title: "Happy Birthday",
    hasVoice: true, hasMontage: true,
    steps: [
      { type: "tease", text: "20 days…" },
      { type: "tap", text: "you still don't fully see it do you" },
      { type: "montage" },
      { type: "voice" },
      { type: "final-text", text: "you don't see yourself clearly…\nbut I do" },
      { type: "reveal", text: "and yeah…\nthat's exactly why you mean so much to me" },
      { type: "qr-line", text: "this wasn't just a countdown…\nit was me… showing you what you don't see" },
    ],
  },
];
