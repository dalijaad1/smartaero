export interface JourneyMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  images: string[];
  quote?: {
    text: string;
    author?: string;
  };
  achievements?: string[];
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: 'inception',
    date: 'August 2024',
    title: 'The Spark of Innovation',
    description: 'SmartAero was born during the Tunisia 2056 Challenge, representing IEEE ISIMa in AgriTech with a vision to revolutionize agriculture through smart technology.',
    images: [
      'The Spark of Innovation 1.jpg',
      
    ],
    quote: {
      text: '"Highest Score" - IEEE Judges',
      author: 'Tunisia 2056 Challenge'
    },
    achievements: [
      'Selected from 100+ projects',
      'Perfect technical evaluation score',
      'Most innovative solution award'
    ]
  },
  {
    id: 'development',
    date: 'August - December 2024',
    title: 'Shaping the Vision',
    description: 'Joined elite incubation program and developed our MVP with cutting-edge IoT and AI technology. Refined our business model through expert-led workshops.',
    images: [
      'Shaping the Vision 1.jpg',
      'Shaping the Vision 2.jpg',
      'Shaping the Vision 3.jpg',
      'Shaping the Vision 4.jpg',
      'Shaping the Vision 5.jpg',
      'Shaping the Vision 6.jpg',
      'Shaping the Vision 7.jpg',
      'Shaping the Vision 8.jpg'
    ],
    achievements: [
      'Successful MVP development',
      'Secured seed funding',
      'Built strategic partnerships'
    ]
  },
  {
    id: 'competition',
    date: 'November 2024',
    title: 'Rising in Competitions',
    description: 'Presented our prototype at PYFAC X and secured third place nationally, receiving outstanding feedback from the jury and industry experts.',
    images: [
      'Rising in Competitions 1.jpg',
      'Rising in Competitions 2.jpg',
    ],
    quote: {
      text: '"A game-changing solution for modern agriculture"',
      author: 'PYFAC Jury'
    },
    achievements: [
      'National 3rd place winner',
      'Best technical implementation',
      'People\'s choice award'
    ]
  },
  {
    id: 'victory',
    date: 'December 2024',
    title: 'The Grand Victory',
    description: 'Won first place in AgriTech at TN2056, securing additional funding and recognition. Joined Ninety Startup House to accelerate our growth.',
    images: [
      'The Grand Victory 1.jpg',
      'The Grand Victory 2.jpg',
      'The Grand Victory 3.jpg',
      'The Grand Victory 4.jpg',
      'The Grand Victory 5.jpg',
      
    ],
    quote: {
      text: '"The future of sustainable farming"',
      author: 'TN2056 Committee'
    },
    achievements: [
      'First place in AgriTech',
      'Secured major investment',
      'Media recognition'
    ]
  }
];