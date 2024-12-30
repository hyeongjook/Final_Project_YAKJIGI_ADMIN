'use client';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';
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
  { field: 'user_idx', headerName: 'user_idx', width: 80 },
  { field: 'user_id', headerName: '아이디', width: 190 },
  { field: 'user_name', headerName: '이름', width: 160 },
  { field: 'user_nickname', headerName: '닉네임', width: 170 },
  { field: 'user_email', headerName: '이메일', width: 330 },
  { field: 'user_reg_date', headerName: '최초 가입일', width: 200 },
  { field: 'user_level_idx', headerName: '등급', width: 180 },
];

// 모든 컬럼에 대해 `headerAlign: 'center'`를 동적으로 추가
const centeredColumns = columns.map((column) => ({
  ...column,
  headerAlign: 'center',
}));

export default function DataTable() {
  const [page, setPage] = React.useState(1);
  const [users, setUsers] = React.useState([]);
  const rowsPerPage = 5;
  const router = useRouter();

  // 페이지 변경 처리
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // 데이터 로딩
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // API 경로
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
      }
    };
    fetchUsers();
  }, []);

  // 페이지에 맞는 데이터 계산
  const startIndex = (page - 1) * rowsPerPage;
  const currentRows = users.slice(startIndex, startIndex + rowsPerPage);

  const handleRowClick = (params) => {
    const { user_idx } = params.row;
    router.push(`/ad201detail?${user_idx}`); // 상세보기 페이지로 이동
  };

  return (
    <div className={adcommons.adcommons__container}>
      <h1 className={adcommons.adcommons__title}>일반 회원 관리</h1>
      <div className={styles.ad201__search}>
        <SearchBar />
      </div>
      <div className={adcommons.adcommons__table}>
        <Paper sx={{ width: '100%' }}>
          <DataGrid
            rows={currentRows}
            columns={centeredColumns}
            pageSize={rowsPerPage}
            hideFooterPagination={true} // 페이지네이션 숨기기
            hideFooter={true}
            onRowClick={handleRowClick}
            getRowId={(row) => row.user_idx}  // user_idx를 고유 id로 사용
            sx={{
              border: 0,
              '& .MuiDataGrid-cell': {
                textAlign: 'center',
              },
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
          />
        </Paper>
      </div>
      <Stack spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
        <Pagination
          count={Math.ceil(users.length / rowsPerPage)} // 총 페이지 수 계산
          page={page}
          onChange={handlePageChange}
          color="secondary"
        />
      </Stack>
    </div>
  );
}
