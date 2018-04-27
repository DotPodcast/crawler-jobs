import winston from 'winston';
import loadNewEpisodes from './loadNewEpisodes';
import stubApi from './api';

const jobs = {
  loadNewEpisodes,
  stubApi,
};

const runJob = async (jobName) => {

  if(jobName in jobs) {
    winston.info(`Running job: ${jobName}`);
    await jobs[jobName]();
    winston.info(`Completed job: ${jobName}`);
  } else {
    winston.error(`No job registered with the name '${jobName}'`);
  }
}

runJob(process.argv[2]);
