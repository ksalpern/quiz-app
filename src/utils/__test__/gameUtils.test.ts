import { getOptionLabel } from "../gameUtils";

describe("gameUtils", () => {
  describe("getOptionLabel", () => {
    it("should return correct label for valid index", () => {
      expect(getOptionLabel(0)).toBe("A");
      expect(getOptionLabel(1)).toBe("B");
      expect(getOptionLabel(2)).toBe("C");
      expect(getOptionLabel(3)).toBe("D");
      expect(getOptionLabel(4)).toBe("E");
      expect(getOptionLabel(5)).toBe("F");
    });

    it('should return "A" for invalid index', () => {
      expect(getOptionLabel(-1)).toBe("A");
      expect(getOptionLabel(6)).toBe("A");
      expect(getOptionLabel(10)).toBe("A");
    });

    it("should handle edge cases", () => {
      expect(getOptionLabel(0.5)).toBe("A");
      expect(getOptionLabel(NaN)).toBe("A");
    });
  });
});
