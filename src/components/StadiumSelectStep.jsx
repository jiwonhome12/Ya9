import React, { useState } from 'react';
import { Search, Home, MapPin, User, Menu } from 'lucide-react';

const STADIUMS = [
  { id: 'sajik', name: '사직구장', location: '부산 - 롯데', city: '부산', team: '롯데', keywords: 'lotte giants 롯데 자이언츠 사직 giants', homeImage: '/images/sajik(1).jpg', awayImage: '/images/sajik.jpeg', lat: 35.1940, lng: 129.0610 },
  { id: 'jamsil', name: '잠실구장', location: '서울 - LG/두산', city: '서울', team: 'LG/두산', keywords: 'lg twins lgtwins doosan bears 두산 베어스 엘지 트윈스 jamsil 잠실 bears twins', homeImage: '/images/jamsil(1).jpeg', awayImage: '/images/jamsil.jpeg', lat: 37.5122, lng: 127.0719 },
  { id: 'gocheok', name: '고척돔', location: '서울 - 키움', city: '서울', team: '키움', keywords: 'kiwoom heroes 키움 히어로즈 고척돔 gocheok dome heroes', homeImage: '/images/gocheok(1).jpg', awayImage: '/images/gocheok.jpeg', lat: 37.4982, lng: 126.8671 },
  { id: 'wizpark', name: '위즈 파크', location: '수원 - KT', city: '수원', team: 'KT', keywords: 'kt wiz 케이티 위즈 wizpark 위즈파크 수원 wiz', homeImage: '/images/wizpark(1).jpg', awayImage: '/images/wizpark.jpeg', lat: 37.2998, lng: 127.0097 },
  { id: 'munhak', name: '문학 구장', location: '인천 - SSG', city: '인천', team: 'SSG', keywords: 'ssg landers ssglanders 쓱 에스에스지 랜더스 문학 인천 munhak landers', homeImage: '/images/ssg(1).jpg', awayImage: '/images/ssg.jpeg', lat: 37.4371, lng: 126.6933 },
  { id: 'lionspark', name: '라이온즈 파크', location: '대구 - 삼성', city: '대구', team: '삼성', keywords: 'samsung lions 삼성 라이온즈 라팍 lionspark 대구 lions', homeImage: '/images/lionspark(1).jpg', awayImage: '/images/lionspark.jpeg', lat: 35.8412, lng: 128.6816 },
  { id: 'ballpark', name: '볼 파크', location: '대전 - 한화', city: '대전', team: '한화', keywords: 'hanwha eagles 한화 이글스 대전 한밭 eagles ballpark', homeImage: '/images/hanwha(1).jpg', awayImage: '/images/hanwha.jpeg', lat: 36.3172, lng: 127.4292 },
  { id: 'champions', name: '챔피언스필드', location: '광주 - 기아', city: '광주', team: '기아', keywords: 'kia tigers kia 기아 타이거즈 광주 챔필 champions field tigers', homeImage: '/images/champions(1).jpg', awayImage: '/images/champions.jpeg', lat: 35.1682, lng: 126.8891 },
  { id: 'ncpark', name: '엔씨 파크', location: '창원 - NC', city: '창원', team: 'NC', keywords: 'nc dinos nc 엔씨 다이노스 창원 ncpark 엔팍 dinos', homeImage: '/images/ncpark(1).jpg', awayImage: '/images/ncpark.jpeg', lat: 35.2227, lng: 128.5812 },
];

const TEAM_MAPPING = {
  lotte: '롯데',
  lg: 'LG',
  doosan: '두산',
  kia: '기아',
  samsung: '삼성',
  ssg: 'SSG',
  nc: 'NC',
  kiwoom: '키움',
  hanwha: '한화',
  kt: 'KT'
};

