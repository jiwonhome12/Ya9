import React from 'react';
import { ArrowLeft, Home, MapPin, Mail } from 'lucide-react';

const SEAT_MAPS = {
  sajik: 'sajik(1).jpg',
  jamsil: 'jamsil(1).jpeg',
  gocheok: 'gocheok(1).jpg',
  wizpark: 'wizpark(1).jpg',
  munhak: 'ssg(1).jpg',
  lionspark: 'lionspark(1).jpg',
  ballpark: 'hanwha(1).jpg',
  champions: 'champions(1).jpg',
  ncpark: 'ncpark(1).jpg'
};

const TICKETING_URLS = {
  sajik: 'https://www.giantsclub.com/html/', 
  jamsil: 'https://ticket.interpark.com/Contents/Sports', 
  gocheok: 'https://ticket.interpark.com/Contents/Sports', 
  wizpark: 'https://www.ticketlink.co.kr/sports/baseball/62', 
  munhak: 'https://www.ticketlink.co.kr/sports/baseball/58', 
  lionspark: 'https://www.ticketlink.co.kr/sports/baseball/57', 
  ballpark: 'https://www.ticketlink.co.kr/sports/baseball/63', 
  champions: 'https://www.ticketlink.co.kr/sports/baseball/59', 
  ncpark: 'https://www.ticketlink.co.kr/sports/baseball/60' 
};

export default function CheeringSeatInfoStep({ stadium, onBack }) {
  const seatMapImg = stadium ? SEAT_MAPS[stadium.id] : 'jamsil(1).jpeg';
  const ticketUrl = stadium ? TICKETING_URLS[stadium.id] : 'https://ticket.interpark.com/Contents/Sports';

  return (
    <div className="main-layout">
      {/* Top Bar */}
      <div className="top-bar">
        <ArrowLeft className="back-icon" onClick={onBack} />
        <h2 className="top-bar-title">응원 명당 추천</h2>
      </div>

      <div className="main-content scrollable">
        <div className="selected-stadium-info small">
          선택된 구장
          <ul>
            <li>{stadium?.name || '잠실 야구장'}</li>
          </ul>
        </div>

        {/* Stadium Seating Map */}
        <div className="stadium-map-container" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <a href={ticketUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', textAlign: 'center' }}>
            <img 
              src={`/images/${seatMapImg}`} 
              alt="구장 좌석도" 
              style={{ width: '100%', maxWidth: '350px', objectFit: 'contain' }} 
            />
          </a>
          <p className="banner-caption" style={{ marginTop: '12px' }}>* 사진 선택시 좌석 예매 사이트로 이동</p>
        </div>

        {/* Seat Recommendations (Reused from CheeringInfoStep) */}
        <div className="section-header space-between" style={{ marginTop: '30px' }}>
          <h3 className="section-title-simple">응원 명당 추천</h3>
          <span className="hot-zone-badge">HOT ZONE</span>
        </div>
        
        <div className="hot-zone-card">
          <div className="hot-zone-img-placeholder"></div>
          <div className="hot-zone-info">
            <h4>레드석 103구역</h4>
            <ul>
              <li>응원단상 바로앞!</li>
              <li>뜨거운 열정을 즐길 수 있는 존</li>
            </ul>
          </div>
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
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-item active">
          <Home size={24} />
          <span>HOME</span>
        </div>
        <div className="nav-item">
          <MapPin size={24} />
          <span>MY COURSES</span>
        </div>
        <div className="nav-item">
          <Mail size={24} />
          <span>COMMUNITY</span>
        </div>
      </div>
    </div>
  );
}
