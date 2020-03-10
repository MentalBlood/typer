var chartsHandler = {
    defaultCanvas: document.getElementById('defaultChartCanvas'),
    charts: {},

    addChart: function(canvas, name, data) {
        if (canvas == 'default')
        canvas = this.defaultCanvas
        this.charts[name] = new Chart(canvas, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: name,
                    data: data
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })
    }
}

chartsHandler.addChart('default', 'time spent on each line', statisticsHandler.timeSpentOnEachLine)