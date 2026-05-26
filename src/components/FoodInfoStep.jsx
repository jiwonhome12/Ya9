import React from 'react';
import { ArrowLeft, Home, MapPin, User, Plus, ChevronRight } from 'lucide-react';

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
      <div className="top-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <ArrowLeft className="back-icon" onClick={onBack} />
        <h2 className="top-bar-title" style={{ margin: 0, flex: 1, textAlign: 'center' }}>먹방형 추천 정보</h2>
        {myTeam ? (
          <div 
            className={`my-team-badge ${myTeam}`} 
            onClick={() => onNavigate(3)}
            style={{ cursor: 'pointer' }}
          >
            {myTeam.toUpperCase()}
          </div>
        ) : (
          <div style={{ width: 24 }}></div>
        )}
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

        {/* Nearby Restaurants (Premium Swipe Layout) */}
        <div className="section-header space-between" style={{ marginTop: '30px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            🥄 구장 내 핫플레이스
          </h3>
          <div className="more-link-blue" style={{ margin: 0 }} onClick={() => onNavigate(10, { mode: 'inside' })}>전체보기</div>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '20px', scrollbarWidth: 'none', margin: '0 -16px', padding: '0 16px 20px' }}>
          <div className="food-premium-card" onClick={() => onNavigate(10, { mode: 'inside' })}>
            <div className="food-premium-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60)' }}>
              <div className="food-premium-badge hot">웨이팅 주의🔥</div>
            </div>
            <div className="food-premium-content">
              <h4 className="food-premium-title">잠실 명물 김치말이국수</h4>
              <p className="food-premium-desc">특제 자가제면으로 든든한 한끼! 더운 여름 직관 필수 코스</p>
              <div className="food-premium-footer">
                <span className="food-premium-price">₩6,500</span>
                <span className="food-premium-meta">⭐ 4.8 (1.2k+)</span>
              </div>
            </div>
          </div>

          <div className="food-premium-card" onClick={() => onNavigate(10, { mode: 'inside' })}>
            <div className="food-premium-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60)' }}>
              <div className="food-premium-badge">맥주 찰떡🍺</div>
            </div>
            <div className="food-premium-content">
              <h4 className="food-premium-title">바삭 순살 치킨세트</h4>
              <p className="food-premium-desc">답답한 경기력을 시원하고 바삭하게 날려버릴 치맥세트</p>
              <div className="food-premium-footer">
                <span className="food-premium-price">₩22,500</span>
                <span className="food-premium-meta">⭐ 4.9 (850+)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Outside Restaurants (Premium Swipe Layout) */}
        <div className="section-header space-between" style={{ marginTop: '16px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            🍻 구장 근처 픽업 추천
          </h3>
          <div className="more-link-blue" style={{ margin: 0 }} onClick={() => onNavigate(10, { mode: 'outside' })}>전체보기</div>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '24px', scrollbarWidth: 'none', margin: '0 -16px', padding: '0 16px 24px' }}>
          <div className="food-premium-card" onClick={() => onNavigate(10, { mode: 'outside' })}>
            <div className="food-premium-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60)' }}>
              <div className="food-premium-badge hot">포장할인 3,000원</div>
            </div>
            <div className="food-premium-content">
              <h4 className="food-premium-title">xx 수제 피자</h4>
              <p className="food-premium-desc">야구장 도보 3분! 330mm 초대형 피자로 배부른 직관</p>
              <div className="food-premium-footer">
                <span className="food-premium-price">₩24,900</span>
                <span className="food-premium-meta">⭐ 4.7 (500+)</span>
              </div>
            </div>
          </div>

          <div className="food-premium-card" onClick={() => onNavigate(10, { mode: 'outside' })}>
            <div className="food-premium-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60)' }}>
              <div className="food-premium-badge">1인 추천👍</div>
            </div>
            <div className="food-premium-content">
              <h4 className="food-premium-title">육즙 가득 수제버거</h4>
              <p className="food-premium-desc">혼직관에 딱 맞는 깔끔한 포장, 감자튀김 무료 사이즈업</p>
              <div className="food-premium-footer">
                <span className="food-premium-price">₩12,000</span>
                <span className="food-premium-meta">⭐ 4.6 (320+)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Food Course Schedule */}
        <div className="section-header space-between" style={{ marginTop: '30px' }}>
          <h3>맛집 코스 추천 일정</h3>
          <button className="create-btn" disabled style={{ opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' }}><Plus size={14} /> 작성하기</button>
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
        <div className="nav-item" onClick={() => onNavigate(16)}>
          <Home size={24} />
          <span>홈</span>
        </div>
        <div className="nav-item active" onClick={() => onNavigate(4)}>
          <MapPin size={24} />
          <span>Where to Go?</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate(17)}>
          <User size={24} />
          <span>마이</span>
        </div>
      </div>
    </div>
  );
}
