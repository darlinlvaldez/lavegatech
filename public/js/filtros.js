function actualizarMarcas() {
    const categoriasSeleccionadas = Array.from(document.querySelectorAll('input[name="categoria"]:checked'))
        .map(checkbox => parseInt(checkbox.value));

    if (categoriasSeleccionadas.length === 0) {
        document.querySelectorAll('input[name="marca"]').forEach(checkbox => {
            checkbox.parentElement.style.display = 'block';
        });
        return;
    }

    fetch(`/store?categorias=${categoriasSeleccionadas.join(',')}`)
        .then(response => response.json())
        .then(marcasRelevantes => {
            document.querySelectorAll('input[name="marca"]').forEach(checkbox => {
                const marcaDiv = checkbox.parentElement;
                if (marcasRelevantes.includes(parseInt(checkbox.value))) {
                    marcaDiv.style.display = 'block';
                } else {
                    marcaDiv.style.display = 'none';
                    checkbox.checked = false;
                }
            });
        });
    }

function actualizarProductos() {
        
    const limite = document.getElementById('limite-select').value;
    const orden = document.getElementById('ordenar-select').value;
    const precioMin = document.getElementById('price-min').value;
    const precioMax = document.getElementById('price-max').value;

    const categorias = Array.from(document.querySelectorAll('input[name="categoria"]:checked'))
        .map(checkbox => checkbox.value)
        .join(',');

    const marcas = Array.from(document.querySelectorAll('input[name="marca"]:checked'))
        .map(checkbox => checkbox.value)
        .join(',');

    const pagina = 1;

    window.location.href = `/store/${pagina}?limite=${limite}&orden=${orden}&categoria=${categorias}
    &marca=${marcas}&precioMin=${precioMin}&precioMax=${precioMax}`;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("aplicar-filtro-precio").addEventListener("click", actualizarProductos);
});