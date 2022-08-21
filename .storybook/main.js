module.exports = {
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-console',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
  ],
  core: {
    builder: 'webpack5',
  },
}
