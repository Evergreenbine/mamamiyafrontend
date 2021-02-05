<template>
  <div id="fulltext">
      <el-upload
                id="quill-upload"
                class="avatar-uploader"
                action="http://localhost:8003/api/upload"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :before-upload="beforeUpload"

                >
        </el-upload>

      
    
        <!--富文本编辑器组件-->
        <el-row v-loading="quillUpdateImg">
            <quill-editor
                    v-model="detailContent"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @change="onEditorChange($event)"
                    @ready="onEditorReady($event)"
            >
            </quill-editor>
        </el-row>
    
 <!-- <div v-html="this.content">{{this.content}}</div> -->
  </div>
</template>

<script>
// import Quill from 'quill';
// import { ImageResize } from '../../image-resize.min.js'
import { Quill } from 'vue-quill-editor'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
const toolbarOptions = [
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
                ]
export default {
  name: 'Home',
   data () {
      return {
        quillUpdateImg: false,
        headerToken: {'X-Auth-Token': localStorage.getItem('accessToken')},
        actionUrl: process.env.VUE_APP_URL + '/api/upload',
        detailContent: '', // 富文本内容
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
           modules: ["Resize", "DisplaySize", "Toolbar"]
         },
            toolbar: { 
              container: toolbarOptions,  // 工具栏
                         handlers: {
                                'image': function (value) {
                                    if (value) {
                                        // alert(value)
                                        // alert(document.querySelector('#quill-upload'))
                                        document.querySelector('#quill-upload input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                          }
                }
                }//工具菜单栏配置
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
      },
      // 上传图片前
            beforeUpload(res, file) {
                this.quillUpdateImg = true
            },
            // 上传图片成功
            async uploadSuccess(res, file) {
                // res为图片服务器返回的数据
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill
               
                // 如果上传成功
                if (res.code === 1) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.info为服务器返回的图片地址
                    const img = "<img src='" + res.url + "'/>"
                    quill.insertEmbed(length, 'image', res.url)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败1')
                }
                // loading动画消失
                this.quillUpdateImg = false
            },
            // 上传图片失败
            uploadError(res, file) {
                // alert(res.code)
                // loading动画消失
                this.quillUpdateImg = false
                this.$message.error('图片插入失败2')
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
<style>
#fulltext{
    width: 700px;
    height: 300px;
}
.ql-editor{

  height: 300px;
}
</style>