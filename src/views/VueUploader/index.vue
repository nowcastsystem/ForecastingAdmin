<template>
  <div class="example-full">
    <div hidden="true">
      <taskList :setFileTask="setFileTask"></taskList>
    </div>
    <!--   <button type="button" class="btn btn-danger float-right btn-is-option" @click.prevent="isOption = !isOption">
    <i class="fa fa-cog" aria-hidden="true"></i>
    Options
    </button>-->
    <div style="overflow: hidden;">
      <h1
        id="example-title"
        class="example-title"
        style="color: white; display: inline-block; float: left;"
      >Data Uploader</h1>
      <a
        href="#"
        style="display: inline-block; margin-top: 23px; margin-left: 2px"
        class="badge badge-light"
        data-toggle="modal"
        data-target="#exampleModal"
      >Format Guide</a>
      <a
        href="#"
        style="display: inline-block; margin-top: 23px; margin-left: 2px"
        class="badge badge-light"
        data-toggle="modal"
        data-target="#useCases"
      >Use Cases</a>
      <!-- <button type="button" class="btn btn-outline-primary" style="display: inline !important;" data-toggle="modal" data-target="#exampleModal">
  Format Guide
      </button>-->
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Example Data Format</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <span>There should be two columns of data. The first column should be date and/or time: mm/dd/yyyy hh:mm:ss. The second column should be real numbers. The file should be a .csv file.<br/></span>
            <img src="@/views/VueUploader/data-example2.png" style="width: 80%"/>
            <img src="@/views/VueUploader/data-example3.png" style="width: 80%"/>
          </div>
          <div class="modal-footer">
            <a href="/dev-api/DownloadSampleHandler" download>
              <button type="button" class="btn btn-info" style="margin: 10px">Download Sample Data</button>
            </a>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="useCases"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">PredicT Background and Use Cases</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <span><b>Background</b><br/></span>
            <span>PredicT is a time-series prediction model built on an advanced nonparametric tree ensemble algorithm. In testing, the accuracy of predicting store traffic has proven to be highly accurate. It can be rapidly deployed to fine-tune various retail activities. <br/><br/>Notes:<br/></span>
            <ur>
              <li>The model should be deployed on a store-by-store basis.</li>
              <li>The model should be rerun daily, with the most current traffic data, to enhance predictions.</li>
              <li>The current version provides daily predictions of store traffic. In our next release, predictions by hour by day will be added. </li>
            </ur>
            <span><b><br/>Use Cases</b><br/></span>
            <span><u>Labor Optimization</u></span>
            <ur>
              <li>To align staff hours against predicated traffic.</li>
              <li>To schedule staff activities based on predicated traffic.</li>
            </ur>
            <span><br/><u>Financial Planning</u></span>
            <ur>
              <li>Continuous updates of predicted daily traffic (a strong indicator of revenue) to enable rapid adjustments, such as an increase in promotions or a reduction in labor investment. </li>
            </ur>
            <span><br/><u>Operational</u></span>
            <ur>
              <li>Tune store hours of operation based on predicated traffic.</li>
              <li>Schedule the timing of merchandise deliveries based on predicated traffic.</li>
              <li>Adjust store inventory as traffic demand indicates.</li>
            </ur>
            <span><br/><u>Marketing</u></span>
            <ur>
              <li>Adjust mass media marketing based on predicated traffic.</li>
              <li>Change promotional activities based on predicated traffic.</li>
            </ur>
          </div>
        </div>
      </div>
    </div>
    <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
      <h3>Drop files to upload</h3>
    </div>
    <div class="upload" v-show="!isOption">
      <div class="table-responsive" style="height: 400px;">
        <table class="table table-hover table-dark" style="color: white">
          <thead style="background-color: #313436;">
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Speed</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!files.length">
              <td colspan="7">
                <div class="text-center p-5">
                  <h4>
                    Drop files anywhere to upload
                    <br />or
                  </h4>
                  <label :for="name" class="btn btn-lg btn-primary">Select Files</label>
                </div>
              </td>
            </tr>
            <tr v-for="(file, index) in files" :key="file.id">
              <td>
                <div class="filename">{{file.name}}</div>
                <div class="progress" v-if="file.active || file.progress !== '0.00'">
                  <div
                    :class="{'progress-bar': true, 'progress-bar-striped': true, 'bg-danger': file.error, 'progress-bar-animated': file.active}"
                    role="progressbar"
                    :style="{width: file.progress + '%'}"
                  >{{file.progress}}%</div>
                </div>
              </td>
              <td>{{file.size | formatSize}}</td>
              <td>{{file.speed | formatSize}}</td>

              <!-- <td v-if="file.error">{{file.error}}</td> -->
              <td v-if="file.error">fail: wrong format</td>
              <td v-else-if="file.success">success</td>
              <td v-else-if="file.active">active</td>
              <td v-else></td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-secondary btn-sm dropdown-toggle" type="button">Action</button>
                  <div class="dropdown-menu">
                    <!-- <a
                      :class="{'dropdown-item': true, disabled: file.active || file.success || file.error === 'compressing'}"
                      href="#"
                      @click.prevent="file.active || file.success || file.error === 'compressing' ? false :  onEditFileShow(file)"
                    >Edit</a>
                    <a
                      :class="{'dropdown-item': true, disabled: !file.active}"
                      href="#"
                      @click.prevent="file.active ? $refs.upload.update(file, {error: 'cancel'}) : false"
                    >Cancel</a>

                    <a
                      class="dropdown-item"
                      href="#"
                      v-if="file.active"
                      @click.prevent="$refs.upload.update(file, {active: false})"
                    >Abort</a>
                    <a
                      class="dropdown-item"
                      href="#"
                      v-else-if="file.error && file.error !== 'compressing' && $refs.upload.features.html5"
                      @click.prevent="$refs.upload.update(file, {active: true, error: '', progress: '0.00'})"
                    >Retry upload</a>
                    <a
                      :class="{'dropdown-item': true, disabled: file.success || file.error === 'compressing'}"
                      href="#"
                      v-else
                      @click.prevent="file.success || file.error === 'compressing' ? false : $refs.upload.update(file, {active: true})"
                    >Upload</a> -->

                    <div class="dropdown-divider"></div>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="$refs.upload.remove(file)"
                    >Remove</a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="example-foorer" v-show="showFooter">
        <!--       <div class="footer-status float-right">
        Drop: {{$refs.upload ? $refs.upload.drop : false}},
        Active: {{$refs.upload ? $refs.upload.active : false}},
        Uploaded: {{$refs.upload ? $refs.upload.uploaded : true}},
        Drop active: {{$refs.upload ? $refs.upload.dropActive : false}}
        </div>-->
        <div class="btn-group" v-show="showUploader">
          <file-upload
            class="btn btn-primary dropdown-toggle"
            :post-action="postAction"
            :put-action="putAction"
            :extensions="extensions"
            :accept="accept"
            :multiple="multiple"
            :directory="directory"
            :size="size || 0"
            :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
            :headers="headers"
            :data="data"
            :drop="drop"
            :drop-directory="dropDirectory"
            :add-index="addIndex"
            v-model="files"
            @input-filter="inputFilter"
            @input-file="inputFile"
            ref="upload"
          >
            <i class="fa fa-plus"></i>
            Select
          </file-upload>
          <div class="dropdown-menu">
            <label class="dropdown-item" :for="name">Add files</label>
            <a class="dropdown-item" href="#" @click="onAddFolder">Add folder</a>
            <a class="dropdown-item" href="#" @click.prevent="addData.show = true">Add data</a>
          </div>
        </div>
        <button
          type="button"
          class="btn btn-success"
          v-if="!$refs.upload || !$refs.upload.active && !showAnalyze"
          @click.prevent="$refs.upload.active = true"
        >
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
          Start Upload
        </button>
        <div class="analyze-block" v-show="showAnalyze">
          <button
            type="button"
            class="btn btn-warning"
            v-if="!$refs.upload || !$refs.upload.active || showAnalyze"
            @click.prevent="onSendAnalyzeRequest"
          >Analyze</button>
          <button
            type="button"
            class="btn btn-danger"
            v-else
            @click.prevent="$refs.upload.active = false"
          >
            <i class="fa fa-stop" aria-hidden="true"></i>
            Stop Upload
          </button>
        </div>
      </div>
    </div>

    <div class="option" v-show="isOption">
      <div class="form-group">
        <label for="accept">Accept:</label>
        <input type="text" id="accept" class="form-control" v-model="accept" />
        <small class="form-text text-muted">Allow upload mime type</small>
      </div>
      <div class="form-group">
        <label for="extensions">Extensions:</label>
        <input type="text" id="extensions" class="form-control" v-model="extensions" />
        <small class="form-text text-muted">Allow upload file extension</small>
      </div>
      <div class="form-group">
        <label>PUT Upload:</label>
        <div class="form-check">
          <label class="form-check-label">
            <input
              class="form-check-input"
              type="radio"
              name="put-action"
              id="put-action"
              value
              v-model="putAction"
            /> Off
          </label>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input
              class="form-check-input"
              type="radio"
              name="put-action"
              id="put-action"
              value="/upload/put"
              v-model="putAction"
            /> On
          </label>
        </div>
        <small class="form-text text-muted">After the shutdown, use the POST method to upload</small>
      </div>
      <div class="form-group">
        <label for="thread">Thread:</label>
        <input
          type="number"
          max="5"
          min="1"
          id="thread"
          class="form-control"
          v-model.number="thread"
        />
        <small
          class="form-text text-muted"
        >Also upload the number of files at the same time (number of threads)</small>
      </div>
      <div class="form-group">
        <label for="size">Max size:</label>
        <input type="number" min="0" id="size" class="form-control" v-model.number="size" />
      </div>
      <div class="form-group">
        <label for="minSize">Min size:</label>
        <input type="number" min="0" id="minSize" class="form-control" v-model.number="minSize" />
      </div>
      <div class="form-group">
        <label for="autoCompress">Automatically compress:</label>
        <input
          type="number"
          min="0"
          id="autoCompress"
          class="form-control"
          v-model.number="autoCompress"
        />
        <small
          class="form-text text-muted"
          v-if="autoCompress > 0"
        >More than {{autoCompress | formatSize}} files are automatically compressed</small>
        <small class="form-text text-muted" v-else>Set up automatic compression</small>
      </div>

      <div class="form-group">
        <div class="form-check">
          <label class="form-check-label">
            <input type="checkbox" id="add-index" class="form-check-input" v-model="addIndex" /> Start position to add
          </label>
        </div>
        <small class="form-text text-muted">Add a file list to start the location to add</small>
      </div>

      <div class="form-group">
        <div class="form-check">
          <label class="form-check-label">
            <input type="checkbox" id="drop" class="form-check-input" v-model="drop" /> Drop
          </label>
        </div>
        <small class="form-text text-muted">Drag and drop upload</small>
      </div>
      <div class="form-group">
        <div class="form-check">
          <label class="form-check-label">
            <input
              type="checkbox"
              id="drop-directory"
              class="form-check-input"
              v-model="dropDirectory"
            /> Drop directory
          </label>
        </div>
        <small class="form-text text-muted">Not checked, filter the dragged folder</small>
      </div>
      <div class="form-group">
        <div class="form-check">
          <label class="form-check-label">
            <input type="checkbox" id="upload-auto" class="form-check-input" v-model="uploadAuto" /> Auto start
          </label>
        </div>
        <small class="form-text text-muted">Automatically activate upload</small>
      </div>
      <div class="form-group">
        <button
          type="button"
          class="btn btn-primary btn-lg btn-block"
          @click.prevent="isOption = !isOption"
        >Confirm</button>
      </div>
    </div>

    <div :class="{'modal-backdrop': true, 'fade': true, show: addData.show}"></div>
    <div
      :class="{modal: true, fade: true, show: addData.show}"
      id="modal-add-data"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add data</h5>
            <button type="button" class="close" @click.prevent="addData.show = false">
              <span>&times;</span>
            </button>
          </div>
          <form @submit.prevent="onAddData">
            <div class="modal-body">
              <div class="form-group">
                <label for="name">Name:</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  id="name"
                  placeholder="Please enter a file name"
                  v-model="addData.name"
                />
                <small class="form-text text-muted">
                  Such as
                  <code>filename.txt</code>
                </small>
              </div>
              <div class="form-group">
                <label for="type">Type:</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  id="type"
                  placeholder="Please enter the MIME type"
                  v-model="addData.type"
                />
                <small class="form-text text-muted">
                  Such as
                  <code>text/plain</code>
                </small>
              </div>
              <div class="form-group">
                <label for="content">Content:</label>
                <textarea
                  class="form-control"
                  required
                  id="content"
                  rows="3"
                  placeholder="Please enter the file contents"
                  v-model="addData.content"
                ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click.prevent="addData.show = false"
              >Close</button>
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div :class="{'modal-backdrop': true, 'fade': true, show: editFile.show}"></div>
    <div
      :class="{modal: true, fade: true, show: editFile.show}"
      id="modal-edit-file"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit file</h5>
            <button type="button" class="close" @click.prevent="editFile.show = false">
              <span>&times;</span>
            </button>
          </div>
          <form @submit.prevent="onEditorFile">
            <div class="modal-body">
              <div class="form-group">
                <label for="name">Name:</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  id="name"
                  placeholder="Please enter a file name"
                  v-model="editFile.name"
                />
              </div>
              <div
                class="form-group"
                v-if="editFile.show && editFile.blob && editFile.type && editFile.type.substr(0, 6) === 'image/'"
              >
                <label>Image:</label>
                <div class="edit-image">
                  <img :src="editFile.blob" ref="editImage" />
                </div>

                <div class="edit-image-tool">
                  <div class="btn-group" role="group">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="editFile.cropper.rotate(-90)"
                      title="cropper.rotate(-90)"
                    >
                      <i class="fa fa-undo" aria-hidden="true"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="editFile.cropper.rotate(90)"
                      title="cropper.rotate(90)"
                    >
                      <i class="fa fa-repeat" aria-hidden="true"></i>
                    </button>
                  </div>
                  <div class="btn-group" role="group">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="editFile.cropper.crop()"
                      title="cropper.crop()"
                    >
                      <i class="fa fa-check" aria-hidden="true"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="editFile.cropper.clear()"
                      title="cropper.clear()"
                    >
                      <i class="fa fa-remove" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click.prevent="editFile.show = false"
              >Close</button>
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Cropper from "cropperjs";
import ImageCompressor from "@xkeshi/image-compressor";
import FileUpload from "vue-upload-component";
import { sendAnalyzeRequest } from "@/api/user";
import taskList from "@/views/VueUploader/components/taskList";
import store from '@/store'

// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
export default {
  components: {
    FileUpload,
    taskList
  },
  data() {
    console.log("Vue Uploader~~~~~~")
    console.log(localStorage.getItem('username'))
    return {
      showFooter: false,
      showAnalyze: false,
      showUploader: false,
      fileRemoved: false,
      files: [],
      accept: "",
      extensions: "",
      // extensions: ['gif', 'jpg', 'jpeg','png', 'webp'],
      // extensions: /\.(gif|jpe?g|png|webp)$/i,
      minSize: 100,
      size: 1024 * 1024 * 10,
      multiple: true,
      directory: false,
      drop: true,
      dropDirectory: true,
      addIndex: false,
      thread: 3,
      name: "file",
      postAction: "/upload/post",
      putAction: window.location.origin + "/dev-api/uploader",
      headers: {
        "X-Csrf-Token": "xxxx"
      },
      data: {
        _csrf_token: "xxxxxx",
        username: JSON.parse(localStorage.getItem('username'))
        //username: store.getters.username
      },
      autoCompress: 1024 * 1024,
      uploadAuto: false,
      isOption: false,
      addData: {
        show: false,
        name: "",
        type: "",
        content: ""
      },
      editFile: {
        show: false,
        name: ""
      },
      currentTask: "Task 1",
      taskList: {
        "Task 1": []
      }
    };
  },
  // check if files existed
  beforeMount() {
    if (!this.$refs.upload) {
      this.$refs.upload = {
        uploadedFiles: []
      };
    }
  },
  // beforeUpdate: {},
  watch: {
    "editFile.show"(newValue, oldValue) {
      // 关闭了 自动删除 error
      if (!newValue && oldValue) {
        this.$refs.upload.update(this.editFile.id, {
          error: this.editFile.error || ""
        });
      }
      if (newValue) {
        this.$nextTick(function() {
          if (!this.$refs.editImage) {
            return;
          }
          let cropper = new Cropper(this.$refs.editImage, {
            autoCrop: false
          });
          this.editFile = {
            ...this.editFile,
            cropper
          };
        });
      }
    },
    "addData.show"(show) {
      if (show) {
        this.addData.name = "";
        this.addData.type = "";
        this.addData.content = "";
      }
    }
  },
  methods: {
    setFileTask(task) {
      this.currentTask = task;
    },

    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // 添加文件前
        // Filter system files or hide files
        // 过滤系统文件 和隐藏文件
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent();
        }
        // Filter php html js file
        // 过滤 php html js 文件
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent();
        }
        // Automatic compression
        // 自动压缩
        if (
          newFile.file &&
          newFile.type.substr(0, 6) === "image/" &&
          this.autoCompress > 0 &&
          this.autoCompress < newFile.size
        ) {
          newFile.error = "compressing";
          const imageCompressor = new ImageCompressor(null, {
            convertSize: Infinity,
            maxWidth: 512,
            maxHeight: 512
          });
          imageCompressor
            .compress(newFile.file)
            .then(file => {
              this.$refs.upload.update(newFile, {
                error: "",
                file,
                size: file.size,
                type: file.type
              });
            })
            .catch(err => {
              this.$refs.upload.update(newFile, {
                error: err.message || "compress"
              });
            });
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        // Create a blob field
        // 创建 blob 字段
        newFile.blob = "";
        let URL = window.URL || window.webkitURL;
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file);
        }
        // Thumbnails
        // 缩略图
        newFile.thumb = "";
        if (newFile.blob && newFile.type.substr(0, 6) === "image/") {
          newFile.thumb = newFile.blob;
        }
      }
    },
    // add, update, remove File Event
    inputFile(newFile, oldFile) {
      console.log("i am here");
      console.log(newFile, oldFile);
      if(!newFile) {
        this.fileRemoved = true;
        this.showAnalyze = false;
      }
      else {
        this.fileRemoved = false;
      }
      if (newFile) {
        newFile.task = this.currentTask;
      }
      if (oldFile) {
        oldFile.task = this.currentTask;
      }
      if (newFile && oldFile) {
        // update
        if (newFile.active && !oldFile.active) {
          // beforeSend
          // min size
          if (
            newFile.size >= 0 &&
            this.minSize > 0 &&
            newFile.size < this.minSize
          ) {
            this.$refs.upload.update(newFile, { error: "size" });
          }
        }
        if (newFile.progress !== oldFile.progress) {
          // progress
        }
        if (newFile.error && !oldFile.error) {
          // error
        }
        if (newFile.success && !oldFile.success) {
          // success
        }
      }
      if (!newFile && oldFile) {
        // remove
        if (oldFile.success && oldFile.response.id) {
          // $.ajax({
          //   type: 'DELETE',
          //   url: '/upload/delete?id=' + oldFile.response.id,
          // })
        }
      }
      // Automatically activate upload
      if (
        Boolean(newFile) !== Boolean(oldFile) ||
        oldFile.error !== newFile.error
      ) {
        if (newFile) {
          newFile.task = this.currentTask;
        }
        if (oldFile) {
          oldFile.task = this.currentTask;
        }
        if (this.uploadAuto && !this.$refs.upload.active) {
          this.$refs.upload.active = true;
        }
      }
      if (this.$refs.upload.value) {
        this.showUploader = false;
        this.drop = false;
        this.showFooter = true;
      }
      if (this.$refs.upload.value.length > 0 && !this.$refs.upload.value[0].error && !this.fileRemoved) {
        console.log("upload successfully");
        console.log(this.$refs.upload.value);
        this.showAnalyze = true;
      }
      else{
        console.log("upload failed...")
        console.log(this.$refs.upload.value);
        console.log(this.$refs.upload.value[0].error);
        this.showAnalyze = false;
      }
      console.log("this ref upload", this.$refs.upload.value.length);
    },
    alert(message) {
      alert(message);
    },
    onEditFileShow(file) {
      this.editFile = { ...file, show: true };
      this.$refs.upload.update(file, { error: "edit" });
    },
    onEditorFile() {
      if (!this.$refs.upload.features.html5) {
        this.alert("Your browser does not support");
        this.editFile.show = false;
        return;
      }
      let data = {
        name: this.editFile.name
      };
      if (this.editFile.cropper) {
        let binStr = atob(
          this.editFile.cropper
            .getCroppedCanvas()
            .toDataURL(this.editFile.type)
            .split(",")[1]
        );
        let arr = new Uint8Array(binStr.length);
        for (let i = 0; i < binStr.length; i++) {
          arr[i] = binStr.charCodeAt(i);
        }
        data.file = new File([arr], data.name, { type: this.editFile.type });
        data.size = data.file.size;
      }
      this.$refs.upload.update(this.editFile.id, data);
      this.editFile.error = "";
      this.editFile.show = false;
    },
    // add folder
    onAddFolder() {
      if (!this.$refs.upload.features.directory) {
        this.alert("Your browser does not support");
        return;
      }
      let input = this.$refs.upload.$el.querySelector("input");
      input.directory = true;
      input.webkitdirectory = true;
      this.directory = true;
      input.onclick = null;
      input.click();
      input.onclick = e => {
        this.directory = false;
        input.directory = false;
        input.webkitdirectory = false;
      };
    },
    onAddData() {
      this.addData.show = false;
      if (!this.$refs.upload.features.html5) {
        this.alert("Your browser does not support");
        return;
      }
      let file = new window.File([this.addData.content], this.addData.name, {
        type: this.addData.type
      });
      this.$refs.upload.add(file);
    },

    onSendAnalyzeRequest() {
      this.$router.push({ name: "analyze" });
      this.listLoading = true;
      sendAnalyzeRequest().then(response => {
        var token = response["token"];
        var future = response["future"];
        var past = response["past"];
        var past_predict = response["past_predict"];

        // if the response from the server indicating that it's running the analysis, then redirect to a loading view
        if (token == "success") {
          // this.$router.push({ name: "plot" })
          this.$router.push({
            name: "plotTest",
            params: {
              past,
              future
            }
          });
        }
      });
    }
  }
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";

