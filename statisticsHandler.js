var statisticsHandler = {
    measuring: false,
    startTime: undefined,
    currentLine: undefined,
    currentLineLength: undefined,
    timeSpentOnEachLine: [],
    meanTimeSpentOnEachSymbolOfEachLine: [],

    startMeasuring: function(line) {
        this.measuring = true
        this.startTime = performance.now()
        this.currentLine = line
    },
    endMeasuring: function() {
        this.measuring = false
        let elapsedTime = performance.now() - this.startTime
        this.timeSpentOnEachLine.push(elapsedTime / 1000)
        this.meanTimeSpentOnEachSymbolOfEachLine.push(elapsedTime / this.currentLine.length / 1000)
        chartsHandler.charts['mean time spent on symbol'].data.labels.push(this.currentLine)
        chartsHandler.charts['mean time spent on symbol'].update(200)
    }
}