export default function StadiumSelectStep({ onNext, myTeam, onNavigate }) {
  const activeTeam = myTeam || 'lotte';
  const [selectedStadium, setSelectedStadium] = useState(null); // No stadium selected by default
  const [isAway, setIsAway] = useState(true); // Default to Away (원정)
  const [searchQuery, setSearchQuery] = useState('');

  const handleStadiumSelect = (stadium) => {
    setSelectedStadium(stadium);
    const koreanTeam = TEAM_MAPPING[activeTeam];
    if (koreanTeam && stadium.team.includes(koreanTeam)) {
      setIsAway(false); // Home
    } else {
      setIsAway(true); // Away
    }
    if (selectedStadium?.id === stadium.id) {
      onNext(stadium);
    }
  };

  const handleNext = () => {
    if (selectedStadium) {
      onNext(selectedStadium);
    } else {
      alert('구장을 선택해주세요.');
    }
  };

  const filteredStadiums = STADIUMS.filter(s => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      s.name.toLowerCase().includes(q) || 
      s.location.toLowerCase().includes(q) ||
      (s.keywords && s.keywords.toLowerCase().includes(q))
    );
  });

  return (
    <div className="main-layout" style={{ background: '#FFFFFF', fontFamily: 'Inter, sans-serif', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top Header */}
      <div className="main-header" style={{ borderBottom: '1px solid #EAEAEA', background: '#FFFFFF' }}>
        <Menu className="menu-icon" style={{ cursor: 'pointer', color: '#555555' }} onClick={() => onNavigate(17, { tab: 'extra' })} />
        <div className="logo-text" style={{ fontStyle: 'normal', fontWeight: '800' }}>Ya9</div>
        <div 
          className={`my-team-badge ${activeTeam}`} 
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate(3)} // Return to MyTeam onboarding
        >
          {activeTeam.toUpperCase()}
        </div>
      </div>

      {/* Main Container */}
      <div className="main-content scrollable" style={{ background: '#FAFAFA', padding: '16px', paddingBottom: '110px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Title and Home/Away Switcher (5.png) */}
        <div className="stadium-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0 16px' }}>
          <h2 className="main-title" style={{ fontSize: '18px', fontWeight: '800', color: '#111111', margin: 0 }}>
            오늘 어느 구장으로 가시나요?
          </h2>
          
          {/* Toggle Switch */}
          <div 
            className="toggle-switch" 
            onClick={() => setIsAway(!isAway)}
            style={{
              display: 'flex',
              background: '#EEEEEE',
              borderRadius: '20px',
              padding: '2.5px',
              cursor: 'pointer',
              border: '1px solid #E0E0E0'
            }}
          >
            <div 
              className="toggle-btn"
              style={{
                padding: '6px 14px',
                fontSize: '11px',
                fontWeight: '800',
                borderRadius: '16px',
                transition: 'all 0.25s',
                background: isAway ? 'var(--primary-color)' : 'transparent',
                color: isAway ? '#FFFFFF' : '#888888'
              }}
            >
              원정
            </div>
            <div 
              className="toggle-btn"
              style={{
                padding: '6px 14px',
                fontSize: '11px',
                fontWeight: '800',
                borderRadius: '16px',
                transition: 'all 0.25s',
                background: !isAway ? 'var(--primary-color)' : 'transparent',
                color: !isAway ? '#FFFFFF' : '#888888'
              }}
            >
              홈
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="search-input-wrapper" style={{ marginBottom: '20px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search className="search-icon" size={18} style={{ position: 'absolute', left: '12px', color: '#999999' }} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="구장 이름 또는 팀명 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 38px',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                fontSize: '13px',
                color: '#333333',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Stadiums Grid (3 columns matching 5.png) */}
        <div className="stadium-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
          {filteredStadiums.map((stadium) => {
            const isSelected = selectedStadium?.id === stadium.id;
            return (
              <div 
                key={stadium.id} 
                className={`stadium-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleStadiumSelect(stadium)}
                onDoubleClick={() => onNext(stadium)}
                style={{
                  border: isSelected ? '2px solid var(--primary-color)' : '1px solid #E2E8F0',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: '#FFFFFF',
                  boxShadow: isSelected ? '0 6px 15px rgba(0,0,0,0.05)' : 'none'
                }}
              >
                {/* Visual Stadium Image */}
                <div style={{ width: '100%', height: '56px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #E2E8F0', backgroundColor: '#F1F5F9' }}>
                  <img 
                    src={isAway ? stadium.awayImage : stadium.homeImage} 
                    alt={stadium.name} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  {isSelected && (
                    <div style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      background: 'rgba(108, 67, 235, 0.25)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <div style={{ background: '#FFFFFF', borderRadius: '50%', padding: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                        <MapPin size={12} color="var(--primary-color)" />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Stadium Info Label */}
                <div style={{ padding: '8px', textAlign: 'center', minHeight: '52px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#333333', lineHeight: '1.3' }}>{stadium.name}</div>
                  <div style={{ fontSize: '9px', color: '#888888', fontWeight: '700', marginTop: '3px' }}>
                    {stadium.city} - {stadium.team}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress step-bar (50% filled with KBO team theme color) */}
        <div className="progress-section" style={{ margin: '8px 0 20px' }}>
          <div className="progress-bar-bg" style={{ height: '7px', background: '#EAEAEA', borderRadius: '4px', overflow: 'hidden', marginBottom: '6px' }}>
            <div 
              className="progress-bar-fill" 
              style={{ 
                height: '100%', 
                width: '50%', 
                background: 'var(--primary-color)',
                borderRadius: '4px'
              }}
            ></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', color: '#888888', fontWeight: '700' }}>Where to Go?</span>
            <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary-color)', textTransform: 'uppercase' }}>step 1/2</span>
          </div>
        </div>

        {/* Back and Next buttons */}
        <div className="action-buttons-row" style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexShrink: 0 }}>
          <button 
            className="skip-btn" 
            onClick={() => onNavigate(16)} // Goes back to Home step 16
            style={{
              flex: 1,
              padding: '14px',
              backgroundColor: '#EEEEEE',
              color: '#666666',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            back
          </button>
          
          <button 
            className="next-btn" 
            onClick={handleNext}
            style={{
              flex: 2,
              padding: '14px',
              backgroundColor: 'var(--primary-color)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            next step
          </button>
        </div>

      </div>

      {/* 3-tab Bottom Navigation */}
      <div className="bottom-nav" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, borderTop: '1px solid #EAEAEA', background: '#FFFFFF', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 30 }}>
        <div className="nav-item" onClick={() => onNavigate(16)}>
          <Home size={24} />
        </div>
        <div className="nav-item active" onClick={() => onNavigate(4)}>
          <MapPin size={24} />
        </div>
        <div className="nav-item" onClick={() => onNavigate(17)}>
          <User size={24} />
        </div>
      </div>
    </div>
  );
}
