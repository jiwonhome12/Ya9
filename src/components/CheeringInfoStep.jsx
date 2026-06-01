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

  const [blogsList, setBlogsList] = useState(() => {
    const allBlogs = mockDbService.getBlogs().filter(b => b.mode === 'cheering');
    if (!stadium) return allBlogs;
    return allBlogs.filter(b => !b.stadium || b.stadium.includes(stadium.name) || stadium.name.includes(b.stadium));
  });
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [writeTitle, setWriteTitle] = useState('');
  const [writeDesc, setWriteDesc] = useState('');
  const [writeImage, setWriteImage] = useState('');
  const [writeStadium, setWriteStadium] = useState(stadium ? stadium.name : '');
  const [activeField, setActiveField] = useState('title'); // 'title' or 'desc'

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setWriteImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const insertEmoji = (emoji) => {
    if (activeField === 'title') {
      setWriteTitle(prev => prev + emoji);
    } else {
      setWriteDesc(prev => prev + emoji);
    }
  };

  const handleWriteSubmit = (e) => {
    e.preventDefault();
    if (writeTitle && writeDesc) {
      const profile = mockDbService.getUserProfile();
      mockDbService.addBlogEntry('cheering', writeTitle, writeDesc, profile.name, writeImage, writeStadium);
      const allBlogs = mockDbService.getBlogs().filter(b => b.mode === 'cheering');
      setBlogsList(stadium ? allBlogs.filter(b => !b.stadium || b.stadium.includes(stadium.name) || stadium.name.includes(b.stadium)) : allBlogs);
      alert('블로그 추천 코스가 등록되었습니다! 🎉');
      setWriteTitle('');
      setWriteDesc('');
      setWriteImage('');
      setWriteStadium(stadium ? stadium.name : '');
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
          <button className="create-btn" onClick={() => setShowWriteModal(true)} style={{ cursor: 'pointer' }}><Plus size={14} /> 작성하기</button>
        </div>

        {blogsList.map((blog) => (
          <div key={blog.id} className="course-card" onClick={() => onNavigate(9, { blogId: blog.id })} style={{ cursor: 'pointer', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#333333', margin: '0 0 4px', flex: 1 }}>{blog.title}</h4>
              {blog.stadium && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '9px', fontWeight: '900', color: 'var(--primary-color)', background: 'rgba(108,67,235,0.08)', padding: '2.5px 6px', borderRadius: '6px', flexShrink: 0 }}>
                  <MapPin size={10} color="var(--primary-color)" /> {blog.stadium}
                </span>
              )}
            </div>
            <p className="course-subtitle" style={{ fontSize: '11px', color: '#888888', margin: '0 0 10px', fontWeight: '600' }}>by {blog.author} | {blog.date}</p>
            
            {blog.image ? (
              <div style={{ width: '100%', height: '120px', borderRadius: '10px', overflow: 'hidden', marginBottom: '8px', backgroundColor: '#F1F5F9' }}>
                <img src={blog.image} alt="Blog Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ) : (
              <div className="course-images-row" style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <div className="course-img-placeholder" style={{ flex: 1, height: '60px', backgroundColor: '#F1F5F9', borderRadius: '8px' }}></div>
                <div className="course-img-placeholder" style={{ flex: 1, height: '60px', backgroundColor: '#F1F5F9', borderRadius: '8px' }}></div>
                <div className="course-img-placeholder" style={{ flex: 1, height: '60px', backgroundColor: '#F1F5F9', borderRadius: '8px' }}></div>
              </div>
            )}
            <p className="course-desc" style={{ fontSize: '12px', color: '#666666', margin: 0, lineHeight: '1.5' }}>{blog.desc}</p>
          </div>
        ))}

        {/* Progress Bar (Completed) */}
        <div className="progress-section" style={{ marginTop: '24px' }}>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: '100%' }}></div>
          </div>
          <div className="progress-text">완료</div>
        </div>
      </div>

      {/* Write Blog Modal */}
      {showWriteModal && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
          <div style={{ backgroundColor: 'white', width: '100%', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '20px 24px 30px', position: 'relative', maxHeight: '92vh', overflowY: 'auto' }}>
            <X 
              size={24} 
              color="#888" 
              style={{ position: 'absolute', top: '24px', right: '24px', cursor: 'pointer' }} 
              onClick={() => setShowWriteModal(false)} 
            />
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>응원 코스 추천 작성 ✍️</h3>
            
            <form onSubmit={handleWriteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Photo Upload */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '850', color: '#333' }}>대표 사진 등록 📸</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => document.getElementById('cheer-file-input').click()}
                    style={{ padding: '8px 16px', fontSize: '12px', fontWeight: '800', border: '1px dashed var(--primary-color)', color: 'var(--primary-color)', background: '#FFFFFF', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    사진 업로드
                  </button>
                  <input
                    id="cheer-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                  {writeImage && (
                    <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #EAEAEA' }}>
                      <img src={writeImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
              </div>

              {/* Map/Stadium Select Tag */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '850', color: '#333' }}>구장 장소 태그 📍</label>
                <select
                  value={writeStadium}
                  onChange={(e) => setWriteStadium(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', fontSize: '13px', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', background: '#FFFFFF' }}
                >
                  <option value="">지정 안 함</option>
                  <option value="사직구장">사직구장 (롯데)</option>
                  <option value="잠실구장">잠실구장 (LG/두산)</option>
                  <option value="고척돔">고척돔 (키움)</option>
                  <option value="위즈파크">위즈파크 (KT)</option>
                  <option value="문학구장">문학구장 (SSG)</option>
                  <option value="라이온즈파크">라이온즈파크 (삼성)</option>
                  <option value="볼파크">볼파크 (한화)</option>
                  <option value="챔피언스필드">챔피언스필드 (기아)</option>
                  <option value="엔씨파크">엔씨파크 (NC)</option>
                </select>
              </div>

              {/* Emoji Helper Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justify: 'space-between', items: 'center' }}>
                  <label style={{ fontSize: '13px', fontWeight: '850', color: '#333' }}>이모지 간편 입력 ⚡</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button type="button" onClick={() => setActiveField('title')} style={{ fontSize: '9px', fontWeight: '900', border: 'none', background: activeField === 'title' ? 'var(--primary-color)' : '#EEEEEE', color: activeField === 'title' ? '#FFFFFF' : '#888888', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer' }}>제목</button>
                    <button type="button" onClick={() => setActiveField('desc')} style={{ fontSize: '9px', fontWeight: '900', border: 'none', background: activeField === 'desc' ? 'var(--primary-color)' : '#EEEEEE', color: activeField === 'desc' ? '#FFFFFF' : '#888888', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer' }}>본문</button>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '4px 0' }}>
                  {['⚾', '🔥', '🍻', '🏟️', '🍗', '🍕', '🍰', '🥄', '🌟', '🙌', '💙', '📣'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => insertEmoji(emoji)}
                      style={{ padding: '6px 10px', fontSize: '14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '850', color: '#333' }}>코스 제목</label>
                <input 
                  type="text" 
                  value={writeTitle} 
                  onChange={(e) => setWriteTitle(e.target.value)}
                  onFocus={() => setActiveField('title')}
                  placeholder="예: 나만의 사직구장 꿀팁 코스"
                  style={{ padding: '12px', fontSize: '14px', border: '1px solid #E2E8F0', borderRadius: '12px', outline: 'none' }}
                  required
                />
              </div>

              {/* Description Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '850', color: '#333' }}>코스 설명 및 팁</label>
                <textarea 
                  value={writeDesc} 
                  onChange={(e) => setWriteDesc(e.target.value)}
                  onFocus={() => setActiveField('desc')}
                  placeholder="예: 1루 3층 중앙 시야가 대박이고, 입장 후 팝업부스를 먼저 가세요!"
                  style={{ padding: '12px', fontSize: '14px', border: '1px solid #E2E8F0', borderRadius: '12px', outline: 'none', minHeight: '80px', resize: 'none' }}
                  required
                />
              </div>

              <button 
                type="submit" 
                style={{ width: '100%', padding: '14px', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', transition: 'opacity 0.2s', marginTop: '4px' }}
              >
                등록하기
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="bottom-nav">
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
