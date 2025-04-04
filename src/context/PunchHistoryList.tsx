import React, { createContext, useState } from 'react';

export interface PunchHistory {
  date: string;
  time: string;
}

export const PunchHistoryListContext = createContext<{
  data: PunchHistory[];
  setData: (data: PunchHistory[]) => void;
}>({ data: [], setData: () => {} });

export const PunchHistoryListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<PunchHistory[]>([]);

  return (
    <PunchHistoryListContext.Provider value={{ data, setData }}>
      {children}
    </PunchHistoryListContext.Provider>
  );
};
