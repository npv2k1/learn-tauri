import { invoke } from '@tauri-apps/api';
import { Input, Button } from 'antd';
import React, { useState } from 'react';

const TauriStorage = () => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  async function greet() {
    await invoke('put_db', { name });
  }

  async function put() {
    await invoke('put_db', { key, value });
  }

  async function get() {
    await invoke('get_db', { key }).then((res) => {
      console.log(res);
    });
  }

  return (
    <div>
      <div>
        <Input value={key} onChange={(e) => setKey(e.target.value)} type="text" placeholder="key" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="value"
        />
      </div>
      <div>
        <Button onClick={put}>Put</Button>
        <Button onClick={get}>Get</Button>
      </div>
    </div>
  );
};

export default TauriStorage;
