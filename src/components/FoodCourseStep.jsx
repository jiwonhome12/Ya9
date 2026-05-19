import React, { useState } from 'react';
import { ArrowLeft, Home, MapPin, Mail, Share2, X, Check } from 'lucide-react';
import KakaoMap from './KakaoMap';

const FRIENDS_LIST = [
  { id: 1, name: '김지원', handle: '@jiwon.-.' },
  { id: 2, name: '황성빈', handle: '@lottehw' },
  { id: 3, name: '제발 가을야구', handle: '@lotte__please_v3' },
  { id: 4, name: '오정훈', handle: '@oh~' }
];

export default function FoodCourseStep({ onBack, onNavigate }) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShare = () => {
    if (selectedFriend) {
      alert(`${selectedFriend.name}님에게 링크가 공유되었습니다.`);
      setShowShareModal(false);
      onNavigate(13); // ChatRoomStep으로 이동
    } else {
      alert('공유할 친구를 선택해주세요.');
    }
  };
  return (
    <div className="main-layout">
      {/* Top Bar */}
      <div className="top-bar" style={{ position: 'relative' }}>
        <ArrowLeft className="back-icon" onClick={onBack} />
        <h2 className="top-bar-title">맛집 코스 추천 일정</h2>
        <Share2 
          className="share-icon" 
          onClick={() => setShowShareModal(true)} 
          style={{ cursor: 'pointer', position: 'absolute', right: '16px', color: '#333' }} 
        />
      </div>

      <div className="main-content scrollable">
        <div className="blog-header">
          <h1 className="blog-title" style={{ textAlign: 'left' }}>oo야구장 먹거리 리스트</h1>
          <h2 className="blog-subtitle" style={{ textAlign: 'left' }}>2026신상 맛집 정리...</h2>
        </div>

        <div className="blog-main-image" style={{ backgroundColor: '#DCDCDC', height: '220px', margin: '20px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#888' }}>야구장 먹방 팬 이미지 영역</span>
        </div>

        <div className="blog-text-centered">
          <p>안녕 하세욤~<br/>
          오늘도 제 인생에 일부인<br/>
          이 놈들의 경기를 직관 하기 위해<br/>
          <strong>oo 야구장</strong>에 왔습니당~</p>
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
          <KakaoMap />
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

      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
          <div style={{ backgroundColor: 'white', width: '100%', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '24px', paddingBottom: '40px', position: 'relative' }}>
            <X 
              size={24} 
              color="#888" 
              style={{ position: 'absolute', top: '24px', right: '24px', cursor: 'pointer' }} 
              onClick={() => setShowShareModal(false)} 
            />
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>채팅방으로 공유하기</h3>
            
            <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '24px' }}>
              {FRIENDS_LIST.map(friend => (
                <div 
                  key={friend.id} 
                  onClick={() => setSelectedFriend(friend)}
                  style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E0E0E0', marginRight: '16px' }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{friend.name}</div>
                    <div style={{ fontSize: '12px', color: '#888' }}>{friend.handle}</div>
                  </div>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: selectedFriend?.id === friend.id ? 'none' : '1px solid #ccc', backgroundColor: selectedFriend?.id === friend.id ? '#6C43EB' : 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {selectedFriend?.id === friend.id && <Check size={16} color="white" />}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={handleShare}
              style={{ width: '100%', padding: '16px', backgroundColor: selectedFriend ? '#6C43EB' : '#ccc', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: selectedFriend ? 'pointer' : 'not-allowed' }}>
              공유하기
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-item active">
          <Home size={24} />
          <span>HOME</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate(14)}>
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
