<template>
	<div class="progress-bar" ref="progressBar" >
		<div class="bar-inner" @click="progressClick">
			<div class="progress" ref="progress"></div>
			<div class="progress-btn-wrapper" ref="progressBtn"
						@touchstart.prevent="progressTouchStart"
						@touchmove.prevent="progressTouchMove"
						@touchend="progressTouchEnd"
			>
				<div class="progress-btn"></div>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {
		props: {
			percent: {
				type: Number,
				default: 0
			}
		},
		created() {
			this.touch = {}
		},
		methods: {
			progressTouchStart(e) {
        this.touch.initiated = true;
        this.touch.startX = e.touches[0].pageX;
        this.touch.left = this.$refs.progress.clientWidth;
      },
      progressTouchMove(e) {
        if (!this.touch.initiated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX;
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - 16, Math.max(0, this.touch.left + deltaX));
        this._offset(offsetWidth);
      },
      progressTouchEnd() {
        this.touch.initiated = false;
        this._triggerPercent();
      },
			 _triggerPercent() {
        const barWidth = this.$refs.progressBar.clientWidth - 16;
        const percent = this.$refs.progress.clientWidth / barWidth;
        this.$emit('percentChange', percent);
      },
			progressClick(e){
				const rect = this.$refs.progressBar.getBoundingClientRect()
				const offsetWidth = e.pageX - rect.left
				this._offset(offsetWidth)
				this._triggerPercent()
			},
			_offset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[`transform`] = `translate3d(${offsetWidth}px,0,0)`
      }
		},
		watch: {
			percent(newPercent){
				if(newPercent>=0 && !this.touch.initiated){
					const barWidth = this.$refs.progressBar.clientWidth-16;
					const offsetWidth = newPercent * barWidth;
					this.$refs.progress.style.width=`${offsetWidth}px`;
					this.$refs.progressBtn.style[`transform`]=`translate3d(${offsetWidth}px,0,0)`;
				}
			}
		}
	}
</script>

<style scoped>
	.progress-bar {
		height: 30px;

	}

	.bar-inner {
		position: relative;
		top: 13px;
		height: 2px;
		background-color: lavender;
	}

	.progress {
		position: absolute;
		height: 100%;
		background-color: #00ff00;
	}

	.progress-btn-wrapper {
		position: absolute;
		left: -8px;
		top: -13px;
		width: 20px;
		height: 20px;
	}

	.progress-btn {
		position: relative;
		top: 7px;
		left: 7px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: white;
	}
</style>
