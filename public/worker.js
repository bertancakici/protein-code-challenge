import store from "@/store";
const worker = new Worker("./worker-functions.js", { type: "module" });

worker.onmessage = e => {
    store.dispatch(`${e.data.module}Module/${e.data.action}`, e.data.payload);
}

export default worker;