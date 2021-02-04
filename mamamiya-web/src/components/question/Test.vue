<template>
  <div class="home">
  <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
  </quill-editor>
 <div v-html="this.content">{{this.content}}</div>
  </div>
</template>

<script>
// import Quill from 'quill';
// import { ImageResize } from '../../image-resize.min.js'
import {quillEditor,Quill } from 'vue-quill-editor'
import {ImageExtend, QuillWatch} from 'quill-image-extend-module'

import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/ImageExtend', ImageExtend)
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
export default {
  name: 'Home',
   data () {
      return {
        content: JSON.parse(localStorage.getItem("content")),
        editorOption: {
          // some quill options
          modules:{
            
            imageDrop: true,      //图片拖拽
            imageResize: {
               displayStyles: {
               backgroundColor: "black",
               border: "none",
               color: "white"
           },
           ImageExtend: {  // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入 
                             name: 'img',  // 图片参数名
                             size: 3,  // 可选参数 图片大小，单位为M，1M = 1024kb
                             action: 'localhost:8003/api/upload',  // 服务器地址, 如果action为空，则采用base64插入图片
                             // response 为一个函数用来获取服务器返回的具体图片地址
                             // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
                             // 则 return res.data.url
                             response: (res) => {
                               alert("hahha")
                                 return res.info
                             },
                             headers: (xhr) => {
                             // xhr.setRequestHeader('myHeader','myValue')
                             },  // 可选参数 设置请求头部
                             sizeError: () => {},  // 图片超过大小的回调
                             start: () => {},  // 可选参数 自定义开始上传触发事件
                             end: () => {},  // 可选参数 自定义上传结束触发的事件，无论成功或者失败
                             error: () => {},  // 可选参数 上传失败触发的事件
                             success: () => {},  // 可选参数  上传成功触发的事件
                             change: (xhr, formData) => {
                             // xhr.setRequestHeader('myHeader','myValue')
                             // formData.append('token', 'myToken')
                             } // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
                         },
           modules: ["Resize", "DisplaySize", "Toolbar"]
         },
            toolbar:{ container:[
                  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
                  ["blockquote", "code-block"], // 引用  代码块
                  [{ header: 1 }, { header: 2 }], // 1、2 级标题
                  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
                  [{ script: "sub" }, { script: "super" }], // 上标/下标
                  [{ indent: "-1" }, { indent: "+1" }], // 缩进
                  // [{'direction': 'rtl'}],                         // 文本方向
                  [{ size: ["small", false, "large", "huge"] }], // 字体大小
                  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
                  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                  [{ font: [] }], // 字体种类
                  [{ align: [] }], // 对齐方式
                  ["clean"], // 清除文本格式
                  ["link", "image", "video"] // 链接、图片、视频
                ] //工具菜单栏配置
                , handlers: {
                                 'image': function () {  // 劫持原来的图片点击按钮事件
                                     QuillWatch.emit(this.quill.id)
                                 }
                             }
                }
                
          }
        }
      }
    },
     methods: {
      onEditorBlur(quill) {
        localStorage.setItem("content",JSON.stringify(this.content))
        
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {

        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.content = html
      }
    },
    created(){
     
    },
   computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      console.log('this is current quill instance object', this.editor)
    }
}
</script>
