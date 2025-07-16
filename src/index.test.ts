import { describe, it, expect } from "vitest";
import worker from "./index";

describe("Cloudflare Worker", () => {
  it("should fetch and return SportPesa jackpots data", async () => {
    const request = new Request("http://localhost:8787/");
    const env = {};
    const ctx = {} as ExecutionContext;

    const response = await worker.fetch(request, env, ctx);

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");

    const data = await response.json();
    expect(data).toHaveProperty("jackpotBetAmounts");
    expect(data).toHaveProperty("jackpotPrizes");
    expect(data).toHaveProperty("currencyExchangeRate");

    // Check jackpotBetAmounts structure
    expect(data.jackpotBetAmounts).toHaveProperty("jackpotId");
    expect(data.jackpotBetAmounts).toHaveProperty("betAmountType");
    expect(data.jackpotBetAmounts).toHaveProperty("amounts");
    expect(Array.isArray(data.jackpotBetAmounts.amounts)).toBe(true);

    // Check jackpotPrizes structure
    expect(data.jackpotPrizes).toHaveProperty("jackpotId");
    expect(data.jackpotPrizes).toHaveProperty("prizes");
    expect(Array.isArray(data.jackpotPrizes.prizes)).toBe(true);
  });

  it("should handle different content types correctly", async () => {
    const request = new Request("http://localhost:8787/");
    const env = {};
    const ctx = {} as ExecutionContext;

    const response = await worker.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type");

    expect(contentType).toContain("application/json");
  });
});
