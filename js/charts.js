// js/charts.js - VERSIÓN FINAL 100% CORREGIDA
document.addEventListener('DOMContentLoaded', () => {
    const DATA_PATH = 'data/';
    const status = (id, msg, success = true) => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = msg;
            el.className = success ? 'status success' : 'status error';
        }
    };

    const loadChart = (id, file, parser, statusId, isText = false) => {
        const ctx = document.getElementById(id)?.getContext('2d');
        if (!ctx) return;

        const fetchData = isText
            ? fetch(DATA_PATH + file).then(r => r.text())
            : fetch(DATA_PATH + file).then(r => r.text()).then(csv => {
                const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });
                if (parsed.errors.length > 0 && parsed.data.length === 0) throw new Error('CSV vacío');
                return parsed.data;
            });

        fetchData
            .then(data => {
                const config = parser(data);
                new Chart(ctx, {
                    type: config.type,
                    data: config.data,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { 
                            legend: config.legend !== false ? { display: true } : { display: false },
                            tooltip: { enabled: true }
                        },
                        scales: config.scales || { 
                            y: { beginAtZero: true },
                            x: { ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 } }
                        }
                    }
                });
                status(statusId, `Cargado: ${Array.isArray(config.data.labels) ? config.data.labels.length : config.data.datasets[0].data.length} elementos`);
            })
            .catch(err => {
                console.error(`Error en ${file}:`, err);
                status(statusId, `Error: ${err.message}`, false);
            });
    };

    // P1 - final.csv
    loadChart('chartP1', 'final.csv', data => {
        const map = {};
        data.forEach(r => {
            const c = r.cliente?.trim() || 'Desconocido';
            map[c] = (map[c] || 0) + parseFloat(r.cantidad) || 0;
        });
        return { type: 'bar', data: { labels: Object.keys(map), datasets: [{ label: 'Cantidad', data: Object.values(map), backgroundColor: '#3b82f6' }] } };
    }, 'statusP1');

    // P3 - Salida_ventas_trimestre.txt
    loadChart('chartP3', 'Salida_ventas_trimestre.txt', text => {
        const lines = text.trim().split('\n').slice(1); // Saltar encabezado
        const cats = {};
        lines.forEach(l => {
            const [q, c, v] = l.split('\t');
            if (!cats[c]) cats[c] = {1:0,2:0,3:0,4:0};
            cats[c][q] = parseFloat(v) || 0;
        });
        const datasets = Object.keys(cats).map((c, i) => ({
            label: c,
            data: [1,2,3,4].map(q => cats[c][q] || 0),
            backgroundColor: ['#f97316', '#8b5cf6', '#10b981'][i % 3]
        }));
        return { type: 'bar', data: { labels: ['Q1','Q2','Q3','Q4'], datasets }, scales: { x: { stacked: true }, y: { stacked: true } } };
    }, 'statusP3', true);

    // P4 - salida.xls.csv (agrupar por fecha)
    loadChart('chartP4', 'salida.xls.csv', data => {
        const map = {};
        data.forEach(r => {
            const fecha = r.Fecha?.split(' ')[0] || 'Desconocida';
            map[fecha] = (map[fecha] || 0) + parseFloat(r.Calculo) || 0;
        });
        const sorted = Object.entries(map).sort((a,b) => a[0].localeCompare(b[0]));
        return { type: 'line', data: { labels: sorted.map(x => x[0]), datasets: [{ label: 'Ventas', data: sorted.map(x => x[1]), borderColor: '#f59e0b', fill: false }] } };
    }, 'statusP4');

    // P9 - consulta5.csv
    loadChart('chartP9', 'consulta5.csv', data => {
        const products = data.map(r => r.NOMBRE.trim());
        const regions = ['PACÍFICO', 'CENTRAL', 'OCCIDENTE'];
        const datasets = regions.map((r, i) => ({
            label: r,
            data: products.map(p => parseFloat(data.find(x => x.NOMBRE === p)?.[r]) || 0),
            backgroundColor: ['#f97316', '#10b981', '#3b82f6'][i]
        }));
        return { type: 'bar', data: { labels: products, datasets }, scales: { x: { stacked: true }, y: { stacked: true } } };
    }, 'statusP9');

    // === LOS DEMÁS GRÁFICOS (SIN CAMBIOS) ===
    // P2
    loadChart('chartP2', 'Salida.txt', text => {
        const lines = text.trim().split('\n').slice(1);
        const labels = [], values = [];
        lines.forEach(l => {
            const parts = l.split('\t');
            if (parts.length >= 4) {
                labels.push(parts[0].trim());
                values.push(parseFloat(parts[3]) || 0);
            }
        });
        return { type: 'bar', data: { labels, datasets: [{ label: 'Ventas', data: values, backgroundColor: '#10b981' }] } };
    }, 'statusP2', true);

    // P6
    loadChart('chartP6', 'analisis_ventas.json', text => {
        const data = JSON.parse(text);
        const map = {};
        data.forEach(r => {
            const c = r.categoria || 'Otros';
            map[c] = (map[c] || 0) + parseFloat(r.ingreso_total) || 0;
        });
        return { type: 'bar', data: { labels: Object.keys(map), datasets: [{ label: 'Ingresos', data: Object.values(map), backgroundColor: '#8b5cf6' }] } };
    }, 'statusP6', true);

    // P8
    loadChart('chartP8', 'ventas_por_producto.csv', data => {
        const labels = data.map(r => r.NOMBRE.trim());
        const values = data.map(r => parseFloat(r.VENTAS));
        return { type: 'bar', data: { labels, datasets: [{ label: 'Ventas', data: values, backgroundColor: '#ec4899' }] } };
    }, 'statusP8');

    // P10
    loadChart('chartP10', 'ventas_olap.csv', data => {
        const labels = data.map(r => r.ciudad);
        const values = data.map(r => parseFloat(r.SUMImporte));
        return { type: 'bar', data: { labels, datasets: [{ label: 'Importe', data: values, backgroundColor: '#6366f1' }] } };
    }, 'statusP10');

    // P11
    loadChart('chartP11', 'Consulta1.csv', data => {
        const map = {};
        data.forEach(r => {
            const c = r.category?.trim() || 'Otros';
            map[c] = (map[c] || 0) + 1;
        });
        return { type: 'pie', data: { labels: Object.keys(map), datasets: [{ data: Object.values(map), backgroundColor: ['#3b82f6','#10b981','#f97316','#8b5cf6'] }] }, legend: true };
    }, 'statusP11');
});