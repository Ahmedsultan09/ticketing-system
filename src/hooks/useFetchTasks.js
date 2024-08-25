import { useEffect, useState } from "react";
import useFetchEngineers from "./useFetchEngineers";
import useFetchTickets from "./useFetchTickets";

function useFetchTasks(id = null) {
  const [tasks, setTasks] = useState([]);
  const allTickets = useFetchTickets();
  const allEngineers = useFetchEngineers();
  useEffect(() => {
    if (allEngineers.length && allTickets.length) {
      const ticketsMap = allTickets.reduce((map, ticket) => {
        map[ticket.id] = ticket;
        return map;
      }, {});

      const updatedEngineers = allEngineers.map((engineer) => ({
        ...engineer,
        tasks: engineer.tasks.map((taskId) => ticketsMap[taskId]),
      }));

      if (id !== null) {
        const filteredEngineer = updatedEngineers?.find((engineer) => {
          return +engineer.id === +id;
        });
        setTasks(filteredEngineer?.tasks);
      } else {
        setTasks(updatedEngineers);
      }
    }
  }, [allEngineers, allTickets, id]);
  return tasks;
}

export default useFetchTasks;
