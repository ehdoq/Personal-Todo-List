using System;
using System.Collections.Generic;
using System.Linq;

namespace PersonalTodoList.Models
{
    public class TodoListDAL
    {
        TodolistContext _db = new();
        TblTodoList _todoList;

        public IEnumerable<TblTodoList> GetAllTodo()
        {
            try
            {
                if (_db.TblTodoList == null)
                {
                    List<TblTodoList> todo = new()
                    {
                        new TblTodoList { Id = 1, Name = "Aaaaaaaaaaa", Priority = "Bbbbbbbbb" },
                        new TblTodoList { Id = 2, Name = "Aaaaaaaaaaa", Priority = "Bbbbbbbbb" }
                    };
                    return todo.ToList();
                }
                else
                {
                    return _db.TblTodoList.ToList();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string AddTodo(TblTodoList todoList)
        {
            try
            {
                _db.TblTodoList.Add(todoList);
                _db.SaveChanges();
                return "success";
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string UpdateTodo(TblTodoList todoList)
        {
            try
            {
                _db.TblTodoList.Update(todoList);
                _db.SaveChanges();
                return "success";
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string DeleteTodo(int? id)
        {
            try
            {
                _todoList = _db.TblTodoList.Where(x => x.Id == id).SingleOrDefault();
                _db.TblTodoList.Remove(_todoList);
                _db.SaveChanges();
                return "success";
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IQueryable<TblTodoList> GetTodoByPriority(string priority)
        {
            try
            {
                return _db.TblTodoList.Where(x => x.Priority == priority);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IQueryable<TblTodoList> GetTodoById(int? id)
        {
            try
            {
                return _db.TblTodoList.Where(x => x.Id == id);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
