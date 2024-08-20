'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface DataContextType {
  data: any;
  saveData: (data: any) => void;
  dataError: string | null;
  dataSuccess: string | null;
  setDataError: React.Dispatch<React.SetStateAction<string | null>>;
  setDataSuccess: React.Dispatch<React.SetStateAction<string | null>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }: { children: ReactNode }) => { 
  const [data, setData] = useState<any>(null);
  const [dataError, setDataError] = useState<string | null>(null);
  const [dataSuccess, setDataSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (dataError || dataSuccess) {
      const timer = setTimeout(() => {
        setDataError(null);
        setDataSuccess(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [dataError, dataSuccess]);

  const saveData = (data: string) => {
    setData(data);
  };

  return (
    <DataContext.Provider value={{ data, saveData, dataError, dataSuccess, setDataError, setDataSuccess }}>
      {children}
      {dataError && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded">
          {dataError}
        </div>
      )}
      {dataSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded">
          {dataSuccess}
        </div>
      )}
    </DataContext.Provider>
  );
};
