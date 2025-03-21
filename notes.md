---
layout: page
show_date: false
---

{% assign sorted_notes = site.notes | sort: "date|desc" %}
<div class="masonry-grid">
    {% for page in sorted_notes %}
    <section>
        <div class="card masonry-item">
            <div class="card__content">
                <div class="card__header">{% assign page_title = page.title | default: page.name | filename_cleaner %}
                    <a href="{{ page.url }}">{{ page.title }}</a>
                </div>
                {{ page.excerpt | replace: '<img ', '<img class="card__image" ' | markdownify }}
            </div>
        </div>
    </section>
    {% endfor %}
</div>

<script>
    var grid = document.querySelector('.masonry-grid');
    var msnry = new Masonry(grid, {
        itemSelector: '.masonry-item',
        columnWidth: '.masonry-item',
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