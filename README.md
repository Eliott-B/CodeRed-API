# :red_circle: CODERED - API

## :memo: • Description

API pour le projet CodeRed, le grand jeu d'intégration de l'IUT de Vélizy.  

## :rocket: • Mise en place

### Prérequis

- [MariaDB](https://mariadb.org/)
- [Node.js](https://nodejs.org/)

### Installation

1. Cloner l'API

```bash
git clone https://github.com/Eliott-B/CodeRed-API.git
```

2. Cloner le [Client](https://github.com/Eliott-B/CodeRed-Client) et suivre les instructions  

3. Installer MariaDB et configurer un utilisateur et une base de données  

*Exemple de configuration :*  

```sql
CREATE DATABASE codered;
CREATE USER 'codered'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON codered.* TO 'codered'@'localhost';
FLUSH PRIVILEGES;
```

4. Lancer le script `setup.sh` et suivre les instructions

```bash
./setup.sh
```

*`AUTH_PASS` sert de clé pour savoir si c'est le bon client qui nous parle.*  
*`TOLEN_SECRET` sert à chiffrer les tokens JWT.*  

Sinon, vous pouvez les définir dans un fichier `.env` à la racine du projet.  

```env
AUTH_PASS=your_auth_pass
TOKEN_SECRET=your_token_secret
MYSQL_DATABASE=your_database
MYSQL_USER=your_user
MYSQL_PASSWORD=your_password
```

5. Lancer l'API avec le script `run.sh`

```bash
./run.sh
```

## :busts_in_silhouette: • Contributeurs

- [Eliott Barker](https://github.com/Eliott-B)  
- [Sacha Sorgiati](https://github.com/jellyph1sh)  
- [Maxence Ouvrard](https://github.com/MaxOuvrard)  
- [Chakib Ouali](https://github.com/444chak)  
- [Kylian Gravier](https://github.com/SaAxok)

*Les contributeurs doivent être cités sur le site web et dans le README des projets enfants.*  

## :email: • Contact

Eliott Barker - [eliottb.info@gmail.com](mailto:eliottb.info@gmail.com)
