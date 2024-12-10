import '../app/globals.css'; // 전역 스타일 (필요시)
import AdminHeader from './components/AdminHeader';
import AdminFooter from './components/AdminFooter';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body>
          <AdminHeader />
          {children}
          <AdminFooter />
      </body>
    </html>
  );
}

