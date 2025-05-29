<template>
  <PageMain>
    <ControlBox>
      <ControlBtn icon="el-icon-delete" type="success" @click="backupData">备份数据库</ControlBtn>
    </ControlBox>
    <TableList
      :table-loading="tableLoading"
      :table-data="tableData"
      :page-result="pageResult"
      :hidePagination="true"
    >
      <el-table-column type="selection" align="center" width="45" />
      <el-table-column prop="fileName" label="备份文件"  />
      <el-table-column prop="fileSize" label="文件大小" width="140" :formatter="tableColFormatFileSize" />
      <el-table-column prop="fileCreateTime" width="180" label="备份时间" :formatter="tableColFormatDate" />
      <el-table-column fixed="right" align="center" label="操作" width="90">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="downloadSQL(scope.row.fileName)">下载</el-button>
          <el-button type="text" size="small" @click="delRowItem(scope.row.fileName)">删除</el-button>
        </template>
      </el-table-column>
    </TableList>
  </PageMain>
</template>
<script>
import listEdit from '@/mixin/listEdit'
import listPage from '@/mixin/listPage'
import request from '@/utils/request'
import { formatFileSize } from '@/utils/tools'
export default {
  mixins: [listPage, listEdit],
  data() {
    return {
      pageInfo: {
        listApiName: 'backup',
        itemName: '数据库备份'
      }
    }
  },
  methods: {
    backupData() {
      request({
        url: this.pageInfo.listApiName,
        method: 'post'
      })
        .then((res) => {
          this.$message.success('操作成功')
          this.getData()
        })
        .catch((err) => {
          this.$message.error(err.msg)
        })
    },
    tableColFormatFileSize(row, col, val) {
      return formatFileSize(val)
    },
    downloadSQL(fileName) {
      request({
        url: `${this.pageInfo.listApiName}/${fileName}`,
        method: 'get',
        responseType: 'blob'
      }).then((response) => {
        // 获取文件名
        const disposition = response.headers['content-disposition']
        let fileName = 'download'
        if (disposition) {
          fileName = disposition.split('filename=')[1]
        }

        // 创建下载链接
        const blob = new Blob([response.data])
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.click()
        window.URL.revokeObjectURL(link.href)
      })
    }
  }
}
</script>
