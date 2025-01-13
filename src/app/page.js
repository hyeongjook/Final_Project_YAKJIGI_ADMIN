import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import styles from './styles/page.module.css';
import Link from 'next/link'; // Link import 추가

// 테이블1 데이터
const columns1 = [
    { field: 'idx', headerName: '번호', width: 90 },
    { field: 'id', headerName: '아이디', width: 130 },
    { field: 'name', headerName: '이름', width: 100 },
    { field: 'nickname', headerName: '닉네임', width: 150 },
    { field: 'level', headerName: '등급', sortable: false, width: 120 }
];

const rows1 = [
    { idx: 1, id: 'id1', name: 'name1', nickname: 'nickname1', level: '전문' },
    { idx: 2, id: 'id2', name: 'name2', nickname: 'nickname2', level: '전문' },
    { idx: 3, id: 'id3', name: 'name3', nickname: 'nickname3', level: '일반' },
    { idx: 4, id: 'id4', name: 'name4', nickname: 'nickname4', level: '전문' },
    { idx: 5, id: 'id5', name: 'name5', nickname: 'nickname5', level: '전문' },
    { idx: 6, id: 'id6', name: 'name6', nickname: 'nickname6', level: '일반' },
    { idx: 7, id: 'id7', name: 'name7', nickname: 'nickname7', level: '전문' },
    { idx: 8, id: 'id8', name: 'name8', nickname: 'nickname8', level: '전문' },
    { idx: 9, id: 'id9', name: 'name9', nickname: 'nickname9', level: '일반' },
    { idx: 10, id: 'id10', name: 'name10', nickname: 'nickname10', level: '전문' },
    { idx: 11, id: 'id11', name: 'name11', nickname: 'nickname11', level: '전문' },
    { idx: 12, id: 'id12', name: 'name12', nickname: 'nickname12', level: '일반' },
    { idx: 13, id: 'id13', name: 'name13', nickname: 'nickname13', level: '전문' },
    { idx: 14, id: 'id14', name: 'name14', nickname: 'nickname14', level: '전문' },
    { idx: 15, id: 'id15', name: 'name15', nickname: 'nickname15', level: '일반' },
    { idx: 16, id: 'id16', name: 'name16', nickname: 'nickname16', level: '전문' },
    { idx: 17, id: 'id17', name: 'name17', nickname: 'nickname17', level: '전문' },
    { idx: 18, id: 'id18', name: 'name18', nickname: 'nickname18', level: '일반' },
    { idx: 19, id: 'id19', name: 'name19', nickname: 'nickname19', level: '전문' },
    { idx: 20, id: 'id20', name: 'name20', nickname: 'nickname20', level: '전문' },
    { idx: 21, id: 'id21', name: 'name21', nickname: 'nickname21', level: '일반' },
    { idx: 22, id: 'id22', name: 'name22', nickname: 'nickname22', level: '전문' },
    { idx: 23, id: 'id23', name: 'name23', nickname: 'nickname23', level: '전문' },
    { idx: 24, id: 'id24', name: 'name24', nickname: 'nickname24', level: '일반' },
    { idx: 25, id: 'id25', name: 'name25', nickname: 'nickname25', level: '전문' },
    { idx: 26, id: 'id26', name: 'name26', nickname: 'nickname26', level: '전문' },
    { idx: 27, id: 'id27', name: 'name27', nickname: 'nickname27', level: '일반' },
    { idx: 28, id: 'id28', name: 'name28', nickname: 'nickname28', level: '전문' },
    { idx: 29, id: 'id29', name: 'name29', nickname: 'nickname29', level: '전문' },
    { idx: 30, id: 'id30', name: 'name30', nickname: 'nickname30', level: '일반' },
    { idx: 31, id: 'id31', name: 'name31', nickname: 'nickname31', level: '전문' },
    { idx: 32, id: 'id32', name: 'name32', nickname: 'nickname32', level: '전문' },
    { idx: 33, id: 'id33', name: 'name33', nickname: 'nickname33', level: '일반' },
    { idx: 34, id: 'id34', name: 'name34', nickname: 'nickname34', level: '전문' },
    { idx: 35, id: 'id35', name: 'name35', nickname: 'nickname35', level: '전문' },
    { idx: 36, id: 'id36', name: 'name36', nickname: 'nickname36', level: '일반' },
    { idx: 37, id: 'id37', name: 'name37', nickname: 'nickname37', level: '전문' },
    { idx: 38, id: 'id38', name: 'name38', nickname: 'nickname38', level: '전문' },
    { idx: 39, id: 'id39', name: 'name39', nickname: 'nickname39', level: '일반' },
    { idx: 40, id: 'id40', name: 'name40', nickname: 'nickname40', level: '전문' },
    { idx: 41, id: 'id41', name: 'name41', nickname: 'nickname41', level: '전문' },
    { idx: 42, id: 'id42', name: 'name42', nickname: 'nickname42', level: '일반' },
    { idx: 43, id: 'id43', name: 'name43', nickname: 'nickname43', level: '전문' },
    { idx: 44, id: 'id44', name: 'name44', nickname: 'nickname44', level: '전문' },
    { idx: 45, id: 'id45', name: 'name45', nickname: 'nickname45', level: '일반' },
    { idx: 46, id: 'id46', name: 'name46', nickname: 'nickname46', level: '전문' },
    { idx: 47, id: 'id47', name: 'name47', nickname: 'nickname47', level: '전문' },
    { idx: 48, id: 'id48', name: 'name48', nickname: 'nickname48', level: '일반' },
    { idx: 49, id: 'id49', name: 'name49', nickname: 'nickname49', level: '전문' },
    { idx: 50, id: 'id50', name: 'name50', nickname: 'nickname50', level: '전문' },
  ];
  

