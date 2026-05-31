import React, { useState, useEffect } from 'react';
import LoginStep from './components/LoginStep';
import ProfileStep from './components/ProfileStep';
import MyTeamStep from './components/MyTeamStep';
import StadiumSelectStep from './components/StadiumSelectStep';
import TypeSelectStep from './components/TypeSelectStep';
import CheeringInfoStep from './components/CheeringInfoStep';
import FoodInfoStep from './components/FoodInfoStep';
import { mockDbService } from './services/mockDb';

import CheeringSeatInfoStep from './components/CheeringSeatInfoStep';
import CheeringCourseStep from './components/CheeringCourseStep';
import FoodDetailStep from './components/FoodDetailStep';
import FoodCourseStep from './components/FoodCourseStep';
import MessageListStep from './components/MessageListStep';
import ChatRoomStep from './components/ChatRoomStep';
import CommunityMapStep from './components/CommunityMapStep';
import CommunityListStep from './components/CommunityListStep';
import HomeStep from './components/HomeStep';
import MyPageStep from './components/MyPageStep';

const TEAM_COLORS = {
  kt: '#000000',
  lg: '#C30452',
  kia: '#EA0029',
  doosan: '#131230',
  samsung: '#074CA1',
  ssg: '#CE0E2D',
  nc: '#3152A5',
  lotte: '#D0112A',
  kiwoom: '#820024',
  hanwha: '#FF6600'
};

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
  // Development mode: start at home step directly
  const [step, setStep] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState(() => {
    const profile = mockDbService.getUserProfile();
    return profile ? profile.team : 'lotte';
  });
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [selectedType, setSelectedType] = useState(null); // 'cheering' or 'food'
  const [foodDetailMode, setFoodDetailMode] = useState('inside'); // 'inside' or 'outside'
  const [feedData, setFeedData] = useState(INITIAL_FEED);

  // Saved food and blogs scraps state
  const [savedFoods, setSavedFoods] = useState(() => {
    const stored = localStorage.getItem('bmw_saved_foods');
    return stored ? JSON.parse(stored) : [];
  });
  const [savedBlogs, setSavedBlogs] = useState(() => {
    const stored = localStorage.getItem('bmw_saved_blogs');
    return stored ? JSON.parse(stored) : [];
  });
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const [myPageTab, setMyPageTab] = useState('diary');

  // Sync KBO team brand colors globally
  useEffect(() => {
    if (selectedTeam) {
      document.body.style.setProperty('--primary-color', TEAM_COLORS[selectedTeam] || '#6C43EB');
      document.body.setAttribute('data-theme', selectedTeam);
    }
  }, [selectedTeam]);

  const toggleSaveFood = (foodId) => {
    setSavedFoods(prev => {
      const updated = prev.includes(foodId) ? prev.filter(id => id !== foodId) : [...prev, foodId];
      localStorage.setItem('bmw_saved_foods', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleSaveBlog = (blogId) => {
    setSavedBlogs(prev => {
      const updated = prev.includes(blogId) ? prev.filter(id => id !== blogId) : [...prev, blogId];
      localStorage.setItem('bmw_saved_blogs', JSON.stringify(updated));
      return updated;
    });
  };

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
    mockDbService.saveUserProfile({ team: teamId });
    setStep(16); // Navigate directly to HomeStep Dashboard (step 16)
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
    } else if (step === 12 || step === 14 || step === 17) {
      setStep(16); // Back to Home from main tabs
    } else if (step === 13) {
      setStep(12); // Back to MessageList from Chat
    } else if (step === 15) {
      setStep(14); // Back to Map from Feed List
    } else if (step === 4) {
      setStep(16); // Back to Home from Stadium Select
    }
  };

  const navigateTo = (newStep, params) => {
    if (newStep === 10 && params?.mode) {
      setFoodDetailMode(params.mode);
    }
    if (newStep === 17) {
      setMyPageTab(params?.tab || 'diary');
    }
    if (params?.blogId) {
      setSelectedBlogId(params.blogId);
    }
    setStep(newStep);
  };

  return (
    <>
      {step === 1 && <LoginStep onNext={nextStep} />}
      {step === 2 && <ProfileStep onNext={nextStep} />}
      {step === 3 && <MyTeamStep onNext={handleTeamFinish} />}
      
      {step === 4 && <StadiumSelectStep onNext={handleStadiumSelect} myTeam={selectedTeam} onNavigate={navigateTo} />}
      {step === 5 && <TypeSelectStep onNext={handleTypeSelect} onBack={goBack} stadium={selectedStadium} myTeam={selectedTeam} onNavigate={navigateTo} />}
      
      {step === 6 && <CheeringInfoStep stadium={selectedStadium} myTeam={selectedTeam} onBack={goBack} onNavigate={navigateTo} />}
      {step === 7 && <FoodInfoStep stadium={selectedStadium} myTeam={selectedTeam} onBack={goBack} onNavigate={navigateTo} />}
 
      {step === 8 && <CheeringSeatInfoStep stadium={selectedStadium} onBack={goBack} onNavigate={navigateTo} />}
      {step === 9 && <CheeringCourseStep onBack={goBack} onNavigate={navigateTo} savedBlogs={savedBlogs} onToggleBlog={toggleSaveBlog} blogId={selectedBlogId} />}
      {step === 10 && <FoodDetailStep stadium={selectedStadium} mode={foodDetailMode} onBack={goBack} onNavigate={navigateTo} savedFoods={savedFoods} onToggleFood={toggleSaveFood} />}
      {step === 11 && <FoodCourseStep onBack={goBack} onNavigate={navigateTo} savedBlogs={savedBlogs} onToggleBlog={toggleSaveBlog} blogId={selectedBlogId} />}

      {step === 12 && <MessageListStep onBack={goBack} onNavigate={navigateTo} />}
      {step === 13 && <ChatRoomStep onBack={goBack} onNavigate={navigateTo} />}
      
      {step === 14 && <CommunityMapStep stadium={selectedStadium} onBack={goBack} onNavigate={navigateTo} onAddPing={handleAddPing} />}
      {step === 15 && <CommunityListStep stadium={selectedStadium} onBack={goBack} onNavigate={navigateTo} feedData={feedData} />}

      {step === 16 && <HomeStep onNavigate={navigateTo} myTeam={selectedTeam} selectedStadium={selectedStadium} />}
      {step === 17 && (
        <MyPageStep 
          onNavigate={navigateTo} 
          myTeam={selectedTeam} 
          savedFoods={savedFoods} 
          savedBlogs={savedBlogs} 
          onToggleFood={toggleSaveFood} 
          onToggleBlog={toggleSaveBlog} 
          initialTab={myPageTab}
        />
      )}
    </>
  );
}

export default App;
