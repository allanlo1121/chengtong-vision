export const logger = {
  info(message: string, meta?: Record<string, any>) {
    console.log(
      JSON.stringify({
        level: "info",
        message,
        ...meta,
        time: new Date().toISOString(),
      })
    );
  },

  error(message: string, meta?: Record<string, any>) {
    console.error(
      JSON.stringify({
        level: "error",
        message,
        ...meta,
        time: new Date().toISOString(),
      })
    );
  },
};
