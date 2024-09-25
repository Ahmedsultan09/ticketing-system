import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import image from "../../../assets/images/bigdata-logo.png";
import font from "../../../assets/fonts/Rubik-Regular.ttf";
Font.register({
  family: "rubik",
  format: "ttf",
  src: font,
});
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
    fontFamily: "rubik",
    padding: 20,
  },
  header: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    height: 140,
  },

  image: {
    width: 120,
    height: 120,
  },
  visitDetails: {
    fontSize: 12,
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
});

// Create Document Component

function ReportPDF({ currentRv, doneMachines, addedMachines }) {
  return (
    <Document language="ar">
      <Page size="A4" style={styles.page} wrap>
        <View style={[styles.header]}>
          <View
            style={{
              marginTop: 40,
              fontSize: 10,
              flexDirection: "",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              gap: 4,
              height: 50,
              width: "50%",
            }}
          >
            {" "}
            <Text render={() => `${currentRv.client} :العميل`} />
            <Text render={() => `${currentRv.branch} :الفرع`} />
            <Text
              render={() => `${new Date().toDateString()} :تاريخ الزيارة`}
            />
          </View>
          <View style={{ width: "50%" }}>
            <Image src={image} style={styles.image} />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column-reverse",
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              gap: 4,
              height: 15,
              width: "100%",
              textAlign: "center",
            }}
          >
            -: الماكينات اللتي تم الانتهاء منها
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 5,
            padding: 10,
          }}
        >
          {doneMachines.map((machine, index) => {
            return (
              <View
                style={{ width: "24%", border: "1px solid black", padding: 3 }}
              >
                {" "}
                <Text
                  style={{
                    fontSize: 10,
                    gap: 4,
                    width: "100%",
                    textAlign: "left",
                  }}
                  render={() =>
                    `${index + 1}) Serial Number : ${machine.serialNumber
                      .toString()
                      .toUpperCase()}`
                  }
                />
                <Text
                  style={{
                    fontSize: 10,
                    gap: 4,
                    width: "100%",
                    textAlign: "left",
                  }}
                  render={() => `Machine Brand: ${machine.machineBrand}`}
                />
                <Text
                  style={{
                    fontSize: 10,
                    gap: 4,
                    width: "100%",
                    textAlign: "left",
                  }}
                  render={() => `Machine Model : ${machine.machineModel}`}
                />
                <Text
                  style={{
                    fontSize: 10,
                    gap: 4,
                    width: "100%",
                    textAlign: "left",
                  }}
                  render={() => `Meter Reading : ${machine.meterReading}`}
                />
                <Text
                  style={{
                    fontSize: 10,
                    gap: 4,
                    width: "100%",
                    textAlign: "left",
                  }}
                  render={() =>
                    `Status : ${machine.status === "stable" ? "Stable" : ""}${
                      machine.status === "spare-parts"
                        ? "Needs a spare part"
                        : ""
                    }${
                      machine.status === "not-found" ? "Machine not found" : ""
                    }${
                      machine.status === "scrapped"
                        ? "Return to service center"
                        : ""
                    }`
                  }
                />
              </View>
            );
          })}

          <View
            style={{ width: "100%", height: 1, backgroundColor: "black" }}
          ></View>
          {addedMachines.length > 0 && (
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column-reverse",
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  gap: 4,
                  height: 15,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                -: الماكينات اللتي تمت اضافتها بواسطة المهندس
              </Text>
            </View>
          )}

          {addedMachines?.length > 0 &&
            addedMachines.map((machine, index) => {
              return (
                <View
                  style={{
                    width: "24%",
                    border: "1px solid black",
                    padding: 3,
                  }}
                >
                  {" "}
                  <Text
                    style={{
                      fontSize: 10,
                      gap: 4,
                      width: "100%",
                      textAlign: "left",
                    }}
                    render={() =>
                      `${index + 1}) Serial Number : ${machine.serialNumber
                        .toString()
                        .toUpperCase()}`
                    }
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      gap: 4,
                      width: "100%",
                      textAlign: "left",
                    }}
                    render={() => `Machine Brand: ${machine.machineBrand}`}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      gap: 4,
                      width: "100%",
                      textAlign: "left",
                    }}
                    render={() => `Machine Model : ${machine.machineModel}`}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      gap: 4,
                      width: "100%",
                      textAlign: "left",
                    }}
                    render={() => `Meter Reading : ${machine.meterReading}`}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      gap: 4,
                      width: "100%",
                      textAlign: "left",
                    }}
                    render={() =>
                      `Status : ${machine.status === "stable" ? "Stable" : ""}${
                        machine.status === "spare-parts"
                          ? "Needs a spare part"
                          : ""
                      }${
                        machine.status === "not-found"
                          ? "Machine not found"
                          : ""
                      }${
                        machine.status === "scrapped"
                          ? "Return to service center"
                          : ""
                      }`
                    }
                  />
                </View>
              );
            })}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                fontSize: 12,
                justifyContent: "flex-end",
              }}
            >
              <Text>توقيع المهندس</Text>
            </View>
            <View
              style={{
                fontSize: 12,
              }}
            >
              <Text>توقيع الموظف المسؤول</Text>
            </View>
          </View>
        </View>{" "}
      </Page>
    </Document>
  );
}

export default ReportPDF;
