// Cambio de ICONO al Menu (Movil)
const toggle = document.getElementById("toggle");
let isChecked = false;

toggle.addEventListener("click", function(){
    const iconToggle = document.getElementById("iconToggle");
    const icono = document.createElement("i");
    isChecked = !isChecked;

    if (isChecked){
        icono.classList.add("fa-solid", "fa-xmark");
        iconToggle.textContent = '';
        iconToggle.appendChild(icono);
    } else {
        icono.classList.add("fa-solid", "fa-bars");
        iconToggle.textContent = '';
        iconToggle.appendChild(icono);
    }
})

// Barra de Busqueda Funcional
const search = document.getElementById("search");
search.addEventListener("keyup", async (e) => {
    const valor = e.target.value;
    const data = await getAPI(urlPerros);

    const mostrarValores = Object.keys(data.message).filter((clave) => clave.toLowerCase().includes(valor.toLowerCase()));

    const navLinks = document.getElementById("nav__links");
    navLinks.textContent = '';

    if (mostrarValores == ''){
        getApiDom(urlPerros, createImage);
    } else {
        mostrarValores.forEach( keys => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.textContent = keys;
            a.value = keys;
            a.id = keys;
            a.href = '';
            li.appendChild(a);
            navLinks.appendChild(li);
    
            a.addEventListener("click", async (e) => {
                e.preventDefault();
                imagenRaza(e.target.value)
            });
        })
    }
})