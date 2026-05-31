import React from 'react';
import { ArrowLeft, Home, MapPin, Mail, Plus, Heart, User } from 'lucide-react';
import KakaoMap from './KakaoMap';

export default function FoodDetailStep({ mode, onBack, savedFoods = [], onToggleFood, onNavigate }) {
  const isInside = mode === 'inside';

  return (
    <div className="main-layout">
      {/* Top Bar */}
      <div className="top-bar">
        <ArrowLeft className="back-icon" onClick={onBack} />
        <h2 className="top-bar-title">{isInside ? '구장 내 맛집' : '구장 근처 맛집'}</h2>
      </div>

      <div className="main-content scrollable" style={{ padding: 0 }}>
        {/* Top Image Banner */}
        <div className="food-detail-hero" style={{ height: isInside ? '200px' : 'auto', display: 'flex', flexDirection: 'column' }}>
          
          {isInside ? (
            <>
              <div className="review-btn-badge">⭐ 4.8 리뷰 보기</div>
            </>
          ) : (
            <div style={{ position: 'relative', width: '100%', height: '250px' }}>
              <div className="review-btn-badge" style={{ zIndex: 10 }}>⭐ 4.7 리뷰 보기</div>
              <KakaoMap style={{ height: '250px' }} />
            </div>
          )}
        </div>

        <div style={{ padding: '20px' }}>
          {/* Store Info Header */}
          <div className="store-detail-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ margin: 0 }}>{isInside ? 'OO 떡볶이' : 'xx 치킨'}</h3>
              <button 
                onClick={() => onToggleFood(isInside ? 'f1' : 'f3')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
              >
                <Heart 
                  size={20} 
                  color="#E1002A" 
                  fill={savedFoods.includes(isInside ? 'f1' : 'f3') ? '#E1002A' : 'none'} 
                />
              </button>
            </div>
            <button className="create-btn large" disabled style={{ opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' }}><Plus size={16} /> 작성하기</button>
          </div>
          
          <ul className="store-detail-desc">
            {isInside ? (
              <>
                <li>잠실 대표! 김치말이 국수</li>
                <li>특제 자가제면으로 든든한 한끼</li>
              </>
            ) : (
              <>
                <li><strong>330mm *</strong> 도보 <strong>3</strong>분</li>
                <li>포장 주문시 <strong>3000</strong>원 할인</li>
                <li>포장 주문 대기 <strong>30</strong>분</li>
              </>
            )}
          </ul>

          <div className="divider" style={{ margin: '20px 0', borderBottom: '1px solid #ddd' }}></div>

          {/* Menu List */}
          <div className="menu-list">
            {isInside ? (
              <>
                <div className="menu-item">
                  <div className="menu-img-placeholder"></div>
                  <div className="menu-info">
                    <div className="menu-title-row">
                      <h4>김치말이 국수</h4>
                      <span className="menu-badge-red">대표 시그니쳐 메뉴</span>
                    </div>
                    <p>답답 한 경기력을 시원하게 내려버릴 수 있는~</p>
                    <div className="menu-price">₩6,500</div>
                  </div>
                </div>

                <div className="divider" style={{ margin: '16px 0', borderBottom: '1px solid #eee' }}></div>

                <div className="menu-item">
                  <div className="menu-img-placeholder"></div>
                  <div className="menu-info">
                    <div className="menu-title-row">
                      <h4>OO떡볶이</h4>
                    </div>
                    <p>맵기 선택 가능! 온가족이 다같이 먹기 좋아요<br/>메뉴가 고민일때 추천</p>
                    <div className="menu-price">₩5,500</div>
                  </div>
                </div>

                <div className="divider" style={{ margin: '16px 0', borderBottom: '1px solid #eee' }}></div>

                <div className="menu-item">
                  <div className="menu-img-placeholder"></div>
                  <div className="menu-info">
                    <div className="menu-title-row">
                      <h4>어묵탕</h4>
                    </div>
                    <p>호러스러운 경기력에 분위기가 싸해졌을때<br/>더위를 잊은 사람들에게 따듯한 국물을 추천합니다!</p>
                    <div className="menu-price">₩5,500</div>
                  </div>
                </div>

                <div className="divider" style={{ margin: '16px 0', borderBottom: '1px solid #eee' }}></div>

                <div className="menu-item">
                  <div className="menu-img-placeholder"></div>
                  <div className="menu-info">
                    <div className="menu-title-row">
                      <h4>맥주 500cc</h4>
                    </div>
                    <p>시원치 않은 경기력을 시원하게 만들어주는~</p>
                    <div className="menu-price">₩5,000</div>
                  </div>
                </div>
              </>
            ) : (
              <>
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
                    <div className="menu-price">₩5,500</div>
                  </div>
                </div>

                <div className="divider" style={{ margin: '16px 0', borderBottom: '1px solid #eee' }}></div>

                <div className="menu-item">
                  <div className="menu-img-placeholder"></div>
                  <div className="menu-info">
                    <div className="menu-title-row">
                      <h4>후라이드</h4>
                    </div>
                    <p>맛있겠다....</p>
                    <div className="menu-price">₩5,500</div>
                  </div>
                </div>
                
                <div className="divider" style={{ margin: '16px 0', borderBottom: '1px solid #eee' }}></div>

                <div className="menu-item">
                  <div className="menu-img-placeholder"></div>
                  <div className="menu-info">
                    <div className="menu-title-row">
                      <h4>맥주 500cc</h4>
                    </div>
                    <p>야구 티켓 지참시 <strong>5%</strong> 할인</p>
                    <div className="menu-price">₩5,000</div>
                  </div>
                </div>
              </>
            )}
          </div>
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