// 테이블2 데이터
const columns2 = [
    { field: 'id', headerName: '문의 번호', width: 100 },
    { field: 'title', headerName: '문의 제목', width: 220 },
    { field: 'regdate', headerName: '문의 일자', width: 140 },
    { field: 'answer', headerName: '답변 여부', width: 100 }
];

const rows2 = [
    { id: '9', title: '제목', regdate: '2024-01-11', answer: '답변 대기' },
    { id: '8', title: '제목입니다', regdate: '2024-01-10', answer: '답변 대기' },
    { id: '7', title: '제목입니다', regdate: '2024-01-10', answer: '답변 대기' },
    { id: '6', title: '제목입니다', regdate: '2024-01-09', answer: '답변 완료' },
    { id: '5', title: '제목입니다', regdate: '2024-01-09', answer: '답변 완료' },
    { id: '4', title: '제목입니다', regdate: '2024-01-09', answer: '답변 완료' },
    { id: '3', title: '제목입니다', regdate: '2024-01-09', answer: '답변 완료' },
    { id: '2', title: '제목입니다', regdate: '2024-01-09', answer: '답변 완료' },
    { id: '1', title: '제목입니다', regdate: '2024-01-09', answer: '답변 완료' }
];

const paginationModel = { page: 0, pageSize: 5 };

export default function HomePage() {
  return (
    <div className={styles.ad101__container}>
        {/* 그래프 영역 */}
        <div className={styles.ad101__graph}>
            <div className={styles.ad101__graph1}>
                <h2>Graph 1</h2>
            </div>
            <div className={styles.ad101__graph2}>
                <h2>Graph 2</h2>
            </div>
        </div>

        {/* 테이블 영역 */}
        <div className={styles.ad101__table}>
            <div className={styles.ad101__table1}>
                <div className={styles.ad101__table1menu}>
                    <h2 className={styles.ad101__table1title}>회원 관리</h2>
                    {/* Link를 사용하여 페이지 이동 */}
                    <Link href="/ad201">
                        <h4 className={styles.ad101__tablemenu}>더보기
                            <span className="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                        </h4>
                    </Link>
                </div>
                <Paper>
                    <DataGrid
                        rows={rows1}
                        columns={columns1}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        sx={{
                            '& .MuiDataGrid-cell': {
                                textAlign: 'center', // 모든 셀을 가운데 정렬
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                textAlign: 'center', // 헤더도 가운데 정렬
                            },
                            '& .MuiDataGrid-columnHeaderTitleContainer': {
                                textAlign: 'center',
                                justifyContent: 'center',
                            }
                        }}
                    />
                </Paper>
            </div>
            <div className={styles.ad101__table2}>
                <div className={styles.ad101__table2menu}>
                    <h2 className={styles.ad101__table2title}>문의 내역</h2>
                    {/* Link를 사용하여 페이지 이동 */}
                    <Link href="/ad704">
                        <h4 className={styles.ad101__tablemenu} style={{ fontSize: '16px' }}>더보기
                            <span className="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                        </h4>
                    </Link>
                </div>
                <Paper>
                    <DataGrid
                        rows={rows2}
                        columns={columns2}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        sx={{
                            '& .MuiDataGrid-cell': {
                                textAlign: 'center', // 모든 셀을 가운데 정렬
                            },
                            '& .MuiDataGrid-columnHeader': {
                                textAlign: 'center', // 헤더도 가운데 정렬
                                justifyContent: 'center',
                                display: 'flex',
                            },
                            '& .MuiDataGrid-columnHeaderTitleContainer': {
                                textAlign: 'center',
                                justifyContent: 'center',
                            }
                        }}
                    />
                </Paper>
            </div>
        </div>

        {/* 알림 아이콘 */}
        <div className={styles.ad101__notification}>
            <div className={styles.ad101__notificationicon}>
                <span className={`${styles.ad101__notificationicon} material-symbols-outlined`}>
                    notifications
                </span>
                <div className={styles.ad101__notificationbadge1}>1</div>
            </div>
  
            <div className={styles.ad101__notificationicon}>
                <span className={`${styles.ad101__notificationicon} material-symbols-outlined`}>
                    notifications
                </span>
                <div className={styles.ad101__notificationbadge2}>5</div>
            </div>

            <div className={styles.ad101__notificationicon}>
                <span className={`${styles.ad101__notificationicon} material-symbols-outlined`}>
                    notifications
                </span>
                <div className={styles.ad101__notificationbadge3}>9+</div>
            </div>
        </div>
    </div>
  );
}
