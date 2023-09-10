import React, { PropsWithChildren } from 'react';

import { createLayout } from '@/utils';

import Header from './Header';

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-screen  flex-col">
      {/* <Header /> */}
      <main className="overscroll-y-scroll flex h-full min-h-0 flex-1">{children}</main>
    </div>
  );
};

export default AppLayout;

export const getAppLayout = createLayout(AppLayout);
