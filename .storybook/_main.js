module.exports = {
  // # 스토리북 파싱 경로
  stories: ["../src/**/*.stories.js"],
  // # 애드온 적용
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-knobs",
    // "@storybook/addon-docs",
    "@storybook/addon-viewport/register",
  ],
};
