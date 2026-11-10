import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registro } from "../api/auth";
import { useAuth } from "../context/useAuth";
import "../styles/auth.css";
import logo from "../../public/Logo/Logo.svg";
import authBackground from "../assets/backgrounds/siluetas-1.png";

const alineamientos = [
  "Lawful Good",
  "Neutral Good",
  "Chaotic Good",
  "Lawful Neutral",
  "True Neutral",
  "Chaotic Neutral",
  "Lawful Evil",
  "Neutral Evil",
  "Chaotic Evil",
];

export default function Registro() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [alineamiento, setAlineamiento] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();
  const { comprobarSesion } = useAuth();

  async function enviar(e) {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      await registro({
        nombreUsuario,
        password,
        alineamiento,
      });

      const usuario = await comprobarSesion();
      if (!usuario) {
        throw new Error("No se ha podido comprobar la sesión.");
      }
      navigate("/");
    } catch (err) {
      setError(err.message || "No se ha podido crear la cuenta.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="auth-escena">
      <div className="auth-layout">
        <aside className="auth-ilustracion auth-villanos">
          <img src={authBackground} alt="Siluetas de héroes y villanos" />

          <div className="auth-ilustracion-texto">
            <span>TEAM APP / VILLAINS</span>
            <h2>El poder también tiene un precio.</h2>
            <p>Elige tu camino. Reúne a tus aliados. Cambia las reglas.</p>
          </div>
        </aside>

        <section className="auth-contenedor auth-contenedor-registro">
          <header className="auth-marca">
            <img className="auth-logo" src={logo} alt="Team App" />
            <h1>TEAM APP</h1>
            <p>Encuentra tu equipo. Vive la aventura.</p>
          </header>

          <div className="auth-tarjeta">
            <span className="auth-etiqueta">NUEVO COMANDANTE</span>
            <h2>Únete a la aventura</h2>

            <p className="auth-descripcion">
              Crea tu cuenta y elige tu alineamiento.
            </p>

            <form className="auth-formulario" onSubmit={enviar}>
              <label htmlFor="registro-usuario">Nombre de usuario</label>
              <input
                id="registro-usuario"
                type="text"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                placeholder="Elige un nombre de usuario"
                autoComplete="username"
                required
              />

              <label htmlFor="registro-password">Contraseña</label>
              <input
                id="registro-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Crea una contraseña"
                autoComplete="new-password"
                required
              />

              <fieldset className="auth-alineamiento">
                <legend>Elige tu alineamiento</legend>

                <div className="auth-grid-alineamiento">
                  {alineamientos.map((item) => (
                    <label
                      key={item}
                      className={`auth-opcion-alineamiento ${
                        alineamiento === item ? "seleccionado" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="alineamiento"
                        value={item}
                        checked={alineamiento === item}
                        onChange={(e) => setAlineamiento(e.target.value)}
                        required
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {error && <p className="auth-error">{error}</p>}

              <button type="submit" disabled={cargando}>
                {cargando ? "Creando cuenta..." : "Crear cuenta"}
              </button>
            </form>

            <p className="auth-enlace">
              ¿Ya tienes una cuenta? <Link to="/sesion">Inicia sesión</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
