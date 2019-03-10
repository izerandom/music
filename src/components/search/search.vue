<template>
	<div class="search">
		<div class="search-area">
			<div class="search-box">
				<input type="text" placeholder="搜索歌曲、歌单、专辑     功能暂不可用">
			</div>
		</div>
           <div class="hot">
				<!-- <span class="title">热门搜索</span> -->
				<div style="padding: 5% 0 0 5%;">不要问为什么歌手页没有D<br>因为只请求100条数据<br>qq音乐歌手库总共50多万个歌手<br>如果全部请求数据量过大
				</div>
          </div> 
		  
    </div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
		
	}
</script>
<style scoped>
	.search{
		position: fixed;
		background-color: white;
		top: 84px;
		height: 100%;
		width: 100%;
	}
	.search-area{
		display: flex;
		width: 100%;
		height: 60px;
		background-color: #eeeeee;
	}
	.search-box{
		background-color: white;
		width: 95%;
		height: 60%;
		margin:  auto;
	}
	.hot{
		width: 100%;
		height:100%;
		/* padding: 20px 0 0 20px; */
		background-color: white;
	}	
    .title{
        font-size: 15px;
	}
	input{
		height: 100%;
		width: 90%;
		padding-left: 10px ;
		border-style:none;
		outline: none;
	}
	::-moz-placeholder { color: rgba(178,178,178,0.8); }
	::-webkit-input-placeholder { color:rgba(178,178,178,0.8); }
	::-ms-input-placeholder { color:rgba(178,178,178,0.8); }
</style>
