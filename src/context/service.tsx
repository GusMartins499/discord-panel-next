import React, { createContext, useContext } from 'react';
import { AutomationService } from '@services/types';
import * as automation from '@services/automations';

export type IServiceContextData = {
  automation: AutomationService
}

const ServiceContext = createContext<IServiceContextData>({} as IServiceContextData);

function ServiceProvider({ children }: { children: React.ReactNode }) {
  const serticeContextData: IServiceContextData = {
    automation,
  };

  return (
    <ServiceContext.Provider value={serticeContextData}>
      {children}
    </ServiceContext.Provider>
  );
}

const useServie = () => useContext(ServiceContext);

export { ServiceProvider, useServie };
