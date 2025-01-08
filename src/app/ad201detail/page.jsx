'use client';

import React, { useEffect, useState } from "react";
import adcommons from "../styles/adcommons.module.css";
import styles from "../styles/ad201detail.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSearchParams } from 'next/navigation';

function Page() {
  const searchParams = useSearchParams();
  const user_idx = searchParams.get("user_idx");  // URL에서 user_idx 값을 가져옴

  const [userDetails, setUserDetails] = useState({
    user_id: '',
    user_name: '',
    user_email: '',
    user_profile: '',  // 프로필 이미지 URL
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fileName1, setFileName1] = useState(""); // 파일 이름
  const [fileContent1, setFileContent1] = useState(""); // 파일 내용
  const [filePreview1, setFilePreview1] = useState(null); // 이미지 미리보기 URL

  // user_idx가 있으면 API 호출
  useEffect(() => {
    if (user_idx) {
      const fetchUserDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`http://localhost:8080/api/user_info/detail/${user_idx}`);
          const data = await response.json();

          if (data.success) {
            setUserDetails(data.data);  // 받아온 사용자 정보 설정
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
    }
  }, [user_idx]);

  // 파일 업로드 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName1(file.name); // 파일 이름 업데이트
      const reader = new FileReader();

      // 파일 타입 확인 (이미지인지 아닌지)
      if (file.type.startsWith("image/")) {
        // 이미지 파일 처리
        reader.onload = (event) => {
          setFilePreview1(event.target.result); // 이미지 미리보기 URL 저장
        };
        reader.readAsDataURL(file); // 이미지 파일을 Data URL로 읽기
      } else {
        // 텍스트 파일 처리
        reader.onload = (event) => {
          setFileContent1(event.target.result); // 텍스트 내용 저장
          setFilePreview1(null); // 이미지 미리보기 초기화
        };
        reader.readAsText(file); // 텍스트 파일 읽기
      }
    }
  };

  // 로딩 상태나 오류 처리
  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className={adcommons.adcommons__main_background_color}>
        <div className={adcommons.adcommons__main_container}>
          <p className={adcommons.adcommons__main_name}>회원 관리</p>

          <div className={adcommons.adcommons__main_container_box}>
            <div className={adcommons.adcommons__main_title}>ID</div>
            <div className={adcommons.adcommons__box}>
              <TextField
                fullWidth
                label="ID"
                value={userDetails.user_id}
                id="user_id"
                disabled
              />
            </div>
          </div>

          <div className={adcommons.adcommons__sub1_container_box}>
            <div className={adcommons.adcommons__sub1_title}>Name</div>
            <div className={adcommons.adcommons__box}>
              <TextField
                fullWidth
                label="Name"
                value={userDetails.user_name}
                id="user_name"
                disabled
              />
            </div>
          </div>

          <div className={adcommons.adcommons__sub1_container_box}>
            <div className={adcommons.adcommons__sub1_title}>이메일</div>
            <div className={adcommons.adcommons__box}>
              <TextField
                fullWidth
                label="이메일"
                value={userDetails.user_email}
                id="user_email"
                disabled
              />
            </div>
          </div>

          {/* 프로필 이미지 */}
          {userDetails.user_profile && (
            <div className={adcommons.adcommons__sub2_container_box}>
              <div className={adcommons.adcommons__sub2_title}>프로필 이미지</div>
              <div className={adcommons.adcommons__box}>
                <div className={adcommons.adcommons__imgbox}>
                  <img
                    src={userDetails.user_profile}
                    alt="프로필 이미지"
                    className={adcommons.adcommons__imagePreview}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 파일 1 (이미지 업로드) */}
          <div className={adcommons.adcommons__sub2_container_box}>
            <div className={adcommons.adcommons__sub2_title}>이미지</div>
            <div className={adcommons.adcommons__box}>
              <div className={adcommons.adcommons__filebox}>
                {/* 이미지 미리보기 영역 */}
                <div className={adcommons.adcommons__imgbox}>
                  {filePreview1 && (
                    <img
                      src={filePreview1}
                      alt="파일 미리보기"
                      className={adcommons.adcommons__imagePreview}
                    />
                  )}
                </div>
                <input
                  className={adcommons.adcommons__uploadName}
                  value={fileName1}
                  placeholder=""
                  readOnly
                />
                <label htmlFor="file1">파일찾기</label>
                <input
                  type="file"
                  id="file1"
                  name="file_name1"
                  onChange={handleFileChange} // 파일1 상태 업데이트 및 미리보기
                />
              </div>
            </div>
          </div>

          <div className={adcommons.adcommons__button_box}>
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
            >
              저장
            </Button>

            <Button
              variant="outlined"
              size="medium"
              sx={{
                marginLeft: "15px",
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
              삭제
            </Button>

            <Button
              variant="outlined"
              size="medium"
              sx={{
                marginLeft: "15px",
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
