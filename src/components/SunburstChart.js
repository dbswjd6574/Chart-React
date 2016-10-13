import React from 'react';


class SunburstChart extends React.Component{
    constructor(props){
        super(props);
    }



    componentDidMount(){
        var width = 700, height = 600, radius = Math.min(width, height) / 2;

        var x = d3.scale.linear().range([0, 2 * Math.PI]);
        var y = d3.scale.sqrt().range([0, radius]);

        var color = d3.scale.category20();

        var svg = d3.select("#chart").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

        var partition = d3.layout.partition();

        var arc = d3.svg.arc()
            .startAngle(function(d) {
                return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
            })
            .endAngle(function(d) {
                return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
            })
            .innerRadius(function(d) {
                return Math.max(0, y(d.y));
            })
            .outerRadius(function(d) {
                return Math.max(0, y(d.y + d.dy));
            });

        var tooltip = d3.select("#chart")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("z-index", "1")
            .style("opacity", 0);

        d3.json("./sunburstData.json", function(error, root) {
            var path = svg.selectAll("path")
                .data(partition.nodes(root))
                .enter().append("path")
                .attr("d", arc)
                .style("fill", function(d) {
                    return color((d.children ? d : d.parent).name);
                })
                .on("click", zoom)
                .on("mouseover", function(d) {
                    tooltip.html(function() {
                        var text = '<b>' + d.name + '</b><br> (' + d.value + ')';
                        return text;
                    });
                    return tooltip.transition()
                        .duration(50)
                        .style("opacity", 0.9);
                })
                .on("mousemove", function(d) {
                    return tooltip
                        .style("top", (d3.event.pageY - 10) + "px")
                        .style("left", (d3.event.pageX + 10) + "px");
                })
                .on("mouseout", function() {
                    return tooltip.style("opacity", 0);
                });

            function zoom(d) {
                path.transition()
                    .duration(750)
                    .attrTween("d", arcTween(d));
            }
        });
        function arcTween(d) {
            var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                yd = d3.interpolate(y.domain(), [d.y, 1]),
                yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
            return function(d, i) {
                return i ? function(t) {
                    return arc(d);
                } : function(t) {
                    x.domain(xd(t));
                    y.domain(yd(t)).range(yr(t));
                    return arc(d);
                };
            };
        }
    }



    render(){
        return(
            <div>
                <div id="chart"></div>
            </div>
        );
    }
}

export default SunburstChart;