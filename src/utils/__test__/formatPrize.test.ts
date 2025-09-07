import { formatPrize } from "@/utils/formatPrize";

describe("formatPrize", () => {
  it("should format positive numbers correctly", () => {
    expect(formatPrize(1000)).toBe("$1,000");
    expect(formatPrize(50000)).toBe("$50,000");
  });

  it("should format zero correctly", () => {
    expect(formatPrize(0)).toBe("$0");
  });

  it("should format large numbers correctly", () => {
    expect(formatPrize(1000000)).toBe("$1,000,000");
  });
});
