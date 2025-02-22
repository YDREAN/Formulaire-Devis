React + TypeScript + Vite
Ce modèle fournit une configuration minimale pour faire fonctionner React avec Vite, incluant le rechargement à chaud (HMR) et quelques règles ESLint.

Actuellement, deux plugins officiels sont disponibles :

@vitejs/plugin-react utilise Babel pour le rechargement rapide (Fast Refresh).
@vitejs/plugin-react-swc utilise SWC pour le rechargement rapide (Fast Refresh).
Étendre la configuration ESLint
Si vous développez une application en production, il est recommandé de mettre à jour la configuration pour activer des règles de lint prenant en compte les types :

Configurez la propriété parserOptions au niveau supérieur comme ceci :

export default {
  // autres règles...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}

Remplacez plugin:@typescript-eslint/recommended par plugin:@typescript-eslint/recommended-type-checked ou plugin:@typescript-eslint/strict-type-checked.
Ajoutez éventuellement plugin:@typescript-eslint/stylistic-type-checked.
Installez eslint-plugin-react et ajoutez plugin:react/recommended & plugin:react/jsx-runtime à la liste des extends.
