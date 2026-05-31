import React, { useState } from 'react';
import { ArrowLeft, Home, MapPin, Mail, Share2, X, Check, Bookmark, User } from 'lucide-react';
import { mockDbService } from '../services/mockDb';

const FRIENDS_LIST = [
  { id: 1, name: '김지원', handle: '@jiwon.-.' },
  { id: 2, name: '황성빈', handle: '@lottehw' },
  { id: 3, name: '제발 가을야구', handle: '@lotte__please_v3' },
  { id: 4, name: '오정훈', handle: '@oh~' }
];

export default function CheeringCourseStep({ onBack, onNavigate, savedBlogs = [], onToggleBlog, blogId }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editStadium, setEditStadium] = useState('');
  const [editImage, setEditImage] = useState('');

  const [blogs, setBlogs] = useState(() => mockDbService.getBlogs());
  const blog = blogs.find(b => b.id === blogId) || blogs.find(b => b.mode === 'cheering') || {
    id: 'b1',
    title: 'oo야구장 꿀팁 궁금하지 않아? 초보 직관 가이드 ⚾',
    desc: 'feat. 꿀좌석, 응원용품 구매, 현장 예매 꿀팁, 야구선수 싸인 받는 법',
    author: '야구소년',
    date: '2026.05.20'
  };

  const handleStartEdit = () => {
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
        <h2 className="top-bar-title" style={{ flex: 1, textAlign: 'center', margin: 0 }}>응원 코스 추천 일정</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'absolute', right: '16px' }}>
          <button
            onClick={() => onToggleBlog(blog.id)}
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
            <h1 className="blog-title" style={{ fontSize: '22px', fontWeight: '900', color: '#111111', margin: 0 }}>{blog.title}</h1>
            {blog.stadium && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '10px', fontWeight: '900', color: 'var(--primary-color)', background: 'rgba(108,67,235,0.08)', padding: '3px 8px', borderRadius: '8px', flexShrink: 0 }}>
                <MapPin size={11} color="var(--primary-color)" /> {blog.stadium}
              </span>
            )}
          </div>
          <p style={{ fontSize: '12px', color: '#888888', margin: 0, fontWeight: '700' }}>by {blog.author} | {blog.date}</p>
          
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

          <h2 className="blog-subtitle" style={{ fontSize: '14px', color: '#666666', marginTop: '10px', fontWeight: '600', borderLeft: '3px solid var(--primary-color)', paddingLeft: '8px' }}>{blog.desc}</h2>
        </div>

        {blog.image ? (
          <div style={{ width: '100%', height: '200px', borderRadius: '16px', overflow: 'hidden', margin: '16px 0' }}>
            <img src={blog.image} alt="Blog Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ) : (
          <div className="blog-main-image" style={{ backgroundColor: '#DCDCDC', height: '180px', margin: '20px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '16px' }}>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>야구는 이겨야 즐겁다</span>
          </div>
        )}

        {/* Render dynamic body content if it's a custom user-written blog */}
        {(blog.id !== 'b1' && blog.id !== 'b2') ? (
          <div className="blog-body-content" style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #EAEAEA', marginTop: '16px', lineHeight: '1.8', fontSize: '14px', color: '#333333', textAlign: 'left', whiteSpace: 'pre-line', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}>
            <p style={{ margin: 0, fontWeight: '500' }}>
              {blog.desc}
            </p>
          </div>
        ) : (
          <>
            <div className="blog-text-centered">
              <p>안녕 하세욤~<br/>
              오늘도 제 인생의 일부인<br/>
              이 놈들의 경기를 직관 하기 위해<br/>
              <strong>{blog.stadium || 'oo 야구장'}</strong>에 왔습니다~</p>
              <br/>
              <p>첫직관이시거나, 초보 직관러이신 분들은<br/>
              원정을 오게되면 어디가 좋은 자리인지<br/>
              응원 용품은 어디서 사야하는지<br/>
              잘 모르실텐데요~!</p>
              <br/>
              <p>저 또한 그 시절이 있었기에<br/>
              알려 드리고 싶어 작성하게 되었습니다.</p>
            </div>

            <p className="blog-tags">feat. 꿀좌석, 응원용품 구매, 현장 예매 꿀팁, 야구선수 싸인 받는법</p>

            <div className="blog-text-centered">
              <p>일단 제가 제일 자주가고<br/>
              사람들이 제일 물어보는 <strong>"어느 자리가 잘 보여요?"</strong> 에<br/>
              대한 답을 드리려고 합니다!</p>
              <br/>
              <p>고수는 응원 단상쪽에서 보지 않습니다.</p>
              <br/>
              <p>저 멀리서 지켜 보기만 할뿐....</p>
              <br/>
              <p>그래서 제가 추천할 구역은?</p>
            </div>

            {/* Reusing Seat Cards */}
            <div className="sub-zones-row" style={{ marginTop: '20px' }}>
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

            <div className="blog-text-centered" style={{ marginTop: '16px', marginBottom: '24px' }}>
              <p>응원 단상이 보여서 같이 응원 할 수 있지만,<br/>
              거리가 있어 상대적으로 티켓팅할때 경쟁이 없어<br/>
              예매하기 편한 좌석 입니다~<br/>
              그리고 무엇보다 경기장이 한 시야에 다 들어와<br/>
              직관하기 좋아요!</p>
            </div>

            <div className="hot-zone-card" style={{ marginBottom: '24px' }}>
              <div className="hot-zone-info" style={{ width: '100%', padding: '16px' }}>
                <h4 style={{ fontSize: '18px', marginBottom: '12px' }}>레드석 103구역</h4>
                <ul>
                  <li>응원단상 바로앞!</li>
                  <li>뜨거운 열정을 즐길 수 있는 존</li>
                </ul>
              </div>
            </div>

            <div className="blog-text-centered">
              <p>처음 직관이라 응원가를 모르거나<br/>
              야구를 잘 이해 하지 못한분들에게<br/>
              추천하는 좌석입니다!<br/>
              잘 몰라도 주위사람들을 따라하고 보다보면<br/>
              같이 경기를 즐길 수 있어요!</p>
              <br/>
              <p>자 이제 좌석을 알았으면 응원 도구가 필요하겠죠?<br/>
              응원을 하다보면 손이 많이 심심하고<br/>
              같이 소속감을 갖고 열정적으로 응원하고 싶을 것 같아요~</p>
              <br/>
              <p>경기장에서 제일 물건이 많고 접근성이 좋은<br/>
              응원용품 샵은 바로~</p>
            </div>

            <div className="store-recommendation" style={{ marginTop: '30px' }}>
              <h3 className="section-title-simple" style={{ fontSize: '20px', marginBottom: '8px' }}>1루 측 응원용품 샵</h3>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px', fontSize: '12px', lineHeight: '1.6', marginBottom: '20px' }}>
                <li><strong>Gate 1</strong> 번 여자 화장실 뒷편쪽</li>
                <li>경기 시작 <strong>30</strong>분 후에 가면 사람들 많이 없어요!</li>
              </ul>

              {/* Product List */}
              <div className="product-list">
                <div className="product-item">
                  <div className="product-img-placeholder"></div>
                  <div className="product-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4>짝짝이</h4>
                      <span style={{ color: '#E53935', fontSize: '12px', fontWeight: 'bold' }}>추천 상품</span>
                    </div>
                    <p>롯데 팬이라면 무조건 있어야하는 응원 용품</p>
                    <div className="product-price">₩4,500</div>
                  </div>
                </div>

                <div className="product-item">
                  <div className="product-img-placeholder"></div>
                  <div className="product-info">
                    <h4>원정 유니폼</h4>
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
