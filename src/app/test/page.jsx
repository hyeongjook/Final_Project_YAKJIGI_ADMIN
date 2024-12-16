"use client";
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import styles from '../styles/test.module.css';


// 검색창 컴포넌트
function SearchBar() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className={styles.test__searchcontainer}>
      <div className={styles.test__searchdropdown}>
        <select className={styles.test__category} defaultValue="부작용">
          <option value="부작용">부작용 검색하기</option>
          <option value="이름">제조사명</option>
        </select>
      </div>

      <div className={styles.test__searchbar}>
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
  { field: 'id', headerName: 'DB확정나면수정', width: 207 },
  { field: 'Name', headerName: 'DB확정나면수정', width: 207 },
  { field: 'email', headerName: 'DB확정나면수정', width: 400 },
  { field: 'regdate', headerName: 'DB확정나면수정', width: 207 },
  { field: 'level', headerName: 'DB확정나면수정', sortable: false, width: 50 }
];

const rows = [
  { id: 'hong', Name: 'Snow', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
  { id: 'park', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
  { id: 'kim', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
  { id: 'lee', Name: 'Stark', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
  { id: 'yoon', Name: 'Targaryen', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
  { id: 'sdkw', Name: 'Melisandre', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
  { id: 'asdf', Name: 'Clifford', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
  { id: 'sadeee', Name: 'Frances', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
  { id: 'hhhg', Name: 'Roxie', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
  { id: 'hosdfng', Name: 'Snow', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
  { id: 'sdrkfs', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
  { id: 'sdewr', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
  { id: 'zcgh', Name: 'Stark', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
  { id: 'qhjm', Name: 'Targaryen', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
  { id: 'ssgjt', Name: 'Melisandre', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' }
];


export default function DataTable() {
  const [page, setPage] = React.useState(1);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const rowsPerPage = 5;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSelectionChange = (newSelection) => {
    console.log("Selected rows: ", newSelection.selectionModel);
    setSelectedRows(newSelection.selectionModel);  // 선택된 ID 목록 업데이트
  };

  const startIndex = (page - 1) * rowsPerPage;
  const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);

  const isDeleteButtonEnabled = selectedRows.length > 0; // 선택된 항목이 있을 때 삭제 버튼 활성화


  return (
    <div className={styles.test__container}>
      <h1 className={styles.test__title}>신고 관리</h1>
      <div className={styles.test__search}>
        <SearchBar />
      </div>
      <div className={styles.test__table}>
        <Paper sx={{ width: '100%' }}>
          <div className={styles.test__buttoncontainer}>
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
                  border: '1px solid #9e9e9e'
                }
              }}
              disabled={!isDeleteButtonEnabled} // 삭제 버튼 활성화/비활성화
            >
              삭제하기
            </Button>

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
                  border: '1px solid #9e9e9e'
                }
              }}
            >
              추가하기
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