# ChâTop - Back-end API

API REST du portail de location saisonnière ChâTop, développée avec NestJS 11 et Prisma 7.

## Démarrage 

### Prérequis

- **Node.js** 22 LTS ou supérieur
- **npm** 
- **MySQL** 9.6+

### Installation

```bash
cd backend
npm install
```

### Configuration

Créez un fichier `.env` à la racine du dossier `backend/` :

```env
DATABASE_URL="mysql://<user>:<password>@localhost:3306/chatop_db"
JWT_SECRET="secret_jwt"
```

### Base de données

La base de données `chatop_db` doit avoir les tables `USERS`, `RENTALS` et `MESSAGES`.
Le schéma SQL est disponible dans `../ressources/sql/schema.sql`.

Après configuration du `.env`, il faut générer le client Prisma :

```bash
npx prisma generate
```

### Lancer le serveur

```bash
# Mode développement
npm run start:dev

# Mode production
npm run start:prod
```

Le serveur démarre sur [http://localhost:3001](http://localhost:3001).

## Documentation API

La documentation Swagger est accessible à :

**[http://localhost:3001/api-docs](http://localhost:3001/api-docs)**

Pour tester les routes protégées dans Swagger :
1. Exécutez `POST /api/auth/login`
2. Copiez la valeur du champ `token`
3. Cliquez sur **Authorize** en haut à droite et collez le token

## 🔗 Routes

### Publiques

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/auth/register` | Créer un compte |
| POST | `/api/auth/login` | Se connecter — retourne un token JWT |

### Protégées (token JWT requis)

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/auth/me` | Utilisateur connecté |
| GET | `/api/rentals` | Liste des locations |
| GET | `/api/rentals/:id` | Détail d'une location |
| POST | `/api/rentals` | Créer une location |
| PUT | `/api/rentals/:id` | Modifier une location |
| GET | `/api/user/:id` | Obtenir un utilisateur |
| POST | `/api/messages` | Envoyer un message |

Toutes les routes protégées nécessitent le header :
```
Authorization: Bearer <token>
```

## Architecture

```
src/
├── auth/        # Register, login, me — authentification JWT
├── rentals/     # CRUD locations + upload image
├── user/        # Consultation utilisateur
├── messages/    # Envoi de messages
└── prisma/      # Service d'accès base de données
```

Architecture **Controller / Service / Repository (PrismaService)**.

## Sécurité

- ✅ JWT obligatoire pour toutes les routes (sauf register, login, `/api-docs`)
- ✅ Mots de passe chiffrés avec bcrypt
- ✅ Variables d'environnement pour les credentials (`.env`)
- ✅ Validation des entrées utilisateur (DTOs + class-validator)

## Technologies

- **NestJS 11** — Framework back-end
- **TypeScript 5** — Mode ESM strict
- **Prisma 7** — ORM avec driver adapter MariaDB pour MySQL
- **Passport + JWT** — Authentification
- **bcrypt** — Chiffrement des mots de passe
- **class-validator** — Validation des DTOs
- **multer** — Upload d'images
- **@nestjs/swagger** — Documentation OpenAPI
