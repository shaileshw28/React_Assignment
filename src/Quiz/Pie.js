import React, { createRef, Component } from "react";
import * as d3 from "d3";

class PieClass extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
    this.createPie = d3
      .pie()
      .value(d => d.value)
      .sort(null);
    this.createArc = d3
      .arc()
      .innerRadius(props.innerRadius)
      .outerRadius(props.outerRadius);
    this.colors = d3.scaleOrdinal(d3.schemeCategory10);
    this.format = d3.format(".2f");
    this.handleOnclick = props.handleOnclick;
    console.log(this.handleOnclick);
  }
  componentDidMount() {
    const svg = d3.select(this.ref.current);
    const data = this.createPie(this.props.data);
    const { width, height, outerRadius } = this.props;

    svg
      .attr("class", "chart")
      .attr("width", width)
      .attr("height", height);

    const group = svg
      .append("g")
      .attr("transform", `translate(${outerRadius} ${outerRadius})`);

    const groupWithEnter = group
      .selectAll("g.arc")
      .data(data)
      .enter();

    const path = groupWithEnter.append("g").attr("class", "arc");

    path
      .append("path")
      .attr("class", "arc")
      .attr("d", this.createArc)
      .attr("fill", (d, i) => this.colors(d.index));

    path
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("transform", d => `translate(${this.createArc.centroid(d)})`)
      .style("fill", "white")
      .style("font-size", 20)
      .text(d => this.format(d.value));
    path.on('click', () =>{
        this.handleOnclick("data");
    })
  }


  render() {
    return <svg ref={this.ref} />;
  }
}

export default PieClass;
