'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/ad201detail.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Page() {
  const router = useRouter();
  const { user_idx } = router.query;  // URL 파라미터로 user_idx 받기
  const [userDetails, setUserDetails] = useState({
    user_id: '',
    user_name: '',
    user_email: '',
  });
  const [fileName1, setFileName1] = useState('');  // 파일 이름
  const [fileContent1, setFileContent1] = useState('');  // 파일 내용
  const [filePreview, setFilePreview] = useState(null);  // 이미지 미리보기 URL

  // 사용자 정보 가져오기
  useEffect(() => {
    if (user_idx) {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`/api/users/${user_idx}`);
          const data = await response.json();
          setUserDetails(data);
        } catch (error) {
          console.error('사용자 정보 로딩 실패:', error);
        }
      };

      fetchUserDetails();
    }
  }, [user_idx]);  // user_idx가 있을 때만 호출

  const handleFileChange = (e, setFileName) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // 파일 이름 업데이트
      const reader = new FileReader();

      // 파일 타입 확인 (이미지인지 아닌지)
      if (file.type.startsWith('image/')) {
        // 이미지 파일 처리
        reader.onload = (event) => {
          setFilePreview(event.target.result); // 이미지 미리보기 URL 저장
          setFileContent1(''); // 텍스트 미리보기 초기화
        };
        reader.readAsDataURL(file); // 이미지 파일을 Data URL로 읽기
      } else {
        // 텍스트 파일 처리
        reader.onload = (event) => {
          setFileContent1(event.target.result); // 텍스트 내용 저장
          setFilePreview(null); // 이미지 미리보기 초기화
        };
        reader.readAsText(file); // 텍스트 파일 읽기
      }
    }
  };

  const handleSubmit = async () => {
    // 서버에 사용자 정보 업데이트 및 파일 업로드 요청 보내는 로직 추가
    try {
      const formData = new FormData();
      formData.append('user_id', userDetails.user_id);
      formData.append('user_name', userDetails.user_name);
      formData.append('user_email', userDetails.user_email);
      formData.append('file1', filePreview);  // 파일도 포함하여 전송

      // 파일 업로드 API 호출 (예시)
      const response = await fetch(`/api/updateUser/${user_idx}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('사용자 정보 및 파일이 저장되었습니다.');
      } else {
        alert('정보 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('업로드 실패:', error);
    }
  };

  return (
    <>
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
                id="fullWidth"
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
                onChange={(e) => setUserDetails({ ...userDetails, user_name: e.target.value })}
                id="fullWidth"
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
                onChange={(e) => setUserDetails({ ...userDetails, user_email: e.target.value })}
                id="fullWidth"
              />
            </div>
          </div>

          {/* 파일 미리보기 */}
          <div className={styles.ad201_detail__sub1_content_textarea}>
            <div className={styles.ad201_detail__sub1_content}>첨부파일 미리보기</div>
            <div className={styles.ad201_detail__imgbox}>
              {/* 텍스트 파일 미리보기 */}
              {fileContent1 && (
                <TextField
                  id="outlined-multiline-flexible"
                  label="첨부파일 내용"
                  multiline
                  maxRows={4}
                  rows={4}
                  fullWidth
                  value={fileContent1} // 텍스트 내용 표시
                  InputProps={{
                    readOnly: true, // 읽기 전용
                  }}
                />
              )}
              
              {/* 이미지 파일 미리보기 */}
              {filePreview && (
                <img
                  src={filePreview}
                  alt="첨부 이미지"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    marginTop: '10px',
                  }}
                />
              )}
            </div>
          </div>

          {/* 파일 첨부 */}
          <div className={styles.ad201_detail__sub2_cotainer_box}>
            <div className={styles.ad201_detail__sub2_title}>첨부파일1</div>
            <div className={styles.ad201_detail__box}>
              <div className={styles.ad201_detail__filebox}>
                <input
                  className={styles.ad201_detail__uploadName}
                  value={fileName1}
                  placeholder=""
                  readOnly
                />
                <label htmlFor="file1">파일찾기</label>
                <input
                  type="file"
                  id="file1"
                  name="file_name1"
                  onChange={(e) => handleFileChange(e, setFileName1)} // 파일 읽기
                />
              </div>
            </div>
          </div>

          {/* 버튼 */}
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
              onClick={handleSubmit}
            >
              저장
            </Button>

            <Button
              variant="outlined"
              size="medium"
              sx={{
                marginLeft: '15px',
                backgroundColor: 'white',
                color: '#9e9e9e',
                border: '1px solid #9e9e9e',
                '&:hover': {
                  backgroundColor: 'secondary.main',
                  color: 'white',
                  border: '1px solid #9e9e9e',
                },
              }}
            >
              취소
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
