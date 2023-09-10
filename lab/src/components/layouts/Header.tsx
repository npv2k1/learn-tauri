import React, { useContext } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

import { ThemeMode } from '@/common/constants';
import { AppContext } from '@/contexts/AppContext';

const Header = () => {
  const { theme, toggleTheme } = useContext(AppContext);
  return (
    <div className="flex h-12 flex-row items-center bg-gray-100 px-5 py-1 dark:bg-gray-800 dark:text-gray-100">
      <div className="flex-1"></div>
      <div className="flex flex-row items-center space-x-3 ">
        <div onClick={toggleTheme} className="cursor-pointer dark:text-white">
          {theme === ThemeMode.LIGHT ? (
            <div>
              <MdOutlineDarkMode size={25} />
            </div>
          ) : (
            <div>
              <MdOutlineLightMode size={25} />
            </div>
          )}
        </div>
        <div className="border-1 dark:bg-gray:500 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border bg-white p-1 dark:bg-gray-500">
          <AiOutlineUser size={25} />
        </div>
      </div>
    </div>
  );
};

export default Header;
