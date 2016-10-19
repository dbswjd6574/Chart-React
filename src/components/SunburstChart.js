import React from 'react';

var x0;
var dx0;
class SunburstChart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            path : null
        }
    }
    makeSunburstChart(data){
        //console.log("sunburstChartData", this.props.sunburstChartData);
        console.log("data : " + data.name + "value : " + data.value);
        let width = 700, height = 600, radius = Math.min(width, height) / 2;
        let x = d3.scale.linear().range([0, 2 * Math.PI]);
        let y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius]);
        let colorArray = ["#cf7974",
            "#f98772",
            "#c5ecd7",
            "#ceff6d",
            "#fefc6e",
            "#fbd875",
            "#66ff66",
            "#91ff71"];
        let color = d3.scale.ordinal().range(colorArray);
        let svg = d3.select("#chart").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");
        let partition = d3.layout.partition();
        let arc = d3.svg.arc()
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
        //let drag = d3.behavior.drag()
        //    .origin(function(d){return d})
        //    .on("dragstart", dragstarted)
        //    .on("drag", dragged)
        //    .on("dragend", dragended);
        //function dragstarted(d) {
        //    d3.event.sourceEvent.stopPropagation();
        //    d3.select(this).classed("dragging", true);
        //}
        //function dragged(d) {
        //    d3.select(this).attr("dx", d.x = d3.event.x).attr("dy", d.y = d3.event.y);
        //}
        //function dragended(d) {
        //    d3.select(this).classed("dragging", false);
        //}
        let coloralternative =0;
        function getColor(a) {
            let c = ["#f98772", "#fec871", "#b3ff66", "#fefc6e", "#00cc66"],
                d = [-.1, -.05, 0];
            if (1 == a.depth) {
                var e = c[coloralternative % 5];
                return coloralternative++, e
            }
            if (a.depth > 1) {
                let f = d[a.value % 3];
                return d3.rgb(a.parent._color).brighter(.1 * a.depth + f * a.depth)
            }
        }
        let path = svg.selectAll("path")
            .data(partition.nodes(data))
            .enter().append("path")
            .attr("d", arc)
            .attr("stroke", "#fff")
            .attr("fill-rule", "evenodd")
            //.attr("fill", function (d) { return d._color = getColor(d), d._color })
            .attr("fill", function(d){return color(d.name)})
            .each(stash)
            .on("dblclick", zoom)
            .on("click", clickChart);
        path.transition()
            .duration(300)
            .attrTween("d", pathTransform);
        function stash(d) {
            x0 = d.x;
            dx0 = d.dx;
        }
        function pathTransform(a) {
            var i = d3.interpolate({x: x0, dx: dx0}, a);
            return function(t) {
                var b = i(t);
                a.x0 = b.x;
                a.dx0 = b.dx;
                return arc(b);
            };
        }

        function zoom(d){
            path.transition()
                .duration(750)
                .attrTween("d", arcTween(d));

            text.style("visibility", function(e) {
                return isParentOf(d, e) ? null : d3.select(this).style("visibility");
            })
                .transition()
                .duration(750)
                .attrTween("text-anchor", function(d) {
                    return function() {
                        return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
                    };
                })
                .attrTween("transform", function(d) {
                    let multiline = (d.name || "").split(" ").length > 1;
                    return function() {
                        let angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
                            rotate = angle + (multiline ? -.5 : 0);
                        return "rotate(" + rotate + ")translate(" + (y(d.y) + 5) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
                    };
                })
                .style("fill-opacity", function(e) { return isParentOf(d, e) ? 1 : 1e-6; })
                .each("end", function(e) {
                    d3.select(this).style("visibility", isParentOf(d, e) ? null : "hidden");
                });
        }
        function isParentOf(p, c) {
            if (p === c) return true;
            if (p.children) {
                return p.children.some(function(d) {
                    return isParentOf(d, c);
                });
            }
            return false;
        }

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

        let g = svg.selectAll("g").data(partition.nodes(data)).enter().append("g");

        let text;
        setTimeout(function(){
            text = g.append("text")
                .style("fill-opacity", 1)
                .style("fill", function(d) {
                    return brightness(d3.rgb(colour(d))) < 125 ? "#eee" : "#000";
                })
                .attr("class", "breadcumb-text")
                .attr("text-anchor", function(d) {
                    return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
                })
                .attr("dy", ".2em")
                .attr("transform", function(d) {
                    var multiline = (d.name || "").split(" ").length > 1,
                        angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
                        rotate = angle + (multiline ? -.5 : 0);
                    return "rotate(" + rotate + ")translate(" + (y(d.y) + 5) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
                })
                .on("dblclick", zoom);

            text.append('tspan') //
                .attr('x', 0) //
                .text(function (d) {
                    return (d.depth ? d.name.split('  ')[0] : '');
                }) //
                .append('tspan') //
                .attr({
                    'x': 0,
                    'dy': '1em'
                }) //
                .text(function (d) {
                    return (d.depth ? d.name.split('  ')[1] || '' : '');
                });
        },350);


        function brightness(rgb) {
            return rgb.r * .299 + rgb.g * .587 + rgb.b * .114;
        }
        function colour(d) {
            if (d.children) {
                // There is a maximum of two children!
                var colours = d.children.map(colour),
                    a = d3.hsl(colours[0]),
                    b = d3.hsl(colours[1]);
                // L*a*b* might be better here...
                return d3.hsl((a.h + b.h) / 2, a.s * 1.2, a.l / 1.2);
            }
            return d.colour || "#fff";
        }
        let checkedNode = [];

        function clickChart(d){
            if(checkedNode && checkedNode.indexOf(d) >= 0){
                console.log("removeCheckedChild : " + d.name + ", checkedNode size :" + checkedNode.length);
                checkedNode = removeCheckedChild(checkedNode , d);

            }else{
                console.log("checkedNode : " + d.name);
                checkedNode = getAncestors(checkedNode , d);
            }

            d3.selectAll("path").style("opacity" , 0.2);
            d3.selectAll("path").filter(function(node) {
                return (checkedNode.indexOf(node) >= 0);
            }).style("opacity", 1);
            d3.selectAll("text").style("opacity" , 0.2);
            d3.selectAll("text").filter(function(node) {
                return (checkedNode.indexOf(node) >= 0);
            }).style("opacity", 1);
        }

        function uncheckChild(path , current){
            if(current && current.children) {
                let children = current.children;
                for (let i = 0; i < children.length; i++) {
                    let index = path.indexOf(children[i]);
                    if(index != -1)
                        path.splice(index, 1);
                    uncheckChild(path , children[i]);
                }
            }else{

            }
        }

        function getAncestors(checkedNode , currentNode){
            while (currentNode.parent) {
                console.log("currentNode : " + currentNode.name);

                let index = checkedNode.indexOf(currentNode);
                if(index == -1) {
                    checkedNode.unshift(currentNode);
                }

                currentNode = currentNode.parent;
            }
            return checkedNode;
        }

        function removeCheckedChild(checkedNode , currentNode){
            console.log("exist current node : " + currentNode.name);
            checkedNode.splice(checkedNode.indexOf(currentNode), 1);
            uncheckChild(checkedNode , currentNode);

            return checkedNode;

        }
    }
    componentDidMount(){
        this.makeSunburstChart(this.props.sunburstChartData);

    }
    shouldComponentUpdate(nextProps, nextState){
        return !(nextProps.sunburstChartData === this.props.sunburstChartData);
    }
    componentWillUpdate(nextProps, nextState){
        console.log("willUpdate", nextProps.sunburstChartData);
        d3.selectAll('svg').remove();

        this.makeSunburstChart(nextProps.sunburstChartData);

        //this.path.data(partition.nodes(nextProps.sunburstChartData)).enter().append('path')
        //    .transition()
        //    .duration(750)
        //    .attr("d", arc)
        //    .style("fill", function(d) {
        //        return color((d.children ? d : d.parent).name);
        //    })
        //    .each(function(d) {
        //        x0 = d.x;
        //        dx0 = d.dx;
        //    })
        //    .attrTween("d", arcTweenUpdate);
        function arcTweenUpdate(a) {
            var i = d3.interpolate({x: x0, dx: dx0}, a);
            return function(t) {
                var b = i(t);
                x0 = b.x;
                dx0 = b.dx;
                return arc(b);
            };
        }
    }

    render(){
        let style ={
            float : "left",
            width : "500px"
        };
        return(

            <div>
                <div id="chart" style={style}></div>
            </div>
        );
    }
}


export default SunburstChart;