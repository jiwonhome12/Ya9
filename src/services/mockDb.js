// mockDb.js - B.M.W (Baseball Mate Web) Offline-First LocalStorage Database Layer

const STORAGE_KEYS = {
  STADIUMS: 'bmw_stadiums',
  TEAM_INFO: 'bmw_team_info',
  FOODS: 'bmw_foods',
  BLOGS: 'bmw_blogs',
  DIARY: 'bmw_diary',
  USER_PROFILE: 'bmw_user_profile'
};

// --- INITIAL SEED DATA ---

const INITIAL_STADIUMS = [
  { id: 'jamsil', name: '잠실구장', city: '서울', team: 'LG/두산', lat: 37.5122, lng: 127.0719, address: '서울특별시 송파구 올림픽로 25' },
  { id: 'sajik', name: '사직구장', city: '부산', team: '롯데', lat: 35.1940, lng: 129.0610, address: '부산광역시 동래구 사직로 45' },
  { id: 'gocheok', name: '고척돔', city: '서울', team: '키움', lat: 37.4982, lng: 126.8671, address: '서울특별시 구로구 경인로 430' },
  { id: 'wizpark', name: '위즈 파크', city: '수원', team: 'KT', lat: 37.2998, lng: 127.0097, address: '경기도 수원시 장안구 경수대로 893' },
  { id: 'munhak', name: '문학 구장', city: '인천', team: 'SSG', lat: 37.4371, lng: 126.6933, address: '인천광역시 미추홀구 매소홀로 618' },
  { id: 'lionspark', name: '라이온즈 파크', city: '대구', team: '삼성', lat: 35.8412, lng: 128.6816, address: '대구광역시 수성구 야구전설로 1' },
  { id: 'ballpark', name: '볼 파크', city: '대전', team: '한화', lat: 36.3172, lng: 127.4292, address: '대전광역시 중구 대종로 373' },
  { id: 'champions', name: '챔피언스필드', city: '광주', team: '기아', lat: 35.1682, lng: 126.8891, address: '광주광역시 북구 서림로 10' },
  { id: 'ncpark', name: '엔씨 파크', city: '창원', team: 'NC', lat: 35.2227, lng: 128.5812, address: '경상남도 창원시 마산회원구 삼호로 63' }
];

const INITIAL_TEAM_INFO = {
  lotte: { name: 'LOTTE Giants', rank: 9, winRate: 0.451, wins: 17, losses: 24, draws: 0, recent: ['W', 'W', 'L', 'L', 'W'] },
  kia: { name: 'KIA Tigers', rank: 1, winRate: 0.612, wins: 26, losses: 16, draws: 1, recent: ['W', 'L', 'W', 'W', 'W'] },
  samsung: { name: '삼성 라이온즈', rank: 3, winRate: 0.537, wins: 22, losses: 19, draws: 0, recent: ['L', 'W', 'L', 'W', 'L'] },
  lg: { name: 'LG 트윈스', rank: 4, winRate: 0.524, wins: 22, losses: 20, draws: 1, recent: ['W', 'W', 'L', 'W', 'W'] },
  doosan: { name: '두산 베어스', rank: 6, winRate: 0.558, wins: 24, losses: 19, draws: 1, recent: ['L', 'L', 'W', 'W', 'W'] },
  ssg: { name: 'SSG 랜더스', rank: 5, winRate: 0.512, wins: 21, losses: 20, draws: 0, recent: ['W', 'L', 'W', 'L', 'L'] },
  nc: { name: 'NC 다이노스', rank: 7, winRate: 0.488, wins: 20, losses: 21, draws: 1, recent: ['L', 'W', 'W', 'L', 'W'] },
  hanwha: { name: '한화 이글스', rank: 8, winRate: 0.455, wins: 18, losses: 22, draws: 1, recent: ['L', 'L', 'L', 'W', 'W'] },
  kt: { name: 'KT 위즈', rank: 4, winRate: 0.463, wins: 19, losses: 22, draws: 0, recent: ['W', 'L', 'L', 'W', 'L'] },
  kiwoom: { name: '키움 히어로즈', rank: 10, winRate: 0.390, wins: 16, losses: 25, draws: 0, recent: ['L', 'L', 'W', 'L', 'L'] }
};

