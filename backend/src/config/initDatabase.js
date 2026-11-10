
import db from './database.js'

const tablas = [
  `CREATE TABLE IF NOT EXISTS usuario (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    hash_contrasena VARCHAR(255) NOT NULL,
    alineamiento ENUM(
      'Lawful Good',
      'Neutral Good',
      'Chaotic Good',
      'Lawful Neutral',
      'True Neutral',
      'Chaotic Neutral',
      'Lawful Evil',
      'Neutral Evil',
      'Chaotic Evil'
    ) NOT NULL,
    avatar VARCHAR(500)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS personaje (
    id INT UNSIGNED PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    datos JSON NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS equipo (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT UNSIGNED NOT NULL,
    nombre VARCHAR(120) NOT NULL,
    descripcion TEXT,
    size INT UNSIGNED NOT NULL,
    CONSTRAINT fk_equipo_usuario
      FOREIGN KEY (usuario_id) REFERENCES usuario(id)
      ON DELETE CASCADE,
    CONSTRAINT chk_equipo_size CHECK (size > 0)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS recluta (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT UNSIGNED NOT NULL,
    personaje_id INT UNSIGNED NOT NULL,
    estado ENUM('pendiente', 'aceptado', 'rechazado')
      NOT NULL DEFAULT 'pendiente',
    equipo_id INT UNSIGNED NULL,
    fecha_reclutamiento DATETIME NULL,

    UNIQUE KEY uq_recluta_usuario_personaje
      (usuario_id, personaje_id),

    CONSTRAINT fk_recluta_usuario
      FOREIGN KEY (usuario_id) REFERENCES usuario(id)
      ON DELETE CASCADE,

    CONSTRAINT fk_recluta_personaje
      FOREIGN KEY (personaje_id) REFERENCES personaje(id),

    CONSTRAINT fk_recluta_equipo
      FOREIGN KEY (equipo_id) REFERENCES equipo(id)
      ON DELETE SET NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS historial_misiones (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT UNSIGNED NOT NULL,
    equipo_id INT UNSIGNED NOT NULL,
    mision_id VARCHAR(50) NOT NULL,
    nombre_mision VARCHAR(255) NOT NULL,
    estadisticas JSON NOT NULL,
    porcentaje_exito DECIMAL(5,2) NOT NULL,
    resultado ENUM(
      'Pendiente',
      'Catástrofe',
      'Misión fallida',
      'Regulinchi',
      'Terminada',
      'Perfecto'
    ) NOT NULL DEFAULT 'Pendiente',
    fecha_inicio DATETIME NOT NULL,
    fecha_finalizacion DATETIME NOT NULL,

    CONSTRAINT fk_mision_usuario
      FOREIGN KEY (usuario_id) REFERENCES usuario(id)
      ON DELETE CASCADE,

    CONSTRAINT fk_mision_equipo
      FOREIGN KEY (equipo_id) REFERENCES equipo(id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`
]

export async function inicializarTablas() {
  for (const sql of tablas) {
    await db.query(sql)
  }

  console.log('Estructura de la base de datos preparada')
}
