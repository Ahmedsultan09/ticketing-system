import React, { useEffect, useState } from "react";
import useFetchTasks from "src/hooks/useFetchTasks";
import TaskCard from "./taskCard";
import useFetchEngineers from "../../../hooks/useFetchEngineers";
import Header from "../../../ui/components/header";

function AllCalls({ id }) {
  const [calls, setCalls] = useState({});
  const allTasks = useFetchTasks(id);
  const engineer = useFetchEngineers(id);
  useEffect(() => {
    setCalls(allTasks);
  }, [allTasks]);

  return (
    <div>
      <div className="flex flex-col min-h-[100dvh] ">
        <Header
          title={`Welcome, ${
            engineer?.name?.length > 0 ? engineer?.name : ""
          }!`}
          description="Here are the printer maintenance tickets you need to address."
        />
        <main className="flex-1 py-8 px-4 sm:px-6 md:px-8">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {calls.length > 0 &&
              calls?.map((call) => {
                return (
                  <TaskCard
                    key={call.id}
                    date={new Date(call.ticketDate).toDateString()}
                    ticketNumber={call.id}
                    serialNumber={call.serialNumber}
                    issue={call.issue}
                    client={call.client}
                    branch={call.branch}
                    priority={call.priority}
                    id={id}
                  />
                );
              })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AllCalls;
