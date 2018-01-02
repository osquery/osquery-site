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

