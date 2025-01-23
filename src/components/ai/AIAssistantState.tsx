import { useState } from 'react';

export interface AssistantState {
  temperature: string;
  wiperStatus: string;
  windowStatus: string;
  currentRoute: string;
}

export const useAssistantState = () => {
  const [assistantState, setAssistantState] = useState<AssistantState>({
    temperature: "72°F",
    wiperStatus: "Off",
    windowStatus: "Closed",
    currentRoute: "Home → Office",
  });

  return { assistantState, setAssistantState };
};