<template>
  <div>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '50%' }"
      @click-overlay="clickoverlays"
    >
    <div class="departments">
      <div>
        <div>选择部门</div>
        <div>
          <div :class="item.user.length === 0 ? 'deptclassbgc': ''" v-for="(item, index) in departs" :key="index" @click="changedeparts(item.id)">
            <i class="fa fa-folder-o" style="margin-right: 0.3rem; color: #008ddd"></i><span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div>
        <div>选择人员</div>
        <div>
          <div v-for="(items, indexs) in departsPerson" :key="indexs" @click="changedeparts_(items)">
            <div v-if="items.name" :class="items.user.length === 0 ? 'deptclassbgc': ''">
              <i class="fa fa-folder-o" style="margin-right: 0.3rem; color: #008ddd"></i><span>{{items.name}}</span>
            </div>
            <div v-else>
              <img class="Personimg" v-if="items.face" :src="`http://www.oazs.com/${items.face}`" alt=""><i v-else class="fa fa-user-o" style="margin-right: 0.3rem;"></i>
              <span>{{items.realname}}({{items.ranking}})</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button @click="allchange" v-show="type !== 2">全选</button>
        <button @click="allclean">清空</button>
        <button @click="okyes">确认</button>
      </div>
      <div>
        <div>已选择</div>
        <div>
          <div v-for="(items, indexs) in departsPersonYes" :key="indexs" @click="changedeparts_s(indexs)">
            <div v-if="items.name" :class="items.user.length === 0 ? 'deptclassbgc': ''">
              <i class="fa fa-folder-o" style="margin-right: 0.3rem; color: #008ddd"></i><span>{{items.name}}</span>
            </div>
            <div v-else>
              <img class="Personimg" v-if="items.face" :src="`http://www.oazs.com/${items.face}`" alt=""><i v-else class="fa fa-user-o" style="margin-right: 0.3rem;"></i>
              <span>{{items.realname}}({{items.ranking}})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </van-popup>
  </div>
</template>

<script>
import {getdeptuserinfo} from '../../api/Api'
export default {
  name: 'departmentpersonnel',
  data () {
    return {
      show: false,
      departs: [],
      departsPerson: [],
      departsPersonYes: [],
      type: 0
    }
  },
  methods: {
    childMethod (e, token, type) {
      this.type = type
      this.departsPerson = []
      this.departsPersonYes = []
      this.show = e
      let param = {
        token: token
      }
      getdeptuserinfo(param).then((res) => {
        if (res.data.code === 2000) {
          this.departs = res.data.data
        }
      })
    },
    clickoverlays () {
      this.$emit('chuandishow')
    },
    // 部门选择
    changedeparts (id) {
      if (this.type === 0) {
        for (var i = 0; i < this.departs.length; i++) {
          if (this.departs[i].id === id) {
            var arrs = [this.departs[i]]
            this.departsPerson = []
            this.departsPerson = [...arrs, ...this.departs[i].user]
            if (this.departs[i].children) {
              this.departschildren(this.departs[i].children)
            }
          }
        }
      } else if (this.type === 1 || this.type === 2) {
        for (var j = 0; j < this.departs.length; j++) {
          if (this.departs[j].id === id) {
            this.departsPerson = []
            for (var n = 0; n < this.departs[j].user.length; n++) {
              this.departsPerson.push(this.departs[j].user[n])
            }
            if (this.departs[j].children) {
              this.departschildrenuser(this.departs[j].children)
            }
          }
        }
      }
    },
    departschildrenuser (children) {
      for (var i = 0; i < children.length; i++) {
        this.departsPerson = [...this.departsPerson, ...children[i].user]
        if (children[i].children) {
          this.departschildrenuser(children[i].children)
        }
      }
    },
    // 部门多选
    departschildren (children) {
      for (var i = 0; i < children.length; i++) {
        var arrs = [children[i]]
        this.departsPerson = [...this.departsPerson, ...arrs, ...children[i].user]
        if (children[i].children) {
          this.departschildren(children[i].children)
        }
      }
    },
    changedeparts_ (object) {
      if (object.name) {
        this.departsPersonYes.push(object)
        for (var j = 0; j < this.departsPersonYes.length - 1; j++) {
          if (this.departsPersonYes[j].name) {
            if (object.id === this.departsPersonYes[j].id) {
              this.departsPersonYes.splice(this.departsPersonYes.length - 1, 1)
            }
          }
        }
      } else if (object.realname) {
        if (this.type === 0 || this.type === 1) {
          this.departsPersonYes.push(object)
          for (var i = 0; i < this.departsPersonYes.length - 1; i++) {
            if (this.departsPersonYes[i].realname) {
              if (object.id === this.departsPersonYes[i].id) {
                this.departsPersonYes.splice(this.departsPersonYes.length - 1, 1)
              }
            }
          }
        } else if (this.type === 2) {
          this.departsPersonYes = []
          this.departsPersonYes.push(object)
        }
      }
    },
    changedeparts_s (index) {
      this.departsPersonYes.splice(index, 1)
    },
    // 清空
    allclean () {
      this.departsPersonYes = []
    },
    // 全选
    allchange () {
      for (var i = 0; i < this.departsPerson.length; i++) {
        var ishas = false
        for (var j = 0; j < this.departsPersonYes.length; j++) {
          if (this.departsPerson[i].name) {
            if (this.departsPersonYes[j].name) {
              if (this.departsPerson[i].id === this.departsPersonYes[j].id) {
                ishas = true
              }
            }
          } else if (this.departsPerson[i].realname) {
            if (this.departsPersonYes[j].realname) {
              if (this.departsPerson[i].id === this.departsPersonYes[j].id) {
                ishas = true
              }
            }
          }
        }
        if (ishas === false) {
          this.departsPersonYes.push(this.departsPerson[i])
        }
      }
    },
    okyes () {
      this.$emit('changedeparts_per', this.departsPersonYes, this.type)
      this.show = false
    }
  }
}
</script>

