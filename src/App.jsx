import React, { useState } from 'react';
import LoginStep from './components/LoginStep';
import ProfileStep from './components/ProfileStep';
import MyTeamStep from './components/MyTeamStep';
import StadiumSelectStep from './components/StadiumSelectStep';
import TypeSelectStep from './components/TypeSelectStep';
import CheeringInfoStep from './components/CheeringInfoStep';
import FoodInfoStep from './components/FoodInfoStep';

import CheeringSeatInfoStep from './components/CheeringSeatInfoStep';
import CheeringCourseStep from './components/CheeringCourseStep';
import FoodDetailStep from './components/FoodDetailStep';
import FoodCourseStep from './components/FoodCourseStep';

function App() {
  const [step, setStep] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [selectedType, setSelectedType] = useState(null); // 'cheering' or 'food'
  const [foodDetailMode, setFoodDetailMode] = useState('inside'); // 'inside' or 'outside'

  const nextStep = () => setStep(prev => prev + 1);

  const handleTeamFinish = (teamId) => {
    setSelectedTeam(teamId);
    setStep(4);
  };

  const handleStadiumSelect = (stadium) => {
    setSelectedStadium(stadium);
    setStep(5);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    if (type === 'cheering') setStep(6);
    else setStep(7);
  };

  const goBack = () => {
    if (step === 8 || step === 9) {
      setStep(6); // Back to Cheering Info
    } else if (step === 10 || step === 11) {
      setStep(7); // Back to Food Info
    } else if (step === 6 || step === 7) {
      setStep(5); // Back to Type Select
    } else if (step === 5) {
      setStep(4); // Back to Stadium Select
    }
  };

  const navigateTo = (newStep, params) => {
    if (newStep === 10 && params?.mode) {
      setFoodDetailMode(params.mode);
    }
    setStep(newStep);
  };

  return (
    <>
      {step === 1 && <LoginStep onNext={nextStep} />}
      {step === 2 && <ProfileStep onNext={nextStep} />}
      {step === 3 && <MyTeamStep onNext={handleTeamFinish} />}
      
      {step === 4 && <StadiumSelectStep onNext={handleStadiumSelect} myTeam={selectedTeam} />}
      {step === 5 && <TypeSelectStep onNext={handleTypeSelect} onBack={goBack} stadium={selectedStadium} myTeam={selectedTeam} />}
      
      {step === 6 && <CheeringInfoStep stadium={selectedStadium} myTeam={selectedTeam} onBack={goBack} onNavigate={navigateTo} />}
      {step === 7 && <FoodInfoStep stadium={selectedStadium} myTeam={selectedTeam} onBack={goBack} onNavigate={navigateTo} />}

      {step === 8 && <CheeringSeatInfoStep stadium={selectedStadium} onBack={goBack} />}
      {step === 9 && <CheeringCourseStep onBack={goBack} />}
      {step === 10 && <FoodDetailStep stadium={selectedStadium} mode={foodDetailMode} onBack={goBack} />}
      {step === 11 && <FoodCourseStep onBack={goBack} />}
    </>
  );
}

export default App;
