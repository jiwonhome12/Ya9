import React, { useState } from 'react';
import { ArrowLeft, Home, MapPin, User, Plus, ChevronRight, X } from 'lucide-react';
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

export default function FoodInfoStep({ stadium, myTeam, onBack, onNavigate }) {
  const homeTeams = stadium ? STADIUM_TO_TEAM[stadium.id] : ['lg', 'doosan'];

  const [blogsList, setBlogsList] = useState(() => mockDbService.getBlogs().filter(b => b.mode === 'food'));
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [writeTitle, setWriteTitle] = useState('');
  const [writeDesc, setWriteDesc] = useState('');
  const [writeImage, setWriteImage] = useState('');
  const [writeStadium, setWriteStadium] = useState('');
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
      mockDbService.addBlogEntry('food', writeTitle, writeDesc, profile.name, writeImage, writeStadium);
      setBlogsList(mockDbService.getBlogs().filter(b => b.mode === 'food'));
      alert('블로그 추천 코스가 등록되었습니다! 🎉');
      setWriteTitle('');
      setWriteDesc('');
      setWriteImage('');
      setWriteStadium('');
      setShowWriteModal(false);
    }
  };

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

        {/* Inside Stadium Hotplaces Section (Mockup Card Layout) */}
        <div className="section-header space-between" style={{ marginTop: '24px', alignItems: 'center' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, fontSize: '17px', fontWeight: '800' }}>
            🥄 구장 내 맛집
          </h3>
          <span style={{ backgroundColor: '#FADBD8', color: '#E74C3C', fontSize: '9px', fontWeight: '900', padding: '3px 8px', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            HOT PLACE
          </span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px' }}>
          {(() => {
            const currentStadiumFoods = mockDbService.getFoods().filter(f => f.stadiumId === (stadium?.id || 'jamsil') && f.type === 'inside');
            // If empty, fall back to Jamsil inside foods as beautiful visual examples
            const displayFoods = currentStadiumFoods.length > 0 
              ? currentStadiumFoods 
              : mockDbService.getFoods().filter(f => f.stadiumId === 'jamsil' && f.type === 'inside');

            return displayFoods.slice(0, 2).map((food, idx) => {
              const isActive = idx === 0; // First item is highlighted active as per mockup
              const rawPoints = food.desc ? food.desc.split(/[!.]/).filter(p => p.trim() !== '') : [];
              const descPoints = rawPoints.length > 0 ? rawPoints : [food.desc || ''];

              return (
                <div 
                  key={food.id} 
                  onClick={() => onNavigate(10, { mode: 'inside' })}
                  style={{ 
                    cursor: 'pointer',
                    borderRadius: '16px',
                    border: isActive ? '2px solid var(--primary-color)' : '1px solid #E2E8F0',
                    overflow: 'hidden',
                    backgroundColor: '#FFFFFF',
                    boxShadow: isActive ? '0 4px 12px rgba(108,67,235,0.08)' : '0 2px 6px rgba(0,0,0,0.02)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Big Image Banner with Rating pill */}
                  <div style={{ position: 'relative', width: '100%', height: '150px', backgroundImage: `url(${food.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F1F5F9' }}>
                    <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#48C9B0', color: '#FFFFFF', fontSize: '11px', fontWeight: '850', padding: '4px 10px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      ⭐ {food.rating.toFixed(1)}
                    </div>
                  </div>

                  {/* Food/Store Info */}
                  <div style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '850', color: '#111', wordBreak: 'break-all' }}>{food.name}</h4>
                      <span style={{ fontSize: '14px', fontWeight: '850', color: 'var(--primary-color)' }}>
                        ₩{food.price.toLocaleString()}
                      </span>
                    </div>
                    
                    <ul style={{ listStyleType: 'disc', paddingLeft: '16px', margin: '8px 0 0 0', fontSize: '11.5px', color: '#666', lineHeight: '1.5', wordBreak: 'break-all' }}>
                      {descPoints.slice(0, 2).map((point, pIdx) => (
                        <li key={pIdx}>{point.trim()}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            });
          })()}
        </div>

        <div 
          onClick={() => onNavigate(10, { mode: 'inside' })} 
          style={{ textAlign: 'center', color: 'var(--primary-color)', fontSize: '12px', fontWeight: '850', cursor: 'pointer', margin: '12px 0 24px' }}
        >
          더보기
        </div>

        <div className="divider" style={{ borderBottom: '1px solid #EAEAEA', margin: '16px 0' }}></div>

        {/* Near Stadium Restaurants Section (Mockup Row Layout) */}
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: '800', margin: '0 0 12px 0', color: '#111' }}>
            구장 근처 맛집
          </h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(() => {
            const currentStadiumFoods = mockDbService.getFoods().filter(f => f.stadiumId === (stadium?.id || 'jamsil') && f.type === 'outside');
            // If empty, fall back to Jamsil outside foods as beautiful visual examples
            const displayFoods = currentStadiumFoods.length > 0 
              ? currentStadiumFoods 
              : mockDbService.getFoods().filter(f => f.stadiumId === 'jamsil' && f.type === 'outside');

            return displayFoods.slice(0, 2).map((food, idx) => {
              const isActive = idx === 0; // First item is highlighted active as per mockup
              const distanceText = idx === 0 ? '330MM * 도보 3분' : '660MM * 도보 10분';

              return (
                <div 
                  key={food.id}
                  onClick={() => onNavigate(10, { mode: 'outside' })}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: '16px',
                    border: isActive ? '2px solid var(--primary-color)' : '1px solid #E2E8F0',
                    backgroundColor: '#FFFFFF',
                    boxShadow: isActive ? '0 4px 12px rgba(108,67,235,0.08)' : '0 2px 6px rgba(0,0,0,0.02)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Small Square Image */}
                  <div style={{ width: '56px', height: '56px', borderRadius: '10px', backgroundImage: `url(${food.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F1F5F9', flexShrink: 0 }} />

                  {/* Middle Proximity Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '13.5px', fontWeight: '850', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {food.name}
                    </h4>
                    <span style={{ fontSize: '10.5px', color: '#666', fontWeight: '750', display: 'block' }}>
                      {distanceText}
                    </span>
                  </div>

                  {/* Right Chevron arrow icon */}
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', flexShrink: 0 }}>
                    <ChevronRight size={16} />
                  </div>
                </div>
              );
            });
          })()}
        </div>

        <div 
          onClick={() => onNavigate(10, { mode: 'outside' })} 
          style={{ textAlign: 'center', color: 'var(--primary-color)', fontSize: '12px', fontWeight: '850', cursor: 'pointer', margin: '12px 0 24px' }}
        >
          더보기
        </div>

        {/* Food Course Schedule */}
        <div className="section-header space-between" style={{ marginTop: '30px' }}>
          <h3>맛집 코스 추천 일정</h3>
          <button className="create-btn" onClick={() => setShowWriteModal(true)} style={{ cursor: 'pointer' }}><Plus size={14} /> 작성하기</button>
        </div>
        
        {blogsList.map((blog) => (
          <div key={blog.id} className="course-card highlight-border" onClick={() => onNavigate(11, { blogId: blog.id })} style={{ cursor: 'pointer', marginBottom: '12px' }}>
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
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>맛집 코스 추천 작성 🥄</h3>
            
            <form onSubmit={handleWriteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Photo Upload */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '850', color: '#333' }}>대표 사진 등록 📸</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => document.getElementById('food-file-input').click()}
                    style={{ padding: '8px 16px', fontSize: '12px', fontWeight: '800', border: '1px dashed var(--primary-color)', color: 'var(--primary-color)', background: '#FFFFFF', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    사진 업로드
                  </button>
                  <input
                    id="food-file-input"
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
                  placeholder="예: 나만의 잠실 삼겹살 정복 코스"
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
                  placeholder="예: 내부 삼겹살 광장은 경기 1시간 전에 무조건 가야하고, 2번 구역 B열 시야가 삼겹살 먹기에 제일 쾌적해요!"
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
