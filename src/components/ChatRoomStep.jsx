import React from 'react';
import { Camera, Link as LinkIcon, Map as MapIcon, Mail } from 'lucide-react';

export default function ChatRoomStep({ onBack }) {
  return (
    <div className="main-layout" style={{ backgroundColor: '#fff' }}>
      {/* Top Bar */}
      <div className="top-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '16px' }}>
        <div style={{ position: 'relative', cursor: 'pointer', marginRight: '16px' }} onClick={onBack}>
          <Mail size={28} color="#4A90E2" strokeWidth={2} />
          <div style={{ position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)', color: '#e57373', fontSize: '14px', fontWeight: 'bold' }}>
            ↓
          </div>
        </div>
        <h2 className="top-bar-title" style={{ fontSize: '20px', fontWeight: '800', textAlign: 'left', flex: 1 }}>lottehw</h2>
      </div>

      <div className="main-content scrollable" style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Left Bubble */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ddd', flexShrink: 0 }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ backgroundColor: '#E0E0E0', padding: '16px 20px', borderRadius: '12px', fontSize: '16px', color: '#000', alignSelf: 'flex-start' }}>
              오늘 사직 6시 광장앞?
            </div>
          </div>
        </div>

        {/* Right Bubble */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <div style={{ backgroundColor: '#9BA1D2', padding: '16px 20px', borderRadius: '12px', fontSize: '16px', color: '#000', alignSelf: 'flex-end' }}>
            ㅇㅇ
          </div>
        </div>

        {/* Left Bubble */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ddd', flexShrink: 0 }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ backgroundColor: '#E0E0E0', padding: '16px 20px', borderRadius: '12px', fontSize: '16px', color: '#000', alignSelf: 'flex-start' }}>
              크림새우 ㄱ?
            </div>
          </div>
        </div>

        {/* Right Bubble */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <div style={{ backgroundColor: '#9BA1D2', padding: '16px 20px', borderRadius: '12px', fontSize: '16px', color: '#000', alignSelf: 'flex-end' }}>
            너 먹고싶으면 ㄱㄱ
          </div>
        </div>

        {/* Left Bubbles (Multiple) */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ddd', flexShrink: 0 }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ backgroundColor: '#E0E0E0', padding: '16px 20px', borderRadius: '12px', fontSize: '16px', color: '#000', alignSelf: 'flex-start' }}>
              다른건?
            </div>
            <div style={{ backgroundColor: '#E0E0E0', padding: '16px 20px', borderRadius: '12px', fontSize: '16px', color: '#000', alignSelf: 'flex-start' }}>
              머 먹을 껀디?
            </div>
          </div>
        </div>

      </div>

      {/* Chat Input Bar */}
      <div style={{ padding: '16px', backgroundColor: '#fff', borderTop: '1px solid #eee' }}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#EAEAEA', borderRadius: '30px', padding: '8px 16px', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
            <Camera size={20} color="#555" />
          </div>
          <input 
            type="text" 
            placeholder="메시지 보내기..." 
            style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '16px' }}
          />
          <LinkIcon size={24} color="#555" style={{ transform: 'rotate(-45deg)' }} />
          <MapIcon size={24} color="#5BA880" />
        </div>
      </div>
    </div>
  );
}
