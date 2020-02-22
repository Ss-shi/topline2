
import router from '../router'

router.beforeEach((to, from, next) => {
  // ...
//   console.log(to)
  if (to.path !== '/login') {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
