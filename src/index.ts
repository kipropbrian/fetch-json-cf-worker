interface Env {}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = "https://www.ke.sportpesa.com/api/jackpots/multi";

    // gatherResponse returns both content-type & response body as a string
    async function gatherResponse(response: Response) {
      const { headers } = response;
      const contentType = headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        return { contentType, result: JSON.stringify(await response.json()) };
      }
      return { contentType, result: await response.text() };
    }

    // Headers to match the original request
    const headers = {
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.9",
      DNT: "1",
      Referer: "https://www.ke.sportpesa.com/en/mega-jackpot-pro",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
      "X-App-Timezone": "Africa/Nairobi",
      "X-Requested-With": "XMLHttpRequest",
      "sec-ch-ua":
        '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
    };

    const response = await fetch(url, { headers });
    const { contentType, result } = await gatherResponse(response);

    const options = { headers: { "content-type": contentType } };
    return new Response(result, options);
  },
} satisfies ExportedHandler<Env>;
