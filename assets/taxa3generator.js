document.addEventListener("DOMContentLoaded", function() {
    const taxaContainer = document.getElementById('taxa-list');
    const taxaData = JSON.parse(taxaContainer.getAttribute('data-taxa'));

    async function fetchSpeciesCount(secondWords) {
        const fetchPromises = secondWords.map(async (secondWord) => {
            try {
                const response = await fetch(`/taxonomy/${secondWord}`);
                const text = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');
                const speciesCards = doc.querySelectorAll('.card'); // Assuming the species cards have a class 'card'
                return { secondWord, count: speciesCards.length };
            } catch (error) {
                console.error('Error fetching species count for', secondWord, ':', error);
                return { secondWord, count: 0 }; // Return 0 if there's an error
            }
        });

        return Promise.all(fetchPromises);
    }

    async function gatherSecondWords(taxa) {
        let secondWords = [];

        for (const item of taxa) {
            const secondWord = item.name.split(' · ')[0].split(' ')[1];
            secondWords.push(secondWord); // Add the second word for the top-level item

            // If there are sub-level items, gather their second words recursively
            if (item.sub && item.sub.length > 0) {
                secondWords = secondWords.concat(await gatherSecondWords(item.sub));
            }
        }

        return secondWords;
    }

    async function generateHtml(taxa, speciesCountsMap, isTopLevel = false) {
        let html = '';

        for (const item of taxa) {
            const parts = item.name.split(' · ');
            const firstWord = parts[0].split(' ')[0];
            const secondWord = parts[0].split(' ')[1];
            const restOfName = parts[0].substring(firstWord.length + secondWord.length + 2);
            const remainingName = parts.slice(1).join(' · ');

            // Get the species count from the pre-fetched map
            const speciesCount = speciesCountsMap[secondWord] || 0;

            html += `<details ${isTopLevel ? '' : ''}>\n`;
            html += `    <summary data-content="${secondWord}">${firstWord} <a class="button button--secondary button--pill button--sm" href="/taxonomy/${secondWord}">${secondWord}</a>${restOfName}${remainingName ? ' ' + remainingName : ''} (${speciesCount} species)`;

            if (item.sub && item.sub.length > 0) {
                html += ' <span class="marker"> ➜ </span>';
            }

            html += `</summary>\n`;

            if (isTopLevel)
                html += `    <div class="top-taxa3">\n`;
            else
                html += `    <div class="sub-taxa3">\n`;

            if (item.sub) {
                html += await generateHtml(item.sub, speciesCountsMap); // Recursive call for sub-levels
            }

            html += `    </div>\n`;
            html += `</details>\n`;
        }

        return html;
    }

    (async () => {
        // Gather all second words for both top-level and sub-level items
        const secondWords = await gatherSecondWords(taxaData);
        const speciesCounts = await fetchSpeciesCount(secondWords);

        // Create a map of secondWord to count for easy access
        const speciesCountsMap = {};
        speciesCounts.forEach(({ secondWord, count }) => {
            speciesCountsMap[secondWord] = count;
        });

        const htmlOutput = await generateHtml(taxaData, speciesCountsMap, true);
        taxaContainer.innerHTML += htmlOutput;
    })();
});