import type { ComponentType } from 'react';

import ColorGuess from './Color Guess/App';

export type Project = {
  id: string;
  name: string;
  component: ComponentType;
};

export const projects: Project[] = [
  {
    id: 'Color Guess',
    name: 'Color Guess',
    component: ColorGuess,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
