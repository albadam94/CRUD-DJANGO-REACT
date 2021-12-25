import React, { Component } from 'react';
import CustomersService from './CustomersService';

const customersService = new CustomersService();

class CustomersList extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      nextPageURL: ''

    };
    this.nextPage = this.nextPage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    
  }  
  componentDidMount() {
    var self = this;
    customersService.getCustomers().then(function (result) {
      console.log(result);
      self.setState({ customers: result.data, nextPageURL: result.nextlink})
    });
  }

  handleDelete(e,pk){

    var self = this;
    customersService.deleteCustomer({pk : pk}).then(()=>{
      var newArr = self.state.customers.filter(function(obj) {
        return obj.pk !== pk;
      });

      self.setState({customers: newArr})
    });
    
  }
  
  nextPage(){
    var self = this;
    console.log(this.state.nextPageURL);
    customersService.getCustomersByURL(this.state.nextPageURL).then((result) => {

      self.setState({ customers: result.data, nextPageURL: result.nextlink})

    });      
    
  }

  render() {
    return (
      <div className="customers--list">
          <table className="table">
          <thead key="thead">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Descripcion</th>   
            <th>Acciones</th>   
          </tr>
          </thead>

            <tbody>
            {this.state.customers.map( c =>

              <tr key={c.pk}>
                <td>{c.pk} </td>
                <td>{c.Nombre}</td>
                <td>{c.Apellido}</td>
                <td>{c.Telefono}</td>
                <td>{c.Email}</td>
                <td>{c.Direccion}</td>
                <td>{c.Descripcion}</td>
                <td>
                <button  onClick={(e)=> this.handleDelete(e,c.pk) }> Eliminar</button>
                <a  href={"/customer/" + c.pk}>Actualizar</a> 
                </td>
              </tr>)}
              </tbody>
          </table>  
          <button className="btn btn-primary" onClick= { this.nextPage }>Siguiente</button>

      </div>
    );
  }
}

export default CustomersList;