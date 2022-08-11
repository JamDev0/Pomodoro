import { useEffect, useState } from 'react'

export function Teste() {
  const [itShouldGo, setItShouldGo] = useState<boolean>(true)

  const [test, setTest] = useState<number | null>(null)

  console.log('Teste: ' ,test)

  useEffect(() => {

  }, [])

  return (
    <>
      <button onClick={() => {
        if(itShouldGo) {
          const interval = setInterval(() => {
            console.log('Se passaram 1s')
          }, 1000)

          setTest(interval)
        }
      }}>
        Play
      </button>

      <button onClick={() => {
        if(test) {
          clearInterval(test)
        }
      }}>
        Stop
      </button>
    </>
  )
}
