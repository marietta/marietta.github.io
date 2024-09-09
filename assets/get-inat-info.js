function fetchFruitInfo(fruit) {
    fetch("https://api.inaturalist.org/v1/taxa/autocomplete?q=" + fruit + "&rank=species,subspecies,hybrid&locale=hu")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.results && data.results.length > 0 && data.results[0].default_photo) {
                // Update preferred common name
                if (data.results[0].preferred_common_name) {
                    const preferredCommonName = data.results[0].preferred_common_name;
                    const preferredNameElement = document.getElementById(fruit + '-preferred_common_name');
                    if (preferredNameElement) {
                        preferredNameElement.innerText = preferredCommonName.charAt(0).toUpperCase() + preferredCommonName.slice(1);
                    }
                }

                // Update English common name
                if (data.results[0].english_common_name) {
                    const englishCommonName = data.results[0].english_common_name;
                    const englishNameElement = document.getElementById(fruit + '-english_common_name');
                    if (englishNameElement) {
                        englishNameElement.innerText = englishCommonName.charAt(0).toUpperCase() + englishCommonName.slice(1);
                    }
                }

                // Update cover image
                var imgElement = document.getElementById(fruit + '-cover');
                if (imgElement) {
                    imgElement.src = data.results[0].default_photo.medium_url;
                    imgElement.onload = function() {
                        // Recalculate Masonry layout after the image has loaded
                        msnry.layout();
                    };
                }
            } else {
                console.error('No results found for taxa:', fruit);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}