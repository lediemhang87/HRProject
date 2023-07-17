const TopProducts: React.FC = () => {
    const products = [
        {title: 'Payroll Services', noOfSales: 70},
        {title: 'Talent Request', noOfSales: 54},
        {title: 'API Usage', noOfSales: 47},
        {title: 'Company Consulting', noOfSales: 43},
        {title: 'Hiring Cost', noOfSales: 38},
        {title: 'Subscription Changes', noOfSales: 22}
    ]
    return(
        <div className="bg-white p-3 border shadow-sm mb-4 rounded">
            <div className="text-lg fw-bold p-2"> Top Products </div>
            {products.map((item, index) => (
                <div className="d-flex vertical-align border-bottom p-2">
                    
                    <div className="mr-auto">
                        <div className="fw-bold"> {item.title} </div>
                    </div>
                    <div > <span className="fw-bold"> {item.noOfSales} </span> sales </div>
                    
                </div>

            ))}
        </div>
    )
}

export default TopProducts