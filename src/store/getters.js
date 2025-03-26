const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  satoken: state => state.user.satoken,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters
