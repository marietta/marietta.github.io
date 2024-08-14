$(document).ready(function () {
    $('details').on('click', 'summary', function () {
        // Remove active class from all summary elements
        $('summary').removeClass('active');

        // Add active class to the clicked summary element
        $(this).addClass('active');

        // Get the content from the data-content attribute of the clicked item
        const content = $(this).data('content');

        // Construct the path to the Jekyll Markdown file for the tag
        const filePath = `/taxonomy/${content}.html`; // Jekyll will generate .html from .md

        // Load the content of the tag page
        $.get(filePath, function (data) {
            // Create a temporary DOM element to hold the loaded content
            const tempDiv = $('<div>').html(data);

            // Extract only the <article class="item"> elements
            const items = tempDiv.find('div.card');

            // Clear the taxa-list and append the filtered items
            $('.taxa-cards').empty().append(items);
            // Append each item with a line break after it
            items.each(function () {
                $('.taxa-cards').append($(this)); // Append the article and a line break
            });
        }).fail(
            function (xhr, status, error) {
                if (xhr.status === 404) {
                    // Load the 404 page content into the .taxa-cards element
                    $('.taxa-cards').load('/404.html .js-article-content', function (response, status, xhr) {
                        if (status === "error") {
                            const msg = "Error loading 404 content: " + xhr.status + " " + xhr.statusText;
                            console.log(msg);
                        }
                    });
                } else {
                    const msg = "Error: " + xhr.status + " " + xhr.statusText;
                    $('.taxa-cards').html(msg);
                    console.log(msg);
                }
            }
        );
    });
});