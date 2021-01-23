<template>
  <div>
      hah
 <editor v-model="content" :init="init"></editor>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
import Edit3or from 'tinymce/tinymce'
export default {
    props: {
    value: {
      type: String,
      default: ""
    },
    // 默认插件 这里写的比较全，基本上是全部了
    plugins: {
      type: [String, Array],
      default:
        "preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr nonbreaking insertdatetime advlist lists wordcount imagetools textpattern autosave bdmap autoresize lineheight"
    },
    // 默认工具栏 这里写的比较全，基本上是全部了
    toolbar: {
      type: [String, Array],
      default:
        "code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link codesample | alignleft aligncenter alignright alignjustify outdent indent lineheight formatpainter | \
    styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
    table image media charmap hr pagebreak insertdatetime | bdmap fullscreen preview"
    },
    components: {
    Editor
 },
  },
}
</script>

<style>

</style>