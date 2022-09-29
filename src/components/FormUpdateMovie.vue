<template>
  <div class="content card form-update-content">
    <div class="icon-update">
      <font-awesome-icon icon="fa-solid fa-file-pen" />
    </div>
    <form> 
      <div>
        <label for="title">Título</label>
        <base-input 
          id="title"
          type="text"
          v-model="movie.title"
        />
      </div>
      <div class="slide-inputs">
        <div>
          <label for="type">Tipo do longa</label>
          <base-input 
            id="type"
            type="text"
            v-model="movie.type"
          />
        </div>
        <div>
          <label for="year">Ano</label>
          <base-input 
            id="year"
            type="text"
            v-model="movie.year"
          />
        </div>
        <div>
          <label for="genres">Genero</label>
          <base-input 
            id="genres"
            type="text"
            v-model="movie.genres"
          />
        </div>
        <div>
          <label for="released">Released</label>
          <base-input 
            id="released"
            type="text"
            v-model="movie.released"
          />
        </div>
      </div>
      <div class="slide-inputs">
        <div class="wd-large-input">
          <label for="countries">Paises</label>
          <base-input 
            id="countries"
            type="text"
            v-model="movie.countries"
          />
        </div>
        <div class="wd-large-input">
          <label for="writers">Autores</label>
          <base-input 
            id="writeres"
            type="text"
            v-model="movie.writers"
          />
        </div>
        <div class="wd-large-input">
          <label for="directors">Diretores</label>
          <base-input 
            id="directors"
            type="text"
            v-model="movie.directors"
          />
        </div>
      </div>
      <div class="slide-inputs">
        <div class="wd-large-input">
          <label for="runtime">Duração</label>
          <base-input 
            id="runtime"
            type="text"
            v-model="movie.runtime"
          />
        </div>
        <div class="wd-large-input">
          <label for="cast">Atores</label>
          <base-input 
            id="cast"
            type="text"
            v-model="movie.cast"
          />
        </div>
        <div class="wd-large-input">
          <label for="language">Idiomas</label>
          <base-input 
            id="language"
            type="text"
            v-model="movie.language"
          />
        </div>
      </div>
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
      </div>
      <div class="btn-container">
        <button class="btn btn-primary" type="submit" @click="teste">Alterar Dados</button>
        <button class="btn btn-warnning" @click="$emit(closeFormUpdateMovie)">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormUpdateMovie',
  emits: ['closeFormUpdateMovie'],
  props: {
    userDataMovies: Object
  },
  data() {
    return {
      movie: {
        plot: '',
        genres: [],
        runtime: 0,
        cast: [],
        title: '',
        fullplot: '',
        language: [],
        released: '',
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
            numReviewes: 0,
          },
          fresh: 0,
          critic: {
            rating: 0,
            numReviewes: 0,
            meter: 0,
          },
          rotten: 0,
          lastUpdated: ''
        }
      }
    }
  },

  methods: {
    teste() {
      console.log(this.movie)      
    }
  }
}  
</script>

<style scoped>
.form-update-content {
  width: 1000px;
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
.slide-inputs {
  display: flex;
  justify-content: space-between;
}

.wd-large-input {
  width: 32%;
}


#tomatoes {
  display: flex;
  justify-content: space-between;
}
.tomatoes-viewers {
  width: 49%;
}
</style>