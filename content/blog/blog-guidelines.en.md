+++

title = "Blog Guidelines"
description = "Here are the blog guidelines."
publishdate = "2017-03-24"
draft = true

authorName = "Olivier Sylvain" 
authorTitle = "Software engineer at Opfront"
authorPhoto = "https://media.licdn.com/media/p/4/005/06e/24e/23c05be.jpg"

slug = "guidelines"
aliases = ["/en/blog/conventions"]

backgroundImage = "/img/guidelines.jpg"

tags = ["e-commerce", "blogger"]

+++

Here are some tips along with examples to help format blog posts.

The [usual markdown rules](http://markdown-guide.readthedocs.io/en/latest/basics.html) apply.


## Headers

It is possible to use 2 header sizes:

## Big title (second level)
### Small title (third level and following)

*Do not use first level headings (one #)* because it generates a ```<h1>``` and there's already one in the page. 

## Code

```
# comment
curl http://opfront.ca
```

## Listes
+ item 1
- item 2
* item 3

## Metadata (frontmatter)

Use the following properties:
```
title = "Blog Guidelines"
// Date when the blog post is going to be published
publishDate = "2017-03-08" // "AAAA-MM-JJ"

authorName = "Olivier Sylvain" 
authorTitle = "Software engineer at Opfront"
// photo link, linked in for example
authorPhoto = "https://..."

slug = "guidelines" // name used for routing

// Alias allows to redirect in the tight language since urls change according to language
// french post
aliases = ["/blog/{english_slug_name}"]
// english post
aliases = ["/en/blog/{french_slug_name}"] 

// Local photo link
backgroundImage = "/img/{filename}.jpg"
// or external link
backgroundImage = "https://..."

// tags shown under the post title (filter purposes)
tags = ["e-commerce", "blogger"]

draft=true // if blog post is not final
```

## Banner image
Ideally, add your own photo to the **/static/img** directory so we can serve it ourselves. 

Could be an external image link (like unsplash) but it's not recommended as we do not control image size and these services aren't made for content delivery (slow).

Image size must be at least 1800x325.

## Generate the website
To generate:

```
// Generates files in /public
hugo 

// Generates the files in memory and serves them at http://localhost:1313
hugo serve 
```
In dev mode, you can use the following flags:
```
hugo serve --buildDrafts --buildFuture
```
so that drafts and future posts are generated.

## Conclusion

### Lorem ipsum

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Reste à faire

* Share links
* Author social media links
* Serve our own banner images (unsplash isn't a CDN and often images are way too big)
