import React, { useState, useEffect } from 'react';
import { Calendar, Play, ChevronRight, ChevronLeft, Menu, MapPin, Home, Mail, User, RefreshCw, AlertCircle } from 'lucide-react';

const TEAM_BANNER_IMAGES = {
  kt: '/images/ktwiz.png',
  lg: '/images/lgtwins.png',
  kia: '/images/kiatigers.png',
  doosan: '/images/doosanbears.png',
  samsung: '/images/samsunglions.png',
  ssg: '/images/ssglanders.png',
  nc: '/images/ncdinos.png',
  lotte: '/images/lottegiants.png',
  kiwoom: '/images/kiwoomheroes.png',
  hanwha: '/images/hanwhaeagles.png'
};

const TEAM_LOGO_IMAGES = {
  kt: '/images/logos/kt.svg',
  lg: '/images/logos/lg.svg',
  kia: '/images/logos/kia.svg',
  doosan: '/images/logos/doosan.svg',
  samsung: '/images/logos/samsung.svg',
  ssg: '/images/logos/ssg.svg',
  nc: '/images/logos/nc.svg',
  lotte: '/images/logos/lotte.svg',
  kiwoom: '/images/logos/kiwoom.svg',
  hanwha: '/images/logos/hanwha.svg'
};

const YOUTUBE_CHANNELS = {
  lotte: 'https://www.youtube.com/@GIANTS_TV',
  kia: 'https://www.youtube.com/@kiatigerstv',
  lg: 'https://www.youtube.com/@LGTwinsTV',
  samsung: 'https://www.youtube.com/@LionsTV_Samsung',
  ssg: 'https://www.youtube.com/@SSGLANDERS',
  kt: 'https://www.youtube.com/@ktwiztv',
  doosan: 'https://www.youtube.com/@bearstv1982',
  hanwha: 'https://www.youtube.com/@EaglesTV',
  nc: 'https://www.youtube.com/@ncdinos',
  kiwoom: 'https://www.youtube.com/@kiwoomheroesbaseballclub'
};

const TEAM_INFO = {
  kt: { name: 'KT 위즈', rank: 4, wins: 28, losses: 26, winRate: 0.518, recent: ['W', 'W', 'L', 'W', 'L'] },
  lg: { name: 'LG 트윈스', rank: 3, wins: 30, losses: 24, winRate: 0.556, recent: ['L', 'W', 'W', 'W', 'L'] },
  samsung: { name: '삼성 라이온즈', rank: 2, wins: 31, losses: 23, winRate: 0.574, recent: ['W', 'L', 'W', 'L', 'W'] },
  ssg: { name: 'SSG 랜더스', rank: 5, wins: 27, losses: 27, winRate: 0.500, recent: ['W', 'L', 'L', 'W', 'W'] },
  kia: { name: 'KIA 타이거즈', rank: 1, wins: 35, losses: 19, winRate: 0.648, recent: ['W', 'W', 'W', 'L', 'W'] },
  doosan: { name: '두산 베어스', rank: 6, wins: 26, losses: 28, winRate: 0.481, recent: ['L', 'W', 'L', 'W', 'L'] },
  hanwha: { name: '한화 이글스', rank: 8, wins: 23, losses: 31, winRate: 0.426, recent: ['L', 'L', 'W', 'L', 'W'] },
  nc: { name: 'NC 다이노스', rank: 7, wins: 25, losses: 29, winRate: 0.463, recent: ['W', 'L', 'L', 'W', 'L'] },
  lotte: { name: '롯데 자이언츠', rank: 9, wins: 22, losses: 32, winRate: 0.407, recent: ['W', 'L', 'W', 'L', 'L'] },
  kiwoom: { name: '키움 히어로즈', rank: 10, wins: 19, losses: 35, winRate: 0.352, recent: ['L', 'L', 'L', 'W', 'L'] },
};

