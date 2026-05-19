import React, { useEffect, useRef } from 'react';

export default function KakaoMap({ latitude = 37.5122579, longitude = 127.0718742, style }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3
        };
        const map = new window.kakao.maps.Map(mapRef.current, options);
        
        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude); 
        const marker = new window.kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);
      });
    }
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ width: '100%', height: '250px', ...style }}></div>;
}
