<template>
  <div v-if="file">
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item :title="title" name="1">
        <div>
          <div v-for="(item, indexs) in imgs" :key="indexs" class="Photots">
            <div>{{item.filename}}</div><div @click="showPhoto(indexs)" class="Phototslook">预览</div>
          </div>
          <!--非图片-->
          <div v-for="(items) in isnotphotot" :key="items.id" class="Photots">
            <div>{{items.filename}}</div><div></div>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
    <!--图片预览-->
    <van-image-preview
      v-model="show"
      :images="images"
      :lazy-load="lazyload"
      :start-position="startposition"
    >
    </van-image-preview>
  </div>
</template>

<script>
export default {
  name: 'file',
  data () {
    return {
      file: '',
      activeName: '0',
      title: '',
      imgs: [],
      show: false,
      images: [],
      lazyload: true,
      startposition: 0,
      isnotphotot: []
    }
  },
  created () {},
  methods: {
    files (file) {
      if (file) {
        this.file = file
        this.title = `相关文件(${file.length})`
        this.imgs = []
        var img = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tif', 'tiff']
        for (var i = 0; i < this.file.length; i++) {
          if (img.indexOf(this.file[i].fileext) !== -1) {
            this.imgs.push(this.file[i])
            this.images.push(`http://demoapioazs.zhuwe.net/${this.file[i].filepath}`)
          } else {
            this.isnotphotot.push(this.file[i])
          }
        }
      }
    },
    //  图片预览
    showPhoto (e) {
      this.startposition = e
      this.show = true
    }
  }
}
</script>

<style scoped>
.Photots{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #f5f5f5;
  border-radius: 0.2rem;
  margin: 0.2rem;
}
  .Phototslook{
    color: white;
    background-color: #008ddd;
    padding: 0.1rem;
    border-radius: 0.2rem;
  }
</style>
