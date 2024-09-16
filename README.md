# :red_circle: CODERED - API

## :memo: • Description

API pour le projet CodeRed, le grand jeu d'intégration de l'IUT de Vélizy.  

## :rocket: • Mise en place

### Prérequis

- [Docker](https://www.docker.com/)

### Installation

1. Cloner l'API

```bash
git clone https://github.com/Eliott-B/CodeRed-API.git
```

2. Cloner le [Client](https://github.com/Eliott-B/CodeRed-Client) et suivre les instructions

3. Créer un dossier `.env` à la racine du projet

4. Créer un fichier `database-pass` dans le dossier `.env`

```env
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_ROOT_PASSWORD=
```

5. Créer un fichier `api-config` dans le dossier `.env`

```env
AUTH_PASS=
TOKEN_SECRET=
```

*`AUTH_PASS` sert de clé pour savoir si c'est le bon client qui nous parle.*  
*`TOLEN_SECRET` sert à chiffrer les tokens JWT.*  

6. Lancer l'API

```bash
docker compose up # -d pour lancer en arrière plan
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
