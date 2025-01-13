'use client';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import axios from 'axios';
import adcommons from "../styles/adcommons.module.css";
import styles from '../styles/ad701.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 검색창 컴포넌트
function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className={adcommons.adcommons__searchcontainer}>
      <div className={adcommons.adcommons__searchdropdown}>
        <select className={adcommons.adcommons__category} defaultValue="제목">
          <option value="제목">제목</option>
          <option value="작성자">작성자</option>
        </select>
      </div>

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
  const [rows, setRows] = React.useState([]); // 서버에서 가져온 데이터 상태
  const [page, setPage] = React.useState(1); // 현재 페이지
  const [selectedRows, setSelectedRows] = React.useState([]); // 선택된 항목 상태
  const [searchQuery, setSearchQuery] = React.useState(""); // 검색어 상태
  const rowsPerPage = 5; // 한 페이지에 보여줄 행 수

  // 데이터 가져오기
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/notice/list');
      console.log("서버에서 가져온 데이터:", response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setRows(response.data.data);
      }
    } catch (error) {
      console.log("데이터를 가져오지 못했습니다", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []); // 컴포넌트가 마운트될 때 데이터 로드

  // 페이지 변경 핸들러
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // 선택된 행 변경 핸들러
  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection.selectionModel);
  };

  const router = useRouter();

  const handleClickRow = (params) => {
    const { notice_idx } = params.row;
    router.push(`/ad701detail?notice_idx=${notice_idx}`)
  }



  // 검색 필터링된 행 계산
  // 검색 필터링된 행 계산
  const filteredRows = rows.filter((row) => {
    return (
      (row.notice_title && row.notice_title.includes(searchQuery)) ||
      (row.notice_content && row.notice_content.includes(searchQuery))
    );
  });

  // 페이지네이션을 고려한 현재 페이지의 행 데이터
  const startIndex = (page - 1) * rowsPerPage;
  const currentRows = filteredRows.slice(startIndex, startIndex + rowsPerPage);

  const isDeleteButtonDisabled = selectedRows.length === 0; // 선택된 항목 없으면 삭제 버튼 비활성화

  return (
    <div className={adcommons.adcommons__container}>
      <h1 className={adcommons.adcommons__title}>공지사항 관리</h1>

      <div className={styles.ad701__search}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className={adcommons.adcommons__table}>
        <Paper sx={{ width: '100%' }}>
          <div className={adcommons.adcommons__buttoncontainer}>
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
              disabled={isDeleteButtonDisabled}
            >
              삭제하기
            </Button>

            <Link href="/ad701write" passHref>
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
              >
                추가하기
              </Button>
            </Link>
            
          </div>

          <DataGrid
            rows={currentRows} // 필터링된 데이터에서 현재 페이지의 행만 전달
            columns={[
              { field: 'notice_idx', headerName: '번호', width: 207 },
              { field: 'notice_title', headerName: '제목', width: 207 },
              { field: 'notice_content', headerName: '내용', width: 400 },
              { field: 'notice_reg_date', headerName: '작성일', width: 207 },
            ]}
            pageSize={rowsPerPage}
            checkboxSelection
            hideFooterPagination={true}
            hideFooter={true}
            onSelectionModelChange={handleSelectionChange}
            selectionModel={selectedRows}
            sx={{
              '& .MuiDataGrid-cell': {
                textAlign: 'center',
              },
            }}
            getRowId={(row) => row.notice_idx} // 고유 id를 얻는 함수
            onRowClick={handleClickRow}
          />
        </Paper>
      </div>

      {/* 페이지네이션 */}
      <Stack spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
        <Pagination
          count={Math.ceil(filteredRows.length / rowsPerPage)} // 필터링된 데이터의 총 페이지 수
          page={page}
          onChange={handlePageChange}
          color="secondary"
        />
      </Stack>
    </div>
  );
}