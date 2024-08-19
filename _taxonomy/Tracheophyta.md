---
layout: taxonomy
taxonomy: Tracheophyta
---


<div id="taxa-info">

<div class="flex" data-masonry='{ "itemSelector": ".card-small", "columnWidth": ".card-small"}'>
{% assign fruits = "Angiospermae,Lycopodiopsida,Polypodiopsida" | split: "," %}
{% for taxaname in fruits  %}
{% assign pages = site.taxonomy | where: 'taxonomy', taxaname %}
{% for current_page in pages  %}
<a href="/taxonomy/{{ taxaname }}">
    <div class="card-small card--clickable ">
        <div class="card__content">
            <div class="card__header" >
                {{ taxaname }}
                {% if current_page.image %}
                <img src="{{ current_page.image}}"  alt=""/>
                {%endif%}
            </div>
                {%- include article-info.html article=current_page show_date=false -%}
        </div>
        </div>
<br>
        </a>
{% endfor %}
{% endfor %}
</div>
</div>
