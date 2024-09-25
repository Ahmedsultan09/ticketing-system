import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../ui/components/card";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import useFetchRegularVisits from "src/hooks/useFetchRegularVisits";
import useFetchDoneVisits from "src/hooks/useFetchDoneVisits";

// Mock data
const clientsData = [
  {
    id: 1,
    name: "Acme Corp",
    branchNumber: "B001",
    machines: [
      { serialNumber: "AC001", type: "Printer", issue: "Paper jam" },
      { serialNumber: "AC002", type: "Computer", issue: "Slow performance" },
      { serialNumber: "AC003", type: "Scanner" },
    ],
  },
  {
    id: 2,
    name: "TechSolutions Inc",
    branchNumber: "B002",
    machines: [
      { serialNumber: "TS001", type: "Server" },
      { serialNumber: "TS002", type: "Laptop" },
      { serialNumber: "TS003", type: "Printer", issue: "Low toner" },
      { serialNumber: "TS004", type: "Router" },
    ],
  },
  // Add more clients as needed
];

export default function DoneRegularVisits() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [doneVisits, setDoneVisits] = useState([]);
  const visits = useFetchDoneVisits(4);
  useEffect(() => {
    setDoneVisits(visits);
  }, [visits, doneVisits]);
  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="container mx-auto p-4 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Client Visits Dashboard
      </h1>
      {doneVisits?.map((visit) => (
        <Card
          key={visit?.id}
          className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <CardHeader
            className="cursor-pointer flex flex-row items-center justify-between bg-white"
            onClick={() => toggleCard(visit?.id)}
          >
            <div>
              <CardTitle className="text-xl text-primary">
                {visit?.client}
              </CardTitle>
              <CardDescription>Branch: {visit?.branch}</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-primary-foreground text-primary rounded-2xl px-2">
                {visit?.machines?.length} Machines
              </div>
              <div className="bg-green-100 text-green-800 rounded-2xl px-2">
                {
                  visit?.machines.filter(
                    (machine) => machine.status === "solved"
                  ).length
                }{" "}
                Stable
              </div>
              <div className="bg-red-100 text-red-800 rounded-2xl px-2">
                {
                  visit?.machines.filter(
                    (machine) => machine.status === "spare-parts"
                  ).length
                }{" "}
                Unstable
              </div>
              {expandedCard === visit?.id ? (
                <ChevronUpIcon className="h-6 w-6 text-primary transition-transform duration-300" />
              ) : (
                <ChevronDownIcon className="h-6 w-6 text-primary transition-transform duration-300" />
              )}
            </div>
          </CardHeader>
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              expandedCard === visit?.id ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <CardContent className="p-4 bg-gradient-to-br from-gray-50 to-gray-100">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Machine Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visit?.machines.map((machine) => (
                    <Card
                      key={machine.serialNumber}
                      className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-primary">
                          {machine.machineType}
                        </h4>
                        <p className="text-sm text-gray-600">
                          S/N: {machine.serialNumber}
                        </p>
                        {machine.issue && (
                          <p className="text-sm text-red-600 mt-2 font-medium">
                            Issue: {machine.issue}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