<style scoped>
.departments{
  width: 100%;
  height: 99%;
  /*margin: 5% 0;*/
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
  .departments>div:first-child{
    width: 20%;
    height: 100%;
    border: 0.065rem solid #eeeeee;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
.departments>div:first-child>div:first-child,
.departments>div:nth-child(2)>div:first-child,
.departments>div:nth-child(4)>div:first-child{
  font-size: 0.8rem;
  width: 100%;
  padding: 0.3rem 0;
  background-color: rgb(50, 177, 255);
  text-align: center;
  color: white;
}
.departments>div:first-child>div:last-child,
.departments>div:nth-child(2)>div:last-child,
.departments>div:nth-child(4)>div:last-child{
  width: 100%;
  height: 100%;
  overflow: auto;
}
.departments>div:first-child>div:last-child>div,
.departments>div:nth-child(2)>div:last-child>div,
.departments>div:nth-child(4)>div:last-child>div{
  font-size: 0.8rem;
  word-wrap: break-word;word-break: break-all;overflow: hidden;
  border-bottom: 0.065rem solid #e3f3fa;
}
.departments>div:nth-child(1)>div:last-child>div{
  padding: 0.3rem ;
  text-align: left;
}
.departments>div:nth-child(2)>div:last-child>div>div,
.departments>div:nth-child(4)>div:last-child>div>div{
  width: 100%;
  padding: 0.3rem;
  text-align: left;
}
  .departments>div:nth-child(2),
  .departments>div:nth-child(4){
    width: 33%;
    height: 100%;
    overflow: auto;
    border: 0.065rem solid #eeeeee;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
.departments>div:nth-child(3){
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.departments>div:nth-child(3)>button{
  font-size: 0.8rem;
  border: none;
  border-radius: 0.3rem;
  padding: 0.2rem 0.3rem;
  color: white;
  margin: 1rem 0;
}
.departments>div:nth-child(3)>button:first-child{
  background-color: #00cbff;
}
.departments>div:nth-child(3)>button:last-child{
  background-color: #ff765f;
}
  .Personimg{
    width: 10%;
    margin-right: 0.3rem;
  }
  .deptclassbgc{
    background-color: #e5e5e5;
  }
  .deptclassbgc i{
    color: grey!important;
  }
</style>
