"use client";
import React, { useState } from "react";
import adcommons from "../styles/adcommons.module.css";
import styles from "../styles/ad201detail.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Page() {
  const [fileName1, setFileName1] = useState(""); // 파일 이름
  const [fileContent1, setFileContent1] = useState(""); // 파일 내용
  const [filePreview1, setFilePreview1] = useState(null); // 이미지 미리보기 URL

  const handleFileChange = (e, setFileName) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // 파일 이름 업데이트
      const reader = new FileReader();

      // 파일 타입 확인 (이미지인지 아닌지)
      if (file.type.startsWith("image/")) {
        // 이미지 파일 처리
        reader.onload = (event) => {
          setFilePreview1(event.target.result); // 이미지 미리보기 URL 저장
          setFileContent1(""); // 텍스트 미리보기 초기화
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

  return (
    <>
      <div className={adcommons.adcommons__main_background_color}>
        <div className={adcommons.adcommons__main_container}>
          <p className={adcommons.adcommons__main_name}>회원 관리</p>

          <div className={adcommons.adcommons__main_container_box}>
            <div className={adcommons.adcommons__main_title}>ID</div>
            <div className={adcommons.adcommons__box}>
              <TextField fullWidth label="ID" id="fullWidth" />
            </div>
          </div>

          <div className={adcommons.adcommons__sub1_container_box}>
            <div className={adcommons.adcommons__sub1_title}>name</div>
            <div className={adcommons.adcommons__box}>
              <TextField fullWidth label="name" id="fullWidth" />
            </div>
          </div>

          <div className={adcommons.adcommons__sub1_container_box}>
            <div className={adcommons.adcommons__sub1_title}>이메일</div>
            <div className={adcommons.adcommons__box}>
              <TextField fullWidth label="이메일" id="fullWidth" />
            </div>
          </div>

          {/* 파일 1 */}
          <div className={adcommons.adcommons__sub2_container_box}>
            <div className={adcommons.adcommons__sub2_title}>이미지</div>
            <div className={adcommons.adcommons__box}>
              <div className={adcommons.adcommons__filebox}>
                {/* 이미지 미리보기 영역 */}
                <div className={adcommons.adcommons__imgbox}>
                  {filePreview1 && (
                    <img src={filePreview1} alt="파일 미리보기" className={adcommons.adcommons__imagePreview} />
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
                  onChange={(e) => handleFileChange(e, setFileName1, setFilePreview1)} // 파일1 상태 업데이트 및 미리보기
                />
              </div>
            </div>
          </div>

          <div className={adcommons.adcommons__button_box}>
            <Button
              variant="outlined"  // 버튼의 기본 스타일을 outlined로 설정 (배경이 투명)
              size="medium"
              sx={{
                backgroundColor: 'white',  // 배경을 흰색으로 설정
                color: '#9e9e9e',  // 글자 색상 #9e9e9e
                border: '1px solid #9e9e9e',  // 보더 색상 #9e9e9e
                '&:hover': {
                  backgroundColor: 'secondary.main',  // hover 시 배경 색상 (secondary 색상)
                  color: 'white',  // hover 시 글자 색상 흰색
                  border: '1px solid #9e9e9e',  // hover 시 보더 색상

                }
              }}
            >
              저장
            </Button>

            <Button
              variant="outlined"  // 버튼의 기본 스타일을 outlined로 설정 (배경이 투명)
              size="medium"
              sx={{
                marginLeft: "15px",
                backgroundColor: 'white',  // 배경을 흰색으로 설정
                color: '#9e9e9e',  // 글자 색상 #9e9e9e
                border: '1px solid #9e9e9e',  // 보더 색상 #9e9e9e
                '&:hover': {
                  backgroundColor: 'secondary.main',  // hover 시 배경 색상 (secondary 색상)
                  color: 'white',  // hover 시 글자 색상 흰색
                  border: '1px solid #9e9e9e',  // hover 시 보더 색상

                }
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