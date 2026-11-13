type ReservationStatus = "reserved" | "returned" | "cancelled";

class BookReservation {
  #status: ReservationStatus = "reserved";

  constructor(
    public id: string,
    public bookTitle: string,
  ) {}

  get status(): ReservationStatus {
    return this.#status;
  }

  private checkStatus() {
    if (this.#status !== "reserved") {
      throw new Error(`current status: ${this.#status}`);
    }
  }

  markReturned() {
    this.checkStatus();
    this.#status = "returned";
  }

  cancel() {
    this.checkStatus();
    this.#status = "cancelled";
  }
}

const reservation = new BookReservation("42", "Dune");
console.log(reservation.status);

reservation.markReturned();
console.log(reservation.status);

try {
  reservation.cancel();
} catch (error) {
  console.log(error instanceof Error ? error.message : error);
}
