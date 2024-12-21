'use client';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import styles from '../styles/ad201.module.css';
import adcommons from '../styles/adcommons.module.css';

// 검색창 컴포넌트
function SearchBar() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className={adcommons.adcommons__searchcontainer}>
      {/* 검색 옵션 */}
      <div className={adcommons.adcommons__searchdropdown}>
        <select className={adcommons.adcommons__category} defaultValue="아이디">
          <option value="아이디">아이디</option>
          <option value="이름">이름</option>
          <option value="이메일">이메일</option>
        </select>
      </div>

      {/* 검색바 */}
      <div className={adcommons.adcommons__searchbar}>
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button">
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>
    </div>
  );
}

export default function DataTable() {
  const [page, setPage] = React.useState(1);
  const [rows, setRows] = React.useState([]); // 상태로 데이터 저장
  const [selectedRows, setSelectedRows] = React.useState([]); // 선택된 행을 저장하는 상태
  const rowsPerPage = 5;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);

  // 데이터 가져오는 함수 (useEffect에서 실행)
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/users'); // API 요청
        if (response.ok) {
          const data = await response.json();
          setRows(data); // 데이터 상태에 저장
        } else {
          console.error('데이터를 가져오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      }
    }

    fetchData();
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

  // 선택된 행의 ID를 관리하는 함수
  const handleSelectionChange = (user_idx) => {
    if (selectedRows.includes(user_idx)) {
      setSelectedRows(selectedRows.filter((id) => id !== user_idx));
    } else {
      setSelectedRows([...selectedRows, user_idx]);
    }
  };

  // 삭제 버튼 클릭 시 DB에서도 삭제 요청
  const handleDelete = async () => {
    try {
        console.log('선택된 ID 목록:', selectedRows); // 선택된 ID 목록 출력

      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_idx: selectedRows, // 선택된 사용자 ID 배열
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('사용자 삭제 성공');
        // 삭제 후 데이터 갱신 처리
      } else {
        console.error('서버에서 삭제 요청 실패');
        alert('삭제 실패: ' + data.error); // 서버에서 반환한 에러 메시지
      }
    } catch (error) {
      console.error('삭제 요청 중 오류 발생:', error);
      alert('서버와의 연결에 실패했습니다.');
    }
  };

  return (
    <div className={adcommons.adcommons__container}>
      <h1 className={adcommons.adcommons__title}>일반 회원 관리</h1>
      <div className={styles.ad201__search}>
        <SearchBar />
      </div>

      {/* 테이블 */}
      <div className={adcommons.adcommons__table}>
        <Paper sx={{ width: '100%' }}>
          <table className={adcommons.adcommons__customTable}>
            <thead>
              <tr>
                <th><input type="checkbox" onChange={() => setSelectedRows([])} /></th>
                <th>idx</th>
                <th>아이디</th>
                <th>이름</th>
                <th>이메일</th>
                <th>생년월일</th>
                <th>닉네임</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row) => (
                <tr key={row.user_idx}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.user_idx)}
                      onChange={() => handleSelectionChange(row.user_idx)} // 수정된 부분
                    />
                  </td>
                  <td>{row.user_idx}</td>
                  <td>{row.user_id}</td>
                  <td>{row.user_name}</td>
                  <td>{row.user_email}</td>
                  <td>{row.user_birth_date}</td>
                  <td>{row.user_nickname}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
      </div>

      {/* 삭제 버튼 */}
      <div className={adcommons.adcommons__deletecontainer}>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={selectedRows.length === 0} // 선택된 항목이 없으면 비활성화
        >
          삭제
        </Button>
      </div>

      {/* 페이지네이션 */}
      <Stack spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
        <Pagination
          count={Math.ceil(rows.length / rowsPerPage)} // 총 페이지 수 계산
          page={page}
          onChange={handlePageChange}
          color="secondary"
        />
      </Stack>
    </div>
  );
}