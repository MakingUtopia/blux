const { readConfidentials: readConfidentials, getConfidentials } = require("../../misc/confidentials")
const { readConfig } = require("../../misc/config")
const { checkStaticRepoCloned, cloneStaticRepo } = require("../../misc/staticRepo")
const express = require("express")
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const parcelBundler = require('parcel-bundler')
const api = require("../api")
const routes = require("../routes")


const app = express()
const port = parseInt(process.env.PORT) || 3000
const bundler = new parcelBundler("./blux/app/cms/index.html", {})

async function ensureStaticRepoCloned() {
    const isCloned = await checkStaticRepoCloned()
    if (!isCloned) {
        await cloneStaticRepo()
    }
}

async function run() {
    await readConfidentials()
    await readConfig()
    await ensureStaticRepoCloned()
    const signedCookieSecret = getConfidentials().signedCookieSecret
    app.use(express.json())
    app.use(cookieParser(signedCookieSecret))
    app.use(fileUpload())
    routes.serve(app, "./dist")
    app.use(express.static("./static"))
    api.configure(app)
    app.use(bundler.middleware())
    app.listen(
        port, () => {
            console.log(
                `Development server listening on port ${port}!`
            )
        }
    )
}

run()