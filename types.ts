import React from 'react';

export interface Project {
  name: string;
  description: string;
  stack: string[];
  url?: string;
  live?: string;
}
