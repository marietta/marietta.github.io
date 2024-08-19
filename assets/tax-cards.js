const taxaList = document.getElementById('taxa-list');
const infoContainer = document.getElementById('taxa-info');
const taxaCardsContainer = document.getElementById('taxa-cards');

taxaList.addEventListener('click', (event) => {
    console.log(event.target.tagName.toLowerCase());
    if (event.target.tagName.toLowerCase() === 'summary') {
        const selectedId = event.target.dataset.content;

        // Mark the current item as active
        const activeItem = taxaList.querySelector('.active');
        if (activeItem) {
            activeItem.classList.remove('active'); // Remove active class from previously active item
        }
        event.target.classList.add('active'); // Add active class to the current item

        // Construct URL based on selectedId
        const taxonomyUrl = `/taxonomy/${selectedId}`; // URL for the taxonomy page

        // Fetch the entire taxonomy page
        fetch(taxonomyUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text(); // Get the response as text
            })
            .then(html => {
                // Create a temporary DOM element to parse the fetched HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Extract the info and taxa-cards elements
                const infoContent = doc.getElementById('taxa-info');
                const taxaCardsContent = doc.getElementById('taxa-cards');

                // Clear previous content
                infoContainer.innerHTML = '';
                taxaCardsContainer.innerHTML = '';

                // Check if the elements exist and populate the containers
                if (infoContent) {
                    infoContainer.innerHTML = infoContent.innerHTML; // Populate the info container
                    infoContainer.style.display = 'block'; // Show the info container

                    new Masonry(taxaCardsContainer, {
                        itemSelector: '.card-small',
                        gutter: 16 // Adjust gutter as needed
                    }).layout();
                } else {
                    infoContainer.innerHTML = 'No information available.';
                    infoContainer.style.display = 'block';
                }

                if (taxaCardsContent) {
                    // Populate the taxa cards container
                    taxaCardsContainer.innerHTML = taxaCardsContent.innerHTML;
                    taxaCardsContainer.style.display = 'block'; // Show the taxa cards container

                    // Initialize Masonry after content is loaded
                    new Masonry(taxaCardsContainer, {
                        itemSelector: '.card',
                        gutter: 20 // Adjust gutter as needed
                    }).layout();
                } else {
                    taxaCardsContainer.innerHTML = 'No taxa cards available.';
                    taxaCardsContainer.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error fetching taxonomy page:', error);
                infoContainer.innerHTML = 'Failed to load information.';
                taxaCardsContainer.innerHTML = 'Failed to load taxa cards.';
                infoContainer.style.display = 'block';
                taxaCardsContainer.style.display = 'block';
            });
    }
});