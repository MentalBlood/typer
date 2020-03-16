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
        statisticsHandler.meanTimeSpentOnEachSymbolOfEachLine.push(elapsedTime / statisticsHandler.currentLine.length / 1000)
        chartsHandler.charts['mean time spent on symbol'].data.labels.push(statisticsHandler.currentLine)
        chartsHandler.charts['mean time spent on symbol'].update(200)
    },

    clearStatistics: function() {
        statisticsHandler.timeSpentOnEachLine = []
        statisticsHandler.meanTimeSpentOnEachSymbolOfEachLine = []
        chartsHandler.charts['mean time spent on symbol'].data.labels = []
        chartsHandler.charts['mean time spent on symbol'].update(0)
    }
}