const INITIAL_FOODS = [
  // Jamsil
  {
    id: 'f1',
    stadiumId: 'jamsil',
    type: 'inside',
    name: '잠실 대표 김치말이 국수',
    rating: 4.8,
    price: 6500,
    desc: '답답한 경기력을 시원하게 내려버릴 수 있는 잠실 대표 김치말이 국수 🍢',
    image: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '원조 김치말이 국수', price: 6500 },
      { name: '시원한 김치말이 열무국수', price: 7000 },
      { name: '도토리묵사발', price: 7500 }
    ]
  },
  {
    id: 'f2',
    stadiumId: 'jamsil',
    type: 'inside',
    name: '바삭 순살 치킨세트',
    rating: 4.9,
    price: 22500,
    desc: '답답한 경기력을 시원하고 바삭하게 날려버릴 치맥세트 🍗',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '후라이드 순살치킨', price: 21000 },
      { name: '양념/간장 반반순살 치킨세트', price: 22500 },
      { name: '뿌링 치즈볼 5알', price: 5000 }
    ]
  },
  {
    id: 'f_j1',
    stadiumId: 'jamsil',
    type: 'inside',
    name: '직관 필수 삼겹살 정식',
    rating: 4.9,
    price: 18000,
    desc: '주문 즉시 철판에 노릇노릇 구워 쌈무와 고추, 쌈장까지 완벽 세트 구성! 🥓',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '철판 삼겹살 정식 싱글', price: 18000 },
      { name: '삼겹살 정식 더블 세트 (2인)', price: 34000 },
      { name: '구운 마늘/버섯 사리 추가', price: 2000 }
    ]
  },
  {
    id: 'f_j2',
    stadiumId: 'jamsil',
    type: 'inside',
    name: '치즈 폭탄 컵 떡볶이',
    rating: 4.6,
    price: 5500,
    desc: '쭉쭉 늘어나는 모짜렐라 치즈가 가득 올라간 매콤달콤 원조 야구장 떡볶이 🧀',
    image: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '모짜렐라 치즈 컵 떡볶이', price: 5500 },
      { name: '바삭 모둠 수제튀김', price: 6000 },
      { name: '찹쌀 순대', price: 5500 }
    ]
  },
  {
    id: 'f_j3',
    stadiumId: 'jamsil',
    type: 'inside',
    name: '시원 쌩맥주 1000cc',
    rating: 5.0,
    price: 9000,
    desc: '주문하는 순간 바로 내려주는 얼음장같이 시원한 리얼 쌩맥주! 🍺',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '쌩맥주 500cc', price: 4500 },
      { name: '대용량 쌩맥주 1000cc 페트', price: 9000 },
      { name: '허니 버터 쥐포 구이', price: 5000 }
    ]
  },
  {
    id: 'f3',
    stadiumId: 'jamsil',
    type: 'outside',
    name: 'xx 수제 피자 (신천점)',
    rating: 4.7,
    price: 24900,
    desc: '야구장 도보 3분! 330mm 초대형 피자로 양과 맛을 둘 다 잡은 직관 최적 피자 🍕',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '콤비네이션 수제피자 L', price: 23900 },
      { name: '골드 포테이토 피자 L', price: 24900 },
      { name: '치즈 크러스트 추가', price: 3000 }
    ]
  },
  {
    id: 'f4',
    stadiumId: 'jamsil',
    type: 'outside',
    name: '육즙 가득 클래식 수제버거',
    rating: 4.6,
    price: 12000,
    desc: '100% 소고기 패티와 신선한 채소! 깔끔하게 포장되어 흘리지 않고 먹기 좋아요 🍔',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '클래식 치즈버거 단품', price: 8500 },
      { name: '베이컨 아보카도 버거 세트', price: 12000 },
      { name: '트러플 감자튀김', price: 5500 }
    ]
  },
  {
    id: 'f_jo1',
    stadiumId: 'jamsil',
    type: 'outside',
    name: '겉바속촉 꿀 닭강정 대자',
    rating: 4.8,
    price: 19500,
    desc: '식어도 바삭함을 유지하는 비법 소스로 버무려진 신천시장 최고 존엄 닭강정 🍗',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '달콤한 꿀 닭강정 대', price: 19500 },
      { name: '매콤한 고추 닭강정 대', price: 20000 },
      { name: '마늘간장 닭강정 중', price: 12000 }
    ]
  },

  // Sajik
  {
    id: 'f_s1',
    stadiumId: 'sajik',
    type: 'inside',
    name: '사직 소문난 동래파전',
    rating: 4.8,
    price: 12000,
    desc: '사직구장 명물! 달달한 쪽파와 신선한 해물이 가득 들어간 겉바속촉 파전 🥞',
    image: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '동래 해물파전', price: 12000 },
      { name: '바삭 김치부침개', price: 10000 },
      { name: '생 막걸리 1되', price: 5000 }
    ]
  },
  {
    id: 'f_s2',
    stadiumId: 'sajik',
    type: 'inside',
    name: '3대 천왕 사직 떡볶이',
    rating: 4.9,
    price: 5000,
    desc: '굵직한 가래떡에 매콤하고 걸쭉한 무채 소스가 듬뿍 얹어진 부산 명물 떡볶이 🔥',
    image: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '무채 쌀 떡볶이 (3가래떡)', price: 5000 },
      { name: '대왕 오징어 튀김 3개', price: 4500 },
      { name: '부산 꼬치어묵 3개', price: 3500 }
    ]
  },
  {
    id: 'f_s3',
    stadiumId: 'sajik',
    type: 'outside',
    name: '주문진 막국수 (사직점)',
    rating: 4.9,
    price: 9000,
    desc: '야구 경기 시작 전 시원하고 깔끔하게 한 그릇 포장/식사하기 가장 좋은 사직 로컬 맛집!',
    image: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '살얼음 물 막국수', price: 9000 },
      { name: '매콤달콤 비빔 막국수', price: 9500 },
      { name: '야들야들 한방 수육 소', price: 18000 }
    ]
  },

  // Gocheok
  {
    id: 'f_g1',
    stadiumId: 'gocheok',
    type: 'inside',
    name: '고척돔 명물 크림새우',
    rating: 5.0,
    price: 16000,
    desc: '고척스카이돔 최장 웨이팅 대란의 주인공! 통통한 새우 튀김에 달콤 고소한 수제 크림 마요 소스 대조합 🍤',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '오리지널 고소 마요 크림새우', price: 16000 },
      { name: '매콤 불닭 크림새우', price: 17000 },
      { name: '달콤 칠리새우', price: 16000 }
    ]
  },
  {
    id: 'f_g2',
    stadiumId: 'gocheok',
    type: 'inside',
    name: '고척 수제 타코야끼 12알',
    rating: 4.6,
    price: 7000,
    desc: '문어가 큼직하게 씹히고 가쓰오부시를 아낌없이 올려 따끈하고 부드러운 직관 최고 간식 🐙',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '오리지널 데리야끼 타코야끼', price: 7000 },
      { name: '매콤 네기(파) 타코야끼', price: 7500 },
      { name: '고소한 치즈 갈릭 타코야끼', price: 7500 }
    ]
  },
  {
    id: 'f_g3',
    stadiumId: 'gocheok',
    type: 'outside',
    name: '건너편 먹자골목 수제 족발',
    rating: 4.8,
    price: 33000,
    desc: '포장 즉시 썰어내 따끈하고 야들야들한 콜라겐 덩어리 족발! 4인 직관 파티팩 🍖',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '한방 수제 왕족발 대', price: 33000 },
      { name: '직화 매콤 미니 불족발', price: 22000 },
      { name: '새콤달콤 쟁반 막국수', price: 8000 }
    ]
  },

  // Wiz Park
  {
    id: 'f_w1',
    stadiumId: 'wizpark',
    type: 'inside',
    name: '보영만두 군만두 & 중간쫄면',
    rating: 5.0,
    price: 15500,
    desc: '수원 위즈파크에 오면 반드시 먹어야 할 레전드 공식! 육즙 빵빵 군만두와 매콤 쫄깃 쫄면 조합 🥟',
    image: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '육즙 바삭 가득 군만두', price: 8000 },
      { name: '보영 중간맛 쫄면', price: 7500 },
      { name: '속이 꽉 찬 고기 찐만두', price: 7000 }
    ]
  },
  {
    id: 'f_w2',
    stadiumId: 'wizpark',
    type: 'inside',
    name: '수원 진미가마솥 통닭',
    rating: 4.9,
    price: 20000,
    desc: '수원 통닭거리 명물 진미통닭의 구장 직영점! 겉은 바삭하고 속은 촉촉한 리얼 오리지널 가마솥 치킨 🍗',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '가마솥 후라이드 치킨', price: 19000 },
      { name: '가마솥 반반치킨 (후/양)', price: 20000 },
      { name: '바삭 똥집튀김 서비스컵', price: 6000 }
    ]
  },
  {
    id: 'f_w3',
    stadiumId: 'wizpark',
    type: 'outside',
    name: '구장 건너편 송탄부대찌개 테이크아웃',
    rating: 4.7,
    price: 18000,
    desc: '얼큰한 국물과 소시지 가득한 부대찌개 밀키트! 직관 후 집으로 바로 픽업해가기 딱 좋은 간편 세트 🥘',
    image: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '송탄 부대찌개 2인분 밀키트', price: 18000 },
      { name: '수제 모둠 소시지 사리 추가', price: 5000 },
      { name: '라면사리 & 공기밥 세트', price: 2000 }
    ]
  },

  // Daegu Lions Park
  {
    id: 'f_d1',
    stadiumId: 'lionspark',
    type: 'inside',
    name: '라팍 요아정 요거트 아이스크림',
    rating: 4.9,
    price: 7500,
    desc: '대구의 무더운 대프리카 열기를 급속으로 얼려버릴 달콤 상콤 벌집꿀 초코쉘 요거트 아이스크림 🍦',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '요아정 내맘대로 토핑 세트 (벌집꿀+바나나)', price: 7500 },
      { name: '리얼 생딸기 초코쉘 아이스크림', price: 8500 },
      { name: '시원 달콤 멜론 컵빙수', price: 6000 }
    ]
  },
  {
    id: 'f_d2',
    stadiumId: 'lionspark',
    type: 'inside',
    name: '납작만두 & 매운 오뎅 세트',
    rating: 4.8,
    price: 9000,
    desc: '대구 10미 중 하나인 얇고 고소한 납작만두를 불타는 매운 양념 오뎅과 싸 먹는 중독적인 로컬 메뉴 🥟',
    image: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '원조 대구 납작만두 10장', price: 5000 },
      { name: '라팍 불어묵 꼬치 3개', price: 4500 },
      { name: '납작만두 & 불어묵 환상 콤보세트', price: 9000 }
    ]
  },
  {
    id: 'f_d3',
    stadiumId: 'lionspark',
    type: 'outside',
    name: '평화시장 똥집골목 원조 모둠똥집',
    rating: 4.9,
    price: 16000,
    desc: '바삭하게 튀겨낸 후라이드/양념/간장 똥집 3색 세트! 직관 가기 전 무조건 포장해야 할 극강의 가성비 튀김 🍗',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '모둠 똥집 튀김 (후/양/간장)', price: 16000 },
      { name: '고소한 닭목살 튀김', price: 14000 },
      { name: '시원 시골 양파마늘 양념통닭', price: 18000 }
    ]
  },

  // Daejeon
  {
    id: 'f_dj1',
    stadiumId: 'ballpark',
    type: 'inside',
    name: '이글스파크 1루 내야 농심 가락국수',
    rating: 4.7,
    price: 6000,
    desc: '전통의 한화이글스 명물 가락 떡볶이와 따끈한 유부 가락국수! 한화 팬들의 인생 소울푸드 국물 🍜',
    image: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '얼큰 유부 가락국수', price: 6000 },
      { name: '농심 매콤 국물떡볶이', price: 5500 },
      { name: '바삭 야채튀김 & 야끼만두 3개', price: 4000 }
    ]
  },
  {
    id: 'f_dj2',
    stadiumId: 'ballpark',
    type: 'outside',
    name: '성심당 튀김소보로 & 부추빵 반반세트',
    rating: 5.0,
    price: 11000,
    desc: '대전의 영원한 자랑 성심당 본점 또는 대전역점에서 픽업 후 구장에서 맥주와 함께 즐기는 극락의 맛 🥯',
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '튀김소보로 6개 오형제 세트', price: 10800 },
      { name: '판타롱부추빵 6개 세트', price: 12000 },
      { name: '명란바게트 대표 브레드', price: 3800 }
    ]
  },

  // Munhak (SSG)
  {
    id: 'f_m1',
    stadiumId: 'munhak',
    type: 'inside',
    name: '인천 문학 크림치즈 허니와플',
    rating: 4.8,
    price: 5000,
    desc: '랜더스필드 3루 내야의 전설! 바삭한 와플 속에 차가운 생크림과 달콤한 사과잼 가득 🧇',
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '클래식 사과잼 생크림 와플', price: 4500 },
      { name: '더블 딥 크림치즈 누텔라 와플', price: 5000 },
      { name: '바닐라 아이스크림 와플', price: 5500 }
    ]
  },
  {
    id: 'f_m2',
    stadiumId: 'munhak',
    type: 'inside',
    name: '문학구장 우리만두 & 쫄면',
    rating: 4.7,
    price: 7500,
    desc: '새콤달콤 쫄면과 튀김만두의 찰떡 궁합! 문학 대표 간식 🥟',
    image: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '원조 튀김만두 5알', price: 6500 },
      { name: '새콤달콤 명품 비빔쫄면', price: 7500 },
      { name: '고기 물만두 컵세트', price: 5500 }
    ]
  },
  {
    id: 'f_m3',
    stadiumId: 'munhak',
    type: 'outside',
    name: '인천 신포닭강정 픽업세트',
    rating: 4.9,
    price: 22000,
    desc: '인천 신포시장의 명물 닭강정! 매콤달콤 바삭바삭한 원조 닭강정 🍗',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '원조 신포 닭강정 대 (뼈/순살)', price: 22000 },
      { name: '고소한 후라이드 통닭 대', price: 20000 },
      { name: '사이드 수제 양배추 샐러드 추가', price: 1500 }
    ]
  },

  // Gwangju
  {
    id: 'f_gw1',
    stadiumId: 'champions',
    type: 'inside',
    name: '광주 챔필 마성떡볶이',
    rating: 4.6,
    price: 6000,
    desc: '챔피언스필드 내야의 스테디셀러! 매콤 쫄깃한 소스에 바삭한 어묵튀김 범벅 🍢',
    image: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '마성 떡볶이 & 어묵범벅', price: 6000 },
      { name: '김말이 & 만두튀김 4개', price: 4000 },
      { name: '참치 마요 컵밥', price: 5000 }
    ]
  },
  {
    id: 'f_gw2',
    stadiumId: 'champions',
    type: 'outside',
    name: '양동시장 원조 통닭 (광주점)',
    rating: 4.9,
    price: 23000,
    desc: '광주 3대 치킨! 엄청난 양의 바삭한 옛날식 가마솥 뼈치킨 픽업 추천 🍗',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '양동시장 가마솥 후라이드 통닭', price: 22000 },
      { name: '가마솥 반반통닭 (후/양)', price: 23000 },
      { name: '바삭 닭모래집 튀김 한컵', price: 7000 }
    ]
  },

  // Changwon (NC)
  {
    id: 'f_c1',
    stadiumId: 'ncpark',
    type: 'inside',
    name: '엔팍 알통 닭강정 & 감자튀김',
    rating: 4.8,
    price: 13000,
    desc: '한입에 쏙! 바삭하게 튀겨 달콤짭짤 간장소스를 묻힌 닭강정 🍗',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '알통 닭강정 한컵 싱글', price: 7000 },
      { name: '알통 닭강정 패밀리 박스 (감자튀김포함)', price: 18000 },
      { name: '치즈 갈릭 감자튀김 추가', price: 5000 }
    ]
  },
  {
    id: 'f_c2',
    stadiumId: 'ncpark',
    type: 'outside',
    name: '마산 오동동 아구찜 진짜 초가집',
    rating: 4.9,
    price: 30000,
    desc: '창원 NC파크 도보 10분! 마산 전통의 원조 매콤 아구찜 픽업 추천 🐟',
    image: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '마산 전통 아구찜 소', price: 30000 },
      { name: '원조 매콤 건아구찜 중', price: 40000 },
      { name: '라면 사리 추가', price: 2000 }
    ]
  },
  {
    id: 'f_c3',
    stadiumId: 'ncpark',
    type: 'outside',
    name: '엔팍 스트리트 메가커피 픽업',
    rating: 4.6,
    price: 3000,
    desc: 'NC파크 정문 앞 메가커피! 대용량 아이스 아메리카노로 9회말까지 시원하게 ☕',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=150',
    menus: [
      { name: '메가 에이드', price: 3900 },
      { name: '아이스 아메리카노 테이크아웃', price: 2000 },
      { name: '허니버터 브레드', price: 4500 }
    ]
  }
];

