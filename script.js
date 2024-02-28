
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
            "Predicting-College-Graduation-Rate": "",
            "MLOps_Library": "",
            "Website to Predict Likelihood Employement": "NICE"
        },
        "Games": {
            "Gravitys-Clutch": "",
            "Crossy_Road": "",
            "Rasterizer": "Made a rasterizer in C"
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
                    listItem.innerHTML += '<p><a href="${repo.html_url}" target="_blank">\nGithub repo link</a></p>'
                }

                listElement.appendChild(listItem);
            });

            categoryItem.appendChild(listElement);
            categoriesList.appendChild(categoryItem);
        });
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetchGitHubProjects();
});
