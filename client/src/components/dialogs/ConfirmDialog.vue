<template>
  <div class="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Submit</h5>
            </div>
            <div class="modal-body">
                <p>{{text}}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" @click="closeDialog(false)">NO</button>
                <button type="button" class="btn btn-outline-success" @click="closeDialog()">YES</button>
            </div>  
        </div>
    </div>

  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { closeDialog } from 'vue3-promise-dialog'

export default defineComponent({
  props: {
    text: String
  },
  setup() {
    function returnValue() {
      return true;
    }
    return {
      returnValue,
      closeDialog
    };
  },
});
</script>

<style scoped>
.dialog {
    position: fixed;
    top: 30%;
    left: 0;
    z-index: 1050;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
}
</style>
