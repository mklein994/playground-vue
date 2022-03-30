// Adapted from MDN:
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers

addEventListener("message", (e: MessageEvent<[number, number]>) => {
  const result = e.data[0] * e.data[1];
  if (isNaN(result)) {
    postMessage("Please write two numbers");
  } else {
    const workerResult = `Result: ${result}`;
    console.log("Worker: Posting message back to main script");
    postMessage(workerResult);
  }
});
