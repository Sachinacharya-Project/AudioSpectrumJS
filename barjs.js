(function(){
    const audio = document.querySelector("audio")
    // audio.play()

    // This is a new context for audio
    const audioContext = new AudioContext()
    
    // Audio Source
    const audioSource = audioContext.createMediaElementSource(audio)

    // Analyzer
    const analayzer = audioContext.createAnalyser()

    audioSource.connect(analayzer)
    audioSource.connect(audioContext.destination)

    // Getting analyzed Frequency
    const dataArray = new Uint8Array(analayzer.frequencyBinCount)
    analayzer.getByteFrequencyData(dataArray)
    const BarCount = 55
    for(let i = 0;i < BarCount; i++){
        const bar = document.createElement('div')
        bar.classList.add('databar')
        document.querySelector('.visCon').appendChild(bar)
        const barac = document.createElement('div')
        barac.classList.add('bar')
        bar.appendChild(barac)
    }

    const renderFrame = ()=>{
        analayzer.getByteFrequencyData(dataArray)
        const bars = document.querySelectorAll('.bar')
        for(let i = 0; i < BarCount; i++){
            const fd = dataArray[i]
            const baris = bars[i]
            if(!baris){
                continue
            }
            const barHeight = (Math.max(4, fd || 0) / 180) * 100
            baris.style.height = `${barHeight}%`
        }
    }

    renderFrame()
    setInterval(renderFrame, 100)
})()

const audio = document.querySelector('audio')
audio.onpause = ()=>{
    const Bars = document.querySelectorAll('.bar')
    Bars.forEach(bar => {
        const currentHeight = bar.clientHeight
        bar.style.height = `${currentHeight}px`
    })
}

const playPause = (el)=>{
    if(el == 'pause'){
        document.querySelector('.pause').style.display = 'none'
        document.querySelector('.play').style.display = 'block'
        audio.pause()
    }else{
        audio.play()
        audio.volume = 1
        document.querySelector('.play').style.display = 'none'
        document.querySelector('.pause').style.display = 'block'
    }
}
let cd = 0
document.addEventListener('keyup', (e)=>{
    if(e.keyCode === 32){
        if (cd === 0){
            playPause('play')
            cd = 1
        }else{
            playPause('pause')
            cd = 0
        }
    }
})