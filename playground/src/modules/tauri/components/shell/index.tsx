import React, { useEffect, useRef, useState } from 'react';
import { Child, Command } from '@tauri-apps/api/shell';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import path from 'path';
import { BaseDirectory, Dir, writeTextFile } from '@tauri-apps/api/fs';
import { join, appDataDir, homeDir } from '@tauri-apps/api/path';

const TauriShell = () => {
  const [stdOut, setStdOut] = useState('');
  const [stdIn, setStdIn] = useState('');
  const [stdError, setStdError] = useState('');
  const child = useRef<Child>();
  const pythonDir = useRef<string>("")

  const runCommand = async () => {
    console.log('Run command');
    const command = new Command('python',[pythonDir.current]);
    command.on('close', (data) => {
      console.log(`command finished with code ${data.code} and signal ${data.signal}`);
    });
    command.on('error', (error) => {});
    command.stdout.on('data', (line) => {
      setStdOut((prev) => prev + '\n' + line);
    });
    command.stderr.on('data', (line) => setStdError((prev) => prev + '\n' + line));

    child.current = await command.spawn();
    // await child.write('console.log("Hello")\n');
    // await child.write('\n')
    console.log('pid:', child.current.pid);
    // setChildProcess(child)
  };

  const kill = async () => {
    await child.current?.kill();
  };

  const clear = () => {
    setStdOut('');
    setStdIn('');
    setStdError('');
  };

  const sendInput = async () => {
    await child.current?.write(stdIn);
  };

  useEffect(() => {
    (async () => {
      const _homeDir = await homeDir();
      pythonDir.current = await join(_homeDir, '.playground', 'python', 'python.py');
      await writeTextFile(
        { contents: stdIn, path: await join(_homeDir, '.playground', 'python', 'python.py') },
        { dir: BaseDirectory.Home }, 
      );
    })();
  }, [stdIn]);

  return (
    <div>
      <h1>{child.current?.pid}</h1>
      <div className="flex flex-row space-x-2">
        <Button onClick={runCommand}>Run</Button>
        <Button onClick={clear}>Clear</Button>
        <Button onClick={kill} danger>
          Kill
        </Button>
      </div>
      <div>
        <h1>In</h1>
        <Button onClick={sendInput}>Send</Button>
        <TextArea onChange={(e) => setStdIn(e.target.value)} value={stdIn}></TextArea>
      </div>
      <div>
        <h1>Out</h1>
        <TextArea autoSize={false} className="h-[500px]" value={stdOut}></TextArea>
      </div>
      <div>
        <h1>Error</h1>
        <TextArea value={stdError}></TextArea>
      </div>
    </div>
  );
};

export default TauriShell;
