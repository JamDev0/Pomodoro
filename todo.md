[] - Usar date-fns diference para calcular quanto tempo ja passou desde o começo do timer (substituir o atual metodo)

[] - Desabilitar os inputs ao iniciar o timer

[] - Arrumar a desativação do botão

[] - Para parar o timer fazer algo assim:

    `
        function stop() {
            setCurrentTimerId(null);
            console.log('Interrompido')
        }

        if(currentTimerId) {
            setTimerStatus('onGoing')
            setInterval(interval, 1000)
        } else {
            console.log('Não entrou no if')
            clearInterval(interval)
        }
    `

    só é preciso dar um jeito do interval parar