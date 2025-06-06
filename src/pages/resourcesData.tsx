import React from 'react';

interface Article {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  content: React.ReactNode;
  image?: string;
}

export const articles: Article[] = [
  {
    slug: 'understanding-aeroponics',
    title: 'Understanding Aeroponics',
    description: 'A comprehensive guide to aeroponic systems and their benefits.',
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg',
    tags: ['Guide', 'Beginner'],
    content: (
      <>
        <h2>What is Aeroponics?</h2>
        <p>
          Aeroponics is an advanced form of hydroponics where plants are grown in an air or mist
          environment without the use of soil. The roots are suspended in air and periodically
          sprayed with a nutrient-rich water solution.
        </p>

        <h2>Key Components</h2>
        <ul>
          <li>Growing Chamber</li>
          <li>Misting System</li>
          <li>Nutrient Solution Reservoir</li>
          <li>Timer and Control System</li>
        </ul>

        <h2>Benefits of Aeroponics</h2>
        <p>
          Aeroponic systems offer numerous advantages over traditional farming methods:
        </p>
        <ul>
          <li>Significantly reduced water usage</li>
          <li>Faster plant growth</li>
          <li>Higher yield in less space</li>
          <li>Better control over growing conditions</li>
          <li>Reduced risk of soil-borne diseases</li>
        </ul>

        <h2>Getting Started</h2>
        <p>
          To begin with aeroponics, you'll need:
        </p>
        <ul>
          <li>A suitable growing space</li>
          <li>Proper lighting system</li>
          <li>High-quality nutrients</li>
          <li>pH and EC meters</li>
          <li>Basic knowledge of plant care</li>
        </ul>

        <h2>Maintenance Tips</h2>
        <p>
          Regular maintenance is crucial for successful aeroponic growing:
        </p>
        <ul>
          <li>Check nutrient levels daily</li>
          <li>Monitor pH and EC regularly</li>
          <li>Clean misting nozzles weekly</li>
          <li>Inspect roots for any issues</li>
          <li>Maintain proper temperature and humidity</li>
        </ul>
      </>
    )
  },
  {
    slug: 'aeroponics-vs-hydroponics',
    title: 'Aeroponics vs Hydroponics',
    description: 'Comparing different soilless growing methods.',
    image: 'https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg',
    tags: ['Comparison', 'Technical'],
    content: (
      <>
        <h2>Understanding the Differences</h2>
        <p>
          While both aeroponics and hydroponics are soilless growing methods, they differ in
          how they deliver nutrients to plants.
        </p>

        <h3>Hydroponics</h3>
        <ul>
          <li>Plants grown in nutrient solution</li>
          <li>Roots submerged in water</li>
          <li>Requires more water</li>
          <li>Lower maintenance</li>
          <li>More forgiving of system failures</li>
          <li>Lower initial cost</li>
        </ul>

        <h3>Aeroponics</h3>
        <ul>
          <li>Roots suspended in air</li>
          <li>Nutrients delivered via mist</li>
          <li>Uses less water</li>
          <li>Higher oxygen availability</li>
          <li>Faster growth rates</li>
          <li>Better nutrient absorption</li>
        </ul>

        <h2>Choosing the Right System</h2>
        <p>
          Consider these factors when choosing between aeroponics and hydroponics:
        </p>
        <ul>
          <li>Available space and resources</li>
          <li>Technical expertise</li>
          <li>Maintenance time</li>
          <li>Initial budget</li>
          <li>Types of plants you want to grow</li>
        </ul>

        <h2>System Components Comparison</h2>
        <h3>Hydroponic Components</h3>
        <ul>
          <li>Growing medium (rockwool, clay pebbles, etc.)</li>
          <li>Nutrient reservoir</li>
          <li>Water pump</li>
          <li>Air pump and air stones</li>
          <li>Growing containers</li>
        </ul>

        <h3>Aeroponic Components</h3>
        <ul>
          <li>Misting system</li>
          <li>High-pressure pump</li>
          <li>Timer</li>
          <li>Root chamber</li>
          <li>Specialized nozzles</li>
        </ul>
      </>
    )
  },
  {
    slug: 'getting-started',
    title: 'Getting Started with SmartAero',
    description: 'Your first steps into smart agriculture.',
    image: 'https://images.pexels.com/photos/3016430/pexels-photo-3016430.jpeg',
    tags: ['Tutorial', 'Setup'],
    content: (
      <>
        <h2>Welcome to SmartAero</h2>
        <p>
          This guide will walk you through the initial setup of your SmartAero system and help
          you begin your journey into smart agriculture.
        </p>

        <h2>Initial Setup</h2>
        <ol>
          <li>Unpack your SmartAero system</li>
          <li>Connect the control unit to power</li>
          <li>Download the SmartAero app</li>
          <li>Connect to your WiFi network</li>
          <li>Calibrate your sensors</li>
        </ol>

        <h2>First Growing Cycle</h2>
        <p>
          Follow these steps to start your first growing cycle:
        </p>
        <ol>
          <li>Choose your plants</li>
          <li>Prepare nutrient solution</li>
          <li>Set up growing schedule</li>
          <li>Monitor progress</li>
          <li>Maintain system health</li>
        </ol>

        <h2>Best Practices</h2>
        <ul>
          <li>Regular system checks</li>
          <li>Clean components weekly</li>
          <li>Monitor water quality</li>
          <li>Keep environment stable</li>
          <li>Document your progress</li>
        </ul>
      </>
    )
  }
];