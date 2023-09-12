import React, { useEffect, useRef, useState } from 'react';
import { open } from '@tauri-apps/api/dialog';
import { readBinaryFile } from '@tauri-apps/api/fs';
import { appConfigDir, dataDir } from '@tauri-apps/api/path';
import { fs, invoke } from '@tauri-apps/api';
import * as cheerio from 'cheerio';
import { ResponseType, fetch } from '@tauri-apps/api/http';
import { getDbStorage, setDbStorage } from '@/utils/db';
import './dictionary.css';
import Search from 'antd/es/input/Search';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
const DictionaryPage = () => {
  const [keywords, setKeywords] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSearch = async () => {
    contentRef.current && (contentRef.current.innerHTML = 'loading');
    const dt = await getDbStorage(keywords);
    console.log('🚀 ~ file: index.tsx:18 ~ handleSearch ~ dt:', dt);
    if (dt && dt !== 'None') {
      contentRef.current && (contentRef.current.innerHTML = dt);
      return;
    }

    const steamUrl = `https://dictionary.cambridge.org/dictionary/english-vietnamese/${keywords}`;
    const html = await fetch<string>(steamUrl, {
      method: 'GET',
      responseType: ResponseType.Text,
    }).then((res) => res.data);
    const $ = cheerio.load(html);
    contentRef.current && (contentRef.current.innerHTML = $('.entry-body').html() || '');
    // localStorage.setItem(keywords, $('.entry-body').html() || '');
    await setDbStorage(keywords, $('.entry-body').html() || '');
  };

  const handleExport = async () => {};

  return (
    <div className="flex flex-1 flex-col space-y-3  p-5 dark:bg-gray-700 dark:text-gray-100">
      <div className="flex flex-row items-center space-x-2">
        <Search
          placeholder="Search..."
          loading={isLoading}
          allowClear
          enterButton
          onChange={(e) => setKeywords(e.target.value)}
          onSearch={handleSearch}
        />

        <Button
          icon={<DownloadOutlined />}
          onClick={handleExport}
          className="cursor-pointer"
        ></Button>
      </div>
      <div
        className="h-full min-h-0 flex-1 overflow-y-auto rounded-md bg-gray-100 p-5 text-left"
        ref={contentRef}
      ></div>
    </div>
  );
};

export default DictionaryPage;
