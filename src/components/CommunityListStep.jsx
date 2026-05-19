import React from 'react';
import { Menu, MapPin, Home, Mail, MessageSquare, Heart, Link as LinkIcon } from 'lucide-react';

const FEED_DATA = [
  {
    id: 1,
    name: '김지원',
    handle: '@jiwon.-.',
    time: '3초전',
    content: 'oo만두 줄 지금 짧아요! 아직 2번세트 많이 남아있습니다 ㅎㅎ 빨리 다들 먹어보시길..',
    comments: 0,
    likes: 3,
    links: 1
  },
  {
    id: 2,
    name: '황성빈',
    handle: '@lottehw',
    time: '2분전',
    content: '주차장 거의 만차입니다 ㅠㅠ\n지하 2층 구석에만 자리 좀 있어요.\n지금 오시는 분들은 참고 하세요!',
    comments: 40,
    likes: 20,
    links: 15
  },
  {
    id: 3,
    name: '제발 가을야구',
    handle: '@lotte__please_v3',
    time: '2분전',
    content: '오늘 승요 할꺼임 무조건 이긴다 화이팅!!!',
    comments: 5,
    likes: 12,
    links: 0
  }
];

export default function CommunityListStep({ stadium, onBack, onNavigate, feedData }) {
  const dataToRender = feedData || FEED_DATA;

  return (
    <div className="main-layout">
      {/* Top Bar */}
      <div className="top-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <Menu 
          className="menu-icon" 
          onClick={() => alert('기타 탭은 추후 오픈됩니다.')} 
          style={{ position: 'absolute', left: '16px', cursor: 'pointer', color: '#ccc' }} 
          size={24}
        />
        <h2 className="top-bar-title" style={{ fontSize: '20px', fontWeight: '800' }}>community</h2>
        <MapPin 
          style={{ position: 'absolute', right: '16px', color: '#b71c1c' }} 
          size={24}
        />
      </div>

      <div className="main-content scrollable" style={{ padding: 0 }}>
        
        {/* Selected Stadium & Filters */}
        <div style={{ padding: '24px 16px', borderBottom: '1px solid #ddd' }}>
          <div className="selected-stadium-info small" style={{ marginBottom: '16px' }}>
            선택된 구장
            <ul>
              <li>{stadium?.name || '잠실 야구장'}</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
            <span style={{ padding: '8px 16px', backgroundColor: '#5BA880', color: 'white', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>ALL TIPS</span>
            <span style={{ padding: '8px 16px', backgroundColor: 'transparent', border: '2px solid #5BA880', color: '#5BA880', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Parking</span>
            <span style={{ padding: '8px 16px', backgroundColor: 'transparent', border: '2px solid #5BA880', color: '#5BA880', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>숙소</span>
            <span style={{ padding: '8px 16px', backgroundColor: 'transparent', border: '2px solid #5BA880', color: '#5BA880', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Food&...</span>
          </div>
          <div className="scroll-indicator" style={{ marginTop: '0', width: '50px' }}></div>
        </div>

        {/* Feed List */}
        <div>
          {dataToRender.map((post) => (
            <div key={post.id} style={{ padding: '24px 16px', borderBottom: '1px solid #eee' }}>
              <div style={{ display: 'flex', marginBottom: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#ddd', flexShrink: 0, marginRight: '16px' }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '10px', color: '#888', fontWeight: 'bold', marginBottom: '4px' }}>{post.time}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '8px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', marginRight: '8px' }}>{post.name}</span>
                    <span style={{ fontSize: '12px', color: '#888' }}>{post.handle}</span>
                  </div>
                  <p style={{ fontSize: '14px', lineHeight: '1.5', whiteSpace: 'pre-line', color: '#222' }}>
                    {post.content}
                  </p>
                </div>
              </div>

              {/* Action Icons */}
              <div style={{ display: 'flex', gap: '32px', marginLeft: '64px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#888' }}>
                  <MessageSquare size={16} />
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{post.comments}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#E53935' }}>
                  <Heart size={16} fill="#E53935" />
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#000' }}>{post.likes}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#888' }}>
                  <LinkIcon size={16} style={{ transform: 'rotate(-45deg)' }} />
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#000' }}>{post.links}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-item" onClick={() => onNavigate(5)}>
          <Home size={24} />
          <span>HOME</span>
        </div>
        <div className="nav-item active">
          <MapPin size={24} />
          <span>MY COURSES</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate(12)}>
          <Mail size={24} />
          <span>MESSAGE</span>
        </div>
      </div>
    </div>
  );
}
