# Projet Ansible 3-Tiers – KHAMALLAH Naël

## Description
Ce projet a pour objectif d’automatiser le déploiement d’une infrastructure 3-tiers via **Ansible** sur des conteneurs **Docker** :

- **Frontend** : deux serveurs web avec **Nginx** servant les pages HTML/CSS et agissant comme reverse-proxy pour l’API.  
- **Backend** : un serveur **Node.js** exposant une API REST pour accéder aux données.  
- **Base de données** : **PostgreSQL** hébergeant les tables nécessaires à l’API.  

L’idée est de créer une plateforme complète où le frontend communique avec le backend, lui-même connecté à la base de données.

---

## Architecture

| Service | Image / Rôle          | Ports | Fonction |
|---------|----------------------|-------|----------|
| web1    | Ubuntu 22.04 + Nginx | 8081  | Serveur frontend principal, reverse-proxy |
| web2    | Ubuntu 22.04 + Nginx | 8082  | Serveur frontend secondaire |
| db1     | PostgreSQL 14 + SSH  | 5432  | Base de données et utilisateur `appuser` |
| app     | Node.js 22           | 3001  | API backend exposant `/` et `/users` |

---

## Prérequis
- **Docker** & **Docker Compose**  
- **Ansible**  
- **Python 3**

---

## Installation et déploiement

1. Cloner le projet :
```bash
git clone https://github.com/naelkml/ansible.git
cd projet-ansible-final
Vérifier la présence du mot de passe dans .vault_pass.
Lancer le déploiement complet avec Docker Compose :
docker-compose up -d
Les services seront accessibles :
Frontend web : http://localhost:8081 / http://localhost:8082
API backend : http://localhost:3001/ et http://localhost:3001/users
Points fonctionnels
Les conteneurs se lancent correctement via Docker Compose.
L’API Node.js fonctionne localement et peut se connecter à PostgreSQL depuis le conteneur app.
PostgreSQL est initialisé avec l’utilisateur appuser et la base appdb.
Le frontend Nginx sert correctement la page HTML statique.
Limitations / problèmes rencontrés
Malgré un investissement à 200 %, plusieurs points n’ont pas fonctionné comme prévu :
Communication frontend → backend via Nginx
Les requêtes http://web1/api/users échouaient souvent avec “connection refused” ou “no pg_hba.conf entry”.
Problème lié aux adresses Docker internes et aux ports exposés, notamment avec la configuration du proxy dans Nginx.
Exécution de l’API depuis le conteneur db1
Lancement initial impossible car node app.js était sur l’hôte local, et non dans le conteneur.
Solution : créer un conteneur app dédié pour Node.js et monter correctement le code.
Erreurs de mot de passe PostgreSQL / SCRAM
La variable d’environnement PGPASSWORD n’était pas toujours reconnue par Node.js, générant client password must be a string.
Solution : créer un conteneur dédié pour Node.js et définir correctement toutes les variables d’environnement.
Problèmes de port occupé
Le port 3000 était déjà utilisé localement → changement pour 3001.
Remarques finales
Ce projet est fonctionnel en local avec Docker Compose.
Le frontend et l’API communiquent correctement lorsque tous les conteneurs sont en route.
Les points de limitation listés sont des pistes d’amélioration pour rendre le projet totalement stable et accessible depuis Nginx en proxy inverse.
Malgré ces difficultés, je me suis donné à 200 % pour que l’infrastructure fonctionne de bout en bout, en résolvant les problèmes de PostgreSQL, Node.js et Docker autant que possible. L’API a été la partie la plus complexe et chronophage du projet.