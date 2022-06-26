async function fetchDataAsync() {
    // fetching data from url;
    let result = {};
    try {
        const requestUrl = `https://random-data-api.com/api/business_credit_card/random_card?size=100`;
        const res = await fetch(requestUrl);
        if (!res.ok) {
            result.succeded = false;
            result.message = `Response status is: ${res.status}`;
            // console.error(`Response status is: ${res.status}`);
            throw result.message; // throwing message to ex
        } else {
            const data = await res.json();
            result.succeded = true;
            result.data = data;
        }
    } catch (ex) {
        console.error(ex);
        // throw ex;
    }
    return result;
};
async function openDbAsync() {
    var dbReq = await indexedDB.open("x-shop", 1);

    return new Promise(function (resolve, reject) {

        dbReq.onsuccess = function (e) {
            // console.log("Db is opened");
            resolve(e.target.result);
        };

        dbReq.onerror = function (event) {
            reject("An Error occured while opening database");
        };

        dbReq.onupgradeneeded = e => {
            // console.log('Database needs upgrade!');
            let db = e.target.result;
            let objectStore = db.createObjectStore("cards", { autoIncrement: true, keyPath: 'index' });
            // objectStore.createIndex("index", "index", { unique: true });
        };
    });
};
async function addCardsAsync(arr) {
    const cr = await clearTableAsync("cards");
    // console.log(cr, "Clearing Table Result");

    const db = await openDbAsync();
    // console.log(db, "openning db result");

    const tx = db.transaction(["cards"], "readwrite");

    var dbIndex = 1;
    arr.forEach((data) => {
        data.index = dbIndex;
        let request = tx.objectStore("cards").put(data);
        dbIndex += 1;
    });

    return new Promise(function (resolve, reject) {
        tx.oncomplete = function (event) {
            // console.log("Transaction completed! All Datas Has Been Added");
            resolve(true);
        };
        tx.onerror = (err) => {
            console.error(`An Error occured while adding transactions: `, err.target.error);
            resolve(err.target.error);
        };
    });
};
async function clearTableAsync(tbl) {
    const db = await openDbAsync();

    // clearing object store req
    const request = db.transaction(tbl, "readwrite").objectStore(tbl).clear();

    return new Promise(function (resolve, reject) {

        request.onsuccess = () => {
            // console.log(`Object Store "${tbl}" cleared!`);
            db.close(); // closing connection.
            resolve(true);
        };

        request.onerror = (err) => {
            console.error(`An Error occured while clearing Object Store Named: ${tbl}`);
            reject("Error");
        };
    });
};

async function getPagedDataAsync(activePageNumb) {

    const db = await openDbAsync();
    const tx = db.transaction(["cards"], "readonly");
    const store = tx.objectStore('cards');


    let pagedData = {};

    var countRequest = store.count();

    countRequest.onsuccess = function (e) {
        pagedData.activePage = activePageNumb == 0 ? 1 : activePageNumb;
        pagedData.items = [];
        pagedData.totalRecords = e.target.result;
        pagedData.totalPage = e.target.result / 10 - 1;
    }

    // paging.
    const startIndex = activePageNumb * 10 + 1;
    const endIndex = startIndex == 0 ? 10 : (activePageNumb + 1) * 10;

    const request = store.openCursor();

    request.onsuccess = function (event) {

        const cursor = event.target.result;
        if (cursor) {
            if (startIndex <= cursor.value.index && cursor.value.index <= endIndex) {
                pagedData.items.push(cursor.value);
            }
            cursor.continue();
        } else {
            // no more results
        }
    };

    return new Promise((resolve, reject) => {
        tx.oncomplete = event =>{
            db.close();
            resolve(pagedData);
        }
        tx.onerror = event => reject(event.target);
    });

}

self.onmessage = async (e) => {
    const process = JSON.parse(e.data);

    if (process.method === 'fetchData') {
        // Call Vuex that new operation begins.
        const uniqueId = new Date().getTime();
        self.postMessage({ module: "operations", action: "startNewOperation", payload: uniqueId })
        const response = await fetchDataAsync();
        if (response.succeded) {
            const dataArr = response.data;
            const insertCardResult = await addCardsAsync(dataArr);
            // console.log(insertCardResult, "insertCardResult");
            if (insertCardResult) {
                // state güncelle.
                const finishedAt = new Date();

                self.postMessage(
                    {
                        module: "operations",
                        action: "finishOperation",
                        payload: {
                            uid: uniqueId,
                            finishedAt: finishedAt
                        }
                    });

                self.postMessage(
                    {
                        module: "cards",
                        action: "insertCards",
                        payload: dataArr
                    });
            }
        }
    } else if (process.method === 'getPagedData') {
        const activePage = process.params.activePage;
        const pagedDataResult = await getPagedDataAsync(activePage);
        self.postMessage(
            {
                module: "cards",
                action: "setListViewData",
                payload: pagedDataResult
            }
        );

    } else {
        throw new Error("Worker Function Not Found !");
    }
};



