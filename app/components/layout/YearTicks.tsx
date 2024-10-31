import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface Props {
  years: number[];
  start: number;
  end: number;
}

const YearTicks = ({ years, start, end }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const xScale = d3
      .scaleLinear()
      .domain([start, end])
      .range([0, window.innerWidth / 4 - 50]);

    const xAxis = d3
      // @ts-ignore
      .axisTop()
      // @ts-ignore
      .scale(xScale)
      // @ts-ignore
      .tickFormat("")
      .tickValues(years)
      .tickSize(10);

    svg
      .append("g")
      .attr("transform", "translate(5, " + 20 + ")")
      // @ts-ignore
      .call(xAxis)
      .select("path")
      .attr("stroke-width", 0);

    const svgRefCopy = svgRef.current;

    return () => {
      if (svgRefCopy) svgRefCopy.innerHTML = "";
    };
  }, [years, start, end]);

  return <svg ref={svgRef} className="w-full h-6"></svg>;
};

export default YearTicks;
