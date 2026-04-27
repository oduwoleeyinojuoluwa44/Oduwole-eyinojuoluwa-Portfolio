import React from 'react';

export interface Project {
  name: string;
  description: string;
  stack: string[];
  url?: string;
  live?: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  type: string;
  date: string;
  location?: string;
  description?: string;
  skills?: string[];
  logoColor: string;
  logoText: string;
}

export interface Work {
  name: string;
  url: string;
  role: string;
  roleType: 'frontend' | 'backend';
  color: string;
  description: string;
  achievements?: string[];
  keyContribution?: string;
  yearsOfExp?: string;
}