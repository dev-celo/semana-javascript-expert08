import Clock from './deps/clock.js';
import View from './view.js';

const view = new View()
const clock = new Clock()

let took = ''
view.configureOnFileChange((file) => {
    clock.start((time) => {
        took = time;
        view.updateElapsedTime(`Process started ${time}`)
    })

    setTimeout(() => {
        clock.stop()
        view.updateElapsedTime(`Process took ${took.replace('ago', '')}`)
    }, 5000)
})

// modelo de fetch fake para imitar iteração do user
async function fakeFetch() {
    const filePath = '/videos/frag_bunny.mp4'
    const response = await fetch(filePath, {
        method: "HEAD"
    })

    // trás o tamanho do arquivo
    console.log(response.headers.get('content-length'));
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