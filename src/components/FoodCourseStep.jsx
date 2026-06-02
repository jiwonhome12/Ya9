import React, { useState } from 'react';
import { ArrowLeft, Home, MapPin, Mail, Share2, X, Check, Bookmark, User } from 'lucide-react';
import KakaoMap from './KakaoMap';
import { mockDbService } from '../services/mockDb';

const FRIENDS_LIST = [
  { id: 1, name: '김지원', handle: '@jiwon.-.' },
  { id: 2, name: '황성빈', handle: '@lottehw' },
  { id: 3, name: '제발 가을야구', handle: '@lotte__please_v3' },
  { id: 4, name: '오정훈', handle: '@oh~' }
];

export default function FoodCourseStep({ stadium, onBack, onNavigate, savedBlogs = [], onToggleBlog, blogId, isLoggedIn }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editStadium, setEditStadium] = useState('');
  const [editImage, setEditImage] = useState('');

  const [blogs, setBlogs] = useState(() => mockDbService.getBlogs());
  const blog = blogs.find(b => b.id === blogId) || blogs.find(b => b.mode === 'food') || {
    id: 'b3',
    title: 'oo야구장 먹거리 리스트 - 2026 신상 맛집 완벽 정리! 🍢',
    desc: 'feat. 내부 먹거리 요아정, 타코잇, 보영만두, 주문 후 대기 꿀팁',
    author: '먹방요정',
    date: '2026.05.21'
  };

  const handleStartEdit = () => {
    if (!isLoggedIn) {
      if (window.confirm('로그인이 필요한 서비스입니다. 로그인 화면으로 이동하시겠습니까? 🔒')) {
        onNavigate(1);
      }
      return;
    }
    setEditTitle(blog.title);
    setEditDesc(blog.desc);
    setEditStadium(blog.stadium || '');
    setEditImage(blog.image || '');
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editTitle && editDesc) {
      mockDbService.updateBlogEntry(blog.id, editTitle, editDesc, editImage, editStadium);
      setBlogs(mockDbService.getBlogs());
      setShowEditModal(false);
      alert('추천글이 성공적으로 수정되었습니다! ✍️');
    }
  };

  const handleDelete = () => {
    if (!isLoggedIn) {
      if (window.confirm('로그인이 필요한 서비스입니다. 로그인 화면으로 이동하시겠습니까? 🔒')) {
        onNavigate(1);
      }
      return;
    }
    if (window.confirm('정말로 이 추천글을 삭제하시겠습니까? 🗑️')) {
      mockDbService.deleteBlogEntry(blog.id);
      alert('추천글이 삭제되었습니다.');
      onBack();
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="main-layout">
      {/* Top Bar */}
      <div className="top-bar" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <ArrowLeft className="back-icon" onClick={onBack} />
        <h2 className="top-bar-title" style={{ flex: 1, textAlign: 'center', margin: 0 }}>맛집 코스 추천 일정</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'absolute', right: '16px' }}>
          <button
            onClick={() => {
              if (!isLoggedIn) {
                if (window.confirm('로그인이 필요한 서비스입니다. 로그인 화면으로 이동하시겠습니까? 🔒')) {
                  onNavigate(1);
                }
                return;
              }
              onToggleBlog(blog.id);
            }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
          >
            <Bookmark 
              size={20} 
              color="var(--primary-color)" 
              fill={savedBlogs.includes(blog.id) ? 'var(--primary-color)' : 'none'} 
            />
          </button>
        </div>
      </div>

      <div className="main-content scrollable">
        <div className="blog-header" style={{ padding: '4px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
            <h1 className="blog-title" style={{ fontSize: '22px', fontWeight: '900', color: '#111111', margin: 0, textAlign: 'left' }}>{blog.title}</h1>
            {blog.stadium && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '10px', fontWeight: '900', color: 'var(--primary-color)', background: 'rgba(108,67,235,0.08)', padding: '3px 8px', borderRadius: '8px', flexShrink: 0 }}>
                <MapPin size={11} color="var(--primary-color)" /> {blog.stadium}
              </span>
            )}
          </div>
          <p style={{ fontSize: '12px', color: '#888888', margin: 0, fontWeight: '700', textAlign: 'left' }}>by {blog.author} | {blog.date}</p>
          
          {blog.id.startsWith('b_') && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <button 
                onClick={handleStartEdit}
                style={{
                  padding: '5px 12px',
                  backgroundColor: '#F3F4F6',
                  color: '#4B5563',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                ✏️ 수정하기
              </button>
              <button 
                onClick={handleDelete}
                style={{
                  padding: '5px 12px',
                  backgroundColor: '#FEE2E2',
                  color: '#EF4444',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                🗑️ 삭제하기
              </button>
            </div>
          )}
          
          <h2 className="blog-subtitle" style={{ fontSize: '14px', color: '#666666', marginTop: '10px', fontWeight: '600', borderLeft: '3px solid var(--primary-color)', paddingLeft: '8px', textAlign: 'left' }}>{blog.desc}</h2>
        </div>

        {blog.image ? (
          <div style={{ width: '100%', height: '200px', borderRadius: '16px', overflow: 'hidden', margin: '16px 0' }}>
            <img src={blog.image} alt="Blog Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ) : (
          <div className="blog-main-image" style={{ backgroundColor: '#DCDCDC', height: '220px', margin: '20px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '16px' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#888' }}>야구장 먹방 팬 이미지 영역</span>
          </div>
        )}

        {/* Render dynamic body content if it's a custom user-written blog */}
        {(blog.id !== 'b3') ? (
          <div className="blog-body-content" style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #EAEAEA', marginTop: '16px', lineHeight: '1.8', fontSize: '14px', color: '#333333', textAlign: 'left', whiteSpace: 'pre-line', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}>
            <p style={{ margin: 0, fontWeight: '500' }}>
              {blog.desc}
            </p>
          </div>
        ) : (
          <>
            <div className="blog-text-centered">
              <p>안녕 하세욤~<br/>
              오늘도 제 인생에 일부인<br/>
              이 놈들의 경기를 직관 하기 위해<br/>
              <strong>{blog.stadium || 'oo 야구장'}</strong>에 왔습니당~</p>
              <br/>
              <p>매번 원정 올때마다 꼭 가는 맛집 루틴이 있는데요,<br/>
              공유해드리고 싶어서 작성하게 되었습니당~~</p>
            </div>

            <p className="blog-tags">feat. 내부 먹거리 요아정, 타코잇, 보영만두, 주문후<br/>대기 꿀팁, +좌석 배달 범위, 포장팁</p>

            <div className="blog-text-centered">
              <p>일단 제가 제일 자주가고<br/>
              사람들이 제일 물어보는 <strong>"치킨 맛집은 어디인가요?"</strong> 에<br/>
              대한 답을 드리려고 합니다!<br/>
              진정한 야구 푸드 먹는 고수는<br/>
              구장 안에서 사먹지 않습니다...</p>
              <br/>
              <p>밖에서 포장을 하거나 야구장에서 배달 시켜 먹습니다....</p>
              <br/>
              <p>그래서 바로 첫번째로 추천드릴 맛집은~~??</p>
            </div>

            {/* xx 치킨 Section */}
            <div style={{ marginTop: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>xx 치킨</h3>
              <ul className="store-detail-desc" style={{ paddingLeft: '16px', marginBottom: '20px' }}>
                <li><strong>330mm *</strong> 도보 <strong>3</strong>분</li>
                <li>포장 주문시 <strong>3000</strong>원 할인</li>
                <li>포장 주문 대기 <strong>30</strong>분</li>
              </ul>

              <div className="menu-list">
                <div className="menu-item">
                  <div className="menu-img-placeholder"></div>
                  <div className="menu-info">
                    <div className="menu-title-row">
                      <h4>뿌링클</h4>
                      <span className="menu-badge-red">추천 메뉴</span>
                    </div>
                    <p>순살/뼈/콤보/ +소스추가</p>
                    <div className="menu-price">₩24,900</div>
                  </div>
                </div>
                <div className="divider" style={{ margin: '16px 0', borderBottom: '1px solid #eee' }}></div>
                <div className="menu-item">
                  <div className="menu-img-placeholder"></div>
                  <div className="menu-info">
                    <div className="menu-title-row">
                      <h4>쏘이갈릭킹(허니)</h4>
                    </div>
                    <p>윙/봉/닭다리 선택 가능</p>
                    <div className="menu-price">₩24,900</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div style={{ margin: '30px 0', borderRadius: '8px', overflow: 'hidden', border: '1px solid #eee' }}>
              <KakaoMap latitude={stadium?.lat} longitude={stadium?.lng} />
            </div>

            <div className="blog-text-centered" style={{ marginBottom: '30px' }}>
              <p>여기는 경기 시작 1시간 전에 포장 주문<br/>
              해야지 딱 맞게 픽업해서 먹을 수 있어요!</p>
            </div>

            {/* xx 스시 Section */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>xx 스시</h3>
              <ul className="store-detail-desc" style={{ paddingLeft: '16px', marginBottom: '20px' }}>
                <li><strong>660mm *</strong> 도보 <strong>8</strong>분</li>
                <li>포장 주문시 <strong>2000</strong>원 할인</li>
                <li>포장 주문 대기 <strong>50</strong>분</li>
              </ul>

              <div className="menu-list">
                <div className="menu-item">
                  <div className="menu-img-placeholder"></div>
                  <div className="menu-info">
                    <div className="menu-title-row">
                      <h4>연어 초밥</h4>
                      <span className="menu-badge-red">추천 메뉴</span>
                    </div>
                    <p>밥 양 선택/ 리뷰 이벤트 ...</p>
                    <div className="menu-price">₩24,900</div>
                  </div>
                </div>
                <div className="divider" style={{ margin: '16px 0', borderBottom: '1px solid #eee' }}></div>
                <div className="menu-item">
                  <div className="menu-img-placeholder"></div>
                  <div className="menu-info">
                    <div className="menu-title-row">
                      <h4>오늘의 스시</h4>
                    </div>
                    <p>매일 달라지는 신선한 초밥</p>
                    <div className="menu-price">₩20,000</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
          <div style={{ backgroundColor: 'white', width: '100%', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '24px', paddingBottom: '40px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <X 
              size={24} 
              color="#888" 
              style={{ position: 'absolute', top: '24px', right: '24px', cursor: 'pointer' }} 
              onClick={() => setShowEditModal(false)} 
            />
            <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '16px', color: '#111111' }}>추천 코스 글 수정하기 ✍️</h3>
            
            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', color: '#666666', display: 'block', marginBottom: '4px' }}>제목</label>
                <input 
                  type="text" 
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="제목을 입력해주세요"
                  required
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #EAEAEA', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', color: '#666666', display: 'block', marginBottom: '4px' }}>구장명</label>
                <input 
                  type="text" 
                  value={editStadium}
                  onChange={(e) => setEditStadium(e.target.value)}
                  placeholder="예: 사직구장"
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #EAEAEA', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', color: '#666666', display: 'block', marginBottom: '4px' }}>내용</label>
                <textarea 
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  placeholder="내용을 자세히 작성해주세요"
                  rows={4}
                  required
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #EAEAEA', fontSize: '13px', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', color: '#666666', display: 'block', marginBottom: '4px' }}>사진 첨부 (선택)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ fontSize: '12px', color: '#666666' }}
                />
                {editImage && (
                  <div style={{ marginTop: '8px', width: '60px', height: '60px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #EAEAEA' }}>
                    <img src={editImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>

              <button 
                type="submit"
                style={{ width: '100%', padding: '14px', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}>
                저장하기
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
