import React, { useState } from 'react';
import { Search, Home, MapPin, Mail, Menu } from 'lucide-react';

const STADIUMS = [
  { id: 'sajik', name: '사직구장', location: '부산 - 롯데', img: '/images/sajik.jpeg' },
  { id: 'jamsil', name: '잠실구장', location: '서울 - LG/두산', img: '/images/jamsil.jpeg' },
  { id: 'gocheok', name: '고척돔', location: '서울 - 키움', img: '/images/gocheok.jpeg' },
  { id: 'wizpark', name: '위즈 파크', location: '수원 - KT', img: '/images/wizpark.jpeg' },
  { id: 'munhak', name: '문학 구장', location: '인천 - SSG', img: '/images/ssg.jpeg' },
  { id: 'lionspark', name: '라이온즈 파크', location: '대구 - 삼성', img: '/images/lionspark.jpeg' },
  { id: 'ballpark', name: '볼 파크', location: '대전 - 한화', img: '/images/hanwha.jpeg' },
  { id: 'champions', name: '챔피언스필드', location: '광주 - 기아', img: '/images/champions.jpeg' },
  { id: 'ncpark', name: '엔씨 파크', location: '창원 - NC', img: '/images/ncpark.jpeg' },
];

export default function StadiumSelectStep({ onNext, myTeam }) {
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [isAway, setIsAway] = useState(true);

  const handleNext = () => {
    if (selectedStadium) {
      onNext(selectedStadium);
    } else {
      alert('구장을 선택해주세요.');
    }
  };

  return (
    <div className="main-layout">
      {/* Header */}
      <div className="main-header">
        <Menu className="menu-icon" />
        <div className="logo-text">stadium pulse</div>
        {myTeam && <div className={`my-team-badge ${myTeam}`}>{myTeam.toUpperCase()}</div>}
      </div>

      <div className="main-content">
        <div className="stadium-header-row">
          <h2 className="main-title">오늘 어느 구장으로 가시나요?</h2>
          <div className="toggle-switch" onClick={() => setIsAway(!isAway)}>
            <div className={`toggle-btn ${isAway ? 'active' : ''}`}>원정</div>
            <div className={`toggle-btn ${!isAway ? 'active' : ''}`}>홈</div>
          </div>
        </div>

        <div className="search-input-wrapper">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="구장 이름 또는 팀명 검색"
          />
        </div>

        <div className="stadium-grid">
          {STADIUMS.map((stadium) => (
            <div 
              key={stadium.id} 
              className={`stadium-card ${selectedStadium?.id === stadium.id ? 'selected' : ''}`}
              onClick={() => setSelectedStadium(stadium)}
            >
              <img src={stadium.img} alt={stadium.name} className="stadium-img" />
              <div className="stadium-info">
                <div className="stadium-name">{stadium.name}</div>
                <div className="stadium-location">{stadium.location}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: selectedStadium ? '50%' : '10%' }}></div>
          </div>
          <div className="progress-text">step 1/2</div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons-row">
          <button className="skip-btn" onClick={() => alert('구장정보/팬커뮤니티로 이동합니다. (추후 구현)')}>skip</button>
          <button className="next-btn" onClick={handleNext}>next step</button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-item active">
          <Home size={24} />
          <span>HOME</span>
        </div>
        <div className="nav-item">
          <MapPin size={24} />
          <span>MY COURSES</span>
        </div>
        <div className="nav-item">
          <Mail size={24} />
          <span>COMMUNITY</span>
        </div>
      </div>
    </div>
  );
}