const INITIAL_BLOGS = [
  {
    id: 'b1',
    mode: 'cheering',
    title: 'oo야구장 꿀팁 궁금하지 않아? 초보 직관 가이드 ⚾',
    desc: 'feat. 꿀좌석, 응원용품 구매, 현장 예매 꿀팁, 야구선수 싸인 받는 법',
    author: '야구소년',
    date: '2026.05.20'
  },
  {
    id: 'b2',
    mode: 'cheering',
    title: '봄, 여름 직관 준비물 이거 없으면 진짜 고생합니다! ☀️',
    desc: 'feat. 직관 필수물 꿀팁, 좌석 추천, 시야 꿀팁, 주차장 현황',
    author: '승요마스터',
    date: '2026.05.23'
  },
  {
    id: 'b3',
    mode: 'food',
    title: 'oo야구장 먹거리 리스트 - 2026 신상 맛집 완벽 정리! 🍢',
    desc: 'feat. 내부 먹거리 요아정, 타코잇, 보영만두, 주문 후 대기 꿀팁',
    author: '먹방요정',
    date: '2026.05.21'
  }
];

const INITIAL_DIARY = [
  { id: 'd1', date: '2026-05-10', stadium: '잠실구장', myTeam: 'lotte', vsTeam: 'lg', result: 'W', myScore: 6, vsScore: 4 },
  { id: 'd2', date: '2026-05-15', stadium: '사직구장', myTeam: 'lotte', vsTeam: 'doosan', result: 'W', myScore: 8, vsScore: 2 },
  { id: 'd3', date: '2026-05-16', stadium: '사직구장', myTeam: 'lotte', vsTeam: 'doosan', result: 'L', myScore: 3, vsScore: 8 },
  { id: 'd4', date: '2026-05-19', stadium: '볼 파크', myTeam: 'lotte', vsTeam: 'hanwha', result: 'L', myScore: 4, vsScore: 6 },
  { id: 'd5', date: '2026-05-24', stadium: '사직구장', myTeam: 'lotte', vsTeam: 'samsung', result: 'W', myScore: 5, vsScore: 2 }
];

