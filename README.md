# Osquery Website

## Running the app locally

Install all dependencies:

```
yarn
```

Run the app:

```
yarn start
```

The app should open in a browser window at [http://localhost:3000](http://localhost:3000).

## Running the linter

Before submitting a PR, please lint:
```
yarn lint
```


## Running Storybook

[Storybook](https://storybook.js.org/) is a UI development environment that allows us to view the
app's components in isolation. To start Storybook, open another terminal and run

```
yarn storybook
```

The Storybook application will be viewable at [http://localhost:9001](http://localhost:9001).


## Accessing and updating the website content

The textual content for each page can be found at [/src/data/pages](/src/data/pages).

The osquery schema data can be found at
[/src/data/osquery_schema_versions](/src/data/osquery_schema_versions).


## Submitting a blog post

To upload a new blog post, please submit a PR with a markdown file to either
[official news](/src/data/blog/posts/official_news) or
[community articles](/src/data/blog/posts/community_articles).

If you would like to upload an image for your blog post, please do the following:
1. Add the image to [the blog post images directory](/src/data/blog/posts/images).
1. Import the image in the [images manifest](/src/data/blog/posts/images/index.js), and give your image a unique reference name.
1. Insert the image in your markdown as you typically would, but instead of the file path use the reference name from the manifest. i.e. `![image alt text](myCoolImage)`.


## Submitting a community event listing

To upload a new community event, submit a PR adding a JSON file to the [community events directory](/src/data/community_events/). Please include the following information in the listing:
```
{
  "title": [string],
  "location": [string],
  "startYear": [number],
  "startMonth": [number],
  "startDay": [number],
  "endYear": [number],    // optional
  "endMonth": [number],   // optional
  "endDay": [number]      // optional
  "url": [string]         // optional
}
```

Additionally, please add the newly-added filename to the [manifest file](/src/data/community_events/manifest.js).

## License

This repository is licensed under the terms of the 
Creative Commons 4.0 International (Documentation License). 
See LICENSE-DOCUMENTATION for the full terms of the license. 
