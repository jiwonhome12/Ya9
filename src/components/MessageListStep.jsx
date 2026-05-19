import React from 'react';
import { Menu, Home, MapPin, Mail } from 'lucide-react';

const MESSAGE_DATA = [
  { id: 1, name: '김지원', handle: '@jiwon.-.', message: '언제 볼꺼임', time: '3초전' },
  { id: 2, name: '황성빈', handle: '@lottehw', message: '머 먹을껀디?', time: '2분전' },
  { id: 3, name: '제발 가을야구', handle: '@lotte__please_v3', message: '오늘 승요 할꺼임', time: '2분전' },
  { id: 4, name: '오정훈', handle: '@oh~', message: '집이야?', time: '10분전' }
];

export default function MessageListStep({ onBack, onNavigate }) {
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
        <h2 className="top-bar-title" style={{ fontSize: '20px', fontWeight: '800' }}>ji_won.-.f</h2>
      </div>

      <div className="main-content scrollable" style={{ padding: 0 }}>
        <div style={{ padding: '40px 0', display: 'flex', justifyContent: 'center', borderBottom: '1px solid #eee' }}>
          {/* Custom icon matching the mockup */}
          <div style={{ position: 'relative' }}>
            <Mail size={48} color="#ddd" strokeWidth={1.5} />
            <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', color: '#e57373', fontSize: '20px' }}>
              ↓
            </div>
          </div>
        </div>

        <div className="message-list">
          {MESSAGE_DATA.map((msg) => (
            <div 
              key={msg.id} 
              className="message-list-item" 
              onClick={() => onNavigate(13)}
              style={{ display: 'flex', alignItems: 'center', padding: '24px 16px', borderBottom: '1px solid #eee', cursor: 'pointer' }}
            >
              <div className="avatar" style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#ddd', marginRight: '16px' }}></div>
              <div className="message-info" style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '8px' }}>
                  <span style={{ fontSize: '18px', fontWeight: '700', marginRight: '8px' }}>{msg.name}</span>
                  <span style={{ fontSize: '12px', color: '#888' }}>{msg.handle}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#333' }}>{msg.message}</span>
                  <span style={{ fontSize: '12px', color: '#333', fontWeight: '700' }}>{msg.time}</span>
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
        <div className="nav-item" onClick={() => onNavigate(14)}>
          <MapPin size={24} />
          <span>MY COURSES</span>
        </div>
        <div className="nav-item active">
          <Mail size={24} />
          <span>MESSAGE</span>
        </div>
      </div>
    </div>
  );
}