const INITIAL_USER_PROFILE = {
  name: 'ji_won.-.f',
  team: 'lotte',
  bio: '제발 가을 야구좀 가자 😭 주황 봉다리 머리에 쓰고 가을 야구 외치는 그날까지!!',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
};

const getOrSeed = (key, initialData) => {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Only reset/upgrade if the user's database contains old stadium IDs ('daegu') or has fewer items than our expanded initial list
      if (Array.isArray(parsed) && Array.isArray(initialData)) {
        const hasOldId = parsed.some(item => item.stadiumId === 'daegu');
        if (parsed.length < initialData.length || hasOldId) {
          localStorage.setItem(key, JSON.stringify(initialData));
          return initialData;
        }
      }
      return parsed;
    } catch (e) {
      console.error(`Failed to parse localStorage for key: ${key}`, e);
    }
  }
  localStorage.setItem(key, JSON.stringify(initialData));
  return initialData;
};

export const db = {
  stadiums: getOrSeed(STORAGE_KEYS.STADIUMS, INITIAL_STADIUMS),
  teamInfo: getOrSeed(STORAGE_KEYS.TEAM_INFO, INITIAL_TEAM_INFO),
  foods: getOrSeed(STORAGE_KEYS.FOODS, INITIAL_FOODS),
  blogs: getOrSeed(STORAGE_KEYS.BLOGS, INITIAL_BLOGS),
  diary: getOrSeed(STORAGE_KEYS.DIARY, INITIAL_DIARY),
  userProfile: getOrSeed(STORAGE_KEYS.USER_PROFILE, INITIAL_USER_PROFILE)
};

