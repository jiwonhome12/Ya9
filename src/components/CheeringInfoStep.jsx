import React, { useState } from 'react';
import { ArrowLeft, Home, MapPin, User, Play, ShoppingCart, ChevronRight, Plus, X } from 'lucide-react';
import { mockDbService } from '../services/mockDb';

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

const SHOP_URLS = {
  kt: 'https://www.ktwizstore.co.kr/',
  lg: 'https://twinslockerdium.co.kr/',
  lotte: 'https://www.lotteon.com/p/display/seller/sellerShop/lottegiants?ch_no=101509&ch_dtl_no=1049592',
  samsung: 'https://www.samsunglions.com/shop/shopping.asp',
  ssg: 'https://landers.family.ssg.com/',
  kia: 'https://teamstore.tigers.co.kr/',
  kiwoom: 'https://interparkmdshop.com/category/%ED%82%A4%EC%9B%80%ED%9E%88%EC%96%B4%EB%A1%9C%EC%A6%88/29/',
  doosan: 'https://www.doosanbearswefan.shop/',
  nc: 'https://www.ncdinospodshop.com/',
  hanwha: 'https://www.hanwhaeagles.co.kr/SH/PCSH01.do'
};

export default function CheeringInfoStep({ stadium, myTeam, onBack, onNavigate }) {
  const homeTeams = stadium ? STADIUM_TO_TEAM[stadium.id] : ['lg', 'doosan'];

  const [blogsList, setBlogsList] = useState(() => mockDbService.getBlogs().filter(b => b.mode === 'cheering'));
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [writeTitle, setWriteTitle] = useState('');
  const [writeDesc, setWriteDesc] = useState('');

  const handleWriteSubmit = (e) => {
    e.preventDefault();
    if (writeTitle && writeDesc) {
      const profile = mockDbService.getUserProfile();
      mockDbService.addBlogEntry('cheering', writeTitle, writeDesc, profile.name);
      setBlogsList(mockDbService.getBlogs().filter(b => b.mode === 'cheering'));
      alert('블로그 추천 코스가 등록되었습니다! 🎉');
      setWriteTitle('');
      setWriteDesc('');
      setShowWriteModal(false);
    }
  };

  return (
    <div className="main-layout">
      {/* Top Bar */}
      <div className="top-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <ArrowLeft className="back-icon" onClick={onBack} />
        <h2 className="top-bar-title" style={{ margin: 0, flex: 1, textAlign: 'center' }}>응원형 추천 정보</h2>
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

        {/* Hot Zone */}
        <div className="section-header">
          <h3>응원 명당 추천</h3>
          <span className="hot-zone-badge">HOT ZONE</span>
        </div>

        <div className="hot-zone-card">
          <h4>레드석 103구역</h4>
          <ul>
            <li>응원단상 바로앞!</li>
            <li>뜨거운 열정을 즐길 수 있는 존</li>
          </ul>
        </div>

        <div className="sub-zones-row">
          <div className="sub-zone-card">
            <span className="zone-label second-best">SECOND BEST</span>
            <h4>104 구역</h4>
            <p>단상 및 시야 확보</p>
          </div>
          <div className="sub-zone-card">
            <span className="zone-label view-focus">VIEW FOCUS</span>
            <h4>202 구역</h4>
            <p>응원과 경기 동시에 관람</p>
          </div>
        </div>
        <div className="more-link" onClick={() => onNavigate(8)}>더보기</div>

        {/* Store */}
        <h3 className="section-title-simple">
          응원 도구 구매처
        </h3>

        {Array.from(new Set([...homeTeams, myTeam].filter(Boolean))).map(teamId => {
          const bannerInfo = TEAM_BANNERS[teamId];
          const shopUrl = SHOP_URLS[teamId] || (bannerInfo ? bannerInfo.url : '#');
          return bannerInfo ? (
            <a key={teamId} href={shopUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="store-card" style={{ cursor: 'pointer', marginBottom: '8px' }}>
                <div className="store-icon"><ShoppingCart size={20} color="#6C43EB" /></div>
                <div className="store-info">
                  <h4 style={{ textTransform: 'uppercase' }}>{teamId} 팀 스토어</h4>
                  <p>공식 응원용품 구매처로 이동</p>
                </div>
                <ChevronRight className="arrow-right" />
              </div>
            </a>
          ) : null;
        })}

        <div className="store-tags-scroll">
          <span className="store-tag green">외야 팝업 부스</span>
          <span className="store-tag gray">포인트 사용처</span>
          <span className="store-tag gray">중앙 이벤트</span>
        </div>
        <div className="scroll-indicator"></div>

        {/* Youtube Practice */}
        <h3 className="section-title-simple">직관 전 팀 응원가 연습하기</h3>
        <div className="youtube-list">
          {myTeam && (
            <a href={`https://www.youtube.com/results?search_query=${myTeam}+응원가`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="youtube-item" style={{ cursor: 'pointer' }}>
                <div className="youtube-thumb"><Play size={20} color="#555" /></div>
                <div className="youtube-info">
                  <h4 style={{ textTransform: 'uppercase' }}>{myTeam} 공식 응원가 모음</h4>
                  <p className="youtube-channel">유튜브 검색 결과로 이동</p>
                </div>
                <ChevronRight className="arrow-right" size={16} color="#888" />
              </div>
            </a>
          )}
        </div>

        {/* Cheering Course Schedule */}
        <div className="section-header space-between">
          <h3>응원 코스 추천 일정</h3>
          <button className="create-btn" disabled style={{ opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' }}><Plus size={14} /> 작성하기</button>
        </div>

        <div className="course-card" onClick={() => onNavigate(9)} style={{ cursor: 'pointer' }}>
          <h4>oo야구장 꿀팁 궁금하지 않아? 초보...</h4>
          <div className="course-images-row">
            <div className="course-img-placeholder"></div>
            <div className="course-img-placeholder"></div>
            <div className="course-img-placeholder"></div>
          </div>
          <div className="scroll-indicator-full"></div>
          <p className="course-desc">feat. 꿀좌석, 응원용품 구매, 현장 예매 꿀팁, 야구선수 싸인 받는법</p>
        </div>

        <div className="course-card" onClick={() => onNavigate(9)} style={{ cursor: 'pointer' }}>
          <h4>봄, 여름 직관 준비물 이거 없으면...</h4>
          <div className="course-images-row">
            <div className="course-img-placeholder"></div>
            <div className="course-img-placeholder"></div>
            <div className="course-img-placeholder"></div>
          </div>
          <div className="scroll-indicator-full"></div>
          <p className="course-desc">feat. 직관 준비물 꿀팁, 좌석추천, 시야, 주차장</p>
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
