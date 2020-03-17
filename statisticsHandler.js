var statisticsHandler = {
    measuring: false,
    startTime: undefined,
    currentLine: undefined,
    currentLineLength: undefined,
    timeSpentOnEachLine: [],
    meanTimeSpentOnEachSymbolOfEachLine: [],

    startMeasuring: function(line) {
        statisticsHandler.measuring = true
        statisticsHandler.startTime = performance.now()
        statisticsHandler.currentLine = line
        console.log(statisticsHandler.currentLine)
    },
    endMeasuring: function() {
        statisticsHandler.measuring = false
        let elapsedTime = performance.now() - statisticsHandler.startTime
        statisticsHandler.timeSpentOnEachLine.push(elapsedTime / 1000)
        statisticsHandler.meanTimeSpentOnEachSymbolOfEachLine.push(60 / (elapsedTime / statisticsHandler.currentLine.length / 1000))
        chartsHandler.charts['symbols/minute'].data.labels.push(statisticsHandler.currentLine)
        chartsHandler.charts['symbols/minute'].update(200)
    },

    clearStatistics: function() {
        statisticsHandler.timeSpentOnEachLine = []
        statisticsHandler.meanTimeSpentOnEachSymbolOfEachLine = []
        chartsHandler.charts['symbols/minute'].data.labels = []
        chartsHandler.charts['symbols/minute'].update(0)
    }
}