.example-full {
  color: #19191a;
  background-color: #26293c;
}
.example-full .btn-group .dropdown-menu {
  display: block;
  visibility: hidden;
  transition: all 0.2s;
}
.example-full .btn-group:hover > .dropdown-menu {
  visibility: visible;
}
.example-full label.dropdown-item {
  margin-bottom: 0;
}
.example-full .btn-group .dropdown-toggle {
  margin-right: 0.6rem;
}
.example-full .filename {
  margin-bottom: 0.3rem;
}
.example-full .btn-is-option {
  margin-top: 0.25rem;
}
.example-full .example-foorer {
  padding: 0.5rem 0;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  margin-top: -50px;
  display: flex;
}
.analyze-block {
  margin-left: 10px;
  display: flex;
}
.example-full .edit-image img {
  max-width: 100%;
}
.example-full .edit-image-tool {
  margin-top: 0.6rem;
}
.example-full .edit-image-tool .btn-group {
  margin-right: 0.6rem;
}
.example-full .footer-status {
  padding-top: 0.4rem;
}
.example-full .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: 0.6;
  text-align: center;
  background: #000;
}
.example-full .drop-active h3 {
  margin: -0.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
.example-full {
  height: auto;
  padding-left: 5;
  padding-right: 5;
  padding: 20px;
}
.modal-backdrop {
  z-index: -1;
}
.modal-open {
  position: fixed;
  overflow: scroll;
  width: 100%;
  padding-right: 0 !important;
}
</style>


<!-- <template>
  <div class="app-container">
    <ul>
      <li v-for="file in files" :key="file">{{ file.name }} - Error: {{ file.error }}, Success: {{ file.success }}</li>
    </ul>
    <file-upload
      ref="upload"
      v-model="files"
      post-action="/post.method"
      put-action="/put.method"
      @input-file="inputFile"
      @input-filter="inputFilter"
    >
      Upload file
    </file-upload>
    <button v-show="!$refs.upload || !$refs.upload.active" type="button" @click.prevent="$refs.upload.active = true">Start upload</button>
    <button v-show="$refs.upload && $refs.upload.active" type="button" @click.prevent="$refs.upload.active = false">Stop upload</button>
  </div>
</template>

<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-upload-component"></script>
<script>
const VueUploadComponent = require('vue-upload-component')
Vue.component('file-upload', VueUploadComponent)
</script>

<script>
import VueUploadComponent from 'vue-upload-component'
export default {
  name: 'VueUploader',
  data() {
    return {
      files: []
    }
  },
  components: {
    FileUpload: VueUploadComponent
  },
  methods: {
    /**
     * Has changed
     * @param  Object|undefined   newFile   Read only
     * @param  Object|undefined   oldFile   Read only
     * @return undefined
     */
    inputFile: function (newFile, oldFile) {
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // Get response data
        console.log('response', newFile.response)
        if (newFile.xhr) {
          //  Get the response status code
          console.log('status', newFile.xhr.status)
        }
      }
    },
    /**
     * Pretreatment
     * @param  Object|undefined   newFile   Read and write
     * @param  Object|undefined   oldFile   Read only
     * @param  Function           prevent   Prevent changing
     * @return undefined
     */
    inputFilter: function (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Filter non-image file
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          return prevent()
        }
      }

      // Create a blob field
      newFile.blob = ''
      let URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    }
  }
}
</script>

<style>

import 'vue-upload-component/dist/vue-upload-component.part.css'
@import "vue-upload-component/dist/vue-upload-component.part.css"






.file-uploads {
  overflow: hidden;
  position: relative;
  text-align: center;
  display: inline-block;
}
.file-uploads.file-uploads-html4 input[type="file"] {
  opacity: 0;
  font-size: 20em;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
.file-uploads.file-uploads-html5 input[type="file"] {
  overflow: hidden;
  position: fixed;
  width: 1px;
  height: 1px;
  z-index: -1;
  opacity: 0;
}
</style>
 -->
