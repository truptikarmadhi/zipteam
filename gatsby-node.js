/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions
//   createPage({
//     path: "/using-dsg",
//     component: require.resolve("./src/templates/using-dsg.js"),
//     context: {},
//     defer: true,
//   })
// }

const fetch = require("node-fetch");

exports.sourceNodes = async ({ actions }) => {
    const { createNode } = actions;

    // WordPress ke webhook se trigger hone wala URL
    const NETLIFY_BUILD_HOOK_URL = process.env.NETLIFY_BUILD_HOOK;

    try {
        // Netlify ko deploy trigger karne ka request bhejna
        await fetch(NETLIFY_BUILD_HOOK_URL, {
            method: "POST",
        });

        console.log("Netlify rebuild triggered successfully!");
    } catch (error) {
        console.error("Netlify rebuild failed:", error);
    }
};
