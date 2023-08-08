import React, { useState } from "react"
import Button from "@mui/material/Button"
import { PortfolioStock } from "./model"
import { AgGridReact } from "ag-grid-react"
import { ColDef, ColGroupDef } from "ag-grid-community"


async function loadData() {
    const url = "http://localhost:5000/portfolio"
    return fetch(url)
}

export function Portfolio() {
    const [data, setData] = useState<PortfolioStock[]>([])
    const columnDefs: ColDef<PortfolioStock>[] = [
        { headerName: "Symbol", field: "Symbol" },
        { headerName: "Type", field: "Type" },
        { headerName: "Price", field: "Price" },
        { headerName: "Quantity", field: "Quantity" },
        { headerName: "Day Change", field: "DayChange" },
        { headerName: "Day Change Percent", field: "DayChangePercent" },
        { headerName: "Total Change", field: "TotalChange" },
        { headerName: "Total Change Percent", field: "TotalChangePercent" },
    ]

    const onDataLoaded = (data: PortfolioStock[]) => {
        setData(data)
    }
    async function handleLoad(onDataLoaded: (data: PortfolioStock[]) => void) {
        await loadData().then((response) => response.json()).then((payload) => {
            console.log(payload)
            onDataLoaded(payload.PortfolioResponse.AccountPortfolio[0].Position.map((position: any) => {
                return {
                    Symbol: position.Product.symbol,
                    Type: position.Product.securityType,
                    Price: position.Quick.lastTrade,
                    Quantity: position.quantity,
                    DayChange: position.Quick.daysGain,
                    DayChangePercent: position.Quick.daysGainPct,
                    TotalChange: position.totalGain,
                    TotalChangePercent: position.totalGainPct,
                }
            }))
        })
    }

    return (
        <div>
            <Button variant="contained" onClick={() => {
                handleLoad(onDataLoaded)
            }}>Login</Button>
            <Button variant="contained" onClick={() => {
                handleLoad(onDataLoaded)
            }}>Refresh</Button>
            <div className="ag-theme-alpine" style={{
                width: "82.5%", height: 1000
            }}>
                <AgGridReact rowData={data} columnDefs={columnDefs} />
            </div>
        </div>
    )
}