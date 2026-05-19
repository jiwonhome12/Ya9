import React, { useState } from 'react';
import { Menu, MapPin, Home, Mail, X } from 'lucide-react';
import KakaoMap from './KakaoMap';

export default function CommunityMapStep({ stadium, onBack, onNavigate, onAddPing }) {
  const [showPingModal, setShowPingModal] = useState(false);
  const [pingTitle, setPingTitle] = useState('');
  const [pingContent, setPingContent] = useState('');

  const handlePingSubmit = () => {
    if (pingTitle && pingContent) {
      if (onAddPing) {
        onAddPing({ title: pingTitle, content: pingContent });
      }
      alert('핑이 등록되었습니다! 커뮤니티 피드에서 확인 가능합니다.');
      setShowPingModal(false);
      setPingTitle('');
      setPingContent('');
    }
  };

  return (
    <div className="main-layout" style={{ position: 'relative' }}>
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

      <div className="main-content" style={{ padding: 0, flex: 1, position: 'relative', overflow: 'hidden' }}>
        <KakaoMap style={{ height: '100%' }} />

        {/* Floating Buttons Overlay */}
        <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '16px', padding: '0 16px' }}>
          <button 
            onClick={() => onNavigate(15)}
            style={{ 
              flex: 1, 
              padding: '16px', 
              backgroundColor: '#E8B4B8', 
              color: 'white', 
              border: 'none', 
              borderRadius: '16px', 
              fontSize: '16px', 
              fontWeight: 'bold', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}>
            커뮤니티로 이동
          </button>
          <button 
            onClick={() => setShowPingModal(true)}
            style={{ 
              flex: 1, 
              padding: '16px', 
              backgroundColor: '#B5A8F2', 
              color: 'white', 
              border: 'none', 
              borderRadius: '16px', 
              fontSize: '16px', 
              fontWeight: 'bold', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}>
            + 핑 찍기
          </button>
        </div>
      </div>

      {/* Ping Modal */}
      {showPingModal && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '100%', padding: '24px', position: 'relative' }}>
            <X 
              size={24} 
              color="#888" 
              style={{ position: 'absolute', top: '16px', right: '16px', cursor: 'pointer' }} 
              onClick={() => setShowPingModal(false)} 
            />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>이곳에 핑 남기기</h3>
            <input 
              type="text" 
              placeholder="장소나 팁의 제목" 
              value={pingTitle}
              onChange={(e) => setPingTitle(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '12px', fontSize: '14px' }}
            />
            <textarea 
              placeholder="다른 팬들에게 공유할 꿀팁을 적어주세요!" 
              value={pingContent}
              onChange={(e) => setPingContent(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', minHeight: '100px', marginBottom: '16px', fontSize: '14px', resize: 'none' }}
            />
            <button 
              onClick={handlePingSubmit}
              style={{ width: '100%', padding: '16px', backgroundColor: '#B5A8F2', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
              공유하기
            </button>
          </div>
        </div>
      )}

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
