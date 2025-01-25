const BottomInfo = ({ ticker, change }) => {
  const getColor = (value) => {
    if (value >= 1 && value <= 2) return "green";
    if (value >= 3 && value <= 5) return "yellow";
    if (value > 5) return "red";
    return "gray";
  };

  const color = getColor(Math.abs(change));

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: '#f5f5f5', padding: '5px 10px', borderRadius: '20px' }}>
      <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{ticker}</span>
      <div
        style={{
          backgroundColor: color,
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
      >
        {Math.abs(change)}
      </div>
    </div>
  );
};

const FinanceCard = () => {
  return (
    <div style={{ height: 'fit-content', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white', overflow: 'hidden', margin: '10px' }}>
        <div style={{ position: 'relative' }}>
            <img
          src={require("../assets/finadvisor.png")}
          alt="President"
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
        </div>
    
      <div style={{ padding: '15px' }}>
        <h2 style={{ fontWeight: '600', fontSize: '18px', marginBottom: '10px', marginTop: '10px'}}>
          Canada tariffs would hurt automakers and consumers: Report
        </h2>
        <p>At the World Economic Forum in Davos on Thursday, President Donald Trump boomed, “Canada has been very tough to deal with over the years. We don't need them to make our cars, and they make a lot of them.”
        </p>
        <p style={{ color: '#777', fontSize: '14px', marginBottom: '15px' }}>Yahoo Finance • 34 minutes ago</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <BottomInfo ticker="AA" change={8} />
          <BottomInfo ticker="GM" change={1} />
        </div>
      </div>
    </div>
  );
};

export default FinanceCard;