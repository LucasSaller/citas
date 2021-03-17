import { Fragment ,useState , useEffect} from "react";
import Form from "./components/Form"
import Cita from "./components/Cita"
function App() {
    //Citas en local Storage

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
        if(!citasIniciales){
          citasIniciales=[];
        }

  // Citas 
  const [citasCreadas,setCitasCreadas] = useState(citasIniciales);
  
  // useEffect 
  useEffect ( () => {
    if(citasIniciales){
      localStorage.setItem('citas',JSON.stringify(citasCreadas))
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citasCreadas,citasIniciales] );

  const crearCita = cita => {
    setCitasCreadas([
      ...citasCreadas,
      cita
    ]);

  }
  const eliminarCita = key => {
    const nuevasCitas = citasCreadas.filter(cita => cita.id !== key)
    setCitasCreadas(nuevasCitas);
  } 

  const titulo = citasCreadas.length === 0 ? 'No tienes Citas' : " Administra tus Citas"
  
  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className = "one-half column" > 
            <Form crearCita={crearCita}/>
          </div>
          <div className = "one-half column" > 
            <h2>{titulo}</h2>
            {citasCreadas.map(cita =>(
              <Cita
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
              />
            )
              )}
          </div>
        </div>
      </div>
    </Fragment>
     
    
  );
}

export default App;
