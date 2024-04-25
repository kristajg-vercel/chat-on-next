module.exports = {
  root: true,
  extends: ['custom/next'],
  overrides: [
    {
      files: ['app/**/{head,layout,page,}.tsx'],
      rules: {
        'import/no-default-export': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
      },
    },
  ],
};