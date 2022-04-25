using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using PersonalTodoList.Models;

namespace PersonalTodoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoListController : ControllerBase
    {
        TodoListDAL todoListDAL = new();

        [HttpGet]
        public IActionResult Get()
        {
            if (todoListDAL != null)
            {
                return Ok(todoListDAL.GetAllTodo());
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("GetByPriority/{priority}")]
        public IActionResult Get(string priority)
        {
            if (priority != null)
            {
                return Ok(todoListDAL.GetTodoByPriority(priority));
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("GetById/{id}")]
        public IActionResult Get(int? id)
        {
            if (id != null)
            {
                return Ok(todoListDAL.GetTodoById(id));
            }
            else
            {
                return NoContent();
            }
        }

        [HttpPost]
        public IActionResult Post(TblTodoList todoList)
        {
            if (todoList != null && ModelState.IsValid)
            {
                return Ok(todoListDAL.AddTodo(todoList));
            }
            else
            {
                return Ok(ModelState);
            }
        }

        [HttpPut]
        public IActionResult Put(TblTodoList todoList)
        {
            if (todoList != null && ModelState.IsValid)
            {
                return Ok(todoListDAL.UpdateTodo(todoList));
            }
            else
            {
                return Ok(ModelState);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int? id)
         {
            if (ModelState.IsValid)
            {
                return Ok(todoListDAL.DeleteTodo(id));
            }
            else
            {
                return NoContent();
            }
        }
    }
}
