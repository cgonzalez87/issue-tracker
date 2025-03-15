"use client";

import React, { PropsWithChildren } from "react";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient(); //this client catches data that I get from BE

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    //this guy uses React Context to share the queryClient with my component tree
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
