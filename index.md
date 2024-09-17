---
layout: home
permalink: /
---

<div class="masonry-grid">
    {% for page in site.posts %}
    <section>
        <div class="card-big masonry-item">
            <div class="card__content">
                <div class="card__header">{% assign page_title = page.title | default: page.name | filename_cleaner %}
                    <a href="{{ page.url }}">{{ page.title }}</a>
                </div>
                {{ page.excerpt }}
            </div>
        </div>
    </section>
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


