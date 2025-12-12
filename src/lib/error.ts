// Error handling console logger
export function Error(message: string) {
  const red = "\x1b[31m";
  const reset = "\x1b[0m";

  console.error(`${red}[Error]${reset} ${message}`);
}
