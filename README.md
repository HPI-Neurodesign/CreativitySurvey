# Creativity Survey

A configurable survey including creativity and personality tests, as well as some basic demographic questions. Allows users to include links to external tests and games. It is designed to be used with Amazon Mechanical Turk.

## MTurk Set Up

On MTurk all that is needed is a link to the survey and a submission field. At the end of the survey a code will be displayed, that participants copy into this submissions field. The code is the same as their id in the survey, so you can match the MTurk participants to the data you got from the survey.
To use this, make sure you set the `mturk` parameter in your survey configuration. It also allow setting the currency and amount of the reward.

## Usage

Currently the config is passed to the website using the url.
You can encrypt the json object containing the survey and pass it as the `config` parameter to the url. Alternatively, you can pass an encoded link in the url as a `loadConfig` parameter. If your config is larger (because you have a long intro text on the front page), consider using the `loadConfig` option as url length is capped in modern browsers.

You can use the scripts provided to learn how to create a url based on your survey config. Look at the example config in `scripts/exampleConfig.ts`.

## Survey Configuration Options

`dataUrl`: Upon completion of the survey, the gathered data is sent as a POST request to this url as a json object.

`frontPage`: The front page can be configured to show some information about your survey. It is recommended to include information about how long the survey takes, what sort of tests it includes, and how you store the information you collect. You can use markdown to stylize the content.

`mturk`: This parameter is optional. If used, it should include a `rewardAmount` and `rewardCurrency`, e.g. `$` or `€`. It will set up the survey to work well with Amazon Mechanical Turk. For once, it will show the reward gained through completing the survey on the front page. In addition, a code to copy back to MTurk will be shown at the end of the survey.

`pages`: An array of the types of pages to be used during the survey. The order in which they are added to the array also determines the order they will appear during the survey.  
The available types of pages are:

- `type: "AUT"` A standard creativity test, where participants are asked to come up with uncommon uses for a common household object.  
  `duration` How long the AUT takes in seconds, we recommend 120 to 180 seconds  
  `object` Which object participants need to come up with ideas for, e.g. a brick or a frisbee
  `selectBestIdeas` Whether the participant is asked to pick their two best ideas after completing the AUT.

- `type: "collaboUse"` Another creativity test, people need to come up with solutions for prompts by combining household objects.  
  `prompt` A prompt to design solutions for, such as `novel musical instruments` or `games for a group of friends`  
  `items` A set of items given to design the solutions. A list of 10 items is recommended. They should be short easy to understand and cover a range of different applications.  
  `duration` The duration of the test in seconds, around 180 seconds is recommended.  
  `selectBestIdeas` Whether the participants should select their two favorite ideas after completing the task.  
  `example` This parameter is optional. You can provide an example (in addition to the one shown in the task description). It consists of an `idea` and an array of `items`. This example will be shown once they start the task, so it should use the same items you provided for the tasks.

- `type: "creativeAchievements"` The [Creative Achievements Questionnaire](https://doi.org/10.1207/s15326934crj1701_4), as proposed by Carson, Peterson & Higgins.

- `type: "bigFive"` The [Big Five Personality Assessment](https://en.wikipedia.org/wiki/Big_Five_personality_traits), consisting of 15 statements the participant can agree or disagree to.  
  `includeIncomeQuestions` Whether to included three additional statements, assessing the participants income situation. It does not include any concrete amounts, just whether they feel their income is sufficient to cover their basic needs.

- `type: "externalSite"` You can link to other sites with additional tests or games. To ensure participants complete the task before continuing, the external page should provide a code for users to copy and fill into this page.
  `title` The name of the external game or test.  
  `description` A short description of the game or test.  
  `code` The code they need to enter to continue the survey. This can just be a random string. The id will also need to be appended to the code on the external task. This is to prevent participants sharing the code online, as with the id each code will be unique.  
  `imagePath` Path to an image that shows which code they need to copy to be able to continue with the survey.  
  `externalUrl` Link to the page, it should be able to take the id as a parameter. So the url might be `http://example.com?id=`, the id will be appended at the end.  
  `additionalUrlParameters` This parameter is optional. You can add additional parameters for the external url by supplying a `parameter` and a `value`. The parameters will be passed in the `&parameter=value` format. This is useful, if you have different conditions for your task.  
  `assessFlowAfterwards` This parameter is optional. Indicates whether the flow state of the participant should be assessed after they complete the task. Flow is assessed using a five item questionnaire. The `includeAttentionItem` parameter is required, see [attention items](#Attention-Items) below.

- `type: "videoGameExperience"` Asks participants on whether they play video games, which genres of games and on which platforms.

- `type: "demographics"` All parameters are optional, if you wish to include a type of question in the survey, set it to `true`.
  `age` Current age of the participant  
  `gender` Options are `male`, `female`, `other` and `prefer not to say`  
  `englishProficiency` 4 levels of english proficiency from basic skills to native proficiency.  
  `country` The country in which the participant grew up  
  `training` Areas in which the participant received training, e.g. sales, computer science or music.  
  `education` Level of formal education received (from no schooling to doctorate degree, 8 options)
  `includeAttentionItem` See [attention items](#Attention-Items) below.

- `type: "creativityTestExperience"` Used to assess if participants have experience in creative thinking tasks, like the AUT or CollaboUse. This page should be used after the creativity tests (AUT and CollaboUse), if they are used. The text will be adapted based on which tests were used, as well as the specific prompts used.

### Attention Items

Optionally, in two places can be included in the survey. These check if participants are paying full attention by asking them to check a specific option. E.g. "If you are paying full attention to this survey, pick the 'Strongly agree' option."
