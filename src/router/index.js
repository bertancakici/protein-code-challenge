import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

// #region Routes
export const routes = [
    {
        path: "/",
        name: "import",
        component: () =>
            import ("../views/ImportView.vue"),
    },
    {
        path: "/list",
        name: "list",
        component: () =>
            import ("../views/ListView.vue"),
    },

    {
        path: "/analyze",
        name: "analyze",
        component: () =>
            import ("../views/AnalyzeView.vue"),
    },
];
// #endregion

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;