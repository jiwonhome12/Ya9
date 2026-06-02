import React, { useState, useEffect, useRef } from 'react';
import { Award, Plus, Trash2, Calendar, MapPin, Heart, Bookmark, ChevronRight, ChevronLeft, Check, Home, Mail, User, Edit2, LogOut, RefreshCw } from 'lucide-react';
import { mockDbService } from '../services/mockDb';

const KBO_TEAMS = [
  { code: 'kt', name: 'KT 위즈' },
  { code: 'lg', name: 'LG 트윈스' },
  { code: 'kia', name: 'KIA 타이거즈' },
  { code: 'doosan', name: '두산 베어스' },
  { code: 'samsung', name: '삼성 라이온즈' },
  { code: 'ssg', name: 'SSG 랜더스' },
  { code: 'nc', name: 'NC 다이노스' },
  { code: 'lotte', name: '롯데 자이언츠' },
  { code: 'kiwoom', name: '키움 히어로즈' },
  { code: 'hanwha', name: '한화 이글스' }
];

export default function MyPageStep({ onNavigate, myTeam, savedFoods, savedBlogs, onToggleFood, onToggleBlog, initialTab, onLogout }) {
  const activeTeam = myTeam || 'lotte';
  const [profile, setProfile] = useState(() => mockDbService.getUserProfile());

  const [activeTab, setActiveTab] = useState(initialTab || 'diary');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);


  const [diaryList, setDiaryList] = useState([]);
  const [stats, setStats] = useState({ wins: 0, losses: 0, draws: 0, total: 0, winRate: 0 });

  // Diary Entry Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [diaryDate, setDiaryDate] = useState(new Date().toISOString().split('T')[0]);
  const [diaryStadium, setDiaryStadium] = useState('잠실구장');
  const [diaryVsTeam, setDiaryVsTeam] = useState('lg');
  const [diaryResult, setDiaryResult] = useState('W'); // 'W', 'L', 'D'
  const [diaryMyScore, setDiaryMyScore] = useState('');
  const [diaryVsScore, setDiaryVsScore] = useState('');

  // Profile Edit Form State
  const [profileName, setProfileName] = useState(profile.name || 'ji_won.-.f');
  const [profileBio, setProfileBio] = useState(profile.bio || '제발 가을 야구좀 가자 😭');
  const [profileAvatar, setProfileAvatar] = useState(profile.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150');
  
  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  // Retrieve full detailed objects from mock DB based on props
  const allFoods = mockDbService.getFoods();
  const allBlogs = mockDbService.getBlogs();

  const savedFoodsList = allFoods.filter(f => savedFoods.includes(f.id));
  const savedBlogsList = allBlogs.filter(b => savedBlogs.includes(b.id));

  useEffect(() => {
    loadDiaryData();
    const latest = mockDbService.getUserProfile();
    setProfile(latest);
    setProfileName(latest.name || 'ji_won.-.f');
    setProfileBio(latest.bio || '제발 가을 야구좀 가자 😭');
    setProfileAvatar(latest.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150');
  }, [activeTeam, myTeam]);

  const loadDiaryData = () => {
    const list = mockDbService.getDiary();
    setDiaryList(list);
    const calculatedStats = mockDbService.getDiaryStats(activeTeam);
    setStats(calculatedStats);
  };

  const handleAddDiary = (e) => {
    e.preventDefault();
    mockDbService.addDiaryEntry(
      diaryDate,
      diaryStadium,
      activeTeam,
      diaryVsTeam,
      diaryResult,
      diaryMyScore,
      diaryVsScore
    );
    loadDiaryData();
    setShowAddForm(false);
    // Reset form
    setDiaryMyScore('');
    setDiaryVsScore('');
  };

  const handleDeleteDiary = (id) => {
    mockDbService.deleteDiaryEntry(id);
    loadDiaryData();
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = mockDbService.saveUserProfile({
      name: profileName.trim(),
      bio: profileBio.trim(),
      avatar: profileAvatar
    });
    setProfile(updated);
    alert('프로필 수정이 완료되었습니다! ✨');
    setActiveTab('diary');
  };

  const handleLogout = () => {
    if (window.confirm('정말 로그아웃 하시겠습니까? 🔒')) {
      if (onLogout) {
        onLogout();
      } else {
        onNavigate(1);
      }
    }
  };

  return (
    <div className="main-layout" style={{ background: '#FFFFFF', fontFamily: 'Inter, sans-serif' }}>
      {/* Top Header */}
      <div className="main-header" style={{ borderBottom: '1px solid #EAEAEA', background: '#FFFFFF', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        {activeTab === 'extra' ? (
          <button 
            onClick={() => onNavigate(16)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ChevronLeft size={24} color="#555555" />
          </button>
        ) : (
          <button 
            onClick={handleLogout} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E1002A' }}
            title="로그아웃"
          >
            <LogOut size={20} />
          </button>
        )}
        <h1 className="logo-text" style={{ fontSize: '18px', fontWeight: '800', textAlign: 'center', flex: 1, margin: 0 }}>
          {activeTab === 'extra' ? '설정 및 기타' : '마이페이지'}
        </h1>
        <div 
          className={`my-team-badge ${activeTeam}`} 
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate(3)} // Return to MyTeam onboarding
        >
          {activeTeam.toUpperCase()}
        </div>
      </div>

      {/* Main Container */}
      <div className="main-content scrollable" style={{ background: '#FAFAFA', padding: '16px', paddingBottom: '90px' }}>
        
        {/* Profile Card Layout */}
        <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '20px', border: '1px solid #EAEAEA', display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--primary-color)', flexShrink: 0 }}>
            <img src={profile.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#111111' }}>{profile.name}</span>
              <span style={{ fontSize: '9px', fontWeight: '900', color: 'var(--primary-color)', background: 'rgba(108,67,235,0.08)', padding: '1.5px 5px', borderRadius: '4px', textTransform: 'uppercase' }}>
                {activeTeam}
              </span>
              {activeTab !== 'extra' && (
                <button 
                  onClick={() => setActiveTab('extra')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="프로필 편집"
                >
                  <Edit2 size={13} color="#888888" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.currentTarget.style.color = '#888888'} />
                </button>
              )}
            </div>
            <p style={{ fontSize: '11px', color: '#666666', margin: 0, fontWeight: '600', lineHeight: '1.4' }}>
              {profile.bio}
            </p>
          </div>
        </div>

        {/* Navigation Tabs (3 tabs now when not in extra screen) */}
        {activeTab !== 'extra' && (
          <div style={{ display: 'flex', borderBottom: '1px solid #EAEAEA', marginBottom: '16px' }}>
            <button
              onClick={() => setActiveTab('diary')}
              style={{
                flex: 1,
                padding: '12px 0',
                textAlign: 'center',
                fontSize: '11px',
                fontWeight: '800',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderBottom: activeTab === 'diary' ? '2.5px solid var(--primary-color)' : '2.5px solid transparent',
                color: activeTab === 'diary' ? '#111111' : '#888888',
                transition: 'all 0.2s'
              }}
            >
              직관 기록부
            </button>
            <button
              onClick={() => setActiveTab('scrap')}
              style={{
                flex: 1,
                padding: '12px 0',
                textAlign: 'center',
                fontSize: '11px',
                fontWeight: '800',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderBottom: activeTab === 'scrap' ? '2.5px solid var(--primary-color)' : '2.5px solid transparent',
                color: activeTab === 'scrap' ? '#111111' : '#888888',
                transition: 'all 0.2s'
              }}
            >
              저장 목록
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              style={{
                flex: 1,
                padding: '12px 0',
                textAlign: 'center',
                fontSize: '11px',
                fontWeight: '800',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderBottom: activeTab === 'reviews' ? '2.5px solid var(--primary-color)' : '2.5px solid transparent',
                color: activeTab === 'reviews' ? '#111111' : '#888888',
                transition: 'all 0.2s'
              }}
            >
              내가 쓴 리뷰
            </button>
          </div>
        )}

        {/* Tab 1: Diary Section */}
        {activeTab === 'diary' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* SVG Donut stats card */}
            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '20px', border: '1px solid #EAEAEA', display: 'flex', gap: '20px', justify: 'center', items: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%', justifyContent: 'center' }}>
                {/* SVG Donut */}
                <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                  <svg style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }} viewBox="0 0 36 36">
                    <path
                      stroke="#F2F2F2"
                      strokeWidth="3.5"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      stroke="var(--primary-color)"
                      strokeDasharray={`${stats.winRate || 0}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '16px', fontWeight: '900', color: '#111111' }}>{stats.winRate || 0}%</span>
                    <span style={{ fontSize: '8px', fontWeight: '800', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '1px' }}>승요 지수</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', borderLeft: '1px solid #EEEEEE', paddingLeft: '20px' }}>
                  <span style={{ fontSize: '12px', color: '#666666', fontWeight: '600' }}>총 직관 수: <strong style={{ color: '#111111' }}>{stats.total}경기</strong></span>
                  <span style={{ fontSize: '12px', color: '#E1002A', fontWeight: '700' }}>승리: <strong style={{ color: '#111111' }}>{stats.wins}</strong></span>
                  <span style={{ fontSize: '12px', color: '#0066B3', fontWeight: '700' }}>패배: <strong style={{ color: '#111111' }}>{stats.losses}</strong></span>
                  <span style={{ fontSize: '12px', color: '#888888', fontWeight: '700' }}>무승부: <strong style={{ color: '#111111' }}>{stats.draws}</strong></span>
                </div>
              </div>
            </div>

            {/* Add Diary Button */}
            {!showAddForm ? (
              <button 
                onClick={() => setShowAddForm(true)}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: 'var(--primary-color)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '14px',
                  fontWeight: '800',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 10px rgba(108,67,235,0.2)'
                }}
              >
                <Plus size={16} /> 새로운 직관 기록 추가
              </button>
            ) : (
              <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '20px', border: '1px solid #EAEAEA', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EEEEEE', paddingBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#333333' }}>직관기록 추가</span>
                  <button onClick={() => setShowAddForm(false)} style={{ background: 'none', border: 'none', color: '#888888', cursor: 'pointer', fontWeight: '800' }}>✕</button>
                </div>

                <form onSubmit={handleAddDiary} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '10px', fontWeight: '800', color: '#666666' }}>경기 날짜</label>
                      <input 
                        type="date" 
                        value={diaryDate}
                        onChange={(e) => setDiaryDate(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', fontSize: '12px', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                        required
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '10px', fontWeight: '800', color: '#666666' }}>경기 구장</label>
                      <input 
                        type="text" 
                        value={diaryStadium}
                        onChange={(e) => setDiaryStadium(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', fontSize: '12px', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '10px', fontWeight: '800', color: '#666666' }}>상대 팀</label>
                      <select
                        value={diaryVsTeam}
                        onChange={(e) => setDiaryVsTeam(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', fontSize: '12px', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', background: '#FFFFFF' }}
                        required
                      >
                        {KBO_TEAMS.filter(t => t.code !== activeTeam).map(t => (
                          <option key={t.code} value={t.code}>{t.name}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '10px', fontWeight: '800', color: '#666666' }}>경기 결과</label>
                      <div style={{ display: 'flex', gap: '2px', background: '#F1F5F9', padding: '2px', borderRadius: '8px' }}>
                        {['W', 'L', 'D'].map(res => (
                          <button
                            key={res}
                            type="button"
                            onClick={() => setDiaryResult(res)}
                            style={{
                              flex: 1,
                              padding: '5px 0',
                              fontSize: '10px',
                              fontWeight: '900',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              background: diaryResult === res ? (res === 'W' ? '#E1002A' : res === 'L' ? '#0066B3' : '#64748B') : 'transparent',
                              color: diaryResult === res ? '#FFFFFF' : '#888888'
                            }}
                          >
                            {res === 'W' ? '승' : res === 'L' ? '패' : '무'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', borderTop: '1px solid #F1F5F9', paddingTop: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '10px', fontWeight: '800', color: '#666666' }}>내 팀 득점</label>
                      <input 
                        type="number" 
                        value={diaryMyScore}
                        placeholder="0"
                        onChange={(e) => setDiaryMyScore(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', fontSize: '12px', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '10px', fontWeight: '800', color: '#666666' }}>상대 득점</label>
                      <input 
                        type="number" 
                        value={diaryVsScore}
                        placeholder="0"
                        onChange={(e) => setDiaryVsScore(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', fontSize: '12px', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'var(--primary-color)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: '800',
                      fontSize: '12px',
                      cursor: 'pointer',
                      marginTop: '6px'
                    }}
                  >
                    직관 기록 등록
                  </button>
                </form>
              </div>
            )}

            {/* Diary logs lists */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', color: '#64748B', letterSpacing: '0.5px' }}>직관 히스토리</div>
              {diaryList.length === 0 ? (
                <div style={{ padding: '32px 16px', textAlign: 'center', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #EAEAEA', fontSize: '12px', color: '#999999' }}>
                  등록된 직관 다이어리 기록이 없습니다.
                </div>
              ) : (
                diaryList.map(entry => (
                  <div key={entry.id} style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: '16px', border: '1px solid #EAEAEA', display: 'flex', justify: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '900',
                        color: '#FFFFFF',
                        background: entry.result === 'W' ? '#E1002A' : entry.result === 'L' ? '#0066B3' : '#64748B',
                        flexShrink: 0
                      }}>
                        {entry.result === 'W' ? '승' : entry.result === 'L' ? '패' : '무'}
                      </span>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div style={{ fontSize: '12px', fontWeight: '800', color: '#111111' }}>
                          vs {entry.vsTeam.toUpperCase()} <span style={{ fontSize: '10px', color: '#888888', fontWeight: '600' }}>({entry.myScore} : {entry.vsScore})</span>
                        </div>
                        <div style={{ fontSize: '9px', color: '#999999', fontWeight: '700', display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><Calendar size={10} /> {entry.date}</span>
                          <span>•</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><MapPin size={10} /> {entry.stadium}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteDiary(entry.id)}
                      style={{ background: 'none', border: 'none', color: '#CCCCCC', cursor: 'pointer', padding: '8px' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#E1002A'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#CCCCCC'}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* Tab 2: Scraps Saved Category */}
        {activeTab === 'scrap' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Foods scrap list */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748B', letterSpacing: '0.5px' }}>맛집 저장함</span>
                <Heart size={14} color="#E1002A" fill="#E1002A" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {savedFoodsList.length === 0 ? (
                  <div style={{ padding: '24px 16px', textAlign: 'center', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #EAEAEA', fontSize: '12px', color: '#999999' }}>
                    저장된 맛집이 없습니다. 가이드에서 하트를 클릭해 보세요!
                  </div>
                ) : (
                  savedFoodsList.map(food => (
                    <div
                      key={food.id}
                      onClick={() => onNavigate(10, { mode: food.type })} // Go to FoodDetailStep
                      style={{ background: '#FFFFFF', padding: '12px', borderRadius: '16px', border: '1px solid #EAEAEA', display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer' }}
                    >
                      <div style={{ width: '48px', height: '48px', borderRadius: '10px', overflow: 'hidden', background: '#F1F5F9', flexShrink: 0 }}>
                        <img src={food.image} alt={food.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '12px', fontWeight: '800', color: '#111111' }}>{food.name}</span>
                          <span style={{ fontSize: '10px', color: '#888888', fontWeight: '600', marginTop: '2px' }}>⭐ {food.rating} | ₩{food.price.toLocaleString()}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFood(food.id);
                          }}
                          style={{ background: 'none', border: 'none', color: '#E1002A', cursor: 'pointer', fontSize: '12px', fontWeight: '800', padding: '6px' }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Course blogs scrap list */}
            <div style={{ marginTop: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748B', letterSpacing: '0.5px' }}>블로그 저장함</span>
                <Bookmark size={14} color="var(--primary-color)" fill="var(--primary-color)" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {savedBlogsList.length === 0 ? (
                  <div style={{ padding: '24px 16px', textAlign: 'center', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #EAEAEA', fontSize: '12px', color: '#999999' }}>
                    저장된 블로그 글이 없습니다. 가이드에서 글을 북마크해 보세요!
                  </div>
                ) : (
                  savedBlogsList.map(blog => (
                    <div
                      key={blog.id}
                      onClick={() => onNavigate(blog.mode === 'cheering' ? 9 : 11)} // Go to CheeringCourse or FoodCourse step
                      style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: '16px', border: '1px solid #EAEAEA', display: 'flex', justify: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '800', color: '#111111', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{blog.title}</span>
                        <span style={{ fontSize: '9px', color: '#999999', fontWeight: '700' }}>by {blog.author} | {blog.date}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBlog(blog.id);
                        }}
                        style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontSize: '12px', fontWeight: '800', padding: '6px' }}
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

        {/* Tab 2.5: User Written Reviews */}
        {activeTab === 'reviews' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#64748B', letterSpacing: '0.5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>내가 작성한 추천글 ({allBlogs.filter(b => b.id.startsWith('b_') || b.author === '나(Me)' || b.author === profile.name).length}개)</span>
              <Edit2 size={13} color="#64748B" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {allBlogs.filter(b => b.id.startsWith('b_') || b.author === '나(Me)' || b.author === profile.name).length === 0 ? (
                <div style={{ padding: '36px 16px', textAlign: 'center', background: '#FFFFFF', borderRadius: '20px', border: '1px solid #EAEAEA', fontSize: '12px', color: '#999999', lineHeight: '1.6' }}>
                  ✍️ 아직 등록한 추천 리뷰가 없습니다.<br />
                  구장별 정보(응원형/먹방형) 탭 하단의 <strong>'+' 버튼</strong>을 눌러 첫 코스 리뷰를 작성해 보세요!
                </div>
              ) : (
                allBlogs
                  .filter(b => b.id.startsWith('b_') || b.author === '나(Me)' || b.author === profile.name)
                  .map(blog => (
                    <div
                      key={blog.id}
                      onClick={() => onNavigate(blog.mode === 'cheering' ? 9 : 11, { blogId: blog.id })}
                      style={{
                        background: '#FFFFFF',
                        padding: '14px',
                        borderRadius: '16px',
                        border: '1px solid #EAEAEA',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                        transition: 'transform 0.15s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.008)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ 
                          fontSize: '13px', 
                          fontWeight: '850', 
                          color: '#111111', 
                          lineHeight: '1.4',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          flex: 1,
                          textAlign: 'left'
                        }}>
                          {blog.title}
                        </span>
                        
                        <span style={{
                          fontSize: '8px',
                          fontWeight: '900',
                          color: blog.mode === 'food' ? '#BE123C' : '#1D4ED8',
                          background: blog.mode === 'food' ? '#FFE4E6' : '#DBEAFE',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          flexShrink: 0
                        }}>
                          {blog.mode === 'food' ? '먹방 코스' : '응원 코스'}
                        </span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F8FAFC', paddingTop: '8px', marginTop: '2px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {blog.stadium && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', fontSize: '9px', fontWeight: '800', color: 'var(--primary-color)' }}>
                              <MapPin size={10} color="var(--primary-color)" /> {blog.stadium}
                            </span>
                          )}
                          <span style={{ fontSize: '9px', color: '#999999', fontWeight: '700' }}>{blog.date}</span>
                        </div>
                        <span style={{ fontSize: '9px', color: '#888888', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '1px' }}>
                          자세히 보기 <ChevronRight size={10} />
                        </span>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        )}

        {/* Tab 3: settings & Extra Options */}
        {activeTab === 'extra' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* 프로필 편집 (Edit Profile) */}
            <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '20px', border: '1px solid #EAEAEA' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                <Edit2 size={16} color="var(--primary-color)" />
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#111111' }}>프로필 편집</span>
              </div>

              <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Profile Image Edit */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ position: 'relative', width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--primary-color)' }}>
                    <img src={profileAvatar} alt="Profile Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      padding: '5px 12px',
                      fontSize: '11px',
                      fontWeight: '800',
                      border: '1px solid #E2E8F0',
                      background: '#FFFFFF',
                      borderRadius: '6px',
                      color: '#666666',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
                  >
                    프로필 이미지 변경
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: '#666666' }}>닉네임</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', fontSize: '13px', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: '#666666' }}>소개글</label>
                  <textarea
                    value={profileBio}
                    onChange={(e) => setProfileBio(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', fontSize: '13px', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', minHeight: '64px', resize: 'none', lineHeight: '1.4' }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: 'var(--primary-color)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '800',
                    fontSize: '12px',
                    cursor: 'pointer',
                    marginTop: '4px'
                  }}
                >
                  프로필 저장
                </button>
              </form>
            </div>

            {/* 응원팀 변경 및 로그아웃 Quick Actions */}
            <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '20px', border: '1px solid #EAEAEA', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              {/* 응원팀 변경 */}
              <button
                onClick={() => onNavigate(3)} // Route back to MyTeam selection step (step 3)
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <RefreshCw size={16} color="var(--primary-color)" />
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#333333' }}>응원팀 변경</span>
                </div>
                <ChevronRight size={16} color="#CCCCCC" />
              </button>

              {/* 로그아웃 */}
              <button
                onClick={handleLogout} // Return to LoginStep (step 1)
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#FFF1F2',
                  border: '1px solid #FFE4E6',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 0.95}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <LogOut size={16} color="#E11D48" />
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#BE123C' }}>로그아웃</span>
                </div>
                <ChevronRight size={16} color="#FDA4AF" />
              </button>

            </div>

          </div>
        )}

      </div>

      {/* 3-tab Bottom Navigation */}
      <div className="bottom-nav" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, borderTop: '1px solid #EAEAEA', background: '#FFFFFF', display: 'flex', justify: 'space-around', items: 'center', zIndex: 30 }}>
        <div className="nav-item" onClick={() => onNavigate(16)}>
          <Home size={24} />
        </div>
        <div className="nav-item" onClick={() => onNavigate(4)}>
          <MapPin size={24} />
        </div>
        <div className="nav-item active" onClick={() => onNavigate(17)}>
          <User size={24} />
        </div>
      </div>
    </div>
  );
}
