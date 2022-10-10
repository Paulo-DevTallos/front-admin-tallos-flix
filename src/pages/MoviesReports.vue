<template>
  <div class="content">
    <div class="container-fluid">
      <card
        class="strpied-tabled-width-hover"
        body-classes="table-full-width table-responsive"
      >
        <template slot="header">
          <h4 class="header-table">Filmes TallosFlix</h4>
          <p class="card-category">Filmes disponíveis na plataforma</p>
        </template>
        <template>
          <actions-bar 
            :title="buttonActionBarName"
            @searchData="findMovieByName"
            @reloadList="reloadMoviesList"
            @openFormData="openFormNewMovie"
          />
        </template>
        <div class="table-content">
          <div class="container-box card">
            <ul>
              <li v-for="movie in movies" :key="movie._id">
                <card class="display-movie">
                  <div>
                    <div class="movie-descriptions">
                      <div class="movie-commands">
                        <div @click="rollingMovieDescription(movie._id)">
                          <h3 class="card-title">{{ movie.title }} - {{ movie.year }}</h3>
                          <p class="card-category">{{ movie.plot }}</p>
                        </div>
                        <div v-if="hiddenBtnMenu && id === movie._id" class="icon-menu" @click="optionModal"> 
                          <font-awesome-icon icon="fa-solid fa-bars" />
                        </div>  
                      </div>
                      <option-popup 
                        v-if="hiddenOptionModal && id === movie._id"
                        @closeModal="closeOptions"
                        @deleteMovie="deleteMovie(movie._id)"
                        @updateMovie="openFormUpdateMovie(movie._id, movie)"
                      />
                      <form-update-movie
                        v-if="hiddenFormUpdateMovie"
                        :movieData="movieToUpdate"
                        @updateMovie="updateMovieData"
                        @closeFormUpdateMovie="closeUpdateForm"
                      />
                      <form-create-movie 
                        v-if="hiddenFormNewMovie"
                        @closeFormNewMovie="closeFormNewMovieModal"
                        @createNewMovie="createMovie"
                      />
                      <div v-if="hiddenMovieDescription && id === movie._id" class="row-movie-description">
                        <div class="info-movies">
                          <!--<div class="image-empty image-container">
                            <font-awesome-icon icon="fa-solid fa-image" />
                          </div>-->
                          <div class="image-container">
                            <img :src="movie.poster" alt="imagem do filme">
                          </div>
                          <div class="information-movie">
                            <div class="ratings">
                              <div class="ratings">
                                <p class="type">{{ movie.type }}</p>
                              </div>
                              <div class="ratings">
                                <font-awesome-icon icon="fa-brands fa-imdb" />
                                <div id="rating-resize">
                                  <p>{{ movie.imdb.rating }} / {{ movie.imdb.votes }}</p>
                                </div>
                              </div>
                              <div class="ratings">
                                <font-awesome-icon id="icon-meter" icon="fa-solid fa-splotch" />
                                <div id="rating-resize">
                                  <p>{{ movie.tomatoes.viewer.meter }}%</p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h5 class="card-title">Plot</h5>
                              <p>{{ movie.fullplot }}</p>
                            </div>
                            <div class="information-movie-painel">
                              <div>
                                <h5 class="card-title">Cast</h5>
                                <p 
                                  class="list-items"
                                  v-for="(cast) in movie.cast" 
                                  :key="`${movie._id}_${cast}`"
                                >
                                  {{ cast }}
                                </p>
                              </div>
                              <div>
                                <h5 class="card-title">Gênero</h5>
                                <p 
                                class="card-category"
                                v-for="(genres) in movie.genres"
                                :key="`${movie._id}_${genres}`"
                                >
                                  {{ genres }}
                                </p>
                              </div>
                              <div>
                                <h5 class="card-title">Diretores</h5>
                                <p
                                class="card-category"
                                v-for="(directors) in movie.directors"
                                :key="`${movie._id}_${directors}`"
                                >
                                  {{ directors }}
                                </p>
                              </div>
                              <div>
                                <h5 class="card-title">Autor(es)</h5>
                                <p
                                class="card-category"
                                v-for="(writers) in movie.writers"
                                :key="`${movie._id}_${writers}`"
                                >
                                  {{ writers }}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </card>
              </li>
            </ul>
          </div>
        </div>
        <div class="align-p pt-3">
          <pagination
            v-if="movies.length"
            :skip="skip"
            :total="total"
            :limit="limit"
            @change-page="changePage"
          ></pagination>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import ActionsBar from '../components/ActionsBar.vue'
