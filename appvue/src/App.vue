<template>
    <h1>Todo List</h1>
    <form @submit.prevent="addTodo">
      <h3>Создать ToDo</h3>
      <input v-model="title">
      <input v-model="description">
      <button type="submit">Сохранить</button>
    </form>
    <button @click.prevent="deleteAllTodos()" style="margin: 10px;">Удалить все</button>
    <div v-for="todo in todos" :key="todo.id">
      <div v-if="!todo.editing">{{ todo.title }}</div>
      <div v-if="!todo.editing">{{ todo.description }}</div>
      <div v-if="todo.editing"><input v-model="todo.editingTitle"></div>
      <div v-if="todo.editing"><input v-model="todo.editingDescription"></div>
      <button v-if="!todo.editing" @click.prevent="editTodo(todo)">Редактировать</button>
      <button v-if="todo.editing" @click.prevent="updateTodo(todo)">Обновить</button>
      <button v-if="todo.editing" @click.prevent="cancelEdit(todo)">Назад</button>
      <button @click.prevent="deleteTodo(todo.id)">Удалить</button>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        todos: [],
        title: '',
        description: '',
        editingTodoId: null
      }
    },
    methods: {
      addTodo() {
        const newTodo = {
          title: this.title,
          description: this.description
        }
        fetch('http://localhost:3100/api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTodo)
        })
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.todos.push(data);
          this.title = '';
          this.description = '';
        })
        .catch(error => {
          console.error(error);
        });
        location.reload();
      },
      deleteTodo(id) {
        fetch(`http://localhost:3100/api/todos/${id}`, { method: 'DELETE' })
        .then(() => {
          const index = this.todos.findIndex(todo => todo.id === id);
          if (index !== -1) {
            this.todos.splice(index, 1);
            return {
              todos: [],
              title: '',
              description: '',
              editingTodoId: null
            }
          }
        })
        .catch(error => {
          console.error(error);
        });
      },
      editTodo(todo) {
        if (this.editingTodoId !== null) {
          return;
        }
        this.editingTodoId = todo.id;
        todo.editingTitle = todo.title;
        todo.editingDescription = todo.description;
        todo.editing = true;
      },
      cancelEdit(todo) {
        todo.editing = false;
        this.editingTodoId = null;
      },
      updateTodo(todo) {
        
        this.editingTodoId = null;
        const updatedTodo = {
          title: todo.editingTitle,
          description: todo.editingDescription,
          completed: todo.completed
        };
        fetch(`http://localhost:3100/api/todos/${todo.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedTodo)
        })
        .then(response => {
          return response.json();
        })
        .then(data => {
          todo.title = data.title;
          todo.description = data.description;
          todo.editing = false;
        })
        .catch(error => {
          console.error(error);
        });
        location.reload();
      },
      deleteAllTodos() {
     fetch('http://localhost:3100/api/todos', {
      method: 'DELETE'
     })
     .then(response => {
      if (response.ok) {
       this.todos = [];
      }
     });
    }  
    },
    mounted() {
      fetch('http://localhost:3100/api/todos')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.todos = data;
      })
      .catch(error => {
        console.error(error);
      });
    },

  }
</script>

<style>
div {
  margin-bottom: 10px;
  border: 1px solid black;
  padding: 10px;
}
</style>