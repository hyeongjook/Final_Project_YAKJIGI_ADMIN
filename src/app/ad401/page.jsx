'use client';

import React, { useState } from 'react';
import styles from '../styles/ad401.module.css';
import adcommons from "../styles/adcommons.module.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Page(props) {
    // 기본 텍스트들 (기존 텍스트를 여기에 삽입)
    const defaultMainTitle = '의약품의 정의';
    const defaultContent = `의약품은 인간의 질병을 예방하고 치료하며 건강을 증진하기 위해 사용하는 화학적, 생물학적 물질입니다. 우리 일상에서 없어서는 안 될 중요한 역할을 하며, 의료 기술의 발전과 함께 의약품의 중요성은 더욱 커지고 있습니다. 의약품은 크게 전문의약품과 일반의약품으로 구분되며, 전문의약품은 의사의 처방을 통해 사용할 수 있고 일반의약품은 약국에서 바로 구매할 수 있는 형태입니다. 또한, 현대에는 생물학적 제제, 유전자 치료제 등 첨단 바이오 기술을 활용한 의약품도 활발히 개발되고 있습니다. 이러한 의약품의 발전은 많은 사람의 생명을 구하며, 우리의 삶의 질을 높이는 데 기여하고 있습니다. 대한민국에서도 의약품과 관련된 다양한 제도와 법률이 제정되어 국민의 건강을 보호하고 있습니다. 의약품은 단순히 약으로서의 역할을 넘어, 국가의 공공보건과 경제에도 중요한 영향을 미치는 요소로 자리 잡고 있습니다. 이제는 단순한 질병 치료에서 나아가 예방의 중요성이 강조되며, 개인 맞춤형 의약품의 개발도 주목받고 있습니다. 이러한 변화는 인간의 삶의 질을 향상시키는 데 결정적인 기여를 하고 있습니다. 대한민국에서도 의약품과 관련된 중요한 연도들이 있으며, 이를 통해 의약품 제도와 산업이 어떻게 발전했는지 살펴볼 수 있습니다.`;

    const defaultSub1Title = '1953년 약사법 제정';
    const defaultSub1Content = `약사법은 의약품의 제조, 유통, 판매에 대한 기준과 규정을 명확히 하여 의약품 안전성을 높이고 국민의 건강을 보호하기 위한 기틀을 마련하였습니다. 이 법은 현재까지도 개정과 보완을 통해 발전하고 있습니다.`;

    const defaultSub2Title = '1963년 식품의약품안전처 전신 설립';
    const defaultSub2Content = `의약품의 안전성과 효과를 검증하기 위해 "약정국"이 설립되었습니다. 이는 현재의 식품의약품안전처로 발전하여, 의약품뿐만 아니라 식품과 화장품의 안전 관리까지 맡고 있습니다. 당시의 약정국 설립은 의약품 관리의 현대적 체계를 도입한 중요한 계기가 되었습니다.`;

    const defaultSub3Title = '1989년 의약분업 시범 사업 시작';
    const defaultSub3Content = `의약분업은 의사와 약사의 역할을 분리하여 환자가 보다 안전하고 효과적으로 의약품을 사용할 수 있도록 하는 제도입니다. 1989년에 시범 사업으로 처음 도입되었으며, 이후 국민의 의료 서비스 질 향상에 크게 기여하였습니다.`;

    // 기본 서브4 텍스트들 추가
    const defaultSub4Title = '2000년 의약분업 제도 전면 시행';
    const defaultSub4Content = `1989년의 시범 사업 이후, 2000년에는 의약분업 제도가 전국적으로 전면 시행되었습니다. 이를 통해 의사는 진단과 처방을, 약사는 조제를 담당하게 되었으며, 의약품의 오남용을 방지하고 국민 건강을 증진시키는 중요한 기반이 되었습니다.`;

    // "도심 공원에서 만나는 자연과 지속가능성" 텍스트 및 연도
    const defaultParkTitle = '도심 공원에서 만나는 자연과 지속가능성';
    const defaultYear1 = '1953년';
    const defaultYear2 = '1963년';
    const defaultYear3 = '1989년';
    const defaultYear4 = '2000년';

    const [mainTitle, setMainTitle] = useState(defaultMainTitle);
    const [content, setContent] = useState(defaultContent);
    const [sub1Title, setSub1Title] = useState(defaultSub1Title);
    const [sub1Content, setSub1Content] = useState(defaultSub1Content);
    const [sub2Title, setSub2Title] = useState(defaultSub2Title);
    const [sub2Content, setSub2Content] = useState(defaultSub2Content);
    const [sub3Title, setSub3Title] = useState(defaultSub3Title);
    const [sub3Content, setSub3Content] = useState(defaultSub3Content);
    const [sub4Title, setSub4Title] = useState(defaultSub4Title);
    const [sub4Content, setSub4Content] = useState(defaultSub4Content);

    // 새로운 상태 변수들 (도심 공원 텍스트와 연도들)
    const [parkTitle, setParkTitle] = useState(defaultParkTitle);
    const [year1, setYear1] = useState(defaultYear1);
    const [year2, setYear2] = useState(defaultYear2);
    const [year3, setYear3] = useState(defaultYear3);
    const [year4, setYear4] = useState(defaultYear4);

    const handleSaveData = () => {
        // 데이터를 로컬 저장소에 저장
        localStorage.setItem('mainTitle', mainTitle);
        localStorage.setItem('content', content);
        localStorage.setItem('sub1Title', sub1Title);
        localStorage.setItem('sub1Content', sub1Content);
        localStorage.setItem('sub2Title', sub2Title);
        localStorage.setItem('sub2Content', sub2Content);
        localStorage.setItem('sub3Title', sub3Title);
        localStorage.setItem('sub3Content', sub3Content);
        localStorage.setItem('sub4Title', sub4Title);
        localStorage.setItem('sub4Content', sub4Content);
        
        // 도심 공원 텍스트와 연도들도 로컬 저장소에 저장
        localStorage.setItem('parkTitle', parkTitle);
        localStorage.setItem('year1', year1);
        localStorage.setItem('year2', year2);
        localStorage.setItem('year3', year3);
        localStorage.setItem('year4', year4);

        alert('데이터가 로컬 저장소에 저장되었습니다.');
    };

    return (
        <div className={adcommons.adcommons__main_background_color}>
            <div className={adcommons.adcommons__main_container}>
                <p className={adcommons.adcommons__main_name}>의약품 정의</p>

                {/* 메인 타이틀 */}
                <div className={adcommons.adcommons__main_container_box}>
                    <div className={adcommons.adcommons__main_title}>메인 타이틀</div>
                    <div className={adcommons.adcommons__box}>
                        <TextField
                            fullWidth
                            label="메인 타이틀"
                            value={mainTitle}
                            onChange={(e) => setMainTitle(e.target.value)}
                        />
                    </div>
                </div>
                {/* 도심 공원에서 만나는 자연과 지속가능성 타이틀 수정 */}
                <div className={adcommons.adcommons__main_container_box}>
                    <div className={adcommons.adcommons__main_title}>서브 타이틀</div>
                    <div className={adcommons.adcommons__box}>
                        <TextField
                            fullWidth
                            label="서브타이틀"
                            value={parkTitle}
                            onChange={(e) => setParkTitle(e.target.value)}
                        />
                    </div>
                </div>
                {/* 메인 내용 */}
                <div className={adcommons.adcommons__main_content_textarea}>
                    <div className={adcommons.adcommons__main_content}>1번 내용</div>
                    <div className={adcommons.adcommons__box}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="내용"
                            multiline
                            maxRows={4}
                            rows={4}
                            fullWidth
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>

                {/* 연도 수정 */}
                <div className={adcommons.adcommons__sub1_container_box}>
                    <div className={adcommons.adcommons__sub1_title}>1번 연도 수정</div>
                    <div className={adcommons.adcommons__box}>
                        <TextField
                            fullWidth
                            label="연도"
                            value={year1}
                            onChange={(e) => setYear1(e.target.value)}
                        />
                    </div>
                </div>

                {/* 서브1 타이틀 */}
                <div className={adcommons.adcommons__sub1_container_box}>
                    <div className={adcommons.adcommons__sub1_title}>서브1 타이틀</div>
                    <div className={adcommons.adcommons__box}>
                        <TextField
                            fullWidth
                            label="서브1 타이틀"
                            value={sub1Title}
                            onChange={(e) => setSub1Title(e.target.value)}
                        />
                    </div>
                </div>

                {/* 서브1 내용 */}
                <div className={adcommons.adcommons__sub1_content_textarea}>
                    <div className={adcommons.adcommons__sub1_content}>내용</div>
                    <div className={adcommons.adcommons__box}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="내용"
                            multiline
                            maxRows={4}
                            rows={4}
                            fullWidth
                            value={sub1Content}
                            onChange={(e) => setSub1Content(e.target.value)}
                        />
                    </div>
                </div>


                {/* 연도 수정 */}
                <div className={adcommons.adcommons__sub1_container_box}>
                    <div className={adcommons.adcommons__sub1_title}>2번 연도 수정</div>
                    <div className={adcommons.adcommons__box}>
                        <TextField
                            fullWidth
                            label="2 연도"
                            value={year2}
                            onChange={(e) => setYear2(e.target.value)}
                        />
                    </div>
                </div>

                {/* 서브2 타이틀 */}
                <div className={adcommons.adcommons__sub2_container_box}>
                    <div className={adcommons.adcommons__sub2_title}>서브2 타이틀</div>
                    <div className={adcommons.adcommons__box}>
                        <TextField
                            fullWidth
                            label="서브2 타이틀"
                            value={sub2Title}
                            onChange={(e) => setSub2Title(e.target.value)}
                        />
                    </div>
                </div>

                {/* 서브2 내용 */}
                <div className={adcommons.adcommons__sub2_content_textarea}>
                    <div className={adcommons.adcommons__sub2_content}>2번 내용</div>
                    <div className={adcommons.adcommons__box}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="내용"
                            multiline
                            maxRows={4}
                            rows={4}
                            fullWidth
                            value={sub2Content}
                            onChange={(e) => setSub2Content(e.target.value)}
                        />
                    </div>
                </div>
                {/* 연도 수정 */}
                <div className={adcommons.adcommons__sub1_container_box}>
                    <div className={adcommons.adcommons__sub1_title}>3번 연도 수정</div>
                    <div className={adcommons.adcommons__box}>
                        <TextField
                            fullWidth
                            label="3 연도"
                            value={year3}
                            onChange={(e) => setYear3(e.target.value)}
                        />
                    </div>
                </div>
                {/* 서브3 타이틀 */}
                <div className={adcommons.adcommons__sub3_container_box}>
                    <div className={adcommons.adcommons__sub3_title}>서브3 타이틀</div>
                    <div className={adcommons.adcommons__box}>
                        <TextField
                            fullWidth
                            label="서브3 타이틀"
                            value={sub3Title}
                            onChange={(e) => setSub3Title(e.target.value)}
                        />
                    </div>
                </div>

                {/* 서브3 내용 */}
                <div className={adcommons.adcommons__sub3_content_textarea}>
                    <div className={adcommons.adcommons__sub3_content}>3번 내용</div>
                    <div className={adcommons.adcommons__box}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="내용"
                            multiline
                            maxRows={4}
                            rows={4}
                            fullWidth
                            value={sub3Content}
                            onChange={(e) => setSub3Content(e.target.value)}
                        />
                    </div>
                </div>

                {/* 연도 수정 */}
                <div className={adcommons.adcommons__sub1_container_box}>
                    <div className={adcommons.adcommons__sub1_title}>4번 연도 수정</div>
                    <div className={adcommons.adcommons__box}>
                        <TextField
                            fullWidth
                            label="4 연도"
                            value={year4}
                            onChange={(e) => setYear4(e.target.value)}
                        />
                    </div>
                </div>

                {/* 서브4 타이틀 */}
                <div className={adcommons.adcommons__sub1_container_box}>
                    <div className={adcommons.adcommons__sub1_title}>서브4 타이틀</div>
                    <div className={adcommons.adcommons__box}>
                        <TextField
                            fullWidth
                            label="서브4 타이틀"
                            value={sub4Title}
                            onChange={(e) => setSub4Title(e.target.value)}
                        />
                    </div>
                </div>

                {/* 서브4 내용 */}
                <div className={adcommons.adcommons__sub1_content_textarea}>
                    <div className={adcommons.adcommons__sub1_content}>4번 내용</div>
                    <div className={adcommons.adcommons__box}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="내용"
                            multiline
                            maxRows={4}
                            rows={4}
                            fullWidth
                            value={sub4Content}
                            onChange={(e) => setSub4Content(e.target.value)}
                        />
                    </div>
                </div>

                {/* 저장 버튼 */}
                <div className={adcommons.adcommons__button_box}>
                    <Button
                        variant="outlined"
                        size="medium"
                        onClick={handleSaveData}
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
                </div>
            </div>
        </div>
    );
}

export default Page;
