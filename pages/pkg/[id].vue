<script lang="ts" setup>
import { pkgxV1Client } from "#imports"
import axios from "axios";
import {marked} from "marked";

const route = useRoute()
const pkgData = (
	await pkgxV1Client.get<PkgxPackageRes>(`/packages/${route.params.id}`)
).data
const [ghUsername, ghReponame] = pkgData.github_url.replace("https://github.com/", "").split('/')
const readmeData = (await githubApiClient.get(`/repos/${ghUsername}/${ghReponame}/readme`)).data
const readmeMarkdown = (await axios.get(readmeData.download_url)).data
const renderedHtml = await marked.parse(readmeMarkdown)
</script>

<template>
	<div class="text-white p-8 bg-[#070C14]">
		<h1>{{ pkgData.full_name }}</h1>
		<h2>{{ JSON.stringify(pkgData, null, 2) }}</h2>
    <div v-html="renderedHtml"/>
	</div>
</template>
