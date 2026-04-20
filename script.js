const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

function showTab(tab) {
    tabs.forEach(t => {
        t.setAttribute('aria-selected', 'false');
        t.tabIndex = -1;
    });

    panels.forEach(p => p.hidden = true);

    tab.setAttribute('aria-selected', 'true');
    tab.tabIndex = 0;

    document.getElementById(tab.getAttribute('aria-controls')).hidden = false;
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => showTab(tab));
});

document.querySelector('[role="tablist"]').addEventListener('keydown', (e) => {
    const currentIndex = [...tabs].indexOf(document.activeElement);
    let nextIndex = currentIndex;

if (e.key === 'ArrowRight') {
    nextIndex++;
}

if (e.key === 'ArrowLeft') {
    nextIndex--;
}

if (e.key === 'Home') {
    nextIndex = 0;
}

if (e.key === 'End') {
    nextIndex = tabs.length - 1;
}

if (nextIndex < 0) {
    nextIndex = tabs.length - 1;
}

if (nextIndex >= tabs.length) {
    nextIndex = 0;
}
    if (nextIndex !== currentIndex) {
        e.preventDefault();
        tabs[nextIndex].focus();
        showTab(tabs[nextIndex]);
    }
});