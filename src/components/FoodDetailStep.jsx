import React, { useState, useEffect } from 'react';
import { ArrowLeft, Home, MapPin, Plus, Heart, User, Edit2, Trash2, X, Star } from 'lucide-react';
import KakaoMap from './KakaoMap';
import { mockDbService } from '../services/mockDb';

export default function FoodDetailStep({ stadium, mode, onBack, savedFoods = [], onToggleFood, onNavigate, isLoggedIn }) {
  const isInside = mode === 'inside';
  const currentStadiumId = stadium?.id || 'jamsil';
  const currentStadiumName = stadium?.name || '잠실 야구장';

  const [foodsList, setFoodsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [targetFoodId, setTargetFoodId] = useState(null);
  
  // Track expanded menu board per restaurant
  const [expandedId, setExpandedId] = useState(null);

  // Form states
  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [foodDesc, setFoodDesc] = useState('');
  const [foodRating, setFoodRating] = useState(5);
  const [foodImage, setFoodImage] = useState('');
  
  // Dynamic menus builder state
  const [menusInput, setMenusInput] = useState([{ name: '', price: '' }]);

  // Load foods dynamically
  const loadFoods = () => {
    const allFoods = mockDbService.getFoods();
    const filtered = allFoods.filter(f => f.stadiumId === currentStadiumId && f.type === mode);
    setFoodsList(filtered);
  };

  useEffect(() => {
    loadFoods();
  }, [currentStadiumId, mode]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoodImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenCreate = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다. 로그인 화면으로 이동합니다. 🔒');
      onNavigate(1);
      return;
    }
    setIsEditMode(false);
    setTargetFoodId(null);
    setFoodName('');
    setFoodPrice('');
    setFoodDesc('');
    setFoodRating(5);
    setFoodImage('');
    setMenusInput([{ name: '', price: '' }]);
    setShowModal(true);
  };

  const handleOpenEdit = (food, e) => {
    e.stopPropagation(); // Avoid triggering card toggle
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다. 로그인 화면으로 이동합니다. 🔒');
      onNavigate(1);
      return;
    }
    setIsEditMode(true);
    setTargetFoodId(food.id);
    setFoodName(food.name);
    setFoodPrice(food.price.toString());
    setFoodDesc(food.desc);
    setFoodRating(Math.round(food.rating));
    setFoodImage(food.image || '');
    setMenusInput(food.menus && food.menus.length > 0 ? food.menus.map(m => ({ name: m.name, price: m.price.toString() })) : [{ name: '', price: '' }]);
    setShowModal(true);
  };

  const handleDeleteFood = (id, e) => {
    e.stopPropagation(); // Avoid triggering card toggle
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다. 로그인 화면으로 이동합니다. 🔒');
      onNavigate(1);
      return;
    }
    if (window.confirm('정말 이 맛집 추천을 삭제하시겠습니까? 😢')) {
      mockDbService.deleteFoodEntry(id);
      loadFoods();
      alert('삭제되었습니다.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!foodName || !foodPrice) {
      alert('이름과 가격을 입력해주세요!');
      return;
    }

    if (isEditMode) {
      mockDbService.updateFoodEntry(targetFoodId, foodName, foodPrice, foodDesc, foodRating, foodImage, []);
      alert('맛집 정보가 수정되었습니다! ✏️');
    } else {
      mockDbService.addFoodEntry(currentStadiumId, mode, foodName, foodPrice, foodDesc, foodRating, foodImage, []);
      alert('새로운 맛집이 등록되었습니다! 🎉');
    }

    setShowModal(false);
    loadFoods();
  };

  // Helper to fetch dynamic menus or fallback to default ones
  const getRestaurantMenus = (food) => {
    if (food.menus && food.menus.length > 0) {
      return food.menus;
    }
    // Premium fallback menus
    return [
      { name: food.name + ' (대표 시그니쳐)', price: food.price },
      { name: '세트 업그레이드 (+음료/사이드)', price: food.price + 3500 },
      { name: '바삭 감자튀김 추가', price: 5000 },
      { name: '시원한 캔맥주 추가', price: 4000 }
    ];
  };

  // Calculate average rating
  const averageRating = foodsList.length > 0 
    ? (foodsList.reduce((acc, curr) => acc + curr.rating, 0) / foodsList.length).toFixed(1)
    : '0.0';

  return (
    <div className="main-layout">
      {/* Top Bar */}
      <div className="top-bar">
        <ArrowLeft className="back-icon" onClick={onBack} />
        <h2 className="top-bar-title">{isInside ? '구장 내 맛집 핫플레이스' : '구장 근처 픽업 추천'}</h2>
      </div>

      <div className="main-content scrollable" style={{ padding: 0 }}>
        {/* Dynamic Kakao Map Integration in both tabs */}
        <div style={{ position: 'relative', width: '100%', height: '240px', backgroundColor: '#E2E8F0' }}>
          <div className="review-btn-badge" style={{ zIndex: 10, background: 'rgba(0,0,0,0.7)', color: '#FFF' }}>
            ⭐ {averageRating} 평점 ({foodsList.length}개 추천)
          </div>
          <KakaoMap 
            latitude={stadium?.lat || 37.5122} 
            longitude={stadium?.lng || 127.0719} 
            style={{ height: '240px' }} 
          />
        </div>

        <div style={{ padding: '20px 20px 90px 20px' }}>
          {/* Store Info Header */}
          <div className="store-detail-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>
                {currentStadiumName} {isInside ? '내 명물 리스트' : '근처 픽업/포장 리스트'}
              </h3>
            </div>
          </div>
          
          <ul className="store-detail-desc" style={{ paddingLeft: '20px', margin: '0 0 16px 0', fontSize: '12px', color: '#666', lineHeight: '1.6' }}>
            <li>식당 카드를 <strong>클릭</strong>하면 상세 <strong>메뉴판 (Menu Board)</strong>이 아래로 펼쳐집니다!</li>
            {isInside ? (
              <li>경기 중 즐기기 좋은 구장 내 최고의 인기 식당입니다. 클리닝 타임 대기가 있을 수 있습니다.</li>
            ) : (
              <li>야구장 도보 10분 거리 이내로, 경기 전 포장/픽업하기에 완벽한 맛집 리스트입니다.</li>
            )}
          </ul>

          <div className="divider" style={{ margin: '16px 0', borderBottom: '1px solid #EAEAEA' }}></div>

          {/* Restaurants & Menus List */}
          <div className="menu-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {foodsList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#888', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>🥄</span>
                <p style={{ fontSize: '13px', fontWeight: '600', margin: 0 }}>등록된 식당 정보가 아직 없습니다.</p>
              </div>
            ) : (
              foodsList.map((food, idx) => {
                const isExpanded = expandedId === food.id;
                return (
                  <div key={food.id}>
                    {idx > 0 && <div className="divider" style={{ margin: '16px 0', borderBottom: '1px solid #F1F5F9' }}></div>}
                    
                    {/* Restaurant Clickable Card */}
                    <div 
                      onClick={() => setExpandedId(isExpanded ? null : food.id)}
                      className="restaurant-card-wrapper"
                      style={{ 
                        padding: '12px', 
                        borderRadius: '14px', 
                        border: isExpanded ? '1px solid var(--primary-color)' : '1px solid #EAEAEA', 
                        backgroundColor: '#FFF', 
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isExpanded ? '0 4px 12px rgba(108,67,235,0.08)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        
                        {/* Restaurant Cover Photo */}
                        <div style={{ width: '80px', height: '80px', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#F1F5F9', flexShrink: 0, border: '1px solid #EAEAEA' }}>
                          {food.image ? (
                            <img src={food.image} alt={food.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#BBB' }}>🏪</div>
                          )}
                        </div>

                        {/* Restaurant Main Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '850', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {food.name}
                            </h4>
                            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                              {/* Wishlist toggle */}
                              <button 
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  if (!isLoggedIn) {
                                    if (window.confirm('로그인이 필요한 서비스입니다. 로그인 화면으로 이동하시겠습니까? 🔒')) {
                                      onNavigate(1);
                                    }
                                    return;
                                  }
                                  onToggleFood(food.id); 
                                }}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px' }}
                              >
                                <Heart 
                                  size={15} 
                                  color="#E1002A" 
                                  fill={savedFoods.includes(food.id) ? '#E1002A' : 'none'} 
                                />
                              </button>
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                            <div style={{ display: 'flex', color: '#FFB800' }}>
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={11} fill={i < Math.round(food.rating) ? '#FFB800' : 'none'} stroke={i < Math.round(food.rating) ? 'none' : '#DDD'} />
                              ))}
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: '800', color: '#666' }}>{food.rating.toFixed(1)}</span>
                          </div>
                          
                          <p style={{ margin: '0 0 6px 0', fontSize: '11.5px', color: '#666', lineHeight: '1.4' }}>{food.desc}</p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary-color)' }}>
                              대표가 ₩{food.price.toLocaleString()}
                            </span>
                            <span style={{ fontSize: '10.5px', color: 'var(--primary-color)', fontWeight: '850', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                              {isExpanded ? '▲ 메뉴판 접기' : '▼ 메뉴판 펼치기'}
                            </span>
                          </div>
                        </div>

                      </div>

                      {/* Expandable Menu Board inside Restaurant card */}
                      {isExpanded && (
                        <div 
                          onClick={(e) => e.stopPropagation()} // Stop click through to collapse
                          style={{ 
                            marginTop: '12px', 
                            padding: '12px 14px', 
                            backgroundColor: '#F8FAFC', 
                            borderRadius: '10px', 
                            border: '1px solid #E2E8F0',
                            animation: 'fadeIn 0.2s ease-out'
                          }}
                        >
                          <h5 style={{ margin: '0 0 10px 0', fontSize: '12.5px', fontWeight: '850', color: 'var(--primary-color)', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px' }}>
                            📋 식당 메뉴판 (Menu Board)
                          </h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {getRestaurantMenus(food).map((menu, mIdx) => (
                              <div key={mIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px' }}>
                                <span style={{ fontWeight: '700', color: '#444' }}>{menu.name}</span>
                                <div style={{ flex: 1, borderBottom: '1px dashed #E2E8F0', margin: '0 8px' }}></div>
                                <span style={{ fontWeight: '800', color: '#111' }}>₩{(parseInt(menu.price) || 0).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>

                          {/* Review Section */}
                          <div style={{ marginTop: '16px', borderTop: '1px dashed #E2E8F0', paddingTop: '12px' }}>
                            <h5 style={{ margin: '0 0 8px 0', fontSize: '12.5px', fontWeight: '850', color: 'var(--primary-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span>⭐ 식당 리뷰 ({food.reviews?.length || 0})</span>
                            </h5>

                            {/* Reviews list */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px', maxHeight: '120px', overflowY: 'auto', paddingRight: '4px' }}>
                              {!food.reviews || food.reviews.length === 0 ? (
                                <div style={{ fontSize: '10.5px', color: '#999', textAlign: 'center', padding: '12px 0' }}>
                                  작성된 리뷰가 없습니다. 첫 리뷰를 달아보세요!
                                </div>
                              ) : (
                                food.reviews.map((rev) => (
                                  <div key={rev.id} style={{ backgroundColor: '#FFFFFF', padding: '6px 10px', borderRadius: '8px', border: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <span style={{ fontSize: '10px', fontWeight: '800', color: '#333' }}>{rev.username}</span>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                        <span style={{ fontSize: '9px', color: '#FFB800' }}>{'★'.repeat(Math.round(rev.rating))}</span>
                                        <span style={{ fontSize: '9px', color: '#999' }}>{rev.date}</span>
                                      </div>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '10px', color: '#666', lineHeight: '1.4' }}>{rev.text}</p>
                                  </div>
                                ))
                              )}
                            </div>

                            {/* Review Form */}
                            <form 
                              onSubmit={(e) => {
                                e.preventDefault();
                                const text = e.target.reviewText.value.trim();
                                const rating = parseFloat(e.target.reviewRating.value);
                                if (!text) return;
                                
                                const profile = mockDbService.getUserProfile();
                                mockDbService.addFoodReview(food.id, profile.name || '익명', rating, text);
                                
                                // Reset form
                                e.target.reviewText.value = '';
                                e.target.reviewRating.value = '5';
                                
                                loadFoods(); // reload state
                                alert('리뷰가 등록되었습니다! ⭐');
                              }}
                              style={{ display: 'flex', gap: '6px', alignItems: 'center' }}
                            >
                              <select 
                                name="reviewRating"
                                defaultValue="5"
                                style={{ padding: '6px', fontSize: '11px', border: '1px solid #E2E8F0', borderRadius: '6px', background: '#FFFFFF', outline: 'none', fontWeight: '700' }}
                              >
                                <option value="5">⭐⭐⭐⭐⭐</option>
                                <option value="4">⭐⭐⭐⭐</option>
                                <option value="3">⭐⭐⭐</option>
                                <option value="2">⭐⭐</option>
                                <option value="1">⭐</option>
                              </select>
                              <input 
                                name="reviewText"
                                type="text"
                                placeholder={isLoggedIn ? "한줄 리뷰를 남겨주세요!" : "로그인 후 작성 가능합니다."}
                                disabled={!isLoggedIn}
                                style={{ flex: 1, padding: '6px 10px', fontSize: '11px', border: '1px solid #E2E8F0', borderRadius: '6px', outline: 'none' }}
                                required
                              />
                              <button 
                                type="submit"
                                disabled={!isLoggedIn}
                                style={{ padding: '6px 12px', fontSize: '11px', fontWeight: '800', backgroundColor: 'var(--primary-color)', color: '#FFFFFF', border: 'none', borderRadius: '6px', cursor: 'pointer', opacity: isLoggedIn ? 1 : 0.6 }}
                              >
                                등록
                              </button>
                            </form>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Add / Edit Food Recommendation Modal */}
      {showModal && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
          <div style={{ backgroundColor: 'white', width: '100%', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '20px 24px 30px', position: 'relative', maxHeight: '92vh', overflowY: 'auto' }}>
            <X 
              size={24} 
              color="#888" 
              style={{ position: 'absolute', top: '24px', right: '24px', cursor: 'pointer' }} 
              onClick={() => setShowModal(false)} 
            />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
              {isEditMode ? '식당/메뉴판 수정하기 ✏️' : '새로운 식당/메뉴판 등록 🏪'}
            </h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Photo Upload */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '850', color: '#333' }}>식당 전경/대표 사진 📸</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => document.getElementById('food-img-input').click()}
                    style={{ padding: '8px 14px', fontSize: '11px', fontWeight: '800', border: '1px dashed var(--primary-color)', color: 'var(--primary-color)', background: '#FFF', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    사진 업로드
                  </button>
                  <input
                    id="food-img-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                  {foodImage && (
                    <div style={{ width: '44px', height: '44px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #EAEAEA' }}>
                      <img src={foodImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
              </div>

              {/* Food Name Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '850', color: '#333' }}>식당 상호명</label>
                <input 
                  type="text" 
                  value={foodName} 
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder="예: 잠실 명물 삼겹살 광장, 보영만두 수원직영 등"
                  style={{ padding: '10px 12px', fontSize: '13px', border: '1px solid #E2E8F0', borderRadius: '10px', outline: 'none' }}
                  required
                />
              </div>

              {/* Price & Rating Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '850', color: '#333' }}>대표 메뉴 가격 (원)</label>
                  <input 
                    type="number" 
                    value={foodPrice} 
                    onChange={(e) => setFoodPrice(e.target.value)}
                    placeholder="예: 18000"
                    style={{ padding: '10px 12px', fontSize: '13px', border: '1px solid #E2E8F0', borderRadius: '10px', outline: 'none' }}
                    required
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '850', color: '#333' }}>식당 평점</label>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '38px', padding: '0 4px' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={20} 
                        style={{ cursor: 'pointer' }}
                        onClick={() => setFoodRating(i + 1)}
                        fill={i < foodRating ? '#FFB800' : 'none'} 
                        stroke={i < foodRating ? 'none' : '#CCC'} 
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Description Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '850', color: '#333' }}>식당 한줄평 / 추천 팁</label>
                <textarea 
                  value={foodDesc} 
                  onChange={(e) => setFoodDesc(e.target.value)}
                  placeholder="예: 1루 내야 삼겹살 광장에 위치! 대기 줄이 길지만 회전율이 빨라요"
                  style={{ padding: '10px 12px', fontSize: '13px', border: '1px solid #E2E8F0', borderRadius: '10px', outline: 'none', minHeight: '50px', resize: 'none' }}
                  required
                />
              </div>

              <button 
                type="submit" 
                style={{ width: '100%', padding: '12px', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', transition: 'opacity 0.2s', marginTop: '6px' }}
              >
                {isEditMode ? '식당 정보 수정 완료' : '식당 정보 등록하기'}
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
