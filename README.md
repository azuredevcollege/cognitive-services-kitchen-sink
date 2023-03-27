# Cognitive Services Kitchen Sink

Welcome to the Cognitive Services Kitchen Sink application. It gives you an overview of how different Azure Cognitive Services are embedded in a TypeScript application using Rest API calls or the JavaScript SDK.

First of all, to use this application, **FORK** the repository using the fork button on the top right corner of the repository.

Then **CLONE** this repository to your laptop using the command _git clone_ and the information you find under _Code_ on the top right corner of the repository.

```sh
git clone https://github.com/azuredevcollege/cognitive-services-kitchen-sink.git
```

After that, follow the setup instructions for your IDE.

### Recommended IDE Setup

1. Install [VSCode](https://code.visualstudio.com/) + the VSCode Extensions [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) and [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).
2. TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

Using the Terminal open the cloned repository using VSCode by typing:

```sh
code cognitive-services-kitchen-sink
```

### Project Setup

Now that you have the code ready in VSCode, install all necessary packages.

```sh
npm install
```

### Compile and Hot-Reload for Development

To test the app locally, you can run the following code.

```sh
npm run dev
```

**Disclaimer**: The Speech Service only works by running the web application online. We will get to this later on.

Now that the environment is set up, lets move onto the challenges.

## Challenge 1 - Try out the different services

**Go to _Settings_ and then _Actions_ , _General_ and under _Workflow Permissions_ make sure that you have set _Read and write permissions_. If not, change your settings and save.**

After the setup from the compile and hot-reload step is complete, the site is not yet published to GitHub Pages (published online). In the next two steps, we will activate GitHub pages, run a workflow to create a new gh-pages branch, and deploy the content from this branch to our GitHub page.

1. Activate GitHub Pages and run the workflow to create gh-pages branch:
  
First, we need to commit something to the main branch, so that the _Pages_ workflow runs. For this, make a simple change to the README file by clicking on the pencil icon. It can be anything you like, adding a space will suffice. Commit your changes directly to the main branch.

<img width="758" alt="image" src="https://user-images.githubusercontent.com/114384858/227936987-36ddfdda-83f0-4a79-ab70-f2f0acc5aaac.png">

Go to _Actions_ and you should see the _Pages_ workflow running. 

Once it is done, we can move to step 2.


2. Change source to gh-pages:
  
  After the workflow is done, a new branch called gh-pages has been created, which we will use as a source for our GitHub page deployment. Go to _Settings_, _Pages_ , and set the source to the _gh-pages_ branch and save. You will see under _Actions_ that the _Pages and Deployment_ workflows runs.

   **Optional**: In the meantime, check out this [website](https://docs.github.com/en/pages/getting-started-with-github-pages) to learn more about GitHub Pages.

   Once it is done, go to your GitHub page. The URL should be *YOUR_GITHUB_NAME.github.io/cognitive-services-kitchen-sink/*. But you can also find the link on the *Settings* page of your GitHub Repository.

   
1. From now on, every time you push a commit to your remote repository (GitHub), the GitHub page will be updated.
   > You push changes by:
      > - `git add *` adding the changes in the files of the directory where you run this command to staging for the next commit
      > - `git commit -m "comment on what you want to commit"` prepares the staged content like a snapshot of the current state of your repository
      > - `git push` publish and upload the changes you staged and commited to the repo in GitHub. This ought to trigger a GitHub action which will rebuild the GitHub page with the newly added Features

1. In order to be able to use the Cognitive Services on the web application, we need to connect them to a Cognitive Services resource. Therefore, go to the _Settings_ page of your web application and paste in your multi-service Cognitive Services subscription key and select the service's region. Moreover, also paste your Face Service subscription key and endpoint. If you haven't created those resources yet, first deploy them on the Azure Portal.
   > You might not have a multi-service Cognitive Service deployed in Azure. To do so repeat the steps from the last challenge in the Azure portal, search for *Cognitive Services* and create the service. This service combines Vision, Language, Search, and Speech Cognitive Services with a single API key. This allows us to use several functionalities without having to enter too many keys.

1. Go to the different pages _Speech_,  _Translator_, _Computer Vision_, _Form Recognizer_ and _Language_ to try out the cognitive services in action (We will try out the Custom Vision service in the next challenge.).

   **Info**: The Speech service only works using the GitHub page. It does not work using the local site.

1. Open the source code in Visual Studio code and check it out. Under _src_ > _views_ you can find the different pages of the cognitive services. See how these services are deployed using the JavaScript SDK or Rest API calls written in JavaScript.

## Challenge 2 - Publish and use your Custom Vision image classifier

As you can see on the drawer on the left, there is a service which you haven't tried out yet - Custom Vision. Now, you will get the chance to test the image classifier which you created in an earlier challenge.

Firstly, go to your flower classifier project in the custom vision studio and click on performance. Then go to the newest training interation and click on publish. You can choose your own Model name or leave the default one. Moreover, choose the custom vision resource which you created earlier. It should end with _-Prediction_.

Once published, you can find the prediction endpoint under _Prediction URL_. Copy the endpoint for classfying image URLs and paste it into the space _Azure Custom Vision Prediction Endpoint_ on the settings page of your app.

Moreover, you will need the _Azure Custom Vision Published Name_ and _Iteration id_. You can find both pieces of information in the custom vision studio on the Performance tab of your published training iteration as **Published as** and **Iteration id**.

Lastly, input the _Custom Vision Prediction Key_, which you can find in the Azure Portal. When you created the Custom Vision resource, another prediction resource was created for you automatically called _RESOURCENAME-Prediction_. Go to this resource and copy the key from the _Keys and Endpoint_ page.

Now that you have set up the image classfier, go to the **Custom Vision** page of your app and test it out by copying an image url. You should receive a response.

## Challenge 3 - Add more languages to Translator Language (sentiment)

So far, you can use the Translator Language services in the web application to translate to English, German, French, Hindi and Spanish and analyze the sentiment. Try adding more languages to the translator and language services by changing the source code under _src_ > _views_ > **TranslateView.vue** and **LanguageView.vue**.

### Hint

To program the Translator, we used Rest API calls written in JavaScript. For the language service, we wrote the code using the JavaScript SDK.

- [Langauge support for Translation](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/language-support)
- [Language support for Language Sentiment Analysis](https://docs.microsoft.com/en-us/azure/cognitive-services/language-service/sentiment-opinion-mining/language-support)

## Challenge 4 - Implement language detection for Language service (sentiment analysis)

Challenge number 4 is a little more tricky. Remember trying out the language service and doing a sentiment analysis in challenge 1? You had to select the language of the text you wrote to do the sentiment analysis on.

This time we will implement automatic language detection. Under _src_ > _views_ > **LanguageView.vue** alter the source code in such a way that it can detect the language automatically. Check out the [JavaScript SDK documentation](https://docs.microsoft.com/en-us/javascript/api/@azure/ai-text-analytics/?view=azure-node-latest), which will help you get there.

## Challenge 5 - Give the probability of recognized objects and text for Computer Vision (detect objects & text recognition)

Currently, the Computer Vision Service displays 5 information:

- Description of image with an accuracy confidence
- Object position and object tag (here add the confidence)
- Text position and detected content (here add the confidence)

To understand which part of the response from the corresponding APIs is important for you take a look at the entire JSON result and slice it to your needs.
