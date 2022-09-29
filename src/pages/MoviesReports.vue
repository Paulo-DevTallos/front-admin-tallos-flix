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
        <div class="table-content">
          <div class="container-box card">
            <ul>
              <li v-for="movie in movies" :key="movie._id">
                <card class="display-movie">
                  <div>
                    <div class="movie-descriptions" @click="rollingMovieDescription(movie._id)">
                      <div>
                        <h3 class="card-title">{{ movie.title }} - {{ movie.year }}</h3>
                        <p class="card-category">{{ movie.plot }}</p>
                      </div>
                      <div v-if="hiddenMovieDescription && id === movie._id" class="row-movie-description">
                        <div class="info-movies">
                          <div v-if="exibitionImage" class="image-empty image-container">
                            <font-awesome-icon icon="fa-solid fa-image" />
                          </div>
                          <div v-else class="image-container">
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
      </card>
    </div>
  </div>
</template>

<script>
import ServiceMovies from '../services/axios-movies.request'

export default {
  name: 'MoviesReports',
  data() {
    return {
      movies: [],
      hiddenMovieDescription: false,
      id: 0,
    }
  },
  methods: {
    handleRequestMovies() {
      ServiceMovies.getMovies().then(res => {
        this.movies = res.data
      })
    },

    rollingMovieDescription(id) {
      this.hiddenMovieDescription = !this.hiddenMovieDescription
      this.id = id
    }
  },
  mounted() {
    this.handleRequestMovies()
  },
  /*computed: {
    exibitionImage() {
      return this.movies
    }
  }*/
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
}

@keyframes down {
  from {
    transform: translateY(-15px);
  }
  to {
    transform: translateY(0px);
  }
}

.movie-descriptions {
  cursor: pointer;
} 

.movie-descriptions p {
  color: gray;
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
</style>