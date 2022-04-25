import React from "react"
import axios from "axios"
const $ = window.$;

export class Tablo extends React.Component
{
    constructor(props){ super(props); this.state = { data: [] } }
    
    componentDidMount()
    {    
        axios.get('https://localhost:44397/api/TodoList').then(response => { this.setState({ data: response.data }); });    
        
        this.dataTable();
    } 

    dataTable()
    {
        $(document).ready(function () {
            setTimeout(function(){
                $('#exampleTablo').DataTable();
             }, 50);

             $.extend( $.fn.dataTable.defaults, {
                order: [[ 1, "asc" ]],
                lengthMenu: [[10, 25, 50, -1], ['10', '25', '50', 'Hepsini Göster']],
                responsive: true
            });
      });
    }

  render(){
      return(
        <div className="maincontainer">
            <div className="container mb-5 mt-5">
               
        <table id="exampleTablo" className="table table-hover table-bordered">
            <thead>
                <tr className="table-info">
                    <th className="col-8">Name</th>
                    <th className="col-2">Priority</th>
                    <th className="col-2">Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                this.state.data.map((result) => 
                {
                    return(
                        <tr key={result.id}>
                            <td>{result.name}</td>
                            <td>{result.priority}</td>
                            <td>
                                <button className='btn btn-light mr-1' onClick={e => {this.todoListDetails(result.id)}}> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </button> 
                                &nbsp;
                                <button className='btn btn-light mr-1' onClick={e => {this.DeleteTodo(result.id)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    )
                }
                )
            }
        </tbody>
    </table>
    </div>
    </div>
    )
  }
}

export default Tablo