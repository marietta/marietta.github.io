document.addEventListener('DOMContentLoaded', function() {
    const tocLinks = document.querySelectorAll('.toc-entry');

    function setActiveLink() {
        const sections = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let currentSectionIndex = 0; // Start with -1 to indicate no active section

        // Loop through sections to find the first one in the viewport
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            if (isElementInViewport(section)) {
                currentSectionIndex = i; // Update to the current index
                //break; // Exit the loop immediately after finding the first visible section
            }
        }

        // Update the TOC links based on the current section index
        tocLinks.forEach((link, index) => {
            if (index === currentSectionIndex) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= 0 && // Element's top is at or above the top of the viewport
            rect.top < window.innerHeight/2 // Element's top is above the mid of the viewport
        );
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Call once to set initial active link
});
