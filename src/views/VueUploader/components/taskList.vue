 <template>
  <div class="dropdown float-right">
    <button
      class="btn btn-secondary dropdown-toggle"
      type="button"
      id="dropdownMenu2"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >{{ this.currentTask }}</button>
    <div class="dropdown-menu" id="taskList" aria-labelledby="dropdownMenu2">
      <div class="taskAction" v-for="task in tasks">
        <button
          class="dropdown-item"
          type="button"
          @click="setCurrentTask(task.name)"
          v-text="task.name"
        ></button>
        <el-button
          class="deleteButton"
          type="danger"
          plain
          icon="el-icon-delete"
          @click="deleteTask(task.name)"
        ></el-button>
      </div>
      <div class="dropdown-divider"></div>
      <form class="px-4 py-3">
        <div class="form-group">
          <label for="exampleDropdownFormEmail1">Task Name</label>
          <input class="form-control" id="exampleDropdownFormEmail1" v-model="newTaskName" />
        </div>
        <button type="submit" class="btn btn-primary" @click="addNewTask()">+ Add new task</button>
      </form>
    </div>
  </div>
</template> 

<script>
export default {
  data: function() {
    return {
      tasks: [{ name: "Task 1" }],
      currentTask: "Task 1",
      newTaskName: ""
    };
  },
  props: {
    setFileTask: {
      type: Function
    }
  },
  methods: {
    setCurrentTask(name) {
      this.currentTask = name;
      this.setFileTask(name);
    },
    addNewTask() {
      this.tasks.push({ name: this.newTaskName });
    },
    deleteTask(taskName) {
      // console.log(taskName);
      // console.log(this.tasks);
      this.tasks.forEach(item => {
        if (item.name === taskName) {
          this.tasks.splice(this.tasks.indexOf(item), 1);
        }
      });

      this.setCurrentTask("No Task");

      // let pos = this.tasks.indexOf({ name: this.newTaskName });
      // if (pos !== -1) {
      //   this.tasks.splice(pos);
      // } else {
      //   alert("The task input doesn't exist!");
      // }
    }
  }
};
</script>

<style scoped>
.dropdown-item {
  width: 230px;
}
.dropdown {
  display: inline;
}
.taskAction {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 10px;
}
#taskList {
  width: 300px;
  margin-right: 15px;
}
.delete-button {
  width: 50px;
}
</style>
