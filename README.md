# Crawler Jobs

Responsible for running jobs to keep elasticsearch indexing up to date.

Currently, the only job is `loadNewEpisodes`, which will pull the most
recent page of podcast episodes from the pseudohosting service and index
them into elasticsearch. Future jobs may include triggering earlier
parts of the crawling pipeline as well, such as re-resolving urls from
the `.podcast` namespace.

## Running the job

Simply pass the job you want to run as a parameter to the run command:
```
yarn start loadNewEpisodes
```

or

```
yarn build
yarn serve loadNewEpisodes
```
