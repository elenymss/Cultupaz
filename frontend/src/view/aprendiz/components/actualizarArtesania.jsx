import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function ActualizarArtesania({ artesania, onActualizar }) {
  // Estado para almacenar los valores de los campos
  const [titulo, setTitulo] = useState(artesania.titulo);
  const [descripcion, setDescripcion] = useState(artesania.descripcion);
  const [imagenActual, setImagenActual] = useState(artesania.img_uno);

  // Estado para almacenar la nueva imagen seleccionada
  const [img_uno, setImagen] = useState(null);

  // Manejador de cambios de imagen
  const handleImageChange = (ev) => {
    const file = ev.target.files[0];
    setImagen(file);
    setImagenActual(null); // Agregar esta línea para ocultar la imagen actual
  };
  

  // Función para enviar la solicitud de actualización
  const actualizarArtesania = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("imgArtesania", img_uno || imagenActual); // Si se selecciona una nueva imagen, se utiliza, de lo contrario, se mantiene la imagen actual

      formData.append("titulo", titulo);
      formData.append("descripcion", descripcion);
      formData.append("idUsuario", localStorage.getItem("idUsuario"));

      // Mostrar mensaje de carga mientras se realiza la solicitud
      const loading = Swal.fire({
        title: "Actualizando Artesania",
        text: "Por favor espera un momento...",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Realizar la solicitud de actualización usando axios
      const response = await axios.put(
        `http://localhost:7000/artesania/${artesania.idartesanias}`,
        formData
      );

      loading.close();
      if (response.status === 200) {
        // Mostrar mensaje de éxito si la actualización fue exitosa
        Swal.fire({
          icon: "success",
          title: "¡Artesanía actualizada!",
          text: response.data,
          showConfirmButton: false,
          timer: 1500,
        })
      }

      // Llamar a la función "onActualizar" proporcionada como prop para actualizar los datos en el componente padre
      onActualizar();
    } catch (error) {
      // Mostrar mensaje de error si la actualización falla
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: "Hubo un error al actualizar la artesanía. Por favor, intenta de nuevo.",
      });
    }
  };

  return (
    
    <div className="card-body">
      <form onSubmit={actualizarArtesania} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            Título:
          </label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción:
          </label>
          <textarea
            className="form-control"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3 text-center alig-items-center">
            <label className="form-label">Imágenes:</label><br></br>
            {imagenActual && (
              <div className="mb-3">
                <label className="form-label">Imagen actual:</label><br></br>
                <img src={imagenActual} alt="Imagen actual" className="w-50" />
              </div>
            )}
            {img_uno && (
              <div className="mb-3">
                <label className="form-label">Nueva imagen:</label><br></br>
                <img src={URL.createObjectURL(img_uno)} alt="Nueva imagen" className="w-50" />
              </div>
              
            )}
            
            <label className="form-label link">Subir imagen</label>
            <input
              type="file"
              className="form-control form-control-lg"
              accept="image/jpeg, image/png"
              name="imgArtesania"
              onChange={handleImageChange}
            />
          

        <button type="submit" className="btn btn-reg p-2 mt-4">
          actualizar
        </button>
        </div>
      </form>
    </div>
  );
}

export default ActualizarArtesania;