import FormCreateMovie from '../components/FormCreateMovie.vue'
import FormUpdateMovie from '../components/FormUpdateMovie.vue'
import OptionPopup from '../components/Popups/OptionPopup.vue'
import ServiceMovies from '../services/axios-movies.request'
import Pagination from '../components/Pagination.vue'
import { http } from '../services/http'

export default {
  name: 'MoviesReports',
  components: { OptionPopup, FormUpdateMovie, FormCreateMovie, ActionsBar, Pagination },
  data() {
    return {
      movieToUpdate: {
        plot: '',
        genres: [],
        runtime: 0,
        cast: [],
        num_mflix_comments: 0,
        poster: '',
        title: '',
        fullplot: '',
        languages: [],
        released: '',
        directors: [],
        writers: [],
        awards: {
          wins: 0,
          nominations: '',
          text: '',
        },
        lastupdated: '',
        year: 0,
        imdb: {
          rating: 0,
          votes: 0,
          id: 0
        },
        countries: [],
        type: '',
        tomatoes: {
          viewer: {
            rating: 0,
            numReviews: 0,
            meter: 0,
          },
          dvd: '',
          critics: {
            rating: 0,
            numReviews: 0,
            meter: 0,
          },
          rotten: 0,
          lastUpdated: '',
          fresh: 0,
        }
      },
      movies: [],
      skip: 1,
      total: 0,
      limit: 20,
      buttonActionBarName: 'Adicionar novo Filme',
      hiddenMovieDescription: false,
      hiddenOptionModal: false,
      hiddenFormUpdateMovie: false,
      hiddenFormNewMovie: false,
      hiddenBtnMenu: false,
      storeJwt: localStorage.getItem('token'),
      id: 0,
    }
  },
  methods: {
    //get movies
    async listAllMovies() {
      const url = `/movies/paginate?limit=${this.limit}&skip=${this.skip}`
      console.log(url)
      await http.get(url).then(res => {
        this.movies = res.data.result
        this.total = res.data.count
      })
      /*ServiceMovies.getMovies({ headers: { Authorization: `Bearer ${this.storeJwt}` }}).then(res => {
        const parseMovies = JSON.parse(JSON.stringify(res.data))
        return this.movies = parseMovies
      })*/
    },

    changePage(value) {
      this.skip = value
      this.listAllMovies()
    },

    //create movie
    async createMovie(movie) {
      console.log(movie)
      await ServiceMovies.createMovie({ headers: { Authorization: `Bearer ${this.storeJwt}` }}, movie)
        .then(res => {
          if (res.status === 201) {
            this.listAllMovies()
          } 
        })
      this.hiddenFormNewMovie = false
    },

    //find movies
    findMovieByName(title) {
      ServiceMovies.findMovie({ headers: { Authorization: `Bearer ${this.storeJwt}` }}, title)
        .then(res => {
          return this.movies = res.data
        })
    },

    //update movie
    async updateMovieData(movie) {
      const id = this.id
      console.log(id)
      const parseMovie = JSON.parse(JSON.stringify(movie))

      await ServiceMovies.updateMovie({ headers: { Authorization: `Bearer ${this.storeJwt}`}}, id, parseMovie)
        .then(res => {
          console.log(res.data)
          if (res.status === 200) {
            this.listAllMovies()
          }
        })
      this.hiddenFormUpdateMovie = false
    },

    //delete movie
    async deleteMovie(id) {
      await ServiceMovies.removeMovie({ headers: { Authorization: `Bearer ${this.storeJwt}` }}, id)
      .then(res => {
        if (res.status === 200) {
          this.listAllMovies()
        }
      })
      this.hiddenOptionModal = false
    },

    //roll down bar movie
    rollingMovieDescription(id) {
      this.hiddenMovieDescription = !this.hiddenMovieDescription
      this.hiddenBtnMenu = !this.hiddenBtnMenu
      this.id = id
    },

    reloadMoviesList(data) {
      this.listAllMovies()
      const dataSetInput = data.receiveData = ''

      return dataSetInput
    },
    
    //function from menu btn by the movies side
    optionModal() {
      this.hiddenOptionModal = !this.hiddenOptionModal
    },

    //close modal options box
    closeOptions() {
      this.hiddenOptionModal = false
    },

    //open / close forms
    openFormNewMovie() {
      this.hiddenFormNewMovie = !this.hiddenFormNewMovie
    },

    openFormUpdateMovie(id, movie) {
      this.hiddenOptionModal = false
      this.hiddenFormUpdateMovie = !this.hiddenFormUpdateMovie
      console.log(movie.plot)

      this.movieToUpdate.plot = movie.plot
      this.movieToUpdate.genres = movie.genres
      this.movieToUpdate.runtime = movie.runtime
      this.movieToUpdate.cast = movie
      this.movieData.num_mflix_comments = movie.num_mflix_comments
      this.movieToUpdate.poster = movie.poster
      this.movieToUpdate.title = movie.title
      this.movieToUpdate.fullplot = movie.fullplot
      this.movieToUpdate.languages = movie.languages
      this.movieToUpdate.released = movie.released
      this.movieToUpdate.directors = movie.directors
      this.movieToUpdate.writers = movie.writers
      this.movieToUpdate.awards.wins = movie.awards.wins
      this.movieToUpdate.awards.nominations = movie.awards.nominations
      this.movieToUpdate.awards.text = movie.awards.text
      this.movieToUpdate.lastupdated = movie.lastupdated
      this.movieToUpdate.year = movie.year
      this.movieToUpdate.imdb.rating = movie.imdb.rating
      this.movieToUpdate.imdb.votes = movie.imdb.votes
      this.movieToUpdate.imdb.id = movie.imdb.id
      this.movieToUpdate.countries = movie.countries
      this.movieToUpdate.type = movie.type
      this.movieToUpdate.tomatoes.viewer.rating = movie.tomatoes.viewer.rating
      this.movieToUpdate.tomatoes.viewer.numReviews = movie.tomatoes.viewer.numReviews
      this.movieToUpdate.tomatoes.viewer.meter = movie.tomatoes.viewer.meter
      this.movieToUpdate.tomatoes.dvd = movie.tomatoes.dvd
      this.movieToUpdate.tomatoes.critics.rating = movie.tomatoes.critics.rating
      this.movieToUpdate.tomatoes.critics.numReviews = movie.tomatoes.critics.numReviews
      this.movieToUpdate.tomatoes.critics.meter = movie.tomatoes.critics.meter
      this.movieToUpdate.tomatoes.rotten = movie.tomatoes.rotten
      this.movieToUpdate.tomatoes.lastUpdated = movie.tomatoes.lastUpdated
      this.movieToUpdate.tomatoes.fresh = movie.tomatoes.fresh
      
      this.id = id
      console.log(id)
    },
    
    closeFormNewMovieModal() {
      this.hiddenFormNewMovie = false
    },

    closeUpdateForm() {
      this.hiddenFormUpdateMovie = false
    },

  },
  mounted() {
    this.listAllMovies()
  },
}  
</script>

