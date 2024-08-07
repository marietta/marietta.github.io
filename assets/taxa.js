document.addEventListener('DOMContentLoaded', function () {
    const taxaContainer = document.getElementById('taxa-container');
    const taxaData = JSON.parse(taxaContainer.dataset.taxa);

    function createTaxaElement(taxa) {
        const taxaDiv = document.createElement('div');
        taxaDiv.classList.add('taxonomy');

        const taxaHeader = document.createElement('h4');
        taxaHeader.textContent = taxa.name;
        taxaDiv.appendChild(taxaHeader);

        const subTaxaDiv = document.createElement('div');
        subTaxaDiv.classList.add('sub-taxa');

        if (Array.isArray(taxa.sub)) {
            taxa.sub.forEach(sub => {
                const subCategoryDiv = createTaxaElement(sub);
                subTaxaDiv.appendChild(subCategoryDiv);
            });
        } else if (typeof taxa.sub === 'string') {
            const subTaxaItem = document.createElement('p');
            subTaxaItem.textContent = taxa.sub;
            subTaxaDiv.appendChild(subTaxaItem);
        }

        taxaDiv.appendChild(subTaxaDiv);
        return taxaDiv;
    }

    taxaData.forEach(taxa => {
        const taxaElement = createTaxaElement(taxa);
        taxaContainer.appendChild(taxaElement);
    });

    const headers = document.querySelectorAll('.taxonomy h4');
    headers.forEach(header => {
        header.addEventListener('click', function () {
            this.classList.toggle('active');
            const subTaxa = this.nextElementSibling;
            if (subTaxa.style.display === 'block') {
                subTaxa.style.display = 'none';
            } else {
                subTaxa.style.display = 'block';
            }
        });
    });
});
