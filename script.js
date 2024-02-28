
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
            "Distributed-Attendance-Application": ""
        },
        "Full-Stack": {
            "eCommerce": ""
        },
        "Machine Learning": {
            "Website to Predict Likelihood Employement": "NICE"
            "Predicting-College-Graduation-Rate": "",
            "MLOps_Library": "",
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
        projectsSection.innerHTML = '<h2>Relevant Projects</h2><ul class="categories-list">'; // Start categories list

        Object.keys(projects).forEach(category => {
            const categoryList = document.createElement('li');
            categoryList.classList.add('category');
            categoryList.innerHTML = `<h3>${category}</h3>`;
            const listElement = document.createElement('ul');

            Object.keys(projects[category]).forEach(repoName => {
                const repo = repos.find(r => r.name === repoName);
                const listItem = document.createElement('li');

                if (projects[category][repoName]) {
                    listItem.innerHTML = `
                        <h4>${repoName}</h4>
                        <p>${projects[category][repoName]}</p>
                    `;
                } else if (repo) {
                    listItem.innerHTML = `
                        <h4>${repo.name}</h4>
                        <p>${repo.description || 'No description available.'}</p>
                        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                    `;
                }
                listElement.appendChild(listItem);
            });

            categoryList.appendChild(listElement);
            projectsSection.querySelector('.categories-list').appendChild(categoryList);
        });

        projectsSection.innerHTML += '</ul>'; // End categories list
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    fetchGitHubProjects();
});
