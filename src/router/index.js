import Vue from 'vue'
import Router from 'vue-router'
import Homepage from 'components/homepage/homepage.vue'
import Rank from 'components/rank/rank.vue'
import RankDetalls from 'components/rank/detalls/detalls.vue'
import Search from 'components/search/search.vue'
import Singer from 'components/singer/singer.vue'
import SingerDetalls from 'components/singer/detalls/detalls.vue'
import Disc from 'components/homepage/disc/disc.vue'
Vue.use(Router)

export default new Router({
	  // mode:'history',   //去掉#
  routes: [
	{
		path:'/',
		redirect: '/homepage'
	},
	{
		path: '/singer',
		component:Singer,
		children:[
			{
				path:':id',
				component:SingerDetalls
			}
		]
	},
    {
		path: '/homepage',
		component:Homepage,
		children:[
			{
				path:':id',
				component:Disc
			}
		]
    },
	{
		path:'/rank',
		component:Rank,
		children:[
			{
				path:':id',
				component:RankDetalls
			}
		]
	},
	{
		path:'/search',
		component:Search,
		children:[
			{
				path:':id',
				component:SingerDetalls
			}
		]
	}
  ]
})
