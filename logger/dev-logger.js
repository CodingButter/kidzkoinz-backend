const buildDevLogger = () => {
  const moment = require("moment");
  const { format, createLogger, transports } = require("winston");
  const { timestamp, printf, combine, colorize, errors } = format;
  const logFormat = printf(
    ({ level, message, stack, timestamp }) =>
      `${moment(timestamp).format("llll")} ${level}: ${stack || message}`
  );

  return createLogger({
    level: process.env.LOGGING_LEVEL || "info",
    format: combine(
      colorize(),
      timestamp(),
      errors({ stack: true }),
      logFormat
    ),
    transports: [new transports.Console()],
  });
};
module.exports = buildDevLogger;
