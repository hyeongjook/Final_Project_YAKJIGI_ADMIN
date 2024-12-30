import { connect } from '../../utils/db.connection';
import { NextResponse } from 'next/server';

// 모든 사용자 데이터를 가져오는 GET 요청
export async function GET() {
  try {
    const connection = await connect(); // DB 연결
    const [rows] = await connection.execute('SELECT * FROM user_db.user_info_tbl'); // 모든 사용자 데이터 가져오기

    console.log('받아온 데이터:', rows); // 서버에서 받은 데이터 확인

    return NextResponse.json(rows); // 모든 사용자 데이터 반환
  } catch (error) {
    console.error('DB 조회 중 오류 발생:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

// 특정 사용자 데이터를 가져오는 GET 요청 (optional, 세부정보 페이지에서 사용할 수 있음)
export async function GET_USER_DETAILS(request) {
  const { id } = request.query;

  if (!id) {
    return NextResponse.json({ error: '사용자 ID가 없습니다.' }, { status: 400 });
  }

  try {
    const connection = await connect(); // DB 연결
    const [rows] = await connection.execute('SELECT * FROM user_db.user_info_tbl WHERE user_idx = ?', [id]); // 특정 사용자 데이터 가져오기

    if (rows.length === 0) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(rows[0]); // 특정 사용자 데이터 반환
  } catch (error) {
    console.error('DB 조회 중 오류 발생:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}