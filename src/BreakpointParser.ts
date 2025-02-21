export default class BreakpointParser {
  private bpf: string;
  private parsedPoints: { x: number; y: number; slope: number }[];

  constructor(bpf: string) {
    this.bpf = bpf;
    this.parsedPoints = this.parse();
  }

  /**
   * Parses the BPF string into an array of x-y-slope points.
   */
  private parse(): { x: number; y: number; slope: number }[] {
    const numberRegex = /-?\d+(?:\.\d+)?(?:\/-?\d+(?:\.\d+)?)?/g;

    const parseNumber = (numStr: string): number => {
      if (numStr.includes("/")) {
        const [numerator, denominator] = numStr.split("/").map(Number);
        return denominator !== 0 ? numerator / denominator : NaN;
      }
      return parseFloat(numStr);
    };

    const points = this.bpf
      .match(numberRegex)
      ?.map(parseNumber)
      .filter((n) => !isNaN(n));
    if (!points || points.length % 3 !== 0) return [];

    return Array.from({ length: points.length / 3 }, (_, i) => ({
      x: points[i * 3],
      y: points[i * 3 + 1],
      slope: points[i * 3 + 2],
    })).sort((a, b) => a.x - b.x);
  }

  /**
   * Converts parsed BPF points into an SVG string with curved lines based on slope.
   */
  private generateSvg(): string {
    if (this.parsedPoints.length === 0) return "";

    const minX = Math.min(...this.parsedPoints.map((p) => p.x));
    const maxX = Math.max(...this.parsedPoints.map((p) => p.x));
    const minY = Math.min(...this.parsedPoints.map((p) => p.y));
    const maxY = Math.max(...this.parsedPoints.map((p) => p.y));

    const width = 300,
      height = 150,
      padding = 25;
    const scaleX = (width - 2 * padding) / (maxX - minX || 1);
    const scaleY = (height - 2 * padding) / (maxY - minY || 1);

    const toSvgX = (x: number) => padding + (x - minX) * scaleX;
    const toSvgY = (y: number) => height - padding - (y - minY) * scaleY;

    let pathData = `M ${toSvgX(this.parsedPoints[0].x)},${toSvgY(this.parsedPoints[0].y)}`;

    for (let i = 1; i < this.parsedPoints.length; i++) {
      const p0 = this.parsedPoints[i - 1];
      const p1 = this.parsedPoints[i];

      const dx = p1.x - p0.x;
      const t1 = 0.5;

      let yFactor;
      if (p1.slope >= 0) {
        yFactor = Math.pow(t1, (1 + p1.slope) / (1 - p1.slope));
      } else {
        yFactor = 1 - Math.pow(1 - t1, (1 - p1.slope) / (1 + p1.slope));
      }

      const controlX = p0.x + dx * t1;
      const controlY = p0.y + (p1.y - p0.y) * yFactor;

      pathData += ` Q ${toSvgX(controlX)},${toSvgY(controlY)} ${toSvgX(p1.x)},${toSvgY(p1.y)}`;
    }

    return `
		<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
		  <style>
			@media (prefers-color-scheme: dark) {
			  .axis, .label { stroke: #808080; fill: #CCCCCC; }
			  .curve { stroke: #569CD6; }
			  .point { fill: #D4D4D4; }
			}
			@media (prefers-color-scheme: light) {
			  .axis, .label { stroke: #404040; fill: #333333; }
			  .curve { stroke: #007ACC; }
			  .point { fill: #000000; }
			}
			text { font-family: monospace; font-size: 10px; text-anchor: middle; overflow: visible; }
		  </style>
	
		  <!-- Axes -->
		  <line class="axis" x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke-width="1"/>
		  <line class="axis" x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke-width="1"/>
		  
		  <!-- Labels -->
		  <text class="label" x="${width / 2}" y="${height - 5}" overflow="visible">X (Domain: ${minX} to ${maxX})</text>
		  <text class="label" x="${padding - 15}" y="${height / 2}" overflow="visible"
			transform="rotate(-90, ${padding - 15}, ${height / 2})">Y (Range: ${minY} to ${maxY})</text>
	
		  <!-- Curve -->
		  <path d="${pathData}" class="curve" fill="none" stroke-width="1"/>
	
		  <!-- Points -->
		  ${this.parsedPoints.map((p) => `<circle cx="${toSvgX(p.x)}" cy="${toSvgY(p.y)}" r="2" class="point"/>`).join("\n")}
		</svg>
	  `;
  }

  /**
   * Encodes the SVG string into a base64 data URI.
   */
  private encodeSvg(svg: string): string {
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  }

  /**
   * Public method to return the final base64-encoded SVG from the BPF string.
   */
  public toSvgBase64(): string {
    const svgString = this.generateSvg();
    return this.encodeSvg(svgString);
  }
}
