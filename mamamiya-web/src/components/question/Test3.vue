<template>
  <div>
    <quill-editor
      v-model="this.text"
      :options="editorOption"
    />
    <input type="file" @change="change" id="upload" style="display:none;" />
  </div>
</template>

<script>
// import { uploadImage } from "@/api/base";  //上传接口
import { quillEditor, Quill } from 'vue-quill-editor';
import { container, ImageExtend } from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      text: "",
      // 富文本框参数设置
      editorOption: {
        modules: {
          ImageExtend: {
              loading: true,  // 可选参数 是否显示上传进度和提示语
              name: 'img',  // 图片参数名
              size: 3,  // 可选参数 图片大小，单位为M，1M = 1024kb
              action: 'http://localhost:8003/api/upload',  // 服务器地址, 如果action为空，则采用base64插入图片
              // response 为一个函数用来获取服务器返回的具体图片地址
              // 例如服务器返回{code: 200; data:{ url: 'xxx.com'}}
              // 则 return res.data.url
              response: (res) => {
                console.log(res);
                return data.url
              },
              headers: (xhr) => {},  // 可选参数 设置请求头部
              start: () => {},  // 可选参数 自定义开始上传触发事件
              end: () => {},  // 可选参数 自定义上传结束触发的事件，无论成功或者失败
              error: () => {},  // 可选参数 自定义网络错误触发的事件
              change: (xhr, formData) => {} // 可选参数 选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
          },
          toolbar: {
            container: container,  // container为工具栏，此次引入了全部工具栏，也可自行配置
            handlers: {
              image: function(value) {
                if (value) {
                  document.querySelector('#upload').click()  // 劫持原来的图片点击按钮事件
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    change(e) {
      let file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      uploadImage(formData)
        .then(res => {
          let quill = this.$refs.quill.quill
          if (res.code === 0) {
            const formdata = _.extend({}, this.formdata)
            let length = quill.getSelection().index//光标位置
            // 插入图片  图片地址
            quill.insertEmbed(length, 'image', data.url)
            // 调整光标到最后
            quill.setSelection(length + 1)//光标后移一位
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
  }
};
</script>
