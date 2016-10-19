import React from 'react';


var jsonObject;
var x0;
var dx0;
var arc;
var partition;
var text;
var color;

class SunburstChart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            path : null
        }
    }

    componentDidMount(){
        console.log("sunburstChartData", this.props.sunburstChartData);
        var width = 700, height = 600, radius = Math.min(width, height) / 2;
        var x = d3.scale.linear().range([0, 2 * Math.PI]);
        var y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius]);
        color = d3.scale.category20();
        var svg = d3.select("#chart").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

        partition = d3.layout.partition();

        arc = d3.svg.arc()
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




        function dragstarted(d) {
            d3.event.sourceEvent.stopPropagation();
            d3.select(this).classed("dragging", true);
        }

        function dragged(d) {
            d3.select(this).attr("dx", d.x = d3.event.x).attr("dy", d.y = d3.event.y);
        }

        function dragended(d) {
            d3.select(this).classed("dragging", false);
        }


        function makePath(svg , data){
            let drag = d3.behavior.drag()
                .origin(function(d){return d})
                .on("dragstart", dragstarted)
                .on("drag", dragged)
                .on("dragend", dragended);

            let path = svg.selectAll("path")
                .data(partition.nodes(data))
                .enter().append("path")
                .attr("d", arc)
                .style("fill", function(d) {
                    let name;
                    if(d.children){
                        name = d.children.name;
                    }else if(d.parent){
                        name = d.parent.name;
                    }

                    return color(name);
                })
                .style("cursor", "move")
                .on("click", clickChart)
                .each(function(d) {
                    x0 = d.x;
                    dx0 = d.dx;
                })
                .call(drag);

            return path;
        }

        function makeText(svg , data){
            let g = svg.selectAll("g").data(partition.nodes(data)).enter().append("g");

            g.append("text")
                .attr("transform", function(d) {
                    var multiline, angle, rotate, rotated;
                    multiline = (d.name || '').split('  ').length > 1;
                    angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90;
                    rotate = angle + (multiline ? - 0.5 : 0);
                    rotated = (angle > 90 ? - 180 : 0);
                    //
                    return ['rotate(', rotate, ')', //
                        'translate(', y(d.y) + 10, ')', //
                        'rotate(', rotated, ')'].join('');
                })
                .attr('text-anchor', function (d) {
                    return x(d.x + d.dx / 2) > Math.PI ? 'end' : 'start';
                })
                .attr("x", function(d) { return y(d.y); })
                .attr("dy", ".35em") // vertical-align
                .attr("font-size", "17")
                .style("fill", "white")
                .append('tspan') //
                .attr('x', 0) //
                .text(function (d) {
                    return (d.depth ? d.name.split('  ')[0] : '');
                }) //
                .append('tspan') //
                .attr({
                    'x': 0,
                    'dy': '1em',
                }) //
                .text(function (d) {
                    return (d.depth ? d.name.split('  ')[1] || '' : '');
                });

            return g;
        }

        this.path = makePath(svg , this.props.sunburstChartData);

        this.g = makeText(svg , this.props.sunburstChartData);

        //function zoom(d) {
        //    path.transition()
        //        .duration(750)
        //        .attrTween("d", arcTween(d));
        //}
        //
        //function computeTextRotation(d) {
        //    return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
        //}
        var checkedNode = [];

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
        //function arcTween(d) {
        //    var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
        //        yd = d3.interpolate(y.domain(), [d.y, 1]),
        //        yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
        //    return function(d, i) {
        //        return i ? function(t) {
        //            return arc(d);
        //        } : function(t) {
        //            x.domain(xd(t));
        //            y.domain(yd(t)).range(yr(t));
        //            return arc(d);
        //        };
        //    };
        //}
    }
    shouldComponentUpdate(nextProps, nextState){
        return !(nextProps.sunburstChartData === this.props.sunburstChartData);
    }

    removeCheckedChild(checkedNode , currentNode){
        console.log("exist current node : " + currentNode.name);
        checkedNode.splice(checkedNode.indexOf(currentNode), 1);
        uncheckChild(checkedNode , currentNode);

        return checkedNode;

    }

    componentWillUpdate(nextProps, nextState){
        this.path.remove();
        this.g.remove();

        this.path.data(partition.nodes(nextProps.sunburstChartData)).enter().append("path")
            .transition()
            .duration(750)
            .attr("d", arc)
            .style("fill", function(d) {
                return color((d.children ? d : d.parent).name);
            })
            .style("cursor", "move")
            .each(function(d) {
                x0 = d.x;
                dx0 = d.dx;
            })
            .attrTween("d", arcTweenUpdate);



        function arcTweenUpdate(a) {
            var i = d3.interpolate({x: x0, dx: dx0}, a);
            return function(t) {
                var b = i(t);
                x0 = b.x;
                dx0 = b.dx;
                return arc(b);
            };
        }
        console.log("nextProps :: ", nextProps.sunburstChartData);
    }

    render(){
        let style ={
            float : "left",
            width : "500px",
        };
        return(

            <div>
                <div id="chart" style={style}></div>
            </div>
        );
    }
}


export default SunburstChart;