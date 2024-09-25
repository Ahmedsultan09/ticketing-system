<div className="w-full h-full p-2 flex flex-col justify-center items-center">
          <Typography className="w-fit h-6 font-bold text-2xl rounded-2xl bg-red-700 px-3 flex justify-end items-end self-end text-end text-white">
            : الماكينات الخاصة بالعميل
          </Typography>
          <TextField
            id="search"
            label="Search"
            variant="standard"
            onChange={handleSearch}
            className="flex items-center justify-center h-full !m-0 -translate-y-2"
          />
          <div className="w-full flex flex-col flex-wrap justify-center items-center gap-1 mt-2">
            <div className="w-full flex flex-1 flex-row flex-wrap justify-around items-center gap-2 mt-2">
              {!isEmpty ? (
                <Suspense
                  fallback={
                    <div className="absolute top-1/2 left-1/2">
                      <TailSpin
                        visible={true}
                        height="80"
                        width="80"
                        color="orange"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </div>
                  }
                >
                  {memoMachines}
                </Suspense>
              ) : (
                <div className="w-full h-[70vh] flex justify-center items-center">
                  There is no machine matching this serial
                </div>
              )}
            </div>
            {end < machines.length && (
              <Button
                onClick={handleSeeMore}
                color="warning"
                variant="contained"
                size="small"
                sx={{ mt: 2 }}
              >
                See More
                <ExpandMoreIcon />
              </Button>
            )}
          </div>
          <div className="mt-2 w-full flex flex-col justify-center items-center">
            <Typography className="w-fit h-9 flex justify-center items-center bg-red-700 px-2 rounded-2xl text-white">
              Tickets created for{" "}
              <span className="font-bold mx-1">( {currentClient.name} )</span>
            </Typography>
            <DataGrid
              sx={{
                boxShadow: 2,
              }}
              rows={clientTickets}
              columns={ticketsColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              autoHeight
              autoWidth
              pageSizeOptions={[5, 10]}
              className="w-full mt-2"
            />
          </div>
          <div className="mt-2 w-full flex flex-col justify-center items-center">
            <Typography className="w-fit h-9 flex justify-center items-center bg-red-700 px-2 rounded-2xl text-white">
              Troubleshooting managed for{" "}
              <span className="font-bold mx-1">( {currentClient.name} )</span>
            </Typography>
            <DataGrid
              sx={{
                boxShadow: 2,
              }}
              rows={clientTroubleshooting}
              columns={issuesColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              autoHeight
              autoWidth
              pageSizeOptions={[5, 10]}
              className="w-full mt-2"
            />
          </div>
        </div>
