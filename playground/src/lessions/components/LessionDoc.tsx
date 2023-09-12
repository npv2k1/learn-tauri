import React, { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { lessionsDocs } from '../docs';
import remarkGfm from 'remark-gfm';

export type LessionDocProps = {
  lession: keyof typeof lessionsDocs;
};

const LessionDoc = ({ lession }: LessionDocProps) => {
  const [docs, setDocs] = useState<string>('');

  useEffect(() => {
    const _doc = lessionsDocs[lession];
    fetch(_doc as string)
      .then((response) => response.text())
      .then((text) => setDocs(text));
  }, []);
  return (
    <article className="prose max-w-lg overflow-y-auto p-5 lg:prose-xl">
      <ReactMarkdown children={docs} remarkPlugins={[remarkGfm]} />
    </article>
  );
};

export default LessionDoc;
