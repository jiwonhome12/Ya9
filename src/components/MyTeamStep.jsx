import React, { useState } from 'react';
import { Search } from 'lucide-react';

const TEAMS = [
  { id: 'kt', name: 'KT', keywords: ['케이티', 'kt', 'wiz', '위즈'] },
  { id: 'lg', name: 'LG', keywords: ['엘지', 'lg', 'twins', '트윈스'] },
  { id: 'samsung', name: 'SAMSUNG', keywords: ['삼성', 'samsung', 'lions', '라이온즈'] },
  { id: 'ssg', name: 'SSG', keywords: ['에스에스지', 'ssg', 'landers', '랜더스', '쓱'] },
  { id: 'kia', name: 'KIA', keywords: ['기아', 'kia', 'tigers', '타이거즈'] },
  { id: 'doosan', name: 'DOOSAN', keywords: ['두산', 'doosan', 'bears', '베어스'] },
  { id: 'hanwha', name: 'HANWHA', keywords: ['한화', 'hanwha', 'eagles', '이글스'] },
  { id: 'nc', name: 'NC', keywords: ['엔씨', 'nc', 'dinos', '다이노스'] },
  { id: 'lotte', name: 'LOTTE', keywords: ['롯데', 'lotte', 'giants', '자이언츠'] },
  { id: 'kiwoom', name: 'KIWOOM', keywords: ['키움', 'kiwoom', 'heroes', '히어로즈'] },
];

export default function MyTeamStep({ onNext }) {
  const [selectedTeam, setSelectedTeam] = useState('lotte'); // Default to lotte as in image
  const [searchQuery, setSearchQuery] = useState('');

  const handleTeamClick = (teamId) => {
    setSelectedTeam(teamId);
  };

  const filteredTeams = TEAMS.filter(team => {
    const query = searchQuery.toLowerCase().replace(/\s+/g, '');
    if (!query) return true;
    
    if (team.name.toLowerCase().includes(query)) return true;
    if (team.keywords.some(kw => kw.includes(query))) return true;
    
    return false;
  });

  return (
    <>
      <div className="header">
        stadium pulse
      </div>
      <div className="container">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="팀명 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="team-list-label">my team</div>
        
        <div className="team-list">
          {filteredTeams.map((team) => (
            <button
              key={team.id}
              className={`team-btn ${team.id} ${selectedTeam === team.id ? 'selected' : ''}`}
              onClick={() => handleTeamClick(team.id)}
            >
              {team.name}
            </button>
          ))}
        </div>
        
        <button className="primary-btn" onClick={() => onNext(selectedTeam)}>
          MY TEAM 설정
        </button>
      </div>
    </>
  );
}
