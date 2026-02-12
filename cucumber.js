module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['tests/support/**/*.ts', 'tests/steps/**/*.ts'],
    format: ['progress'],
    paths: ['tests/features/**/*.feature'],
    publishQuiet: true
  },
  api: {
    requireModule: ['ts-node/register'],
    require: ['tests/steps/step_definitions/**/*.js'],
    format: ['progress'],
    paths: ['tests/api/features/**/*.feature'],
    publishQuiet: true
  }
};
