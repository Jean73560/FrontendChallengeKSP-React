import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios';
import {Edit, Delete} from '@material-ui/icons';
import {
  Box,
  Container,
  makeStyles, 
  Modal, 
  Button, 
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card
} from '@material-ui/core';
import Page from '../../../components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  modal: {
    root: {
      minWidth: 275,
    },
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  

  const [empleadoSeleccionada, setempleadoSeleccionada]=useState({
    employeeID: '',
    fullName: '',
    work: '',
    salary: 0,
    status: 0,
    hireDate: '',
    photoPath: '',
    phone: ''
  })
  const baseUrl='http://localhost:63370/api/Employees';

  const peticionGet=async()=>{
    await axios.get(`${baseUrl}/GetAllAsync`)
    .then(response=>{
      console.log("llamada api",response.data.data);
      setData(response.data.data);
    })
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setempleadoSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(empleadoSeleccionada);
  }

  const peticionPost=async()=>{
    await axios.post(`${baseUrl}/InsertAsync`, empleadoSeleccionada)
    .then(response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
    })
  }

  const peticionPut=async()=>{
    await axios.put(`${baseUrl}/UpdateAsync`, empleadoSeleccionada)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(empleado=>{
        if(empleadoSeleccionada.employeeID===empleado.employeeID){
          empleado.employeeID = empleadoSeleccionada.employeeID
          empleado.fullName = empleadoSeleccionada.fullName
          empleado.work = empleadoSeleccionada.work
          empleado.salary = empleadoSeleccionada.salary
          empleado.status = empleadoSeleccionada.status
          empleado.hireDate = empleadoSeleccionada.hireDate
          empleado.photoPath = empleadoSeleccionada.photoPath
          empleado.phone = empleadoSeleccionada.phone
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(`${baseUrl}/DeleteAsync/${empleadoSeleccionada.employeeID}`)
    .then(response=>{
      setData(data.filter(empleado=>empleado.employeeID!==empleadoSeleccionada.employeeID));
      abrirCerrarModalEliminar();
    })
  }
  
  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarempleado=(empleado, caso)=>{
    setempleadoSeleccionada(empleado);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  const bodyInsertar=(
    <div className={classes.modal}>
      <h3>Agregar Nueva empleado</h3>
      <TextField name="employeeID" className={classes.inputMaterial} label="Id de Empleado" onChange={handleChange}/>
      <br />
      <TextField name="fullName" className={classes.inputMaterial} label="Nombre" onChange={handleChange}/>
      <br />
      <TextField name="work" className={classes.inputMaterial} label="Departamento" onChange={handleChange}/>
      <br />
      <TextField name="salary" className={classes.inputMaterial} label="Salario" onChange={handleChange}/>
      <br />
      <TextField name="status" className={classes.inputMaterial} label="Estatus" onChange={handleChange}/>
      <br />
      <TextField name="photoPath" className={classes.inputMaterial} label="Foto" onChange={handleChange}/>
      <br />
      <TextField name="phone" className={classes.inputMaterial} label="Telefono" onChange={handleChange}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={classes.modal}>
      <h3>Editar empleado</h3>
      <TextField name="employeeID" className={classes.inputMaterial} label="Id de Empleado" onChange={handleChange} value={empleadoSeleccionada && empleadoSeleccionada.employeeID}/>
      <br />
      <TextField name="fullName" className={classes.inputMaterial} label="Nombre" onChange={handleChange} value={empleadoSeleccionada && empleadoSeleccionada.fullName}/>
      <br />
      <TextField name="work" className={classes.inputMaterial} label="Departamento" onChange={handleChange} value={empleadoSeleccionada && empleadoSeleccionada.work}/>
      <br />
      <TextField name="salary" className={classes.inputMaterial} label="Salario" onChange={handleChange} value={empleadoSeleccionada && empleadoSeleccionada.salary}/>
      <br />
      <TextField name="status" className={classes.inputMaterial} label="Estatus" onChange={handleChange} value={empleadoSeleccionada && empleadoSeleccionada.status}/>
      <br />
      <TextField name="photoPath" className={classes.inputMaterial} label="Foto" onChange={handleChange} value={empleadoSeleccionada && empleadoSeleccionada.photoPath}/>
      <br />
      <TextField name="phone" className={classes.inputMaterial} label="Telefono" onChange={handleChange} value={empleadoSeleccionada && empleadoSeleccionada.phone}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={classes.modal}>
      <p>Estás seguro que deseas eliminar la empleado <b>{empleadoSeleccionada && empleadoSeleccionada.fullName}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )

  useEffect(async()=>{
    await peticionGet();
  },[])

  return (
    <Page
      className={classes.root}
      title="Employees"
    >
      <Container maxWidth={false}>
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button className={classes.exportButton}>
          Export
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={()=>abrirCerrarModalInsertar()}
        >
          Add Employee
        </Button>
      </Box>
        <Box mt={3}>
        <Card>
      <PerfectScrollbar>
        <Box minWidth={1050}>
        <Table>
         <TableHead>
           <TableRow>
             <TableCell>Nombre</TableCell>
             <TableCell>Departamento</TableCell>
             <TableCell>Salario</TableCell>
             <TableCell>Estatus</TableCell>
             <TableCell>Fecha Contratacion</TableCell>
             {/*<TableCell>Foto</TableCell>*/}
             <TableCell>Telefono</TableCell>
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(employee=>(
             <TableRow key={employee.employeeID}>
               <TableCell>{employee.fullName}</TableCell>
               <TableCell>{employee.work}</TableCell>
               <TableCell>{employee.salary}</TableCell>
               <TableCell>{employee.status ? 'Activo' : 'De Baja'}</TableCell>
               <TableCell>{moment(employee.hireDate).format('DD/MM/YYYY')}</TableCell>
               {/*<TableCell>{employee.photoPath}</TableCell>*/}
               <TableCell>{employee.phone}</TableCell>
               <TableCell>
                 <Edit className={classes.iconos} onClick={()=>seleccionarempleado(employee, 'Editar')}/>
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={classes.iconos} onClick={()=>seleccionarempleado(employee, 'Eliminar')}/>
                 </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
        </Box>
        <Modal
     open={modalInsertar}
     onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
     </Modal>

     <Modal
     open={modalEditar}
     onClose={abrirCerrarModalEditar}>
        {bodyEditar}
     </Modal>

     <Modal
     open={modalEliminar}
     onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
     </Modal>
      </Container>
    </Page>
  );
};

export default CustomerListView;