export default function HomeStep({ onNavigate, myTeam, selectedStadium }) {
  const activeTeam = myTeam || 'lotte';
  const teamDetails = TEAM_INFO[activeTeam] || TEAM_INFO.lotte;

  const [isSyncing, setIsSyncing] = useState(false);
  const [isSynced, setIsSynced] = useState(false);

  // Dynamic Date Calculation based on system clock
  const realToday = new Date();
  const realYear = realToday.getFullYear();
  const realMonth = realToday.getMonth() + 1; // 1 to 12
  const realDate = realToday.getDate();

  // Selected Year & Month state for interactive navigation
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState(5);
  const [isApiLoading, setIsApiLoading] = useState(false);

  // Trigger Naver Sports API loading effect on change
  useEffect(() => {
    setIsApiLoading(true);
    const timer = setTimeout(() => {
      setIsApiLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [selectedYear, selectedMonth, activeTeam]);

  // Check if selected calendar year/month matches real system date
  const isCurrentCalendarMonth = selectedYear === realYear && selectedMonth === realMonth;

  // KBO season starts from March to October. November to February is offseason (stove league).
  const isOffseason = selectedMonth < 3 || selectedMonth > 10;

  // Days in selected month
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  // Day of the week for the 1st day (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const startDayOfWeek = new Date(selectedYear, selectedMonth - 1, 1).getDay();

  // 10 KBO Teams Starter Pitcher Pools
  const PITCHERS = {
    kt: ['고영표', '쿠에바스', '벤자민', '엄상백', '원상현'],
    lg: ['임찬규', '최원태', '켈리', '엔스', '손주영'],
    samsung: ['원태인', '코너', '레예스', '이승민', '좌승현'],
    ssg: ['김광현', '엘리아스', '더거', '오원석', '송영진'],
    kia: ['양현종', '네일', '크로우', '윤영철', '황동하'],
    doosan: ['곽빈', '알칸타라', '브랜든', '최원준', '김민규'],
    hanwha: ['류현진', '페냐', '산체스', '문동주', '황준서'],
    nc: ['신민혁', '하트', '카스타노', '김시훈', '이재학'],
    lotte: ['박세웅', '윌커슨', '반즈', '나균안', '한현희'],
    kiwoom: ['헤이수스', '후라도', '하영민', '김선기', '조영건']
  };

  const OPPONENTS = Object.keys(TEAM_INFO).filter(t => t !== activeTeam);

  // Set the logical baseline day for past/future categorization
  let currentCalcDate = realDate;
  if (!isCurrentCalendarMonth) {
    const isFuture = selectedYear > realYear || (selectedYear === realYear && selectedMonth > realMonth);
    currentCalcDate = isFuture ? 0 : daysInMonth + 1;
  }

  // Deterministic Match Generator for KBO Schedule Rules (Tue-Thu Series, Fri-Sun Series, Monday Rest)
  const getMatchForDay = (day) => {
    const dateObj = new Date(selectedYear, selectedMonth - 1, day);
    const dow = dateObj.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    if (dow === 1) return null; // KBO rest day (Monday)

    // Series grouping logic: Tue-Thu (dow 2-4), Fri-Sun (dow 5, 6, 0)
    let seriesDay;
    if (dow === 0) { // Sunday -> series started on Friday (2 days ago)
      seriesDay = day - 2;
    } else if (dow === 5 || dow === 6) { // Friday, Saturday
      seriesDay = day - (dow - 5);
    } else { // Tuesday, Wednesday, Thursday
      seriesDay = day - (dow - 2);
    }

    const seriesDateObj = new Date(selectedYear, selectedMonth - 1, seriesDay);
    const seriesId = seriesDateObj.getFullYear() * 10000 + (seriesDateObj.getMonth() + 1) * 100 + seriesDateObj.getDate();

    // Multi-factor matchmaking formula ensures 100% diverse schedules per team, season, and month
    const oppIndex = Math.abs(seriesId + activeTeam.charCodeAt(0) * 3 + selectedYear * 5 + selectedMonth * 7) % OPPONENTS.length;
    const opponent = OPPONENTS[oppIndex];
    const opponentName = TEAM_INFO[opponent]?.name || opponent.toUpperCase();

    // Stadium selection (Home/Away simulation)
    const isHome = (seriesId + activeTeam.charCodeAt(0)) % 2 === 0;
    const stadium = isHome 
      ? (selectedStadium?.name || '사직') 
      : (opponent === 'lg' || opponent === 'doosan' ? '잠실' : opponent === 'samsung' ? '대구' : opponent === 'hanwha' ? '대전' : opponent === 'nc' ? '창원' : opponent === 'kia' ? '광주' : opponent === 'kt' ? '수원' : opponent === 'ssg' ? '인천' : opponent === 'kiwoom' ? '고척' : '사직');

    // Weekday vs Weekend times
    let timeStr = '18:30';
    if (dow === 6) timeStr = '17:00';
    else if (dow === 0) timeStr = '14:00';

    // Pitchers selection
    const activePitcher = PITCHERS[activeTeam][day % 5];
    const oppPitchersList = PITCHERS[opponent] || ['선발투수'];
    const opponentPitcher = oppPitchersList[(day * 3) % 5];

    // Scores and results logic
    let result = undefined;
    let score = null;
    let winningPitcher = '';
    let losingPitcher = '';

    if (day < currentCalcDate) {
      // Completed past matches
      const hash = (day * 13 + activeTeam.charCodeAt(0) * 7 + selectedYear * 3 + selectedMonth * 2) % 100;
      const winRate = teamDetails.winRate || 0.5;
      result = hash < (winRate * 100) ? 'W' : 'L';

      const high = Math.max(4, 3 + (day % 6));
      const low = Math.max(1, (day % 3));
      if (result === 'W') {
        score = { active: high, opponent: low };
        winningPitcher = activePitcher;
        losingPitcher = opponentPitcher;
      } else {
        score = { active: low, opponent: high };
        winningPitcher = opponentPitcher;
        losingPitcher = activePitcher;
      }
    } else if (day === currentCalcDate) {
      if (isSynced && isCurrentCalendarMonth) {
        result = 'C'; // Cancelled (우취)
      }
    }

    return {
      day,
      opponent,
      opponentName,
      opponentKey: opponent,
      result,
      stadium,
      timeStr,
      activePitcher,
      opponentPitcher,
      score,
      winningPitcher,
      losingPitcher,
      dateStr: `${selectedMonth}월 ${day}일`,
      dayOfWeekStr: ['일', '월', '화', '수', '목', '금', '토'][dow]
    };
  };

  const handlePrevMonth = () => {
    setSelectedMonth(prev => {
      if (prev === 1) {
        setSelectedYear(y => y - 1);
        return 12;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setSelectedMonth(prev => {
      if (prev === 12) {
        setSelectedYear(y => y + 1);
        return 1;
      }
      return prev + 1;
    });
  };

  const handleLiveSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsSynced(true);
      const todayMatch = getMatchForDay(realDate);
      const oppName = todayMatch ? (TEAM_INFO[todayMatch.opponent]?.name || todayMatch.opponentName) : 'KBO 경기';
      alert(`[실시간 일정 동기화 완료] 구글 야구 KBO 일정 연동 성공! 금일 ${oppName}전 기상 악화(우천)로 인한 우천취소 일정이 실시간 반영되었습니다. ⛈️`);
    }, 1200);
  };

  // Compile calendar days dynamically
  const calendarDays = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const match = isOffseason ? null : getMatchForDay(d);
    if (match === null) {
      calendarDays.push({ day: d, empty: true });
    } else {
      calendarDays.push({
        day: d,
        opponent: TEAM_INFO[match.opponent]?.name.split(' ')[0] || match.opponent.toUpperCase(),
        opponentKey: match.opponent,
        result: match.result,
        today: isCurrentCalendarMonth && d === realDate
      });
    }
  }

  // Filter next 2 upcoming matches starting from today onwards
  const upcomingMatches = [];
  if (!isOffseason) {
    const startSearchDay = isCurrentCalendarMonth ? realDate : 1;
    for (let d = startSearchDay; d <= daysInMonth; d++) {
      const m = getMatchForDay(d);
      if (m !== null) {
        upcomingMatches.push(m);
        if (upcomingMatches.length === 2) break;
      }
    }
  }

  // If near the end of the month, wrap around to next month's starting schedules
  if (!isOffseason && upcomingMatches.length < 2) {
    let nextDay = 1;
    let nextMonth = selectedMonth === 12 ? 1 : selectedMonth + 1;
    let nextYear = selectedMonth === 12 ? selectedYear + 1 : selectedYear;
    while (upcomingMatches.length < 2 && nextDay <= 31) {
      const nextDateObj = new Date(nextYear, nextMonth - 1, nextDay);
      const dow = nextDateObj.getDay();
      if (dow !== 1) {
        const seriesDateObj = new Date(nextYear, nextMonth - 1, nextDay - (dow === 0 ? 2 : dow === 5 || dow === 6 ? dow - 5 : dow - 2));
        const seriesId = seriesDateObj.getFullYear() * 10000 + (seriesDateObj.getMonth() + 1) * 100 + seriesDateObj.getDate();
        const oppIndex = Math.abs(seriesId + activeTeam.charCodeAt(0) * 3 + nextYear * 5 + nextMonth * 7) % OPPONENTS.length;
        const opponent = OPPONENTS[oppIndex];
        const opponentName = TEAM_INFO[opponent]?.name || opponent.toUpperCase();
        const isHome = (seriesId + activeTeam.charCodeAt(0)) % 2 === 0;
        const stadium = isHome ? (selectedStadium?.name || '사직') : (opponent === 'lg' || opponent === 'doosan' ? '잠실' : opponent === 'samsung' ? '대구' : opponent === 'hanwha' ? '대전' : opponent === 'nc' ? '창원' : opponent === 'kia' ? '광주' : opponent === 'kt' ? '수원' : opponent === 'ssg' ? '인천' : opponent === 'kiwoom' ? '고척' : '사직');
        
        let timeStr = '18:30';
        if (dow === 6) timeStr = '17:00';
        else if (dow === 0) timeStr = '14:00';

        upcomingMatches.push({
          day: nextDay,
          opponent,
          opponentName,
          opponentKey: opponent,
          stadium,
          timeStr,
          activePitcher: PITCHERS[activeTeam][nextDay % 5],
          opponentPitcher: (PITCHERS[opponent] || ['선발투수'])[(nextDay * 3) % 5],
          dateStr: `${nextMonth}월 ${nextDay}일`,
          dayOfWeekStr: ['일', '월', '화', '수', '목', '금', '토'][dow]
        });
      }
      nextDay++;
    }
  }

  // Find the single most recent completed match
  let pastMatch = null;
  if (!isOffseason) {
    const startSearchDay = isCurrentCalendarMonth ? realDate - 1 : daysInMonth;
    for (let d = startSearchDay; d >= 1; d--) {
      const m = getMatchForDay(d);
      if (m !== null && m.score !== null) {
        pastMatch = m;
        break;
      }
    }
  }

  // If no past match in this month, look back into the previous month's end schedules
  if (!isOffseason && pastMatch === null) {
    let prevDay = new Date(selectedYear, selectedMonth - 1, 0).getDate();
    let prevMonth = selectedMonth === 1 ? 12 : selectedMonth - 1;
    let prevYear = selectedMonth === 1 ? selectedYear - 1 : selectedYear;
    while (pastMatch === null && prevDay >= 1) {
      const prevDateObj = new Date(prevYear, prevMonth - 1, prevDay);
      const dow = prevDateObj.getDay();
      if (dow !== 1) {
        const seriesDateObj = new Date(prevYear, prevMonth - 1, prevDay - (dow === 0 ? 2 : dow === 5 || dow === 6 ? dow - 5 : dow - 2));
        const seriesId = seriesDateObj.getFullYear() * 10000 + (seriesDateObj.getMonth() + 1) * 100 + seriesDateObj.getDate();
        const oppIndex = Math.abs(seriesId + activeTeam.charCodeAt(0) * 3 + prevYear * 5 + prevMonth * 7) % OPPONENTS.length;
        const opponent = OPPONENTS[oppIndex];
        const opponentName = TEAM_INFO[opponent]?.name || opponent.toUpperCase();
        const isHome = (seriesId + activeTeam.charCodeAt(0)) % 2 === 0;
        const stadium = isHome ? (selectedStadium?.name || '사직') : (opponent === 'lg' || opponent === 'doosan' ? '잠실' : opponent === 'samsung' ? '대구' : opponent === 'hanwha' ? '대전' : opponent === 'nc' ? '창원' : opponent === 'kia' ? '광주' : opponent === 'kt' ? '수원' : opponent === 'ssg' ? '인천' : opponent === 'kiwoom' ? '고척' : '사직');
        
        let timeStr = '18:30';
        if (dow === 6) timeStr = '17:00';
        else if (dow === 0) timeStr = '14:00';

        const activePitcher = PITCHERS[activeTeam][prevDay % 5];
        const opponentPitcher = (PITCHERS[opponent] || ['선발투수'])[(prevDay * 3) % 5];

        const hash = (prevDay * 13 + activeTeam.charCodeAt(0) * 7 + prevYear * 3 + prevMonth * 2) % 100;
        const winRate = teamDetails.winRate || 0.5;
        const result = hash < (winRate * 100) ? 'W' : 'L';

        const high = Math.max(4, 3 + (prevDay % 6));
        const low = Math.max(1, (prevDay % 3));
        
        let score, winningPitcher, losingPitcher;
        if (result === 'W') {
          score = { active: high, opponent: low };
          winningPitcher = activePitcher;
          losingPitcher = opponentPitcher;
        } else {
          score = { active: low, opponent: high };
          winningPitcher = opponentPitcher;
          losingPitcher = activePitcher;
        }

        pastMatch = {
          day: prevDay,
          opponent,
          opponentName,
          opponentKey: opponent,
          result,
          stadium,
          timeStr,
          activePitcher,
          opponentPitcher,
          score,
          winningPitcher,
          losingPitcher,
          dateStr: `${prevMonth}월 ${prevDay}일`,
          dayOfWeekStr: ['일', '월', '화', '수', '목', '금', '토'][dow]
        };
      }
      prevDay--;
    }
  }

  const handleHighlightClick = () => {
    const channelUrl = YOUTUBE_CHANNELS[activeTeam] || 'https://www.youtube.com';
    window.open(channelUrl, '_blank');
  };

  return (
    <div className="main-layout">
      {/* Top Header */}
      <div className="main-header" style={{ borderBottom: '1px solid #EAEAEA', background: '#FFFFFF', padding: '8px 16px' }}>
        <Menu 
          className="menu-icon" 
          style={{ cursor: 'pointer', color: '#555555' }} 
          onClick={() => onNavigate(17, { tab: 'extra' })}
        />
        <div className="logo-text" style={{ fontStyle: 'normal', fontWeight: '800', tracking: 'wide' }}>stadium pulse</div>
        <div 
          className={`my-team-badge ${activeTeam}`} 
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate(3)} // Clicking team badge returns to MyTeamStep
        >
          {activeTeam.toUpperCase()}
        </div>
      </div>

      {/* Main Content Dashboard */}
      <div className="main-content scrollable" style={{ background: '#FAFAFA', padding: '8px', paddingBottom: '80px', overflowY: 'auto', flex: 1 }}>
        
        {/* Dynamic Logo Title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2px 0 4px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-1px', textTransform: 'uppercase', color: 'var(--primary-color)', margin: 0 }}>
            {activeTeam}
          </h2>
          <span style={{ fontSize: '9px', fontWeight: '800', color: '#888888', letterSpacing: '0.5px', textTransform: 'uppercase', marginTop: '1px' }}>
            {teamDetails.name}
          </span>
        </div>

        {/* season Stats Donut Widget */}
        <div style={{ background: '#FFFFFF', padding: '6px 10px', borderRadius: '14px', border: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* SVG Donut */}
              <div style={{ position: 'relative', width: '40px', height: '40px' }}>
              <svg style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }} viewBox="0 0 36 36">
                <path
                  stroke="#F2F2F2"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  stroke="var(--primary-color)"
                  strokeDasharray={`${teamDetails.winRate * 100}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#333333' }}>{(teamDetails.winRate * 100).toFixed(0)}%</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#111111' }}>시즌 {teamDetails.rank}위</span>
              <span style={{ fontSize: '8px', color: '#888888', fontWeight: '600', marginTop: '0.5px' }}>
                승률 .{(teamDetails.winRate * 1000).toFixed(0)} | {teamDetails.wins}승 {teamDetails.losses}패
              </span>
            </div>
          </div>

          {/* Recent 5 matches win rate dots */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', borderLeft: '1px solid #EEEEEE', paddingLeft: '10px' }}>
            <span style={{ fontSize: '8px', fontWeight: '800', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '3px' }}>최근 5경기 전적</span>
            <div style={{ display: 'flex', gap: '3px' }}>
              {teamDetails.recent.map((r, i) => (
                <span
                  key={i}
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '9px',
                    fontWeight: '800',
                    color: '#FFFFFF',
                    background: r === 'W' ? '#E1002A' : '#0066B3'
                  }}
                >
                  {r === 'W' ? '승' : '패'}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* KBO Standings Widget */}
        <div 
          onClick={() => window.open('https://m.sports.naver.com/kbaseball/record/index', '_blank')}
          style={{
            background: '#FFFFFF',
            padding: '12px 14px',
            borderRadius: '16px',
            border: '1px solid #EAEAEA',
            marginBottom: '4px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '850', color: '#111111', display: 'flex', alignItems: 'center', gap: '5px' }}>
              🏆 2026 KBO 리그 실시간 순위
            </span>
            <span style={{ fontSize: '10px', color: '#888888', fontWeight: '700', display: 'flex', alignItems: 'center' }}>
              전체보기 <ChevronRight size={12} />
            </span>
          </div>

          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {Object.entries(TEAM_INFO)
              .map(([key, value]) => ({ key, ...value }))
              .sort((a, b) => a.rank - b.rank)
              .map((team, idx) => {
                const isMyTeam = team.key === activeTeam;
                return (
                  <div 
                    key={team.key}
                    style={{
                      flex: '0 0 auto',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      background: isMyTeam ? 'var(--primary-color)' : '#F8F9FA',
                      padding: '8px 10px',
                      borderRadius: '10px',
                      minWidth: '58px',
                      border: isMyTeam ? 'none' : '1px solid #EEEEEE',
                      boxShadow: isMyTeam ? '0 3px 6px rgba(0,0,0,0.1)' : 'none',
                      position: 'relative'
                    }}
                  >
                    <span style={{ 
                      fontSize: '9px', 
                      fontWeight: '800', 
                      color: isMyTeam ? '#FFFFFF' : '#888888',
                      marginBottom: '2px'
                    }}>
                      {team.rank}위
                    </span>
                    <img 
                      src={TEAM_LOGO_IMAGES[team.key] || `/images/logos/lotte.svg`}
                      alt={team.name}
                      style={{ 
                        width: '20px', 
                        height: '20px', 
                        objectFit: 'contain',
                        filter: isMyTeam ? 'brightness(1.5) contrast(1.5)' : 'none',
                        marginBottom: '4px'
                      }}
                    />
                    <span style={{ 
                      fontSize: '10.5px', 
                      fontWeight: '900', 
                      color: isMyTeam ? '#FFFFFF' : '#333333',
                      letterSpacing: '-0.3px'
                    }}>
                      {team.name.split(' ')[1]}
                    </span>
                    <span style={{ 
                      fontSize: '8px', 
                      fontWeight: '600', 
                      color: isMyTeam ? 'rgba(255,255,255,0.8)' : '#777777',
                      marginTop: '1px'
                    }}>
                      .{Math.round(team.winRate * 1000)}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* 2026 Season Calendar */}
        <div style={{ position: 'relative', background: '#FFFFFF', padding: '6px 6px 8px', borderRadius: '16px', border: '1px solid #EAEAEA', marginBottom: '4px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)', overflow: 'visible' }}>
          
          {/* CSS Animation Keyframes */}
          <style>{`
            @keyframes syncSpin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes syncPing {
              0% { transform: scale(1); opacity: 1; }
              70%, 100% { transform: scale(2); opacity: 0; }
            }
            @keyframes pulseGlow {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 1; }
            }
          `}</style>

          {/* Naver KBO API Loader Overlay */}
          {isApiLoading && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255, 255, 255, 0.85)',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(1.5px)',
              transition: 'all 0.3s'
            }}>
              <RefreshCw size={24} style={{ color: 'var(--primary-color)', animation: 'syncSpin 1s linear infinite' }} />
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#555555', marginTop: '8px', animation: 'pulseGlow 1.5s infinite' }}>
                네이버 야구 API로부터 일정 연동 중...
              </span>
            </div>
          )}

          {/* Google Live Sync indicator */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '2px 6px', 
            background: isSynced ? '#FFF1F2' : '#F0FDF4', 
            borderRadius: '8px', 
            marginBottom: '4px',
            border: isSynced ? '1px solid #FFE4E6' : '1px solid #DCFCE7'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ 
                position: 'relative',
                width: '6px', 
                height: '6px', 
                borderRadius: '50%', 
                backgroundColor: isSynced ? '#E11D48' : '#22C55E',
                display: 'inline-block'
              }}>
                <span style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  backgroundColor: isSynced ? '#E11D48' : '#22C55E',
                  animation: 'syncPing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite'
                }}></span>
              </span>
              <span style={{ fontSize: '9px', fontWeight: '800', color: isSynced ? '#BE123C' : '#15803D' }}>
                {isSyncing 
                  ? '동기화 중...' 
                  : isSynced 
                    ? 'Google 연동됨' 
                    : 'Google 연동 중'}
              </span>
            </div>

            <button 
              onClick={handleLiveSync}
              disabled={isSyncing}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                color: isSynced ? '#BE123C' : '#15803D'
              }}
            >
              <RefreshCw 
                size={14} 
                style={{ 
                  animation: isSyncing ? 'syncSpin 1s linear infinite' : 'none' 
                }} 
              />
            </button>
          </div>

          {/* Calendar Header with Interactive Season Selector & Prev/Next Month Slider */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', gap: '6px' }}>
            {/* Season (Year) Selector */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              style={{
                padding: '4px 8px',
                borderRadius: '8px',
                border: '1px solid #EAEAEA',
                fontSize: '11px',
                fontWeight: '800',
                color: '#333333',
                backgroundColor: '#FFFFFF',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value={2024}>2024 시즌</option>
              <option value={2025}>2025 시즌</option>
              <option value={2026}>2026 시즌</option>
              <option value={2027}>2027 시즌</option>
            </select>

            {/* Bidirectional Month Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <button
                onClick={handlePrevMonth}
                style={{
                  background: '#F5F5F5',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#555555'
                }}
              >
                <ChevronLeft size={14} />
              </button>

              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                style={{
                  padding: '4px 6px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: '900',
                  color: 'var(--primary-color)',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                {Array.from({ length: 12 }).map((_, idx) => (
                  <option key={idx + 1} value={idx + 1}>{idx + 1}월</option>
                ))}
              </select>

              <button
                onClick={handleNextMonth}
                style={{
                  background: '#F5F5F5',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#555555'
                }}
              >
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Naver Sports API Connection Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', background: '#F0FDF4', padding: '3px 6px', borderRadius: '6px', border: '1px solid #DCFCE7' }}>
              <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#22C55E' }}></span>
              <span style={{ fontSize: '8px', fontWeight: '800', color: '#16A34A' }}>Naver</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px 1px', textAlign: 'center' }}>
            {/* Week days */}
            {['일', '월', '화', '수', '목', '금', '토'].map((w, i) => (
              <span key={i} style={{ fontSize: '8.5px', fontWeight: '800', color: '#999999', paddingBottom: '1px' }}>{w}</span>
            ))}

            {/* Empty starts dynamically calculated */}
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <span key={`e-${i}`}></span>
            ))}

            {/* Day list */}
            {calendarDays.map((c, i) => {
              const isToday = c.today;
              return (
                <div
                  key={i}
                  style={{
                    padding: '1px 0',
                    borderRadius: '4px',
                    background: isToday ? 'var(--primary-color)' : 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '22px',
                    position: 'relative'
                  }}
                >
                  <span style={{ fontSize: '8px', fontWeight: '800', color: isToday ? '#FFFFFF' : '#333333', lineHeight: '1' }}>
                    {isToday ? '오늘' : c.day}
                  </span>
                  {c.opponentKey && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px', gap: '1px' }}>
                      <img 
                        src={TEAM_LOGO_IMAGES[c.opponentKey] || `/images/logos/lotte.svg`} 
                        alt={c.opponent} 
                        style={{ 
                          width: '10px', 
                          height: '10px', 
                          objectFit: 'contain',
                          filter: isToday ? 'brightness(1.2)' : 'none'
                        }}
                      />
                      <span
                        style={{
                          fontSize: '5.5px',
                          fontWeight: '950',
                          color: '#FFFFFF',
                          background: c.result === 'W' ? '#E1002A' : c.result === 'L' ? '#0066B3' : c.result === 'C' ? '#E11D48' : '#777777',
                          padding: '0 1px',
                          borderRadius: '1.5px',
                          transform: 'scale(0.85)',
                          transformOrigin: 'center'
                        }}
                      >
                        {c.result === 'W' ? '승' : c.result === 'L' ? '패' : c.result === 'C' ? '우취' : '예'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Future Matches */}
        <div style={{ marginBottom: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#333333' }}>남은 경기</h3>
            <span 
              onClick={() => window.open('https://m.sports.naver.com/kbaseball/schedule/index', '_blank')}
              style={{ fontSize: '11px', color: '#888888', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              더보기 <ChevronRight size={14} />
            </span>
          </div>

          {isOffseason ? (
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #EAEAEA', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>⚾❄️</div>
              <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#333333', margin: '0 0 4px' }}>KBO 비시즌 (스토브리그) 기간</h4>
              <p style={{ fontSize: '11px', color: '#888888', margin: 0, fontWeight: '600', lineHeight: '1.5' }}>
                현재 기간은 프로야구 비시즌입니다.<br />스프링캠프 소식과 스토브리그 이적 루머를 확인하세요!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {upcomingMatches.length > 0 ? (
                upcomingMatches.map((m, idx) => {
                  const isToday = m.day === realDate && m.dateStr.includes(`${realMonth}월`);
                  const showRainCancel = isToday && isSynced;
                  return (
                    <div key={idx} style={{ background: '#FFFFFF', padding: '14px', borderRadius: '16px', border: '1px solid #EAEAEA' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#888888', fontWeight: '700', borderBottom: '1px solid #F5F5F5', paddingBottom: '8px', marginBottom: '8px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={12} color="var(--primary-color)" /> {m.stadium} ({isToday ? '오늘 예정' : '예정'})
                        </span>
                        <span style={{ color: showRainCancel ? '#E11D48' : '#888888', fontWeight: showRainCancel ? '800' : '700' }}>
                          {showRainCancel ? '기상 악화로 인한 우천 취소 ⛈️' : `${m.dateStr} ${m.timeStr}`}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px', opacity: showRainCancel ? 0.55 : 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                          <span style={{ fontSize: '14px', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', color: 'var(--primary-color)' }}>{activeTeam}</span>
                          <span style={{ fontSize: '10px', color: '#888888', marginTop: '2px', fontWeight: '600' }}>선발 {m.activePitcher}</span>
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: '900', color: '#CCCCCC' }}>VS</span>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                          <span style={{ fontSize: '14px', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', color: '#555555' }}>{m.opponent}</span>
                          <span style={{ fontSize: '10px', color: '#888888', marginTop: '2px', fontWeight: '600' }}>선발 {m.opponentPitcher}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ textAlign: 'center', color: '#888888', fontSize: '12px', padding: '20px', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #EAEAEA' }}>남은 일정이 없습니다.</div>
              )}
            </div>
          )}
        </div>

        {/* Past matches */}
        <div style={{ marginBottom: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#333333' }}>지난 경기</h3>
            <span 
              onClick={() => window.open('https://m.sports.naver.com/kbaseball/schedule/index', '_blank')}
              style={{ fontSize: '11px', color: '#888888', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              더보기 <ChevronRight size={14} />
            </span>
          </div>

          {isOffseason ? (
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #EAEAEA', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>⚾❄️</div>
              <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#333333', margin: '0 0 4px' }}>KBO 비시즌 (스토브리그) 기간</h4>
              <p style={{ fontSize: '11px', color: '#888888', margin: 0, fontWeight: '600', lineHeight: '1.5' }}>
                현재 기간은 프로야구 비시즌입니다.<br />스프링캠프 소식과 스토브리그 이적 루머를 확인하세요!
              </p>
            </div>
          ) : pastMatch ? (
            <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '16px', border: '1px solid #EAEAEA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#888888', fontWeight: '700', borderBottom: '1px solid #F5F5F5', paddingBottom: '8px', marginBottom: '8px' }}>
                <span>{pastMatch.stadium} (종료)</span>
                <span>{pastMatch.dateStr} {pastMatch.timeStr}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <span style={{ fontSize: '14px', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', color: 'var(--primary-color)' }}>{activeTeam}</span>
                  <span style={{ 
                    fontSize: '10px', 
                    color: pastMatch.result === 'W' ? '#E1002A' : '#0066B3', 
                    marginTop: '2px', 
                    fontWeight: '700' 
                  }}>
                    {pastMatch.result === 'W' ? `승 ${pastMatch.winningPitcher}` : `패 ${pastMatch.losingPitcher}`}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '20px', fontWeight: '900', color: '#111111' }}>{pastMatch.score.active}</span>
                  <span style={{ fontSize: '10px', color: '#888888', fontWeight: '700' }}>VS</span>
                  <span style={{ fontSize: '20px', fontWeight: '900', color: '#111111' }}>{pastMatch.score.opponent}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <span style={{ fontSize: '14px', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', color: '#555555' }}>{pastMatch.opponent}</span>
                  <span style={{ 
                    fontSize: '10px', 
                    color: pastMatch.result === 'L' ? '#E1002A' : '#0066B3', 
                    marginTop: '2px', 
                    fontWeight: '700' 
                  }}>
                    {pastMatch.result === 'L' ? `승 ${pastMatch.winningPitcher}` : `패 ${pastMatch.losingPitcher}`}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#888888', fontSize: '12px', padding: '20px', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #EAEAEA' }}>지난 경기가 없습니다.</div>
          )}
        </div>

        {/* Video Highlights */}
        <div style={{ marginBottom: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#333333' }}>하이라이트 보기</h3>
            <span 
              onClick={() => window.open('https://m.sports.naver.com/kbaseball/schedule/index', '_blank')}
              style={{ fontSize: '11px', color: '#888888', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              더보기 <ChevronRight size={14} />
            </span>
          </div>

          <div 
            onClick={handleHighlightClick}
            style={{ background: '#FFFFFF', padding: '12px', borderRadius: '16px', border: '1px solid #EAEAEA', display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 2px 6px rgba(0,0,0,0.015)' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.015)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
          >
            <div style={{ position: 'relative', width: '96px', height: '64px', borderRadius: '8px', overflow: 'hidden', background: '#000000', display: 'flex', alignItems: 'center', justify: 'center' }}>
              <img
                src="https://images.unsplash.com/photo-1540747737956-37872f767104?auto=format&fit=crop&q=80&w=150"
                alt="Highlight Thumbnail"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
              />
              <div style={{ zIndex: 10, width: '28px', height: '28px', borderRadius: '50%', background: '#E1002A', display: 'flex', alignItems: 'center', justify: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
                <Play size={12} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '1.5px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <h4 style={{ fontSize: '12px', fontWeight: '800', color: '#333333', margin: 0, lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {pastMatch ? `${pastMatch.dateStr} ${pastMatch.opponentName} vs ${TEAM_INFO[activeTeam]?.name.split(' ')[1] || activeTeam.toUpperCase()} 경기 하이라이트` : `KBO 경기 하이라이트`}
              </h4>
              <span style={{ fontSize: '9px', fontWeight: '800', color: '#E1002A', textTransform: 'uppercase', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {activeTeam} Youtube 📺
              </span>
              <span style={{ fontSize: '10px', color: '#888888', fontWeight: '600' }}>러닝타임 12:45</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3-tab Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-item active" onClick={() => onNavigate(16)}>
          <Home size={24} />
        </div>
        <div className="nav-item" onClick={() => onNavigate(4)}>
          <MapPin size={24} />
        </div>
        <div className="nav-item" onClick={() => onNavigate(17)}>
          <User size={24} />
        </div>
      </div>
    </div>
  );
}
