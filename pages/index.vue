<script setup lang="ts">
import { pkgxClient, convertSlashToColon } from "#imports"
import type { PkgxIndexRes } from "#imports"

let pkgList = (await pkgxClient.get<PkgxIndexRes[]>("/index.json")).data
pkgList.forEach((item) => {
	item.url = item.url.replace("https://pkgx.dev/pkgs/", "")
})
pkgList = pkgList.filter((item) => {
	return item.type === "pkg"
})
</script>

<template>
	<div class="text-white p-8 bg-[#070C14]">
		<h1>Pkgx Registry</h1>

		<div class="flex flex-col gap-2">
			<div v-for="(item, index) in pkgList" :key="item.url">
				<NuxtLink :to="'/pkg/' + convertSlashToColon(item.url)">
					<div class="rounded-md border-2 p-2 border-[#1B2F4E]">
						<h3>{{ item.title }}</h3>
						<p>{{ item.description }}</p>
					</div>
				</NuxtLink>
			</div>
		</div>

		<button
			class="fixed bottom-8 right-8 bg-blue-900 rounded-lg p-2"
			onclick="window.scrollTo({top:0, behavior: 'smooth'})"
		>
			To top
		</button>
	</div>
</template>
