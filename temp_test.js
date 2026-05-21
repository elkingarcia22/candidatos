import { candidatesData } from './src/app/data/candidatesData.ts';

candidatesData.forEach(c => {
  const activeApps = c.applications?.filter(a => a.status === 'active') || [];
  const allApps = c.applications || [];
  const highPriorityBlockers = activeApps.filter(a => a.blocker?.priority === 'high');
  
  console.log(`Candidate: ${c.name} (${c.id})`);
  console.log(` - Total applications: ${allApps.length}`);
  console.log(` - Active applications: ${activeApps.length}`);
  console.log(` - Active with high blocker: ${highPriorityBlockers.length}`);
  allApps.forEach(a => {
    console.log(`   * Job: ${a.jobTitle}, Status: ${a.status}, Blocker Priority: ${a.blocker?.priority || 'none'}, Stage: ${a.currentStage}`);
  });
  console.log('-----------------------------------');
});
