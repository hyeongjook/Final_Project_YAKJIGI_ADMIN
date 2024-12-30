'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import adcommons from '../styles/adcommons.module.css';
import styles from '../styles/ad202.module.css';

// 상태에 맞는 색상 반환 함수
const licenseColor = (license) => {
  if (license.includes('대기중')) {
    return '';
  }
  switch (license) {
    case '승인':
      return '#F1B840'; // 경고는 노란색
    case '거절':
      return 'red'; // 정지는 빨간색
    default:
      return 'black'; // 기본은 검은색
  }
};

// 검색창 컴포넌트
function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchCategory, setSearchCategory] = React.useState("아이디");

  // 검색 실행 함수
  const handleSearch = () => {
    onSearch(searchCategory, searchQuery);
  };

  // 엔터키로 검색 가능하도록 처리
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {  // 엔터키가 눌리면
      handleSearch();
    }
  };

  return (
    <div className={adcommons.adcommons__searchcontainer}>
      {/* 검색 옵션 */}
      <div className={adcommons.adcommons__searchdropdown}>
        <select
          className={adcommons.adcommons__category}
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        >
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
          onKeyDown={handleKeyDown}  // 엔터키를 감지하여 검색 실행
        />
        <button type="button" onClick={handleSearch}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>
    </div>
  );
}

const columns = [
  { field: 'id', headerName: '아이디', width: 180 },
  { field: 'Name', headerName: '이름', width: 160 },
  { field: 'email', headerName: '이메일', width: 450 },
  { field: 'regdate', headerName: '최초 가입일', width: 190 },
  { field: 'level', headerName: '등급', width: 190 },
  {
    field: 'license',
    headerName: '상태',
    width: 150,
    renderCell: (params) => {
      const license = params.row.license;
      const color = licenseColor(license);
      const fontWeight = license === '승인' || license === '거절' ? '600' : 'normal';
      return (
        <span style={{ color, fontWeight }}>
          {license}
        </span>
      );
    }
  }
];

const rows = [
  { id: 'hong', Name: 'Snow', email: 'hong@naver.com', regdate: '2000.00.00', level: '전문', license: '승인' },
  { id: 'park', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '전문', license: '거절' },
  { id: 'kim', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '전문', license: '대기중' },
  { id: 'lee', Name: 'Stark', email: 'hong@naver.com', regdate: '2000.00.00', level: '전문', license: '승인' },
  { id: 'yoon', Name: 'Targaryen', email: 'hong@naver.com', regdate: '2000.00.00', level: '전문', license: '승인' },
  { id: 'sdkw', Name: 'Melisandre', email: 'hong@naver.com', regdate: '2000.00.00', level: '전문', license: '승인' },
  { id: 'asdf', Name: 'Clifford', email: 'hong@naver.com', regdate: '2000.00.00', level: '전문', license: '거절' },
  { id: 'sadeee', Name: 'Frances', email: 'hong@naver.com', regdate: '2000.00.00', level: '전문', license: '승인' },
  { id: 'hhhg', Name: 'Roxie', email: 'hong@naver.com', regdate: '2000.00.00', level: '전문', license: '승인' }
];

// 모든 컬럼에 대해 `headerAlign: 'center'`를 동적으로 추가
const centeredColumns = columns.map(column => ({
  ...column,
  headerAlign: 'center'
}));

export default function DataTable() {
  const [page, setPage] = React.useState(1);
  const [filteredRows, setFilteredRows] = React.useState(rows);  // 필터링된 데이터 상태
  const rowsPerPage = 5;
  const router = useRouter();

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowClick = (params) => {
    const { id } = params.row;
    router.push(`/details/${id}`); // 상세보기 페이지로 이동
  };

  // 검색 기능
  const handleSearch = (category, query) => {
    const filteredData = rows.filter((row) => {
      if (category === '아이디') {
        return row.id.includes(query);
      } else if (category === '이름') {
        return row.Name.includes(query);
      } else if (category === '이메일') {
        return row.email.includes(query);
      }
      return true;
    });
    setFilteredRows(filteredData);  // 검색된 데이터로 업데이트
  };

  // 페이지에 맞게 데이터를 잘라냄
  const startIndex = (page - 1) * rowsPerPage;
  const currentRows = filteredRows.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className={adcommons.adcommons__container}>
      <h1 className={adcommons.adcommons__title}>전문 회원 관리</h1>
      <div className={styles.ad202__search}>
        <SearchBar onSearch={handleSearch} /> {/* 검색창에 검색 기능 전달 */}
      </div>
      <div className={adcommons.adcommons__table}>
        <Paper sx={{ width: '100%' }}>
          <DataGrid
            rows={currentRows}
            columns={centeredColumns}
            pageSize={rowsPerPage}
            hideFooterPagination={true} // 페이지네이션 숨기기
            hideFooter={true}
            onRowClick={handleRowClick} // 행 클릭 이벤트 핸들러 추가
            sx={{
              border: 0,
              // 셀의 텍스트를 가운데 정렬
              '& .MuiDataGrid-cell': {
                textAlign: 'center',
              },
            }}
          />
        </Paper>
      </div>
      <Stack spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
        <Pagination
          count={Math.ceil(filteredRows.length / rowsPerPage)} // 필터링된 데이터에 대한 총 페이지 수
          page={page}
          onChange={handlePageChange}
          color="secondary"
        />
      </Stack>
    </div>
  );
}