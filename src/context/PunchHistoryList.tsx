import React, { createContext, useState } from 'react';

export interface PunchHistory {
  id: string;
  date: string;
  time: string;
}

export const PunchHistoryListContext = createContext<{
  contextPunchHistoryList: PunchHistory[];
  setContextPunchHistoryList: (data: PunchHistory[]) => void;
}>({ contextPunchHistoryList: [], setContextPunchHistoryList: () => {} });

export const PunchHistoryListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [contextPunchHistoryList, setContextPunchHistoryList] = useState<
    PunchHistory[]
  >([]);

  return (
    <PunchHistoryListContext.Provider
      value={{
        contextPunchHistoryList,
        setContextPunchHistoryList,
      }}
    >
      {children}
    </PunchHistoryListContext.Provider>
  );
};
