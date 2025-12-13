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