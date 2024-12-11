'use client';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import styles from '../styles/ad301.module.css'

// 검색창 컴포넌트
function SearchBar() {
    const [searchQuery, setSearchQuery] = React.useState("");
  
    return (
      <div className={styles.ad301__searchcontainer}>
        {/* 검색 옵션 */}
        <div className={styles.ad301__searchdropdown}>
          <select className={styles.ad301__category} defaultValue="아이디">
            <option value="아이디">아이디</option>
            <option value="이름">이름</option>
            <option value="이메일">이메일</option>
          </select>
        </div>
  
        {/* 검색바 */}
        <div className={styles.ad301__searchbar}>
          <input type="text" placeholder="검색어를 입력하세요." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
          <button type="button" >
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>
    );
  }
  
  const columns = [
    { field: 'id', headerName: '아이디', width: 207 },
    { field: 'Name', headerName: '이름', width: 207 },
    { field: 'email', headerName: '이메일', width: 400 },
    { field: 'regdate', headerName: '최초 가입일', width: 207 },
    { field: 'level', headerName: '등급', sortable: false, width: 207 },
  ];
  
  const rows = [
    { id: 'hong', Name: 'Snow', email: 'hong@naver.com', regdate: '2000.00.00', level: '관리자' },
    { id: 'park', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '관리자' },
    { id: 'kim', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '관리자' },
    { id: 'lee', Name: 'Stark', email: 'hong@naver.com', regdate: '2000.00.00', level: '관리자' },
    { id: 'yoon', Name: 'Targaryen', email: 'hong@naver.com', regdate: '2000.00.00', level: '관리자' },
    { id: 'sdkw', Name: 'Melisandre', email: 'hong@naver.com', regdate: '2000.00.00', level: '관리자' },
    { id: 'asdf', Name: 'Clifford', email: 'hong@naver.com', regdate: '2000.00.00', level: '관리자' },
    { id: 'sadeee', Name: 'Frances', email: 'hong@naver.com', regdate: '2000.00.00', level: '관리자' },
    { id: 'hhhg', Name: 'Roxie', email: 'hong@naver.com', regdate: '2000.00.00', level: '관리자' },
  ];
  
  export default function DataTable() {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 5;
  
    const handlePageChange = (event, value) => {
      setPage(value);
    };
  
    // 페이지에 맞게 데이터를 잘라냄
    const startIndex = (page - 1) * rowsPerPage;
    const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);
  
    return (
      <div className={styles.ad301__container}>
        <h1 className={styles.ad301__title}>관리자 관리</h1>
        <div className={styles.ad301__search}>
          <SearchBar />
        </div>
        <div className={styles.ad301__table}>
          <Paper sx={{ width: '100%' }}>
            <DataGrid
              rows={currentRows}
              columns={columns}
              pageSize={rowsPerPage}
              checkboxSelection
              sx={{ border: 0 }}
              hideFooterPagination={true}  // 페이지네이션 숨기기
              hideFooter={true} 
            />
          </Paper>
        </div>
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