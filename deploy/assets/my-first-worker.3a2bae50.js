addEventListener("message",s=>{const e=s.data[0]*s.data[1];if(isNaN(e))postMessage("Please write two numbers");else{const t=`Result: ${e}`;console.log("Worker: Posting message back to main script"),postMessage(t)}});
//# sourceMappingURL=my-first-worker.3a2bae50.js.map
