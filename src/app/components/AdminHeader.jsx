"use client";
import { useState } from "react";
import "../globals.css";
import Link from "next/link";

function Page() {
  // 각 메뉴의 상태를 관리하는 객체 형태
  const [hoverMenu, setHoverMenu] = useState({
    userManagement: false,
    adminManagement: false,
    pageManagement: false,
    communityManagement: false,
  });

  const [hoverSubMenu, setHoverSubMenu] = useState({
    userManagementSub1 : false,
    userManagementSub2 : false,
    adminManagementSub1 : false,
    adminManagementSub2 : false,


  }); // 서브메뉴 상태

  // 특정 메뉴의 hover 상태를 변경하는 함수
  const handleMouseEnter = (menu) => {
    setHoverMenu((prev) => ({ ...prev, [menu]: true }));
  };

  const handleMouseLeave = (menu) => {
    setHoverMenu((prev) => ({ ...prev, [menu]: false }));
  };

  return (
    <div className="admin-Header">
      {/* 상단 사용자 정보 */}
      <div className="admin-user-color">
        <div className="admin-user">
          <p>아이콘</p>
          <p>내 정보</p>
          <p>로그아웃</p>
        </div>
      </div>
      {/* 메뉴 바 */}
      <div className="menubar-color">
        <div className="menubar">
          <ul>
            <li className="menu-Home">
              <Link href="/">HOME</Link>
            </li>
            <div className="li-list">
              <li className="menu-options">대쉬보드</li>
              {/* 사용자 관리 */}
              <li
                className="menu-options"
                onMouseEnter={() => handleMouseEnter("userManagement")}
                onMouseLeave={() => handleMouseLeave("userManagement")}
              >
                사용자 관리
                {hoverMenu.userManagement && (
                  <ul className="dropdown">
                    <li className="dropdown-item"
                     onMouseEnter={() => handleMouseEnter("userManagement")}
                     onMouseLeave={() => handleMouseLeave("userManagement")}
                    >일반 회원 관리</li>
                    <li className="dropdown-item">회원 신고 내역</li>
                  </ul>
                )}
              </li>
              {/* 관리자 관리 */}
              <li
                className="menu-options"
                onMouseEnter={() => handleMouseEnter("adminManagement")}
                onMouseLeave={() => handleMouseLeave("adminManagement")}
              >
                관리자 관리
                {hoverMenu.adminManagement && (
                  <ul className="dropdown">
                    <li className="dropdown-item">관리자 생성</li>
                    <li className="dropdown-item">관리자 목록</li>
                  </ul>
                )}
              </li>
              {/* 페이지 관리 */}
              <li
                className="menu-options"
                onMouseEnter={() => handleMouseEnter("pageManagement")}
                onMouseLeave={() => handleMouseLeave("pageManagement")}
              >
                페이지 관리
                {hoverMenu.pageManagement && (
                  <ul className="dropdown">
                    <li className="dropdown-item">의약품이란?</li>
                    <li className="dropdown-item">안전한 의약 생활</li>
                    <li className="dropdown-item">생활 속 의약</li>
                    <li className="dropdown-item">팝업 관리</li>
                  </ul>
                )}
              </li>
              {/* 커뮤니티 관리 */}
              <li
                className="menu-options"
                onMouseEnter={() => handleMouseEnter("communityManagement")}
                onMouseLeave={() => handleMouseLeave("communityManagement")}
              >
                커뮤니티 관리
                {hoverMenu.communityManagement && (
                  <ul className="dropdown">
                    <li className="dropdown-item">공지사항</li>
                    <li className="dropdown-item">자주 묻는 질문</li>
                    <li className="dropdown-item">전문가와의 상담</li>
                    <li className="dropdown-item">운영진에게 문의</li>
                  </ul>
                )}
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Page;
