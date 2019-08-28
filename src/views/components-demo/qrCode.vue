<template>
  <div class='app-container'>
    <div id='qrcode' class='code' ref='qrcode'></div>
    <p>将二维码放入框内，即可扫描</p>
    <svg id="barcode" @click="createJsBarcode"></svg>
    <canvas id="barcode2"></canvas>
  </div>
</template>

<script>
  import QRCode from 'qrcodejs2'
  import JsBarcode from 'jsbarcode'
  export default {
    name: 'QrCode',
    mounted() {
      console.log('this.$refs.qrcode---:', this.$refs.qrcode)
      this.createQRCode()
      this.$nextTick(() => {
        this.createJsBarcode()
      })
    },
    methods: {
      // 二维码
      createQRCode() {
        const qrcode = new QRCode('qrcode', {
          width: 100,
          height: 100, // 高度
          text: '232333'
          // text: Date.now()
        })
        console.log('qrcode--:', qrcode)
        return qrcode
      },
      // 条形码
      createJsBarcode() {
         JsBarcode('#barcode', Date.now(), {
          displayValue: true
        })

        JsBarcode('#barcode2', '9780199532179', {
          lineColor: '#0aa',
          width: 4,
          // height: 80,
          displayValue: false
        })
      }
    }
  }
</script>

<style scoped>

</style>
