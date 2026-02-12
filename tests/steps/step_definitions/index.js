const fs = require('fs');
const path = require('path');

require('ts-node/register');

const supportDir = path.resolve(__dirname, '..', '..', 'support');
require(path.join(supportDir, 'world.ts'));
require(path.join(supportDir, 'hooks.ts'));

const stepsDir = path.resolve(__dirname, '..');
const stepFiles = fs
  .readdirSync(stepsDir)
  .filter((file) => file.endsWith('.steps.ts'));

for (const file of stepFiles) {
  require(path.join(stepsDir, file));
}

const apiStepsDir = path.resolve(__dirname, '..', '..', 'api', 'steps');
if (fs.existsSync(apiStepsDir)) {
  const apiStepFiles = fs
    .readdirSync(apiStepsDir)
    .filter((file) => file.endsWith('.steps.ts'));
  for (const file of apiStepFiles) {
    require(path.join(apiStepsDir, file));
  }
}
