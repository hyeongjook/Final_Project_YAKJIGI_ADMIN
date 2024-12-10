'use client';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import styles from '../styles/ad101.css';


// 테이블1 데이터
const columns1 = [
    { field: 'idx', headerName: '회원번호', width: 90 },
    { field: 'id', headerName: '아이디', width: 130 },
    { field: 'name', headerName: '이름', width: 80 },
    { field: 'nickname', headerName: '닉네임', width: 150 },
    { field: 'level', headerName: '등급', sortable: false, width: 120 },
];

const rows1 = [
    { idx: '1', id: 'dsfsd', name: 'hong', nickname: 'nickname', level: '일반' },
    { idx: '2', id: 'safw', name: 'hong', nickname: 'nickname', level: '일반' },
    { idx: '3', id: 'wqerwe', name: 'hong', nickname: 'nickname', level: '일반' },
    { idx: '4', id: 'sdfhh', name: 'hong', nickname: 'nickname', level: '일반' },
    { idx: '5', id: 'sdfy', name: 'hong', nickname: 'nickname', level: '일반' },
    { idx: '6', id: 'gfds', name: 'hong', nickname: 'nickname', level: '일반' },
    { idx: '7', id: 'sfsew', name: 'hong', nickname: 'nickname', level: '일반' },
    { idx: '8', id: 'as23', name: 'hong', nickname: 'nickname', level: '일반' },
    { idx: '9', id: 'df33', name: 'hong', nickname: 'nickname', level: '일반' },
];

// 테이블2 데이터
const columns2 = [
    { field: 'id', headerName: '문의 번호', width: 100 },
    { field: 'title', headerName: '문의 제목', width: 220 },
    { field: 'regdate', headerName: '문의 일자', width: 140 },
    { field: 'answer', headerName: '답변 여부', width: 100 },
];

const rows2 = [
    { id: '1', title: '제목입니다.', regdate: '2024.00.00', answer: '답변 대기' },
    { id: '2', title: '제목입니다', regdate: '2024.00.00', answer: '답변 대기' },
    { id: '3', title: '제목입니다', regdate: '2024.00.00', answer: '답변 대기' },
    { id: '4', title: '제목입니다', regdate: '2024.00.00', answer: '답변 대기' },
    { id: '5', title: '제목입니다', regdate: '2024.00.00', answer: '답변 완료' },
    { id: '6', title: '제목입니다', regdate: '2024.00.00', answer: '답변 완료' },
    { id: '7', title: '제목입니다', regdate: '2024.00.00', answer: '답변 완료' },
    { id: '8', title: '제목입니다', regdate: '2024.00.00', answer: '답변 완료' },
    { id: '9', title: '제목입니다', regdate: '2024.00.00', answer: '답변 완료' },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function Page() {
    return (
        <></>
    );
}