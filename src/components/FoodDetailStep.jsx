import React, { useState, useEffect } from 'react';
import { ArrowLeft, Home, MapPin, Plus, Heart, User, Edit2, Trash2, X, Star } from 'lucide-react';
import KakaoMap from './KakaoMap';
import { mockDbService } from '../services/mockDb';

export default function FoodDetailStep({ stadium, mode, onBack, savedFoods = [], onToggleFood, onNavigate }) {
  const isInside = mode === 'inside';
  const currentStadiumId = stadium?.id || 'jamsil';
  const currentStadiumName = stadium?.name || '잠실 야구장';

  const [foodsList, setFoodsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [targetFoodId, setTargetFoodId] = useState(null);

  // Form states
  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [foodDesc, setFoodDesc] = useState('');
  const [foodRating, setFoodRating] = useState(5);
  const [foodImage, setFoodImage] = useState('');

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
    setIsEditMode(false);
    setTargetFoodId(null);
    setFoodName('');
    setFoodPrice('');
    setFoodDesc('');
    setFoodRating(5);
    setFoodImage('');
    setShowModal(true);
  };

  const handleOpenEdit = (food) => {
    setIsEditMode(true);
    setTargetFoodId(food.id);
    setFoodName(food.name);
    setFoodPrice(food.price.toString());
    setFoodDesc(food.desc);
    setFoodRating(Math.round(food.rating));
    setFoodImage(food.image || '');
    setShowModal(true);
  };

  const handleDeleteFood = (id) => {
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
      mockDbService.updateFoodEntry(targetFoodId, foodName, foodPrice, foodDesc, foodRating, foodImage);
      alert('맛집 정보가 수정되었습니다! ✏️');
    } else {
      mockDbService.addFoodEntry(currentStadiumId, mode, foodName, foodPrice, foodDesc, foodRating, foodImage);
      alert('새로운 맛집이 등록되었습니다! 🎉');
    }

    setShowModal(false);
    loadFoods();
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

        <div style={{ padding: '20px' }}>
          {/* Store Info Header */}
          <div className="store-detail-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>
                {currentStadiumName} {isInside ? '내 명물 리스트' : '근처 픽업/포장 리스트'}
              </h3>
            </div>
            <button 
              className="create-btn large" 
              onClick={handleOpenCreate}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', background: 'var(--primary-color)', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '12px' }}
            >
              <Plus size={14} /> 작성하기
            </button>
          </div>
          
          <ul className="store-detail-desc" style={{ paddingLeft: '20px', margin: '0 0 16px 0', fontSize: '12px', color: '#666', lineHeight: '1.6' }}>
            {isInside ? (
              <>
                <li>경기 중 간편하게 즐길 수 있는 구장 내 최고 인기 먹거리 리스트입니다.</li>
                <li>인기 매장은 클리닝 타임 및 경기 시작 전 대기 시간이 길어질 수 있습니다.</li>
              </>
            ) : (
              <>
                <li>야구장 도보 10분 거리 이내로, 경기 전 미리 포장/주문 픽업할 수 있는 알짜배기 맛집 정보입니다.</li>
                <li>미리 주문 시 포장 할인이나 야구 티켓 혜택을 챙겨보세요!</li>
              </>
            )}
          </ul>

          <div className="divider" style={{ margin: '16px 0', borderBottom: '1px solid #EAEAEA' }}></div>

          {/* Foods/Stores List */}
          <div className="menu-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {foodsList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#888', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>🥄</span>
                <p style={{ fontSize: '13px', fontWeight: '600', margin: 0 }}>등록된 맛집 정보가 아직 없습니다.</p>
                <p style={{ fontSize: '11px', color: '#aaa', margin: 0 }}>우측 상단의 "작성하기"를 통해 구장의 핫플레이스를 추천해 보세요!</p>
              </div>
            ) : (
              foodsList.map((food, idx) => (
                <div key={food.id}>
                  {idx > 0 && <div className="divider" style={{ margin: '16px 0', borderBottom: '1px solid #F1F5F9' }}></div>}
                  <div className="menu-item" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', position: 'relative' }}>
                    
                    {/* Food Photo Container */}
                    <div style={{ width: '80px', height: '80px', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#F1F5F9', flexShrink: 0, border: '1px solid #EAEAEA' }}>
                      {food.image ? (
                        <img src={food.image} alt={food.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#BBB' }}>🍔</div>
                      )}
                    </div>

                    {/* Food Info */}
                    <div className="menu-info" style={{ flex: 1, minWidth: 0 }}>
                      <div className="menu-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{food.name}</h4>
                        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                          {/* Heart/Like Toggle */}
                          <button 
                            onClick={() => onToggleFood(food.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px' }}
                          >
                            <Heart 
                              size={16} 
                              color="#E1002A" 
                              fill={savedFoods.includes(food.id) ? '#E1002A' : 'none'} 
                            />
                          </button>
                          {/* Edit Button */}
                          <button 
                            onClick={() => handleOpenEdit(food)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px', color: '#666' }}
                          >
                            <Edit2 size={15} />
                          </button>
                          {/* Delete Button */}
                          <button 
                            onClick={() => handleDeleteFood(food.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px', color: '#E1002A' }}
                          >
                            <Trash2 size={15} />
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
                      <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#666', lineHeight: '1.4' }}>{food.desc}</p>
                      <div className="menu-price" style={{ fontSize: '14px', fontWeight: '800', color: 'var(--primary-color)' }}>
                        ₩{food.price.toLocaleString()}
                      </div>
                    </div>

                  </div>
                </div>
              ))
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
              {isEditMode ? '맛집 추천 수정하기 ✏️' : '새로운 맛집 추천 등록 🥄'}
            </h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Photo Upload */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '850', color: '#333' }}>맛집 사진 등록 📸</label>
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
                <label style={{ fontSize: '12px', fontWeight: '850', color: '#333' }}>메뉴/상호 이름</label>
                <input 
                  type="text" 
                  value={foodName} 
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder="예: 잠실 명물 김치말이 국수, 수제 닭강정 등"
                  style={{ padding: '10px 12px', fontSize: '13px', border: '1px solid #E2E8F0', borderRadius: '10px', outline: 'none' }}
                  required
                />
              </div>

              {/* Price & Rating Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '850', color: '#333' }}>대표 가격 (원)</label>
                  <input 
                    type="number" 
                    value={foodPrice} 
                    onChange={(e) => setFoodPrice(e.target.value)}
                    placeholder="예: 6500"
                    style={{ padding: '10px 12px', fontSize: '13px', border: '1px solid #E2E8F0', borderRadius: '10px', outline: 'none' }}
                    required
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '850', color: '#333' }}>평점 추천</label>
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
                <label style={{ fontSize: '12px', fontWeight: '850', color: '#333' }}>추천 팁 및 설명</label>
                <textarea 
                  value={foodDesc} 
                  onChange={(e) => setFoodDesc(e.target.value)}
                  placeholder="대기 시간 정보, 꿀 조합 정보 등을 남겨주세요!"
                  style={{ padding: '10px 12px', fontSize: '13px', border: '1px solid #E2E8F0', borderRadius: '10px', outline: 'none', minHeight: '60px', resize: 'none' }}
                  required
                />
              </div>

              <button 
                type="submit" 
                style={{ width: '100%', padding: '12px', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', transition: 'opacity 0.2s', marginTop: '6px' }}
              >
                {isEditMode ? '수정 완료하기' : '맛집 등록하기'}
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
