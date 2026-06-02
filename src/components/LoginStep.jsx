import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { mockDbService } from '../services/mockDb';

export default function LoginStep({ onNext }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tokenClient, setTokenClient] = useState(null);

  useEffect(() => {
    const initGoogle = () => {
      if (window.google && window.google.accounts) {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: "605436856407-p3scojndq68qskbdrjp292khqnlg2ffj.apps.googleusercontent.com",
          scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
          callback: async (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) {
              try {
                // Fetch user info from Google's UserInfo API
                const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                  headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`
                  }
                });
                const decoded = await res.json();
                if (decoded) {
                  // Save Google profile to mock DB
                  mockDbService.saveUserProfile({
                    name: decoded.name || decoded.email.split('@')[0],
                    avatar: decoded.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
                    bio: `${decoded.email} 계정으로 로그인되었습니다.`
                  });
                  onNext();
                }
              } catch (error) {
                console.error('Failed to fetch userinfo from Google', error);
              }
            }
          }
        });
        setTokenClient(client);
      }
    };

    if (window.google && window.google.accounts) {
      initGoogle();
    } else {
      const interval = setInterval(() => {
        if (window.google && window.google.accounts) {
          initGoogle();
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  const handleGoogleLogin = () => {
    if (tokenClient) {
      tokenClient.requestAccessToken();
    } else {
      alert("구글 로그인 라이브러리를 로드 중입니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <>
      <div className="header">
        Ya9
      </div>
      <div className="container">
        <h1 className="title">Login</h1>
        
        <div className="input-group">
          <label className="input-label">Email</label>
          <input 
            type="email" 
            className="input-field" 
            placeholder="v3_please@lotte.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label className="input-label">Password</label>
          <input 
            type="password" 
            className="input-field" 
            placeholder="***********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button className="primary-btn" onClick={onNext}>
          next step
        </button>

        <div className="divider-wrapper">
          <div className="divider-line"></div>
          <div className="divider-text">or</div>
          <div className="divider-line"></div>
        </div>

        <h2 className="social-login-title">간편 로그인</h2>
        
        <div className="social-login-buttons">
          <button className="social-btn kakao" onClick={onNext}>
            <MessageCircle size={36} fill="#391B1B" />
          </button>
          <button className="social-btn naver" onClick={onNext}>
            N
          </button>
          <button className="social-btn google-custom" onClick={handleGoogleLogin}>
            <img src="/images/google_icon.png" alt="Google Login" className="google-icon-img" />
          </button>
        </div>
      </div>
    </>
  );
}
