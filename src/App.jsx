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
import MessageListStep from './components/MessageListStep';
import ChatRoomStep from './components/ChatRoomStep';
import CommunityMapStep from './components/CommunityMapStep';
import CommunityListStep from './components/CommunityListStep';

const INITIAL_FEED = [
  {
    id: 1,
    name: '김지원',
    handle: '@jiwon.-.',
    time: '3초전',
    content: 'oo만두 줄 지금 짧아요! 아직 2번세트 많이 남아있습니다 ㅎㅎ 빨리 다들 먹어보시길..',
    comments: 0,
    likes: 3,
    links: 1
  },
  {
    id: 2,
    name: '황성빈',
    handle: '@lottehw',
    time: '2분전',
    content: '주차장 거의 만차입니다 ㅠㅠ\n지하 2층 구석에만 자리 좀 있어요.\n지금 오시는 분들은 참고 하세요!',
    comments: 40,
    likes: 20,
    links: 15
  },
  {
    id: 3,
    name: '제발 가을야구',
    handle: '@lotte__please_v3',
    time: '2분전',
    content: '오늘 승요 할꺼임 무조건 이긴다 화이팅!!!',
    comments: 5,
    likes: 12,
    links: 0
  }
];

function App() {
  const [step, setStep] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [selectedType, setSelectedType] = useState(null); // 'cheering' or 'food'
  const [foodDetailMode, setFoodDetailMode] = useState('inside'); // 'inside' or 'outside'
  const [feedData, setFeedData] = useState(INITIAL_FEED);

  const handleAddPing = (newPing) => {
    setFeedData(prev => [{
      id: Date.now(),
      name: '나(Me)',
      handle: '@my_handle',
      time: '방금 전',
      content: `${newPing.title}\n${newPing.content}`,
      comments: 0,
      likes: 0,
      links: 0
    }, ...prev]);
  };

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
    } else if (step === 12 || step === 14) {
      setStep(5); // Back to Type Select from main tabs
    } else if (step === 13) {
      setStep(12); // Back to MessageList from Chat
    } else if (step === 15) {
      setStep(14); // Back to Map from Feed List
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
      {step === 9 && <CheeringCourseStep onBack={goBack} onNavigate={navigateTo} />}
      {step === 10 && <FoodDetailStep stadium={selectedStadium} mode={foodDetailMode} onBack={goBack} />}
      {step === 11 && <FoodCourseStep onBack={goBack} onNavigate={navigateTo} />}

      {step === 12 && <MessageListStep onBack={goBack} onNavigate={navigateTo} />}
      {step === 13 && <ChatRoomStep onBack={goBack} onNavigate={navigateTo} />}
      
      {step === 14 && <CommunityMapStep stadium={selectedStadium} onBack={goBack} onNavigate={navigateTo} onAddPing={handleAddPing} />}
      {step === 15 && <CommunityListStep stadium={selectedStadium} onBack={goBack} onNavigate={navigateTo} feedData={feedData} />}
    </>
  );
}

export default App;
