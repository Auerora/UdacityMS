/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

let navigationData = {
    Home: {
        name: 'Home',
        href: '#home'
    },
    Section1: {
        name: 'Section 1',
        href: 'section1'
    },
    Section2: {
        name: 'Section 2',
        href: 'section2'
    },
    Section3: {
        name: 'Section 3',
        href: 'section3'
    },
    Section4: {
        name: 'Section 4',
        href: 'section4'
    },
    Footer: {
        name: 'Udacity',
        href: 'footer'
    }
};
const navBar = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const addClass = (section) => {
    section.classList.add("active");
}
const removeClass = (section) => {
    section.classList.remove("active");
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const addNavigationItems = () => {
    const navParent = document.getElementById("navbar__list");
    const fragment = document.createDocumentFragment();
    const navigationItems = Object.entries(navigationData);
    const navigationCount = Object.keys(navigationData).length;
    for (let i = 0; i < navigationCount; i++) {
        const navigationItem = document.createElement('li');
        const navigationLink = document.createElement('a');
        if (navigationItems[i][1].name == 'Home') {
            navigationLink.innerText = navigationItems[i][1].name;
            navigationLink.href = '#home';
            navigationLink.classList.add("active");
        } else {
            navigationLink.innerText = navigationItems[i][1].name
            navigationLink.href = `#${navigationItems[i][1].href}`;
        }
        navigationLink.classList.add("menu__link");
        navigationItem.classList.add("menu__item");
        fragment.appendChild(navigationItem.appendChild(navigationLink));

    }
    navParent.appendChild(fragment);

};
// Add class 'active' to section when near top of viewport
const activeState = (e) => {
    const navigationLinks = document.querySelectorAll(".menu__link");
    const landingSections = document.querySelectorAll("section");
    window.addEventListener('scroll', (event) => {
        console.log(navigationLinks[0].classList.contains("active"));
  
        let scrollPosition = window.scrollY;
        // Adding active class to Navigation
        navigationLinks.forEach(link => {
            let navLink = document.querySelector(link.hash);
            if (navLink.offsetTop - navBar.offsetHeight <= scrollPosition && navLink.offsetTop + navLink.offsetHeight - navBar.offsetHeight > scrollPosition) {
                if (navigationLinks[0].classList.contains("active") == true) {
                    navigationLinks[0].classList.remove("active");
                }
                    addClass(link);
            } else {
                removeClass(link);
            }
        });
        // Adding active class to Section
        landingSections.forEach(section => {
            if (section.offsetTop - navBar.offsetHeight <= scrollPosition && section.offsetTop + section.offsetHeight - navBar.offsetHeight > scrollPosition) {
                addClass(section);
            } else {
                removeClass(section);
            }
        })

    });
};

// Scroll to anchor ID using scrollTO event 
const scrollAction = () => {
    let navigationLinks = document.querySelectorAll(".menu__link");
    console.log(navigationLinks);
    for (const link of navigationLinks) {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const href = link.getAttribute("href");
            const offsetTop = document.querySelector(href).offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    };
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

window.addEventListener('DOMContentLoaded', async () => {
    // Build menu
    await addNavigationItems();
    // Scroll to section on link click
    scrollAction();
    // Set sections as active
    activeState();
})


