---
layout: home
permalink: /
show_date: false
---
{% assign sorted_notes = site.notes | sort: "date|desc" %}
<div class="masonry-grid">
    {% for page in sorted_notes %}
    {% if page.main_page %}
        <section>
            <div class="card-big masonry-item">
                <div class="card__content">
                    <div class="card__header">{% assign page_title = page.title | default: page.name | filename_cleaner %}
                        <a href="{{ page.url }}">{{ page.title }}</a>
                    </div>
                    {{ page.excerpt | replace: '<img ', '<img class="card__image" ' | markdownify }}
                </div>
            </div>
        </section>
    {% endif %}
    {% endfor %}
</div>

<script>
    var grid = document.querySelector('.masonry-grid');
    var msnry = new Masonry(grid, {
        itemSelector: '.masonry-item',
        columnWidth: '.card-big',
        transitionDuration: 0,
        gutter: 16,
    });
    imagesLoaded(grid).on('progress', function () {
        msnry.layout();
    });
    window.addEventListener('scroll', function () {
        msnry.layout();
    });
    window.addEventListener('resize', function () {
        msnry.layout();
    });
</script>


