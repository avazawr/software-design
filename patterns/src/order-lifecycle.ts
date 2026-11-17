type OrderState =
  | "Draft"
  | "AwaitingPayment"
  | "Paid"
  | "Shipped"
  | "Delivered"
  | "Cancelled";
type OrderAction =
  | "checkout"
  | "payment_received"
  | "dispatch"
  | "confirm_delivery"
  | "cancel";

const transitions: Record<
  OrderState,
  Partial<Record<OrderAction, OrderState>>
> = {
  Draft: { checkout: "AwaitingPayment", cancel: "Cancelled" },
  AwaitingPayment: { payment_received: "Paid", cancel: "Cancelled" },
  Paid: { dispatch: "Shipped", cancel: "Cancelled" },
  Shipped: { confirm_delivery: "Delivered" },
  Cancelled: {},
  Delivered: {},
};

// decorator returns a function
function log_in_console(
  originalMethod: any,
  context: ClassMethodDecoratorContext,
) {
  return function (this: any, ...args: any[]) {
    const result = originalMethod.call(this, ...args); // decorator function is responsible to call the original method
    console.log(this.showState);
    return result;
  };
}

class Order {
  constructor(public name: string) {}

  private state: OrderState = "Draft";

  transition(action: OrderAction) {
    const next = transitions[this.state][action];
    if (!next)
      throw new Error(`Illegal transition: ${action} from ${this.state}`);
    this.state = next;
  }

  @log_in_console
  checkout() {
    this.transition("checkout");
  }
  @log_in_console
  payment_received() {
    this.transition("payment_received");
  }
  @log_in_console
  dispatch() {
    this.transition("dispatch");
  }
  @log_in_console
  confirm_delivery() {
    this.transition("confirm_delivery");
  }
  @log_in_console
  cancel() {
    this.transition("cancel");
  }

  get showState(): String {
    return `${this.name}: ${this.state}`;
  }
}

const order = new Order("Order #1");

console.log(order.showState);
order.checkout();
order.payment_received();
order.dispatch();
order.confirm_delivery();

const order2 = new Order("Order #2");

console.log(order2.showState);
order2.checkout();
order2.payment_received();
order2.cancel();

const order3 = new Order("Order #3");
order3.checkout();
try {
  order3.dispatch();
} catch (e) {
  if (e instanceof Error) {
    console.log("Error: " + e.message);
  }
}
