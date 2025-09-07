import { formatPrize } from "@/utils/formatPrize";

describe("formatPrize", () => {
  it("should format positive numbers correctly", () => {
    expect(formatPrize(1000)).toBe("$1,000");
    expect(formatPrize(50000)).toBe("$50,000");
    expect(formatPrize(1000000)).toBe("$1,000,000");
  });

  it("should format zero correctly", () => {
    expect(formatPrize(0)).toBe("$0");
  });

  it("should format small numbers correctly", () => {
    expect(formatPrize(100)).toBe("$100");
    expect(formatPrize(50)).toBe("$50");
  });

  it("should handle decimal numbers by rounding", () => {
    expect(formatPrize(1000.5)).toBe("$1,001");
    expect(formatPrize(1000.4)).toBe("$1,000");
  });

  it("should handle negative numbers", () => {
    expect(formatPrize(-1000)).toBe("-$1,000");
  });
});
