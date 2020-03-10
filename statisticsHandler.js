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
        this.timeSpentOnEachLine.push(elapsedTime)
        chartsHandler.charts['time spent on each line'].data.labels.push(this.currentLine)
        chartsHandler.charts['time spent on each line'].update(0)
        this.meanTimeSpentOnEachSymbolOfEachLine.push(elapsedTime / this.currentLine.length)
    }
}