import './CostCurve.css';

interface CostCurveProps {
  distribution: number[];
}

export function CostCurve({ distribution }: CostCurveProps) {
  const maxValue = Math.max(...distribution, 1);

  return (
    <div className="cost-curve">
      <div className="cost-curve-bars">
        {distribution.map((count, index) => (
          <div key={index} className="cost-curve-bar-wrapper">
            <div
              className="cost-curve-bar"
              style={{ height: `${(count / maxValue) * 100}%` }}
            />
            <span className="cost-curve-label">{index >= 10 ? '10+' : index}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
