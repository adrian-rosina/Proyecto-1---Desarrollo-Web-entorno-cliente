const productos = [
    { id: 1, nombre: "Teclado", precio: 30, categoria: "perifericos" },
    { id: 2, nombre: "Ratón", precio: 20, categoria: "perifericos" },
    { id: 3, nombre: "Monitor", precio: 200, categoria: "pantallas" },
    { id: 4, nombre: "Portátil", precio: 800, categoria: "ordenadores" }
  ];
  
  let carrito = [];
  
  const listaProductos = document.getElementById("listaProductos");
  const listaCarrito = document.getElementById("listaCarrito");
  const totalCarrito = document.getElementById("totalCarrito");
  

  function renderProductos(lista) {
    listaProductos.innerHTML = "";
  
    lista.forEach(p => {
      const div = document.createElement("div");
      div.classList.add("producto");
  
      div.innerHTML = `
        <h3>${p.nombre}</h3>
        <p class="precio">${p.precio} €</p>
        <button onclick="añadir(${p.id})">Añadir al carrito</button>
      `;
  
      listaProductos.appendChild(div);
    });
  }
  
  
  function añadir(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    renderCarrito();
  }
  
  
  function renderCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;
  
    carrito.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.nombre} - ${p.precio}€`;
      listaCarrito.appendChild(li);
      total += p.precio;
    });
  
    totalCarrito.textContent = total;
  }
  

  document.getElementById("filtroCategoria").addEventListener("change", (e) => {
    const cat = e.target.value;
  
    if (cat === "todas") {
      renderProductos(productos);
    } else {
      renderProductos(productos.filter(p => p.categoria === cat));
    }
  });
  
 
  document.getElementById("formCompra").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();
    const confirm = document.getElementById("confirmPassword").value.trim();
  
    let errores = [];
  
    if (!nombre || !email || !pass || !confirm) {
      errores.push("Todos los campos son obligatorios");
    }
  
    if (!email.includes("@")) {
      errores.push("Email inválido");
    }
  
    if (pass !== confirm) {
      errores.push("Las contraseñas no coinciden");
    }
  
    const div = document.getElementById("mensajesFormulario");
    div.innerHTML = "";
  
    if (errores.length > 0) {
      div.className = "error";
      div.innerHTML = errores.join("<br>");
    } else {
      div.className = "exito";
      div.innerHTML = "Compra realizada correctamente, nuestro equipo se pondra en contacto con usted";
    }
  });
  
  renderProductos(productos);