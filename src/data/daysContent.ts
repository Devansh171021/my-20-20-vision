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
}

export const daysContent: DayContent[] = [

  {
    day: 20,
    emoji: "🌟",
    title: "The Beginning",
    steps: [
      { type: "tease", text: "okay… wait" },
      { type: "hold", text: "don’t overthink this… just stay here for a second… I’m not trying to prove anything… I just want you to see something you always miss" },
      { type: "reveal", text: "you… through my eyes" },
      { type: "bonus", text: "and if that felt even a little real… just wait… tomorrow I’m starting properly" },
    ],
  },

  {
    day: 19,
    emoji: "👀",
    title: "When You're Not Trying",
    steps: [
      { type: "tease", text: "this one is simple" },
      { type: "hold", text: "when you’re not trying… not fixing anything… just being normal… that version of you" },
      { type: "reveal", text: "that’s when you look your best" },
      { type: "bonus", text: "and no… don’t argue… I’ve seen it too many times… tomorrow I’m exposing you a little" },
    ],
  },

  {
    day: 18,
    emoji: "😂",
    title: "Your Savage Side",
    steps: [
      { type: "tease", text: "okay I might regret this" },
      { type: "hold", text: "you judge people like it’s your hidden skill… your expressions alone can finish someone" },
      { type: "reveal", text: "and it’s actually scary sometimes" },
      { type: "bonus", text: "but yeah… I still enjoy it… way more than I should… tomorrow gets serious" },
    ],
  },

  {
    day: 17,
    emoji: "🧠",
    title: "Your Overthinking",
    steps: [
      { type: "tease", text: "this one… I don’t like" },
      { type: "hold", text: "you overthink things that don’t even exist… and then convince yourself they do" },
      { type: "reveal", text: "and it just messes with you for no reason" },
      { type: "bonus", text: "if you saw yourself properly… you wouldn’t doubt like this… tomorrow I’m reminding you who you actually are" },
    ],
  },

  {
    day: 16,
    emoji: "💪",
    title: "Your Discipline",
    steps: [
      { type: "tease", text: "listen to this properly" },
      { type: "hold", text: "people only see your results… but I’ve seen the days you didn’t feel like doing anything… and still did it" },
      { type: "reveal", text: "that’s discipline" },
      { type: "bonus", text: "and yeah… that’s rare… tomorrow I’m saying something you’ll deny" },
    ],
  },

  {
    day: 15,
    emoji: "🎯",
    title: "You As a Shooter",
    steps: [
      { type: "tease", text: "you’re going to argue here" },
      { type: "hold", text: "you didn’t almost make it… you reached places most people can’t even imagine… and still kept going" },
      { type: "reveal", text: "that says everything about you" },
      { type: "bonus", text: "and no… I’m not letting you downplay it… tomorrow I’m talking about something else… and you won’t escape that one" },
    ],
  },

  {
    day: 14,
    emoji: "👀",
    title: "The Way You Look",
    steps: [
      { type: "tease", text: "okay don’t react immediately" },
      { type: "hold", text: "you think you look good sometimes… but you don’t realise how often it actually happens" },
      { type: "reveal", text: "it’s way more than you think" },
      { type: "bonus", text: "and yeah… I notice every time… tomorrow gets softer" },
    ],
  },

  {
    day: 13,
    emoji: "🌧️",
    title: "Your Soft Side",
    steps: [
      { type: "tease", text: "this side of you…" },
      { type: "hold", text: "you don’t show it to everyone… but you feel things deeply… more than you admit" },
      { type: "reveal", text: "and that softness… it suits you" },
      { type: "bonus", text: "don’t hide it too much… tomorrow I’m going back to chaos" },
    ],
  },

  {
    day: 12,
    emoji: "😂",
    title: "The Annoying You",
    steps: [
      { type: "tease", text: "okay I’m saying this openly" },
      { type: "hold", text: "you are annoying sometimes… like properly irritating" },
      { type: "reveal", text: "but still… I wouldn’t replace you" },
      { type: "bonus", text: "so clearly you’re doing something right… tomorrow is different" },
    ],
  },

  {
    day: 11,
    emoji: "🫀",
    title: "Your Heart",
    steps: [
      { type: "tease", text: "this one matters" },
      { type: "hold", text: "you care more than you show… you notice things even when you act like you don’t" },
      { type: "reveal", text: "that kind of heart is rare" },
      { type: "bonus", text: "don’t lose that… seriously… tomorrow I’m talking about something you don’t even realise" },
    ],
  },

  {
    day: 10,
    emoji: "👀",
    title: "The Version You Hide",
    steps: [
      { type: "tease", text: "okay now this one" },
      { type: "hold", text: "there’s a version of you… calm… confident… and a little dangerous" },
      { type: "reveal", text: "and yeah… I notice that version a lot" },
      { type: "bonus", text: "probably more than you think… tomorrow gets personal" },
    ],
  },

  {
    day: 9,
    emoji: "🎧",
    title: "Just Listen",
    steps: [
      { type: "tease", text: "halfway…" },
      { type: "voice" },
      { type: "bonus", text: "you still don’t believe me do you… tomorrow I’ll explain why" },
    ],
  },

  {
    day: 8,
    emoji: "🧠",
    title: "Your Mind",
    steps: [
      { type: "tease", text: "this explains you" },
      { type: "hold", text: "you’re not confused… you just think deeper than most people around you" },
      { type: "reveal", text: "and yeah… it makes things messy sometimes" },
      { type: "bonus", text: "but that’s also what makes you different… tomorrow is chaos" },
    ],
  },

  {
    day: 7,
    emoji: "😂",
    title: "Our Chaos",
    steps: [
      { type: "tease", text: "we should be banned" },
      { type: "hold", text: "we’ve judged way too many people for no reason" },
      { type: "reveal", text: "and we’re not stopping anytime soon" },
      { type: "bonus", text: "and honestly… I don’t regret it… tomorrow I’m pointing something out" },
    ],
  },

  {
    day: 6,
    emoji: "👀",
    title: "The Way You Carry Yourself",
    steps: [
      { type: "tease", text: "this is subtle" },
      { type: "hold", text: "you walk like you don’t care about anything… and somehow that makes people notice you more" },
      { type: "reveal", text: "including me" },
      { type: "bonus", text: "yeah… that effect… tomorrow gets important" },
    ],
  },

  {
    day: 5,
    emoji: "🫶",
    title: "What You Mean To Me",
    steps: [
      { type: "tease", text: "okay serious one" },
      { type: "hold", text: "you’ve been there for me… in ways you don’t even realise" },
      { type: "reveal", text: "and that actually means a lot to me" },
      { type: "bonus", text: "probably more than I say… tomorrow hits different" },
    ],
  },

  {
    day: 4,
    emoji: "🧩",
    title: "You vs Your Thoughts",
    steps: [
      { type: "tease", text: "this one…" },
      { type: "hold", text: "what you think you are… vs what you actually are" },
      { type: "reveal", text: "the difference is crazy" },
      { type: "bonus", text: "you’re way better than you think… tomorrow I’m not holding back" },
    ],
  },

  {
    day: 3,
    emoji: "👀",
    title: "The Attractive You",
    steps: [
      { type: "tease", text: "yeah I’m not being subtle" },
      { type: "hold", text: "you’re actually insanely attractive" },
      { type: "reveal", text: "like… it’s not even fair sometimes" },
      { type: "bonus", text: "and no… I’m not taking that back… tomorrow is almost the end" },
    ],
  },

  {
    day: 2,
    emoji: "⏳",
    title: "Almost 20",
    steps: [
      { type: "tease", text: "almost there…" },
      { type: "hold", text: "you’re not just turning 20… you’re becoming someone people will look up to" },
      { type: "reveal", text: "whether you realise it or not" },
      { type: "bonus", text: "last one tomorrow… don’t miss it" },
    ],
  },

  {
    day: 1,
    emoji: "🔐",
    title: "Tomorrow",
    steps: [
      { type: "tease", text: "tomorrow…" },
      { type: "hold", text: "I’m not holding back… at all" },
      { type: "bonus", text: "and yeah… just come with a calm mind… I mean it" },
    ],
  },

  {
    day: 0,
    emoji: "🎉",
    title: "Happy Birthday",
    steps: [
      { type: "tease", text: "20 days…" },
      { type: "montage" },
      { type: "voice" },
      { type: "final-text", text: "you don’t see yourself clearly… but I do" },
      { type: "reveal", text: "and yeah… that’s exactly why you mean so much to me" },
      { type: "qr-line", text: "this wasn’t just a countdown… it was me showing you what you don’t see" },
    ],
  },

];
