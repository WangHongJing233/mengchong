const { spawn } = require('child_process');

const p = spawn('taro', ['init', 'taro-app', '--name', 'taro-app', '--description', '萌宠PK', '--typescript', '--css', 'Sass', '--template', 'default', '--autoInstall'], {
  stdio: ['pipe', 'inherit', 'inherit']
});

const inputs = [
  '\r', // 框架 React
  '\r', // ES5 No
  '\r', // NPM (NPMType, default yarn)
  '\r', // 编译工具 Webpack5
  '\r', // Template
];

let i = 0;
const interval = setInterval(() => {
  if (i < inputs.length) {
    p.stdin.write(inputs[i]);
    i++;
  } else {
    clearInterval(interval);
  }
}, 1000);

p.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
  process.exit(code);
});