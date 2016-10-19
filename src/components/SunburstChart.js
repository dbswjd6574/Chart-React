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
        console.log("sunburstChartData", this.props.sunburstChartData);
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

        let drag = d3.behavior.drag()
            .origin(function(d){return d})
            .on("dragstart", dragstarted)
            .on("drag", dragged)
            .on("dragend", dragended);

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

        let path = svg.selectAll("path")
            .data(partition.nodes(data))
            .enter().append("path")
            .attr("d", arc)
            .style("fill", function(d) {
                return color((d.children ? d : d.parent).name);
            })
            .style("stroke", "black")
            .style("stroke-width", 2)
            .each(stash)
            .style("cursor", "move")
            .on("click", clickChart)
            .call(drag);

        path.transition()
            .duration(300)
            .attrTween("d", arcTween);


        function stash(d) {
            x0 = d.x;
            dx0 = d.dx;
        }

        function arcTween(a) {
            var i = d3.interpolate({x: x0, dx: dx0}, a);
            return function(t) {
                var b = i(t);
                a.x0 = b.x;
                a.dx0 = b.dx;
                return arc(b);
            };
        }

        setTimeout(function(){
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
                .attr("font-size", "13")
                .style("fill", "black")
                .append('tspan') //
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
        }, 350);

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