# Projet Ansible 3-Tiers – KHAMALLAH Naël

---

## Description
Brève présentation du projet :  
Ce projet automatise le déploiement d’une infrastructure **3-tiers** via **Ansible** sur des conteneurs **Docker**.  

- **Frontend** : deux serveurs Nginx servant les pages HTML/CSS et agissant comme reverse-proxy pour l’API.  
- **Backend** : serveur Node.js exposant une API REST.  
- **Base de données** : PostgreSQL avec les tables nécessaires à l’API.  

---

## Architecture
Schéma ou description de l’architecture 3-tiers :  

| Service | Image / Rôle          | Ports | Fonction |
|---------|----------------------|-------|----------|
| web1    | Ubuntu 22.04 + Nginx | 8081  | Frontend principal / reverse-proxy |
| web2    | Ubuntu 22.04 + Nginx | 8082  | Frontend secondaire |
| db1     | PostgreSQL 14        | 5432  | Base de données avec utilisateur `appuser` |
| app     | Node.js 22           | 3001  | API backend exposant `/` et `/users` |

---

## Prérequis
- Ansible  
- Docker & Docker Compose  
- Python 3  

---

## Installation
Étapes pour déployer le projet :  

1. Cloner le projet :
```bash
git clone https://github.com/naelkml/ansible.git
cd projet-ansible-final
Vérifier que le mot de passe est présent dans le fichier .vault_pass.
Lancer le déploiement :
docker-compose up -d
Utilisation
Accéder aux services :
Frontend web : http://localhost:8081 / http://localhost:8082
API backend : http://localhost:3001/ et http://localhost:3001/users
Tests
Commandes pour valider le déploiement :
Vérifier que les conteneurs sont actifs :
docker ps
Tester l’API depuis l’hôte :
curl http://localhost:3001/users
Vérifier la base PostgreSQL :
docker exec -it db1 psql -U appuser -d appdb -c "\dt"
Auteur
KHAMALLAH Naël