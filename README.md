
![Logo](https://raw.githubusercontent.com/bertancakici/protein-code-challenge/main/public/git-images/protein.png)
# Protein Code Challenge

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```


## Screenshots

- [Import Page](https://github.com/bertancakici/protein-code-challenge/blob/main/src/views/ImportView.vue)
![ImportView](https://raw.githubusercontent.com/bertancakici/protein-code-challenge/main/public/git-images/importPage.png)
____

- [List Page](https://github.com/bertancakici/protein-code-challenge/blob/main/src/views/ListView.vue)
![ListView](https://raw.githubusercontent.com/bertancakici/protein-code-challenge/main/public/git-images/listPage.png)
____
- [Analyze Page](https://github.com/bertancakici/protein-code-challenge/blob/main/src/views/AnalyzeView.vue)
![AnalyzeView](https://raw.githubusercontent.com/bertancakici/protein-code-challenge/main/public/git-images/analyzePage.png)

  
# USING WORKER

## Sending Message to Worker-Functions

| Message Object Prop | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `method` | `string` |  A method name to be handled by the Worker |
| `params` | `any` |   Parameters to be used in the method |

#### Example

```http
const message = {
  method: "getPagedData",
  params: {
    activePage: 5,
  },
};
```




## What happens when Worker gets message from Worker-Functions?
Triggers VUEX ACTION by sent message. Also sends parameters if message has.


| Prop | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `module` | `string` |  A module name Vuex Store |
| `action` | `string` |  An action name in module |
| `payload` | `any` |   Action parameters |


#### Message Example

```http
// msg obj
const msg = {
    module: "operations",
    action: "finishOperation",
    payload: {
        uid: uniqueId,
        finishedAt: finishedAt
    }
}

// sending back to worker
self.postMessage(msg);
```

#### Where it triggers
```http
// worker.js 
worker.onmessage =  e => {
     store.dispatch(`${e.data.module}Module/${e.data.action}`, e.data.payload);
}
``` 

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm test
```

![ExampleTest](https://raw.githubusercontent.com/bertancakici/protein-code-challenge/main/public/git-images/example-test.png)
# Commit History

[Link](https://github.com/bertancakici/protein-code-challenge/commits/main)