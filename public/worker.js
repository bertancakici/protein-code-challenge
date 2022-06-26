import store from "@/store";
const worker = new Worker("./worker-functions.js", { type: "module" });

worker.onmessage = e => {
    console.log("message from WORKER-FUNCTIONS")
    store.dispatch(`${e.data.module}/${e.data.action}`, e.data.payload);

}



export default worker;