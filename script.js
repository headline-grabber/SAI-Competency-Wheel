const data = [
    { category: 'Skills', name: 'Data analysis' },
    { category: 'Skills', name: 'Modelling' },
    { category: 'Skills', name: 'Solution design' },
    { category: 'Skills', name: 'Communication' },
    { category: 'Skills', name: 'Risk management' },
    { category: 'Attributes', name: 'Accountability' },
    { category: 'Attributes', name: 'Collaboration' },
    { category: 'Attributes', name: 'Resilience' },
    { category: 'Attributes', name: 'Judgement' },
    { category: 'Attributes', name: 'Professionalism' },
    { category: 'Knowledge', name: 'Industry issues' },
    { category: 'Knowledge', name: 'Regulatory matter' },
    { category: 'Knowledge', name: 'Actuarial standards' },
    { category: 'Knowledge', name: 'Functional expertise' },
    { category: 'Knowledge', name: 'Commercial awareness' }
];

const width = 600, height = 600, radius = Math.min(width, height) / 2;

// Define your color values
const colors = {
    dark: "#002a42",
    bright: "#00c6d7",
    mid: "#589199",
    light: "#bed6db"
};

// Create an ordered array of colors to cycle through
const colorOptions = [colors.light, colors.mid, colors.bright, colors.dark];

d3.select("body").style("background", "white");

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width/2}, ${height/2})`);

// Add padAngle to create small gaps between slices
const pie = d3.pie().value(1).padAngle(0.02);

// Add cornerRadius for rounded edges
const arc = d3.arc()
    .innerRadius(75)
    .outerRadius(radius - 55)
    .cornerRadius(2);

const categoryArc = d3.arc().innerRadius(radius - 50).outerRadius(radius - 10);

// Create slices (one for each data item)
const slices = svg.selectAll(".slice")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "slice")
    .on("click", function(event, d) {
        d3.select(this).select("path").attr("fill", function() {
            const currentColor = d3.select(this).attr("fill");
            let index = colorOptions.indexOf(currentColor);
            if(index === -1) index = 0;
            const nextColor = colorOptions[(index + 1) % colorOptions.length];
            return nextColor;
        });
    });

slices.append("path")
    .attr("d", arc)
    .attr("fill", colors.light);  // Start with the "light" color

slices.append("text")
    .attr("transform", d => {
        let centroid = arc.centroid(d);
        let angle = (d.startAngle + d.endAngle) / 2 * 180 / Math.PI;
        if (angle > 180 && angle < 360) angle += 180;
        return `translate(${centroid}) rotate(${angle - 90})`;
    })
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .attr("font-size", "16px")
    .attr("dy", "0.35em")
    .text(d => d.data.name);

// Prepare category data by grouping
const categoriesData = d3.groups(data, d => d.category)
    .map(d => ({ name: d[0] }));

// Create categories (one for each unique category)
const categories = svg.selectAll(".category")
    .data(pie(categoriesData))
    .enter()
    .append("g")
    .attr("class", "category")
    .on("click", function(event, d) {
        d3.select(this).select("path").attr("fill", function() {
            const currentColor = d3.select(this).attr("fill");
            let index = colorOptions.indexOf(currentColor);
            if(index === -1) index = 0;
            const nextColor = colorOptions[(index + 1) % colorOptions.length];
            return nextColor;
        });
    });

categories.append("path")
    .attr("d", categoryArc)
    .attr("fill", colors.light);  // Start with the "light" color

categories.append("text")
    .attr("transform", d => {
        let centroid = categoryArc.centroid(d);
        let angle = (d.data.name === "Knowledge") ? -60 : (d.data.name === "Skills") ? 60 : 0;
        return `translate(${centroid}) rotate(${angle})`;
    })
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .attr("font-size", "18px")
    .text(d => d.data.name);

svg.append("image")
    .attr("xlink:href", "data:image/jpeg;base64,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")
    .attr("x", -50)
    .attr("y", -50)
    .attr("width", 100)
    .attr("height", 100);

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