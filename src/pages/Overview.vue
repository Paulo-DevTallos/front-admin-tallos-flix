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
              <h4 class="card-title">{{ $store.state.users.length }}</h4>
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
              <h4 class="card-title">{{ $store.state.movies.length }}</h4>
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
              <h4 class="card-title">{{ $store.state.comments.length }}</h4>
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
              <h4 class="card-title">{{ $store.state.theaters.length }}</h4>
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
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <div v-for="theater in this.$store.state.theaters" :key="theater._id">
                  <l-circle-marker
                    :lat-lng="theater.location.geo.coordinates"
                    :radius="2"
                    color="red"
                  >
                    <l-tool-tip>{{ theater.location.address.city }}</l-tool-tip>
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
                <i class="fa fa-circle text-danger"></i> Filmes
                <i class="fa fa-circle text-warning"></i> Series
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
import LTable from 'src/components/Table.vue'
import {LMap, LTileLayer, LToolTip, LCircleMarker} from 'vue2-leaflet'

export default {
  components: {
    LMap,
    LTileLayer,
    LTable,
    ChartCard,
    StatsCard,
    LToolTip,
    LCircleMarker
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [51.505, -0.159],
      markerLatLng: [51.504, -0.159],
      storeJwt: localStorage.getItem('token'),
      editTooltip: 'Edit Task',
      deleteTooltip: 'Remove',
      pieChart: {
        data: {
          labels: [this.moviesCount, this.seriesCount],
          series: [80, 20],
          moviesCount : undefined,
          seriesCount: undefined
        }
      },
      lineChart: {
        data: {
          labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
          series: [
            [287, 385, 490, 492, 554, 586, 698, 695],
            [67, 152, 143, 240, 287, 335, 435, 437],
            [23, 113, 67, 108, 190, 239, 307, 308]
          ]
        },
        options: {
          low: 0,
          high: 800,
          showArea: false,
          height: '245px',
          axisX: {
            showGrid: false
          },
          lineSmooth: true,
          showLine: true,
          showPoint: true,
          fullWidth: true,
          chartPadding: {
            right: 50
          }
        },
        responsiveOptions: [
          ['screen and (max-width: 640px)', {
            axisX: {
              labelInterpolationFnc (value) {
                return value[0]
              }
            }
          }]
        ]
      },
      barChart: {
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
            [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: '245px'
        },
        responsiveOptions: [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc (value) {
                return value[0]
              }
            }
          }]
        ]
      },
      tableData: {
        data: [
          {title: 'Sign contract for "What are conference organizers afraid of?"', checked: false},
          {title: 'Lines From Great Russian Literature? Or E-mails From My Boss?', checked: true},
          {
            title: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
            checked: true
          },
          {title: 'Create 4 Invisible User Experiences you Never Knew About', checked: false},
          {title: 'Read "Following makes Medium better"', checked: false},
          {title: 'Unfollow 5 enemies from twitter', checked: false}
        ]
      }
    }
  },

  methods: {
    renderUsers() {
      this.$store.dispatch('handleUsersRequest', `Bearer ${this.storeJwt}`)
    },

    renderComments() {
      this.$store.dispatch('handleCommentsRequest', `Bearer ${this.storeJwt}`)
    },

    renderMovies() {
      this.$store.dispatch('handleMoviesRequest', `Bearer ${this.storeJwt}`)
    },

    renderTheaters() {
      this.$store.dispatch('handleTheatersRequest', `Bearer ${this.storeJwt}`)
    }
  },

  mounted() {
    this.renderUsers()
    this.renderComments()
    this.renderMovies()
    this.renderTheaters()
    
    for (let index = 0; index < this.$store.state.movies.length; index++) {
      if(this.$store.state.movies[index].type === "movie"){
        //this.moviesCount++
        console.log(this.$store.state.movies[index].type)
      }
      else if(this.$store.state.movies[index].type === "series"){
        //this.seriesCount++
        console.log(this.seriesCount, 'teste')
      }
    }
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
