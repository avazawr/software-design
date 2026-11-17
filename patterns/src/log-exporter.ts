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

class LogExporter {
  private logRepository: LogRepository;

  constructor(logRepository: LogRepository) {
    this.logRepository = logRepository;
  }

  async exportLogs(format: "json" | "csv" | "xml") {
    const logs = await this.logRepository.findAll();

    if (format === "json") {
      return JSON.stringify(logs);
    } else if (format === "csv") {
      return logs
        .map((l) => `${l.timestamp},${l.level},${l.message}`)
        .join("\n");
    } else if (format === "xml") {
      return `<logs>${logs.map((l) => `<log>${l.message}</log>`).join("")}</logs>`;
    } else {
      throw new Error("Unknown format");
    }
  }
}

///-------------------------------------------------
const logRepository = new DatabaseLogRepository();
const log = new LogExporter(logRepository);

console.log(await log.exportLogs("json"));
console.log(await log.exportLogs("csv"));
console.log(await log.exportLogs("xml"));
