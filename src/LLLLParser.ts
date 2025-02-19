/**
 * LLLLParser - A class to parse and reconstruct structured data from a llll-encoded data.
 */
export default class LLLLParser {
  private data: any;

  /**
   * Constructor that initializes the parser with a llll string.
   * @param {string} llll - The llll string to be parsed.
   */
  constructor(llll: string) {
    this.data = JSON.parse(llll);
  }

  /**
   * Parses the llll data and reconstructs it into a structured format.
   * @returns {any[]} - The parsed and reconstructed data array.
   */
  parse(): any[] {
    // Extract keys that match the pattern 'data_XXXXXXXXXX' (where X is a digit)
    const dataKeys = Object.keys(this.data)
      .filter((key) => key.match(/data_\d{10}/))
      .sort();

    let mergedData: any[] = [];

    // Merge fragmented data bins into a single array
    dataKeys.forEach((key) => {
      mergedData = mergedData.concat(this.data[key]);
    });

    // Process and return the parsed data array
    return this.parseDataArray(mergedData);
  }

  /**
   * Processes an array of mixed data types and reconstructs nested structures.
   * @param {any[]} dataArray - The array to be processed.
   * @returns {any[]} - The reconstructed data structure.
   */
  private parseDataArray(dataArray: any[]): any[] {
    let stack: any[] = [[]]; // Stack to maintain nested structures
    let i = 0;

    while (i < dataArray.length) {
      const item = dataArray[i];

      if (item === "[") {
        // Start a new nested array
        const newArray: any[] = [];
        stack[stack.length - 1].push(newArray);
        stack.push(newArray);
      } else if (item === "]") {
        // Close the current nested array
        stack.pop();
      } else if (typeof item === "string" && item.startsWith("_x_x_x_x_bach_float64_x_x_x_x_")) {
        // Special case: Convert two consecutive numbers into a float64
        if (i + 2 < dataArray.length) {
          const floatVal = this.convertToFloat(dataArray[i + 1], dataArray[i + 2]);
          stack[stack.length - 1].push(floatVal);
          i += 2; // Skip the next two elements as they were processed
        }
      } else {
        // Regular data item, add to the current array
        stack[stack.length - 1].push(item);
      }

      i++;
    }

    return stack[0]; // Return the reconstructed array
  }

  /**
   * Converts two 32-bit integers into a 64-bit floating-point number.
   * @param {number} low - The lower 32 bits.
   * @param {number} high - The higher 32 bits.
   * @returns {number} - The resulting 64-bit floating-point number.
   */
  private convertToFloat(low: number, high: number): number {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);

    // Store the 32-bit integers in little-endian order
    view.setUint32(0, low, true);
    view.setUint32(4, high, true);

    // Retrieve the float64 value from the buffer
    return view.getFloat64(0, true);
  }
}
