import Clock from './deps/clock.js';
import View from './view.js';

const view = new View()
const clock = new Clock()
const worker = new Worker('./src/worker/worker.js', {
    type: 'module'
})

worker.onmessage = ({ data }) => {
    if (data.status !== 'done') return;
    clock.stop()
    view.updateElapsedTime(`Process took ${took.replace('ago', '')}`)
}

let took = ''
view.configureOnFileChange((file) => {
    worker.postMessage({
        file
    })

    clock.start((time) => {
        took = time;
        view.updateElapsedTime(`Process started ${time}`)
    })
})

// modelo de fetch fake para imitar iteração do user
async function fakeFetch() {
    const filePath = '/videos/frag_bunny.mp4'
    const response = await fetch(filePath, {
        method: "HEAD"
    })

    // trás o tamanho do arquivo
    const file = new File([await response.blob()], filePath, {
        type: "video/mp4",
        lastModified: Date.now()
    })

    const event = new Event('change')
    Reflect.defineProperty(
        event,
        'target',
        { value: { files: [file] } }
    )

    document.getElementById('fileUpload').dispatchEvent(event)
}

fakeFetch()