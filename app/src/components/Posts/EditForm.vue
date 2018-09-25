<template>
  <div>
    <div class="card">
      <div class="card-content">
        <span class="card-title">Update Post</span>
        <ui-textbox placeholder="Post Title" v-model="title"></ui-textbox>
        <wysiwyg name="post" v-model="post" placeholder="Post Content" />
        <br>
        <p>
          <ui-autocomplete label="Tags" name="tag" placeholder="Type your tag and click enter" :suggestions="autocompleteList"
            v-model="tag" @keyup.188.native="addCategory"></ui-autocomplete>
        </p>

        <ui-button v-for="t in categories" color="red" icon="cancel" :icon-position="iconPosition" :size="size" style="margin-left: .5em"
          @click="deleteTag(t)" v-bind:data="t" v-bind:key="t">{{ t }}</ui-button>
        <ui-button v-for="t in catToAdd" color="red" icon="cancel" :icon-position="iconPosition" :size="size" style="margin-left: .5em"
          @click="destroyTag(t)" v-bind:data="t" v-bind:key="t">{{ t }}</ui-button>
      </div>

      <div class="card-action">
        <ui-button color="primary" raised :disabled="!isFormValid" @click="updatePost">Update Post</ui-button>
      </div>
    </div>
  </div>
</template>

<script>
  import EventBus from '@/eventBus'

  export default {
    name: 'PostForm',
    data() {
      return {
        iconPosition: "right",
        size: "small",
        title: '',
        autocomplete1: null,
        post: '',
        tag: '',
        autocompleteList: [],
        catToAdd: [],
        user: '',
        categories: []
      }
    },
    props: {
      editPost: Object
    },
    computed: {
      isFormValid() {
        return (this.post && this.title)
      },
    },
    created() {
      let v = this
      if (this.editPost.title == undefined) setTimeout(v.checkData, 1000)
      this.fetchCategories()
    },
    methods: {
      checkData() {
        console.log("check")
        if (this.post == "") {
          this.title = this.editPost.title
          this.post = this.editPost.body
          this.editPost.categories.forEach(d => {
            this.categories.push(d.tag)
          })
        }
      },
      addCategory() {
        this.catToAdd.push(this.tag.replace(",", ""))
        this.tag = ""
      },
      fetchCategories() {
        axios
          .get('/categories/get')
          .then(response => {
            response.data.data.forEach(d => {
              this.autocompleteList.push(d.tag)
            });
          })
      },
      updatePost() {
        const token = localStorage.getItem('postr-token')

        axios
          .post(
            '/edit/' + this.editPost.id, {
              body: this.post,
              title: this.title,
              categories: this.catToAdd
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(response => {
           alert(response.data.message)
          })
      },
      destroyTag(tag) {
        let arr = this.catToAdd;
        arr.forEach(function (d, index) {
          if (d == tag) {
            arr.splice(index, 1);
          }
        })
        this.catToAdd = arr
      },
      
      deleteTag(tag) {
        const token = localStorage.getItem('postr-token')
        let arr = this.categories;
        arr.forEach(function (d, index) {
          if (d == tag) {
            arr.splice(index, 1);
          }
        })
        this.categories = arr

          axios
            .delete(`categories/destroy/${this.editPost.id}/${tag}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then(response => {
              this.$emit('delete', postId)
            })
        }
      }
  }

</script>
