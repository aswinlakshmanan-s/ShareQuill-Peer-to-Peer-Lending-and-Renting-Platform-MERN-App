var productsData = false;
document.addEventListener("DOMContentLoaded", function () {
    if (productsData === false) {
    
        setTimeout(function() {
            var spinnerContainer = document.querySelectorAll(".spinner-container");
            spinnerContainer.forEach(function(spinner) {
                spinner.classList.add("d-none");
            });
    
            var cardImages = document.querySelectorAll(".card-img-top");
            cardImages.forEach(function(image) {
                image.classList.remove("d-none");
            });
    
            var cardBodies = document.querySelectorAll(".card-body");
            cardBodies.forEach(function(body) {
                body.classList.remove("d-none");
            });
    
            var shimmer = document.getElementById("cardGroup");
            shimmer.style.background = "linear-gradient(90deg, transparent, transparent, transparent)";
        }, 2000);
    }
});

(function() {
    // Add event listener
    document.addEventListener("mousemove", parallax);
    const elem = document.querySelector("#parallax");
    // Magic happens here
    function parallax(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/2;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
        let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
        let _depth3 = `${50 - (_mouseX - _w) * 0.0}% ${50 - (_mouseY - _h) * 0.00}%`;
        let x = `${_depth3}, ${_depth2}, ${_depth1}`;
        elem.style.backgroundPosition = x;
    }

})();