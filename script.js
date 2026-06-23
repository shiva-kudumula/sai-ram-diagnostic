function showSection(sectionId) {
    if (typeof display === 'function') {
        display(sectionId);
        return;
    }

    var section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
