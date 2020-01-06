/*

 siteMap.js

*/

// Import Modules.
import App from '@/base/Apps/AppSiteMap'

// Created Instance.
const app = new App()

// Initial.
app.init()

// DOM Content Loaded.
window.addEventListener('DOMContentLoaded', () => {
  app.domContentLoaded()
})

// Load.
window.addEventListener('load', () => {
  app.load()
})

// Resize.
window.addEventListener('resize', () => {
  app.resize()
})

// Scroll.
window.addEventListener('scroll', () => {
  app.scroll()
})
