export interface Talk {
  conference: string;
  title: string;
  date: string;
  url: string;
  description: string;
  videoUrl?: string;
  videoLabel?: string; // defaults to "Watch the talk" if omitted
}

export const talks: Talk[] = [
  {
    conference: 'ADAConf 2025',
    title: 'Changing the engine mid-flight: A startup data pivot',
    date: 'November 2025',
    url: 'https://2025.adaconf.org/',
    description:
      'A technical architecture case study on pivoting data approach while live — delivered at a conference dedicated to evolutionary architecture and socio-technical systems thinking.',
    videoUrl: 'https://www.youtube.com/watch?v=pgXjchZjuMI',
  },
  {
    conference: 'DDD Adelaide 2025',
    title: 'Continuous Improvement: Crafting the Habit of Self-Development',
    date: 'November 2025',
    url: 'https://dddadelaide.com/agenda',
    description:
      'Applying the same mindset used for shipping features to professional growth — picking the right skills to focus on, making growth visible, and ensuring it gets recognised.',
    videoUrl: 'https://www.youtube.com/shorts/T_-QsUgSyZw',
    videoLabel: 'Watch the preview',
  },
  {
    conference: 'YOW! Tech Leaders Summit Melbourne 2024',
    title: 'Performing Better Together with A Culture of Continuous Improvement',
    date: 'September 2024',
    url: 'https://yowcon.com/tech-leaders-melbourne-2024/sessions/3388/performing-better-together-with-a-culture-of-continuous-improvement',
    description:
      'How to replace the stress of annual performance reviews with regular skill-building habits aligned with what your team and organisation actually need.',
  },
  {
    conference: 'DDD Melbourne 2024',
    title: 'Continuous Improvement: Crafting the Habit of Self-Development',
    date: '2024',
    url: 'https://www.dddmelbourne.com/agenda/2024',
    description:
      'Practical guidance on prioritising learning through workshops, technical writing, and new technologies. Excellence is a journey, not a destination.',
    videoUrl: 'https://www.youtube.com/watch?v=bZQHhLCq1wQ',
  },
  {
    conference: 'ServerlessDays ANZ',
    title: 'Idea to MVP to Product: A StartUp Journey',
    date: '',
    url: 'https://anz.serverlessdays.io/speakers/susan/',
    description:
      'How Kaleida rapidly validated and shipped an MVP using SST — pragmatic, cost-effective approaches to launching ideas without expensive prototyping.',
    videoUrl: 'https://www.youtube.com/watch?v=fHpKAF57F0c',
  },
];
