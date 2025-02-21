/**
 * A class for parsing a Breakpoint Function (BPF) string and generating a corresponding
 * SVG representation of the parsed data.
 *
 * The BPF string contains a series of x, y, and slope values, which are parsed into an
 * array of points. The class can generate a visual representation of these points as an
 * SVG and provide the SVG as a base64-encoded string.
 */
export default class BreakpointParser {
  private bpf: string;
  private parsedPoints: { x: number; y: number; slope: number }[];
  private samplingResolution: number;

  /**
   * Initializes the parser with a BPF string and parses the content.
   * @param bpf - A string containing breakpoint function data formatted as "x y slope ..."
   */
  constructor(bpf: string, samplingResolution = 50) {
    this.samplingResolution = samplingResolution;
    this.bpf = bpf;
    this.parsedPoints = this.parse();
  }

  /**
   * Parses the BPF string into an array of objects containing x, y, and slope values.
   * @returns An array of parsed points, each containing x, y, and slope properties.
   */
  private parse(): { x: number; y: number; slope: number }[] {
    const numberRegex = /-?\d+(?:\.\d+)?(?:\/-?\d+(?:\.\d+)?)?/g;

    /**
     * Parses a number from a string, handling fractions.
     * @param numStr - A string representing a number or fraction (e.g., "3", "-2.5", "4/5").
     * @returns The parsed number as a floating-point value.
     */
    const parseNumber = (numStr: string): number => {
      if (numStr.includes("/")) {
        const [numerator, denominator] = numStr.split("/").map(Number);
        return denominator !== 0 ? numerator / denominator : NaN;
      }
      return parseFloat(numStr);
    };

    // Ensure a valid number of elements (multiples of 3: x, y, slope)
    const points = this.bpf
      .match(numberRegex)
      ?.map(parseNumber)
      .filter((n) => !isNaN(n));
    if (!points || points.length % 3 !== 0) return [];

    // Construct and return the sorted list of parsed points
    return Array.from({ length: points.length / 3 }, (_, i) => ({
      x: points[i * 3],
      y: points[i * 3 + 1],
      slope: points[i * 3 + 2],
    })).sort((a, b) => a.x - b.x);
  }

  /**
   * Generates an SVG string representing the parsed breakpoint function.
   * @returns An SVG string visualization of the parsed BPF data.
   */
  private generateSvg(): string {
    if (this.parsedPoints.length === 0) return "";

    // Determine the minimum and maximum values for scaling
    const minX = Math.min(...this.parsedPoints.map((p) => p.x));
    const maxX = Math.max(...this.parsedPoints.map((p) => p.x));
    const minY = Math.min(...this.parsedPoints.map((p) => p.y));
    const maxY = Math.max(...this.parsedPoints.map((p) => p.y));

    // Define SVG dimensions and padding
    const width = 300,
      height = 150,
      padding = 25;

    // Compute scaling factors for coordinate transformations
    const domain = Math.abs(maxX - minX) || 1;
    const range = Math.abs(maxY - minY) || 1;
    const scaleX = (width - 2 * padding) / domain;
    const scaleY = (height - 2 * padding) / range;

    // Conversion functions from data space to SVG space
    const toSvgX = (x: number) => padding + (x - minX) * scaleX;
    const toSvgY = (y: number) => height - padding - (y - minY) * scaleY;

    /**
     * Interpolates a value based on a given slope.
     * @param t - A normalized time parameter (0 to 1).
     * @param slope - The slope value at the breakpoint.
     * @returns The interpolated weight for smooth curve generation.
     */
    const interpolate = (t: number, slope: number): number => {
      return slope >= 0 ? Math.pow(t, (1 + slope) / (1 - slope)) : 1 - Math.pow(1 - t, (1 - slope) / (1 + slope));
    };

    // Start SVG path with the first point
    let pathData = `M ${toSvgX(this.parsedPoints[0].x)},${toSvgY(this.parsedPoints[0].y)}`;

    // Generate smooth path between points based on slope
    for (let i = 1; i < this.parsedPoints.length; i++) {
      const p0 = this.parsedPoints[i - 1];
      const p1 = this.parsedPoints[i];

      // Determine the number of segments for smooth interpolation between points.
      // The number of segments is proportional to the x-distance between points,
      // scaled by a factor to maintain visual smoothness. It ensures at least
      // 2 segments per transition to avoid discontinuities.
      const segments = Math.max(2, Math.round((this.samplingResolution * (p1.x - p0.x)) / domain));

      for (let j = 1; j <= segments; j++) {
        const t = j / segments;
        const weight = interpolate(t, p1.slope);
        const x = p0.x * (1 - t) + p1.x * t;
        const y = p0.y * (1 - weight) + p1.y * weight;
        pathData += ` L ${toSvgX(x)},${toSvgY(y)}`;
      }
    }

    // Return full SVG string including axes and labels
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
        <line class="axis" x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke-width="1"/>
        <line class="axis" x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke-width="1"/>
        <text class="label" x="${width / 2}" y="${height - 5}">X (domain: ${minX} to ${maxX})</text>
        <text class="label" x="${padding - 15}" y="${height / 2}" transform="rotate(-90, ${padding - 15}, ${
      height / 2
    })">Y (range: ${minY} to ${maxY})</text>
        <path d="${pathData}" class="curve" fill="none" stroke-width="1"/>
        ${this.parsedPoints.map((p) => `<circle cx="${toSvgX(p.x)}" cy="${toSvgY(p.y)}" r="2" class="point"/>`).join("\n")}
      </svg>
    `;
  }

  /**
   * Encodes an SVG string into a base64 data URI.
   * @param svg - The SVG string to encode.
   * @returns A base64-encoded data URI for the SVG image.
   */
  private encodeSvg(svg: string): string {
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  }

  /**
   * Generates the base64-encoded SVG representation of the parsed BPF data.
   * @returns A base64-encoded SVG string.
   */
  public toSvgBase64(): string {
    const svgString = this.generateSvg();
    return this.encodeSvg(svgString);
  }
}
