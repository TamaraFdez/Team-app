
import { spawn } from 'node:child_process'
import readline from 'node:readline/promises'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const dev = [
  '-f', 'docker-compose.yml',
  '-f', 'docker-compose.dev.yml'
]

const prod = []

function ejecutar(args) {
  return new Promise((resolve) => {
    const proceso = spawn('docker', ['compose', ...args], {
      stdio: 'inherit',
      shell: false
    })

    proceso.on('close', (codigo) => {
      resolve(codigo)
    })

    proceso.on('error', (error) => {
      console.error('Error:', error.message)
      resolve(1)
    })
  })
}

async function menu() {
  console.clear()

  console.log('==========================')
  console.log('    TEAM-APP DOCKER')
  console.log('==========================')
  console.log('1. Iniciar desarrollo')
  console.log('2. Iniciar producción')
  console.log('3. Detener contenedores')
  console.log('4. Pausar contenedores')
  console.log('5. Reanudar contenedores')
  console.log('6. Eliminar contenedores')
  console.log('7. Eliminar contenedores y base de datos')
  console.log('0. Salir')
  console.log('==========================')

  const opcion = await rl.question('Selecciona una opción: ')

  switch (opcion) {
    case '1':
      await ejecutar([...dev, 'up', '--build'])
      break

    case '2':
      await ejecutar(['up', '--build', '-d'])
      break

    case '3':
      await ejecutar(['stop'])
      break

    case '4':
      await ejecutar(['pause'])
      break

    case '5':
      await ejecutar(['unpause'])
      break

    case '6':
      await ejecutar(['down'])
      break

    case '7': {
      const confirmar = await rl.question(
        'Se borrarán todos los datos de MariaDB. ¿Continuar? (s/n): '
      )

      if (confirmar.toLowerCase() === 's') {
        await ejecutar(['down', '-v'])
      }
      break
    }

    case '0':
      rl.close()
      return

    default:
      console.log('Opción no válida')
  }

  if (opcion !== '0') {
    await rl.question('\nPulsa ENTER para continuar...')
    await menu()
  }
}

menu()
