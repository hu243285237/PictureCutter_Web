import Export from './components/Export';
import Header from './components/Header';
import ImageImport from './components/ImageImport';
import Option from './components/Option';
import Preview from './components/Preview';
import { AppProvider, useAppContext } from './contexts/app';

/**
 * App 内容
 */
function AppContent() {
  const { cutImgsURL } = useAppContext();

  return (
    <>
      {/* 标题 */}
      <Header />
      {/* 导入 */}
      <ImageImport />
      {cutImgsURL.length > 0 && (
        <>
          {/* 选项 */}
          <Option />
          {/* 预览 */}
          <Preview />
          {/* 导出 */}
          <Export />
        </>
      )}
    </>
  );
}

/**
 * App
 */
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
