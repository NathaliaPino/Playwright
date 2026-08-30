const common = {
  paths: ['features/web/**/*.feature'],
  require: [
    'step-definitions/web/**/*.js',
    'support/**/*.js',
  ],
  format: [
    'progress-bar',
    'html:reports/cucumber-report.html',
  ],
  publishQuiet: true,
};

module.exports = {
  default: common,
};