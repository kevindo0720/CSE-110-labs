function alertSubFunc(event) {
    const formEmail = document.getElementById("subscribe-form");
    const stringInputEmail = "Subscriber \"added\":" + formEmail.querySelector("input").value;
    window.alert(stringInputEmail);
}

// Add event listener to the form on window load
window.onload = function() {
    document.getElementById("subscribe-form").addEventListener("submit", alertSubFunc);
}