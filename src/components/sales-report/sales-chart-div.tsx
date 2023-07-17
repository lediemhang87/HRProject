import SalesChart from "./sales-chart"

const SalesChartDiv: React.FC = () => {
    return (
        <div className="bg-white border shadow-sm p-4 rounded mb-4 ">
            <div className="fw-bold mb-4 text-lg"> Sales </div>
            <div className="height-300 ">  <SalesChart/> </div>
        </div>
    )
}
export default SalesChartDiv