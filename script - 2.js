const buttonWrapper = d3.select("body").append("div")
    .style("display", "flex")
    .style("justify-content", "center");

const button = buttonWrapper.append("button")
    .text("Export as PNG")
    .style("background-color", "#4CAF50")
    .style("color", "white")
    .style("border", "none")
    .style("padding", "15px 32px")
    .style("text-align", "center")
    .style("text-decoration", "none")
    .style("display", "inline-block")
    .style("font-size", "16px")
    .style("cursor", "pointer")
    .style("border-radius", "8px")
    .on("click", function() {
        // Clone the SVG node
        const svgNode = document.querySelector("svg");
        const clone = svgNode.cloneNode(true);

        // Ensure the SVG namespace is present
        clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");

        // Set the cloned SVG's width and height to internal dimensions for export
        clone.setAttribute("width", internalWidth);
        clone.setAttribute("height", internalHeight);
        // Also (if needed) update the viewBox to match the internal dimensions
        clone.setAttribute("viewBox", `0 0 ${internalWidth} ${internalHeight}`);

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(clone);

        const canvas = document.createElement("canvas");
        canvas.width = internalWidth;
        canvas.height = internalHeight;
        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.onload = function() {
            // Fill background if needed
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, internalWidth, internalHeight);
            // Draw the image at full resolution
            ctx.drawImage(img, 0, 0);
            const a = document.createElement("a");
            a.href = canvas.toDataURL("image/png");
            a.download = "SAI Competency Wheel.png";
            a.click();
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
    });