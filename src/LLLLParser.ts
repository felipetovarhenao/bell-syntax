export default class LLLLParser {
  private data: any;

  constructor(json: string) {
    this.data = JSON.parse(json);
  }

  parse(): any[] {
    const dataKeys = Object.keys(this.data)
      .filter((key) => key.match(/data_\d{10}/))
      .sort();
    let mergedData: any[] = [];

    // Concatenate fragmented data bins
    dataKeys.forEach((key) => {
      mergedData = mergedData.concat(this.data[key]);
    });

    return this.parseDataArray(mergedData);
  }

  private parseDataArray(dataArray: any[]): any[] {
    let stack: any[] = [[]];
    let i = 0;

    while (i < dataArray.length) {
      const item = dataArray[i];

      if (item === "[") {
        const newArray: any[] = [];
        stack[stack.length - 1].push(newArray);
        stack.push(newArray);
      } else if (item === "]") {
        stack.pop();
      } else if (typeof item === "string" && item.startsWith("_x_x_x_x_bach_float64_x_x_x_x_")) {
        if (i + 2 < dataArray.length) {
          const floatVal = this.convertToFloat(dataArray[i + 1], dataArray[i + 2]);
          stack[stack.length - 1].push(floatVal);
          i += 2; // Skip next two elements
        }
      } else {
        stack[stack.length - 1].push(item);
      }

      i++;
    }

    return stack[0];
  }

  private convertToFloat(low: number, high: number): number {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setUint32(0, low, true);
    view.setUint32(4, high, true);
    return view.getFloat64(0, true);
  }
}
