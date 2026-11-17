interface HttpRequest {
  readonly method: string;
  readonly url: string;
  readonly headers: Readonly<Record<string, string>>;
  readonly query: Readonly<Record<string, string>>;
  readonly body?: unknown;
}
interface createdHttpRequest {
  method?: string;
  url?: string;
  headers?: Record<string, string>;
  query?: Record<string, string>;
  body?: unknown;
}

class RequestBuilder {
  private httpRequest: createdHttpRequest = {};

  withMethod(method: string): this {
    this.httpRequest.method = method;
    return this;
  }
  withUrl(url: string): this {
    this.httpRequest.url = url;
    return this;
  }
  withHeader(name: string, value: string): this {
    this.httpRequest.headers = {
      ...this.httpRequest.headers,
      [name]: value,
    };
    return this;
  }
  withQuery(name: string, value: string): this {
    this.httpRequest.query = {
      ...this.httpRequest.query,
      [name]: value,
    };
    return this;
  }
  withJsonBody(body: unknown): this {
    this.httpRequest.body = body;
    return this;
  }
  build(): HttpRequest {
    // const { minDuration, maxDuration } = this.filters;
    // if (minDuration !== undefined && maxDuration !== undefined && minDuration > maxDuration) {
    //     throw new Error("Invalid duration range");
    // }
    const { method, url, body } = this.httpRequest;

    if (!method || !url) {
      throw new Error("Method and URL are required");
    }
    if (method === "POST" && !body) {
      throw new Error("In POST body is required");
    }

    return {
      method,
      url,
      headers: { ...this.httpRequest.headers },
      query: { ...this.httpRequest.query },
      body: this.httpRequest.body,
    };
  }
}

const req1 = new RequestBuilder()
  .withUrl("myurl")
  .withHeader("h1", "header1")
  .withHeader("h2", "header2")
  .withMethod("GET")
  .build();

try {
  const req2 = new RequestBuilder()
    .withUrl("myurl")
    .withHeader("h1", "header1")
    .withHeader("h2", "header2")
    .withMethod("POST")
    .build();
} catch (e) {
  if (e instanceof Error) {
    console.log("Error: " + e.message);
  }
}

const req3 = new RequestBuilder()
  .withUrl("myurl")
  .withHeader("h1", "header1")
  .withHeader("h2", "header2")
  .withMethod("POST")
  .withJsonBody({ id: "345" })
  .build();
