<template>
  <el-dialog title="编辑列表" :visible.sync="isVisible" @close="onClose" class="edit-dialog">
    <el-form :model="fillForm" :rules="rules" ref="fillForm">
      <div class="form-group col-sm-12">
        <el-form-item :label="$t('demoWorksName')" prop="name">
          <el-input v-model="fillForm.name"></el-input>
        </el-form-item>
      </div>

      <div class="form-group col-sm-12">
        <el-form-item :label="$t('demoOnlineAddress')" prop="address">
          <el-input v-model="fillForm.address"></el-input>
        </el-form-item>
      </div>

      <div class="form-group col-sm-12">
        <el-form-item :label="$t('demoWorksDesc')" prop="description">
          <el-input v-model="fillForm.description"></el-input>
        </el-form-item>
      </div>

      <div class="form-group col-sm-12">
        <el-form-item :label="$t('demoDateOfline')" prop="date">
          <el-input v-model="fillForm.date"></el-input>
        </el-form-item>
      </div>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="isVisible = false"> {{$t('cancel')}}</el-button>
      <el-button type="primary" @click="onSureClick"> {{$t('confirm')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default{
  name: 'EditDialog',

  data () {
    return {
      isVisible: false,
      fillForm: {
        name: '',
        description: '',
        address: '',
        date: ''
      },
      rules: {}
    }
  },

  computed: {},

  created () {},

  mounted () {},

  props: {
    value: {
      type: Boolean,
      required: true
    },
    pdata: {
      type: Object,
      default: {}
    }
  },

  watch: {
    value (newVal) {
      this.isVisible = newVal
      this.fillForm = JSON.parse(JSON.stringify(this.pdata))
    }
  },

  methods: {
    onClose () {
      this.isVisible = false
      this.$emit('input', this.isVisible)
    },

    /* ----------------------------On Click Event---------------------------- */
    onSureClick () {
      this.$refs.fillForm.validate(valid => {
        if (!valid) return
        this.$emit('dispatch-data', JSON.parse(JSON.stringify(this.fillForm)))
        this.isVisible = false
      })
    }
  },

  locales: {
    en: {
      demoWorksName: 'Works Name',
      demoOnlineAddress: 'Online Address',
      demoWorksDesc: 'Works Description',
      demoDateOfline: 'Date Of Line'
    },
    zh: {
      demoWorksName: '作品名称',
      demoOnlineAddress: '在线地址',
      demoWorksDesc: '作品描述',
      demoDateOfline: '上线日期'
    }
  }
}
</script>

<style type="text/css" lang="scss">
.edit-dialog{
  .el-form-item__label, .el-form-item__content{
    display: inline-block;
  }
  .el-form-item__label{
    width: 30%;
  }
  .el-input{
    width: 100%;
    min-width: 260px;
  }
  .el-dialog--tiny{
    min-width: 300px;
  }
}
</style>
