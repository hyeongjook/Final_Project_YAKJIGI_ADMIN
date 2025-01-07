'use client'; // 클라이언트 사이드에서만 실행

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // 클라이언트 사이드에서만 사용 가능
import styles from '../styles/ad201detail.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Page() {
  const router = useRouter();
  const { query, isReady } = router; // query와 isReady를 가져옵니다.
  const [userDetails, setUserDetails] = useState({
    user_id: '',
    user_name: '',
    user_email: '',
    user_phone: '',
    user_nickname: '',
    user_gender: '',
    user_birth_date: '',
    user_reg_date: '',
  });
  const [loading, setLoading] = useState(false);

  // isReady가 true일 때만 user_idx 사용
  const user_idx = isReady && query.user_idx ? parseInt(query.user_idx, 10) : null;

  // user_idx가 준비되었을 때만 데이터를 로딩하도록 useEffect 사용
  useEffect(() => {
    if (user_idx) {
      const fetchUserDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:8080/api/user_info/detail/${user_idx}`);
          const data = await response.json();

          if (data.success) {
            setUserDetails(data.data);
          } else {
            alert('사용자 정보 조회 실패');
          }
        } catch (error) {
          console.error('사용자 정보 로딩 실패:', error);
          alert('사용자 정보를 가져오는 데 실패했습니다.');
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    }
  }, [user_idx]); // user_idx가 변경될 때마다 실행

  if (!isReady) {
    return <div>로딩 중...</div>; // 라우터가 준비되지 않았을 때 로딩 상태 표시
  }

  if (loading) {
    return <div>로딩 중...</div>; // 데이터를 로딩 중일 때 로딩 상태 표시
  }

  if (!user_idx) {
    return <div>잘못된 접근입니다.</div>; // user_idx가 없을 경우 표시
  }

  return (
    <div className={styles.ad201_detail__main_background_color}>
      <div className={styles.ad201_detail__main_container}>
        <p className={styles.ad201_detail__main_name}>회원 관리</p>
        <div className={styles.ad201_detail__main_cotainer_box}>
          <div className={styles.ad201_detail__main_title}>ID</div>
          <div className={styles.ad201_detail__box}>
            <TextField
              fullWidth
              label="ID"
              value={userDetails.user_id}
              disabled
              id="user_id"
            />
          </div>
        </div>

        {/* 다른 필드들... */}

        <div className={styles.ad201_detail__button_box}>
          <Button
            variant="outlined"
            size="medium"
            sx={{
              backgroundColor: 'white',
              color: '#9e9e9e',
              border: '1px solid #9e9e9e',
              '&:hover': {
                backgroundColor: 'secondary.main',
                color: 'white',
                border: '1px solid #9e9e9e',
              },
            }}
            onClick={() => router.back()} // 뒤로 가기
          >
            뒤로가기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
