import React from 'react';
import { Project } from './types';

export const ABOUT_CARDS = [
  {
    icon: 'system',
    title: 'System Architecture',
    text: 'Designing scalable microservices',
    color: 'bg-green-500',
  },
  {
    icon: 'data',
    title: 'Data Engineering',
    text: 'Optimizing databases & pipelines',
    color: 'bg-blue-500',
  },
  {
    icon: 'performance',
    title: 'Performance',
    text: 'High-performance APIs',
    color: 'bg-yellow-400',
  },
];

export const PROJECTS: Project[] = [
  {
    name: "E-Commerce Microservices Platform",
    description: "Built a scalable microservices architecture handling 1M+ daily transactions. Implemented event-driven communication using RabbitMQ and Redis for caching. Services deployed on Kubernetes with auto-scaling capabilities.",
    stack: ["Node.js", "PostgreSQL", "Redis", "Kubernetes", "RabbitMQ"],
  },
  {
    name: "Real-Time Analytics Engine",
    description: "Developed a high-performance analytics pipeline processing 50GB+ of data daily. Implemented stream processing with Apache Kafka and designed efficient data models for time-series analysis. Reduced query times by 85% through optimized indexing.",
    stack: ["Python", "Apache Kafka", "MongoDB", "Docker", "Grafana"],
  },
  {
    name: "RESTful API Gateway",
    description: "Architected a robust API gateway serving 200+ endpoints with rate limiting, authentication, and comprehensive logging. Implemented OAuth 2.0 and JWT for security. Achieved 99.9% uptime with load balancing and health checks.",
    stack: ["Go", "MySQL", "Nginx", "AWS", "Terraform"],
  },
];

export const EXPERTISE = {
  "Languages": {
    skills: ["Node.js", "Python", "Go", "Java", "TypeScript"],
    color: "bg-red-500"
  },
  "Databases": {
    skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Elasticsearch"],
    color: "bg-blue-600"
  },
  "Infrastructure": {
    skills: ["Docker", "Kubernetes", "AWS", "Terraform", "Nginx"],
    color: "bg-green-600"
  },
  "Tools & Frameworks": {
    skills: ["Express.js", "FastAPI", "RabbitMQ", "Kafka", "GraphQL"],
    color: "bg-indigo-700"
  }
};

export const CONTACT_LINKS = [
    {
        name: 'GitHub',
        url: 'https://github.com/oduwoleeyinojuoluwa44?tab=repositories',
        icon: 'github',
        color: 'bg-purple-600'
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/oduwole-eyinojuoluwa-taofeek-teo-54544b290/',
        icon: 'linkedin',
        color: 'bg-blue-500'
    },
    {
        name: 'Email',
        url: 'mailto:hello@backend.dev',
        text: 'hello@backend.dev',
        icon: 'email',
        color: 'bg-red-500'
    }
];
