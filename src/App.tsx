import React from 'react';
import { birthdayContent } from './data/birthdayContent';
import { ExperienceShell } from './components/experience/ExperienceShell';

export const App: React.FC = () => {
  return <ExperienceShell content={birthdayContent} />;
};

export default App;

