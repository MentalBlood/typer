var animationsHandler = {
    timerId: false,
    onUpdate: false,

    startUpdating: function() {
        if (animationsHandler.onUpdate)
            animationsHandler.onUpdate()
        TWEEN.update()
        animationsHandler.timerId = setTimeout(animationsHandler.startUpdating, 15)
    },

    stopUpdating: function() {
        clearInterval(timerId)
    }
}

animationsHandler.startUpdating()