+++

title = "Conventions du blog"
description = "Voici les conventions pour le blog."
publishdate = "2017-03-24"
draft = true

authorName = "Olivier Sylvain" 
authorTitle = "Ingénieur logiciel chez Opfront"
authorPhoto = "https://media.licdn.com/media/p/4/005/06e/24e/23c05be.jpg"

slug = "conventions"
aliases = ["/blog/guidelines"]

backgroundImage = "/img/guidelines.jpg"

tags = ["commerce en ligne", "bloggeur"]

+++

Voici quelques conseils et lignes directrices accompagnés d'exemples pour aider à formatter les articles de blog. 

Les [règles habituelles](http://markdown-guide.readthedocs.io/en/latest/basics.html) de markdown s'appliquent.


## Headers

Il est possible d'utiliser deux grosseurs de titres: 

## Gros titre (second niveau)
### Petit titre (troisième niveau et suivants)

*Ne pas utiliser de titre de premier niveau (un seul #)* car ça génère un ```<h1>``` et il y en a déjà un dans la page. 

## Code

```
# commentaire
curl http://opfront.ca
```

## Listes
+ article 1
- article 2
* article 3

## Métadonnées (frontmatter)

Voici les propriétés à utiliser:
```
title = "Conventions du blog"
// Date à laquelle sera publié l'article
publishDate = "2017-03-08" // "AAAA-MM-JJ"

authorName = "Olivier Sylvain" 
authorTitle = "Ingénieur logiciel chez Opfront"
// lien vers une photo, linked in par exemple 
authorPhoto = "https://..."

slug = "conventions" // nom qui sera utilisé pour le routing

// Alias permet de rediriger dans la bonne langue puisque les url changent selon la langue
// dans l'article en français
aliases = ["/blog/{nom_du_slug_anglais}"]
// dans l'article en anglais
aliases = ["/en/blog/{nom_du_slug_français}"] 

// lien vers une photo locale
backgroundImage = "/img/{nom_du_fichier}.jpg"
// ou un lien externe
backgroundImage = "https://..."

// tags affichés sous le titre (permettra de filtrer un jour)
tags = ["commerce en ligne", "bloggeur"]

draft=true // si l'article n'est pas final
```

## Image de la banière
Idéalement, ajouter une photo au dossier **/static/img** pour qu'on puisse la servir nous même. 

Peut aussi être un lien externe (unsplash par exemple), mais ce n'est pas recommandé parce qu'on ne contrôle pas la grosseur de l'image et souvent ces services ne sont pas faits pour ça (lent).

L'image doit être au minimum 1800x325.

## Générer le site web
Pour générer le site web:

```
// Génère les fichiers dans /public
hugo 

// Génère les fichiers en mémoire et les sert à http://localhost:1313
hugo serve 
```
En développement, on peut utiliser les flags suivants:
```
hugo serve --buildDrafts --buildFuture
```
pour que les brouillons et les articles qui ne sont pas encore publiés soient générés.

## Conclusion

### Lorem ipsum

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Reste à faire

* Liens pour partager l'article
* Liens vers les medias sociaux de l'auteur
* Servir nos propres images (unsplash n'est pas un CDN et les images sont souvent beaucoup trop grosses)
