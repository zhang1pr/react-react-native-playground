import { Redirect, Stack, useLocalSearchParams } from 'expo-router';

import { getProjectById } from '@/projects/registry';

export default function ProjectScreen() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const project = projectId ? getProjectById(projectId) : undefined;

  if (!project) {
    return <Redirect href="/" />;
  }

  const ProjectComponent = project.component;

  return (
    <>
      <Stack.Screen options={{ title: project.name }} />
      <ProjectComponent />
    </>
  );
}
