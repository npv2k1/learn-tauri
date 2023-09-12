import { Outlet, RouteObject } from 'react-router-dom';
import LearnUseState from './learn-use-state';
import React from 'react';
import { LessionsEnum } from './configs/constants';
import LearnUseEffect from './learn-use-effect';
export const lessionsRouters: RouteObject[] = [
  {
    path: LessionsEnum.LEARN_USE_STATE,
    element: <LearnUseState />,
  },
  {
    path: LessionsEnum.LEARN_USE_EFFECT,
    element: <LearnUseEffect/>
  }
];

const LearnPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col overflow-auto">
      <div>LearnPage</div>
      <Outlet />
    </div>
  );
};

export default LearnPage;
