import { Plane as Plant, Droplet, Leaf, Sprout, LineChart, Zap, CloudRain, BookOpen, Lightbulb, Target, PenTool as Tool, PlaneTakeoff, Microscope, Thermometer, Waves, Timer, Settings } from 'lucide-react';

export const benefits = [
  {
    title: 'Less Water Usage',
    value: '98%',
    description: 'Compared to traditional soil farming, aeroponics uses a mist-based nutrient system, drastically reducing water consumption.',
    icon: Droplet
  },
  {
    title: 'Faster Growth',
    value: '300%',
    description: 'Plants grow significantly faster due to optimal oxygen and nutrient absorption.',
    icon: Sprout
  },
  {
    title: 'Higher Yield',
    value: '70%',
    description: 'More efficient use of space and resources results in significantly higher output.',
    icon: LineChart
  }
];

export const growingGuides = [
  {
    title: 'Leafy Greens',
    icon: '🥬',
    varieties: ['Lettuce', 'Spinach', 'Kale', 'Swiss Chard'],
    growthTime: '30-45 days',
    yield: 'High',
    difficulty: 'Easy'
  },
  {
    title: 'Herbs',
    icon: '🌿',
    varieties: ['Basil', 'Mint', 'Parsley', 'Cilantro'],
    growthTime: '20-30 days',
    yield: 'High',
    difficulty: 'Easy'
  },
  {
    title: 'Fruiting Plants',
    icon: '🍅',
    varieties: ['Tomatoes', 'Peppers', 'Strawberries'],
    growthTime: '60-80 days',
    yield: 'Medium',
    difficulty: 'Moderate'
  },
  {
    title: 'Root Vegetables',
    icon: '🥕',
    varieties: ['Carrots', 'Radishes', 'Beets'],
    growthTime: '40-60 days',
    yield: 'Medium',
    difficulty: 'Advanced'
  }
];

