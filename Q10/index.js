global.myGlobalValue = 'Accessible everywhere!';

console.log('--- Node.js Global Objects Demo ---');
console.log('My global value:', global.myGlobalValue);

console.log('Node version:', process.version);
console.log('Process ID:', process.pid);

console.log('Current directory (__dirname):', __dirname);
console.log('Current file (__filename):', __filename);

setTimeout(() => {
  console.log('This message is displayed after 2 seconds');
}, 2000);

console.log('Command-line arguments:', process.argv);
