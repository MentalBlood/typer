var fb2TextExtractor = {
    extract(fb2FileText) {
        const indexBodyStartsAt = fb2FileText.indexOf("<body>");
        const indexBodyEndsAt = fb2FileText.indexOf("</body>");
        let body = fb2FileText.substring(indexBodyStartsAt, indexBodyEndsAt);
        
        let normalText = "";
        while (true) {
            let openTagIndex = body.indexOf("<p>");
            if (openTagIndex === -1)
                break;
            body = body.substring(openTagIndex + 3);
            let closeTagIndex = body.indexOf("</p>");
            if (closeTagIndex === -1)
                break;
            normalText += body.substring(0, closeTagIndex) + "\n";
        }

        return normalText;
    }
}