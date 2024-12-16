"use client";
import React, { useState } from "react";
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
      <div className={styles.ad201_detail__main_background_color}>
        <div className={styles.ad201_detail__main_container}>
          <p className={styles.ad201_detail__main_name}>회원 관리</p>

          <div className={styles.ad201_detail__main_cotainer_box}>
            <div className={styles.ad201_detail__main_title}>ID</div>
            <div className={styles.ad201_detail__box}>
              <TextField fullWidth label="ID" id="fullWidth" />
            </div>
          </div>

          <div className={styles.ad201_detail__sub1_cotainer_box}>
            <div className={styles.ad201_detail__sub1_title}>name</div>
            <div className={styles.ad201_detail__box}>
              <TextField fullWidth label="name" id="fullWidth" />
            </div>
          </div>

          <div className={styles.ad201_detail__sub1_cotainer_box}>
            <div className={styles.ad201_detail__sub1_title}>이메일</div>
            <div className={styles.ad201_detail__box}>
              <TextField fullWidth label="이메일" id="fullWidth" />
            </div>
          </div>

            {/* 파일 1 */}
            <div className={styles.ad201_detail__sub2_cotainer_box}>
            <div className={styles.ad201_detail__sub2_title}>첨부파일</div>
            <div className={styles.ad201_detail__box}>
              <div className={styles.ad201_detail__filebox}>
                {/* 이미지 미리보기 영역 */}
                <div className={styles.ad201_detail__imgbox}>
                  {filePreview1 && (
                    <img src={filePreview1} alt="파일 미리보기" className={styles.ad201_detail__imagePreview} />
                  )}
                </div>
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
                  onChange={(e) => handleFileChange(e, setFileName1, setFilePreview1)} // 파일1 상태 업데이트 및 미리보기
                />
              </div>
            </div>
          </div>

          <div className={styles.ad201_detail__button_box}>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                backgroundColor: "white",
                color: "#9C27B0",
                border: "1px solid #9C27B0",
                "&:hover": {
                  backgroundColor: "secondary.main",
                  color: "white",
                  border: "1px solid #9e9e9e",
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
                backgroundColor: "white",
                color: "#9C27B0",
                border: "1px solid #9C27B0",
                "&:hover": {
                  backgroundColor: "secondary.main",
                  color: "white",
                  border: "1px solid #9e9e9e",
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