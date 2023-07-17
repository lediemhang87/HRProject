import PayrollChart from "./payroll-chart"

const PayrollChartDiv: React.FC = () => {
    return (
        <div className="bg-white border shadow-sm p-4 rounded mb-4">
            <div className="fw-bold mb-4"> Total Disbursed (30 Days) </div>
            <div className="height-300 "> <PayrollChart/> </div>
        </div>
    )
}
export default PayrollChartDiv