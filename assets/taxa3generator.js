document.addEventListener("DOMContentLoaded", function() {
    const taxaContainer = document.getElementById('taxa-container');
    const taxaData = JSON.parse(taxaContainer.getAttribute('data-taxa'));

    function generateHtml(taxa, isTopLevel = false) {
        let html = '';

        taxa.forEach(item => {
            const parts = item.name.split(' · ');
            const firstWord = parts[0].split(' ')[0]; // Extract the first word
            const secondWord = parts[0].split(' ')[1]; // Extract the second word for the href
            const restOfName = parts[0].substring(firstWord.length + secondWord.length + 2); // Get the rest of the name after the first two words
            const remainingName = parts.slice(1).join(' · '); // Join the remaining parts of the name

            html += `<details ${isTopLevel ? 'open' : ''}>\n`;
            html += `    <summary data-content="${secondWord}">${firstWord} <a class="button button--secondary button--pill button--sm" href="/taxonomy/${secondWord}">${secondWord}</a>${restOfName}${remainingName ? ' ' + remainingName : ''}</summary>\n`;

            if (isTopLevel)
                html += `    <div class="top-taxa3">\n`;
            else
                html += `    <div class="sub-taxa3">\n`;

            if (item.sub) {
                html += generateHtml(item.sub); // Recursive call for sub-levels
            }

            html += `    </div>\n`;
            html += `</details>\n`;
        });

        return html;
    }

    const htmlOutput = generateHtml(taxaData, true); // Pass true for top-level items
    taxaContainer.innerHTML += htmlOutput;
});
