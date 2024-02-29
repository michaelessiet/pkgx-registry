import axios from "axios"

const pkgxBaseUrl = "https://pkgx.dev"
const pkgxV1BaseUrl = "https://app.pkgx.dev/v1"
//https://raw.githubusercontent.com/kdave/btrfs-progs/master/README.md
const githubRawBaseUrl = "https://raw.githubusercontent.com"
const githubApiBaseUrl = "https://api.github.com"

export const pkgxClient = axios.create({
  baseURL: pkgxBaseUrl,
  headers: {
    "Content-Type": "application/json"
  }
})

export const pkgxV1Client = axios.create({
  baseURL: pkgxV1BaseUrl,
  headers: {
    "Content-Type": "application/json"
  }
})

export const githubApiClient = axios.create({
  baseURL: githubApiBaseUrl,
  headers: {
    "Content-Type": "application/json"
  }
})