const SalesReportLatestSubscription: React.FC = () => {
    const subscriptions = [
        {id: 1, name: 'Neil Sims', email: 'email@example.com', amount: 367},
        {id: 2, name: 'Bonnie Green', email: 'email@example.com', amount: 367},
        {id: 3, name: 'Micheal Gough', email: 'email@example.com', amount: 3467},
        {id: 4, name: 'Thomas Lean', email: 'email@example.com', amount: 3267},
        {id: 5, name: 'Lana Byrd', email: 'email@example.com', amount: 367},
        {id: 6, name: 'Karen Nelson', email: 'email@example.com', amount: 1367}
    ]
    return(
        <div className="bg-white p-3 border shadow-sm mb-4 rounded">
            <div className="text-lg fw-bold p-2"> Latest Subscriptions </div>
            {subscriptions.map((item, index) => (
                <div className="d-flex vertical-align border-bottom p-2">
                    <div className="">
                        <img
                            src={`https://xsgames.co/randomusers/assets/avatars/male/${item.id}.jpg`}
                            alt={`Avatar ${item.id}`}
                            className="normal-avatar height-40 rounded-circle mr-2"
                        />
                    </div>
                    <div className="mr-auto">
                        <div className="fw-bold"> {item.name} </div>
                        <div className="text-secondary text-sm"> {item.email} </div>
                    </div>
                    <div className="fw-bold"> ${item.amount} </div>
                    
                </div>

            ))}
        </div>
    )
}

export default SalesReportLatestSubscription