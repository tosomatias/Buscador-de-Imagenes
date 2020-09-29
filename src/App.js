
import React, {useEffect, useState } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {
  const [busqueda,guardarBusqueda] = useState("");
  const [imagenes ,guardarImagenes] = useState([]);
  const [paginaactual,guardarPaginaActual] = useState(1);
  const [totalpaginas,guardarTotalPaginas] =useState(1);


  useEffect(() => {
    const consultarApi = async() => {
      if(busqueda === "") return;
      const imagenesPorPagina = 32;
      const key = '18396671-070e4513bbf6e04f773cbac40';
      const url = `http://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina );
      guardarTotalPaginas(calcularTotalPaginas);

      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: "smooth"});
    }
  
    consultarApi();
  },[busqueda,paginaactual]);

    const paginaAnterior= () => {
      const nuevaPaginaActual = paginaactual - 1;
      if(nuevaPaginaActual === 0) return;
      guardarPaginaActual(nuevaPaginaActual);

    }
    const paginaSiguiente = ()  => {
      const nuevaPaginaActual = paginaactual + 1;
      if (nuevaPaginaActual > totalpaginas) return;
      guardarPaginaActual(nuevaPaginaActual);
    }


  return (
    <div className="container">
  
      <div className="jumbotron">
        <h1 className=" text-center mb-5">Buscador de Imagenes</h1>
        <Formulario 
          guardarBusqueda = {guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
            imagenes = {imagenes}
          />  
        {(paginaactual === 1)? null : (
          <button 
                type="button"
                className="bbtn btn-info mr-1"
                onClick={paginaAnterior}
          >&laquo; Anterior </button>
        )} 
        {paginaactual === totalpaginas? null : (
          <button 
                type="button"
                className="bbtn btn-info mr-1"
                onClick={paginaSiguiente}
          > Siguente &raquo;</button>
        )}

      </div>
      
    </div>
  );
}

export default App;
