import React from 'react';
import './Adheader.css'; 

const Adheader = () => {
  return (
    <header className="adheader">
      <div className="adheader__left">
        <button className="adheader__homebutton">홈페이지 바로가기</button>
        <div className="adheader__userinfo">
          <button className='adheader__info'>내 정보</button>
          <button className="adheader__logoutbutton">로그아웃</button>
        </div>
      </div>

      {/* 상단 메뉴 */}
      <nav className="adheader__nav">
        <ul className='adheader__ul'>
          <li><button className="adheader__navbutton1">Home</button></li>
          <li><button className="adheader__navbutton2">대시보드</button></li>
          <li><button className="adheader__navbutton3">사용자 관리</button></li>
          <li><button className="adheader__navbutton4">페이지 관리</button></li>
          <li><button className="adheader__navbutton5">커뮤니티 관리</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Adheader;