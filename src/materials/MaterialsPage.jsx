import React from 'react';
import './styles/MaterialsPage.css';
import Layout from './components/Layout';
import { useState } from 'react';

function MaterialsPage() {
  const [listView, setListView] = useState(false);

  const listLayoutHandler = () => {
    setListView(true);
  };

  const gridLayoutHandler = () => {
    setListView(false);
  };

  return (
    <>
      <Layout
        listView={listView}
        listLayoutHandler={listLayoutHandler}
        gridLayoutHandler={gridLayoutHandler}
      />
    </>
  );
}

export default MaterialsPage;
