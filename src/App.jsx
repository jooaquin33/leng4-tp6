import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [miBlob, setMiBlob] = useState(null)
  const [mensaje, setMensaje] = useState('')

  const crearBlob = () => {
    const contenido = 'Este es el contenido del archivo Blob para el Trabajo Práctico número 6.'
    const nuevoBlob = new Blob([contenido], { type: 'text/plain' })
    setMiBlob(nuevoBlob)
    setMensaje('¡Blob creado! Tamaño: ' + nuevoBlob.size + ' bytes.')
  }

  const descargarBlob = () => {
    if (!miBlob) {
      alert("Primero debes hacer clic en 'Crear Blob de texto'.")
      return
    }

    const url = URL.createObjectURL(miBlob)
    const enlaceInvisible = document.createElement('a')
    enlaceInvisible.href = url
    enlaceInvisible.download = 'mi_archivo_tp6.txt'

    document.body.appendChild(enlaceInvisible)
    enlaceInvisible.click()

    document.body.removeChild(enlaceInvisible)
    URL.revokeObjectURL(url)

    setMensaje('¡Archivo descargado correctamente!')
  }

  const usarSlice = () => {
    if (!miBlob) {
      alert("Primero debes hacer clic en 'Crear Blob de texto'.")
      return
    }

    const blobCortado = miBlob.slice(0, 10, 'text/plain')

    const lector = new FileReader()
    lector.onload = (evento) => {
      setMensaje("Resultado de slice (primeros 10 bytes): '" + evento.target.result + "'")
    }
    lector.readAsText(blobCortado)
  }

  return (
    <>
      <Header />
      <main className="container">
        <h2>Ejemplo de uso de Blobs</h2>
        <div className="botones">
          <button onClick={crearBlob}>Crear Blob de texto</button>
          <button onClick={descargarBlob}>Descargar Blob</button>
          <button onClick={usarSlice}>Usar slice()</button>
        </div>
        <p id="mensaje">{mensaje}</p>
      </main>
      <Footer />
    </>
  )
}

export default App
