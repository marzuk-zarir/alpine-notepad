import persist from '@alpinejs/persist'
import Alpine from 'alpinejs'
import { main } from './main'
import './styles/main.css'

Alpine.plugin(persist)

window.Alpine = Alpine

document.addEventListener('DOMContentLoaded', () => {
    Alpine.start()
})

document.addEventListener('alpine:init', main)
