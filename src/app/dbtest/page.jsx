'use client';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
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

const columns = [
  { field: 'user_idx', headerName: 'IDX', width: 150 },
  { field: 'user_id', headerName: '아이디', width: 150 },
  { field: 'user_name', headerName: '이름', width: 200 },
  { field: 'user_email', headerName: '이메일', width: 250 },
  { field: 'user_birth_date', headerName: '생년월일', width: 250 },
  { field: 'user_nickname', headerName: '닉네임', width: 250 },
];

// 모든 컬럼에 대해 `headerAlign: 'center'`를 동적으로 추가
const centeredColumns = columns.map((column) => ({
  ...column,
  headerAlign: 'center',
}));

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
  const handleSelectionModelChange = (newSelection) => {
    console.log('선택된 행:', newSelection); // 선택된 행 확인
    setSelectedRows(newSelection); // 선택된 ID만 selectedRows에 저장
  };

  // 삭제 버튼 클릭 시 선택된 행 삭제 (여기서는 UI에서만 삭제 처리)
  const handleDelete = () => {
    // 선택된 항목으로 rows 필터링
    const remainingRows = rows.filter((row) => !selectedRows.includes(row.user_idx));
    setRows(remainingRows); // 새로운 rows로 상태 업데이트
    setSelectedRows([]); // 선택된 항목 초기화
  };

  // selectedRows 상태가 바뀔 때마다 로그를 찍기 위한 useEffect
  React.useEffect(() => {
    console.log('선택된 행:', selectedRows); // 상태가 변경될 때마다 출력
  }, [selectedRows]); // selectedRows가 바뀔 때마다 실행

  return (
    <div className={adcommons.adcommons__container}>
      <h1 className={adcommons.adcommons__title}>일반 회원 관리</h1>
      <div className={styles.ad201__search}>
        <SearchBar />
      </div>
      {/* 테이블 */}
      <div className={adcommons.adcommons__table}>
        <Paper sx={{ width: '100%' }}>
          <DataGrid
            rows={currentRows}
            columns={centeredColumns}
            pageSize={rowsPerPage}
            checkboxSelection
            hideFooterPagination={true} // 페이지네이션 숨기기
            hideFooter={true}
            getRowId={(row) => row.user_idx}
            sx={{
              // 셀의 텍스트를 가운데 정렬
              '& .MuiDataGrid-cell': {
                textAlign: 'center',
              },
            }}
            onSelectionModelChange={(newSelection) => {
              // 선택된 모델 변경시 상태 업데이트
              setSelectedRows(newSelection);
            }}
          />
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