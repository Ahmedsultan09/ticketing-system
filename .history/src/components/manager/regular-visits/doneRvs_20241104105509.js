"use client";

import { useEffect, useState } from "react";
import { Button } from "../../../ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../ui/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/components/select";
import { Badge } from "../../../ui/components/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../ui/components/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../ui/components/breadcrumb";
import {
  FileText,
  AlertTriangle,
  Wrench,
  Check,
  X,
  Building2,
  MapPin,
  GitBranch,
  Cog,
} from "lucide-react";
import useFetchClients from "../../../hooks/useFetchClients";

// Mock data structure
const mockData = {
  clients: [
    {
      id: 1,
      name: "TechCorp Industries",
      totalMachines: 150,
      activeContracts: 5,
      governorates: [
        {
          id: 1,
          name: "Northern Governorate",
          totalBranches: 10,
          totalMachines: 80,
          areas: [
            {
              id: 1,
              name: "Industrial Zone A",
              totalBranches: 5,
              totalMachines: 40,
              branches: [
                {
                  id: 1,
                  name: "Main Factory Branch",
                  totalMachines: 20,
                  lastVisit: "2023-05-15",
                  machines: [
                    {
                      id: 1,
                      name: "Machine 1",
                      serialNumber: "SN001",
                      meterReading: 1000,
                      status: "stable",
                    },
                    {
                      id: 2,
                      name: "Machine 2",
                      serialNumber: "SN002",
                      meterReading: 2000,
                      status: "needs_spare_part",
                    },
                    {
                      id: 3,
                      name: "Machine 3",
                      serialNumber: "SN003",
                      meterReading: 3000,
                      status: "scrapped",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Global Manufacturing Co.",
      totalMachines: 200,
      activeContracts: 3,
      governorates: [],
    },
    {
      id: 3,
      name: "Innovative Solutions Ltd.",
      totalMachines: 100,
      activeContracts: 2,
      governorates: [],
    },
  ],
  years: [2023],
  quarters: [
    { id: 1, name: "Q1", startDate: "2023-01-01", endDate: "2023-03-31" },
    { id: 2, name: "Q2", startDate: "2023-04-01", endDate: "2023-06-30" },
    { id: 3, name: "Q3", startDate: "2023-07-01", endDate: "2023-09-30" },
    { id: 4, name: "Q4", startDate: "2023-10-01", endDate: "2023-12-31" },
  ],
  visits: [
    {
      quarterId: 1,
      branchId: 1,
      visitDate: "2023-02-15",
      engineerName: "John Doe",
      report1Url: "/path/to/report1.pdf",
      report2Url: "/path/to/report2.pdf",
    },
  ],
};

const modernGradients = [
  "bg-gradient-to-br from-purple-600 to-blue-500",
  "bg-gradient-to-br from-emerald-500 to-teal-400",
  "bg-gradient-to-br from-pink-500 to-orange-400",
  "bg-gradient-to-br from-indigo-500 to-purple-500",
  "bg-gradient-to-br from-blue-600 to-cyan-400",
  "bg-gradient-to-br from-red-500 to-pink-500",
];

export default function DoneRvs() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedYear, setSelectedYear] = useState(mockData.years[0]);
  const [selectedGovernorate, setSelectedGovernorate] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [clientsData, setClientsData] = useState([]);

  const resetSelection = (level) => {
    if (level <= 3) setSelectedBranch(null);
    if (level <= 2) setSelectedArea(null);
    if (level <= 1) setSelectedGovernorate(null);
    if (level === 0) setSelectedClient(null);
  };

  const clients = useFetchClients();
  useEffect(() => {
    setClientsData(clients);
  }, [clients]);

  const getVisitForBranch = (branchId, quarterId) => {
    return mockData.visits.find(
      (v) => v.branchId === branchId && v.quarterId === quarterId
    );
  };

  useEffect(() => {
    console.log(selectedBranch?.machines);
  }, [selectedBranch]);

  const renderMachineCard = (machine) => {
    const getStatusBadge = (status) => {
      switch (status) {
        case "stable":
          return (
            <Badge className="bg-green-500">
              <Check className="mr-1 h-3 w-3" /> Stable
            </Badge>
          );
        case "needs_spare_part":
          return (
            <Badge className="bg-yellow-500">
              <Wrench className="mr-1 h-3 w-3" /> Needs Spare Part
            </Badge>
          );
        case "scrapped":
          return (
            <Badge className="bg-red-500">
              <X className="mr-1 h-3 w-3" /> Scrapped
            </Badge>
          );
        default:
          return null;
      }
    };

    return (
      <Card key={machine.id} className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Cog className="mr-2 h-5 w-5" />
            {machine.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Serial Number:</strong> {machine.serialNumber}
          </p>
          <p>
            <strong>Meter Reading:</strong> {machine.meterReading}
          </p>
          <div className="mt-2">{getStatusBadge(machine.status)}</div>
        </CardContent>
      </Card>
    );
  };

  const renderCard = (item, type, onClick, gradientIndex) => (
    <Card
      key={item.id}
      className={`cursor-pointer transition-all hover:shadow-lg ${
        onClick ? "hover:scale-105" : ""
      }`}
      onClick={onClick}
    >
      <CardContent
        className={`p-6 ${
          modernGradients[gradientIndex % modernGradients.length]
        } text-white`}
      >
        <h3 className="text-2xl font-bold mb-2">
          {type === "client" ? item.clientName : item.name}
        </h3>
        {type === "client" && (
          <>
            <p className="text-sm opacity-80 mb-1">
              <Building2 className="inline-block mr-1 h-4 w-4" />
              {item.totalMachines} Machines
            </p>
            <p className="text-sm opacity-80">
              <FileText className="inline-block mr-1 h-4 w-4" />
              {item.activeContracts} Active Contracts
            </p>
          </>
        )}
        {type === "governorate" && (
          <>
            <p className="text-sm opacity-80 mb-1">
              <GitBranch className="inline-block mr-1 h-4 w-4" />
              {item.totalBranches} Branches
            </p>
            <p className="text-sm opacity-80">
              <Cog className="inline-block mr-1 h-4 w-4" />
              {item.totalMachines} Machines
            </p>
          </>
        )}
        {type === "area" && (
          <>
            <p className="text-sm opacity-80 mb-1">
              <GitBranch className="inline-block mr-1 h-4 w-4" />
              {item.totalBranches} Branches
            </p>
            <p className="text-sm opacity-80">
              <Cog className="inline-block mr-1 h-4 w-4" />
              {item.totalMachines} Machines
            </p>
          </>
        )}
        {type === "branch" && (
          <>
            <p className="text-sm opacity-80 mb-1">
              <Cog className="inline-block mr-1 h-4 w-4" />
              {item.totalMachines} Machines
            </p>
            <p className="text-sm opacity-80">
              <FileText className="inline-block mr-1 h-4 w-4" />
              Last Visit: {item.lastVisit}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Enhanced Regular Visits Dashboard</h1>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" onClick={() => resetSelection(0)}>
              Clients
            </BreadcrumbLink>
          </BreadcrumbItem>
          {selectedClient && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={() => resetSelection(1)}>
                  {selectedClient.clientName}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          {selectedGovernorate && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={() => resetSelection(2)}>
                  {selectedGovernorate.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          {selectedArea && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={() => resetSelection(3)}>
                  {selectedArea.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          {selectedBranch && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={() => resetSelection(4)}>
                  {selectedBranch.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {!selectedClient && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Select a Client</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clientsData.map((client, index) =>
              renderCard(
                client,
                "client",
                () => setSelectedClient(client),
                index
              )
            )}
          </div>
        </div>
      )}

      {selectedClient && !selectedGovernorate && (
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <div
              className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                modernGradients[
                  mockData.clients.indexOf(mockData.clients[0]) %
                    modernGradients.length
                ]
              }`}
            >
              {selectedClient.clientName.charAt(0)}
            </div>
            <h2 className="text-2xl font-semibold">
              {selectedClient.clientName}
            </h2>
          </div>
          {selectedClient?.timeline?.length > 0 && (
            <Select
              onValueChange={(value) => setSelectedYear(Number(value))}
              value={2024}
            >
              <SelectTrigger className="w-[180px] mb-4">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={2023}>2023</SelectItem>
                <SelectItem value={2024}>2024</SelectItem>
              </SelectContent>
            </Select>
          )}

          <h3 className="text-xl font-semibold mb-4">Governorates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedClient?.governorates?.length > 0 &&
              selectedClient.governorates.map((governorate, index) =>
                renderCard(
                  governorate,
                  "governorate",
                  () => setSelectedGovernorate(governorate),
                  index
                )
              )}
          </div>
        </div>
      )}

      {selectedGovernorate && !selectedArea && (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Areas in {selectedGovernorate.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedGovernorate.areas.map((area, index) =>
              renderCard(area, "area", () => setSelectedArea(area), index)
            )}
          </div>
        </div>
      )}

      {selectedArea && !selectedBranch && (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Branches in {selectedArea.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedArea.branches.map((branch, index) =>
              renderCard(
                branch,
                "branch",
                () => setSelectedBranch(branch),
                index
              )
            )}
          </div>
        </div>
      )}

      {selectedBranch && (
        <Tabs defaultValue={selectedClient.timeline[0].periodNumber.toString()}>
          <TabsList>
            {selectedClient.timeline.map((time) => (
              <TabsTrigger
                key={time.periodNumber}
                value={time.periodNumber.toString()}
              >
                {selectedClient.timeline.length === 1 &&
                  `P${time.periodNumber}`}
                {selectedClient.timeline.length === 2 &&
                  `P${time.periodNumber}`}
                {selectedClient.timeline.length === 4 &&
                  `Q${time.periodNumber}`}
              </TabsTrigger>
            ))}
          </TabsList>
          {selectedClient.timeline.map((quarter) => (
            <TabsContent
              key={quarter.periodNumber.toString()}
              value={quarter.periodNumber.toString()}
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedClient.timeline.length === 1 &&
                      `P${quarter.periodNumber}`}
                    {selectedClient.timeline.length === 2 &&
                      `P${quarter.periodNumber}`}
                    {selectedClient.timeline.length === 4 &&
                      `Q${quarter.periodNumber}`}{" "}
                    Visits for {selectedBranch.name}{" "}
                    <span className="text-lime-700">
                      ( {selectedClient.clientName} )
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Period:</strong>{" "}
                    {new Date(quarter.startDate).toLocaleDateString()} to{" "}
                    {new Date(quarter.endDate).toLocaleDateString()}
                  </p>
                  {getVisitForBranch(selectedBranch.id, quarter.id).length <
                  1 ? (
                    <div>
                      <p>
                        <strong>Visit Date:</strong>{" "}
                        {
                          getVisitForBranch(selectedBranch.id, quarter.id)
                            .visitDate
                        }
                      </p>
                      <p>
                        <strong>Engineer:</strong>{" "}
                        {
                          getVisitForBranch(selectedBranch.id, quarter.id)
                            .engineerName
                        }
                      </p>
                      <div className="flex gap-2 mt-4">
                        <Button asChild>
                          <a
                            href={
                              getVisitForBranch(selectedBranch.id, quarter.id)
                                .report1Url
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View Report 1
                          </a>
                        </Button>
                        <Button asChild>
                          <a
                            href={
                              getVisitForBranch(selectedBranch.id, quarter.id)
                                .report2Url
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View Report 2
                          </a>
                        </Button>
                      </div>
                      <h3 className="text-xl font-semibold mt-6 mb-4">
                        Machines
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedBranch?.machines?.map((machine) =>
                          renderMachineCard(machine)
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <AlertTriangle className="mx-auto h-8 w-8 text-yellow-500" />
                      <p className="mt-2">
                        No visit recorded for this quarter.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
