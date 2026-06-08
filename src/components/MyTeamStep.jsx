import React, { useState } from 'react';
import { Search } from 'lucide-react';

const TEAMS = [
  { id: 'kt', name: 'KT', nameKr: 'KT 위즈', keywords: 'kt, 케이티, 위즈, wiz' },
  { id: 'lg', name: 'LG', nameKr: 'LG 트윈스', keywords: 'lg, 엘지, 트윈스, twins' },
  { id: 'kia', name: 'KIA', nameKr: 'KIA 타이거즈', keywords: 'kia, 기아, 타이거즈, tigers' },
  { id: 'doosan', name: 'DOOSAN', nameKr: '두산 베어스', keywords: '두산, 베어스, bears, doosan' },
  { id: 'samsung', name: 'SAMSUNG', nameKr: '삼성 라이온즈', keywords: '삼성, 라이온즈, lions, samsung' },
  { id: 'ssg', name: 'SSG', nameKr: 'SSG 랜더스', keywords: 'ssg, 쓱, 에스에스지, 랜더스, landers' },
  { id: 'nc', name: 'NC', nameKr: 'NC 다이노스', keywords: 'nc, 엔씨, 다이노스, dinos' },
  { id: 'lotte', name: 'LOTTE', nameKr: '롯데 자이언츠', keywords: '롯데, 자이언츠, giants, lotte' },
  { id: 'kiwoom', name: 'KIWOOM', nameKr: '키움 히어로즈', keywords: '키움, 히어로즈, heroes, kiwoom' },
  { id: 'hanwha', name: 'HANWHA', nameKr: '한화 이글스', keywords: '한화, 이글스, eagles, hanwha' }
];

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

const TEAM_STADIUM_IMAGES = {
  kt: '/images/wizpark.jpeg',
  lg: '/images/jamsil.jpeg',
  kia: '/images/champions.jpeg',
  doosan: '/images/jamsil.jpeg',
  samsung: '/images/lionspark.jpeg',
  ssg: '/images/ssg.jpeg',
  nc: '/images/ncpark.jpeg',
  lotte: '/images/sajik.jpeg',
  kiwoom: '/images/gocheok.jpeg',
  hanwha: '/images/hanwha.jpeg'
};

const TEAM_SLOGANS = {
  kt: { title: '마법 같은 여정', subtitle: 'KT WIZ의 기적' },
  lg: { title: '무적 LG 트윈스', subtitle: '서울의 자존심' },
  kia: { title: '최강 KIA 타이거즈', subtitle: '승리를 향한 포효' },
  doosan: { title: '미라클 두산 베어스', subtitle: '끝없는 허슬두' },
  samsung: { title: '삼성 라이온즈', subtitle: '푸른 피의 전설' },
  ssg: { title: 'SSG 랜더스', subtitle: '새로운 야구의 신세계' },
  nc: { title: 'NC 다이노스', subtitle: '거침없이 가자' },
  lotte: { title: '투혼투지', subtitle: '승리를 위한 인내' },
  kiwoom: { title: '영웅 키움 히어로즈', subtitle: '끝없는 열정과 도전' },
  hanwha: { title: '한화 이글스', subtitle: '불꽃 한화! 투혼의 날개' }
};

const TEAM_THEME_COLORS = {
  kt: '#000000',
  lg: '#C30452',
  kia: '#EA0029',
  doosan: '#131230',
  samsung: '#074CA1',
  ssg: '#CE0E2D',
  nc: '#3152A5',
  lotte: '#D0112A',
  kiwoom: '#820024',
  hanwha: '#FF6600'
};