const saveDb = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const mockDbService = {
  getUserProfile: () => {
    db.userProfile = getOrSeed(STORAGE_KEYS.USER_PROFILE, INITIAL_USER_PROFILE);
    return db.userProfile;
  },
  saveUserProfile: (profile) => {
    db.userProfile = { ...db.userProfile, ...profile };
    saveDb(STORAGE_KEYS.USER_PROFILE, db.userProfile);
    return db.userProfile;
  },
  getFoods: () => {
    db.foods = getOrSeed(STORAGE_KEYS.FOODS, INITIAL_FOODS);
    return db.foods;
  },
  addFoodEntry: (stadiumId, type, name, price, desc, rating, image = '', menus = []) => {
    db.foods = getOrSeed(STORAGE_KEYS.FOODS, INITIAL_FOODS);
    const newFood = {
      id: 'f_' + Date.now(),
      stadiumId,
      type,
      name,
      rating: parseFloat(rating) || 5.0,
      price: parseInt(price) || 0,
      desc,
      image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=150',
      menus: Array.isArray(menus) ? menus : []
    };
    db.foods.push(newFood);
    saveDb(STORAGE_KEYS.FOODS, db.foods);
    return newFood;
  },
  updateFoodEntry: (id, name, price, desc, rating, image, menus = []) => {
    db.foods = getOrSeed(STORAGE_KEYS.FOODS, INITIAL_FOODS);
    const index = db.foods.findIndex(f => f.id === id);
    if (index !== -1) {
      db.foods[index] = {
        ...db.foods[index],
        name,
        price: parseInt(price) || 0,
        desc,
        rating: parseFloat(rating) || db.foods[index].rating,
        image: image !== undefined ? image : db.foods[index].image,
        menus: Array.isArray(menus) ? menus : db.foods[index].menus || []
      };
      saveDb(STORAGE_KEYS.FOODS, db.foods);
      return db.foods[index];
    }
    return null;
  },
  deleteFoodEntry: (id) => {
    db.foods = getOrSeed(STORAGE_KEYS.FOODS, INITIAL_FOODS);
    db.foods = db.foods.filter(f => f.id !== id);
    saveDb(STORAGE_KEYS.FOODS, db.foods);
    return db.foods;
  },
  getBlogs: () => {
    db.blogs = getOrSeed(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
    return db.blogs;
  },
  addBlogEntry: (mode, title, desc, author, image = '', stadium = '') => {
    db.blogs = getOrSeed(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
    const newBlog = {
      id: 'b_' + Date.now(),
      mode,
      title,
      desc,
      author: author || '나(Me)',
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\s/g, '').slice(0, -1),
      image,
      stadium
    };
    db.blogs.push(newBlog);
    saveDb(STORAGE_KEYS.BLOGS, db.blogs);
    return newBlog;
  },
  getDiary: () => {
    db.diary = getOrSeed(STORAGE_KEYS.DIARY, INITIAL_DIARY);
    return db.diary.sort((a, b) => new Date(b.date) - new Date(a.date));
  },
  addDiaryEntry: (date, stadium, myTeam, vsTeam, result, myScore, vsScore) => {
    db.diary = getOrSeed(STORAGE_KEYS.DIARY, INITIAL_DIARY);
    const newEntry = {
      id: 'd_' + Date.now(),
      date,
      stadium,
      myTeam,
      vsTeam,
      result,
      myScore: parseInt(myScore) || 0,
      vsScore: parseInt(vsScore) || 0
    };
    db.diary.push(newEntry);
    saveDb(STORAGE_KEYS.DIARY, db.diary);
    return newEntry;
  },
  deleteDiaryEntry: (id) => {
    db.diary = getOrSeed(STORAGE_KEYS.DIARY, INITIAL_DIARY);
    db.diary = db.diary.filter(d => d.id !== id);
    saveDb(STORAGE_KEYS.DIARY, db.diary);
    return db.diary;
  },
  getDiaryStats: (myTeamCode) => {
    db.diary = getOrSeed(STORAGE_KEYS.DIARY, INITIAL_DIARY);
    const teamDiaries = db.diary.filter(d => d.myTeam === myTeamCode);

    const wins = teamDiaries.filter(d => d.result === 'W').length;
    const losses = teamDiaries.filter(d => d.result === 'L').length;
    const draws = teamDiaries.filter(d => d.result === 'D').length;
    const total = teamDiaries.length;
    const winRate = total > 0 ? ((wins / (total - draws || total)) * 100).toFixed(0) : 0;

    return {
      wins,
      losses,
      draws,
      total,
      winRate: parseInt(winRate)
    };
  }
};
