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
        <div class="container-box card">
          <ul>
            <li v-for="movie in movies" :key="movie._id">
              <card class="display-movie">
                <div>
                  <div class="movie-descriptions" @click="rollingMovieDescription(movie._id)">
                    <div>
                      <h3>{{ movie.title }}</h3>
                      <p>{{ movie.plot }}</p>
                    </div>
                    <div v-if="hiddenMovieDescription && id === movie._id" class="row-movie-description">
                      <div>
                        <div class="image-container">
                          <img :src="movie.poster" alt="imagem do filme">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </card>
            </li>
          </ul>
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
  }
}  
</script>

<style>
.header-table {
  margin: 0 0 15px;
}
.container-box ul {
  padding: 0 20px;
}
.container-box {
  padding: 20px 0;
}
.image-container {
  width: 200px;
}

.image-container img {
  width: 100%;
  border-radius: 5px;
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
</style>