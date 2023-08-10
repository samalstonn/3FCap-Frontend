import React, { useState } from "react"
import Button from "@mui/material/Button"
import { PortfolioStock } from "./model"
import { AgGridReact } from "ag-grid-react"
import { ColDef, GridApi } from "ag-grid-community"



async function loadData() {
    const url = "http://localhost:5000/portfolio"
    return fetch(url)
}

export function Portfolio() {
    const [gridApi, setGridApi] = useState<GridApi | null>(null)
    const columnDefs: ColDef<PortfolioStock>[] = [
        { headerName: "Symbol", field: "Symbol" },
        { headerName: "Type", field: "Type" },
        { headerName: "Price", field: "Price", cellRenderer: 'agAnimateShowChangeCellRenderer' },
        { headerName: "Quantity", field: "Quantity" },
        { headerName: "Day Change", field: "DayChange" },
        { headerName: "Day Change Percent", field: "DayChangePercent" },
        { headerName: "Total Change", field: "TotalChange" },
        { headerName: "Total Change Percent", field: "TotalChangePercent" },
    ]

    const onDataLoaded = (data: PortfolioStock[]) => {
        gridApi?.setRowData(data)
    }
    async function handleLoad(onDataLoaded: (data: PortfolioStock[]) => void) {
        await loadData().then((response) => response.json()).then((payload) => {
            onDataLoaded(payload.map((position: any) => {
                return {
                    Symbol: position.Product.symbol,
                    Type: position.positionType,
                    Price: position.Quick.lastTrade,
                    Quantity: position.quantity,
                    DayChange: position.daysGain,
                    DayChangePercent: position.daysGainPct,
                    TotalChange: position.totalGain,
                    TotalChangePercent: position.totalGainPct,
                }
            }))
        })
    }

    const onGridReady = (params: any) => {
        setGridApi(params.api)
    }

    return (
        <div>
            <Button variant="contained" onClick={() => {
                handleLoad(onDataLoaded)
            }}>Refresh</Button>
            <div className="ag-theme-alpine" style={{
                width: "82.5%", height: 1000
            }}>
                <AgGridReact rowData={[]} columnDefs={columnDefs} onGridReady={onGridReady} />
            </div>
        </div>
    )
}