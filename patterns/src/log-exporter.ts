interface LogEntry {
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
}

function getMockDB() {
  return {
    async query(_sql: string): Promise<LogEntry[]> {
      return [
        {
          timestamp: "2026-03-02T09:00:00Z",
          level: "info",
          message: "Server started",
        },
        {
          timestamp: "2026-03-02T09:05:12Z",
          level: "warn",
          message: "Slow response",
        },
        {
          timestamp: "2026-03-02T09:07:40Z",
          level: "error",
          message: "Database timeout",
        },
      ];
    },
  };
}

// LogRepository ----------------------
interface LogRepository {
  findAll(): Promise<LogEntry[]>;
}
class DatabaseLogRepository implements LogRepository {
  async findAll(): Promise<LogEntry[]> {
    const db = getMockDB();
    const logs = await db.query("SELECT * FROM system_logs");
    return logs;
  }
}
class InMemoryLogRepository implements LogRepository {
  constructor(public logEntry: LogEntry[]) {}

  async findAll(): Promise<LogEntry[]> {
    return this.logEntry;
  }
}

// Formatters ----------------------
interface LogFormatter {
  format(logs: LogEntry[]): string;
}
class JsonFormatter implements LogFormatter {
  format(logs: LogEntry[]): string {
    return JSON.stringify(logs);
  }
}
class CsvFormatter implements LogFormatter {
  format(logs: LogEntry[]): string {
    return logs.map((l) => `${l.timestamp},${l.level},${l.message}`).join("\n");
  }
}
class XmlFormatter implements LogFormatter {
  format(logs: LogEntry[]): string {
    return `<logs>${logs.map((l) => `<log>${l.message}</log>`).join("")}</logs>`;
  }
}

class YAMLFormatter implements LogFormatter {
  format(logs: LogEntry[]): string {
    //JSON mock for YAML
    return JSON.stringify(logs);
  }
}

function createFormatter(format: string): LogFormatter {
  let formatter: LogFormatter;
  if (format === "json") formatter = new JsonFormatter();
  else if (format === "csv") formatter = new CsvFormatter();
  else if (format === "xml") formatter = new XmlFormatter();
  else if (format === "YAML") formatter = new YAMLFormatter();
  // ...other new formats can be added hier
  else throw new Error(`Unsupported format: ${format}`);
  return formatter;
}

class LogExporter {
  private logRepository: LogRepository;

  constructor(logRepository: LogRepository) {
    this.logRepository = logRepository;
  }

  async exportLogs(format: "json" | "csv" | "xml" | "YAML") {
    const logs = await this.logRepository.findAll();
    let logFormatter = createFormatter(format);

    return logFormatter.format(logs);
  }
}

///-------------------------------------------------

//const logRepository = new DatabaseLogRepository();
const logRepository = new InMemoryLogRepository([
  {
    timestamp: "2026-03-02T09:00:00Z",
    level: "info",
    message: "Server started",
  },
  {
    timestamp: "2026-03-02T09:05:12Z",
    level: "warn",
    message: "Slow response",
  },
  {
    timestamp: "2026-03-02T09:07:40Z",
    level: "error",
    message: "Database timeout",
  },
]);

const log = new LogExporter(logRepository);

console.log(await log.exportLogs("json"));
console.log(await log.exportLogs("csv"));
console.log(await log.exportLogs("xml"));
console.log(await log.exportLogs("YAML"));
//Unsupported format:
//console.log(await log.exportLogs("doc"));
