import reactHooks from 'eslint-plugin-react-hooks';
import react from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';

console.log('Hooks Recommended:', reactHooks.configs.recommended ? Object.keys(reactHooks.configs.recommended) : 'MISSING');
console.log('React Recommended:', react.configs.recommended ? Object.keys(react.configs.recommended) : 'MISSING');
console.log('Refresh:', Object.keys(reactRefresh));

if (react.configs.recommended && react.configs.recommended.rules) console.log('React Rules OK');
else console.log('React Rules MISSING');

if (reactHooks.configs.recommended && reactHooks.configs.recommended.rules) console.log('Hooks Rules OK');
else console.log('Hooks Rules MISSING');

if (react.configs['jsx-runtime'] && react.configs['jsx-runtime'].rules) console.log('JSX Runtime Rules OK');
else console.log('JSX Runtime Rules MISSING');

