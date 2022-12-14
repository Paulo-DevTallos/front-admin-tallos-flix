<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Relatório de comentários</h4>
              <p class="card-category">Comentários criados na plataforma</p>
            </template>
            <template>
              <actions-bar 
                :title="buttonActionBarName"
                @openFormData="callCommentForm"
                @searchData="findCommentsByUserName"
                @reloadList="reloadAllComments"
              />
            </template>
            
            <div class="table-content">
              <div id="comments-table-row">
                <div class="comments-table-row" v-for="comment in comments" :key="comment._id">
                  <div class="card form-comment-content" v-if="hiddenCommentForm"> 
                    <div class="container-fluid">
                      <div class="close-icon" @click="closeFormComment">
                        <font-awesome-icon icon="fa-solid fa-xmark" />
                      </div>
                      <div class="icon-comment">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                        <font-awesome-icon icon="fa-solid fa-comment" />
                      </div>
                      <form @submit.prevent="sendComment(commentData)" class="display-form-comment">
                        <label>Nome</label>
                        <base-input 
                          type="text"
                          v-model="commentData.name"
                        />
                        <label>E-mail</label>
                        <base-input 
                          type="text"
                          v-model="commentData.email"
                        />
                        <label>Data atual</label>
                        <base-input 
                          type="text"
                          v-model="commentData.date"
                        />
                        <select name="comment" v-model="commentData.movie_id">
                          <option value="" disabled default>--Escolha um filme para comentar--</option>
                          <option v-for="movie in movies" :key="movie._id" :value="movie._id">{{ movie.title }}</option>
                        </select>
                        <textarea name="movie-comment" type="text" v-model="commentData.text" />
                        <div class="btn-container">
                          <button type="submit" class="btn btn-primary btn-style">Salvar comentário</button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div id="content-alignment">
                    <div class="user">{{ comment.name }}</div>
                    <div>{{ comment.text }}</div>
                    <div>{{ comment.date }}</div>
                  </div>
                  <div id="items-alignment">
                    <div @click="showChooseModal(comment._id)" id="actions-op">
                      <font-awesome-icon icon="fa-solid fa-trash" />
                    </div>
                  </div>
                  <choose-popup 
                    v-if="hiddenChoosePopup && id === comment._id"
                    :message="message"
                    :data="comment.name"
                    @removeResource="deleteComment(comment._id)"
                    @closeModal="closePopupModal"
                  />
                </div>
              </div>
            </div>
            <div class="align-p pb-0 pt-3">
              <pagination
                v-if="comments.length"
                :skip="skip"
                :total="total"
                :limit="limit"
                @change-page="changePage"
              ></pagination>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActionsBar from '../components/ActionsBar.vue'
import Card from '../components/Cards/Card.vue'
import BaseInput from '../components/Inputs/BaseInput.vue'
import Pagination from '../components/Pagination.vue'
import ChoosePopup from '../components/Popups/ChoosePopup.vue'
import ServiceComments from '../services/axios-comments.request'
import ServiceMovies from '../services/axios-movies.request'
import { http } from '../services/http'

export default {
  name: 'CommentsView',
  components: { Card, ActionsBar, BaseInput, ChoosePopup, Pagination }, 
  data() {
    return {
      comments: [],
      movies: [],
      skip: 1,
      total: 0,
      limit: 20,
      hiddenCommentForm: false,
      hiddenChoosePopup: false,
      message: 'Deseja excluir o comentário de',
      buttonActionBarName: 'Fazer comentário como Admin',
      storeJwt: localStorage.getItem('token'),
      storeName: localStorage.getItem('username'),
      id: 0,
      commentData: {
        name: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        movie_id: '',
        text: '',
        date: new Date('YYYY [escaped] YYYY'),
      }
    }
  },
  methods: {
    getMovies() {
      ServiceMovies.getMovies({ headers: { Authorization: `Bearer ${this.storeJwt}` } })
       .then(res => this.movies = res.data)
    },

    listComments() {
      const url = `/comments/paginate?limit=${this.limit}&skip=${this.skip}`
      console.log(url)
      http.get(url).then(res => {
        console.log(res.data)
        this.comments = res.data.result 
        this.total = res.data.count
      })
    },

    changePage(value) {
      console.log(value)
      this.skip = value
      this.listComments()
    },

    sendComment(commentData) {
      ServiceComments.createComment({ headers: { Authorization: `Bearer ${this.storeJwt}` }}, commentData)
        .then(res => {
          console.log(res.status)
          if (res.status === 201) {
            this.listComments()
          }
        })
      this.hiddenCommentForm = false
    },

    deleteComment(commentId) {
      ServiceComments.removeComment({ headers: { Authorization: `Bearer ${this.storeJwt}` }}, commentId)
        .then(res => {
          if(res.status === 200) {
            this.listComments()
          }
        })

        this.hiddenChoosePopup = false
    },
    
    findCommentsByUserName(name) {  
      ServiceComments.findComment({ headers: { Authorization: `Bearer ${this.storeJwt}`}}, name)
        .then(res => {
          if (res.status === 200) {
            return this.comments = res.data
          }
        })
    },

    renderPaginateComments() {
      this.$store.dispatch('handleCommentsRequest', `Bearer ${this.storeJwt}`)
    },

    reloadAllComments(data) {
      this.listComments()
      const dataSetInput = data.receiveData = ''

      return dataSetInput
    },

    callCommentForm() {
      this.hiddenCommentForm = !this.hiddenCommentForm
    },

    closeFormComment() {
      this.hiddenCommentForm = false
    },

    closePopupModal() {
      this.hiddenChoosePopup = false
    },

    showChooseModal(id) {
      this.hiddenChoosePopup = !this.hiddenChoosePopup
      this.id = id
    }
  },
  mounted() {
    this.listComments()
    this.getMovies()
    this.renderPaginateComments()
  }
}  
</script>

<style scoped>
.table-content {
  padding-left: 30px;
}

.display-form-comment {
  display: flex;
  flex-direction: column;
}

#comments-table-rows,
.comments-table-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

#content-alignment {
  width: 85%;
}

#items-alignment {
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#actions-op {
  background-color: #80808049;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.342);
  transition: .4s ease;
  cursor: pointer;
  text-align: end;
  margin: 3px;
}

.comments-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
}

.comments-table-row .user {
  margin-bottom: 20px;
}

.admin-actions {
  margin: 20px 0;
}

.form-comment-content {
  width: 600px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.030);
  padding: 30px;
  z-index: 1004;
  animation: blow .5s ease-in-out;
}
@keyframes blow {
  0% {
    opacity: 0;
    visibility: hidden;
    transform: scale(0.0) translate(-50%, -50%);
  }
  70% {
    opacity: 1;
    visibility: visible;
    transform: scale(1.2) translate(-50%, -50%);
  }
  100% {
    transform: scale(1.1) translate(-50%, -50%);
  }
}

.btn.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}

.btn-style {
  width: 200px;
  margin: 20px 0;
  text-align: center;
  background-color: #0044aa;
  color: #fff;
}

.icon-comment {
  width: 100%;
  text-align: center;
  margin: 30px 0;
}

.icon-comment svg {
  font-size: 50px;
  color: #009acc;
}

select, textarea {
  border: 1px solid #80808068;
  border-radius: 5px;
}

select {
  padding: 10px 0;
}

textarea {
  margin: 15px 0;
  height: 100px;
}

.close-icon {
  position: absolute;
  top: 15px;
  right: 25px;
}

.close-icon svg {
  font-size: 25px;
  color: #002966;
  cursor: pointer;
}

.alignment-footer {
  text-align: center;
}

.align-p {
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
}
</style>