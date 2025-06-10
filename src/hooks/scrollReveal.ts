// scrollReveal.js (archivo único para gestionar ScrollReveal)
import ScrollReveal from "scrollreveal";

const revealElements = () => {
    
    const sr = ScrollReveal({
        origin: "top",
        duration: 1500,
        distance: "60px",
        delay: 0,
        beforeReveal(domEl) {
            if (domEl instanceof HTMLElement) {
                domEl.style.transform = '';
            }
        },
        reset: false,
    });

    sr.reveal(".fromTop", {
        interval: 100,
    });

    sr.reveal(".fromBottom", {
        origin: "bottom",
        delay: 50,
        interval: 100,
    });

    sr.reveal(".fromLeft", {
        origin: "left",
        delay: 50,
        interval: 150,
    });

    sr.reveal(".fromRight", {
        origin: "right",
        delay: 50,
        interval: 150,
    });

    sr.reveal(".fromCenter", {
        distance: "0px",
        opacity: 0,
        duration: 800,
        easing: "ease-out",
        interval: 400,
        delay: 500
    });

    sr.reveal(".fadeIn", {
        distance: "0px",
        opacity: 0,
        duration: 2000,
        easing: "ease-out",
        delay: 0,
        interval: 900,
    });

};

export default revealElements;