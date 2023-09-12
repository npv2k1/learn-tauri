import { useReadme } from '@/hooks/useReadme';
import React, { useEffect } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import LessionDoc from '../components/LessionDoc';
import { LessionsEnum } from '../configs/constants';
import Counter from './components/Counter';

const LearnUseState = () => {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-row bg-gray-200">
      <LessionDoc lession={LessionsEnum.LEARN_USE_STATE} />
      <div className="flex flex-1">
        <Counter />
      </div>
    </div>
  );
};

export default LearnUseState;
