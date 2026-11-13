type LibraryEvent = "reservation" | "overdue";

interface Notifiable {
  notify(memberId: string, event: LibraryEvent, title: string): void;
  getChannelName(): string;
}

abstract class BaseNotifier implements Notifiable {
  protected formatMessage(event: LibraryEvent, title: string): string {
    let msg: string = "";
    if (event === "reservation") {
      msg = `Your reservation for ${title} is confirmed.`;
    } else if (event === "overdue") {
      msg = `Reminder: ${title} is overdue.`;
    }
    return msg;
  }
  protected abstract send(memberId: string, message: string): void;
  abstract getChannelName(): string;

  notify(memberId: string, event: LibraryEvent, title: string) {
    const msg = this.formatMessage(event, title);
    this.send(memberId, msg);
  }
}

class EmailNotifier extends BaseNotifier {
  getChannelName(): string {
    return "email";
  }
  send(memberId: string, message: string): void {
    console.log(`Sending email to member ${memberId}: ${message}`);
  }
}

class SmsNotifier extends BaseNotifier {
  getChannelName(): string {
    return "sms";
  }
  send(memberId: string, message: string): void {
    console.log(`Sending sms to member ${memberId}: ${message}`);
  }
}

new EmailNotifier().notify("42", "overdue", "Dune");

class NotificationService {
  private channels: Notifiable[];

  constructor(channels: Notifiable[]) {
    this.channels = channels;
  }

  dispatch(memberId: string, event: LibraryEvent, title: string) {
    this.channels.forEach((channel) => channel.notify(memberId, event, title));
  }

  getChannelNames(): string[] {
    return this.channels.map((channel) => channel.getChannelName());
  }
}

//The channels property has the type Notifiable[]
// because the NotificationService class uses the notify() and getChannelName() methods,
// which are defined in the Notifiable interface.
// Therefore, we can use any entity that implements this interface as a channel;
// it does not necessarily have to extend BaseNotifier.

const service = new NotificationService([
  new EmailNotifier(),
  new SmsNotifier(),
]);
console.log(service.getChannelNames());
service.dispatch("42", "reservation", "Dune");
