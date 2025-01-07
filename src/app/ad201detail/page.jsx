'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/ad201detail.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Page() {
  const router = useRouter();
  const { query, isReady } = router;  // query와 isReady 가져오기
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
  const [loading, setLoading] = useState(false); // 로딩 상태

  // query가 준비되었을 때만 user_idx 추출
  const user_idx = isReady ? query.user_idx : null;

  // 사용자 정보 가져오기 (백엔드 연동)
  useEffect(() => {
    if (user_idx) {
      const fetchUserDetails = async () => {
        setLoading(true); // 로딩 시작
        try {
          const response = await fetch(`http://localhost:8080/api/user_info/detail/${user_idx}`);
          const data = await response.json();

          if (data.success) {
            setUserDetails(data.data);  // 받아온 데이터로 상태 업데이트
          } else {
            alert('사용자 정보 조회 실패');
          }
        } catch (error) {
          console.error('사용자 정보 로딩 실패:', error);
          alert('사용자 정보를 가져오는 데 실패했습니다.');
        } finally {
          setLoading(false); // 로딩 종료
        }
      };

      fetchUserDetails();
    }
  }, [user_idx]); // user_idx가 있을 때만 호출

  // 로딩 중이면 로딩 표시
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // user_idx가 없으면 잘못된 URL로 들어왔을 경우 처리
  if (!user_idx) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <div className={styles.ad201_detail__main_background_color}>
      <div className={styles.ad201_detail__main_container}>
        <p className={styles.ad201_detail__main_name}>회원 관리</p>

        {/* 사용자 정보 표시 */}
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

        <div className={styles.ad201_detail__sub1_cotainer_box}>
          <div className={styles.ad201_detail__sub1_title}>Name</div>
          <div className={styles.ad201_detail__box}>
            <TextField
              fullWidth
              label="Name"
              value={userDetails.user_name}
              disabled
              id="user_name"
            />
          </div>
        </div>

        <div className={styles.ad201_detail__sub1_cotainer_box}>
          <div className={styles.ad201_detail__sub1_title}>Email</div>
          <div className={styles.ad201_detail__box}>
            <TextField
              fullWidth
              label="Email"
              value={userDetails.user_email}
              disabled
              id="user_email"
            />
          </div>
        </div>

        <div className={styles.ad201_detail__sub1_cotainer_box}>
          <div className={styles.ad201_detail__sub1_title}>Phone</div>
          <div className={styles.ad201_detail__box}>
            <TextField
              fullWidth
              label="Phone"
              value={userDetails.user_phone}
              disabled
              id="user_phone"
            />
          </div>
        </div>

        <div className={styles.ad201_detail__sub1_cotainer_box}>
          <div className={styles.ad201_detail__sub1_title}>Nickname</div>
          <div className={styles.ad201_detail__box}>
            <TextField
              fullWidth
              label="Nickname"
              value={userDetails.user_nickname}
              disabled
              id="user_nickname"
            />
          </div>
        </div>

        <div className={styles.ad201_detail__sub1_cotainer_box}>
          <div className={styles.ad201_detail__sub1_title}>Gender</div>
          <div className={styles.ad201_detail__box}>
            <TextField
              fullWidth
              label="Gender"
              value={userDetails.user_gender}
              disabled
              id="user_gender"
            />
          </div>
        </div>

        <div className={styles.ad201_detail__sub1_cotainer_box}>
          <div className={styles.ad201_detail__sub1_title}>Birth Date</div>
          <div className={styles.ad201_detail__box}>
            <TextField
              fullWidth
              label="Birth Date"
              value={userDetails.user_birth_date}
              disabled
              id="user_birth_date"
            />
          </div>
        </div>

        <div className={styles.ad201_detail__sub1_cotainer_box}>
          <div className={styles.ad201_detail__sub1_title}>Registration Date</div>
          <div className={styles.ad201_detail__box}>
            <TextField
              fullWidth
              label="Registration Date"
              value={userDetails.user_reg_date}
              disabled
              id="user_reg_date"
            />
          </div>
        </div>

        {/* 뒤로 가기 버튼 */}
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
            onClick={() => router.back()} // 취소 버튼은 이전 페이지로 돌아가기
          >
            뒤로가기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
