import { connect } from '../../utils/db.connection';
import { NextResponse } from 'next/server';

// 모든 사용자 가져오는 GET 요청
export async function GET() {
  try {
    const connection = await connect(); // DB 연결
    const [rows] = await connection.execute('SELECT * FROM ictedu_db.test_tbl'); // 데이터 가져오기
    return NextResponse.json(rows); // 데이터 반환
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

// 사용자를 삭제하는 DELETE 요청
export async function DELETE(request) {
  try {
    const { user_idx } = await request.json(); // 요청 본문에서 user_idx 받기

    if (!user_idx || user_idx.length === 0) {
      return NextResponse.json({ error: '삭제할 ID가 없습니다.' }, { status: 400 });
    }

    const connection = await connect(); // DB 연결
    console.log('DB 연결 성공');

    // 트랜잭션 시작
    await connection.beginTransaction();

    // 사용자 삭제 쿼리 (user_idx 배열의 값들을 'IN' 조건으로 처리)
    const deleteQuery = 'DELETE FROM ictedu_db.test_tbl WHERE user_idx IN (?)';
    console.log('실행될 쿼리:', deleteQuery, 'user_idx:', user_idx); 
    const [result] = await connection.execute(deleteQuery, [user_idx]);

    console.log('삭제 결과:', result); // 삭제 결과 확인

    // 트랜잭션 커밋
    await connection.commit();
    console.log('트랜잭션 커밋 완료');
    connection.end(); // DB 연결 종료

    return NextResponse.json({ message: '사용자가 삭제되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('삭제 중 오류 발생:', error.message); // 에러 메시지 출력
    console.error('삭제 중 오류 발생 스택:', error.stack); // 에러 스택 트레이스 출력
    return NextResponse.json({ error: 'DB 삭제 실패' }, { status: 500 });
  }
}