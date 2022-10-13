<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <!-- card users length -->
        <div class="col-xl-3 col-md-6">
          <stats-card class="spacing-container">
            <div slot="header" class="icon-warning position-icon">
              <i class="nc-icon nc-single-02 text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Usuários na plataforma</p>
              <h4 class="card-title">{{ $store.state.countUsers }}</h4>
            </div>
          </stats-card>
        </div>

        <!-- card movies length -->
        <div class="col-xl-3 col-md-6">
          <stats-card class="spacing-container">
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-button-play text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Filmes disponíveis</p>
              <h4 class="card-title">{{ this.totalMovies }}</h4>
            </div>
          </stats-card>
        </div>

        <!-- card comments length -->
        <div class="col-xl-3 col-md-6">
          <stats-card class="spacing-container">
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-quote text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Comentários dos filmes</p>
              <h4 class="card-title">{{ this.totalComments }}</h4>
            </div>
          </stats-card>
        </div>

        <!-- card theaters length -->
        <div class="col-xl-3 col-md-6">
          <stats-card class="spacing-container">
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-icon nc-tv-2 text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Cinemas catalogados</p>
              <h4 class="card-title">{{ this.totalTheaters }}</h4>
            </div>
          </stats-card>
        </div>

      </div>
      <div class="row">
        <div class="col-md-8">
          <card>
            <template slot="header">
              <h4 class="card-title">Disponibilidades de Salas de Cinema</h4>
              <p class="card-category">Cinemas disponíveis</p>
            </template>
            <template>
              <l-map style="height: 360px" :zoom="zoom" :center="center">
                <l-tile-layer 
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                  :attribution="attribution"
                ></l-tile-layer>
                <div v-for="theater in this.$store.state.theaters" :key="theater._id">
                  <l-circle-marker
                    :lat-lng="theater.location.geo.coordinates"
                    :radius="2"
                    color="red"
                  >
                    <l-tooltip>{{ theater.location }}</l-tooltip>
                  </l-circle-marker>
                </div>
              </l-map>
            </template>
          </card>  
        </div>
        <div class="col-md-4">
          <chart-card :chart-data="pieChart.data" chart-type="Pie">
            <template slot="header">
              <h4 class="card-title">Filmes e Séries</h4>
              <p class="card-category">Dados estatisticos</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <!--<i class="fa fa-circle text-danger">{{ $store.state.movies.length }}</i>Filmes-->
                <i class="fa fa-circle text-danger">Teste</i>Series
                <!--<i class="fa fa-circle text-danger"></i> Filmes
                <i class="fa fa-circle text-warning"></i> Series-->
              </div>
            </template>
          </chart-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartCard from 'src/components/Cards/ChartCard.vue'
import StatsCard from 'src/components/Cards/StatsCard.vue'
import { http } from '../services/http'

export default {
  components: {
    ChartCard,
    StatsCard,
  },
  data () {
    return {
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [-3.87075, -38.61893],
      markerLatLng: [-3.87075, -38.61893],
      storeJwt: localStorage.getItem('token'),
      editTooltip: 'Edit Task',
      deleteTooltip: 'Remove',
      pieChart: {
        data: {
          labels: [],
          series: [80, 20],
          moviesCount : undefined,
          seriesCount: undefined
        }
      },
      skip: 0,
      limit: 20,
      totalMovies: 0,
      totalComments: 0,
      totalTheaters: 0,
      theaters: [],
    }
  },

  methods: {
    renderUsersCount() {
      this.$store.dispatch('handleUsersRequest', `Bearer ${this.storeJwt}`)
    },

    async renderTheaters() {
      await this.$store.dispatch('handleTheatersRequest', `Bearer ${this.storeJwt}`)
      console.log(this.theaters)
    },

    async listAllMovies() {
      const url = `/movies/paginate?limit=${this.limit}&skip=${this.skip}`
      await http.get(url).then(res => {
        this.totalMovies = res.data.count
      })
    },

    //list comments
    async listAllComments() {
      const url = `/comments/paginate?limit=${this.limit}&skip=${this.skip}`
      await http.get(url).then(res => {
        this.totalComments = res.data.count
      })
    },

    //list theaters
    async listAllTheaters() {
      const url = `/theaters/paginate?limit=${this.limit}&skip=${this.skip}`

      await http.get(url).then(res => {
        this.theaters = res.data.result
        this.totalTheaters = res.data.count
      })
    },

    renderTheaters() {
      this.$store.dispatch('handleTheatersRequest', `Bearer ${this.storeJwt}`)
    },
  },

  mounted() {
    this.renderUsersCount()
    this.listAllComments()
    this.listAllMovies()
    this.listAllTheaters()
    this.renderTheaters()
  }
}
</script>
<style scoped>
.position-icon svg {
  display: flex;
  justify-content: center;
  align-items: center;
}
.spacing-container {
  padding-bottom: 20px;
}
</style>
