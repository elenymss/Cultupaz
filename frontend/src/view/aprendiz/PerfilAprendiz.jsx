import React, { useEffect, useState } from "react";
//import componentes

import Perfil from "../../assets/img/Perfil.png";
import axios from "axios";
import Swal from "sweetalert2";

function AprendizPerfil() {
  const [verUsuario, setVerUsuario] = useState([]);

  const [imagenActual, setImagenActual] = useState(null);
  const [nombres, setNombres] = useState(null);
  const [apellidos, setApellidos] = useState(null);
  const [email, setEmail] = useState(verUsuario.email);
  const [telefono, setTelefono] = useState(verUsuario.telefono);
  const [foto, setImagen] = useState(null);
  const [usuario, setUsuario] = useState(verUsuario.usuario);

  useEffect(() => {
    if (verUsuario.length > 0) {
      setImagenActual(verUsuario[0].foto);
      setNombres(verUsuario[0].nombres);
      setApellidos(verUsuario[0].apellidos);
      setEmail(verUsuario[0].correo);
      setTelefono(verUsuario[0].telefono);
      setUsuario(verUsuario[0].usuario);
    }
  }, [verUsuario]);

  // Manejador de cambios de imagen
  const handleImageChange = (ev) => {
    const file = ev.target.files[0];
    setImagen(file);
    setImagenActual(null); // Agregar esta línea para ocultar la imagen actual
  };

  // Función para enviar la solicitud de actualización
  const actualizarDatos = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nombres", nombres);
      formData.append("apellidos", apellidos);
      formData.append("telefono", telefono);
      formData.append("foto", foto || imagenActual);
      formData.append("usuario", usuario);
      formData.append("correo", email);
      const loading = Swal.fire({
        title: "Actualizando datos",
        text: "Por favor espera un momento...",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Realizar la solicitud de actualización usando axios
      const response = await axios.put(
        `http://localhost:7000/actualizarAprendiz/${localStorage.getItem(
          "idUsuario"
        )}`,
        formData
      );

      loading.close();
      if (response.status === 200) {
        // Mostrar mensaje de éxito si la actualización fue exitosa
        Swal.fire({
          icon: "success",
          title: "¡Datos actualizada!",
          text: response.data,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      // Mostrar mensaje de error si la actualización falla
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: "Hubo un error al actualizar la datos. Por favor, intenta de nuevo.",
      });
    }
  };

  const verDatosUsuario = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7000/verAprendiz/${localStorage.getItem("idUsuario")}`
      );
      setVerUsuario(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    verDatosUsuario();
  }, []);

  return (
    <body>
      <main className="container mt-4">
        <div className="pagetitle">
          <h1>Perfil</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Inicio</a>
              </li>
              <li className="breadcrumb-item">Admin</li>
              <li className="breadcrumb-item active">Perfil</li>
            </ol>
          </nav>
        </div>

        <section className="section profile">
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                {verUsuario.map((usuarios) => (
                  <div
                    className="card-body profile-card pt-4 d-flex flex-column align-items-center"
                    key={usuarios.idUsuario}
                  >
                    <img
                      src={Perfil}
                      alt="Profile"
                      className="rounded-circle"
                    />
                    <h2>{usuarios.nombres}</h2>
                    <h3>Aprendiz</h3>
                    {/* <div className="social-links mt-2">
                                <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                                <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                                <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                                <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                            </div> */}
                  </div>
                ))}
              </div>
            </div>

            <div className="col-xl-8">
              <div className="card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-overview"
                      >
                        Descripción
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                      >
                        Editar perfil
                      </button>
                    </li>

                    {/* <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-change-password"
                      >
                        Cambiar contraseña
                      </button>
                    </li> */}
                  </ul>
                  <div className="tab-content pt-2">
                    {verUsuario.map((usuarios) => (
                      <div
                        className="tab-pane fade show active profile-overview"
                        key={usuarios.idUsuario}
                        id="profile-overview"
                      >
                        <h5 className="card-title">Información Perfil</h5>

                        <div className="row">
                          <div className="col-lg-3 col-md-4 label ">
                            Nombres :
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {usuarios.nombres}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-3 col-md-4 label">
                            Apellidos :
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {usuarios.apellidos}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-3 col-md-4 label">
                            celular:
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {usuarios.telefono}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-3 col-md-4 label">Ficha :</div>
                          <div className="col-lg-9 col-md-8">
                            {usuarios.ficha}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 col-md-4 label">
                            Genero :
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {usuarios.genero}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 col-md-4 label">
                            Fecha nacimiento :
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {usuarios.fechaNacimiento}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 col-md-4 label">
                            Tipo documento :
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {usuarios.tipoDocumento}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 col-md-4 label">
                            Número documento :
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {usuarios.numeroDocumento}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 col-md-4 label">
                            Usuario:
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {usuarios.usuario}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-3 col-md-4 label">Email :</div>
                          <div className="col-lg-9 col-md-8">
                            {usuarios.correo}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div
                      className="tab-pane fade profile-edit pt-3"
                      id="profile-edit"
                    >
                      {/* edit perfil */}
                      <form
                        onSubmit={actualizarDatos}
                        encType="multipart/form-data"
                      >
                        <div className="row mb-3">
                          <label
                            for="profileImage"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Imagen perfil
                          </label>

                          <div className="col-md-8 col-lg-9">
                            {imagenActual && (
                              <div className="mb-3">
                                <label className="form-label">
                                  Imagen actual:
                                </label>
                                <br></br>
                                <img
                                  src={imagenActual}
                                  alt="Imagen actual"
                                  className="w-50"
                                />
                              </div>
                            )}
                            <div className="pt-2">
                              {foto && (
                                <div className="mb-3">
                                  <label className="form-label">
                                    Nueva imagen:
                                  </label>
                                  <br></br>
                                  <img
                                    src={URL.createObjectURL(foto)}
                                    alt="Nueva imagen"
                                    className="w-50"
                                  />
                                </div>
                              )}
                              {/* <a
                                href="#"
                                className="btn btn-primary btn-sm"
                                title="Upload new profile image"
                              >
                                <i className="bi bi-upload"></i>
                              </a> */}
                              {/* <a
                                href="#"
                                className="btn btn-danger btn-sm"
                                title="Remove my profile image"
                              >
                                <i className="bi bi-trash"></i>
                              </a> */}
                              <label className="form-label link">
                                Subir imagen
                              </label>
                              <input
                                type="file"
                                className="form-control form-control-lg"
                                accept="image/jpeg, image/png"
                                name="imgArtesania"
                                onChange={handleImageChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            htmlFor="titulo"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Nombre
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="nombres"
                              type="text"
                              className="form-control"
                              id="nombres"
                              value={nombres}
                              onChange={(e) => setNombres(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            for="fullName"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Apellido
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="fullName"
                              type="text"
                              className="form-control"
                              id="nombres"
                              value={apellidos}
                              onChange={(e) => setApellidos(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Email"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Correo
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="email"
                              type="email"
                              className="form-control"
                              id="Email"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Phone"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Telefono
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="phone"
                              type="text"
                              className="form-control"
                              id="Phone"
                              onChange={(e) => setTelefono(e.target.value)}
                              value={telefono}
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Phone"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Usuario
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) => setUsuario(e.target.value)}
                              value={usuario}
                            />
                          </div>
                        </div>

                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Guardar cambios
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </body>
  );
}

export default AprendizPerfil;
