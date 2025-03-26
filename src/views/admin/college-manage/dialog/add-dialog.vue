<script>
export default {
  name: 'UpdateModal',
  props: {
    visible: Boolean
  },
  data: function() {
    return {
      fileList: []
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<template>
  <div>
    <el-dialog
      :visible="visible"
      title="导入成绩文件"
      @close="() => {
        this.$emit('update:visible', false)
      }"
    >
      <div class="upload-container">
        <el-upload
          action="http://127.0.0.1:8080/file/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <div class="text">
          <span class="el-icon-warning-outline" style="font-size: 16px" />  <span>只能上传.xls\.xlsx 文件</span>
        </div>
        <div class="optional">
          {{  fileList }}
          <el-button v-if="fileList.length > 0" type="primary" size="small">确认上传</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss" >
.upload-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
}
.upload-demo {
  width: 200px;
}
.text {
  height: 40px;
  text-align: center;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.optional {
  display: flex;
  padding: 20px 0px;
  justify-content: flex-end;
}
</style>

