/* document.querySelectorAll('.card-img-top').forEach(function(img) {
    const originalSrc = img.src;
    const hoverSrc = img.getAttribute('data-hover');

    img.addEventListener('mouseover', function() {
        img.src = hoverSrc;
    });

    img.addEventListener('mouseout', function() {
        img.src = originalSrc;
    });
});
 */



/* document.querySelectorAll('.card-img-top').forEach(function(img) {
    const hoverSrc = img.getAttribute('data-hover');
    const hoverImg = document.createElement('img');
    
    hoverImg.src = hoverSrc;
    hoverImg.style.position = 'absolute';
    hoverImg.style.top = '0';
    hoverImg.style.left = '0';
    hoverImg.style.opacity = '0';
    hoverImg.style.transition = 'opacity 0.5s ease-in-out';

    img.parentNode.style.position = 'relative';
    img.parentNode.appendChild(hoverImg);

    img.addEventListener('mouseover', function() {
        hoverImg.style.opacity = '1';
    });

    img.addEventListener('mouseout', function() {
        hoverImg.style.opacity = '0';
    });
}); */


/* Transicion suave de las imagenes */


document.querySelectorAll('.card-img-top').forEach(function(img) {
    const originalSrc = img.src;
    const hoverSrc = img.getAttribute('data-hover');

    img.addEventListener('mouseover', function() {
        img.style.opacity = '0';
        setTimeout(function() {
            img.src = hoverSrc;
            img.style.opacity = '1';
        }, 200); // La transición suave sucede en 200ms
    });

    img.addEventListener('mouseout', function() {
        img.style.opacity = '0';
        setTimeout(function() {
            img.src = originalSrc;
            img.style.opacity = '1';
        }, 200);
    });
});

/*script que hace el llamado a la api del clima */

document.addEventListener("DOMContentLoaded", function() {
    const apiKey = '5a26476e697c184cee59a17f499aaf2b'; // Reemplaza con tu propia API Key
    const city = 'Alajuela'; // Puedes cambiarlo por la ciudad que desees
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
                   
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
             // Extraer la ciudad, descripción del clima, y temperatura
        const ciudad = data.name;
        const descripcion = data.weather[0].description;
        const temperatura = data.main.temp;

        // Seleccionar el contenedor donde quieres mostrar esta información
        const weatherContainer = document.getElementById('weather');

        // Crear el contenido HTML
        weatherContainer.innerHTML = `
            <h2>Clima en ${ciudad}</h2>
            <p>${descripcion.charAt(0).toUpperCase() + descripcion.slice(1)}</p>
            <p>Temperatura: ${temperatura}°C</p>
        `;




         /*    const ciudad = data.name;
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const weatherElement = document.getElementById('weather');
            weatherElement.innerText = `Temp: ${temperature}°C, ${description}`; */
        })
        .catch(error => {
            console.error('Error al obtener los datos del clima:', error);
            document.getElementById('weather').innerText = 'No se pudo cargar el clima.';
        });
});


/* script que carga los datos desde el archivo JSON y los inserta en el DOM cuando la página se cargue. */

document.addEventListener("DOMContentLoaded", function() {
    fetch('assets/data/productos.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('productos-container');
            data.forEach(producto => {
                const col = document.createElement('div');
                col.className = 'col-md-4';
                col.innerHTML = `
                    <div class="card">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}" data-hover="${producto.imagenHover}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.titulo}</h5>
                            <p class="card-text">${producto.descripcion}</p>
                            <a href="#" class="btn btn-primary">Ver detalles</a>
                        </div>
                    </div>`;
                container.appendChild(col);

                // Agregar efecto de hover dinámicamente
                const imgElement = col.querySelector('.card-img-top');
                imgElement.addEventListener('mouseover', function() {
                    imgElement.src = producto.imagenHover;
                });
                imgElement.addEventListener('mouseout', function() {
                    imgElement.src = producto.imagen;
                });
            });
        })
        .catch(error => console.error('Error cargando los productos:', error));
});



    /* script Ordenar productos */
    new Vue({
        el: '#app',
        data: {
            filterText: '',
            sortKey: 'name',
            products: [
                {
                    id: 1,
                    name: 'Matrimonio',
                    description: 'Anillo de Matrimonio',
                    priceWhiteGold: 345000,
                    priceYellowGold: 300000,
                    priceRoseGold: 320000,
                    priceSilver: 60000,
                    image: 'images/WhatsApp Image 2023-06-04 at 19.44.33.jpeg'
                },
                {
                    id: 2,
                    name: 'Product 2',
                    description: 'Descripción del Producto 2',
                    priceWhiteGold: 525000,
                    priceYellowGold: 480000,
                    priceRoseGold: 515000,
                    priceSilver: 80000,
                    image: 'images/WhatsApp Image 2023-06-04 at 19.44.35.jpeg'
                },
                // Agrega más productos aquí...
            ]
        },
        computed: {
            filteredAndSortedProducts() {
                // Filtrar productos
                let filtered = this.products.filter(product => {
                    return product.name.toLowerCase().includes(this.filterText.toLowerCase());
                });
    
                // Ordenar productos
                let sorted = filtered.sort((a, b) => {
                    if (this.sortKey === 'price') {
                        return a.priceWhiteGold - b.priceWhiteGold; // Ordenar por el precio de Oro Blanco
                    } else if (this.sortKey === 'name') {
                        return a.name.localeCompare(b.name);
                    }
                });
    
                return sorted;
            }
        },
        filters: {
            currency(value) {
                return parseFloat(value).toLocaleString('es-CR'); // Formato de moneda en colones costarricenses
            }
        }
    });
    


