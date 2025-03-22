function openEmailClient(event) {
    // Allow the default mailto: behavior to open the email client
    return true;
}

        document.getElementById('currentYear').textContent = new Date().getFullYear();

        // JavaScript for Loading Spinner
        window.addEventListener('load', () => {
            const spinner = document.getElementById('loading-spinner');
            spinner.style.display = 'none';
        });

        // Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default jump behavior
        const targetId = this.getAttribute('href'); // Get the target section ID
        const targetElement = document.querySelector(targetId); // Find the target element

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth', // Smooth scroll
                block: 'start' // Align to the top of the section
            });
        }
    });
});