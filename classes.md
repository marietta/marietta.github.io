---
layout: article
---

<div id="taxa-info">
<div class="flex" data-masonry='{ "itemSelector": ".card-small", "columnWidth": ".card-small", "gutter": 16}'>
{% assign process_items = site.data.taxa %}

{% assign class_names = "" %}

{% assign extract_classes = "" %}

{% assign max_depth = 10 %}

{% for i in (1..max_depth) %}
{% assign new_process_items = "" %}

{% for item in process_items %}
    {% if item.name contains "Class" %}
        {% assign class_name = item.name | split: '·' | first | split: ' ' | slice: 1 | join: ' ' | strip %}

{% assign pages = site.taxonomy | where: 'taxonomy', class_name %}
{% for current_page in pages  %}
<div class="card-small">
<div class="card__content">
<div class="card__header" >
{{ class_name }}
<a href="/taxonomy/{{ class_name }}"><img src="{{ current_page.image}}"  alt=""/></a>
</div>
{%- include article-info.html article=current_page show_date=false -%}
</div>
</div>
{% endfor %}

    {% endif %}
    {% if item.sub %}
      {% assign sub_items = item.sub %}
      {% assign new_process_items = new_process_items | concat: sub_items %}
    {% endif %}
{% endfor %}

{% assign process_items = new_process_items %}
{% if process_items.size == 0 %}
{% break %}
{% endif %}
{% endfor %}

</div>
</div>