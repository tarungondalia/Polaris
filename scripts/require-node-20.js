const major = Number(process.versions.node.split('.')[0]);

if (major !== 20) {
  console.error(
    `Node.js 20 is required for test runs. Current version: ${process.versions.node}\n` +
      'Run: nvm use 20'
  );
  process.exit(1);
}
