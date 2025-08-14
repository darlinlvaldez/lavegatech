document.addEventListener('DOMContentLoaded', () => {
    const rangoSelect = document.getElementById('rangoSelect');
    const tipoGraficoSelect = document.getElementById('tipoGraficoSelect');
    const mesSelect = document.getElementById('mesSelect');
    const fechaSelect = document.getElementById('fechaSelect');
    const labelMesSelect = document.getElementById('labelMesSelect');
    const labelFechaSelect = document.getElementById('labelFechaSelect');
    const ctx = document.getElementById('ventasChart').getContext('2d');
    let ventasChart = null;

    function toggleInputs() {
        const rango = rangoSelect.value;
        mesSelect.style.display = rango === 'mes' ? 'inline-block' : 'none';
        labelMesSelect.style.display = rango === 'mes' ? 'inline-block' : 'none';

        fechaSelect.style.display = rango === 'fecha-especifica' ? 'inline-block' : 'none';
        labelFechaSelect.style.display = rango === 'fecha-especifica' ? 'inline-block' : 'none';

        if (rango !== 'mes') mesSelect.value = '';
        if (rango !== 'fecha-especifica') fechaSelect.value = '';
    }

    async function loadData() {
        const rango = rangoSelect.value;
        const tipoGrafico = tipoGraficoSelect.value;
        const mes = mesSelect.value;
        const fecha = fechaSelect.value;

        let url = `/api/admin/ventas-por-fecha?rango=${rango}`;
        if (mes && rango === 'mes') url += `&mes=${mes}`;
        if (fecha && rango === 'fecha-especifica') url += `&fecha=${fecha}`;

        const res = await fetch(url);
        const data = await res.json();

        const etiquetas = data.map(item => {
            if (rango === 'fecha-especifica') {
                return item.fecha;
            } else if (rango === 'mes') {
                const [year, month] = item.fecha.split('-');
                return `${month}/${year}`;
            } else if (rango === 'año') {
                return item.fecha;
            } else {
                const date = new Date(item.fecha);
                return date.toLocaleDateString('es-DO');
            }
        });

        const ventas = data.map(item => Number(item.totalVentas));

        if (ventasChart) ventasChart.destroy();

        ventasChart = new Chart(ctx, {
            type: tipoGrafico,
            data: {
                labels: etiquetas,
                datasets: [{
                    label: `Ventas (${rango})`,
                    data: ventas,
                    backgroundColor: tipoGrafico === 'bar'
                        ? [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(199, 199, 199, 0.6)'
                        ]
                        : 'transparent',
                    borderColor: tipoGrafico === 'bar'
                        ? [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(199, 199, 199, 1)'
                        ]
                        : 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    fill: tipoGrafico === 'line',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { title: { display: true, text: 'Fecha' } },
                    y: { title: { display: true, text: 'Ventas ($)' }, beginAtZero: true }
                }
            }
        });
    }

    rangoSelect.addEventListener('change', () => {
        toggleInputs();
        loadData();
    });

    tipoGraficoSelect.addEventListener('change', loadData);
    mesSelect.addEventListener('change', loadData);
    fechaSelect.addEventListener('change', loadData);

    toggleInputs();
    loadData();
});