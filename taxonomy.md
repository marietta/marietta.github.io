---
layout: article
show_title: false
---
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<div class="taxa-wrapper">
    <div class="taxa-container" id="taxa-container" data-taxa='{{ site.data.taxa | jsonify | escape }}'></div>
    <div class="taxa-list"></div>
</div>

<script src="/assets/taxa3generator.js" defer></script>
<script src="/assets/taxa3.js"></script>