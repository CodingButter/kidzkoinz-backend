const buildProdLogger = () => {
  const { format, createLogger, transports } = require("winston");
  const { timestamp, combine, errors, json } = format;
  return createLogger({
    level: process.env.LOGGING_LEVEL || "info",
    format: combine(timestamp(), errors({ stack: true }), json()),
    transports: [
      new transports.File({ filename: "logs/error.log", level: "error" }),
      new transports.File({ filename: "logs/warning.log", level: "warning" }),
      new transports.File({ filename: "logs/debug.log", level: "debug" }),
      new transports.Console(),
    ],
    defaultMeta: { service: "apollo-server" },
  });
};
module.exports = buildProdLogger;