export default function MyTeamStep({ onNext }) {
  const [selectedTeam, setSelectedTeam] = useState(null); // No default team selected
  const [searchQuery, setSearchQuery] = useState('');

  const handleTeamClick = (teamId) => {
    setSelectedTeam(teamId);
    if (selectedTeam === teamId) {
      onNext(teamId);
    }
  };

  const filteredTeams = TEAMS.filter(team => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      team.name.toLowerCase().includes(query) || 
      team.nameKr.toLowerCase().includes(query) ||
      (team.keywords && team.keywords.toLowerCase().includes(query))
    );
  });

  return (
    <div className="flex-1 flex flex-col justify-between min-h-[90vh] pb-8 bg-slate-50 text-slate-800" style={{ background: '#FAFAFA', fontFamily: 'Inter, sans-serif' }}>
      
      <div>
        {/* Top Header Title */}
        <div style={{ textAlign: 'center', padding: '16px 24px 12px', borderBottom: '1px solid #EAEAEA', background: '#FFFFFF' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '2px', color: '#0F172A', fontFamily: 'Outfit, sans-serif' }}>
            Ya9
          </h1>
        </div>

        {/* Dynamic visual banner with stadium image, gradient colors, slogans, and logo */}
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          height: '165px', 
          overflow: 'hidden', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px', 
          background: '#020617',
          borderBottom: '1px solid #EAEAEA'
        }}>
          {/* Stadium Background Image */}
          {selectedTeam && (
            <img 
              src={TEAM_STADIUM_IMAGES[selectedTeam]} 
              alt="Stadium Background" 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                opacity: 0.45, 
                filter: 'blur(0.3px)',
                transition: 'all 0.5s ease-in-out'
              }}
            />
          )}
          
          {/* Dynamic Gradient Overlay based on Team Color */}
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: selectedTeam 
              ? `linear-gradient(to right, #090D1A 45%, ${(TEAM_THEME_COLORS[selectedTeam] || '#6C43EB')}A8 100%)`
              : 'linear-gradient(to right, #090D1A 0%, #1E293B 100%)',
            transition: 'all 0.5s ease-in-out'
          }}></div>
          
          {/* Left: Dynamic Slogan or Choose Team placeholder */}
          <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {selectedTeam ? (
              <>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: '900', 
                  color: '#FFFFFF', 
                  letterSpacing: '-0.5px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                  margin: 0
                }}>
                  {TEAM_SLOGANS[selectedTeam]?.title}
                </h3>
                <h4 style={{ 
                  fontSize: '15px', 
                  fontWeight: '700', 
                  color: '#E2E8F0', 
                  letterSpacing: '0.5px',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  margin: 0
                }}>
                  {TEAM_SLOGANS[selectedTeam]?.subtitle}
                </h4>
              </>
            ) : (
              <h3 style={{ 
                fontSize: '21px', 
                fontWeight: '900', 
                color: '#FFFFFF', 
                letterSpacing: '-0.5px',
                textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                margin: 0
              }}>
                팀을 선택해주세요 ⚾
              </h3>
            )}
          </div>

          {/* Right: Dynamic Team Logo overlay */}
          {selectedTeam && (
            <div style={{ 
              zIndex: 10, 
              height: '115px', 
              width: '115px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              filter: `drop-shadow(0 6px 16px ${TEAM_THEME_COLORS[selectedTeam] || 'rgba(255,255,255,0.3)'})`,
              transition: 'all 0.3s ease-in-out',
              transform: 'scale(1.05)'
            }}>
              <img 
                src={TEAM_BANNER_IMAGES[selectedTeam]} 
                alt="Team Emblem" 
                style={{ 
                  maxHeight: '100%', 
                  maxWidth: '100%', 
                  objectFit: 'contain'
                }} 
              />
            </div>
          )}
        </div>

        {/* Search input field */}
        <div style={{ padding: '0 20px', marginTop: '20px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search style={{ position: 'absolute', left: '16px', color: '#64748B' }} size={20} />
            <input 
              type="text" 
              placeholder="팀명 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 48px',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                backgroundColor: '#FFFFFF',
                fontSize: '14px',
                color: '#0F172A',
                outline: 'none',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                transition: 'border-color 0.2s'
              }}
            />
          </div>
        </div>

        {/* KBO grid of team selection */}
        <div style={{ padding: '0 20px', marginTop: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: '800', color: '#64748B', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>my team</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {filteredTeams.map((team) => {
              const isSelected = selectedTeam === team.id;
              
              // Team Color mappings for active shadow glows
              const TEAM_GLOWS = {
                kt: 'rgba(0,0,0,0.3)',
                lg: 'rgba(195,4,82,0.35)',
                kia: 'rgba(234,0,41,0.35)',
                doosan: 'rgba(19,18,48,0.35)',
                samsung: 'rgba(7,76,161,0.35)',
                ssg: 'rgba(206,14,45,0.35)',
                nc: 'rgba(49,82,165,0.35)',
                lotte: 'rgba(208,17,42,0.35)',
                kiwoom: 'rgba(130,0,36,0.35)',
                hanwha: 'rgba(255,102,0,0.35)'
              };

              return (
                <button
                  key={team.id}
                  onClick={() => handleTeamClick(team.id)}
                  onDoubleClick={() => onNext(team.id)}
                  style={{
                    width: '100%',
                    padding: '18px 12px',
                    border: isSelected ? '1px solid transparent' : '1px solid #EAEAEA',
                    borderRadius: '22px',
                    fontWeight: '800',
                    fontSize: '17px',
                    letterSpacing: '1.5px',
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    background: isSelected ? 'var(--primary-color)' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#475569',
                    boxShadow: isSelected 
                      ? `0 8px 20px ${TEAM_GLOWS[team.id]}` 
                      : '0 2px 6px rgba(0,0,0,0.015)',
                    transform: isSelected ? 'scale(1.04)' : 'none',
                    // Team inline variables for background-color assignment mapping
                    '--primary-color': 
                      team.id === 'kt' ? '#000000' : 
                      team.id === 'lg' ? '#C30452' : 
                      team.id === 'samsung' ? '#074CA1' : 
                      team.id === 'ssg' ? '#CE0E2D' : 
                      team.id === 'kia' ? '#EA0029' : 
                      team.id === 'hanwha' ? '#FF6600' : 
                      team.id === 'nc' ? '#3152A5' : 
                      team.id === 'doosan' ? '#131230' : 
                      team.id === 'lotte' ? '#D0112A' : '#820024'
                  }}
                >
                  {team.name}
                </button>
              );
            })}
            
            {/* Pad dynamic columns to match design 3.png cards grid layout curves */}
            {filteredTeams.length % 2 !== 0 && (
              <div style={{ borderRadius: '22px', border: '1px dashed #E2E8F0', background: 'transparent', minHeight: '58px' }}></div>
            )}
          </div>
        </div>
      </div>

      {/* MY TEAM save settings button */}
      <div style={{ padding: '0 20px', marginTop: '24px' }}>
        <button 
          onClick={() => {
            if (selectedTeam) {
              onNext(selectedTeam);
            } else {
              alert('마이팀을 선택해 주세요.');
            }
          }}
          style={{
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(to right, #6C43EB, #8A65FF)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '16px',
            fontWeight: '700',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(108,67,235,0.2)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = 0.9}
          onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
        >
          MY TEAM 설정
        </button>
      </div>

    </div>
  );
}
