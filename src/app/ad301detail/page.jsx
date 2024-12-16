"use client";
import React, { useState } from "react";
import styles from "../styles/ad301detail.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import adcommons from "../styles/adcommons.module.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Page(props) {
  // 각 파일에 대한 상태를 별도로 관리
  const [fileName1, setFileName1] = useState(""); 
  const [filePreview1, setFilePreview1] = useState(null); 

  // 파일 선택 시 상태 업데이트 함수
  const handleFileChange = (event, setFileName, setFilePreview) => {
    const file = event.target.files[0]; // 첫 번째 파일 선택
    if (file) {
      setFileName(file.name); // 파일 이름을 상태에 저장
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result); // 이미지 미리보기 업데이트
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 읽어들여 이미지 미리보기
    }
  };

  const [authority, setAuthority] = React.useState('');

  const handleChange = (e) => {
    setAuthority(e.target.value);
  };

  return (
    <>
      <div className={adcommons.adcommons__main_background_color}>
        <div className={adcommons.adcommons__main_container}>
          <p className={adcommons.adcommons__main_name}>관리자 상세보기</p>
          <div className={adcommons.adcommons__main_container_box}>
            <div className={adcommons.adcommons__main_title}>아이디</div>
            <div className={adcommons.adcommons__box}>
              <TextField fullWidth label="닉네임" id="fullWidth" />
            </div>
          </div>

          <div className={adcommons.adcommons__sub1_container_box}>
            <div className={adcommons.adcommons__sub1_title}>이름</div>
            <div className={adcommons.adcommons__box}>
              <TextField fullWidth label="이름" id="fullWidth" />
            </div>
          </div>

          <div className={adcommons.adcommons__sub1_container_box}>
            <div className={adcommons.adcommons__sub1_title}>이메일</div>
            <div className={adcommons.adcommons__box}>
              <TextField fullWidth label="이메일" id="fullWidth" />
            </div>
          </div>

          {/* 페이지 권한이 부여된 항목 표시 select */}
          <div className={adcommons.adcommons__sub1_container_box}>
            <div className={adcommons.adcommons__sub1_title}>권한</div>
            <div className={adcommons.adcommons__box}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">authority</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={authority}
                  onChange={handleChange}
                  label="권한"
                >
                  <MenuItem value="">
                    <em>없음</em>
                  </MenuItem>
                  <MenuItem value={10}>회원</MenuItem>
                  <MenuItem value={20}>페이지</MenuItem>
                  <MenuItem value={30}>커뮤니티</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          {/* 이미지 */}
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
                  onChange={(e) => handleFileChange(e, setFileName1, setFilePreview1)} // 첨부파일 상태 업데이트 및 미리보기
                />
              </div>
            </div>
          </div>

          <div className={adcommons.adcommons__button_box}>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                backgroundColor: "white",
                color: "#9e9e9e",
                border: "1px solid #9e9e9e",
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
                color: "#9e9e9e",
                border: "1px solid #9e9e9e",
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