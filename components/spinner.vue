<template>
	<div class="relative" :style="{ width: size, height: size }">
		<div class="lds-ring" :style="{ width: size, height: size }">
			<div v-for="i in 4" :key="i" :style="{ width: size, height: size }"></div>
		</div>
		<slot/>
	</div>
</template>

<script setup>
const props = defineProps({
	size: {
		type: String,
		default: '50px',
	},
});
</script>

<style lang="scss" scoped>
.lds-ring,
.lds-ring div {
	box-sizing: border-box;
}
.lds-ring {
	display: inline-block;
	position: relative;
}
.lds-ring div {
	box-sizing: border-box;
	display: block;
	position: absolute;
	/*margin: 8px;*/
	border: 2px solid currentColor;
	border-radius: 50%;
	animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	border-color: #243F83 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
	animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
	animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
	animation-delay: -0.15s;
}
@keyframes lds-ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
