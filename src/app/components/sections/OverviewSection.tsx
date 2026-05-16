import React from 'react';
import { JobCard } from '../JobCard';

interface OverviewSectionProps {
  candidate: {
    name: string;
    location: string;
    email: string;
    phone: string;
    cedula?: string;
    tags?: string[];
    matchScore?: number;
    confidence?: 'high' | 'medium' | 'low';
  };
  job: {
    title: string;
    location: string;
    status: 'applied' | 'interviewing' | 'offered' | 'hired' | 'rejected';
    stage: string;
    stageProgress: number;
  };
  otherJobsCount: number;
}

export function OverviewSection({ candidate, job, otherJobsCount }: OverviewSectionProps) {
  return (
    <div className="space-y-6">
      {/* Job Card */}
      <JobCard
        candidate={candidate}
        job={job}
        otherJobsCount={otherJobsCount}
      />
    </div>
  );
}