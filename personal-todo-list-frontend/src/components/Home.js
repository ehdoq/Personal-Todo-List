import React, {Component} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const $ = window.$;

export class Home extends Component 
{
    constructor(props) 
    {
        super(props)
        this.state = {data:[], todoList:[]}

        this.EditTodo = this.EditTodo.bind(this);
    }
    
    tableData()
    {
        axios.get('https://localhost:44397/api/TodoList/').then(response =>
        {
            this.setState({data: response.data});
            this.dataTable();
        })
        .catch(function(error)
        {
            console.log(error);
        })
    }

    dataTable()
    {
        $(document).ready(function () {
            setTimeout(function(){
                $('#tablo').DataTable();
             }, 50);

             $.extend( $.fn.dataTable.defaults, {
                order: [[ 1, "asc" ]],
                lengthMenu: [[5, 10, 25, 50, -1], ['5', '10', '25', '50', 'Hepsini Göster']],
                responsive: true
            });
      });
    }
   
    componentDidMount()
    {
        this.tableData();
    }

    componentDidUpdate()
    {
        this.tableData();
    }

    AddTodo = () =>
    { 
        if(this.state.Name == null)
        {
            Swal.fire(
                {
                    title: 'Name alanı boş olamaz!',
                    icon: 'error'
                }
            )
        }
        else if(this.state.Priority == null)
        {
            Swal.fire(
                {
                    title: 'Priority alanı boş olamaz!',
                    icon: 'error'
                }
            )
        }
        else
        {
            axios.post('https://localhost:44397/api/TodoList/',
            {
                Name: this.state.Name, 
                Priority: this.state.Priority
                    
            }
            ).then(json => 
            {  
                if(json.status === 200)
                {  
                    Swal.fire(
                        {
                            title: 'Kaydedildi!',
                            icon: 'success'
                        }
                    )  
                }  
                else
                {  
                    Swal.fire(
                        {
                            title: 'Bir hata oluştu!',
                            icon: 'error'
                        }
                    )  
                }  
            }
        )
        } 
    }

    DeleteTodo(id)
    {  
        Swal.fire({
                title: 'Bu kaydı silmek istediğinize emin misiniz?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Evet'
            }).then((result) => 
        {
            if (result.isConfirmed) 
            {
                axios.delete('https://localhost:44397/api/TodoList/' + id).then(json => 
                {  
                    if(json.status === 200)
                    {  
                        Swal.fire(
                            {
                                title: 'Kayıt başarıyla silindi!',
                                icon: 'success'
                            }
                        );  
                    } 
                    else
                    {
                        Swal.fire(
                            {
                                title: 'Hata!',
                                icon: 'error'
                            }
                        )
                    } 
                })  
            }
        })
    }

    todoListDetails = (id) => 
    {
        axios.get('https://localhost:44397/api/TodoList/GetById/' + id)
        .then(response=>
        {
            this.setState({todoList: response.data[0]});
            $('#editModal').modal('show');
        });
    }

    EditTodo = (aId) =>
    {
        if(this.state.aName == null)
        {
            Swal.fire(
                {
                    title: 'Name alanı boş olamaz!',
                    icon: 'error'
                }
            )
        }
        else if(this.state.aPriority == null)
        {
            Swal.fire(
                {
                    title: 'Priority alanı boş olamaz!',
                    icon: 'error'
                }
            )
        }
        else
        {
            axios.put('https://localhost:44397/api/TodoList/', 
            {
                Id: aId, 
                Name: this.state.aName, 
                Priority:this.state.aPriority
            }).then(json => 
            {  
                if(json.status === 200)
                {  
                    $("#editModal").modal("hide");
                    Swal.fire(
                        {
                            title: 'Güncellendi!',
                            icon: 'success'
                        }
                    )
                }  
                else
                {  
                    Swal.fire(
                        {
                            title: 'Bir Hata Oluştu!',
                            icon: 'error'
                        }
                    )
                }  
            }
        )  
        }
    }

    handleChange = (e) => 
    {  
        this.setState(
            {
                [e.target.name]:e.target.value
            }
        );  
    } 

    render() 
    {
        return (
            <div className="maincontainer">
                <div className="container mb-5 mt-5 text-left">

                    <h4 className="mb-3 mt-5">Create New Job</h4>

                    <div className="row">
                        <div className="col-8">
                            <label>Job Name</label>
                            <input type="text" name="Name" required className="form-control" onChange={this.handleChange} maxLength={255}></input>
                        </div>

                        <div className="col-2">
                            <label>Job Priority</label>
                            <select className="form-control" name="Priority" onChange={this.handleChange}> 
                                <option></option>
                                <option>Acil</option>
                                <option>Önemli</option>
                                <option>Normal</option>
                            </select>
                        </div>

                        <div className="col-2">
                            <label></label>
                            <button className="form-control btn-primary" onClick={this.AddTodo}>Create</button>
                        </div>
                    </div>  
                        
                    <br />

                    <h4>Job List</h4>

                    <br />

                    <table id="tablo" className="table table-hover table-bordered display">
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

                <div className="modal" id="editModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <input type="hidden" value={this.state.todoList.id} name="aId"/>
                                    
                                <div className="form-group">
                                    <input type="text" className="form-control" name="aName" defaultValue={this.state.todoList.name} onChange={this.handleChange}/>
                                </div>
                                <br />
                                <div className="form-group">
                                    <select className="form-control" onChange={this.handleChange} name="aPriority"> 
                                        <option>Acil</option>
                                        <option>Önemli</option>
                                        <option>Normal</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={(e) => {this.EditTodo(this.state.todoList.id)}}>Güncelle</button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Kapat</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default Home;