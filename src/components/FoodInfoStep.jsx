import React from 'react';
import { ArrowLeft, Home, MapPin, Mail, Plus, ChevronRight } from 'lucide-react';

const TEAM_BANNERS = {
  kiwoom: { img: 'kiwoomheroes.png', url: 'https://www.heroesbaseball.co.kr/' },
  lotte: { img: 'lottegiants.png', url: 'https://www.giantsclub.com/' },
  doosan: { img: 'doosanbears.png', url: 'https://www.doosanbears.com/' },
  hanwha: { img: 'hanwhaeagles.png', url: 'https://www.hanwhaeagles.co.kr/' },
  kia: { img: 'kiatigers.png', url: 'https://tigers.co.kr/' },
  kt: { img: 'ktwiz.png', url: 'https://www.ktwiz.co.kr/' },
  lg: { img: 'lgtwins.png', url: 'https://www.lgtwins.com/' },
  nc: { img: 'ncdinos.png', url: 'https://www.ncdinos.com/' },
  samsung: { img: 'samsunglions.png', url: 'https://www.samsunglions.com/' },
  ssg: { img: 'ssglanders.png', url: 'https://www.ssglanders.com/' },
};

const STADIUM_TO_TEAM = {
  sajik: ['lotte'],
  jamsil: ['lg', 'doosan'], // 잠실은 LG, 두산 둘 다 노출
  gocheok: ['kiwoom'],
  wizpark: ['kt'],
  munhak: ['ssg'],
  lionspark: ['samsung'],
  ballpark: ['hanwha'],
  champions: ['kia'],
  ncpark: ['nc']
};

export default function FoodInfoStep({ stadium, myTeam, onBack, onNavigate }) {
  const homeTeams = stadium ? STADIUM_TO_TEAM[stadium.id] : ['lg', 'doosan'];

  return (
    <div className="main-layout">
      {/* Top Bar */}
      <div className="top-bar">
        <ArrowLeft className="back-icon" onClick={onBack} />
        <h2 className="top-bar-title">먹방형 추천 정보</h2>
      </div>

      <div className="main-content scrollable">
        <div className="selected-stadium-info small">
          선택된 구장
          <ul>
            <li>{stadium?.name || '잠실 야구장'}</li>
          </ul>
        </div>

        {/* Team Banner */}
        <div className="banner-container">
          {homeTeams.map(teamId => {
            const bannerInfo = TEAM_BANNERS[teamId];
            return bannerInfo ? (
              <a key={teamId} href={bannerInfo.url} target="_blank" rel="noopener noreferrer">
                <img 
                  src={`/images/${bannerInfo.img}`} 
                  alt={`${teamId} banner`} 
                  className="team-banner" 
                />
              </a>
            ) : null;
          })}
          <p className="banner-caption">* 사진 선택시 구장 정보 및 실시간 안내사항 확인 가능 - 구단 홈페이지로 이동</p>
        </div>

        {/* Nearby Restaurants (New Large Card Design) */}
        <h3 className="section-title-simple" style={{ fontSize: '18px', marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🥄 구장 내 맛집
          <span style={{ marginLeft: 'auto' }} className="hot-zone-badge">HOT PLACE</span>
        </h3>
        
        <div className="food-large-card highlighted" onClick={() => onNavigate(10, { mode: 'inside' })}>
          <div className="food-img-large">
            <div className="star-badge">⭐ 4.8</div>
          </div>
          <div className="food-card-bottom">
            <div className="food-title-row">
              <h4>OO 떡볶이</h4>
              <span className="food-price">₩6,500</span>
            </div>
            <ul>
              <li>잠실 대표! 김치말이 국수</li>
              <li>특제 자가제면으로 든든한 한끼</li>
            </ul>
          </div>
        </div>

        <div className="food-large-card" onClick={() => onNavigate(10, { mode: 'inside' })}>
          <div className="food-img-large">
            <div className="star-badge">⭐ 4.9</div>
          </div>
          <div className="food-card-bottom">
            <div className="food-title-row">
              <h4>OO 치킨</h4>
              <span className="food-price">₩22,500</span>
            </div>
            <ul>
              <li>생맥주 맛집</li>
              <li>답답한 경기력을 시원하고 바삭하게 날려버릴 치킨세트</li>
            </ul>
          </div>
        </div>
        
        <div className="more-link-blue" onClick={() => onNavigate(10, { mode: 'inside' })}>더보기</div>

        {/* Outside Restaurants (For completion, using similar design) */}
        <h3 className="section-title-simple" style={{ fontSize: '18px', marginTop: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🍻 구장 근처 맛집
        </h3>
        
        <div className="food-large-card" onClick={() => onNavigate(10, { mode: 'outside' })}>
          <div className="food-img-large">
            <div className="star-badge">⭐ 4.7</div>
          </div>
          <div className="food-card-bottom">
            <div className="food-title-row">
              <h4>xx 치킨</h4>
              <span className="food-price">₩24,900</span>
            </div>
            <ul>
              <li>330mm * 도보 3분</li>
              <li>포장 주문시 3000원 할인</li>
            </ul>
          </div>
        </div>
        <div className="more-link-blue" onClick={() => onNavigate(10, { mode: 'outside' })}>더보기</div>

        {/* Food Course Schedule */}
        <div className="section-header space-between" style={{ marginTop: '30px' }}>
          <h3>맛집 코스 추천 일정</h3>
          <button className="create-btn"><Plus size={14} /> 작성하기</button>
        </div>
        
        <div className="course-card highlight-border" onClick={() => onNavigate(11)} style={{ cursor: 'pointer' }}>
          <h4>oo야구장 먹거리 리스트</h4>
          <p className="course-subtitle">2026신상 맛집 정리...</p>
          <div className="course-images-row">
            <div className="course-img-placeholder"></div>
            <div className="course-img-placeholder"></div>
            <div className="course-img-placeholder"></div>
          </div>
          <div className="scroll-indicator-full"></div>
          <p className="course-desc">feat. 내부 먹거리 요아정, 타코잇, 보영만두, 주문후 대기 꿀팁, +좌석 배달 범위, 포장팁</p>
        </div>

        <div className="course-card" onClick={() => onNavigate(11)} style={{ cursor: 'pointer' }}>
          <h4>oo야구장 근처 맛집 리스트</h4>
          <p className="course-subtitle gray">oo돌곱창</p>
          <div className="course-images-row">
            <div className="course-img-placeholder"></div>
            <div className="course-img-placeholder"></div>
            <div className="course-img-placeholder"></div>
          </div>
          <div className="scroll-indicator-full"></div>
          <p className="course-desc">feat. 소문난 돌곱창집, 야구선수들도 방문하는,,, 휴식으로 oo카페까지 가면 할인</p>
        </div>

        {/* Progress Bar (Completed) */}
        <div className="progress-section" style={{ marginTop: '24px' }}>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: '100%' }}></div>
          </div>
          <div className="progress-text">완료</div>
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
