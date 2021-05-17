module.exports = {
    stories: [
        '../stories/*.stories.@(js|ts|mdx)', 
        '../stories/**/*.stories.@(js|ts|mdx)',
    ],
    addons: [
        '@storybook/addon-controls',
        '@storybook/addon-notes/register-panel',
        'storybook-readme/register'
    ],
}