<style>
.header-table {
  margin: 0 0 15px;
}
.table-content {
  padding-left: 30px;
}
.container-box ul {
  padding: 0 20px;
}
.container-box {
  padding: 20px 0;
}
.image-container {
  width: 20%;
}

.movie-commands {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-menu {
  padding: 10px 15px;
  border: none;
  border-radius: 7px;
  box-shadow: -1px 1px 2px rgba(0, 0, 0, 0.200);
  background-color: #80808068;
}

.image-container img {
  width: 100%;
  border-radius: 5px;
}

.image-empty {
  background-color: #d7d7d7;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.image-empty svg {
  color: #808080;
  font-size: 30px;
}

.display-movie {
  display: flex;
}

.display-movie {
  background-color: #80808010;
}

.row-movie-description {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 2px 5px #80808080;
  animation: down .5s ease-in-out;
  padding: 20px;
  margin-top: 20px;
}

@keyframes down {
  from {
    display: none;
    visibility: hidden;
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.movie-descriptions {
  cursor: pointer;
} 

.movie-descriptions p {
  color: gray;
  margin-bottom: 10px;
}

.movie-descriptions h3 {
  margin: 0;
  font-size: 20px;
}

.movie-descriptions .info-movies {
  display: flex;
}

.information-movie {
  width: 80%;
  padding-left: 30px;
}

.ratings {
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
}

.ratings .type {
  margin-right: 20px;
  text-transform: capitalize;
}

#icon-meter {
  font-size: 19px;
  padding: 6px;
  color: #fff;
  background-color: red;
  margin-left: 20px;
}

.ratings svg {
  padding: 1px 3px;
  font-size: 30px;
  background-color: rgb(255, 213, 0);
  border-radius: 3px;
  border: none;
  color: #000;
}


#rating-resize p {
  display: flex;
  align-items: center;
  border: 1px solid #80808068;
  border-radius: 3px;
  margin: 0;
  padding: 0 10px;
}

.information-movie h5 {
  margin: 0;
}

.information-movie p {
  font-size: 14px;
  margin-bottom: 30px;
}

.information-movie .information-movie-painel h5,
.information-movie .information-movie-painel .list-items {
  margin: 0;
}

.information-movie .information-movie-painel div {
  padding-right: 50px;
}

.information-movie-painel {
  display: flex;
  justify-content: space-between;
}

.align-p {
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
}
</style>