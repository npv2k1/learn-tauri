import AppLayout from '@/components/AppLayout';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </>
  );
};

export default Root;
