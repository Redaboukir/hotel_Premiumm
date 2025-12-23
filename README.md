🏨 Hotel Premium – Application de réservation hôtelière
📌 Description

Hotel Premium est une application web complète de gestion et de réservation d’hôtels.
Elle permet aux utilisateurs de consulter des hôtels, voir les chambres disponibles et effectuer des réservations, et aux administrateurs de gérer les hôtels, chambres, maintenances et statistiques.

Le projet est développé sous forme API REST sécurisée avec un frontend React moderne.

🚀 Fonctionnalités
👤 Utilisateur

Inscription & connexion (JWT)

Consultation des hôtels

Visualisation des chambres par hôtel

Calendrier de disponibilité des chambres

Réservation de chambres (avec vérification des conflits)

Annulation de réservation

Consultation de ses réservations

👨‍💼 Administrateur

Dashboard avec statistiques globales

Gestion des hôtels (CRUD)

Gestion des chambres (CRUD)

Mise en maintenance des chambres

Gestion des réservations

Statistiques avancées :

Réservations par mois

Taux d’occupation global

🛠️ Technologies utilisées
🔧 Backend

PHP 8.2.12

Symfony 7.4.2

Doctrine ORM

MySQL

JWT Authentication (LexikJWTAuthenticationBundle)

API REST

🎨 Frontend

React 19.2.3

React Router DOM 7.10.1

Axios

Vite

CSS inline (design moderne / travel theme)

📁 Architecture du projet
hotel-premium/
│
├── backend/        # API Symfony
│   ├── src/
│   ├── migrations/
│   └── config/
│
├── frontend/       # Application React
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   └── public/
│
└── README.md

⚙️ Installation & Lancement
🔹 Backend (Symfony)
cd backend
composer install
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console lexik:jwt:generate-keypair
symfony serve


API disponible sur :

http://localhost:8000

🔹 Frontend (React)
cd frontend
npm install
npm run dev


Application disponible sur :

http://localhost:5173

🔐 Sécurité

Authentification par JWT

Gestion des rôles :

ROLE_USER

ROLE_ADMIN

Accès sécurisé aux routes sensibles

Vérification des conflits de réservation

Protection des chambres en maintenance

📊 Statistiques Admin

Nombre total d’hôtels

Nombre total de chambres

Nombre total de réservations

Chambres en maintenance

Réservations par mois (par année)

Taux d’occupation global

✅ État du projet

✔️ Fonctionnel

✔️ Conforme aux exigences pédagogiques

✔️ Architecture claire (API + Front)

✔️ Sécurité et gestion des rôles


🎓 Objectif pédagogique

Ce projet a été réalisé dans un cadre académique afin de mettre en pratique :

Symfony moderne (v7)

API REST sécurisée

React avancé

Gestion de base de données

Architecture fullstack professionnelle

📌 Auteur

Projet réalisé par :
Boukir Reda 
Bouanani Meryem 
Laktato Mehdi 
