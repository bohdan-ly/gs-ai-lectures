import { useState } from 'react';
import Layout from './components/Layout';
import './styles/MaterialsPage.css';

const viewTypes = {
  GRID: 'grid',
  LIST: 'list',
};

function MaterialsPage() {
  const [view, setView] = useState(viewTypes.GRID);

  const switchLayout = (view) => {
    setView(view);
  };

  return (
    <Layout listView={view === viewTypes.LIST} switchLayout={switchLayout} viewTypes={viewTypes} />
  );
}

export default MaterialsPage;
