'use client';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import styles from '../styles/ad703.module.css'
import { Button } from '@mui/material';

// 검색창 컴포넌트
function SearchBar() {
    const [searchQuery, setSearchQuery] = React.useState("");
  
    return (
      <div className={styles.ad703__searchcontainer}>
        {/* 검색 옵션 */}
        <div className={styles.ad703__searchdropdown}>
          <select className={styles.ad703__category} defaultValue="제목">
            <option value="제목">제목</option>
            <option value="작성자">작성자</option>
          </select>
        </div>
  
        {/* 검색바 */}
        <div className={styles.ad703__searchbar}>
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
    { field: 'id', headerName: 'idx', width: 207 },
    { field: 'Name', headerName: '작성자 이름', width: 207 },
    { field: 'title', headerName: '제목', width: 400 },
    { field: 'regdate', headerName: '작성일', width: 207 },
    { field: 'open', headerName: '공개여부', sortable: false, width: 207 },
  ];
  
  const rows = [
    { id: 'counsel_idx', Name: 'user_idx', title: 'counsel_title', regdate: 'counsel_regdate', open: 'counsel_open' },
    { id: 1, Name: 'Lannister', title: '제목입니다', regdate: '2000.00.00', open: 'o' },
    { id: 2, Name: 'Lannister', title: '제목입니다', regdate: '2000.00.00', open: 'o' },
    { id: 3, Name: 'Stark', title: '제목입니다', regdate: '2000.00.00', open: 'x' },
    { id: 4, Name: 'Targaryen', title: '제목입니다', regdate: '2000.00.00', open: 'o' },
    { id: 5, Name: 'Melisandre', title: '제목입니다', regdate: '2000.00.00', open: 'x' },
    { id: 6, Name: 'Clifford', title: '제목입니다', regdate: '2000.00.00', open: 'o' },
    { id: 7, Name: 'Frances', title: '제목입니다', regdate: '2000.00.00', open: 'o' },
    { id: 8, Name: 'Roxie', title: '제목입니다', regdate: '2000.00.00', open: 'o' },
    { id: 9, Name: 'Snow', title: '제목입니다', regdate: '2000.00.00', open: 'x' },
    { id: 10,  Name: 'Lannister', title: '제목입니다', regdate: '2000.00.00', open: 'x' },
    { id: 11, Name: 'Lannister', title: '제목입니다', regdate: '2000.00.00', open: 'x' },
    { id: 12, Name: 'Stark', title: '제목입니다', regdate: '2000.00.00', open: 'x' },
    { id: 13, Name: 'Targaryen', title: '제목입니다', regdate: '2000.00.00', open: 'x' },
    { id: 14, Name: 'Melisandre', title: '제목입니다', regdate: '2000.00.00', open: 'x' },
  ];
  
  export default function DataTable() {
    const [page, setPage] = React.useState(1);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const rowsPerPage = 5;
  
    const handlePageChange = (event, value) => {
      setPage(value);
    };
  
    const handleSelectionChange = (newSelection) => {
      setSelectedRows(newSelection.selectionModel); // 체크된 ID 목록 업데이트
    };
  
    const startIndex = (page - 1) * rowsPerPage;
    const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);
  
    const isDeleteButtonDisabled = selectedRows.length == 0; // 선택된 항목 없으면 삭제 버튼 비활성화
  
    return (
      <div className={styles.ad703__container}>
        <h1 className={styles.ad703__title}>전문가와의 상담 관리</h1>
        <div className={styles.ad703__search}>
          <SearchBar />
        </div>
        <div className={styles.ad703__table}>
        <Paper sx={{ width: '100%' }}>
          <div className={styles.ad703__buttoncontainer}>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                backgroundColor: 'white',
                color: '#9C27B0',
                border: '1px solid #9C27B0',
                borderRadius: '42px',
                '&:hover': {
                  backgroundColor: 'secondary.main',
                  color: 'white',
                  border: '1px solid #9e9e9e',
                }
              }}
              disabled={isDeleteButtonDisabled} // 삭제 버튼 활성화/비활성화
            >
              삭제하기
            </Button>

          </div>
          <DataGrid
            rows={currentRows}
            columns={columns}
            pageSize={rowsPerPage}
            checkboxSelection
            hideFooterPagination={true} // 페이지네이션 숨기기
            hideFooter={true}
            onSelectionModelChange={handleSelectionChange}  // 선택된 항목이 바뀔 때 호출
            selectionModel={selectedRows}  // 선택된 행의 ID를 모델에 반영
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