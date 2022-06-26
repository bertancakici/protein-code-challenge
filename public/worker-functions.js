// implements
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

    return new Promise(function(resolve, reject) {

        dbReq.onsuccess = function(e) {
            // console.log("Db is opened");
            resolve(e.target.result);
        };

        dbReq.onerror = function(event) {
            reject("An Error occured while opening database");
        };

        dbReq.onupgradeneeded = e => {
            // console.log('Database needs upgrade!');
            let db = e.target.result;
            let objectStore = db.createObjectStore("cards", { autoIncrement: true, keyPath: 'id' });
        };
    });
};
async function addCardsAsync(arr) {
    const cr = await clearTableAsync("cards");
    // console.log(cr, "Clearing Table Result");

    const db = await openDbAsync();
    // console.log(db, "openning db result");

    const tx = db.transaction(["cards"], "readwrite");

    arr.forEach((data) => {
        let request = tx.objectStore("cards").put(data);
    });

    return new Promise(function(resolve, reject) {
        tx.oncomplete = function(event) {
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

    return new Promise(function(resolve, reject) {

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

self.onmessage = async(e) => {
    if (e.data === 'getData') {
        // Perform the calculation
        const response = await fetchDataAsync();
        if (response.succeded) {
            const dataArr = response.data;
            const insertCardResult = await addCardsAsync(dataArr);
            // console.log(insertCardResult, "insertCardResult");
            if (insertCardResult) {
                // state güncelle.

            }
        }
    } else {
        throw new Error("Worker Function Not Found !");
    }
};