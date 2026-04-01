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
      { type: "tease", text: "okay… before this even starts" },
      { type: "hold", text: "don’t overthink this okay… just stay here for a second… I’m not trying to prove anything… I just want you to see something you usually ignore" },
      { type: "reveal", text: "you… through my eyes" },
      { type: "bonus", text: "if this made your heart pause even a little, just wait for tomorrow… I’m only warming up, and I promise the next one will make you blush harder." },
    ],
  },
  {
    day: 19,
    emoji: "👀",
    title: "When You're Not Trying",
    steps: [
      { type: "tease", text: "this one is actually very simple" },
      { type: "hold", text: "you know when you’re not trying to look good… not fixing anything… just being normal… yeah that version" },
      { type: "reveal", text: "that’s when you look your best" },
      { type: "bonus", text: "tomorrow I’m saying the thing I usually keep to myself… so be ready, because your savage smile is about to get officially exposed." },
    ],
  },
  {
    day: 18,
    emoji: "😂",
    title: "Your Savage Side",
    steps: [
      { type: "tease", text: "okay I might get in trouble for this" },
      { type: "hold", text: "you judge people like it’s your hidden talent… your face says everything before you even speak" },
      { type: "reveal", text: "and it’s actually scary sometimes" },
      { type: "bonus", text: "and somehow I still adore that side of you… tomorrow gets deeper, softer, and dangerously close to your heart." },
    ],
  },
  {
    day: 17,
    emoji: "🧠",
    title: "Your Overthinking",
    steps: [
      { type: "tease", text: "this one… I don’t like about you" },
      { type: "hold", text: "you overthink things that aren’t even real… and then sit there convincing yourself they are" },
      { type: "reveal", text: "and it just messes with you for no reason" },
      { type: "bonus", text: "so tomorrow I’m stealing that doubt from your hands and replacing it with truth… the kind that feels like a forehead kiss at midnight." },
    ],
  },
  {
    day: 16,
    emoji: "💪",
    title: "Your Discipline",
    steps: [
      { type: "tease", text: "okay this one… listen properly" },
      { type: "hold", text: "people see your results… but I’ve seen the days you didn’t feel like doing anything… and still did it" },
      { type: "reveal", text: "that’s not normal… that’s discipline" },
      { type: "bonus", text: "tomorrow I’m talking about the fire in you that you pretend is nothing… and yes, I’m going to be extra dramatic about it." },
    ],
  },
  {
    day: 15,
    emoji: "🎯",
    title: "You As a Shooter",
    steps: [
      { type: "tease", text: "you’re definitely going to argue here" },
      { type: "hold", text: "you didn’t ‘almost make it’… you reached places most people can’t even imagine… and still kept going" },
      { type: "reveal", text: "that says a lot about you" },
      { type: "bonus", text: "tomorrow I’m not praising your talent… I’m talking about your face, your vibe, and why you make eye contact feel illegal." },
    ],
  },
  {
    day: 14,
    emoji: "👀",
    title: "The Way You Look",
    steps: [
      { type: "tease", text: "okay don’t roll your eyes at this" },
      { type: "hold", text: "you think you look good sometimes… but you don’t realise how often it actually happens" },
      { type: "reveal", text: "it’s way more than you think" },
      { type: "bonus", text: "and tomorrow I’ll tell you about the part of you that melts me the fastest… the gentle side you hide like a secret love song." },
    ],
  },
  {
    day: 13,
    emoji: "🌧️",
    title: "Your Soft Side",
    steps: [
      { type: "tease", text: "this side of you…" },
      { type: "hold", text: "you don’t show it openly… but you feel things deeply… like really deeply" },
      { type: "reveal", text: "and that softness… it’s actually beautiful" },
      { type: "bonus", text: "tomorrow I’m going from soft to chaos again… and you already know we are cutest when we are completely unhinged together." },
    ],
  },
  {
    day: 12,
    emoji: "😂",
    title: "The Annoying You",
    steps: [
      { type: "tease", text: "okay I’m saying this openly" },
      { type: "hold", text: "you are annoying sometimes… like genuinely irritating" },
      { type: "reveal", text: "but still… I wouldn’t replace you" },
      { type: "bonus", text: "tomorrow I’m dropping the teasing and talking about your heart… and I need you to read that one slowly, like you mean it." },
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
      { type: "bonus", text: "tomorrow I’m telling you about that hidden version of you that makes my chest feel warm and my brain forget every smart sentence." },
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
      { type: "bonus", text: "tomorrow is halfway and a little special… don’t skip it, because I want your full attention for what comes next." },
    ],
  },
  {
    day: 9,
    emoji: "🎧",
    title: "Just Listen",
    steps: [
      { type: "tease", text: "halfway…" },
      { type: "voice" },
      { type: "bonus", text: "tomorrow I’ll explain the why behind all this… and if you listen closely, you’ll hear my heart hidden between the lines." },
    ],
  },
  {
    day: 8,
    emoji: "🧠",
    title: "Your Mind",
    steps: [
      { type: "tease", text: "this one explains you perfectly" },
      { type: "hold", text: "you’re not confused… you just think deeper than most people around you" },
      { type: "reveal", text: "and yeah… it makes things messy sometimes" },
      { type: "bonus", text: "tomorrow is pure chaos and inside jokes… the dangerous kind of fun where I fall for you all over again." },
    ],
  },
  {
    day: 7,
    emoji: "😂",
    title: "Our Chaos",
    steps: [
      { type: "tease", text: "we should actually be banned" },
      { type: "hold", text: "we’ve judged way too many people for absolutely no reason" },
      { type: "reveal", text: "and we’re definitely not stopping anytime soon" },
      { type: "bonus", text: "tomorrow I’m pointing out something subtle you do… and once you notice it, you’ll catch me staring every single time." },
    ],
  },
  {
    day: 6,
    emoji: "👀",
    title: "The Way You Carry Yourself",
    steps: [
      { type: "tease", text: "this is something I’ve noticed a lot" },
      { type: "hold", text: "you walk like you don’t care about anything… and somehow that makes people notice you more" },
      { type: "reveal", text: "including me" },
      { type: "bonus", text: "tomorrow gets important and honest… the kind of note that lingers in your chest long after you close this." },
    ],
  },
  {
    day: 5,
    emoji: "🫶",
    title: "What You Mean To Me",
    steps: [
      { type: "tease", text: "okay this one is serious" },
      { type: "hold", text: "you’ve been there for me… in ways you don’t even realise" },
      { type: "reveal", text: "and that actually means a lot to me" },
      { type: "bonus", text: "tomorrow I’ll show you the gap between how you see yourself and how breathtaking you actually are to me." },
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
      { type: "bonus", text: "tomorrow I’m done being subtle and yes, I’m about to flirt shamelessly with facts and full confidence." },
    ],
  },
  {
    day: 3,
    emoji: "👀",
    title: "The Attractive You",
    steps: [
      { type: "tease", text: "yeah I’m not being subtle here" },
      { type: "hold", text: "you’re actually insanely attractive" },
      { type: "reveal", text: "like… it’s not even fair sometimes" },
      { type: "bonus", text: "tomorrow is almost the finale… softer, bigger, and sweeter, like the moment before a perfect kiss in a film." },
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
      { type: "bonus", text: "tomorrow is the final lock before your day… come with a calm heart, because I’ve saved my most honest words for then." },
    ],
  },
  {
    day: 1,
    emoji: "🔐",
    title: "Tomorrow",
    steps: [
      { type: "tease", text: "tomorrow…" },
      { type: "hold", text: "I’m not holding back… at all" },
      { type: "bonus", text: "and when midnight opens the final page, I want you smiling… because everything was leading to that moment with you." },
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
