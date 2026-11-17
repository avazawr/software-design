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
};

class Order {
  constructor(public name: string) {}

  private state: OrderState = "Draft";

  transition(action: OrderAction) {
    const next = transitions[this.state][action];
    if (!next)
      throw new Error(`Illegal transition: ${action} from ${this.state}`);
    this.state = next;
  }

  checkout() {
    this.transition("checkout");
    console.log(this.showState);
  }
  payment_received() {
    this.transition("payment_received");
    console.log(this.showState);
  }
  dispatch() {
    this.transition("dispatch");
    console.log(this.showState);
  }
  confirm_delivery() {
    this.transition("confirm_delivery");
    console.log(this.showState);
  }
  cancel() {
    this.transition("cancel");
    console.log(this.showState);
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
