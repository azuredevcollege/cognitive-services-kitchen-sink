# Cognitive Services Kitchen Sink

Welcome to the Cognitive Services Kitchen Sink application. It gives you an overview of how different Azure Cognitive Services are embedded in a TypeScript application using Rest API calls or the JavaScript SDK.

First of all, to use this application, **FORK** the repository using the fork button on the top right corner of the repository.

Then **CLONE** this repository to your laptop using the command _git clone_ and the information you find under _Code_ on the top right corner of the repository.

After that, follow the setup instructions.

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

Now that the environment is set up, lets move onto the challenges.

## Challenge 1: Try out the different services

After the setup is complete, the site is not yet published to GitHub Pages. To see this, go to _Settings_ and then _Pages_ of your forked _cognitive-services-kitchen-sink_ repository in GitHub.

1. To publish the site to GitHub Pages, it says: "Make a commit to the gh-pages branch to publish your GitHub Pages site". In order to do so, choose the gh-pages branch as _Source_ and wait a few minutes for your site to be up and running.

   **Optional**: In the meantime, check out this [website](https://docs.github.com/en/pages/getting-started-with-github-pages) to learn more about GitHub Pages.

   Go to your GitHub page which should be something like YOUR_GITHUB_NAME.github.io/cognitive-services-kitchen-sink/

2. Go to the _Settings_ page and paste in your multi-service Cognitive Services subscription key and select the service's region. Moreover, also paste your Face Service subscription key and endpoint. If you do not have those services yet, first deploy them on the Azure Portal.

3. Go to the different pages _Speech_, _Face_, _Translator_ and _Language_ to try out the cognitive services in action. (We will try out the Custom Vision service in the next challenge.)

4. Open the source code in Visual Studio code and check it out. Under _src_ > _views_ you can find the different pages of the cognitive services. See how these services are deployed using the JavaScript SDK or Rest API calls written in JavaScript.

## Challenge 2 - Publish and use your Custom Vision image classifier

As you can see on the drawer on the left, there is a service which you haven't tried out yet - Custom Vision. Now, you will get the chance to test the image classifier which you created earlier.

Firstly, go to your flower classifier project in the custom vision studio and click on performance. Then go to the newest training interation and click on publish. You can choose your own Model name or leave the default one. Moreover, choose the custom vision resource which you created earlier. It should end with _-Prediction_.

Once published, you can find the prediction endpoint under _Prediction URL_. Copy the endpoint for classfying image URLs and paste it into the space _Azure Custom Vision Prediction Endpoint_ on the settings page of your app.

Moreover, you will need the _Azure Custom Vision Published Name_ and _Iteration id_. You can find both pieces of information in the custom vision studio on the Performance tab of your published training iteration as **Published as** and **Iteration id**.

Lastly, input the _Custom Vision Prediction Key_, which you can find in the Azure Portal. When you created the Custom Vision resource another prediction resource was created for you automatically called _RESOURCENAME-Prediction_. Go to this resource and copy the key from _Keys and Endpoint_.

Now that you have set up the image classfier, go to the **Custom Vision** page of your app and test it out by copying an image url. You should receive a response.

## Challenge 3 - Add more languages to translator

ERKLÄRUNG: API

## Challenge 4 - Implement language detection for sentiment

Challenge number 3 is a little more tricky. Remember trying out the language service and doing a sentiment analysis in challenge 1? You had to select the language of the text you wrote to do the sentiment analysis on.

This time we will implement automatic language detection. Under _src_ > _views_ > _LanguageView.vue_ alter the source code in such a way that it can detect the language automatically. Check out the [JavaScript SDK documentation](https://docs.microsoft.com/en-us/javascript/api/@azure/ai-text-analytics/?view=azure-node-latest), which will help you get there.

## Challenge 5 - Implement another face detection feature

Currently, the Face Service gives you the following responses:

- Estimated age
- Perceived gender
- Emotion
- Glasses
- Facial hair

Feel free to add the feature headpose, which will give you the response pitch, roll or yaw. Have a look at the [JavaScript SDK documentation](https://docs.microsoft.com/en-us/javascript/api/@azure/cognitiveservices-face/?view=azure-node-latest) for more information.
