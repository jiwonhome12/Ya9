import React, { useState, useRef } from 'react';
import { User } from 'lucide-react';
import { mockDbService } from '../services/mockDb';

export default function ProfileStep({ onNext }) {
  const profile = mockDbService.getUserProfile();
  const [name, setName] = useState(profile ? profile.name : '');
  const [description, setDescription] = useState(profile ? profile.bio : '');
  const [profileImg, setProfileImg] = useState(profile ? profile.avatar : null);
  const fileInputRef = useRef(null);

  const handleImgChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImgClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleNext = () => {
    // Save profile to database layer
    mockDbService.saveUserProfile({
      name: name.trim() || 'ji_won.-.f',
      bio: description.trim() || '제발 가을 야구좀 가자 😭',
      avatar: profileImg || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
    });
    onNext();
  };

  return (
    <>
      <div className="header">
        Ya9
      </div>
      <div className="container">
        <h1 className="title">User Profile</h1>
        
        <div className="profile-img-container">
          <div className="profile-img" onClick={handleImgClick} style={{ cursor: 'pointer', overflow: 'hidden', padding: profileImg ? 0 : undefined }}>
            {profileImg ? (
              <img src={profileImg} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User />
            )}
          </div>
          <button className="profile-img-btn" onClick={handleImgClick}>프로필 사진 변경</button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImgChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
        </div>
        
        <div className="input-group">
          <label className="input-label">name</label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="ji_won.-.f"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label className="input-label">소개글</label>
          <textarea 
            className="input-field textarea-field" 
            placeholder="제발 가을 야구좀 가자"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        
        <button className="primary-btn" onClick={handleNext}>
          next step
        </button>
      </div>
    </>
  );
}

