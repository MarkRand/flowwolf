

// Put the paper in a global variable
var paper;

// Stores the links between shapes

connections = [];

// Stores the shapes

shapes = [];

// Dragger function
dragger = function () {
    this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
    this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
    this.animate({"fill-opacity": .2}, 500);
}

move = function (dx, dy) {
    var att = this.type == "rect" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
    this.attr(att);
    for (var i = connections.length; i--;) {
        paper.connection(connections[i]);
    }
    paper.safari();
}

up = function () {
    this.animate({"fill-opacity": 0}, 500);
}

function addShape(shapeToAdd) {
    shapes.push(shapeToAdd);

    var color = Raphael.getColor();
    shapeToAdd.attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
    shapeToAdd.drag(move, dragger, up);
    shapeToAdd.dblclick(function (event) {
        this.attr({fill: "red", "fill-opacity": .2});
    });
}

function tltext(text) {
    // Moves the x,y co-ordinate of some text to be it's top left,
    // not the centre
    // You could use something like: .attr({"text-anchor": "start"});  
    // but that is quite verbose...
    text.translate(text.getBBox().width / 2,text.getBBox().height / 2);
}

$(document).ready(function() {
    // Create the Raphael container
    paper = Raphael("holder", 640, 480);
    
    addShape(paper.ellipse(190, 100, 30, 20));
    addShape(paper.rect(290, 80, 60, 40, 10));
    addShape(paper.rect(290, 180, 60, 40, 2));
    addShape(paper.ellipse(450, 100, 20, 20));
    
    text=paper.text(50,50,"This is a test This is a test This is a test This is a test")
    tltext(text);
    paper.rect(50,50,text.getBBox().width,200);
    
    connections.push(paper.connection(shapes[0], shapes[1], "#0f0"));
    connections.push(paper.connection(shapes[1], shapes[2], "#ff0", "#0ff"));
    connections.push(paper.connection(shapes[1], shapes[3], "#000", "#f0f"));
    
    document.getElementById("add").onclick=addNewShape;
});

function addNewShape() {
    addShape(paper.ellipse(10,20,30,40)) ;
}
