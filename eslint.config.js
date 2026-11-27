// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

// Katman kuralı: app → features → shared. Ok yönünün tersine içe aktarma yapılmaz.
const fromApp = {
  group: ['@/app', '@/app/**'],
  message: 'src/app yalnızca rotaları tutar, oradan içe aktarma yapılmaz.',
};

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*', '.expo/*', 'src/uniwind-types.d.ts'],
  },
  {
    files: ['src/app/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*/**'],
              message:
                "Feature'ı yalnızca kendi index.ts dosyasından içe aktar: '@/features/<ad>'.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            fromApp,
            {
              group: ['@/features', '@/features/**'],
              message:
                "Feature'lar birbirini içe aktarmaz. Kendi içinde göreli yol kullan; ortak kod src/shared'a taşınır.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/shared/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            fromApp,
            {
              group: ['@/features', '@/features/**'],
              message: "src/shared hiçbir feature'a bağlı olamaz.",
            },
          ],
        },
      ],
    },
  },
]);
