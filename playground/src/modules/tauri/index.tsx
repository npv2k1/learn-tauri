import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { invoke } from '@tauri-apps/api/tauri';
import { Button, Input } from 'antd';
import TauriShell from './components/shell';
import Timer from './components/time';

function Tauri() {
  return (
    <div>
      {/* <TauriShell /> */}
      <Timer/>
    </div>
  );
}

export default Tauri;
