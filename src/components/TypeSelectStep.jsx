import React, { useState } from 'react';
import { Home, MapPin, User, ArrowLeft } from 'lucide-react';

export default function TypeSelectStep({ onNext, onBack, stadium, myTeam, onNavigate }) {
  const [selectedType, setSelectedType] = useState(null);

  const handleNext = () => {
    if (selectedType) {
      onNext(selectedType);
    } else {
      alert('유형을 선택해주세요.');
    }
  };

  return (
    <div className="main-layout">
      {/* Header */}
      <div className="main-header" style={{ display: 'flex', alignItems: 'center' }}>
        <ArrowLeft className="back-icon" onClick={onBack} style={{ cursor: 'pointer' }} />
        <div className="logo-text">Ya9</div>
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

      <div className="main-content">
        {/* Progress Bar */}
        <div className="progress-section top-progress">
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: selectedType ? '100%' : '50%', background: 'var(--primary-color)' }}></div>
          </div>
          <div className="progress-text" style={{ color: 'var(--primary-color)' }}>step 2/2</div>
        </div>

        <div className="selected-stadium-info">
          선택된 구장
          <ul>
            <li>{stadium?.name || '잠실 야구장'}</li>
          </ul>
        </div>

        <h2 className="main-title">응원형이야? 먹방형이야?</h2>

        <div className="type-cards-container">
          <div 
            className={`type-card ${selectedType === 'cheering' ? 'selected' : ''}`}
            onClick={() => setSelectedType('cheering')}
            style={{ borderColor: selectedType === 'cheering' ? 'var(--primary-color)' : '' }}
          >
            <div 
              className="type-card-img" 
              style={{ backgroundImage: 'url(/images/dmddnjs.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>
            <div className="type-card-content">
              <h3>응원형</h3>
              <ul>
                <li>응원도구 판매, 응원가 메들리, 꿀 좌석</li>
              </ul>
            </div>
          </div>

          <div 
            className={`type-card ${selectedType === 'food' ? 'selected' : ''}`}
            onClick={() => setSelectedType('food')}
            style={{ borderColor: selectedType === 'food' ? 'var(--primary-color)' : '' }}
          >
            <div 
              className="type-card-img" 
              style={{ backgroundImage: 'url(/images/ajrqkd.gif)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>
            <div className="type-card-content">
              <h3>먹방형</h3>
              <ul>
                <li>{stadium?.name?.replace('구장','') || '잠실'} 맛집, 구장내 맛집 지도</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons-row">
          <button 
            className="next-btn full-width" 
            onClick={handleNext}
            style={{ backgroundColor: 'var(--primary-color)' }}
          >
            next step
          </button>
        </div>
      </div>

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
