var fb2TextExtractor = {
    extract: function(fb2FileText) {
        indexBodyStartsAt = fb2FileText.indexOf('<body>')
        indexBodyEndsAt = fb2FileText.indexOf('</body>')
        body = fb2FileText.substring(indexBodyStartsAt, indexBodyEndsAt)
        
        let normalText = ''
        while (true) {
            let openTagIndex = body.indexOf('<p>')
            if (openTagIndex === -1)
                break
            body = body.substring(openTagIndex + 3)
            let closeTagIndex = body.indexOf('</p>')
            if (closeTagIndex === -1)
                break
            normalText += body.substring(0, closeTagIndex) + '\n'
        }
        
        console.log(normalText.substring(0, 200))
        return normalText
    }
}