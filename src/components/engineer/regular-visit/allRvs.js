import useFetchRegularVisits from "../../../hooks/useFetchRegularVisits";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../ui/components/card";
import { Link as Direct } from "react-router-dom";
import { Divider } from "@mui/material";
import Header from "../../../ui/components/header";

function AllRvs() {
  const regularVisits = useFetchRegularVisits(4);
  const [timeLeft, setTimeLeft] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const differencesArr = regularVisits.map((visit) => {
      return (
        new Date(visit.deadline.split("/").reverse().join("-")) - currentDate
      );
    });

    const differenceInDays = differencesArr.map((date) => {
      return Math.floor(date / (1000 * 60 * 60 * 24));
    });
    console.log(differenceInDays);
    setTimeLeft(differenceInDays);
  }, [regularVisits]);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header
        title="Regular Visits"
        description="Here you will find the regular visits assigned to you."
        btnText="Back to calls"
        direction="/"
      />
      <main className="w-full flex-1 py-8 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularVisits?.map((visit, index) => {
            return (
              <Direct to={`/regular-visits/${visit.id}`} key={visit.id}>
                <Card
                  className="bg-background shadow-sm rounded-lg lg:col-span-1"
                  key={visit.id}
                >
                  <CardHeader className="flex flex-row items-center justify-between  ">
                    <CardTitle className=" border border-muted-foreground p-2 rounded-lg tracking-wide">
                      {visit.client.toString().toUpperCase()}
                    </CardTitle>
                    <CardTitle className="w-fit h-fit bg-orange-600 text-white text-md rounded-lg px-2">
                      # {visit.id}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 p-6">
                    <div className="grid gap-1">
                      <span className="text-sm font-medium bg-stone-600 text-white w-fit px-1 rounded-sm">
                        Branch
                      </span>
                      <p className="text-muted-foreground">{visit.branch}</p>
                    </div>
                    <Divider />
                    <div className="grid gap-1">
                      <span className="text-sm font-medium bg-stone-600 text-white w-fit px-1 rounded-sm">
                        Deadline
                      </span>
                      <p className="text-muted-foreground">{visit.deadline}</p>
                    </div>
                    <Divider />
                    <div className="grid gap-1">
                      <span className="text-sm font-medium bg-stone-600 text-white w-fit px-1 rounded-sm">
                        Time Left
                      </span>
                      {timeLeft.length > 0 && (
                        <p className="text-muted-foreground text-red-700 font-semibold">
                          {timeLeft[index]} Day left
                        </p>
                      )}
                    </div>
                    <div className="grid gap-1">
                      <span className="text-sm font-medium bg-stone-600 text-white w-fit px-1 rounded-sm">
                        Number of machines
                      </span>
                      <p className="text-muted-foreground">
                        {regularVisits[index]?.machines?.length}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Direct>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default AllRvs;
