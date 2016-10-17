import React from 'react';

var jsonObject;

class SunburstChart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            path : null
        }
    }
    componentDidMount(){
        d3.json('./sunburstData.json', function(error, root) {
            var path = svg.selectAll("path")
                .data(partition.nodes(root))
                .enter().append("path")
                .attr("d", arc)
                .style("fill", function(d) {
                    return color((d.children ? d : d.parent).name);
                })
                .on("click", clickChart)
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
/*

            function getAncestors(checkedNode , node) {
                var current = node;
                if(checkedNode.indexOf(current) >= 0){

                    console.log("exist current node : " + current.name);
                    path.splice(checkedNode.indexOf(current), 1);
                    uncheckChild(checkedNode , current);

                }else {
                    while (current.parent) {
                        let index = checkedNode.indexOf(current);
                        if(index == -1) {
                            checkedNode.unshift(current);
                        }
                      current = current.parent;
                    }
                }
                return checkedNode;
            }
*/



        });
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
    shouldComponentUpdate(nextProps, nextState){
        console.log("state :: ", this.state.path);
        return !(JSON.stringify(nextProps.selectedValue) === JSON.stringify(this.props.selectedValue));
    }
    componentWillUpdate(nextProps, nextState){
        console.log("TEst", d3.select('svg'));
        console.log("TEst", d3.selectAll('path'));
        //console.log("nextProps", nextProps.selectedValue);
        //$.getJSON('./sunburstData.json', (root)=>{
        //    console.log("root", root);
        //    var width = 700, height = 600, radius = Math.min(width, height) / 2;
        //    var x = d3.scale.linear().range([0, 2 * Math.PI]);
        //    var y = d3.scale.sqrt().range([0, radius]);
        //    d3.selectAll('path').transition()
        //        .duration(750)
        //        .attrTween("d", (d)=>{
        //            var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
        //                yd = d3.interpolate(y.domain(), [d.y, 1]),
        //                yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
        //            return function(d, i) {
        //                return i ? function(t) {
        //                    return arc(d);
        //                } : function(t) {
        //                    x.domain(xd(t));
        //                    y.domain(yd(t)).range(yr(t));
        //                    return arc(d);
        //                };
        //            };
        //        });
        //});
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