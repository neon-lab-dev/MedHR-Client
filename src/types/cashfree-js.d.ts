declare module "@cashfreepayments/cashfree-js" {
  export function load(props: { mode: "sandbox" | "production" }): Promise<any>;
}