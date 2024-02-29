export interface PkgxIndexRes {
	type: PkgxIndexResType
	title: string
	description?: string
	time: Date
	image: string
	url: string
}

export enum PkgxIndexResType {
	Blog = "blog",
	Pkg = "pkg",
	Script = "script",
}

export interface PkgxPackageRes {
	package_id: number
	slug: string
	name: string
	maintainer: string
	full_name: string
	version: string
	homepage: string
	license: null
	description: string
	short_description: string
	categories: any[]
	installs: number
	github_url: string
	package_yml_url: string
	documentation_url: null
	image_added_at: Date
	created_at: Date
	updated_at: Date
	keywords: string[]
	manual_sorting: number
	bottles: Bottle[]
	project: string
	github: string
	desc: string
	last_modified: Date
	thumb_image_url: string
}

export interface Bottle {
	bottle_id: number
	package_id: number
	platform: string
	arch: string
	version: string
	bytes: number
	created_at: Date
	updated_at: Date
	last_modified: Date
}
