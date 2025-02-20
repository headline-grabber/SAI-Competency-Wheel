// Export button to save the chart as a PNG
const buttonWrapper = d3.select("body").append("div")
    .style("display", "flex")
    .style("justify-content", "center");  // Centers the button horizontally

const button = buttonWrapper.append("button")
    .text("Export as PNG")
    .style("background-color", "#4CAF50")  // Green background
    .style("color", "white")  // White text
    .style("border", "none")  // No border
    .style("padding", "15px 32px")  // Padding around the text
    .style("text-align", "center")  // Center text
    .style("text-decoration", "none")  // No underlines
    .style("display", "inline-block")
    .style("font-size", "16px")  // Text size
    .style("cursor", "pointer")  // Pointer on hover
    .style("border-radius", "8px")  // Rounded corners
    .on("click", function() {
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(d3.select("svg").node());
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = function() {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0);
            const a = document.createElement("a");
            a.href = canvas.toDataURL("image/png");
            a.download = "SAI Competency Wheel.png";
            a.click();
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
    });