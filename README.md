# 🚀 Stocks Management App

Une application de gestion de stocks développée avec **Vue 3**, **Vite**, **TypeScript** et **Pinia**. Cette application permet de gérer les produits, les mouvements de stock, et offre une interface utilisateur intuitive pour suivre les opérations de stock.

---

## 📋 Table des Matières

1. [Fonctionnalités](#-fonctionnalités)
2. [Technologies Utilisées](#-technologies-utilisées)
3. [Installation](#-installation)
4. [Utilisation](#-utilisation)
5. [Structure du Projet](#-structure-du-projet)
6. [Tests](#-tests)
7. [Contribuer](#-contribuer)
8. [Licence](#-licence)

---

## 🌟 Fonctionnalités

- **Gestion des Produits** :
    - Ajouter, modifier, supprimer des produits.
    - Afficher la liste des produits avec leurs détails (nom, code unique, prix, quantité, etc.).
- **Mouvements de Stock** :
    - Suivre les entrées et sorties de stock.
    - Filtrer les mouvements par code unique de produit.
- **Interface Utilisateur** :
    - Formulaire de saisie pour les produits.
    - Tableaux interactifs pour afficher les données.
    - Gestion des erreurs et des succès (notifications).

---

## 🛠 Technologies Utilisées

- **Frontend** :
    - [Vue 3](https://vuejs.org/) : Framework JavaScript pour l'interface utilisateur.
    - [Vite](https://vitejs.dev/) : Outil de build rapide et moderne.
    - [TypeScript](https://www.typescriptlang.org/) : Langage de programmation typé pour JavaScript.
    - [Pinia](https://pinia.vuejs.org/) : Gestion d'état pour Vue 3.
    - [Axios](https://axios-http.com/) : Client HTTP pour les requêtes API.
    - [Vitest](https://vitest.dev/) : Framework de tests unitaires.
- **Backend** :
    - L'application suppose l'existence d'une API REST pour la gestion des stocks. L'URL de l'API est configurée via une variable d'environnement.

---

## 🚀 Installation

Suivez ces étapes pour installer et exécuter l'application en local.

### Prérequis

- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Étapes

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/votre-utilisateur/stocks-management-app.git
   cd stocks-management-app
   
2. **Installer les dépendances** :
   ```bash
   npm install
   
3. **Configurer l'environnement** :
    Créez un fichier `.env` à la racine du projet et ajoutez l'URL de l'API :
    ```env
    VITE_API_URL=http://localhost:3000/api
   
4. **Démarrer l'application** :
   ```bash
   npm run dev
      
5. **Accéder à l'application** :
   ```bash
   Ouvrez votre navigateur et accédez à http://localhost:5173.

## 🧪 Tests

- **Tests Unitaires** :
    - Les tests fonctionnelles sont écrits avec Vitest. Pour exécuter les tests :
        ```bash
        npm run test

