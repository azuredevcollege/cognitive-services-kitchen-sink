# Cognitive Services Kitchen Sink

Welcome to the Cognitive Services Kitchen Sink application. It gives you an overview of how different Azure Cognitive Services are embedded in a TypeScript application using Rest API calls or the JavaScript SDK.

First of all, to use this application, **FORK** and **CLONE** this repository and follow the setup instructions.

### Recommended IDE Setup

1. [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).
2. TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

Now that the environment is set up, lets move onto the challenges.

## Challenge 1: Try out the different services

After the setup is complete, the site is not yet published to GitHub Pages. To see this, go to _Settings_ and then _Pages_ of your _cognitive-services-kitchen-sink_ repository in GitHub.

1. To pusblish the site to GitHub Pages, it says: "Make a commit to the gh-pages branch to publish your GitHub Pages site". In order to do so, choose the gh-pages branch as _Source_ and wait a few minutes for your site to be up and running.

   **Optional**: In the meantime, check out this [website](https://docs.github.com/en/pages/getting-started-with-github-pages) to learn more about GitHub Pages.

   Go to your GitHub page which should be something like YOUR_GITHUB_NAME.github.io/cognitive-services-kitchen-sink/

2. Go to the _Settings_ page and paste in your multi-service Cognitive Services subscription key and select the service's region. Moreover, also paste your Face Service subscription key and endpoint. If you do not have those services yet, first deploy them on the Azure Portal.

3. Go to the different pages _Speech_, _Face_, _Translator_, _Language_ and _Custom Vision_ to try out the cognitive services in action.

4. Open the source code in Visual Studio code and check it out. Under _src_ > _views_ you can find the different pages of the cognitive services. See how these services are deployed using the JavaScript SDK or Rest API calls written in JavaScript.

## Challenge 2 - Implement language detection

Challenge number 2 is a little more tricky. Remember trying out the language service and doing a sentiment analysis in challenge 1? You had to select the language of the text you wrote to do the sentiment analysis on.

This time we will implement automatic language detection. Under _src_ > _views_ > _LanguageView.vue_ alter the source code in such a way that it can detect the language automatically. Check out the [JavaScript SDK documentation](https://docs.microsoft.com/en-us/javascript/api/@azure/ai-text-analytics/?view=azure-node-latest), which will help you get there.

## Challenge 3

Currently, the Face Service gives you the following responses:

- Estimated age
- Perceived gender
- Emotion
- Glasses
- Facial hair

Feel free to add the feature headpose, which will give you the response pitch, roll or yaw. Have a look at the [JavaScript SDK documentation](https://docs.microsoft.com/en-us/javascript/api/@azure/cognitiveservices-face/?view=azure-node-latest) for more information.
