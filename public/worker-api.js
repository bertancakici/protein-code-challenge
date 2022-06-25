import Worker from 'worker-loader!./worker'
import * as Comlink from 'comlink'

const worker = Comlink.wrap(new Worker())

// callers
export const getData = async(url) => await worker.fetchDataAsync(url);
export const insertCards = async(dataArr) => await worker.addCardsAsync(dataArr);