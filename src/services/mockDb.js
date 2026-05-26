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
  { id: 'daegu', name: '라이온즈 파크', city: '대구', team: '삼성', lat: 35.8412, lng: 128.6816, address: '대구광역시 수성구 야구전설로 1' },
  { id: 'daejeon', name: '볼 파크', city: '대전', team: '한화', lat: 36.3172, lng: 127.4292, address: '대전광역시 중구 대종로 373' },
  { id: 'gwangju', name: '챔피언스필드', city: '광주', team: '기아', lat: 35.1682, lng: 126.8891, address: '광주광역시 북구 서림로 10' },
  { id: 'changwon', name: '엔씨 파크', city: '창원', team: 'NC', lat: 35.2227, lng: 128.5812, address: '경상남도 창원시 마산회원구 삼호로 63' }
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
  {
    id: 'f1',
    stadiumId: 'jamsil',
    type: 'inside',
    name: '잠실 대표 김치말이 국수',
    rating: 4.8,
    price: 6500,
    desc: '답답한 경기력을 시원하게 내려버릴 수 있는 잠실 대표 김치말이 국수 🍢',
    image: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'f2',
    stadiumId: 'jamsil',
    type: 'inside',
    name: '바삭 순살 치킨세트',
    rating: 4.9,
    price: 22500,
    desc: '답답한 경기력을 시원하고 바삭하게 날려버릴 치맥세트 🍗',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'f3',
    stadiumId: 'jamsil',
    type: 'outside',
    name: 'xx 수제 피자',
    rating: 4.7,
    price: 24900,
    desc: '야구장 도보 3분! 330mm 초대형 피자로 배부른 직관 피자 🍕',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'f4',
    stadiumId: 'jamsil',
    type: 'outside',
    name: '육즙 가득 수제버거',
    rating: 4.6,
    price: 12000,
    desc: '혼직관에 딱 맞는 깔끔한 포장 감자튀김 무료 버거 🍔',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&q=80&w=150'
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
      return JSON.parse(stored);
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
  getBlogs: () => {
    db.blogs = getOrSeed(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
    return db.blogs;
  },
  addBlogEntry: (mode, title, desc, author) => {
    db.blogs = getOrSeed(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
    const newBlog = {
      id: 'b_' + Date.now(),
      mode,
      title,
      desc,
      author: author || '나(Me)',
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\s/g, '').slice(0, -1)
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
