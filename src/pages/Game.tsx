import React from 'react';
import TowerGame from '../components/Game/TowerGame';

interface GamePageProps {
  isDarkMode: boolean;
}

const GamePage: React.FC<GamePageProps> = ({ isDarkMode }) => {
  return (
    <main className="pt-20">
      <div className="container mx-auto px-4 py-8">
        <TowerGame isDarkMode={isDarkMode} />
      </div>
    </main>
  );
};

export default GamePage;