export const articles = [
  {
    title: 'Getting Started with SmartAero',
    description: 'Learn the basics of setting up and using your SmartAero system',
    icon: Plant,
    link: '/resources/getting-started',
    category: 'beginner',
    content: {
      intro: 'Welcome to SmartAero! This guide will help you get started with your smart agriculture journey.',
      sections: [
        {
          title: 'Initial Setup',
          content: 'Setting up your SmartAero system is quick and easy. Follow these steps to get started.',
          subsections: [
            {
              title: 'Hardware Installation',
              content: 'Mount your sensors in the recommended positions and connect them to the main unit.'
            },
            {
              title: 'Network Configuration',
              content: 'Connect your system to your local network for remote monitoring and control.'
            }
          ]
        },
        {
          title: 'Basic Operations',
          content: 'Learn how to perform basic operations and monitoring with your SmartAero system.'
        }
      ],
      conclusion: 'You\'re now ready to start your smart farming journey with SmartAero!',
      tips: [
        'Keep sensors clean for accurate readings',
        'Check battery levels monthly',
        'Update firmware regularly'
      ],
      warnings: [
        'Avoid exposing the main unit to water',
        'Don\'t modify sensor calibration without guidance'
      ]
    }
  },
  {
    title: 'Understanding Soil Moisture',
    description: 'Deep dive into soil moisture monitoring and management',
    icon: Droplet,
    link: '/resources/soil-moisture',
    category: 'intermediate',
    content: {
      intro: 'Proper soil moisture management is crucial for optimal plant growth.',
      sections: [
        {
          title: 'Moisture Basics',
          content: 'Learn about different types of soil moisture and their importance.'
        },
        {
          title: 'Sensor Placement',
          content: 'Optimal sensor placement for accurate moisture readings.',
          subsections: [
            {
              title: 'Depth Considerations',
              content: 'Different plants require monitoring at different root depths.'
            },
            {
              title: 'Multiple Sensor Strategy',
              content: 'Using multiple sensors for comprehensive monitoring.'
            }
          ]
        }
      ],
      conclusion: 'Master soil moisture management for better crop yields.',
      tips: [
        'Monitor moisture levels daily',
        'Adjust watering based on weather',
        'Consider soil type when interpreting readings'
      ],
      warnings: [
        'Avoid sensor damage during soil work',
        'Calibrate sensors seasonally'
      ]
    }
  },
  {
    title: 'Advanced Climate Control',
    description: 'Master environmental control for optimal growing conditions',
    icon: Thermometer,
    link: '/resources/climate-control',
    category: 'advanced',
    content: {
      intro: 'Advanced climate control techniques for professional growers.',
      sections: [
        {
          title: 'Temperature Management',
          content: 'Precise temperature control strategies for different crops.'
        },
        {
          title: 'Humidity Control',
          content: 'Managing humidity levels for optimal plant growth.'
        }
      ],
      conclusion: 'Implement these strategies for optimal growing conditions.',
      tips: [
        'Use temperature zones effectively',
        'Monitor humidity correlation',
        'Implement day/night temperature differentials'
      ],
      warnings: [
        'Avoid rapid temperature changes',
        'Monitor condensation points'
      ]
    }
  },
  {
    title: 'Nutrient Solution Management',
    description: 'Learn about nutrient solutions and their optimization',
    icon: Microscope,
    link: '/resources/nutrients',
    category: 'intermediate',
    content: {
      intro: 'Understanding and managing nutrient solutions is key to successful aeroponic growing.',
      sections: [
        {
          title: 'Basic Nutrients',
          content: 'Essential nutrients for plant growth and development.',
          subsections: [
            {
              title: 'Macronutrients',
              content: 'Primary nutrients needed in large quantities.'
            },
            {
              title: 'Micronutrients',
              content: 'Trace elements essential for plant health.'
            }
          ]
        },
        {
          title: 'Solution Maintenance',
          content: 'Keeping your nutrient solution balanced and fresh.'
        }
      ],
      conclusion: 'Proper nutrient management leads to healthier plants and better yields.',
      tips: [
        'Check pH levels daily',
        'Change solution regularly',
        'Keep detailed records'
      ],
      warnings: [
        'Never mix concentrated solutions',
        'Monitor for nutrient lockout'
      ]
    }
  },
  {
    title: 'Pest Management',
    description: 'Natural and effective pest control strategies',
    icon: Leaf,
    link: '/resources/pest-control',
    category: 'intermediate',
    content: {
      intro: 'Learn how to identify and manage common pests in aeroponic systems.',
      sections: [
        {
          title: 'Prevention',
          content: 'Preventive measures to keep your system pest-free.',
          subsections: [
            {
              title: 'Environmental Control',
              content: 'Creating conditions that discourage pest infestations.'
            },
            {
              title: 'Monitoring',
              content: 'Regular inspection and early detection techniques.'
            }
          ]
        }
      ],
      conclusion: 'Effective pest management is crucial for system success.',
      tips: [
        'Inspect plants weekly',
        'Use beneficial insects',
        'Maintain cleanliness'
      ],
      warnings: [
        'Avoid chemical pesticides',
        'Quarantine new plants'
      ]
    }
  },
  {
    title: 'System Maintenance',
    description: 'Regular maintenance procedures for optimal performance',
    icon: Settings,
    link: '/resources/maintenance',
    category: 'beginner',
    content: {
      intro: 'Regular maintenance ensures your system runs efficiently and produces healthy crops.',
      sections: [
        {
          title: 'Daily Tasks',
          content: 'Essential daily maintenance procedures.',
          subsections: [
            {
              title: 'System Checks',
              content: 'Visual inspections and basic measurements.'
            },
            {
              title: 'Cleaning',
              content: 'Basic cleaning and sanitization procedures.'
            }
          ]
        }
      ],
      conclusion: 'Consistent maintenance leads to consistent results.',
      tips: [
        'Create a maintenance schedule',
        'Keep spare parts on hand',
        'Document all procedures'
      ],
      warnings: [
        'Never skip safety checks',
        'Use food-safe cleaning products'
      ]
    }
  },
  {
    title: 'Harvesting Techniques',
    description: 'Maximize yield with proper harvesting methods',
    icon: Tool,
    link: '/resources/harvesting',
    category: 'intermediate',
    content: {
      intro: 'Learn when and how to harvest your crops for optimal yield and quality.',
      sections: [
        {
          title: 'Timing',
          content: 'Understanding the perfect time to harvest different crops.',
          subsections: [
            {
              title: 'Visual Indicators',
              content: 'Physical signs that indicate crop readiness.'
            },
            {
              title: 'Growth Cycles',
              content: 'Understanding crop maturity timelines.'
            }
          ]
        }
      ],
      conclusion: 'Proper harvesting techniques ensure maximum yield and quality.',
      tips: [
        'Harvest during optimal temperatures',
        'Use clean tools',
        'Handle plants gently'
      ],
      warnings: [
        'Avoid damaging remaining plants',
        'Don\'t harvest stressed plants'
      ]
    }
  },
  {
    title: 'Data Analytics',
    description: 'Using data to optimize your growing system',
    icon: LineChart,
    link: '/resources/analytics',
    category: 'advanced',
    content: {
      intro: 'Leverage data analytics to improve system performance and crop yields.',
      sections: [
        {
          title: 'Data Collection',
          content: 'Essential metrics to track and analyze.',
          subsections: [
            {
              title: 'Environmental Data',
              content: 'Temperature, humidity, and light levels.'
            },
            {
              title: 'Growth Metrics',
              content: 'Plant development and yield data.'
            }
          ]
        }
      ],
      conclusion: 'Data-driven decisions lead to better results.',
      tips: [
        'Use automated logging',
        'Review trends weekly',
        'Compare crop cycles'
      ],
      warnings: [
        'Verify sensor accuracy',
        'Backup data regularly'
      ]
    }
  }
];