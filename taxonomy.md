---
layout: article
show_title: false
---

<div class="container">
    <div class="left" class="taxa-container">
        <div id="taxa-list" data-taxa='{{ site.data.taxa | jsonify | escape }}'>
        </div>
    </div>
    <div class="right">
        <div id="taxa-info" class="taxa-info info-container">
        Choose a Kingdom to start
            * taxa-info will appear here
            <!-- Information will be dynamically loaded here -->
        </div>
    </div>
</div>
<div class="bottom">
    <div id="taxa-cards" class="taxa-cards masonry-grid" data-masonry='{ "itemSelector": ".card", "gutter": 16 }'>
        <!-- Content for taxa cards will be dynamically loaded here -->
    </div>
</div>
<script src="assets/tax-cards.js"></script>
<script src="/assets/taxa3generator.js" defer></script>
