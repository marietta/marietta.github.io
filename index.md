---
layout: home
permalink: /
---

{% for document in site.posts %}
<a href="{{ document.url }}">{{ document.title }}</a>

{% endfor %}