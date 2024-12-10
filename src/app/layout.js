import '../app/globals.css'; // 전역 스타일 (필요시)
import Adheader from './components/Adheader';
import Adfooter from './components/Adfooter';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body>
          <Adheader />
          {children}
      </body>
    </html>
  );
}

