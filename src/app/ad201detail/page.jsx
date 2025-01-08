'use client'; 

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';  
import { useEffect, useState } from 'react';
import styles from '../styles/ad201detail.module.css';

function Page() {
  const router = useRouter();  
  const { query, isReady } = router;
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
  const [error, setError] = useState(null);  // 오류 상태 추가

  const user_idx = isReady && query.user_idx ? parseInt(query.user_idx, 10) : null;

  // user_idx가 비어있을 경우 로딩을 멈추고 처리할 수 있도록 개선
  useEffect(() => {
    if (user_idx === null) {
      console.log('user_idx가 아직 설정되지 않았습니다.');
      return;
    }

    const fetchUserDetails = async () => {
      setLoading(true);
      setError(null);  // 에러 초기화

      try {
        console.log(`Fetching data for user_idx: ${user_idx}`);  // fetch 요청 전에 로그 출력

        const response = await fetch(`http://localhost:8080/api/user_info/detail/${user_idx}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API response:', data);  // API 응답 데이터 확인용 로그

        if (data.success) {
          setUserDetails(data.data);
        } else {
          setError('사용자 정보 조회 실패');
        }
      } catch (error) {
        console.error('사용자 정보 로딩 실패:', error);
        setError('사용자 정보를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user_idx]);  // user_idx 값이 바뀔 때마다 실행

  // 로딩 상태나 오류 처리
  if (!isReady || loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;  // 오류 메시지 표시
  }

  if (!user_idx) {
    return <div>잘못된 접근입니다.</div>;
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
            onClick={() => router.back()}  // 뒤로 가기
          >
            뒤로가기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
