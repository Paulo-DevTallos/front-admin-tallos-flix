<template>
  <div class="content card form-update-content">
    <div class="icon-update">
      <font-awesome-icon icon="fa-solid fa-file-pen" />
    </div>
    <form @submit.prevent="$emit('updateMovie', movie)" :movieData="movie"> 
      <label class="label-set">Informações gerais
        <div>
          <label for="title">Título</label>
          <base-input 
            id="title"
            type="text"
            v-model="movie.title"
          />
        </div>
        <div>
          <label for="poster">Poster</label>
          <base-input 
            id="poster"
            type="text"
            v-model="movie.poster"
          />
        </div>
        <div class="slide-inputs">
          <div class="first-line">
            <label for="type">Tipo do longa</label>
            <base-input 
              id="type"
              type="text"
              v-model="movie.type"
            />
          </div>
          <div class="first-line">
            <label for="year">Ano</label>
            <base-input 
              id="year"
              type="number"
              v-model="movie.year"
            />
          </div>
          <div class="first-line">
            <label for="array-input">Genero</label>
            <div class="array-event">
              <input id="array-input" type="text" v-model="movie.genres.value">
              <font-awesome-icon @click="takeArrayGenres" icon="fa-solid fa-plus" />
            </div>
          </div>
          <div class="first-line">
            <label for="released">Released</label>
            <base-input 
              id="released"
              type="text"
              v-model="movie.released"
            />
          </div>
          <div class="first-line">
            <label for="lastupdated">Último lancamento</label>
            <base-input 
              id="lastupdated"
              type="text"
              v-model="movie.lastUpdated"
            />
          </div>
        </div>
        <div class="slide-inputs">
          <div class="wd-large-input">
            <label for="countries">Paises</label>
            <div class="array-event">
              <input id="array-input" type="text" v-model="movie.countries.value">
              <font-awesome-icon @click="takeArrayCountries" icon="fa-solid fa-plus" />
            </div>
          </div>
          <div class="wd-large-input">
            <label for="array-input">Autores</label>
            <div class="array-event">
              <input id="array-input" type="text" v-model="movie.writers.value">
              <font-awesome-icon @click="takeArrayWriters" icon="fa-solid fa-plus" />
            </div>
          </div>
          <div class="wd-large-input">
            <label for="directors">Diretores</label>
            <div class="array-event">
              <input id="array-input" type="text" v-model="movie.directors.value">
              <font-awesome-icon @click="takeArrayDirectors" icon="fa-solid fa-plus" />
            </div>
          </div>
          <div class="wd-large-input">
            <label for="num_mflix_comments">Numero de comentários</label>
            <base-input 
              id="num_mflix_comments"
              type="number"
              v-model="movie.num_mflix_comments"
            />
          </div>
        </div>
        <div class="slide-inputs">
          <div class="wd-large-input">
            <label for="runtime">Duração</label>
            <base-input 
              id="runtime"
              type="number"
              v-model="movie.runtime"
            />
          </div>
          <div class="wd-large-input">
            <label for="cast">Atores</label>
            <div class="array-event">
              <input id="array-input" type="text" v-model="movie.cast.value">
              <font-awesome-icon @click="takeArrayCast" icon="fa-solid fa-plus" />
            </div>
          </div>
          <div class="wd-large-input">
            <label for="language">Idiomas</label>
            <div class="array-event">
              <input id="array-input" type="text" v-model="movie.languages.value">
              <font-awesome-icon @click="takeArrayLanguages" icon="fa-solid fa-plus" />
            </div>
          </div>
        </div>
      </label>
      <label class="label-set">Imdb
        <div id="imdbs">
          <div class="imdb">
            <label for="imdb-rating">Avaliações</label>
            <base-input 
              id="imdb-rating"
              type="text"
              v-model="movie.imdb.rating"
            />
          </div>
          <div class="imdb">
            <label for="imdb-votes">Votos</label>
            <base-input 
              id="imdb-votes"
              type="text"
              v-model="movie.imdb.votes"
            />
          </div>
          <div class="imdb">
            <label for="imdb-id">id</label>
            <base-input 
              id="imdb-id"
              type="text"
              v-model="movie.imdb.id"
            />
          </div>
        </div>
      </label>
      <label class="label-set">tomatoes
        <div id="tomatoes">
          <div class="tomatoes-viewers">
            <label for="viewer-rating">Média</label>
            <base-input 
              id="viewer-rating"
              type="text"
              v-model="movie.tomatoes.viewer.rating"
            />
          </div>
          <div class="tomatoes-viewers">
            <label for="viewer-numReviewes">Revisadores</label>
            <base-input 
              id="viewer-numReviewes"
              type="text"
              v-model="movie.tomatoes.viewer.numReviewes"
            />
          </div>
          <div class="tomatoes-viewers">
            <label for="viewer-numReviewes">Média</label>
            <base-input 
              id="viewer-meter"
              type="text"
              v-model="movie.tomatoes.viewer.meter"
            />
          </div>
          <div id="dvd-field">
            <label for="dvd">Dvd</label>
            <base-input 
              id="dvd"
              type="text"
              v-model="movie.tomatoes.dvd"
            />
          </div>
        </div>
        <div id="awards">
          <div class="awards-field">
            <label for="wins">Premios</label>
            <base-input 
              id="wins"
              type="text"
              v-model="movie.awards.wins"
            />
          </div>
          <div class="awards-field">
            <label for="nominations">Nominacoes</label>
            <base-input 
              id="nomination"
              type="text"
              v-model="movie.awards.nominations"
            />
          </div>
          <div class="awards-field">
            <label for="awards-text">Texto</label>
            <base-input 
              id="awards-text"
              type="text"
              v-model="movie.awards.text"
            />
          </div>
          
        </div>
        <div id="critics">
          <div class="critics-fields">
            <label for="critics-rating">Avaliações de criticas</label>
            <base-input 
              id="critics-rating"
              type="text"
              v-model="movie.tomatoes.critics.rating"
            />
          </div>
          <div class="critics-fields">
            <label for="critics-numReviwes">Número de revisores</label>
            <base-input 
              id="critics-numReviews"
              type="text"
              v-model="movie.tomatoes.critics.numReviews"
            />
          </div>
          <div class="critics-fields">
            <label for="critics-meter">Média</label>
            <base-input 
              id="critics-meter"
              type="text"
              v-model="movie.tomatoes.critics.meter"
            />
          </div>
          <div class="critics-fields">
            <label for="critics-lastupdated">Ultima atualização</label>
            <base-input 
              id="critics-lastupdated"
              type="text"
              v-model="movie.tomatoes.critics.lastupdated"
            />
          </div>
          <div class="critics-fields">
            <label for="critics-fresh">Fresco</label>
            <base-input 
              id="critics-fresh"
              type="text"
              v-model="movie.tomatoes.critics.fresh"
            />
          </div>
          <div class="critics-fields">
            <label for="critics-rotten">Rottens</label>
            <base-input 
              id="critics-rotten"
              type="text"
              v-model="movie.tomatoes.critics.rotten"
            />
          </div>
        </div>
      </label>
      <div class="text-area">
        <label for="fullplot">Sinopse</label>
        <textarea name="fullplot" id="fullplot" rows="5" v-model="movie.fullplot" />
        <div > 
          <label for="plot">Resumo da sinopse</label>
          <base-input 
            id="plot"
            type="text"
            v-model="movie.plot"
          />
        </div>
      </div>
      <div class="btn-container">
        <button class="btn btn-primary" type="submit">Cadastrar novo filme</button>
        <button class="btn btn-warnning" @click="$emit('closeFormUpdateMovie')">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormUpdateMovie',
  emits: ['updateMovie', 'closeFormUpdateMovie'],
  props: {
    movieData: Object
  },
  data() {
    return {
      movie: {
        plot: this.movieData.plot,
        genres: this.movieData.genres,
        runtime: this.movieData.runtime,
        cast: this.movieData.cast,
        num_mflix_comments: this.movieData.num_mflix_comments,
        poster: this.movieData.poster,
        title: this.movieData.title,
        fullplot: this.movieData.fullplot,
        languages: this.movieData.languages,
        released: this.movieData.released,
        directors: this.movieData.directors,
        writers: this.movieData.writers,
        awards: {
          wins: this.movieData.awards.wins,
          nominations: this.movieData.awards.nominations,
          text: this.movieData.awards.text,
        },
        lastupdated: this.movieData.lastUpdated,
        year: this.movieData.year,
        imdb: {
          rating: this.movieData.imdb.rating,
          votes: this.movieData.imdb.votes,
          id: this.movieData.imdb.id
        },
        countries: this.movieData.countries,
        type: this.movieData.type,
        tomatoes: {
          viewer: {
            rating: this.movieData.tomatoes.viewer.rating,
            numReviews: this.movieData.tomatoes.viewer.numReviewes,
            meter: this.movieData.tomatoes.viewer.meter,
          },
          dvd: this.movieData.tomatoes.dvd,
          critics: {
            rating: this.movieData.tomatoes.critics.rating,
            numReviews: this.movieData.tomatoes.critics.numReviewes,
            meter: this.movieData.tomatoes.critics.meter,
          },
          rotten: this.movieData.tomatoes.rotten,
          lastUpdated: this.movieData.tomatoes.lastUpdated,
          fresh: this.movieData.tomatoes.fresh,
        }
      }
    }
  },

  watch: {
    movieData: {
      handler(movieData) {
        this.movie.plot = movieData.plot
        this.movie.genres = movieData.genres
        this.movie.runtime = movieData.runtime
        this.movie.cast = movieData.cast
        this.movie.num_mflix_comments = movieData.num_mflix_comments
        this.movie.poster = movieData.poster
        this.movie.title = movieData.title
        this.movie.fullplot = movieData.fullplot
        this.movie.languages = movieData.languages
        this.movie.released = movieData.released
        this.movie.directors = movieData.directors
        this.movie.writers = movieData.writers
        this.movie.awards.wins = movieData.awards.wins
        this.movie.awards.nominations = movieData.awards.nominations
        this.movie.awards.text = movieData.awards.text
        this.movie.lastupdated = movieData.lastupdated
        this.movie.year = movieData.year
        this.movie.imdb.rating = movieData.imdb.rating
        this.movie.imdb.votes = movieData.imdb.votes
        this.movie.imdb.id = movieData.imdb.id
        this.movie.countries = movieData.countries
        this.movie.type = movieData.type
        this.movie.tomatoes.viewer.rating = movieData.tomatoes.viewer.rating
        this.movie.tomatoes.viewer.numReviewes = movieData.tomatoes.viewer.numReviews
        this.movie.tomatoes.viewer.meter = movieData.tomatoes.viewer.meter
        this.movie.tomatoes.dvd = movieData.tomatoes.dvd
        this.movie.tomatoes.critics.rating = movieData.tomatoes.critics.rating
        this.movie.tomatoes.critics.numReviewes = movieData.tomatoes.critics.numReviews
        this.movie.tomatoes.critics.meter = movieData.tomatoes.critics.meter
        this.movie.tomatoes.rotten = movieData.tomatoes.rotten
        this.movie.tomatoes.lastUpdated = movieData.tomatoes.lastUpdated
        this.movie.tomatoes.fresh = movieData.tomatoes.fresh
      },
      deep: true
    }
  },

  methods: {
    takeArrayGenres() {
      const genresInput = this.movie.genres.value
      let arrayGer = this.movie.genres
      
      console.log(arrayGer.push(genresInput))
      this.movie.genres.value = ''
    },

    takeArrayWriters() {
      const writersInput = this.movie.writers.value
      let arrayWriter = this.movie.writers

      console.log(arrayWriter.push(writersInput))
      this.movie.writers.value = ''
    },

    takeArrayDirectors() {
      const directorsInput = this.movie.directors.value
      let arrayDirectors = this.movie.directors

      console.log(arrayDirectors.push(directorsInput))
      this.movie.directors.value = ''
    },

    takeArrayCast() {
      const castInput = this.movie.cast.value
      let arrayCast = this.movie.cast

      console.log(arrayCast.push(castInput))
      this.movie.cast.value = ''
    },

    takeArrayLanguages() {
      const languagesInput = this.movie.languages.value
      let arrayLanguages = this.movie.languages

      console.log(arrayLanguages.push(languagesInput))
      this.movie.languages.value = ''
    },

    takeArrayCountries() {
      const countriesInput = this.movie.countries.value
      let arrayCountries = this.movie.countries

      console.log(arrayCountries.push(countriesInput))
      this.movie.countries.value = ''
    },
  },
}  
</script>

<style scoped>
.form-update-content {
  width: 1200px;
  height: 100vh;
  overflow: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.100);
  padding: 30px;
  z-index: 1001;
}

.icon-update {
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
}

.icon-update svg {
  font-size: 50px;
  color: #009acc;
}

/*--- form css ---*/
.slide-inputs, #tomatoes, #awards, #critics, #imdbs {
  display: flex;
  justify-content: space-between;
}

.first-line {
  width: 19%;
}

.array-event {
  display: flex;
}

#array-input {
  font-size: 1rem;
  padding: 10px;
  width: 85%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #E3E3E3;  
}

.array-event svg {
  padding: 10px;
  margin: 0 3px;
  background-color: #808080;
  color: #fff;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-style {
  height: 40px;
  margin: 0 3px;
}

.awards-field, .imdb {
  width: 32%;
}

.tomatoes-viewers {
  width: 25%;
}

.critics-fields {
  width: 15%;
}

.text-area {
  margin-bottom: 20px;
}

.text-area textarea {
  width: 100%;
  padding: 15px;
  border: 1px solid #80808068;
  border-radius: 5px;
}

.label-set {
  width: 100%;
  border: 1px solid #80808068;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 15px;
}
</style>