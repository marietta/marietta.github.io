---
layout: article
---

<div class="taxa-cards" data-masonry='{ "itemSelector": ".masonry-item"}'>
{% for current_page in site.species %}
{% if current_page.taxonomy %}
<a href="{{ current_page.url }}">
        <div class="card masonry-item">
        <div class="card__content">
            <div class="card__header">
                {{ current_page.title }}
                {% if current_page.image %}
                <img src="{{ current_page.image}}"  alt=""/>
                {%endif%}
            </div>
            {%- include article-info.html article=current_page show_date=false -%}
        </div>
    </div></a>
{%endif%}
{% endfor %}
</div>
