<script lang="ts" setup>
import { pkgxV1Client } from "#imports"
import axios from "axios"
import { marked } from "marked"
import yaml from "js-yaml"

const route = useRoute()

const pkgData = (
	await pkgxV1Client.get<PkgxPackageRes>(`/packages/${route.params.id}`)
).data
const pkgDataYamlPath = pkgData.package_yml_url.replace(
	"https://github.com/teaxyz/pantry/blob/main/projects/",
	""
)

const [ghUsername, ghReponame] = pkgData.github_url
	.replace("https://github.com/", "")
	.split("/")

const [readmeData, yamlData] = await Promise.all([
	githubApiClient.get(`/repos/${ghUsername}/${ghReponame}/readme`),
	axios.get(
		`https://raw.githubusercontent.com/pkgxdev/pantry/main/projects/${pkgDataYamlPath}`
	),
])

const pkgYaml = yaml.load(yamlData.data)
const dependencies = Object.entries(pkgYaml.dependencies ?? {})
const programs: string[] = pkgYaml.provides
const companions = Object.entries(pkgYaml.companions ?? {})
const versions = Array.from(
	new Set(pkgData.bottles.map((bottle) => bottle.version))
)
const runCommand = `sh <(curl https://pkgx.sh) +${pkgData.full_name} sh`

const readmeMarkdown = (await axios.get(readmeData.data.download_url)).data
const renderedHtml = await marked.parse(readmeMarkdown)
</script>

<template>
  <Head>
    <title>{{ pkgData.full_name }}</title>
  </Head>

	<div class="text-white p-8 min-h-screen bg-[#070C14]">
		<h1>{{ pkgData.full_name }}</h1>
    <br>
		<div class="flex flex-row max-md:flex-col-reverse gap-2">
			<div
				class="border-2 rounded-lg p-4 border-[#1B2F4E]"
				v-html="renderedHtml"
			/>
			<div
				class="flex flex-col gap-2 border-2 rounded-lg p-4 border-[#1B2F4E] min-w-[30%]"
			>
				<h2>pkgx info</h2>

				<div class="bg-gray-800 text-white p-4 rounded-lg shadow-md">
					<code class="block whitespace-pre-wrap">
						{{ runCommand }}
					</code>
				</div>

				<h3>Programs</h3>
				<ul class="list-disc mx-6">
					<li v-for="(item, index) in programs" :key="item">
						{{ item }}
					</li>
				</ul>

				<h3>Companions</h3>
				<ul class="list-disc mx-6">
					<li v-for="(item, index) in companions" :key="item[0]">
						{{ item[0] }}
					</li>
				</ul>

				<h3>Dependencies</h3>
				<ul class="list-disc mx-6">
					<li v-for="(item, index) in dependencies" :key="item[0]">
						<NuxtLink class="text-blue-300" :to="`/pkg/${item[0]}`"> {{ item[0] }}: {{ item[1] }} </NuxtLink>
					</li>
				</ul>

        <h3>Versions</h3>
        <ul class="list-disc mx-6">
          <li v-for="(item, index) in versions" :key="item">
            {{ item }}
          </li>
        </ul>
			</div>
		</div>
	</div>
</template>
