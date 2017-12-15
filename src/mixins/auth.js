import router from "@/router";
import store from "@/store";

router.beforeEach((to, from, next) => {
  const authed = store._modules.root.state.users.user
  if (!authed) {
    next('/')
  } else {
    next()
  }
})
