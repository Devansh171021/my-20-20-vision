export interface DayContent {
  day: number;
  emoji: string;
  title: string;
  lines: string[];
  interaction: "tap-reveal" | "fade-sequence" | "hold-reveal" | "split-view";
  splitLeft?: string[];
  splitRight?: string[];
}

export const daysContent: DayContent[] = [
  {
    day: 20, emoji: "🌟", title: "The Beginning",
    interaction: "fade-sequence",
    lines: [
      "You're about to turn 20…",
      "and it's actually funny… because there's still so much about you that you don't see.",
      "Like genuinely… the only person who underestimates you sometimes is you.",
      "So yeah… for the next 20 days…",
      "I'm just going to show you what I see."
    ]
  },
  {
    day: 19, emoji: "👀", title: "When You're Not Trying",
    interaction: "tap-reveal",
    lines: [
      "You know what I've noticed…",
      "you look your best when you're not even trying.",
      "Like when you're just being normal… not posing… not thinking… just you.",
      "And the funniest part is…",
      "you don't even realise it."
    ]
  },
  {
    day: 18, emoji: "😂", title: "Your Savage Side",
    interaction: "tap-reveal",
    lines: [
      "You judge people like it's actually a skill.",
      "Your expressions alone can destroy someone.",
      "And somehow…",
      "I still find it funny every time."
    ]
  },
  {
    day: 17, emoji: "🧠", title: "Your Overthinking",
    interaction: "fade-sequence",
    lines: [
      "Your brain really loves creating problems that don't even exist.",
      "And then you sit there… overthinking everything like it's real.",
      "I'm just saying…",
      "not every thought deserves your attention.",
      "You're actually stronger than the things you overthink."
    ]
  },
  {
    day: 16, emoji: "💪", title: "Your Discipline",
    interaction: "tap-reveal",
    lines: [
      "People only see results…",
      "I've seen the days where you didn't feel like doing anything…",
      "and still showed up.",
      "That kind of consistency isn't normal.",
      "That's what makes you different."
    ]
  },
  {
    day: 15, emoji: "🎯", title: "You As a Shooter",
    interaction: "fade-sequence",
    lines: [
      "You call it 'almost'…",
      "I see someone who just refuses to stop.",
      "Missing by that close doesn't make you less…",
      "it actually shows how far you've come.",
      "You're not someone who quits.",
      "And that matters more than anything."
    ]
  },
  {
    day: 14, emoji: "👀", title: "The Way You Look",
    interaction: "tap-reveal",
    lines: [
      "You're not 'sometimes pretty'…",
      "you just don't notice when you are.",
      "And trust me…",
      "it's way more often than you think."
    ]
  },
  {
    day: 13, emoji: "🌧️", title: "Your Soft Side",
    interaction: "fade-sequence",
    lines: [
      "You act strong all the time…",
      "but you feel things deeply…",
      "way more than you show.",
      "And honestly…",
      "that's not weakness.",
      "That's what makes you real."
    ]
  },
  {
    day: 12, emoji: "😂", title: "The Annoying You",
    interaction: "tap-reveal",
    lines: [
      "You're actually irritating sometimes…",
      "like properly.",
      "But still…",
      "I'd pick you over anyone else."
    ]
  },
  {
    day: 11, emoji: "🫀", title: "Your Heart",
    interaction: "fade-sequence",
    lines: [
      "You care more than you admit.",
      "You act chill…",
      "but you notice everything.",
      "And that kind of heart…",
      "is rare."
    ]
  },
  {
    day: 10, emoji: "👀", title: "The Version You Hide",
    interaction: "tap-reveal",
    lines: [
      "There's a version of you…",
      "that's calm…",
      "confident…",
      "and a little dangerous.",
      "And honestly…",
      "I like that version the most."
    ]
  },
  {
    day: 9, emoji: "🎧", title: "Voice Day",
    interaction: "fade-sequence",
    lines: [
      "You don't give yourself enough credit…",
      "and it's actually annoying at this point."
    ]
  },
  {
    day: 8, emoji: "🧠", title: "Your Mind",
    interaction: "tap-reveal",
    lines: [
      "You're not confused…",
      "you just think deeper than most people.",
      "And yeah…",
      "that gets messy sometimes.",
      "But it's also what makes you different."
    ]
  },
  {
    day: 7, emoji: "😂", title: "Our Chaos",
    interaction: "fade-sequence",
    lines: [
      "We've judged so many people…",
      "I'm pretty sure we shouldn't be allowed to do that anymore."
    ]
  },
  {
    day: 6, emoji: "👀", title: "The Way You Carry Yourself",
    interaction: "tap-reveal",
    lines: [
      "You walk like you don't care…",
      "and somehow…",
      "that makes people notice you even more."
    ]
  },
  {
    day: 5, emoji: "🫶", title: "What You Mean To Me",
    interaction: "fade-sequence",
    lines: [
      "You've been there for me…",
      "in ways you don't even realise.",
      "And I don't think I say that enough."
    ]
  },
  {
    day: 4, emoji: "🧩", title: "You vs Your Thoughts",
    interaction: "split-view",
    lines: [],
    splitLeft: ["Not good enough", "Too emotional", "Behind everyone", "Overthinking everything", "Not strong enough"],
    splitRight: ["More than enough", "Deeply feeling", "On your own path", "Thoughtful & aware", "Quietly powerful"],
  },
  {
    day: 3, emoji: "👀", title: "The Attractive You",
    interaction: "tap-reveal",
    lines: [
      "You're actually dangerously attractive…",
      "especially when you're just being yourself."
    ]
  },
  {
    day: 2, emoji: "⏳", title: "Almost 20",
    interaction: "fade-sequence",
    lines: [
      "You're not just turning 20…",
      "you're becoming someone people will look up to."
    ]
  },
  {
    day: 1, emoji: "🔐", title: "Tomorrow",
    interaction: "tap-reveal",
    lines: [
      "Tomorrow…",
      "I'm not holding back."
    ]
  },
  {
    day: 0, emoji: "🎉", title: "Happy Birthday",
    interaction: "fade-sequence",
    lines: [
      "You don't see yourself clearly yet…",
      "but I do.",
      "And that's exactly why…",
      "you'll always be someone special to me."
    ]
  },
];
