# Projet NestJS Final

Ce projet est une application NestJS pour la gestion des utilisateurs et des tâches.

## Table des Matières

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Utilisation](#utilisation)
4. [Contribuer](#contribuer)
5. [Licence](#licence)

## Introduction

Le projet NestJS Final est une application développée avec NestJS, un framework TypeScript pour construire des applications web efficaces et évolutives en Node.js. L'application gère les utilisateurs et leurs tâches associées.

## Installation

### Prérequis

- Node.js
- npm (Node Package Manager)
- Docker Desktop
- Git

### Étapes d'installation

1. Cloner le dépôt depuis GitHub :

git clone https://github.com/KevinKalt0/nestjs-final.git

markdown
Copier le code

2. Installer les dépendances Node.js :

cd nestjs-final

npm ci

markdown
Copier le code

3. Configurer la base de données PostgreSQL en éditant le fichier `config/database.config.ts`.

4. Lancer l'application :

npm start

markdown
Copier le code

5. Lancer les tests

npm run test:e2e:postgres

## Utilisation

Une fois l'application lancée, vous pouvez accéder à l'interface utilisateur via votre navigateur web à l'adresse `http://localhost:3000`.

### Fonctionnalités

- **Gestion des Utilisateurs** : Création, lecture, mise à jour et suppression des utilisateurs.
- **Gestion des Tâches** : Création, lecture, mise à jour et suppression des tâches associées aux utilisateurs.

