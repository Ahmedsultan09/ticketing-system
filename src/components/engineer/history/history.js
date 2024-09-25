import { useEffect, useRef, useState } from "react";
import Header from "src/ui/components/header";
import HistoryCallCard from "./historyCallCard";
import HistoryVisitCard from "./historyVisitCard";
import useFetchDoneCalls from "src/hooks/useFetchDoneCalls";
import { SearchIcon } from "lucide-react";
import { Input } from "src/ui/components/input";
import { Typography } from "@mui/material";
import { ScreenSearchDesktop } from "@mui/icons-material";
import useFetchDoneVisits from "src/hooks/useFetchDoneVisits";

export default function History({ id }) {
  const [activeTab, setActiveTab] = useState("calls");
  const [searchedId, setSearchedId] = useState("");
  const [matchedCall, setMatchedCall] = useState({});
  const [matchedVisit, setMatchedVisit] = useState({});
  const [noMatchedCalls, setNoMatchedCalls] = useState(true);
  const [noMatchedVisits, setNoMatchedVisits] = useState(true);
  const searchInputRef = useRef();
  const doneCalls = useFetchDoneCalls(id);
  const doneRegularVisits = useFetchDoneVisits(id);

  function handleSearchBar(e) {
    setSearchedId(e.target.value);
  }

  useEffect(() => {
    const matchedCall = doneCalls?.find((call) => {
      return parseInt(call.callId) === parseInt(searchedId);
    });
    setMatchedCall(matchedCall);
  }, [doneCalls, searchedId]);

  useEffect(() => {
    const matchedVisit = doneRegularVisits?.find((visit) => {
      return parseInt(visit.visitId) === parseInt(searchedId); // Assuming visitId exists
    });
    setMatchedVisit(matchedVisit);
  }, [doneRegularVisits, searchedId]);

  useEffect(() => {
    if (matchedCall === undefined && searchedId !== "") {
      setNoMatchedCalls(true);
    } else {
      setNoMatchedCalls(false);
    }
  }, [matchedCall, searchedId]);

  useEffect(() => {
    if (matchedVisit === undefined && searchedId !== "") {
      setNoMatchedVisits(true);
    } else {
      setNoMatchedVisits(false);
    }
  }, [matchedVisit, searchedId]);

  return (
    <div className=" mx-auto ">
      <Header
        title="History"
        description="Your history of calls and regular visits, You can Search over and review them."
      />
      <div className="bg-white container rounded-lg shadow-md p-6">
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-l-lg ${
              activeTab === "calls"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/50"
            }`}
            onClick={() => setActiveTab("calls")}
          >
            Calls
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${
              activeTab === "regular-visits"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/50"
            }`}
            onClick={() => {
              setActiveTab("regular-visits");
              setSearchedId("");
            }}
          >
            Regular Visits
          </button>
        </div>
        {activeTab === "calls" && (
          <div className="flex flex-col justify-start gap-8">
            <div className="w-full flex flex-row justify-between items-center">
              <h2 className="text-2xl font-bold mb-4">Calls</h2>
              <div className="relative w-1/2 ">
                <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="number"
                  placeholder="Search calls by ID..."
                  className="pl-8 w-full"
                  onChange={handleSearchBar}
                  onFocus={(e) =>
                    e.target.addEventListener(
                      "wheel",
                      function (e) {
                        e.preventDefault();
                      },
                      { passive: false }
                    )
                  }
                  ref={searchInputRef}
                />
              </div>
            </div>

            <div className="w-full flex flex-row flex-wrap justify-between">
              {doneCalls?.length > 0 &&
                searchedId === "" &&
                doneCalls.map((call) => {
                  return (
                    <HistoryCallCard
                      key={call.callId}
                      callId={call.callId}
                      client={call.client}
                      branch={call.branch}
                      responseDate={call.responseDate}
                      issue={call.issue}
                      machine={call.machine}
                      result={call.result}
                      ticketDate={call.callDate}
                      operator={call.operator}
                      ownership={call.ownership}
                    />
                  );
                })}
              {doneCalls?.length > 0 &&
                searchedId !== "" &&
                !noMatchedCalls && (
                  <HistoryCallCard
                    callId={matchedCall?.callId}
                    client={matchedCall?.client}
                    branch={matchedCall?.branch}
                    responseDate={matchedCall?.responseDate}
                    issue={matchedCall?.issue}
                    machine={matchedCall?.machine}
                    result={matchedCall?.result}
                    ticketDate={matchedCall?.callDate}
                  />
                )}

              {noMatchedCalls && (
                <div className="w-full h-[60dvh] flex justify-center items-center">
                  <Typography className="text-muted-foreground " variant="h6">
                    There are no calls matches this ID{" "}
                    <ScreenSearchDesktop fontSize="large" />
                  </Typography>{" "}
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === "regular-visits" && (
          <div className="flex flex-col justify-start gap-8">
            <div className="w-full flex flex-row justify-between items-center">
              <h2 className="text-2xl font-bold mb-4">Regular Visits</h2>
              <div className="relative w-1/2 ">
                <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="number"
                  placeholder="Search regular visits by ID..."
                  className="pl-8 w-full"
                  onChange={handleSearchBar}
                  onFocus={(e) =>
                    e.target.addEventListener(
                      "wheel",
                      function (e) {
                        e.preventDefault();
                      },
                      { passive: false }
                    )
                  }
                  ref={searchInputRef}
                />
              </div>
            </div>

            <div className="w-full flex flex-row flex-wrap justify-between">
              {doneRegularVisits?.length > 0 &&
                searchedId === "" &&
                doneRegularVisits.map((visit) => {
                  return (
                    <HistoryVisitCard
                      key={visit.visitId}
                      visitId={visit.visitId}
                      client={visit.client}
                      branch={visit.branch}
                      visitDate={visit.visitDate}
                      deadline={visit.deadline}
                      machines={visit.machines}
                      operator={visit.operator}
                    />
                  );
                })}
              {doneRegularVisits?.length > 0 &&
                searchedId !== "" &&
                !noMatchedVisits && (
                  <HistoryVisitCard
                    visitId={matchedVisit?.visitId}
                    client={matchedVisit?.client}
                    branch={matchedVisit?.branch}
                    responseDate={matchedVisit?.responseDate}
                    issue={matchedVisit?.issue}
                    machine={matchedVisit?.machine}
                    result={matchedVisit?.result}
                    ticketDate={matchedVisit?.callDate}
                  />
                )}

              {noMatchedVisits && (
                <div className="w-full h-[60dvh] flex justify-center items-center">
                  <Typography className="text-muted-foreground " variant="h6">
                    There are no visits matches this ID{" "}
                    <ScreenSearchDesktop fontSize="large" />
                  </Typography>{" "}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
