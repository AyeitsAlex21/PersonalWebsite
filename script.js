
document.querySelectorAll('a[href^="#"]').forEach(anchor => { // smooth scrolling using links
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


async function fetchGitHubProjects() {
    const username = 'AyeitsAlex21'; // Your GitHub username
    const apiUrl = `https://api.github.com/users/${username}/repos`;

    const projects = {
        "Research": {
            "Dynamicly-Changing-Node-Topology": ""
        },
        "Full-Stack": {
            "eCommerce": ""
        },
        "Machine Learning": {
            "Website to Predict Likelihood Employement": "Using the Employee dataset from kaggle I wrangled the data, \
                trained and tuned multiple machine learning models including KNN, Logistic Regression, XG Boost, and ANN using \
                python libraries such as scikit-learn and tensorflow-keras \
                <p><a href= 'https://youtu.be/73nwfpDMAlE' > (Live Demo)</a></p>",

            "Predicting-College-Graduation-Rate": "",

            "MLOps_Library": "",
        },
        "Games": {
            "Gravitys-Clutch": "",
            "Crossy_Road": "",
            "Rasterizer to Render a Video": "Made a rasterizer in C using many advanced \n \
                graphics techniques to make a video of a human heart <p><a href= 'https://www.youtube.com/shorts/fpVsFeTC4gM' > \
                (Live Demo)</a></p>"
            
        },
    };

    try {
        const response = await fetch(apiUrl);
        const repos = await response.json();

        const projectsSection = document.querySelector('#projects');
        projectsSection.innerHTML = '<h2>Relvant Projects</h2><ul class="categories-list" style="list-style-type: none;"></ul>'; // Use inline styles for simplicity

        const categoriesList = document.querySelector('.categories-list');

        Object.keys(projects).forEach(category => {
            const categoryItem = document.createElement('li');
            categoryItem.innerHTML = `<h3 style="margin-bottom: 10;">${category}</h3>`;
            const listElement = document.createElement('ul');
            listElement.style.paddingLeft = "20px"; // Add some padding for visual indentation

            Object.keys(projects[category]).forEach(repoName => {
                const repo = repos.find(r => r.name === repoName);
                const listItem = document.createElement('li');
                listItem.style.marginBottom = "15px"; // Add margin for spacing between items

                if (projects[category][repoName]) {
                    listItem.innerHTML = `<strong>${repoName}</strong>: ${projects[category][repoName]}`;
                } else if (repo) {
                    let description = repo.description || 'No description available.';
                    let githubPagesUrl = `https://${username}.github.io/${repoName}/`;
                    listItem.innerHTML = `<strong>${repo.name}</strong>: ${description}`;
                    // Check if GitHub Pages is active
                    if (repo.has_pages) {
                        listItem.innerHTML += ` <p><a href="${githubPagesUrl}" target="_blank">(Live Demo)</a></p>`;
                    }
                    listItem.innerHTML += `<p><a href="https://github.com/AyeitsAlex21/${repo.name}" target="_blank"> Github repo link</a></p>`;
                }

                listElement.appendChild(listItem);
            });

            categoryItem.appendChild(listElement);
            categoriesList.appendChild(categoryItem);
        });

        document.querySelectorAll('a').forEach(function(link) {
            link.setAttribute('target', '_blank');
        });
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetchGitHubProjects();
});
  
